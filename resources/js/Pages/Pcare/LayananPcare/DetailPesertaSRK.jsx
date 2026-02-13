import React, { useMemo, useState } from 'react';
import LayoutUtama from '@/Pages/LayoutUtama';
import { BridingMenu } from '@/Layouts/SidebarBriding';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

const badge = (text, color) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
    {text}
  </span>
);

const titleizeKey = (value) => {
  const v = String(value || '').trim();
  if (!v) return '-';
  return v
    .split('_')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

const statusTone = (value) => {
  const v = String(value || '').toLowerCase();
  if (v.includes('berisiko')) {
    return { wrap: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' };
  }
  if (v.includes('tidak berisiko')) {
    return { wrap: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' };
  }
  if (v.includes('tidak mengisi')) {
    return { wrap: 'bg-slate-50 text-slate-700 border-slate-200', dot: 'bg-slate-400' };
  }
  return { wrap: 'bg-slate-50 text-slate-700 border-slate-200', dot: 'bg-slate-400' };
};

export default function DetailPesertaSRK() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [peserta, setPeserta] = useState('');
  const [start, setStart] = useState(1);
  const [limit, setLimit] = useState(25);
  const [openKey, setOpenKey] = useState(null);

  const meta = data?.metaData || {};
  const list = Array.isArray(data?.response?.list) ? data.response.list : [];
  const count = Number.isFinite(Number(data?.response?.count)) ? Number(data.response.count) : list.length;

  const visibleRows = useMemo(() => {
    return list.map((it) => {
      const nomor = String(it?.nomor_peserta || '');
      const nama = String(it?.nama || '');
      const usia = it?.usia;
      const noHp = String(it?.no_hp || '');
      const email = String(it?.email || '');
      const statusPenyakit = it?.status_penyakit && typeof it.status_penyakit === 'object' ? it.status_penyakit : {};
      return { nomor, nama, usia, noHp, email, statusPenyakit, raw: it };
    });
  }, [list]);

  const doLoad = async () => {
    const q = String(peserta || '').trim();
    if (!q) {
      setError('Nomor atau Nama Peserta wajib diisi');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setOpenKey(null);

    try {
      const params = new URLSearchParams();
      params.set('q', q);
      params.set('start', String(Math.max(1, Number(start) || 1)));
      params.set('limit', String(Number(limit) || 25));

      const res = await fetch(`/pcare/api/srk/peserta?${params.toString()}`, {
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setError(json?.metaData?.message || 'Gagal mengambil detail peserta SRK');
      }
    } catch (e) {
      setError(e?.message || 'Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  const onKeyDownPeserta = (e) => {
    if (e.key === 'Enter') {
      doLoad();
    }
    if (e.key === 'Escape') {
      setPeserta('');
    }
  };

  return (
    <LayoutUtama
      title="Layanan PCare"
      left={<BridingMenu />}
    >
      <Head title="Detail Peserta SRK" />

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4">
      <motion.div variants={itemVariants} className="mb-4">
        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          <div className="px-5 py-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-indigo-600 to-sky-600 text-white p-2 shadow">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Detail Peserta SRK (BPJS)</h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Rekapitulasi hasil Skrining Riwayat Kesehatan per peserta.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {badge('GET', 'bg-indigo-50 text-indigo-700')}
                {badge('JSON', 'bg-indigo-50 text-indigo-700')}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 p-4 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2">
            <label htmlFor="peserta" className="text-xs font-medium text-slate-700">Nomor atau Nama Peserta</label>
            <div className="mt-1 flex items-center gap-2">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  id="peserta"
                  autoComplete="off"
                  placeholder="Ketik nomor kartu atau nama peserta"
                  value={peserta}
                  onChange={(e) => setPeserta(e.target.value)}
                  onKeyDown={onKeyDownPeserta}
                  className="mt-1 w-full rounded-md border-2 border-slate-300 bg-white pl-8 pr-8 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-600 shadow-sm"
                />
                {peserta && (
                  <button
                    type="button"
                    onClick={() => setPeserta('')}
                    className="absolute right-2 top-2 rounded p-1 text-slate-400 hover:text-slate-600"
                    title="Clear"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={doLoad}
                disabled={loading}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white shadow ${loading ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'}`}
              >
                <ArrowPathIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Memuat…' : 'Cari'}
              </button>
            </div>
            <div className="mt-1 text-xs text-slate-500">Enter untuk cari. Esc untuk menghapus isian.</div>

            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label htmlFor="start" className="text-xs font-medium text-slate-700">Start</label>
                <input
                  id="start"
                  type="number"
                  min={1}
                  value={start}
                  onChange={(e) => setStart(e.target.value === '' ? 1 : Math.max(1, Number(e.target.value)))}
                  className="mt-1 w-full rounded-md border-2 border-slate-300 bg-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="limit" className="text-xs font-medium text-slate-700">Limit</label>
                <input
                  id="limit"
                  type="number"
                  min={1}
                  value={limit}
                  onChange={(e) => setLimit(e.target.value === '' ? 25 : Number(e.target.value))}
                  className="mt-1 w-full rounded-md border-2 border-slate-300 bg-white px-3 py-2 text-sm"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => {
                    setStart(1);
                    setLimit(25);
                  }}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-lg border-2 border-slate-200/60 bg-white/80 dark:bg-gray-800/80 p-3">
              <div className="text-xs text-slate-500">Status</div>
              <div className="mt-1 flex items-center gap-2">
                {loading ? (
                  <>
                    <ArrowPathIcon className="h-4 w-4 animate-spin text-emerald-600" />
                    <span className="text-slate-700 text-sm">Memuat…</span>
                  </>
                ) : error ? (
                  <>
                    <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </>
                ) : data ? (
                  <>
                    <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700 text-sm">{meta?.message || 'OK'}</span>
                  </>
                ) : (
                  <span className="text-slate-600 text-sm">Siap</span>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-md border border-slate-200 bg-white p-2">
                  <div className="text-[11px] text-slate-500">Count</div>
                  <div className="mt-0.5 text-sm font-semibold text-slate-800">{data ? count : '-'}</div>
                </div>
                <div className="rounded-md border border-slate-200 bg-white p-2">
                  <div className="text-[11px] text-slate-500">Rows</div>
                  <div className="mt-0.5 text-sm font-semibold text-slate-800">{data ? visibleRows.length : '-'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Nomor Peserta</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Nama</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Usia</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">No. HP</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Email</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {visibleRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                    {loading ? 'Memuat…' : data ? 'Tidak ada data' : 'Silakan lakukan pencarian'}
                  </td>
                </tr>
              ) : (
                visibleRows.map((row) => {
                  const isOpen = openKey === row.nomor;
                  return (
                    <React.Fragment key={row.nomor || row.nama}>
                      <tr className={isOpen ? 'bg-indigo-50/40' : undefined}>
                        <td className="px-4 py-3 text-sm text-slate-800">{row.nomor || '-'}</td>
                        <td className="px-4 py-3 text-sm text-slate-800">{row.nama || '-'}</td>
                        <td className="px-4 py-3 text-right text-sm text-slate-800">{row.usia ?? '-'}</td>
                        <td className="px-4 py-3 text-sm text-slate-800">{row.noHp || '-'}</td>
                        <td className="px-4 py-3 text-sm text-slate-800">{row.email || '-'}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => setOpenKey(isOpen ? null : row.nomor)}
                            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
                          >
                            {isOpen ? 'Tutup' : 'Detail'}
                          </button>
                        </td>
                      </tr>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <td colSpan={6} className="px-4 py-3">
                              <div className="rounded-lg border border-slate-200 bg-white p-3">
                                <div className="text-xs font-semibold text-slate-700">Status Penyakit</div>
                                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                                  {Object.keys(row.statusPenyakit || {}).length === 0 ? (
                                    <div className="text-sm text-slate-500">Tidak ada data status penyakit</div>
                                  ) : (
                                    Object.entries(row.statusPenyakit).map(([k, v]) => {
                                      const tone = statusTone(v);
                                      return (
                                        <div
                                          key={k}
                                          className={`flex items-center justify-between gap-2 rounded-md border px-2 py-1.5 text-xs ${tone.wrap}`}
                                        >
                                          <div className="flex items-center gap-2">
                                            <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
                                            <span className="font-medium">{titleizeKey(k)}</span>
                                          </div>
                                          <span className="text-right">{String(v || '-')}</span>
                                        </div>
                                      );
                                    })
                                  )}
                                </div>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
      </motion.div>
    </LayoutUtama>
  );
}
