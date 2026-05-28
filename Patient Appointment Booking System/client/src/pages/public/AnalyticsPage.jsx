import { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { api } from '../../services/api.js';

export default function AnalyticsPage() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    api.get('/dashboard/stats').then(({ data }) => setChartData(data.stats.monthlyStatistics || [])).catch(() => setChartData([]));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Analytics</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Monthly appointment trends and operational insights.</p>
      </div>
      <div className="glass-panel h-[420px] rounded-[2rem] p-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#20a56e" fill="#20a56e" fillOpacity={0.25} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}