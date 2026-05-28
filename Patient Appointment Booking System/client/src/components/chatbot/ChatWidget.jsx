import { useMemo, useState } from 'react';
import { Bot, LoaderCircle, MessageSquare, X } from 'lucide-react';
import { api } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';

export const ChatWidget = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('Which doctor should I consult for fever?');
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hello. Ask me about doctors, appointments, documents, or clinic guidance.' }]);
  const [typing, setTyping] = useState(false);

  const conversationId = useMemo(() => `conversation-${user?.id || 'guest'}`, [user?.id]);

  const sendMessage = async () => {
    const nextQuestion = question.trim();
    if (!nextQuestion) return;

    setMessages((current) => [...current, { role: 'user', content: nextQuestion }]);
    setQuestion('');
    setTyping(true);

    try {
      const { data } = await api.post('/ai/chat', {
        message: nextQuestion,
        conversationId,
        context: { lastTopic: 'patient-support' }
      });
      setMessages((current) => [...current, { role: 'assistant', content: data.answer }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="mb-3 w-[min(92vw,420px)] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between bg-clinic-600 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/15 p-2">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">AI Healthcare Assistant</p>
                <p className="text-xs text-clinic-50">RAG-powered support</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[420px] space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm ${message.role === 'user' ? 'bg-clinic-600 text-white' : 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100'}`}>
                  {message.content}
                </div>
              </div>
            ))}
            {typing ? (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-slate-200 p-3 dark:border-slate-800">
            <div className="flex gap-2">
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => (event.key === 'Enter' ? sendMessage() : null)}
                placeholder="Ask a healthcare question"
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-clinic-500 dark:border-slate-800 dark:bg-slate-950"
              />
              <button onClick={sendMessage} className="rounded-2xl bg-clinic-600 px-4 py-3 text-white shadow-soft hover:bg-clinic-700">
                Send
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <button onClick={() => setOpen((value) => !value)} className="flex items-center gap-3 rounded-full bg-clinic-600 px-5 py-4 text-white shadow-soft hover:bg-clinic-700">
        <MessageSquare className="h-5 w-5" />
        <span className="hidden sm:inline">AI Assistant</span>
      </button>
    </div>
  );
};