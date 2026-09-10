import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { SERVICE_TRENDS_DATA } from '../../data/dashboardData';

export const DiseaseTrendChart = () => {
  const [activeSeries, setActiveSeries] = useState({
    CitizenRequests: true,
    ConsultationsCompleted: true,
    Referrals: true,
    FollowUpsCompleted: true
  });

  const toggleSeries = (dataKey) => {
    setActiveSeries((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }));
  };

  const seriesConfig = [
    { key: 'CitizenRequests', name: 'Citizen Requests', color: '#B94A25', strokeWidth: 2.5 },
    { key: 'ConsultationsCompleted', name: 'Consultations Completed', color: '#405642', strokeWidth: 2 },
    { key: 'Referrals', name: 'Referrals', color: '#3D6B8C', strokeWidth: 2 },
    { key: 'FollowUpsCompleted', name: 'Follow-ups Completed', color: '#D98A2C', strokeWidth: 2 }
  ];

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#FAF7F2] border border-[#DCCDBB] p-2.5 rounded-lg shadow-lg text-xs space-y-1">
          <div className="font-bold text-[#211C17] border-b border-[#EAE0D2] pb-0.5 mb-1">
            {label} Care Continuity Period
          </div>
          {payload.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5" style={{ color: item.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}:
              </span>
              <span className="font-bold text-[#211C17]">{item.value} units</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
          Healthcare Service Trends <span className="text-xs font-normal text-[#756B60]">(Last 6 Weeks)</span>
        </h2>
      </div>

      {/* Interactive Legend Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-3 select-none">
        {seriesConfig.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => toggleSeries(s.key)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all border ${
              activeSeries[s.key]
                ? 'bg-[#FAF7F2] border-[#DCCDBB] shadow-2xs'
                : 'bg-[#EFE5D5]/50 border-transparent opacity-40 line-through'
            }`}
            style={{ color: s.color }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span>{s.name}</span>
          </button>
        ))}
      </div>

      {/* Recharts Chart Area */}
      <div className="flex-1 w-full min-h-[170px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={SERVICE_TRENDS_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#EAE0D2" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fill: '#756B60', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#DCCDBB' }}
            />
            <YAxis
              domain={[0, 260]}
              ticks={[0, 65, 130, 195, 260]}
              tick={{ fill: '#756B60', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#DCCDBB' }}
            />
            <Tooltip content={<CustomTooltip />} />

            {seriesConfig.map((s) =>
              activeSeries[s.key] ? (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.name}
                  stroke={s.color}
                  strokeWidth={s.strokeWidth}
                  dot={{ r: 3.5, fill: s.color, strokeWidth: 1.5, stroke: '#FAF7F2' }}
                  activeDot={{ r: 5.5, fill: s.color, stroke: '#FFFFFF', strokeWidth: 2 }}
                />
              ) : null
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
