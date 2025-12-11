import React from "react";

// Panel informasi: ringkasan top poli & total setahun
function MonthlyInfoPanel({ data }) {
  const series = data?.series ?? [];
  const year = data?.year ?? new Date().getFullYear();

  const ranked = [...series].sort((a, b) => (b.total ?? 0) - (a.total ?? 0));
  const totalAll = ranked.reduce((acc, s) => acc + (s.total ?? 0), 0);

  return (
    <div className="space-y-4 text-sm">
      <p className="text-gray-600 dark:text-gray-300">Ringkasan kunjungan tahun {year}</p>
      <div className="rounded-xl bg-gradient-to-br from-slate-50/80 to-slate-100/60 dark:from-gray-800/60 dark:to-gray-800/40 border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-200 font-medium">Total semua poli</span>
          <span className="text-gray-900 dark:text-white font-semibold">{totalAll}</span>
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Top poli (berdasarkan total setahun)</p>
        <ul className="space-y-2">
          {ranked.map((s) => (
            <li key={s.kd_poli}>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-200">{s.nm_poli}</span>
                <span className="text-gray-900 dark:text-white font-semibold">{s.total}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default React.memo(MonthlyInfoPanel);