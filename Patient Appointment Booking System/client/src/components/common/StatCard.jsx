export const StatCard = ({ title, value, change, accent = 'bg-clinic-600' }) => {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{value}</h3>
          {change ? <p className="mt-2 text-sm text-clinic-600 dark:text-clinic-300">{change}</p> : null}
        </div>
        <div className={`h-12 w-12 rounded-2xl ${accent} shadow-soft`} />
      </div>
    </div>
  );
};