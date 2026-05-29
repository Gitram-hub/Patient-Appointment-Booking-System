import mongoose from 'mongoose';

const aiKnowledgeBaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    content: { type: String, required: true },
    sourceType: { type: String, enum: ['faq', 'policy', 'doctor-profile', 'instruction', 'pdf', 'manual'], default: 'faq', index: true },
    sourceUrl: { type: String, default: '' },
    tags: [{ type: String, index: true }],
    vectorId: { type: String, default: '' },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

aiKnowledgeBaseSchema.index({ title: 'text', content: 'text', tags: 'text' });

export const AIKnowledgeBase = mongoose.models.AIKnowledgeBase || mongoose.model('AIKnowledgeBase', aiKnowledgeBaseSchema);