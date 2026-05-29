import OpenAI from 'openai';
import { env } from '../utils/env.js';
import { getVectorStore } from '../vectorstore/vectorStore.js';

const client = env.openAiApiKey ? new OpenAI({ apiKey: env.openAiApiKey }) : null;

const serializeMetadata = (metadata) => `${metadata.title || ''} | ${metadata.source || ''} | ${metadata.tags || ''}`;

const fallbackAnswer = (docs) => {
  if (!docs.length) {
    return 'I could not find a strong match in the clinic knowledge base. Please consult the clinic for a human review.';
  }
  return `Based on the clinic knowledge base, the most relevant guidance is: ${docs[0].pageContent}`;
};

export const answerChat = async ({ message, conversationId, context = {}, user = null }) => {
  const store = await getVectorStore();
  const retriever = store.asRetriever(4);
  const docs = await retriever.getRelevantDocuments(message);

  const citations = docs.map((doc) => ({
    title: String(doc.metadata?.title || ''),
    source: String(doc.metadata?.source || ''),
    excerpt: doc.pageContent.slice(0, 160)
  }));

  if (!client) {
    return { answer: fallbackAnswer(docs), citations, conversationId: conversationId || `conv-${Date.now()}` };
  }

  const knowledge = docs
    .map((doc) => `${serializeMetadata(doc.metadata)}\n${doc.pageContent}`)
    .join('\n\n---\n\n');

  const prompt = `You are a healthcare appointment assistant for a patient booking system.\nAnswer only with information that is relevant, safe, and practical.\nUse the provided context and retrieved knowledge to answer.\nIf the question is about urgent symptoms, recommend seeking immediate medical care.\nCite sources briefly when available.\n\nUser context: ${JSON.stringify(user || {})}\nConversation context: ${JSON.stringify(context)}\nRetrieved knowledge:\n${knowledge}\n\nUser question: ${message}`;

  const completion = await client.chat.completions.create({
    model: env.openAiModel,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2
  });

  const answer = completion.choices?.[0]?.message?.content || fallbackAnswer(docs);
  return { answer, citations, conversationId: conversationId || `conv-${Date.now()}` };
};