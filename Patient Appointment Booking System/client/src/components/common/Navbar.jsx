import { Bell, Menu, MoonStar, SunMedium } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm lg:hidden dark:border-slate-800 dark:bg-slate-900">
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-clinic-600">Healthcare Suite</p>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Patient Appointment Booking'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {darkMode ? <SunMedium className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
          </button>
          <button className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Bell className="h-5 w-5" />
          </button>
          {user ? (
            <button onClick={logout} className="rounded-xl bg-clinic-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-clinic-700">
              Sign out
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};