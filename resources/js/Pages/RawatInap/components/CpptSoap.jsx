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
    if (!formData.nip || String(formData.nip).trim() === '' || !formData.kesadaran || !formData.tensi || !formData.spo2 || !formData.penilaian || !formData.rtl || !formData.instruksi || !formData.evaluasi) {
      setIsSubmitting(false);
      setError('Lengkapi isian wajib: NIP, Kesadaran, Tensi, SpO2, Penilaian, Rencana, Instruksi, Evaluasi');
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Tanggal</label>
              <input type="date" value={formData.tgl_perawatan} onChange={(e) => updateField('tgl_perawatan', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Jam</label>
              <input type="time" value={formData.jam_rawat} onChange={(e) => updateField('jam_rawat', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Suhu</label>
              <input type="text" value={formData.suhu_tubuh} onChange={(e) => updateField('suhu_tubuh', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Tensi</label>
              <input type="text" value={formData.tensi} onChange={(e) => updateField('tensi', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Nadi</label>
              <input type="text" value={formData.nadi} onChange={(e) => updateField('nadi', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Respirasi</label>
              <input type="text" value={formData.respirasi} onChange={(e) => updateField('respirasi', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Tinggi</label>
              <input type="text" value={formData.tinggi} onChange={(e) => updateField('tinggi', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Berat</label>
              <input type="text" value={formData.berat} onChange={(e) => updateField('berat', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">SpO2</label>
              <input type="text" value={formData.spo2} onChange={(e) => updateField('spo2', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">GCS</label>
              <input type="text" value={formData.gcs} onChange={(e) => updateField('gcs', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Kesadaran</label>
              <select value={formData.kesadaran} onChange={(e) => updateField('kesadaran', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" required>
                <option value="">Pilih Kesadaran</option>
                {kesadaranOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Petugas (NIP)</label>
              <SearchableSelect
                source="petugas"
                value={formData.nip}
                onChange={(val) => updateField('nip', val)}
                placeholder="Cari petugas"
                searchPlaceholder="Cari nama atau NIP…"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Keluhan</label>
            <textarea value={formData.keluhan} onChange={(e) => updateField('keluhan', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" rows={3} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Pemeriksaan</label>
            <textarea value={formData.pemeriksaan} onChange={(e) => updateField('pemeriksaan', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Alergi</label>
              <input type="text" value={formData.alergi} onChange={(e) => updateField('alergi', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Penilaian</label>
              <input type="text" value={formData.penilaian} onChange={(e) => updateField('penilaian', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Rencana</label>
              <textarea value={formData.rtl} onChange={(e) => updateField('rtl', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Instruksi</label>
              <textarea value={formData.instruksi} onChange={(e) => updateField('instruksi', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Evaluasi</label>
            <textarea value={formData.evaluasi} onChange={(e) => updateField('evaluasi', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} required />
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
        <div className="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Riwayat Pemeriksaan</h3>
        </div>
        <div className="p-6">
          {loadingList ? (
            <div className="text-gray-500">Memuat…</div>
          ) : list.length === 0 ? (
            <div className="text-gray-500">Belum ada data pemeriksaan</div>
          ) : (
            <div className="space-y-3">
              {list.map((row, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>No. Rawat: <span className="font-mono">{row.no_rawat}</span></span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span>{new Date(row.tgl_perawatan).toLocaleDateString('id-ID')} • {String(row.jam_rawat).substring(0,5)}</span>
                      {row.nip ? (
                        <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs">NIP: {row.nip}</span>
                      ) : null}
                      {row.kesadaran ? (
                        <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 border border-purple-200 text-xs">{row.kesadaran}</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
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
                      className="px-3 py-1.5 text-xs rounded bg-gray-100 hover:bg-gray-200 text-gray-700 border"
                    >
                      Salin
                    </button>
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
                      className="px-3 py-1.5 text-xs rounded bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200"
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
                      className="px-3 py-1.5 text-xs rounded bg-red-100 hover:bg-red-200 text-red-700 border border-red-200"
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-gray-500">Suhu</div>
                      <div className="font-medium">{row.suhu_tubuh || '-'}</div>
                    </div>
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-gray-500">Tensi</div>
                      <div className="font-medium">{row.tensi || '-'}</div>
                    </div>
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-gray-500">Nadi</div>
                      <div className="font-medium">{row.nadi || '-'}</div>
                    </div>
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-gray-500">Respirasi</div>
                      <div className="font-medium">{row.respirasi || '-'}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="bg-white rounded p-3">
                      <div className="text-gray-500 text-xs mb-1">Keluhan</div>
                      <div className="text-sm whitespace-pre-wrap break-words">{row.keluhan || '-'}</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-gray-500 text-xs mb-1">Pemeriksaan</div>
                      <div className="text-sm whitespace-pre-wrap break-words">{row.pemeriksaan || '-'}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="text-gray-500 text-xs mb-1">Penilaian</div>
                      <div className="text-sm whitespace-pre-wrap break-words">{row.penilaian || '-'}</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-gray-500 text-xs mb-1">Rencana</div>
                      <div className="text-sm whitespace-pre-wrap break-words">{row.rtl || '-'}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="text-gray-500 text-xs mb-1">Instruksi</div>
                      <div className="text-sm whitespace-pre-wrap break-words">{row.instruksi || '-'}</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-gray-500 text-xs mb-1">Evaluasi</div>
                      <div className="text-sm whitespace-pre-wrap break-words">{row.evaluasi || '-'}</div>
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
