import React, { useEffect, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import SidebarKeuangan from '@/Layouts/SidebarKeuangan';
import { BookOpen, Calendar, Clock, Info, Plus, Trash2 } from 'lucide-react';

const Card = ({ title, children, right }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
    {(title || right) && (
      <div className="relative px-4 py-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50 flex items-center justify-between">
        {title && (
          <h2 className="text-base font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">{title}</h2>
        )}
        {right}
      </div>
    )}
    <div className="relative p-6">{children}</div>
  </div>
);

const formatDate = (v) => {
  if (!v) return '';
  try { return new Date(v).toISOString().slice(0, 10); } catch { return v; }
};

const formatTime = (v) => {
  if (!v) return '';
  try { return (typeof v === 'string' && v.length >= 8) ? v.slice(0,8) : new Date(v).toTimeString().slice(0,8); } catch { return v; }
};

export default function JurnalPenyesuaianPage() {
  const today = useMemo(() => new Date().toISOString().slice(0,10), []);
  const nowTime = useMemo(() => new Date().toTimeString().slice(0,8), []);

  const [rekeningOptions, setRekeningOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [creating, setCreating] = useState(false);
  const [template, setTemplate] = useState('');

  const [form, setForm] = useState({
    no_bukti: '',
    tgl_jurnal: today,
    jam_jurnal: nowTime,
    jenis: 'P',
    keterangan: '',
    details: [
      { kd_rek: '', debet: 0, kredit: 0 },
      { kd_rek: '', debet: 0, kredit: 0 },
    ],
  });

  const totals = useMemo(() => {
    const d = form.details || [];
    const debet = d.reduce((acc, it) => acc + Number(it.debet || 0), 0);
    const kredit = d.reduce((acc, it) => acc + Number(it.kredit || 0), 0);
    return { debet, kredit, balanced: Math.round(debet * 100) === Math.round(kredit * 100) };
  }, [form.details]);

  const fetchRekeningOptions = async () => {
    try {
      const res = await axios.get('/api/akutansi/rekening', { params: { per_page: 1000 } });
      const data = (res?.data?.data || []).map((r) => ({ kd_rek: r.kd_rek, nm_rek: r.nm_rek }));
      setRekeningOptions(data);
    } catch (e) {
      console.error('Gagal memuat daftar rekening:', e);
    }
  };

  useEffect(() => { fetchRekeningOptions(); }, []);

  const addRow = () => setForm((f) => ({ ...f, details: [...f.details, { kd_rek: '', debet: 0, kredit: 0 }] }));
  const removeRow = (idx) => setForm((f) => ({ ...f, details: f.details.filter((_, i) => i !== idx) }));

  const updateRow = (idx, patch) => setForm((f) => ({ ...f, details: f.details.map((row, i) => i === idx ? { ...row, ...patch } : row) }));

  const findRekByNameContains = (keywords = []) => {
    const lowerKeywords = (keywords || []).map((k) => k.toLowerCase());
    return rekeningOptions.find((r) => lowerKeywords.some((k) => (r.nm_rek || '').toLowerCase().includes(k)));
  };

  const applyTemplate = (name) => {
    setTemplate(name);
    // Reset details
    setForm((f) => ({ ...f, details: [ { kd_rek: '', debet: 0, kredit: 0 }, { kd_rek: '', debet: 0, kredit: 0 } ] }));

    // Helper pilih rekening
    const setRows = (rows) => setForm((f) => ({ ...f, details: rows }));

    if (name === 'Akru Pendapatan') {
      const piutang = findRekByNameContains(['piutang']);
      const pendapatan = findRekByNameContains(['pendapatan', 'penjualan', 'jasa']);
      setRows([
        { kd_rek: piutang?.kd_rek || '', debet: 0, kredit: 0 },
        { kd_rek: pendapatan?.kd_rek || '', debet: 0, kredit: 0 },
      ]);
      setForm((f) => ({ ...f, keterangan: 'Akru pendapatan' }));
    } else if (name === 'Akru Beban') {
      const beban = findRekByNameContains(['beban', 'biaya']);
      const utang = findRekByNameContains(['utang', 'hutang']);
      setRows([
        { kd_rek: beban?.kd_rek || '', debet: 0, kredit: 0 },
        { kd_rek: utang?.kd_rek || '', debet: 0, kredit: 0 },
      ]);
      setForm((f) => ({ ...f, keterangan: 'Akru beban' }));
    } else if (name === 'Beban Dibayar Dimuka') {
      const beban = findRekByNameContains(['beban', 'biaya']);
      const dibayarDimuka = findRekByNameContains(['dibayar dimuka', 'prabayar', 'prepaid']);
      setRows([
        { kd_rek: beban?.kd_rek || '', debet: 0, kredit: 0 },
        { kd_rek: dibayarDimuka?.kd_rek || '', debet: 0, kredit: 0 },
      ]);
      setForm((f) => ({ ...f, keterangan: 'Penyesuaian beban dibayar dimuka' }));
    } else if (name === 'Penyusutan') {
      const bebanPenyusutan = findRekByNameContains(['beban penyusutan']);
      const akumulasi = findRekByNameContains(['akumulasi penyusutan']);
      setRows([
        { kd_rek: bebanPenyusutan?.kd_rek || '', debet: 0, kredit: 0 },
        { kd_rek: akumulasi?.kd_rek || '', debet: 0, kredit: 0 },
      ]);
      setForm((f) => ({ ...f, keterangan: 'Penyesuaian penyusutan aset' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.tgl_jurnal) errs.tgl_jurnal = 'Tanggal wajib diisi';
    form.details.forEach((d, i) => {
      if (!d.kd_rek) errs[`details.${i}.kd_rek`] = 'Pilih rekening';
      const deb = Number(d.debet || 0);
      const kre = Number(d.kredit || 0);
      if (deb <= 0 && kre <= 0) errs[`details.${i}.amount`] = 'Isi debet atau kredit';
      if (deb > 0 && kre > 0) errs[`details.${i}.amount2`] = 'Tidak boleh keduanya > 0';
    });
    if (!totals.balanced) errs.balanced = 'Debet harus sama dengan Kredit';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setCreating(true);
    try {
      const payload = { ...form, details: form.details.map((d) => ({ kd_rek: d.kd_rek, debet: Number(d.debet || 0), kredit: Number(d.kredit || 0) })) };
      const res = await axios.post('/api/akutansi/jurnal', payload);
      if (res?.status === 201) {
        alert('Jurnal penyesuaian berhasil disimpan');
        setForm({ no_bukti: '', tgl_jurnal: today, jam_jurnal: nowTime, jenis: 'P', keterangan: '', details: [ { kd_rek: '', debet: 0, kredit: 0 }, { kd_rek: '', debet: 0, kredit: 0 } ] });
        setTemplate('');
        setErrors({});
      }
    } catch (e) {
      const data = e?.response?.data;
      if (data && typeof data === 'object') setErrors(data.errors || { _global: data.message || 'Gagal menyimpan' });
      console.error('Simpan jurnal penyesuaian gagal:', e);
    } finally {
      setCreating(false);
    }
  };

  return (
    <SidebarKeuangan>
      <Head title="Keuangan - Jurnal Penyesuaian" />

      <div className="px-4 md:px-6 lg:px-8 py-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Jurnal Penyesuaian</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Gunakan form ini untuk menyusun penyesuaian periode: akru, beban dibayar dimuka, penyusutan, dll.</p>
          </div>
        </div>

        <Card title="Form Penyesuaian">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Tanggal</label>
                <div className="mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <input type="date" className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50" value={formatDate(form.tgl_jurnal)} onChange={(e) => setForm((f) => ({ ...f, tgl_jurnal: e.target.value }))} />
                </div>
                {errors.tgl_jurnal && <p className="text-xs text-red-600 mt-1">{errors.tgl_jurnal}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Waktu</label>
                <div className="mt-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <input type="time" className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50" value={formatTime(form.jam_jurnal)} onChange={(e) => setForm((f) => ({ ...f, jam_jurnal: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">No Bukti (opsional)</label>
                <input type="text" className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50" value={form.no_bukti} onChange={(e) => setForm((f) => ({ ...f, no_bukti: e.target.value }))} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Template Penyesuaian</label>
                <select className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50" value={template} onChange={(e) => applyTemplate(e.target.value)}>
                  <option value="">-- Pilih template --</option>
                  <option>Akru Pendapatan</option>
                  <option>Akru Beban</option>
                  <option>Beban Dibayar Dimuka</option>
                  <option>Penyusutan</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Template akan mengisi pasangan rekening yang umum dipakai. Anda tetap dapat menyesuaikan manual.</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Keterangan</label>
                <input type="text" className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50" value={form.keterangan} onChange={(e) => setForm((f) => ({ ...f, keterangan: e.target.value }))} />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-200">
                <div className="col-span-5 p-2">Rekening</div>
                <div className="col-span-3 p-2 text-right">Debet (Rp)</div>
                <div className="col-span-3 p-2 text-right">Kredit (Rp)</div>
                <div className="col-span-1 p-2"></div>
              </div>
              {(form.details || []).map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 border-t border-gray-200 dark:border-gray-700">
                  <div className="col-span-5 p-2">
                    <select className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50" value={row.kd_rek} onChange={(e) => updateRow(idx, { kd_rek: e.target.value })}>
                      <option value="">-- pilih rekening --</option>
                      {rekeningOptions.map((r) => (
                        <option key={r.kd_rek} value={r.kd_rek}>{r.kd_rek} - {r.nm_rek}</option>
                      ))}
                    </select>
                    {errors[`details.${idx}.kd_rek`] && <p className="text-xs text-red-600 mt-1">{errors[`details.${idx}.kd_rek`]}</p>}
                  </div>
                  <div className="col-span-3 p-2">
                    <input type="number" className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50 text-right" value={row.debet} onChange={(e) => updateRow(idx, { debet: Number(e.target.value || 0) })} />
                  </div>
                  <div className="col-span-3 p-2">
                    <input type="number" className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50 text-right" value={row.kredit} onChange={(e) => updateRow(idx, { kredit: Number(e.target.value || 0) })} />
                    {(errors[`details.${idx}.amount`] || errors[`details.${idx}.amount2`]) && <p className="text-xs text-red-600 mt-1">{errors[`details.${idx}.amount`] || errors[`details.${idx}.amount2`]}</p>}
                  </div>
                  <div className="col-span-1 p-2 flex items-center justify-end">
                    <button type="button" className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => removeRow(idx)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between p-2 border-t border-gray-200 dark:border-gray-700">
                <button type="button" onClick={addRow} className="flex items-center gap-2 text-xs px-2 py-1 rounded bg-blue-600 text-white">
                  <Plus className="w-4 h-4" /> Tambah Baris
                </button>
                <div className="text-xs">
                  <span className="mr-4">Total Debet: <strong>{totals.debet.toLocaleString('id-ID')}</strong></span>
                  <span>Total Kredit: <strong>{totals.kredit.toLocaleString('id-ID')}</strong></span>
                  {!totals.balanced && <span className="ml-3 text-red-600">Debet ≠ Kredit</span>}
                </div>
              </div>
              {errors.balanced && <p className="text-xs text-red-600 px-2 pb-2">{errors.balanced}</p>}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button type="submit" disabled={creating} className="flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50">
                <BookOpen className="w-4 h-4" />
                {creating ? 'Menyimpan...' : 'Simpan Jurnal Penyesuaian'}
              </button>
            </div>
          </form>
        </Card>

        <div className="mt-4">
          <Card title="Tips & Catatan">
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
              <p className="flex items-center gap-2"><Info className="w-4 h-4" /> Jenis diset ke <strong>'P'</strong> (Posted/Penyesuaian), sehingga jurnal akan tercatat sebagai penyesuaian periode.</p>
              <p>Jika template tidak menemukan rekening yang sesuai, silakan pilih manual dari daftar rekening.</p>
              <p>Pastikan total Debet sama dengan total Kredit sebelum menyimpan.</p>
            </div>
          </Card>
        </div>
      </div>
    </SidebarKeuangan>
  );
}
