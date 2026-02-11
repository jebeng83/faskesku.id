import React, { useMemo, useState } from 'react';
import LayoutUtama from '@/Pages/LayoutUtama';
import { BridingMenu } from '@/Layouts/SidebarBriding';
import { motion } from 'framer-motion';
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

export default function DphoPcare() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [raw, setRaw] = useState(null);

  const [q, setQ] = useState('');
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(25);

  const meta = raw?.metaData || {};
  const list = Array.isArray(raw?.response?.list) ? raw.response.list : [];
  const count = Number.isFinite(Number(raw?.response?.count)) ? Number(raw.response.count) : list.length;

  const rows = useMemo(() => {
    return list.map((it) => {
      return {
        kdObat: String(it?.kdObat || ''),
        nmObat: String(it?.nmObat || ''),
        sedia: it?.sedia,
      };
    });
  }, [list]);

  const doLoad = async () => {
    const st = Math.max(0, Number(start) || 0);
    const lim = Math.max(1, Number(limit) || 25);

    setLoading(true);
    setError(null);
    setRaw(null);

    try {
      const params = new URLSearchParams();
      params.set('q', String(q || '').trim());
      params.set('start', String(st));
      params.set('limit', String(lim));

      const res = await fetch(`/api/pcare/dpho?${params.toString()}`, {
        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        credentials: 'include',
      });
      const json = await res.json();

      if (res.ok && (json?.metaData?.code === 200 || json?.metaData?.code === 201 || !json?.metaData?.code)) {
        setRaw(json);
        if (Array.isArray(json?.response?.list) && json.response.list.length === 0 && json?.metaData?.message) {
          setError(json.metaData.message);
        }
      } else {
        setRaw(json);
        setError(json?.metaData?.message || 'Gagal memuat data DPHO');
      }
    } catch (e) {
      setError(e?.message || 'Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  const onPrev = () => {
    const st = Math.max(0, (Number(start) || 0) - (Number(limit) || 25));
    setStart(st);
  };

  const onNext = () => {
    const st = (Number(start) || 0) + (Number(limit) || 25);
    setStart(st);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4">
      <motion.div variants={itemVariants} className="mb-4">
        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500" />
          <div className="px-5 py-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-teal-600 to-emerald-600 text-white p-2 shadow">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">DPHO BPJS (PCare)</h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Pencarian daftar obat DPHO BPJS.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {badge('GET', 'bg-emerald-50 text-emerald-700')}
                {badge('JSON', 'bg-emerald-50 text-emerald-700')}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 p-4 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2">
            <label htmlFor="q" className="text-xs font-medium text-slate-700">Kode atau Nama DPHO</label>
            <div className="mt-1 flex items-center gap-2">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  id="q"
                  autoComplete="off"
                  placeholder="Contoh: paracetamol / 130103594"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      doLoad();
                    }
                    if (e.key === 'Escape') {
                      setQ('');
                    }
                  }}
                  className="mt-1 w-full rounded-md border-2 border-slate-300 bg-white pl-8 pr-8 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-600 shadow-sm"
                />
                {q && (
                  <button
                    type="button"
                    onClick={() => setQ('')}
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

            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label htmlFor="start" className="text-xs font-medium text-slate-700">Start</label>
                <input
                  id="start"
                  type="number"
                  min={0}
                  value={start}
                  onChange={(e) => setStart(e.target.value === '' ? 0 : Number(e.target.value))}
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
                    setStart(0);
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
                ) : raw ? (
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
                  <div className="mt-0.5 text-sm font-semibold text-slate-800">{raw ? count : '-'}</div>
                </div>
                <div className="rounded-md border border-slate-200 bg-white p-2">
                  <div className="text-[11px] text-slate-500">Rows</div>
                  <div className="mt-0.5 text-sm font-semibold text-slate-800">{raw ? rows.length : '-'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="text-xs text-slate-600">Start: {Number(start) || 0} • Limit: {Number(limit) || 25}</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onPrev();
                setTimeout(() => doLoad(), 0);
              }}
              disabled={loading || (Number(start) || 0) <= 0}
              className={`rounded-md px-3 py-1.5 text-sm border ${
                loading || (Number(start) || 0) <= 0
                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => {
                onNext();
                setTimeout(() => doLoad(), 0);
              }}
              disabled={loading}
              className={`rounded-md px-3 py-1.5 text-sm border ${
                loading
                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>

        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Kode Obat</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Nama Obat</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Sedia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-sm text-slate-500">
                    {loading ? 'Memuat…' : raw ? 'Tidak ada data' : 'Silakan lakukan pencarian'}
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={`${r.kdObat}-${r.nmObat}`}>
                    <td className="px-4 py-3 text-sm text-slate-800">{r.kdObat || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-800">{r.nmObat || '-'}</td>
                    <td className="px-4 py-3 text-right text-sm text-slate-800">{r.sedia ?? '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

DphoPcare.layout = (page) => (
  <LayoutUtama title="Layanan PCare" left={<BridingMenu />}>
    {page}
  </LayoutUtama>
);
