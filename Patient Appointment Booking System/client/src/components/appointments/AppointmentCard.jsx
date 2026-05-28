const statusStyles = {
  pending: 'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
  approved: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
  rejected: 'bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300',
  completed: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  cancelled: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
};

export const AppointmentCard = ({ appointment }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{appointment.doctorId?.userId?.name || 'Doctor'}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{appointment.doctorId?.specialization}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[appointment.status]}`}>{appointment.status}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
        <div>
          <p className="text-slate-400">Date</p>
          <p>{appointment.date}</p>
        </div>
        <div>
          <p className="text-slate-400">Time</p>
          <p>{appointment.time}</p>
        </div>
      </div>
    </div>
  );
};