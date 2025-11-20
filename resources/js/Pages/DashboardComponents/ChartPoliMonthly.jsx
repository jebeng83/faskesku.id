import React from "react";

// Komponen ChartPoliMonthly: grafik batang (grouped bars) tanpa library eksternal
function ChartPoliMonthly({ data }) {
  const months = data?.months ?? [];
  const series = data?.series ?? [];
  const maxVal = Math.max(1, data?.max ?? 1);
  const totalPerMonth = months.map((_, mi) =>
    series.reduce((acc, s) => acc + (s.data?.[mi] ?? 0), 0)
  );

  // Warna untuk masing-masing seri poli (kelas Tailwind)
  const palette = [
    "from-blue-500 to-blue-600",
    "from-indigo-500 to-indigo-600",
    "from-purple-500 to-purple-600",
    "from-emerald-500 to-emerald-600",
    "from-amber-500 to-amber-600",
    "from-rose-500 to-rose-600",
    "from-cyan-500 to-cyan-600",
  ];
  const borderPalette = [
    "border-blue-600/40",
    "border-indigo-600/40",
    "border-purple-600/40",
    "border-emerald-600/40",
    "border-amber-600/40",
    "border-rose-600/40",
    "border-cyan-600/40",
  ];
  const colors = series.map((_, idx) => palette[idx % palette.length]);
  const borders = series.map((_, idx) => borderPalette[idx % borderPalette.length]);

  // Ukuran chart
  const chartHeight = 240; // px
  const groupWidth = 54; // px untuk tiap bulan
  const barWidth = Math.max(7, Math.min(12, Math.floor(30 / Math.max(1, series.length))));
  const barGap = 4; // px antar bar dalam grup

  // Axis labels (4 garis + 0)
  const axisSteps = [0, 0.25, 0.5, 0.75, 1];

  const [hover, setHover] = React.useState(null); // { mi, si, val }
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-300">
        {series.length === 0 ? (
          <span className="text-gray-500 dark:text-gray-400">Tidak ada data poli</span>
        ) : (
          series.map((s, idx) => (
            <div key={s.kd_poli} className="inline-flex items-center gap-2">
              <span className={`inline-block w-3 h-3 rounded bg-gradient-to-br ${colors[idx]} ring-1 ${borders[idx]}`} />
              <span className="font-medium">{s.nm_poli}</span>
            </div>
          ))
        )}
      </div>

      {/* Tooltip */}
      {hover && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-10">
          <div className="px-3 py-2 rounded-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-gray-200 dark:border-gray-800 shadow text-xs text-gray-700 dark:text-gray-200">
            <div className="font-semibold text-gray-900 dark:text-white">{months[hover.mi]}</div>
            <div className="mt-0.5">{series[hover.si]?.nm_poli}</div>
            <div className="mt-0.5 font-mono">
              {hover.val} kunjungan
              {totalPerMonth[hover.mi] > 0 && (
                <span className="text-gray-500 dark:text-gray-400"> · {(hover.val / totalPerMonth[hover.mi] * 100).toFixed(1)}%</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chart grid + bars */}
      <div className="mt-4">
        <div className="relative">
          {/* Axis labels (left) */}
          {axisSteps.map((step, i) => (
            <div key={i} className="absolute -left-12 text-[10px] text-gray-500 dark:text-gray-400" style={{ top: (1 - step) * chartHeight - 6 }}>
              {Math.round(maxVal * step)}
            </div>
          ))}
          {/* Y-grid dashed */}
          {axisSteps.map((step, i) => (
            <div key={`g-${i}`} className="absolute left-0 right-0" style={{ top: (1 - step) * chartHeight }}>
              <div className="border-t border-dashed border-gray-200 dark:border-gray-800" />
            </div>
          ))}

          {/* Bars container */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="flex items-end gap-4" style={{ height: chartHeight }}>
                {months.map((m, mi) => (
                  <div key={m + mi} className="flex items-end" style={{ width: groupWidth }}>
                    {/* Bars per poli */}
                    <div className="flex items-end" style={{ gap: barGap }}>
                      {series.map((s, si) => {
                        const val = s.data?.[mi] ?? 0;
                        const h = Math.round((val / maxVal) * chartHeight);
                        return (
                          <div key={s.kd_poli + mi} className="flex flex-col items-center" style={{ width: barWidth }}>
                            <div
                              className={`w-full bg-gradient-to-t ${colors[si]} rounded-md shadow-sm ring-1 ${borders[si]}`}
                              style={{
                                height: mounted ? h : 0,
                                transition: "height 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                              }}
                              onMouseEnter={() => setHover({ mi, si, val })}
                              onMouseLeave={() => setHover(null)}
                              aria-label={`${s.nm_poli} ${m}: ${val}`}
                            />
                            {h > 22 && (
                              <div className="mt-1 text-[10px] text-gray-600 dark:text-gray-300 font-mono">{val}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {months.map((m) => (
              <div key={m + "lbl"} style={{ width: groupWidth }} className="text-center">
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ChartPoliMonthly);