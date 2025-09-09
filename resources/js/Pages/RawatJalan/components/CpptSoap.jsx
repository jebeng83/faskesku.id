import React, { useEffect, useMemo, useState } from 'react';
import { route } from 'ziggy-js';

export default function CpptSoap({ token = '', noRkmMedis = '', noRawat = '' }) {
    const now = useMemo(() => new Date(), []);
    const [formData, setFormData] = useState({
        tgl_perawatan: now.toISOString().slice(0, 10),
        jam_rawat: now.toTimeString().slice(0, 5),
        suhu_tubuh: '',
        tensi: '',
        nadi: '',
        respirasi: '',
        tinggi: '',
        berat: '',
        spo2: '',
        gcs: '',
        kesadaran: 'Compos Mentis',
        keluhan: '',
        pemeriksaan: '',
        alergi: '',
        lingkar_perut: '',
        rtl: '',
        penilaian: '',
        instruksi: '',
        evaluasi: '',
        nip: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [list, setList] = useState([]);
    const [loadingList, setLoadingList] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [pegawaiOptions, setPegawaiOptions] = useState([]);
    const [pegawaiQuery, setPegawaiQuery] = useState('');
    const [editKey, setEditKey] = useState(null); // { no_rawat, tgl_perawatan, jam_rawat }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const kesadaranOptions = [
        'Compos Mentis','Somnolence','Sopor','Coma','Alert','Confusion','Voice','Pain','Unresponsive','Apatis','Delirium'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const creating = !editKey;
            const url = creating ? route('rawat-jalan.pemeriksaan-ralan.store') : route('rawat-jalan.pemeriksaan-ralan.update');
            const payload = creating
                ? { ...formData, no_rawat: noRawat, t: token }
                : { ...formData, key: editKey };
            const res = await fetch(url, {
                method: creating ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                credentials: 'same-origin',
                body: JSON.stringify(payload),
            });
            const text = await res.text();
            let json;
            try { json = text ? JSON.parse(text) : {}; } catch (_) { json = {}; }
            if (!res.ok) {
                const msg = (json && (json.message || (json.errors && Object.values(json.errors).flat().join(', ')))) || `Gagal menyimpan (${res.status})`;
                setError(msg);
                setMessage(null);
                return;
            }
            setError(null);
            setMessage(json.message || (creating ? 'Pemeriksaan tersimpan' : 'Pemeriksaan diperbarui'));
            await fetchList();
            setFormData((prev) => ({
                ...prev,
                suhu_tubuh: '', tensi: '', nadi: '', respirasi: '', tinggi: '', berat: '', spo2: '', gcs: '',
                keluhan: '', pemeriksaan: '', alergi: '', lingkar_perut: '', rtl: '', penilaian: '', instruksi: '', evaluasi: ''
            }));
            setPegawaiQuery('');
            setEditKey(null);
        } catch (e) {
            setError(e.message || 'Terjadi kesalahan saat menyimpan');
            setMessage(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchList = async () => {
        if (!noRawat) return;
        setLoadingList(true);
        try {
            const url = route('rawat-jalan.pemeriksaan-ralan', { no_rawat: noRawat, t: token });
            const res = await fetch(url);
            const json = await res.json();
            setList(json.data || []);
        } catch (e) {
            console.error('Gagal memuat pemeriksaan_ralan', e);
        } finally {
            setLoadingList(false);
        }
    };

    useEffect(() => {
        fetchList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noRawat]);

    const searchPegawai = async (q) => {
        const url = route('pegawai.search', { q });
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        const json = await res.json();
        setPegawaiOptions(json.data || []);
    };

    useEffect(() => {
        if (pegawaiQuery.trim() === '') { setPegawaiOptions([]); return; }
        const id = setTimeout(() => { searchPegawai(pegawaiQuery); }, 300);
        return () => clearTimeout(id);
    }, [pegawaiQuery]);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            {/* <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">CPPT / SOAP (Pemeriksaan)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sesuai tabel pemeriksaan_ralan</p>
            </div> */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Tanggal Perawatan</label>
                        <input type="date" name="tgl_perawatan" value={formData.tgl_perawatan} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Jam Rawat</label>
                        <input type="time" name="jam_rawat" value={formData.jam_rawat} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Kesadaran</label>
                        <select name="kesadaran" value={formData.kesadaran} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500">
                            {kesadaranOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Suhu (°C)</label>
                        <input type="text" name="suhu_tubuh" value={formData.suhu_tubuh} onChange={handleChange} placeholder="36.8" className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Tensi (mmHg)</label>
                        <input type="text" name="tensi" value={formData.tensi} onChange={handleChange} placeholder="120/80" className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Nadi (/menit)</label>
                        <input type="text" name="nadi" value={formData.nadi} onChange={handleChange} placeholder="80" className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Respirasi (/menit)</label>
                        <input type="text" name="respirasi" value={formData.respirasi} onChange={handleChange} placeholder="20" className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Tinggi (cm)</label>
                        <input type="text" name="tinggi" value={formData.tinggi} onChange={handleChange} placeholder="165" className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Berat (kg)</label>
                        <input type="text" name="berat" value={formData.berat} onChange={handleChange} placeholder="60" className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">SpO2 (%)</label>
                        <input type="text" name="spo2" value={formData.spo2} onChange={handleChange} placeholder="98" className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">GCS</label>
                        <input type="text" name="gcs" value={formData.gcs} onChange={handleChange} placeholder="E4V5M6" className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Lingkar Perut (cm)</label>
                        <input type="text" name="lingkar_perut" value={formData.lingkar_perut} onChange={handleChange} placeholder="80" className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Keluhan</label>
                        <textarea name="keluhan" value={formData.keluhan} onChange={handleChange} rows={3} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Keluhan utama" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Pemeriksaan</label>
                        <textarea name="pemeriksaan" value={formData.pemeriksaan} onChange={handleChange} rows={3} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Hasil pemeriksaan fisik/penunjang" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Alergi</label>
                        <input type="text" name="alergi" value={formData.alergi} onChange={handleChange} placeholder="Misal: Obat tertentu" className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="relative">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Petugas</label>
                        <input
                            type="text"
                            value={pegawaiQuery}
                            onChange={(e) => setPegawaiQuery(e.target.value)}
                            placeholder="Cari nama/nik pegawai..."
                            className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {pegawaiOptions.length > 0 && (
                            <div className="absolute z-10 mt-1 w-full max-h-56 overflow-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow">
                                {pegawaiOptions.map((p) => (
                                    <button
                                        key={p.nik}
                                        type="button"
                                        onClick={() => {
                                            setFormData((prev) => ({ ...prev, nip: p.nik }));
                                            setPegawaiQuery(p.nama + ' (' + p.nik + ')');
                                            setPegawaiOptions([]);
                                        }}
                                        className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/40 text-sm"
                                    >
                                        <span className="font-medium text-gray-900 dark:text-white">{p.nama}</span>
                                        <span className="ml-2 text-gray-600 dark:text-gray-300">{p.nik}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Nilai yang dikirim: NIP = NIK pegawai terpilih</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Rencana Tindak Lanjut (RTL)</label>
                        <textarea name="rtl" value={formData.rtl} onChange={handleChange} rows={3} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Penilaian</label>
                        <textarea name="penilaian" value={formData.penilaian} onChange={handleChange} rows={3} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Instruksi</label>
                        <textarea name="instruksi" value={formData.instruksi} onChange={handleChange} rows={3} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Evaluasi</label>
                    <textarea name="evaluasi" value={formData.evaluasi} onChange={handleChange} rows={2} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <div className="flex items-center justify-end gap-2">
                    {editKey && (
                        <button
                            type="button"
                            onClick={() => { setEditKey(null); setMessage(null); setError(null); }}
                            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-md"
                        >
                            Batal
                        </button>
                    )}
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md disabled:opacity-60" disabled={isSubmitting}>
                        {isSubmitting ? (editKey ? 'Mengupdate...' : 'Menyimpan...') : (editKey ? 'Update Pemeriksaan' : 'Simpan Pemeriksaan')}
                    </button>
                </div>
            </form>
            <div className="px-4 pb-4">
                {(message || error) && (
                    <div className={`mb-3 text-sm px-3 py-2 rounded ${error ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'}`}>
                        {error || message}
                    </div>
                )}
                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Riwayat Pemeriksaan</h4>
                    {loadingList ? (
                        <div className="text-sm text-gray-500 dark:text-gray-400">Memuat...</div>
                    ) : list.length === 0 ? (
                        <div className="text-sm text-gray-500 dark:text-gray-400">Belum ada pemeriksaan.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-600 dark:text-gray-300">
                                        <th className="pr-4 py-2">Tanggal</th>
                                        <th className="pr-4 py-2">Jam</th>
                                        <th className="pr-4 py-2">TTV</th>
                                        <th className="pr-4 py-2">Kesadaran</th>
                                        <th className="pr-4 py-2">Keluhan</th>
                                        <th className="pr-4 py-2">Pemeriksaan</th>
                                        <th className="pr-4 py-2">Penilaian</th>
                                        <th className="pr-4 py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {list.map((row, idx) => (
                                        <tr key={idx} className="align-top">
                                            <td className="pr-4 py-2 text-gray-900 dark:text-white">{new Date(row.tgl_perawatan).toLocaleDateString('id-ID')}</td>
                                            <td className="pr-4 py-2 text-gray-900 dark:text-white">{String(row.jam_rawat).substring(0,5)}</td>
                                            <td className="pr-4 py-2 text-gray-700 dark:text-gray-300">
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                    <span>Suhu: {row.suhu_tubuh || '-'}</span>
                                                    <span>Tensi: {row.tensi || '-'}</span>
                                                    <span>Nadi: {row.nadi || '-'}</span>
                                                    <span>RR: {row.respirasi || '-'}</span>
                                                    <span>BB: {row.berat || '-'}</span>
                                                    <span>TB: {row.tinggi || '-'}</span>
                                                    <span>SpO2: {row.spo2 || '-'}</span>
                                                    <span>GCS: {row.gcs || '-'}</span>
                                                </div>
                                            </td>
                                            <td className="pr-4 py-2 text-gray-700 dark:text-gray-300">{row.kesadaran}</td>
                                            <td className="pr-4 py-2 text-gray-700 dark:text-gray-300 max-w-xs truncate" title={row.keluhan || ''}>{row.keluhan || '-'}</td>
                                            <td className="pr-4 py-2 text-gray-700 dark:text-gray-300 max-w-xs truncate" title={row.pemeriksaan || ''}>{row.pemeriksaan || '-'}</td>
                                            <td className="pr-4 py-2 text-gray-700 dark:text-gray-300 max-w-xs truncate" title={row.penilaian || ''}>{row.penilaian || '-'}</td>
                                            <td className="pr-4 py-2 space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
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
                                                            kesadaran: row.kesadaran || 'Compos Mentis',
                                                            keluhan: row.keluhan || '',
                                                            pemeriksaan: row.pemeriksaan || '',
                                                            alergi: row.alergi || '',
                                                            lingkar_perut: row.lingkar_perut || '',
                                                            rtl: row.rtl || '',
                                                            penilaian: row.penilaian || '',
                                                            instruksi: row.instruksi || '',
                                                            evaluasi: row.evaluasi || '',
                                                            nip: row.nip || '',
                                                        });
                                                        setPegawaiQuery('');
                                                        setEditKey({
                                                            no_rawat: row.no_rawat,
                                                            tgl_perawatan: row.tgl_perawatan,
                                                            jam_rawat: String(row.jam_rawat).length === 5 ? row.jam_rawat + ':00' : row.jam_rawat,
                                                        });
                                                        setMessage(null);
                                                        setError(null);
                                                    }}
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        if (!confirm('Hapus pemeriksaan ini?')) return;
                                                        try {
                                                            const url = route('rawat-jalan.pemeriksaan-ralan.delete');
                                                            const res = await fetch(url, {
                                                                method: 'DELETE',
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                    'Accept': 'application/json',
                                                                    'X-Requested-With': 'XMLHttpRequest',
                                                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                                                },
                                                                credentials: 'same-origin',
                                                                body: JSON.stringify({
                                                                    no_rawat: row.no_rawat,
                                                                    tgl_perawatan: row.tgl_perawatan,
                                                                    jam_rawat: String(row.jam_rawat).length === 5 ? row.jam_rawat + ':00' : row.jam_rawat,
                                                                }),
                                                            });
                                                            const text = await res.text();
                                                            let json; try { json = text ? JSON.parse(text) : {}; } catch (_) { json = {}; }
                                                            if (!res.ok) {
                                                                setError(json.message || 'Gagal menghapus');
                                                                setMessage(null);
                                                                return;
                                                            }
                                                            setError(null);
                                                            setMessage(json.message || 'Pemeriksaan dihapus');
                                                            await fetchList();
                                                        } catch (e) {
                                                            setError(e.message || 'Gagal menghapus');
                                                            setMessage(null);
                                                        }
                                                    }}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


