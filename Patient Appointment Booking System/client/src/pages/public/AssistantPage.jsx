import { useMemo, useState } from 'react';
import { api } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AssistantPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState('Who should I consult for fever?');
  const [response, setResponse] = useState('Ask a question to get started.');
  const conversationId = useMemo(() => `conversation-${user?.id || 'guest'}`, [user?.id]);

  const send = async () => {
    const { data } = await api.post('/ai/chat', { message, conversationId, context: { source: 'assistant-page' } });
    setResponse(data.answer);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">AI Healthcare Assistant</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Grounded answers from clinic data and knowledge base documents.</p>
      </div>
      <div className="glass-panel rounded-[2rem] p-6">
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} className="min-h-40 w-full rounded-2xl border border-slate-200 bg-white p-4 outline-none dark:border-slate-800 dark:bg-slate-950" />
        <button onClick={send} className="mt-4 rounded-2xl bg-clinic-600 px-5 py-3 font-semibold text-white shadow-soft hover:bg-clinic-700">Generate answer</button>
        <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-slate-700 dark:bg-slate-900 dark:text-slate-200">{response}</div>
      </div>
    </div>
  );
}