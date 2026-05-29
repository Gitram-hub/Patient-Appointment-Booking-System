import Groq from 'groq-sdk';
import { env } from '../config/env.js';
import { getVectorStore } from '../vectorstore/vectorStore.js';

const client = env.groqApiKey ? new Groq({ apiKey: env.groqApiKey }) : null;

const serializeMetadata = (metadata) => `${metadata.title || ''} | ${metadata.source || ''} | ${metadata.tags || ''}`;

const fallbackAnswer = (docs) => {
  if (!docs.length) {
    return 'I can help with doctors, appointments, and clinic guidance, but I could not find a specific clinic match for that question.';
  }

  const guidance = docs
    .slice(0, 2)
    .map((doc) => `- ${doc.metadata?.title || 'Clinic guidance'}: ${doc.pageContent}`)
    .join('\n');

  return `I could not reach Groq, so here is the most relevant clinic guidance I found:\n${guidance}`;
};

export const answerChat = async ({ message, conversationId, context = {}, user = null }) => {
  const store = await getVectorStore();
  const retriever = store.asRetriever(4);
  const matches = await retriever.getRelevantMatches(message);
  const docs = matches.map((item) => item.document);
  const topScore = matches[0]?.score || 0;

  const citations = docs.map((doc) => ({
    title: String(doc.metadata?.title || ''),
    source: String(doc.metadata?.source || ''),
    excerpt: doc.pageContent.slice(0, 160)
  }));

  if (!client) {
    if (topScore < 0.22) {
      return {
        answer: 'I can help with doctors, appointments, and clinic guidance, but I do not have a specific answer for that question yet.',
        citations: [],
        conversationId: conversationId || `conv-${Date.now()}`
      };
    }

    return { answer: fallbackAnswer(docs), citations, conversationId: conversationId || `conv-${Date.now()}` };
  }

  const knowledge = docs
    .map((doc) => `${serializeMetadata(doc.metadata)}\n${doc.pageContent}`)
    .join('\n\n---\n\n');

  const prompt = `You are a healthcare appointment assistant for a patient booking system.\nAnswer only with information that is relevant, safe, and practical.\nUse the provided context and retrieved knowledge to answer.\nIf the question is about urgent symptoms, recommend seeking immediate medical care.\nCite sources briefly when available.\n\nUser context: ${JSON.stringify(user || {})}\nConversation context: ${JSON.stringify(context)}\nRetrieved knowledge:\n${knowledge}\n\nUser question: ${message}`;

  const completion = await client.chat.completions.create({
    model: env.groqModel,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2
  });

  const answer = completion.choices?.[0]?.message?.content || (topScore < 0.22 ? 'I can help with doctors, appointments, and clinic guidance, but I do not have a specific answer for that question yet.' : fallbackAnswer(docs));
  return { answer, citations, conversationId: conversationId || `conv-${Date.now()}` };
};