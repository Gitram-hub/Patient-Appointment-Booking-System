import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api.js';
import { StatCard } from '../../components/common/StatCard.jsx';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalAppointments: 0, pendingAppointments: 0, completedAppointments: 0, doctorsCount: 0, availableSlots: 0, todaySchedule: [], monthlyStatistics: [] });
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/dashboard/stats').then(({ data }) => setStats(data.stats)).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Admin dashboard</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Monitor system usage, operational trends, and appointment volume.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total appointments" value={stats.totalAppointments} onClick={() => navigate('/admin-dashboard/details/appointments')} />
        <StatCard title="Pending requests" value={stats.pendingAppointments} accent="bg-amber-500" onClick={() => navigate('/admin-dashboard/details/pending')} />
        <StatCard title="Completed" value={stats.completedAppointments} accent="bg-emerald-500" onClick={() => navigate('/admin-dashboard/details/completed')} />
        <StatCard title="Doctors" value={stats.doctorsCount} accent="bg-sky-500" onClick={() => navigate('/admin-dashboard/details/doctors')} />
        <StatCard title="Available slots" value={stats.availableSlots} accent="bg-violet-500" onClick={() => navigate('/admin-dashboard/details/slots')} />
      </div>

      <div className="glass-panel rounded-[2rem] p-6">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Open a metric</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Click any card above to open a page with the full records for that category.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
          <Link className="rounded-full bg-clinic-600 px-4 py-2 text-white shadow-soft" to="/admin-dashboard/details/appointments">Appointments</Link>
          <Link className="rounded-full bg-amber-500 px-4 py-2 text-white shadow-soft" to="/admin-dashboard/details/pending">Pending</Link>
          <Link className="rounded-full bg-emerald-500 px-4 py-2 text-white shadow-soft" to="/admin-dashboard/details/completed">Completed</Link>
          <Link className="rounded-full bg-sky-500 px-4 py-2 text-white shadow-soft" to="/admin-dashboard/details/doctors">Doctors</Link>
          <Link className="rounded-full bg-violet-500 px-4 py-2 text-white shadow-soft" to="/admin-dashboard/details/slots">Available slots</Link>
        </div>
      </div>
    </div>
  );
}