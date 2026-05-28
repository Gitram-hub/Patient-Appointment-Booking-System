import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import { StatCard } from '../../components/common/StatCard.jsx';

export default function DoctorDashboard() {
  const [stats, setStats] = useState({ totalAppointments: 0, pendingAppointments: 0, completedAppointments: 0, doctorsCount: 0, availableSlots: 0, todaySchedule: [], monthlyStatistics: [] });

  useEffect(() => {
    api.get('/dashboard/stats').then(({ data }) => setStats(data.stats)).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Doctor dashboard</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Manage schedules, approvals, and daily patient flow.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total appointments" value={stats.totalAppointments} />
        <StatCard title="Pending" value={stats.pendingAppointments} accent="bg-amber-500" />
        <StatCard title="Completed" value={stats.completedAppointments} accent="bg-emerald-500" />
        <StatCard title="Available slots" value={stats.availableSlots} accent="bg-sky-500" />
      </div>
      <div className="glass-panel rounded-3xl p-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Today’s schedule</h3>
        <div className="mt-4 space-y-3">
          {stats.todaySchedule.map((item) => (
            <div key={item._id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold">{item.patientId?.name || 'Patient'}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.time} · {item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}