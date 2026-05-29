import { writeFile } from 'fs/promises';
import path from 'path';
import { knowledgeSeed } from '../knowledgebase/seed.js';
import { LocalEmbeddings } from '../embeddings/localEmbeddings.js';

let store = null;

const embeddings = new LocalEmbeddings();
const persistencePath = path.join(process.cwd(), 'data', 'vectorstore.json');

const cosineSimilarity = (a, b) => {
  let dot = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let index = 0; index < a.length; index += 1) {
    dot += a[index] * b[index];
    magnitudeA += a[index] * a[index];
    magnitudeB += b[index] * b[index];
  }

  const denominator = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB) || 1;
  return dot / denominator;
};

const buildRetriever = (documents, vectors) => ({
  getRelevantDocuments: async (query, k = 4) => {
    const queryVector = await embeddings.embedQuery(query);

    return documents
      .map((document, index) => ({
        document,
        score: cosineSimilarity(queryVector, vectors[index])
      }))
      .sort((left, right) => right.score - left.score)
      .filter((item) => item.score >= 0.12)
      .slice(0, k)
      .map((item) => item.document);
  },
  getRelevantMatches: async (query, k = 4) => {
    const queryVector = await embeddings.embedQuery(query);

    return documents
      .map((document, index) => ({
        document,
        score: cosineSimilarity(queryVector, vectors[index])
      }))
      .sort((left, right) => right.score - left.score)
      .filter((item) => item.score >= 0.12)
      .slice(0, k);
  }
});

export const getVectorStore = async () => {
  if (store) return store;

  const documents = knowledgeSeed.map((item) => ({
    pageContent: item.content,
    metadata: {
      id: item.id,
      title: item.title,
      source: item.source,
      tags: item.tags.join(', ')
    }
  }));

  const vectors = await embeddings.embedDocuments(documents.map((document) => document.pageContent));

  try {
    await writeFile(persistencePath, JSON.stringify({ documents, vectors }, null, 2), 'utf8');
  } catch {
    // Persistence is a best-effort enhancement for local development.
  }

  store = {
    asRetriever: (k = 4) => ({
      getRelevantDocuments: (query) => buildRetriever(documents, vectors).getRelevantDocuments(query, k),
      getRelevantMatches: (query) => buildRetriever(documents, vectors).getRelevantMatches(query, k)
    })
  };

  return store;
};