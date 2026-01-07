import React from "react";

function FastMovingChart({ data }) {
  const items = Array.isArray(data) ? data : [];
  const max = Math.max(1, ...items.map((it) => Number(it?.jumlah ?? 0)));
  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <div className="text-sm text-gray-500 dark:text-gray-400">Tidak ada data</div>
      ) : (
        items.map((it, idx) => {
          const val = Number(it?.jumlah ?? 0);
          const pct = Math.round((val / max) * 100);
          return (
            <div key={(it.kode_brng || "") + idx} className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-5 truncate text-sm text-gray-900 dark:text-white">{it.nama_brng || it.kode_brng || "-"}</div>
              <div className="col-span-6">
                <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <div className="h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="col-span-1 text-right font-mono text-sm text-gray-900 dark:text-white">{val}</div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default React.memo(FastMovingChart);

