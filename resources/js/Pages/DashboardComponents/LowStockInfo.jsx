import React from "react";

function LowStockInfo({ data }) {
  const items = Array.isArray(data) ? data : [];
  if (items.length === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">Tidak ada data</p>;
  }
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-800">
      {items.map((it, idx) => (
        <div
          key={(it.kode_brng || "") + idx}
          className="grid grid-cols-3 gap-3 px-3 py-2"
        >
          <div className="truncate text-sm text-gray-900 dark:text-white">
            {it.nama_brng || it.kode_brng || "-"}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {Number(it.stok_minimal ?? 0).toLocaleString()}
          </div>
          <div className="text-sm font-mono text-right text-gray-900 dark:text-white">
            {Number(it.stok_saat_ini ?? 0).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default React.memo(LowStockInfo);
