import { CalendarClock, LayoutDashboard, MessageSquareMore, Stethoscope, BarChart3 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/doctors', label: 'Doctors', icon: Stethoscope },
  { to: '/appointments', label: 'Appointments', icon: CalendarClock },
  { to: '/assistant', label: 'AI Assistant', icon: MessageSquareMore },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 }
];

export const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="hidden w-72 border-r border-slate-200/80 bg-white/90 px-4 py-6 backdrop-blur-xl lg:block dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex h-full flex-col gap-6">
        <div className="rounded-3xl bg-clinic-600 p-5 text-white shadow-soft">
          <p className="text-xs uppercase tracking-[0.4em] text-clinic-100">Patient Booking</p>
          <h2 className="mt-3 text-2xl font-semibold">AI-Powered Care</h2>
          <p className="mt-2 text-sm text-clinic-50/90">Appointment scheduling, doctor management, and instant healthcare guidance.</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-clinic-600 text-white shadow-soft'
                      : 'text-slate-600 hover:bg-clinic-50 hover:text-clinic-700 dark:text-slate-300 dark:hover:bg-slate-900'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Signed in as</p>
          <div className="mt-2">
            <p className="font-semibold text-slate-900 dark:text-slate-100">{user?.name || 'Guest user'}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.role || 'patient'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};