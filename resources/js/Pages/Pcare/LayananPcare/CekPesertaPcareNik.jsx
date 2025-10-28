import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  IdentificationIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
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

export default function CekPesertaPcareNik() {
  const [nik, setNik] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null); // bentuk: { response: {...}, metaData: {...} }

  const sanitizeNik = (value) => value.replace(/[^0-9]/g, '').slice(0, 16);

  const onChangeNik = (e) => {
    setNik(sanitizeNik(e.target.value));
  };

  const doSearch = async () => {
    const n = sanitizeNik(nik);
    setNik(n);
    setError(null);
    setData(null);
    if (!n || n.length < 8) {
      setError('Masukkan NIK yang valid (min. 8 digit, ideal 16 digit).');
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({ nik: n });
      const res = await fetch(`/pcare/api/peserta/nik?${params.toString()}`, {
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      // json seharusnya memiliki metaData dan response
      if (res.ok) {
        setData(json);
      } else {
        setError(json?.metaData?.message || 'Gagal mengambil data peserta');
      }
    } catch (e) {
      setError(e?.message || 'Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      doSearch();
    }
    if (e.key === 'Escape') {
      setNik('');
      setData(null);
      setError(null);
    }
  };

  const onReset = () => {
    setNik('');
    setError(null);
    setData(null);
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text || '');
    } catch (_) {}
  };

  const resp = data?.response || null;
  const meta = data?.metaData || {};
  const aktif = !!resp?.aktif;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4">
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold">Cek Peserta BPJS PCare by NIK</h1>
              <p className="text-sm opacity-90">Masukkan NIK untuk melihat informasi peserta BPJS melalui layanan PCare.</p>
            </div>
            <div className="flex items-center gap-2">
              {badge('GET', 'bg-white/20 text-white')}
              {badge('JSON', 'bg-white/20 text-white')}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Input */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label htmlFor="nik" className="text-xs text-slate-500">NIK Peserta</label>
            <div className="mt-1 flex items-center gap-2">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  id="nik"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="Masukkan NIK (16 digit)"
                  value={nik}
                  onChange={onChangeNik}
                  onKeyDown={onKeyDown}
                  className="w-full rounded-md border-slate-300 pl-8 pr-8 text-sm"
                />
                {nik && (
                  <button onClick={() => setNik('')} className="absolute right-2 top-2 rounded p-1 text-slate-400 hover:text-slate-600" title="Clear">
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button onClick={doSearch} disabled={loading} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white shadow ${loading ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                {loading ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <MagnifyingGlassIcon className="h-4 w-4" />}
                {loading ? 'Mencari…' : 'Cari'}
              </button>
              <button onClick={onReset} disabled={loading && !nik} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50">
                Reset
              </button>
            </div>
            <div className="mt-1 text-xs text-slate-500">Tekan Enter untuk mencari. Esc untuk menghapus.</div>
          </div>
          <div className="md:col-span-1">
            <div className="rounded-lg border border-slate-200 p-3">
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
                  <>
                    <IdentificationIcon className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600 text-sm">Siap mencari</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hasil */}
      <motion.div variants={itemVariants} className="mt-4">
        <AnimatePresence>
          {data && resp ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <IdentificationIcon className="h-5 w-5 text-slate-500" />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{resp?.nama || '-'}</div>
                    <div className="text-xs text-slate-500">{resp?.jnsPeserta?.nama || 'Peserta'} • {aktif ? 'AKTIF' : (resp?.ketAktif || 'TIDAK AKTIF')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {aktif ? badge('AKTIF', 'bg-emerald-100 text-emerald-700') : badge('TIDAK AKTIF', 'bg-red-100 text-red-700')}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="rounded-lg border border-slate-200 p-3">
                  <div className="text-xs text-slate-500">No. Kartu</div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-800">
                    <span>{resp?.noKartu || '-'}</span>
                    {resp?.noKartu && (
                      <button onClick={() => copy(resp.noKartu)} className="ml-1 rounded p-1 text-slate-400 hover:text-slate-600" title="Salin No. Kartu">
                        <ClipboardDocumentCheckIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 p-3">
                  <div className="text-xs text-slate-500">NIK</div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-800">
                    <span>{resp?.noKTP || '-'}</span>
                    {resp?.noKTP && (
                      <button onClick={() => copy(resp.noKTP)} className="ml-1 rounded p-1 text-slate-400 hover:text-slate-600" title="Salin NIK">
                        <ClipboardDocumentCheckIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 p-3">
                  <div className="text-xs text-slate-500">Tanggal Lahir</div>
                  <div className="mt-1 text-sm text-slate-800">{resp?.tglLahir || '-'}</div>
                </div>

                <div className="rounded-lg border border-slate-200 p-3">
                  <div className="text-xs text-slate-500">Kelas</div>
                  <div className="mt-1 text-sm text-slate-800">{resp?.jnsKelas?.nama || resp?.jnsKelas?.kode || '-'}</div>
                </div>
                <div className="rounded-lg border border-slate-200 p-3">
                  <div className="text-xs text-slate-500">Provider FKTP</div>
                  <div className="mt-1 text-sm text-slate-800">{resp?.kdProviderPst?.nmProvider || '-'}</div>
                </div>
                <div className="rounded-lg border border-slate-200 p-3">
                  <div className="text-xs text-slate-500">No. HP</div>
                  <div className="mt-1 text-sm text-slate-800">{resp?.noHP || '-'}</div>
                </div>

                <div className="rounded-lg border border-slate-200 p-3">
                  <div className="text-xs text-slate-500">Mulai Aktif</div>
                  <div className="mt-1 text-sm text-slate-800">{resp?.tglMulaiAktif || '-'}</div>
                </div>
                <div className="rounded-lg border border-slate-200 p-3">
                  <div className="text-xs text-slate-500">Akhir Berlaku</div>
                  <div className="mt-1 text-sm text-slate-800">{resp?.tglAkhirBerlaku || '-'}</div>
                </div>
                <div className="rounded-lg border border-slate-200 p-3">
                  <div className="text-xs text-slate-500">Golongan Darah</div>
                  <div className="mt-1 text-sm text-slate-800">{resp?.golDarah || '-'}</div>
                </div>
              </div>
            </motion.div>
          ) : (
            !loading && !error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
                Masukkan NIK dan klik Cari untuk menampilkan data peserta.
              </motion.div>
            )
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Render dalam AppLayout
CekPesertaPcareNik.layout = (page) => <AppLayout title="Cek Peserta by NIK" children={page} />;