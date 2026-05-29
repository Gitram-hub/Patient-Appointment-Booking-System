import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.AI_PORT || 5001),
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  embeddingModel: process.env.EMBEDDING_MODEL || 'text-embedding-3-small',
  chromaCollection: process.env.CHROMA_COLLECTION || 'patient-booking-knowledge',
  chromaUrl: process.env.CHROMA_URL || '',
  fallbackModel: process.env.AI_FALLBACK_MODEL || 'local-rag-fallback'
};