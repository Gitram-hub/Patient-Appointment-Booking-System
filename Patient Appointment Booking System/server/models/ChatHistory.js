import mongoose from 'mongoose';

const citationSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    source: { type: String, default: '' },
    excerpt: { type: String, default: '' }
  },
  { _id: false }
);

const chatHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    conversationId: { type: String, required: true, index: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    citations: { type: [citationSchema], default: [] },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

chatHistorySchema.index({ userId: 1, createdAt: -1 });

export const ChatHistory = mongoose.models.ChatHistory || mongoose.model('ChatHistory', chatHistorySchema);