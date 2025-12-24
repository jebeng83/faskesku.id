import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { todayDateString, nowDateTimeString } from '@/tools/datetime';
import SearchableSelect from '@/Components/SearchableSelect.jsx';

export default function CpptSoap({ token = '', noRawat = '', noRkmMedis = '' }) {
  const [formData, setFormData] = useState({
    tgl_perawatan: todayDateString(),
    jam_rawat: nowDateTimeString().split(' ')[1]?.substring(0, 5) || '',
    suhu_tubuh: '',
    tensi: '',
    nadi: '',
    respirasi: '',
    tinggi: '',
    berat: '',
    spo2: '',
    gcs: '',
    kesadaran: '',
    keluhan: '',
    pemeriksaan: '',
    alergi: '',
    penilaian: '',
    rtl: '',
    instruksi: '',
    evaluasi: '',
    nip: '',
  });
  const [list, setList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [editKey, setEditKey] = useState(null);

  const kesadaranOptions = useMemo(() => ([
    'Compos Mentis','Somnolence','Sopor','Coma','Alert','Confusion','Voice','Pain','Unresponsive','Apatis','Delirium'
  ]), []);

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const fetchList = async () => {
    setLoadingList(true);
    try {
      const res = await axios.get('/rawat-inap/pemeriksaan-ranap', {
        params: { t: token || undefined, no_rawat: noRawat || undefined },
      });
      const rows = Array.isArray(res.data?.data) ? res.data.data : [];
      setList(rows);
    } catch {
      setList([]);
    } finally {
      setLoadingList(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);
    if (!formData.nip || String(formData.nip).trim() === '' || !formData.kesadaran || !formData.tensi || !formData.spo2) {
      setIsSubmitting(false);
      setError('Lengkapi isian wajib: NIP, Kesadaran, Tensi, SpO2');
      return;
    }
    try {
      let res;
      if (editKey) {
        const payload = {
          key: editKey,
          ...formData,
        };
        res = await axios.put('/rawat-inap/pemeriksaan-ranap', payload, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });
      } else {
        const payload = {
          ...formData,
          no_rawat: noRawat,
        };
        res = await axios.post('/rawat-inap/pemeriksaan-ranap', payload, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });
      }
      if (res.status === 200 || res.status === 201) {
        setMessage(res.data?.message || (editKey ? 'Pemeriksaan diperbarui' : 'Pemeriksaan tersimpan'));
        await fetchList();
        setFormData((prev) => ({
          ...prev,
          suhu_tubuh: '',
          tensi: '',
          nadi: '',
          respirasi: '',
          tinggi: '',
          berat: '',
          spo2: '',
          gcs: '',
          kesadaran: '',
          keluhan: '',
          pemeriksaan: '',
          alergi: '',
          penilaian: '',
          rtl: '',
          instruksi: '',
          evaluasi: '',
          jam_rawat: nowDateTimeString().split(' ')[1]?.substring(0, 5) || '',
        }));
        setEditKey(null);
      } else {
        setError(editKey ? 'Gagal memperbarui pemeriksaan' : 'Gagal menyimpan pemeriksaan');
      }
    } catch (e) {
      const msg = e?.response?.data?.message || (editKey ? 'Gagal memperbarui pemeriksaan' : 'Gagal menyimpan pemeriksaan');
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [noRawat]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
          <h3 className="text-lg font-semibold text-gray-900">Input CPPT / SOAP Ranap</h3>
          <p className="text-sm text-gray-600">No. Rawat: <span className="font-mono">{noRawat || '-'}</span></p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {message && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3">{message}</div>}
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3">{error}</div>}
          {editKey && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-lg p-3 text-sm flex items-center justify-between">
              <div>
                Sedang mengedit entri: <span className="font-mono">{editKey.no_rawat}</span> • {new Date(editKey.tgl_perawatan).toLocaleDateString('id-ID')} • {String(editKey.jam_rawat).substring(0,5)}
              </div>
              <button type="button" onClick={() => setEditKey(null)} className="px-3 py-1.5 rounded bg-white hover:bg-gray-100 text-blue-700 border border-blue-200">
                Batalkan Edit
              </button>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs md:text-sm font-medium text-gray-700 mb-0">
                Tanggal Perawatan
              </label>
              <input
                type="date"
                value={formData.tgl_perawatan}
                onChange={(e) => updateField('tgl_perawatan', e.target.value)}
                className="text-sm h-9 md:h-10 px-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs md:text-sm font-medium text-gray-700 mb-0">
                Jam Rawat
              </label>
              <input
                type="time"
                value={formData.jam_rawat}
                onChange={(e) => updateField('jam_rawat', e.target.value)}
                className="text-sm h-9 md:h-10 px-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 md:gap-3">
            <div className="space-y-px bg-gray-50 border border-gray-100 rounded-md p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="min-w-0 flex flex-row items-center gap-1">
                  <label className="text-xs md:text-sm font-bold text-gray-800 md:w-24 whitespace-nowrap">
                    Kesadaran :
                  </label>
                  <select
                    value={formData.kesadaran}
                    onChange={(e) => updateField('kesadaran', e.target.value)}
                    className="w-full md:flex-1 text-sm h-7 px-2 rounded-md bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  >
                    <option value="">Pilih Kesadaran</option>
                    {kesadaranOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="min-w-0 flex flex-col gap-1">
                  <label className="text-xs md:text-sm font-bold text-gray-800">
                    Petugas (NIP)
                  </label>
                  <SearchableSelect
                    source="petugas"
                    value={formData.nip}
                    onChange={(val) => updateField('nip', val)}
                    placeholder="Cari petugas"
                    searchPlaceholder="Cari nama atau NIP…"
                  />
                </div>
                <div className="min-w-0 flex flex-row items-center gap-1 md:col-span-2">
                  <label className="text-xs md:text-sm font-bold text-gray-800 md:w-24 whitespace-nowrap">
                    Alergi :
                  </label>
                  <input
                    type="text"
                    value={formData.alergi}
                    onChange={(e) => updateField('alergi', e.target.value)}
                    className="w-full md:flex-1 text-sm h-7 px-2 rounded-md bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-stretch">
                <div className="flex flex-col h-full">
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1">
                    Keluhan Utama (Subjektif)
                  </label>
                  <textarea
                    value={formData.keluhan}
                    onChange={(e) => updateField('keluhan', e.target.value)}
                    rows={4}
                    className="w-full text-sm rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none h-24"
                  />
                </div>
                <div className="flex flex-col h-full">
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1">
                    Pemeriksaan Fisik (Objektif)
                  </label>
                  <textarea
                    value={formData.pemeriksaan}
                    onChange={(e) => updateField('pemeriksaan', e.target.value)}
                    rows={4}
                    className="w-full text-sm rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none h-24"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-px">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-px">
                    Suhu (°C)
                  </label>
                  <input
                    type="text"
                    value={formData.suhu_tubuh}
                    onChange={(e) => updateField('suhu_tubuh', e.target.value)}
                    placeholder="36.8"
                    className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-px">
                    Tensi (mmHg)
                  </label>
                  <input
                    type="text"
                    value={formData.tensi}
                    onChange={(e) => updateField('tensi', e.target.value)}
                    placeholder="120/80"
                    className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-px">
                    Nadi (/menit)
                  </label>
                  <input
                    type="text"
                    value={formData.nadi}
                    onChange={(e) => updateField('nadi', e.target.value)}
                    placeholder="80"
                    className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-px">
                    Respirasi (/menit)
                  </label>
                  <input
                    type="text"
                    value={formData.respirasi}
                    onChange={(e) => updateField('respirasi', e.target.value)}
                    placeholder="20"
                    className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-px">
                    SpO2 (%)
                  </label>
                  <input
                    type="text"
                    value={formData.spo2}
                    onChange={(e) => updateField('spo2', e.target.value)}
                    placeholder="98"
                    className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-px">
                    Tinggi (cm)
                  </label>
                  <input
                    type="text"
                    value={formData.tinggi}
                    onChange={(e) => updateField('tinggi', e.target.value)}
                    placeholder="165"
                    className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-px">
                    Berat (kg)
                  </label>
                  <input
                    type="text"
                    value={formData.berat}
                    onChange={(e) => updateField('berat', e.target.value)}
                    placeholder="60"
                    className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-px">
                    GCS
                  </label>
                  <input
                    type="text"
                    value={formData.gcs}
                    onChange={(e) => updateField('gcs', e.target.value)}
                    placeholder="E4V5M6"
                    className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-px">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 items-stretch">
                <div className="flex flex-col h-full">
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-px">
                    Penilaian (Assessment)
                  </label>
                  <textarea
                    value={formData.penilaian}
                    onChange={(e) => updateField('penilaian', e.target.value)}
                    rows={3}
                    className="w-full text-sm rounded-md border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none h-24"
                  />
                </div>
                <div className="flex flex-col h-full">
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-px">
                    Rencana Tindak Lanjut (Planning)
                  </label>
                  <textarea
                    value={formData.rtl}
                    onChange={(e) => updateField('rtl', e.target.value)}
                    rows={3}
                    className="w-full text-sm rounded-md border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none h-24"
                  />
                </div>
                <div className="flex flex-col h-full">
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-px">
                    Instruksi Medis
                  </label>
                  <textarea
                    value={formData.instruksi}
                    onChange={(e) => updateField('instruksi', e.target.value)}
                    rows={2}
                    className="w-full text-sm rounded-md border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>
                <div className="flex flex-col h-full">
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-px">
                    Evaluasi
                  </label>
                  <textarea
                    value={formData.evaluasi}
                    onChange={(e) => updateField('evaluasi', e.target.value)}
                    rows={2}
                    className="w-full text-sm rounded-md border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm">
              {isSubmitting ? (editKey ? 'Memperbarui…' : 'Menyimpan…') : (editKey ? 'Perbarui Pemeriksaan' : 'Simpan Pemeriksaan')}
              </button>
            <button type="button" onClick={() => fetchList()} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">
              Muat Riwayat
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border shadow-sm">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Riwayat CPPT / SOAP Ranap</h3>
          <span className="text-xs inline-flex items-center px-2.5 py-1 rounded-full bg-white/70 text-gray-700 border border-indigo-100">
            {list.length} record
          </span>
        </div>
        <div className="p-6">
          {loadingList ? (
            <div className="text-gray-500">Memuat…</div>
          ) : list.length === 0 ? (
            <div className="text-gray-500">Belum ada data pemeriksaan</div>
          ) : (
            <div className="space-y-3">
              {list.map((row, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg bg-white shadow-sm p-4 md:p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="font-medium text-gray-900">
                        {row.tgl_perawatan ? new Date(row.tgl_perawatan).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                      </div>
                      <div className="font-mono text-gray-800">
                        {row.jam_rawat ? String(row.jam_rawat).substring(0,5) : '-'}
                      </div>
                      <div className="hidden sm:block text-xs text-gray-500">
                        No. Rawat: <span className="font-mono">{row.no_rawat}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {row.nip ? (
                        <span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs border border-indigo-100">
                          NIP: {row.nip}
                        </span>
                      ) : null}
                      {row.kesadaran ? (
                        <span className="px-2 py-1 rounded-full bg-purple-50 text-purple-700 text-xs border border-purple-100">
                          {row.kesadaran}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-700">
                    <div className="bg-gray-50 rounded-md px-3 py-2">
                      <div className="text-gray-500">Suhu</div>
                      <div className="font-semibold">{row.suhu_tubuh || '-'}</div>
                    </div>
                    <div className="bg-gray-50 rounded-md px-3 py-2">
                      <div className="text-gray-500">Tensi</div>
                      <div className="font-semibold">{row.tensi || '-'}</div>
                    </div>
                    <div className="bg-gray-50 rounded-md px-3 py-2">
                      <div className="text-gray-500">Nadi</div>
                      <div className="font-semibold">{row.nadi || '-'}</div>
                    </div>
                    <div className="bg-gray-50 rounded-md px-3 py-2">
                      <div className="text-gray-500">SpO2</div>
                      <div className="font-semibold">{row.spo2 || '-'}</div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-md px-3 py-2">
                      <div className="text-xs text-gray-500 mb-1">Keluhan</div>
                      <div className="text-sm whitespace-pre-wrap break-words">
                        {row.keluhan || <span className="text-gray-400 italic">Tidak ada keluhan</span>}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-md px-3 py-2">
                      <div className="text-xs text-gray-500 mb-1">Pemeriksaan</div>
                      <div className="text-sm whitespace-pre-wrap break-words">
                        {row.pemeriksaan || <span className="text-gray-400 italic">Belum diperiksa</span>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-md px-3 py-2">
                      <div className="text-xs text-gray-500 mb-1">Penilaian</div>
                      <div className="text-sm whitespace-pre-wrap break-words">
                        {row.penilaian || <span className="text-gray-400 italic">Belum dinilai</span>}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-md px-3 py-2">
                      <div className="text-xs text-gray-500 mb-1">Rencana</div>
                      <div className="text-sm whitespace-pre-wrap break-words">
                        {row.rtl || <span className="text-gray-400 italic">Belum diisi</span>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-md px-3 py-2">
                      <div className="text-xs text-gray-500 mb-1">Instruksi</div>
                      <div className="text-sm whitespace-pre-wrap break-words">
                        {row.instruksi || <span className="text-gray-400 italic">Belum diisi</span>}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-md px-3 py-2">
                      <div className="text-xs text-gray-500 mb-1">Evaluasi</div>
                      <div className="text-sm whitespace-pre-wrap break-words">
                        {row.evaluasi || <span className="text-gray-400 italic">Belum diisi</span>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs text-gray-500 sm:hidden">
                      No. Rawat: <span className="font-mono">{row.no_rawat}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditKey({
                            no_rawat: row.no_rawat,
                            tgl_perawatan: row.tgl_perawatan,
                            jam_rawat: row.jam_rawat,
                          });
                          setFormData({
                            tgl_perawatan: row.tgl_perawatan,
                            jam_rawat: String(row.jam_rawat).substring(0,5),
                            suhu_tubuh: row.suhu_tubuh || '',
                            tensi: row.tensi || '',
                            nadi: row.nadi || '',
                            respirasi: row.respirasi || '',
                            tinggi: row.tinggi || '',
                            berat: row.berat || '',
                            spo2: row.spo2 || '',
                            gcs: row.gcs || '',
                            kesadaran: row.kesadaran || '',
                            keluhan: row.keluhan || '',
                            pemeriksaan: row.pemeriksaan || '',
                            alergi: row.alergi || '',
                            penilaian: row.penilaian || '',
                            rtl: row.rtl || '',
                            instruksi: row.instruksi || '',
                            evaluasi: row.evaluasi || '',
                            nip: row.nip || '',
                          });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center px-3 py-1.5 text-xs rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 border"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          const ok = window.confirm('Yakin ingin menghapus pemeriksaan ini?');
                          if (!ok) return;
                          setMessage(null);
                          setError(null);
                          try {
                            const res = await axios.delete('/rawat-inap/pemeriksaan-ranap', {
                              data: {
                                no_rawat: row.no_rawat,
                                tgl_perawatan: row.tgl_perawatan,
                                jam_rawat: row.jam_rawat,
                              },
                              headers: { 'X-Requested-With': 'XMLHttpRequest' },
                            });
                            setMessage(res.data?.message || 'Pemeriksaan dihapus');
                            await fetchList();
                          } catch (e) {
                            const msg = e?.response?.data?.message || 'Gagal menghapus pemeriksaan';
                            setError(msg);
                          }
                        }}
                        className="inline-flex items-center px-3 py-1.5 text-xs rounded-md text-red-700 bg-red-100 hover:bg-red-200 border"
                      >
                        Hapus
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          setFormData({
                            tgl_perawatan: todayDateString(),
                            jam_rawat: nowDateTimeString().split(' ')[1]?.substring(0,5),
                            suhu_tubuh: row.suhu_tubuh || '',
                            tensi: row.tensi || '',
                            nadi: row.nadi || '',
                            respirasi: row.respirasi || '',
                            tinggi: row.tinggi || '',
                            berat: row.berat || '',
                            spo2: row.spo2 || '',
                            gcs: row.gcs || '',
                            kesadaran: row.kesadaran || '',
                            keluhan: row.keluhan || '',
                            pemeriksaan: row.pemeriksaan || '',
                            alergi: row.alergi || '',
                            penilaian: row.penilaian || '',
                            rtl: row.rtl || '',
                            instruksi: row.instruksi || '',
                            evaluasi: row.evaluasi || '',
                            nip: row.nip || '',
                          });
                          setEditKey(null);
                          setMessage('Data pemeriksaan dimasukkan ke form atas');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center px-3 py-1.5 text-xs rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 border"
                      >
                        Salin
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
