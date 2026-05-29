import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { api } from '../../services/api.js';
import { DoctorCard } from '../../components/doctors/DoctorCard.jsx';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [query, setQuery] = useState('');
  const [specialization, setSpecialization] = useState('');

  const loadDoctors = async () => {
    const { data } = await api.get('/doctors', { params: { q: query, specialization } });
    setDoctors(data.doctors || []);
  };

  useEffect(() => {
    loadDoctors().catch(() => setDoctors([]));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Doctors</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Search by name, specialization, or clinic location.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
            <Search className="h-4 w-4 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search doctors" className="bg-transparent outline-none" />
          </div>
          <input value={specialization} onChange={(event) => setSpecialization(event.target.value)} placeholder="Specialization" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-slate-800 dark:bg-slate-900" />
          <button onClick={loadDoctors} className="rounded-2xl bg-clinic-600 px-5 py-3 font-semibold text-white shadow-soft hover:bg-clinic-700">Filter</button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}