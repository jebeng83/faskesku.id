import React from 'react';

/**
 * Ringkasan pengaturan harga per-barang.
 * Props:
 * - items: array of rows { kode_brng, nama_barang, ralan, kelas1, kelas2, kelas3, utama, vip, vvip, beliluar, jualbebas, karyawan }
 * - onSelect: function(row) -> void
 */
export default function BarangSummaryTable({ items = [], onSelect, onDelete }) {
  const cols = [
    { key: 'kode_brng', label: 'Kode' },
    { key: 'nama_barang', label: 'Nama Barang' },
    { key: 'ralan', label: 'Ralan (%)' },
    { key: 'kelas1', label: 'Kelas 1 (%)' },
    { key: 'kelas2', label: 'Kelas 2 (%)' },
    { key: 'kelas3', label: 'Kelas 3 (%)' },
    { key: 'utama', label: 'Utama (%)' },
    { key: 'vip', label: 'VIP (%)' },
    { key: 'vvip', label: 'VVIP (%)' },
    { key: 'beliluar', label: 'Beli Luar (%)' },
    { key: 'jualbebas', label: 'Jual Bebas (%)' },
    { key: 'karyawan', label: 'Karyawan (%)' },
  ];

  return (
    <div className="mt-6 border rounded overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-700">Ringkasan Pengaturan Per Barang</h4>
        <span className="text-xs text-gray-500">Total: {Array.isArray(items) ? items.length : 0} barang</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              {cols.map((c) => (
                <th key={c.key} className="px-3 py-2 text-left whitespace-nowrap">{c.label}</th>
              ))}
              <th className="px-3 py-2 text-left whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(items) && items.length > 0 ? (
              items.map((row) => (
                <tr
                  key={row.kode_brng}
                  className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50 cursor-pointer"
                  onClick={() => onSelect?.(row)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelect?.(row);
                    }
                  }}
                  role="button"
                  aria-label={`Pilih ${row.nama_barang || row.kode_brng}`}
                >
                  {cols.map((c) => (
                    <td key={c.key} className="px-3 py-2 align-top whitespace-nowrap">
                      {typeof row[c.key] === 'number' ? Number(row[c.key]).toFixed(2) : (row[c.key] ?? '')}
                    </td>
                  ))}
                  <td className="px-3 py-2 align-top whitespace-nowrap">
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800 text-xs"
                      onClick={(e) => { e.stopPropagation(); onDelete?.(row); }}
                      title="Hapus pengaturan"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-3 py-3 text-center text-gray-500" colSpan={cols.length + 1}>Belum ada pengaturan per barang</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}