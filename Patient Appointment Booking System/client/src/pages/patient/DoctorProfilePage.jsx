import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api.js';
import { AppointmentCard } from '../../components/appointments/AppointmentCard.jsx';

export default function DoctorProfilePage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (!id) return;
    api.get(`/doctors/${id}`).then(({ data }) => setDoctor(data.doctor)).catch(() => setDoctor(null));
    api.get('/slots', { params: { doctorId: id } }).then(({ data }) => setSlots(data.slots || [])).catch(() => setSlots([]));
  }, [id]);

  if (!doctor) {
    return <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">Loading doctor profile...</div>;
  }

  const book = async (slot) => {
    await api.post('/appointments', {
      doctorId: doctor._id,
      slotId: slot._id,
      date: slot.date,
      time: slot.startTime,
      reason
    });
    alert('Appointment booked');
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-[2rem] p-8">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{doctor.userId?.name}</h2>
        <p className="mt-2 text-clinic-600 dark:text-clinic-300">{doctor.specialization}</p>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">{doctor.bio}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">Fee: ${doctor.consultationFee}</div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">Experience: {doctor.experienceYears} years</div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">Rating: {Number(doctor.rating).toFixed(1)}</div>
        </div>
      </div>

      <div className="glass-panel rounded-[2rem] p-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Available slots</h3>
        <textarea value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Reason for visit" className="mt-4 w-full rounded-2xl border border-slate-200 bg-white p-4 outline-none dark:border-slate-800 dark:bg-slate-950" />
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {slots.map((slot) => (
            <button key={slot._id} onClick={() => book(slot)} className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-clinic-300 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold">{slot.date}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {slot.startTime} - {slot.endTime}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.35em] text-clinic-600">{slot.status}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}