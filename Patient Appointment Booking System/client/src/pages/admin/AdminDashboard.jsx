import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import { StatCard } from '../../components/common/StatCard.jsx';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalAppointments: 0, pendingAppointments: 0, completedAppointments: 0, doctorsCount: 0, availableSlots: 0, todaySchedule: [], monthlyStatistics: [] });

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
        <StatCard title="Total appointments" value={stats.totalAppointments} />
        <StatCard title="Pending" value={stats.pendingAppointments} accent="bg-amber-500" />
        <StatCard title="Completed" value={stats.completedAppointments} accent="bg-emerald-500" />
        <StatCard title="Doctors" value={stats.doctorsCount} accent="bg-sky-500" />
      </div>
    </div>
  );
}