import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminAuthPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      let sessionUser;
      if (isLogin) {
        sessionUser = await login(form.email, form.password);
      } else {
        sessionUser = await register({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          role: 'admin'
        });
      }

      if (sessionUser?.role !== 'admin') {
        toast.error('This account is not an admin account');
        return;
      }

      navigate('/admin-dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(32,165,110,0.14),_transparent_26%),linear-gradient(180deg,_#f8fafc,_#ffffff)] px-4 py-12 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[2rem] p-8">
          <p className="text-xs uppercase tracking-[0.45em] text-clinic-600">Admin Portal</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">{isLogin ? 'Admin login' : 'Create admin account'}</h1>
          <p className="mt-4 max-w-lg text-slate-600 dark:text-slate-300">
            Manage doctors, appointments, analytics, and clinic operations from one protected workspace.
          </p>
          <div className="mt-8 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>• JWT protected admin access</p>
            <p>• Role-based dashboard entry</p>
            <p>• Admin account creation</p>
            <p>• Appointment and system stats</p>
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-8">
          <div className="flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-900">
            <button onClick={() => setIsLogin(true)} className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold ${isLogin ? 'bg-white text-clinic-700 shadow-sm dark:bg-slate-950 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
              Login
            </button>
            <button onClick={() => setIsLogin(false)} className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold ${!isLogin ? 'bg-white text-clinic-700 shadow-sm dark:bg-slate-950 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
              Signup
            </button>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {!isLogin ? (
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Full name" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-clinic-500 dark:border-slate-800 dark:bg-slate-950" />
            ) : null}
            <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Admin email" type="email" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-clinic-500 dark:border-slate-800 dark:bg-slate-950" />
            <input value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Password" type="password" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-clinic-500 dark:border-slate-800 dark:bg-slate-950" />
            {!isLogin ? <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Phone number" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-clinic-500 dark:border-slate-800 dark:bg-slate-950" /> : null}
            <button disabled={loading} className="w-full rounded-2xl bg-clinic-600 px-4 py-3 font-semibold text-white shadow-soft hover:bg-clinic-700 disabled:opacity-60">
              {loading ? 'Please wait...' : isLogin ? 'Login as admin' : 'Create admin account'}
            </button>
          </form>

          <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            Use a seeded admin account or create a new admin account here.
          </div>
          <div className="mt-6 text-sm">
            <Link className="text-clinic-600 hover:underline dark:text-clinic-300" to="/login">
              Back to general login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}