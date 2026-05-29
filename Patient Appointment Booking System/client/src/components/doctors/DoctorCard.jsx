import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DoctorCard = ({ doctor }) => {
  return (
    <div className="glass-panel rounded-3xl p-5 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-clinic-600 text-xl font-semibold text-white shadow-soft">
          {doctor.userId?.name
            ?.split(' ')
            .map((word) => word[0])
            .slice(0, 2)
            .join('')}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{doctor.userId?.name}</h3>
              <p className="text-sm text-clinic-600 dark:text-clinic-300">{doctor.specialization}</p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
              <Star className="h-4 w-4 fill-current" />
              {Number(doctor.rating || 0).toFixed(1)}
            </div>
          </div>
          <p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{doctor.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-900">
              <MapPin className="h-3 w-3" />
              {doctor.clinicLocation}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-900">${doctor.consultationFee}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-900">{doctor.experienceYears} years</span>
          </div>
          <div className="mt-5 flex justify-end">
            <Link
              to={`/doctors/${doctor._id}`}
              className="inline-flex items-center rounded-full bg-clinic-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-clinic-700"
            >
              Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};