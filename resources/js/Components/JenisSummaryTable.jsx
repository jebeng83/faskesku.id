import React from 'react';

export default function JenisSummaryTable({ items, onSelect, onDelete }) {
  const rows = Array.isArray(items) ? items : [];
  return (
    <div className="mt-6 border rounded overflow-x-auto">
      <div className="px-4 py-3 bg-gray-50 border-b">
        <h4 className="text-sm font-medium text-gray-700">Data Pengaturan Harga Per Jenis</h4>
      </div>
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left">Ralan(%)</th>
            <th className="px-3 py-2 text-left">Ranap K1(%)</th>
            <th className="px-3 py-2 text-left">Ranap K2(%)</th>
            <th className="px-3 py-2 text-left">Ranap K3(%)</th>
            <th className="px-3 py-2 text-left">Kelas Utama(%)</th>
            <th className="px-3 py-2 text-left">Ranap VIP(%)</th>
            <th className="px-3 py-2 text-left">Ranap VVIP(%)</th>
            <th className="px-3 py-2 text-left">Beli Luar(%)</th>
            <th className="px-3 py-2 text-left">Jual Bebas(%)</th>
            <th className="px-3 py-2 text-left">Karyawan(%)</th>
            <th className="px-3 py-2 text-left">Kode Jenis</th>
            <th className="px-3 py-2 text-left">Nama Jenis</th>
            <th className="px-3 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows.map((r, i) => (
            <tr
              key={i}
              className={`odd:bg-white even:bg-gray-50 ${onSelect ? 'cursor-pointer hover:bg-indigo-50' : ''}`}
              onClick={onSelect ? () => onSelect(r) : undefined}
              title={onSelect ? 'Klik untuk mengisi form di atas' : undefined}
            >
              <td className="px-3 py-2">{r.ralan}</td>
              <td className="px-3 py-2">{r.kelas1}</td>
              <td className="px-3 py-2">{r.kelas2}</td>
              <td className="px-3 py-2">{r.kelas3}</td>
              <td className="px-3 py-2">{r.utama}</td>
              <td className="px-3 py-2">{r.vip}</td>
              <td className="px-3 py-2">{r.vvip}</td>
              <td className="px-3 py-2">{r.beliluar}</td>
              <td className="px-3 py-2">{r.jualbebas}</td>
              <td className="px-3 py-2">{r.karyawan}</td>
              <td className="px-3 py-2 font-mono">{r.kdjns}</td>
              <td className="px-3 py-2">{r.nama_jenis || '-'}</td>
              <td className="px-3 py-2">
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 text-xs"
                  onClick={(e) => { e.stopPropagation(); onDelete?.(r); }}
                  title="Hapus pengaturan"
                >
                  Hapus
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={13} className="px-3 py-6 text-center text-gray-500">Tidak ada data per-jenis.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}