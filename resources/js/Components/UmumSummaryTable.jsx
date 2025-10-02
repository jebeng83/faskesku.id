import React from 'react';

export default function UmumSummaryTable({ penjualanUmum }) {
  return (
    <div className="mt-10 border rounded overflow-hidden">
      <h4 className="px-4 py-3 font-semibold bg-gray-50 border-b">Data Pengaturan Harga Umum (setpenjualanumum)</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">Ralan</th>
              <th className="px-3 py-2 text-left">Kelas 1</th>
              <th className="px-3 py-2 text-left">Kelas 2</th>
              <th className="px-3 py-2 text-left">Kelas 3</th>
              <th className="px-3 py-2 text-left">Utama</th>
              <th className="px-3 py-2 text-left">VIP</th>
              <th className="px-3 py-2 text-left">VVIP</th>
              <th className="px-3 py-2 text-left">Beli Luar</th>
              <th className="px-3 py-2 text-left">Jual Bebas</th>
              <th className="px-3 py-2 text-left">Karyawan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2">{penjualanUmum?.ralan ?? 0}</td>
              <td className="px-3 py-2">{penjualanUmum?.kelas1 ?? 0}</td>
              <td className="px-3 py-2">{penjualanUmum?.kelas2 ?? 0}</td>
              <td className="px-3 py-2">{penjualanUmum?.kelas3 ?? 0}</td>
              <td className="px-3 py-2">{penjualanUmum?.utama ?? 0}</td>
              <td className="px-3 py-2">{penjualanUmum?.vip ?? 0}</td>
              <td className="px-3 py-2">{penjualanUmum?.vvip ?? 0}</td>
              <td className="px-3 py-2">{penjualanUmum?.beliluar ?? 0}</td>
              <td className="px-3 py-2">{penjualanUmum?.jualbebas ?? 0}</td>
              <td className="px-3 py-2">{penjualanUmum?.karyawan ?? 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}