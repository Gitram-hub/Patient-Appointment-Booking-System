import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import { AppointmentCard } from '../../components/appointments/AppointmentCard.jsx';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get('/appointments').then(({ data }) => setAppointments(data.appointments || [])).catch(() => setAppointments([]));
  }, []);

  const cancel = async (appointmentId) => {
    await api.patch(`/appointments/${appointmentId}/cancel`);
    setAppointments((current) => current.map((appointment) => (appointment._id === appointmentId ? { ...appointment, status: 'cancelled' } : appointment)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Appointments</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">View upcoming, approved, and historical appointments.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="space-y-3">
            <AppointmentCard appointment={appointment} />
            <button onClick={() => cancel(appointment._id)} className="w-full rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-soft hover:bg-rose-700">
              Cancel appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}