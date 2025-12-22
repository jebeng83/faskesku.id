import React from "react";

// Komponen ChartPoliMonthly: grafik batang (grouped bars) tanpa library eksternal
function ChartPoliMonthly({ data }) {
  const months = data?.months ?? [];
  const series = data?.series ?? [];
  const maxVal = Math.max(1, data?.max ?? 1);
  const totalPerMonth = months.map((_, mi) =>
    series.reduce((acc, s) => acc + (s.data?.[mi] ?? 0), 0)
  );

  const lineColors = [
    "#2563eb",
    "#4f46e5",
    "#7c3aed",
    "#059669",
    "#f59e0b",
    "#f97316",
    "#06b6d4",
  ];
  const colors = [
    "from-blue-500 to-blue-600",
    "from-indigo-500 to-indigo-600",
    "from-purple-500 to-purple-600",
    "from-emerald-500 to-emerald-600",
    "from-amber-500 to-amber-600",
    "from-rose-500 to-rose-600",
    "from-cyan-500 to-cyan-600",
  ];
  const borders = [
    "border-blue-600/40",
    "border-indigo-600/40",
    "border-purple-600/40",
    "border-emerald-600/40",
    "border-amber-600/40",
    "border-rose-600/40",
    "border-cyan-600/40",
  ];

  const chartHeight = 260;
  const paddingLeft = 44;
  const paddingRight = 16;
  const paddingTop = 10;
  const paddingBottom = 30;

  const containerRef = React.useRef(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const chartWidthBase = Math.max(months.length * 56, 480);
  const chartWidth = containerWidth || chartWidthBase;
  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  const axisSteps = [0, 0.25, 0.5, 0.75, 1];

  const buildSmoothPath = (points) => {
    if (!points.length) return "";
    if (points.length === 1) {
      const p = points[0];
      return `M ${p.x} ${p.y}`;
    }
    if (points.length === 2) {
      const a = points[0];
      const b = points[1];
      return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
    }
    const tension = 0.5;
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const cp1x = p1.x + ((p2.x - p0.x) * tension) / 6;
      const cp1y = p1.y + ((p2.y - p0.y) * tension) / 6;
      const cp2x = p2.x - ((p3.x - p1.x) * tension) / 6;
      const cp2y = p2.y - ((p3.y - p1.y) * tension) / 6;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const [hover, setHover] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      const next = el.clientWidth || 0;
      setContainerWidth((prev) => (prev !== next ? next : prev));
    };

    updateWidth();

    let resizeObserver = null;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateWidth);
      resizeObserver.observe(el);
    } else {
      window.addEventListener("resize", updateWidth);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", updateWidth);
      }
    };
  }, []);

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
          series.map((s, idx) => {
            const isSeriesHovered = hover && hover.si === idx;
            const isSeriesDimmed = hover && hover.si !== idx;
            return (
              <button
                key={s.kd_poli}
                type="button"
                onMouseEnter={() =>
                  setHover({
                    mi: null,
                    si: idx,
                    val: null,
                    x: null,
                  })
                }
                onMouseLeave={() => setHover(null)}
                className={`inline-flex items-center gap-2 rounded-full px-2 py-1 transition ${
                  isSeriesHovered
                    ? "bg-white/60 dark:bg-white/10 shadow-sm"
                    : isSeriesDimmed
                    ? "opacity-60"
                    : ""
                }`}
              >
                <span
                  className={`inline-block w-3 h-3 rounded bg-gradient-to-br ${colors[idx]} ring-1 ${borders[idx]}`}
                />
                <span className="font-medium">{s.nm_poli}</span>
              </button>
            );
          })
        )}
      </div>

      {/* Tooltip */}
      {hover && hover.mi != null && (
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

      <div className="mt-4">
        <div className="relative w-full" ref={containerRef}>
          <svg
            width="100%"
            height={chartHeight}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="text-gray-500 dark:text-gray-400"
          >
            <defs>
              <linearGradient id="chartBgMonthly" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.16" />
                <stop offset="40%" stopColor="#0f172a" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </linearGradient>
              <filter
                id="lineShadowMonthly"
                x="-20%"
                y="-20%"
                width="140%"
                height="160%"
              >
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                <feOffset dx="0" dy="6" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.25" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {series.map((s, si) => {
                const color = lineColors[si % lineColors.length];
                return (
                  <linearGradient
                    key={`area-${s.kd_poli}`}
                    id={`areaMonthly-${si}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                    <stop offset="70%" stopColor={color} stopOpacity="0.06" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                  </linearGradient>
                );
              })}
            </defs>

            <rect
              x={paddingLeft}
              y={paddingTop}
              width={innerWidth}
              height={innerHeight}
              fill="url(#chartBgMonthly)"
              rx="16"
              ry="16"
            />

            {axisSteps.map((step, i) => {
              const y =
                paddingTop + innerHeight * (1 - step);
              return (
                <g key={i}>
                  <line
                    x1={paddingLeft}
                    x2={chartWidth - paddingRight}
                    y1={y}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeDasharray="4 4"
                    className="dark:stroke-gray-800"
                  />
                  <text
                    x={paddingLeft - 6}
                    y={y + 3}
                    textAnchor="end"
                    fontSize="10"
                    fill="#6b7280"
                    className="dark:fill-gray-400"
                  >
                    {Math.round(maxVal * step)}
                  </text>
                </g>
              );
            })}

            {series.map((s, si) => {
              const color = lineColors[si % lineColors.length];
              const isSeriesHovered = hover && hover.si === si;
              const isSeriesDimmed = hover && hover.si !== si;
              const pts = months.map((m, mi) => {
                const val = s.data?.[mi] ?? 0;
                const x =
                  paddingLeft +
                  (months.length > 1
                    ? (innerWidth * mi) / (months.length - 1)
                    : innerWidth / 2);
                const y =
                  paddingTop +
                  innerHeight * (1 - val / maxVal);
                return { x, y, val, mi };
              });

              if (!pts.length) {
                return null;
              }

              const baseY = paddingTop + innerHeight;
              const first = pts[0];
              const last = pts[pts.length - 1];

              const d = buildSmoothPath(pts);

              const areaD =
                `M ${first.x} ${baseY} ` +
                pts
                  .map((p) => `L ${p.x} ${p.y}`)
                  .join(" ") +
                ` L ${last.x} ${baseY} Z`;

              return (
                <g key={s.kd_poli}>
                  <path
                    d={areaD}
                    fill={`url(#areaMonthly-${si})`}
                    opacity={
                      mounted
                        ? isSeriesDimmed
                          ? 0.35
                          : 0.95
                        : 0
                    }
                    style={{
                      transition:
                        "opacity 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke={color}
                    strokeWidth={isSeriesHovered ? 4.2 : 3.2}
                    strokeOpacity={isSeriesDimmed ? 0.18 : 0.4}
                    filter="url(#lineShadowMonthly)"
                    pathLength={1}
                    style={{
                      transition:
                        "stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                      strokeDasharray: 1,
                      strokeDashoffset: mounted ? 0 : 1,
                    }}
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke={color}
                    strokeWidth={isSeriesHovered ? 2.6 : 2.1}
                    opacity={
                      mounted
                        ? isSeriesDimmed
                          ? 0.45
                          : 0.98
                        : 0
                    }
                    pathLength={1}
                    style={{
                      transition:
                        "opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                      strokeDasharray: 1,
                      strokeDashoffset: mounted ? 0 : 1,
                    }}
                  />
                  {pts.map((p) => (
                    <g key={`${s.kd_poli}-${p.mi}`}>
                      {(() => {
                        const isPointHovered =
                          hover &&
                          hover.si === si &&
                          hover.mi === p.mi;
                        const outerR = isPointHovered
                          ? 9
                          : isSeriesHovered
                          ? 7
                          : 5.5;
                        const innerR = isPointHovered
                          ? 5
                          : isSeriesHovered
                          ? 3.8
                          : 3.1;
                        const outerOpacity = isSeriesDimmed
                          ? 0.08
                          : 0.18;

                        return (
                          <>
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r={outerR}
                              fill={color}
                              fillOpacity={outerOpacity}
                              stroke="none"
                            />
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r={innerR}
                              fill="#0b1120"
                              stroke={color}
                              strokeWidth={2}
                              onMouseEnter={() =>
                                setHover({
                                  mi: p.mi,
                                  si,
                                  val: p.val,
                                  x: p.x,
                                })
                              }
                              onMouseLeave={() => setHover(null)}
                            />
                          </>
                        );
                      })()}
                    </g>
                  ))}
                </g>
              );
            })}

            {months.map((m, mi) => {
              const x =
                paddingLeft +
                (months.length > 1
                  ? (innerWidth * mi) /
                    (months.length - 1)
                  : innerWidth / 2);
              const y = chartHeight - paddingBottom + 16;
              return (
                <text
                  key={m + "lbl"}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#6b7280"
                  className="dark:fill-gray-400"
                >
                  {m}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ChartPoliMonthly);
