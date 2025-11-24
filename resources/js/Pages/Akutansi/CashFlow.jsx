import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import SidebarKeuangan from '@/Layouts/SidebarKeuangan';

// Utility: format currency IDR
const formatIDR = (n) => {
  try {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(n || 0));
  } catch (_) {
    return `${n}`;
  }
};

// Motion variants (UI_UX guide-inspired)
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function CashFlow() {
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [from, setFrom] = useState(todayStr);
  const [to, setTo] = useState(todayStr);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ kas_awal: [], kas_masuk: [], kas_keluar: [], totals: { kas_awal: 0, penerimaan: 0, pengeluaran: 0, kas_akhir: 0 } });
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/akutansi/cashflow', { params: { from, to } });
      setData(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const totals = data?.totals || { kas_awal: 0, penerimaan: 0, pengeluaran: 0, kas_akhir: 0 };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="backdrop-blur-md bg-white/70 dark:bg-slate-900/50 border border-white/60 dark:border-slate-800 rounded-xl shadow-sm">
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-500">Cash Flow / Arus Kas</h1>
                <p className="text-sm text-slate-600">Ringkasan kas awal, kas masuk, dan kas keluar berdasarkan jurnal transaksi.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fetchData}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow hover:from-indigo-700 hover:to-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Memuat...' : 'Refresh'}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-slate-700 border border-slate-200 shadow hover:bg-slate-50"
                >
                  Cetak
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Form */}
        <motion.form variants={itemVariants} onSubmit={onSubmit} className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-white/60 bg-white/70 backdrop-blur-md shadow-sm">
              <label className="block text-sm font-medium text-slate-700">Tanggal Dari</label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="mt-1 w-full rounded-lg border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="p-4 rounded-xl border border-white/60 bg-white/70 backdrop-blur-md shadow-sm">
              <label className="block text-sm font-medium text-slate-700">Tanggal Sampai</label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mt-1 w-full rounded-lg border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="p-4 rounded-xl border border-white/60 bg-white/70 backdrop-blur-md shadow-sm flex items-end">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow hover:from-indigo-700 hover:to-blue-700"
                disabled={loading}
              >
                Tampilkan
              </button>
            </div>
            <div className="p-4 rounded-xl border border-white/60 bg-white/70 backdrop-blur-md shadow-sm">
              <div className="text-sm text-slate-600">Periode aktif</div>
              <div className="font-semibold">{data?.filters ? `${data.filters.from} s.d. ${data.filters.to}` : `${from} s.d. ${to}`}</div>
            </div>
          </div>
          {error && (
            <div className="mt-3 text-sm text-red-600">{error}</div>
          )}
        </motion.form>

        {/* Summary Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl border border-white/60 bg-white/70 backdrop-blur-md shadow-sm">
            <div className="text-sm text-slate-600">Kas Awal</div>
            <div className="mt-1 text-2xl font-bold text-slate-800">{formatIDR(totals.kas_awal)}</div>
          </div>
          <div className="p-4 rounded-xl border border-white/60 bg-white/70 backdrop-blur-md shadow-sm">
            <div className="text-sm text-slate-600">Kas Masuk</div>
            <div className="mt-1 text-2xl font-bold text-emerald-600">{formatIDR(totals.penerimaan)}</div>
          </div>
          <div className="p-4 rounded-xl border border-white/60 bg-white/70 backdrop-blur-md shadow-sm">
            <div className="text-sm text-slate-600">Kas Keluar</div>
            <div className="mt-1 text-2xl font-bold text-rose-600">{formatIDR(totals.pengeluaran)}</div>
          </div>
          <div className="p-4 rounded-xl border border-white/60 bg-white/70 backdrop-blur-md shadow-sm">
            <div className="text-sm text-slate-600">Kas Akhir</div>
            <div className="mt-1 text-2xl font-bold text-indigo-600">{formatIDR(totals.kas_akhir)}</div>
          </div>
        </motion.div>

        {/* Section: Kas Awal */}
        <motion.div variants={itemVariants} className="mb-6">
          <SectionCard title="A. Kas Awal" subtitle="Saldo awal pada akun Neraca (balance = D)" items={data.kas_awal} />
        </motion.div>

        {/* Section: Kas Masuk */}
        <motion.div variants={itemVariants} className="mb-6">
          <SectionCard title="B. Kas Masuk" subtitle="Pergerakan akun Pendapatan (balance = K) dalam periode, ditambah saldo awal akun terkait" items={data.kas_masuk} positive />
        </motion.div>

        {/* Section: Kas Keluar */}
        <motion.div variants={itemVariants} className="mb-6">
          <SectionCard title="C. Kas Keluar" subtitle="Pergerakan akun Beban (balance = D) dalam periode, ditambah saldo awal akun terkait" items={data.kas_keluar} negative />
        </motion.div>
      </motion.div>
  );
}

function SectionCard({ title, subtitle, items = [], positive = false, negative = false }) {
  return (
    <div className="rounded-xl border border-white/60 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="p-4 sm:p-5 border-b border-slate-100/60">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-800">{title}</h2>
        {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
      </div>
      <div className="p-4 sm:p-5 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="py-2 px-2">No</th>
              <th className="py-2 px-2">Kode Rekening</th>
              <th className="py-2 px-2">Nama Rekening</th>
              <th className="py-2 px-2 text-right">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(items) && items.length > 0 ? (
              items.map((it, idx) => (
                <tr key={`${it.kd_rek}-${idx}`} className="border-t border-slate-100/60 hover:bg-slate-50/70">
                  <td className="py-2 px-2 w-12">{idx + 1}</td>
                  <td className="py-2 px-2">{it.kd_rek}</td>
                  <td className="py-2 px-2">{it.nm_rek}</td>
                  <td className={`py-2 px-2 text-right font-medium ${positive ? 'text-emerald-600' : ''} ${negative ? 'text-rose-600' : ''}`}>{formatIDR(it.amount ?? it.movement ?? 0)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-slate-500">Tidak ada data untuk periode ini.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Gunakan layout SidebarKeuangan agar konten tampil di area utama
CashFlow.layout = (page) => <SidebarKeuangan title="Keuangan" children={page} />;