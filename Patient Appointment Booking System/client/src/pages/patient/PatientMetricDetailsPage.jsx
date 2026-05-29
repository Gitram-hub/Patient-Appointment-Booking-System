import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../services/api.js';

const fallbackStats = {
  appointments: [],
  pendingRequests: [],
  doctors: [],
  activeSlots: []
};

const titleMap = {
  appointments: 'All appointments',
  pending: 'Pending requests',
  completed: 'Completed appointments',
  doctors: 'Available doctors',
  slots: 'Available slots'
};

export default function PatientMetricDetailsPage() {
  const { view } = useParams();
  const [stats, setStats] = useState(fallbackStats);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get('/dashboard/stats').then(({ data }) => setStats(data.stats || fallbackStats)).catch(() => setStats(fallbackStats));
    api.get('/appointments').then(({ data }) => setAppointments(data.appointments || [])).catch(() => setAppointments([]));
  }, []);

  const config = useMemo(() => {
    switch (view) {
      case 'pending':
        return {
          title: titleMap.pending,
          rows: appointments.filter((appointment) => appointment.status === 'pending'),
          empty: 'No pending appointments found.'
        };
      case 'completed':
        return {
          title: titleMap.completed,
          rows: appointments.filter((appointment) => appointment.status === 'completed'),
          empty: 'No completed appointments found.'
        };
      case 'doctors':
        return {
          title: titleMap.doctors,
          rows: stats.doctors || [],
          empty: 'No doctor details found.'
        };
      case 'slots':
        return {
          title: titleMap.slots,
          rows: stats.activeSlots || [],
          empty: 'No available slots found.'
        };
      case 'appointments':
      default:
        return {
          title: titleMap.appointments,
          rows: appointments,
          empty: 'No appointments found.'
        };
    }
  }, [appointments, stats, view]);

  const renderAppointmentsTable = () => (
    <table className="min-w-full text-left text-sm">
      <thead>
        <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <th className="px-4 py-3">Doctor</th>
          <th className="px-4 py-3">Specialization</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Time</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Reason</th>
        </tr>
      </thead>
      <tbody>
        {config.rows.map((appointment) => (
          <tr key={appointment._id} className="border-t border-slate-200 dark:border-slate-800">
            <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{appointment.doctorId?.userId?.name || '-'}</td>
            <td className="px-4 py-3">{appointment.doctorId?.specialization || '-'}</td>
            <td className="px-4 py-3">{appointment.date || '-'}</td>
            <td className="px-4 py-3">{appointment.time || '-'}</td>
            <td className="px-4 py-3 capitalize">{appointment.status || '-'}</td>
            <td className="px-4 py-3">{appointment.reason || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderDoctorsTable = () => (
    <table className="min-w-full text-left text-sm">
      <thead>
        <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <th className="px-4 py-3">Doctor</th>
          <th className="px-4 py-3">Specialization</th>
          <th className="px-4 py-3">Experience</th>
          <th className="px-4 py-3">Clinic</th>
          <th className="px-4 py-3">Fee</th>
          <th className="px-4 py-3">Rating</th>
        </tr>
      </thead>
      <tbody>
        {config.rows.map((doctor) => (
          <tr key={doctor._id} className="border-t border-slate-200 dark:border-slate-800">
            <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{doctor.userId?.name || '-'}</td>
            <td className="px-4 py-3">{doctor.specialization || '-'}</td>
            <td className="px-4 py-3">{doctor.experienceYears || 0} years</td>
            <td className="px-4 py-3">{doctor.clinicLocation || '-'}</td>
            <td className="px-4 py-3">${doctor.consultationFee || 0}</td>
            <td className="px-4 py-3">{Number(doctor.rating || 0).toFixed(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderSlotsTable = () => (
    <table className="min-w-full text-left text-sm">
      <thead>
        <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <th className="px-4 py-3">Doctor</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Time</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Booked</th>
        </tr>
      </thead>
      <tbody>
        {config.rows.map((slot) => (
          <tr key={slot._id} className="border-t border-slate-200 dark:border-slate-800">
            <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{slot.doctorId?.userId?.name || '-'}</td>
            <td className="px-4 py-3">{slot.date || '-'}</td>
            <td className="px-4 py-3">{slot.startTime || '-'} - {slot.endTime || '-'}</td>
            <td className="px-4 py-3 capitalize">{slot.status || '-'}</td>
            <td className="px-4 py-3">{slot.bookedCount || 0}/{slot.maxBookings || 1}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderTable = () => {
    if (view === 'doctors') return renderDoctorsTable();
    if (view === 'slots') return renderSlotsTable();
    return renderAppointmentsTable();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-clinic-600">Patient details</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{config.title}</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Detailed records for the selected dashboard metric.</p>
        </div>
        <Link to="/dashboard" className="inline-flex rounded-full bg-clinic-600 px-4 py-2 font-semibold text-white shadow-soft hover:bg-clinic-700">
          Back to dashboard
        </Link>
      </div>

      <div className="glass-panel rounded-[2rem] p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">Showing all details for: {config.title}</p>
        <div className="mt-6 overflow-x-auto">
          {config.rows.length > 0 ? (
            renderTable()
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
              {config.empty}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
