import { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { api } from '../../services/api.js';
import { StatCard } from '../../components/common/StatCard.jsx';
import { AppointmentCard } from '../../components/appointments/AppointmentCard.jsx';

const fallbackStats = {
  totalAppointments: 0,
  pendingAppointments: 0,
  completedAppointments: 0,
  doctorsCount: 0,
  availableSlots: 0,
  todaySchedule: [],
  monthlyStatistics: []
};

export default function PatientDashboard() {
  const [stats, setStats] = useState(fallbackStats);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get('/dashboard/stats').then(({ data }) => setStats(data.stats)).catch(() => setStats(fallbackStats));
    api.get('/appointments').then(({ data }) => setAppointments(data.appointments)).catch(() => setAppointments([]));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Dashboard overview</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Track appointments, schedules, and monthly trends at a glance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total appointments" value={stats.totalAppointments} change="Across all patients" />
        <StatCard title="Pending requests" value={stats.pendingAppointments} change="Needs review" accent="bg-amber-500" />
        <StatCard title="Completed" value={stats.completedAppointments} change="Closed appointments" accent="bg-emerald-500" />
        <StatCard title="Doctors" value={stats.doctorsCount} change="Active clinicians" accent="bg-sky-500" />
        <StatCard title="Available slots" value={stats.availableSlots} change="Ready to book" accent="bg-violet-500" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Monthly appointments</h3>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyStatistics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#20a56e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Recent appointments</h3>
          <div className="mt-5 grid gap-4">
            {appointments.slice(0, 4).map((appointment) => (
              <AppointmentCard key={appointment._id} appointment={appointment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}