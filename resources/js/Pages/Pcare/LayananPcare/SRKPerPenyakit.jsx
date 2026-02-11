import React, { useEffect, useMemo, useState } from 'react';
import LayoutUtama from '@/Pages/LayoutUtama';
import { BridingMenu } from '@/Layouts/SidebarBriding';
import { motion, AnimatePresence } from 'framer-motion';
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

const titleize = (value) => {
  const v = String(value || '').trim();
  if (!v) return '-';
  return v
    .replace(/^penyakit_/, '')
    .split('_')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

export default function SRKPerPenyakit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('beresiko');
  const [sortDir, setSortDir] = useState('desc');

  const doLoad = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/pcare/api/srk/rekap', {
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setError(json?.metaData?.message || 'Gagal mengambil rekap SRK');
      }
    } catch (e) {
      setError(e?.message || 'Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    doLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const meta = data?.metaData || {};
  const list = Array.isArray(data?.response?.list) ? data.response.list : [];

  const rows = useMemo(() => {
    const q = String(query || '').trim().toLowerCase();
    const filtered = q
      ? list.filter((it) => {
          const name = String(it?.nama_penyakit || '').toLowerCase();
          return name.includes(q) || titleize(name).toLowerCase().includes(q);
        })
      : list;

    const getNumber = (v) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };

    const dir = sortDir === 'asc' ? 1 : -1;
    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === 'nama_penyakit') {
        const av = String(a?.nama_penyakit || '');
        const bv = String(b?.nama_penyakit || '');
        return av.localeCompare(bv) * dir;
      }

      if (sortKey === 'tidak_beresiko') {
        return (getNumber(a?.tidak_beresiko) - getNumber(b?.tidak_beresiko)) * dir;
      }

      return (getNumber(a?.beresiko) - getNumber(b?.beresiko)) * dir;
    });

    return sorted;
  }, [list, query, sortDir, sortKey]);

  const totals = useMemo(() => {
    const getNumber = (v) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };
    const t = rows.reduce(
      (acc, it) => {
        acc.beresiko += getNumber(it?.beresiko);
        acc.tidakBeresiko += getNumber(it?.tidak_beresiko);
        return acc;
      },
      { beresiko: 0, tidakBeresiko: 0 }
    );
    return {
      count: rows.length,
      beresiko: t.beresiko,
      tidakBeresiko: t.tidakBeresiko,
      total: t.beresiko + t.tidakBeresiko,
    };
  }, [rows]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      doLoad();
    }
    if (e.key === 'Escape') {
      setQuery('');
    }
  };

  return (
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
                  <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Rekap SRK per Penyakit (BPJS)</h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Rekapitulasi hasil Skrining Riwayat Kesehatan per penyakit.</p>
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
            <label htmlFor="q" className="text-xs font-medium text-slate-700">Cari Penyakit</label>
            <div className="mt-1 flex items-center gap-2">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  id="q"
                  autoComplete="off"
                  placeholder="Ketik nama penyakit (mis. diabetes)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="mt-1 w-full rounded-md border-2 border-slate-300 bg-white pl-8 pr-8 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-600 shadow-sm"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="absolute right-2 top-2 rounded p-1 text-slate-400 hover:text-slate-600" title="Clear">
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button
                onClick={doLoad}
                disabled={loading}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white shadow ${loading ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'}`}
              >
                <ArrowPathIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Memuat…' : 'Refresh'}
              </button>
            </div>
            <div className="mt-1 text-xs text-slate-500">Enter untuk refresh. Esc untuk menghapus pencarian.</div>
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
                  <span className="text-slate-600 text-sm">Siap memuat</span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-md border border-slate-200 bg-white p-2">
                  <div className="text-[11px] text-slate-500">Penyakit</div>
                  <div className="mt-0.5 text-sm font-semibold text-slate-800">{totals.count}</div>
                </div>
                <div className="rounded-md border border-slate-200 bg-white p-2">
                  <div className="text-[11px] text-slate-500">Total Data</div>
                  <div className="mt-0.5 text-sm font-semibold text-slate-800">{totals.total}</div>
                </div>
                <div className="rounded-md border border-slate-200 bg-white p-2">
                  <div className="text-[11px] text-slate-500">Beresiko</div>
                  <div className="mt-0.5 text-sm font-semibold text-rose-700">{totals.beresiko}</div>
                </div>
                <div className="rounded-md border border-slate-200 bg-white p-2">
                  <div className="text-[11px] text-slate-500">Tidak Beresiko</div>
                  <div className="mt-0.5 text-sm font-semibold text-emerald-700">{totals.tidakBeresiko}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <div className="text-xs text-slate-500">Urutkan:</div>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm"
          >
            <option value="beresiko">Beresiko</option>
            <option value="tidak_beresiko">Tidak Beresiko</option>
            <option value="nama_penyakit">Nama Penyakit</option>
          </select>
          <select
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-4">
        <AnimatePresence>
          {!loading && !error && rows.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
              Tidak ada data untuk ditampilkan.
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Penyakit</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Beresiko</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Tidak Beresiko</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Persentase Beresiko</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rows.map((it, idx) => {
                      const beresiko = Number(it?.beresiko) || 0;
                      const tidakBeresiko = Number(it?.tidak_beresiko) || 0;
                      const total = beresiko + tidakBeresiko;
                      const pct = total > 0 ? (beresiko / total) * 100 : 0;
                      return (
                        <tr key={`${it?.nama_penyakit || 'row'}-${idx}`} className="hover:bg-slate-50">
                          <td className="px-4 py-3">
                            <div className="text-sm font-medium text-slate-800">{titleize(it?.nama_penyakit)}</div>
                            <div className="text-xs text-slate-500">{it?.nama_penyakit || '-'}</div>
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-slate-800">
                            <span className="inline-flex items-center gap-2">
                              <span className="font-semibold text-rose-700">{beresiko}</span>
                              {beresiko > 0 ? badge('RISK', 'bg-rose-50 text-rose-700') : badge('OK', 'bg-emerald-50 text-emerald-700')}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-slate-800">{tidakBeresiko}</td>
                          <td className="px-4 py-3 text-right text-sm text-slate-800">{pct.toFixed(2)}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

SRKPerPenyakit.layout = (page) => (
  <LayoutUtama title="Layanan PCare" left={<BridingMenu />}>
    {page}
  </LayoutUtama>
);
