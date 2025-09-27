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
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base md:text-lg">CPPT / SOAP (Pemeriksaan)</h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Catatan Perkembangan Pasien Terintegrasi</p>
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 md:p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Informasi Dasar</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tanggal Perawatan</label>
                            <input type="date" name="tgl_perawatan" value={formData.tgl_perawatan} onChange={handleChange} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Jam Rawat</label>
                            <input type="time" name="jam_rawat" value={formData.jam_rawat} onChange={handleChange} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Kesadaran</label>
                            <select name="kesadaran" value={formData.kesadaran} onChange={handleChange} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                                {kesadaranOptions.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 md:p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Tanda-Tanda Vital & Antropometri
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Suhu (°C)</label>
                            <input type="text" name="suhu_tubuh" value={formData.suhu_tubuh} onChange={handleChange} placeholder="36.8" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tensi (mmHg)</label>
                            <input type="text" name="tensi" value={formData.tensi} onChange={handleChange} placeholder="120/80" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nadi (/menit)</label>
                            <input type="text" name="nadi" value={formData.nadi} onChange={handleChange} placeholder="80" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Respirasi (/menit)</label>
                            <input type="text" name="respirasi" value={formData.respirasi} onChange={handleChange} placeholder="20" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">SpO2 (%)</label>
                            <input type="text" name="spo2" value={formData.spo2} onChange={handleChange} placeholder="98" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tinggi (cm)</label>
                            <input type="text" name="tinggi" value={formData.tinggi} onChange={handleChange} placeholder="165" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Berat (kg)</label>
                            <input type="text" name="berat" value={formData.berat} onChange={handleChange} placeholder="60" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">GCS</label>
                            <input type="text" name="gcs" value={formData.gcs} onChange={handleChange} placeholder="E4V5M6" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Lingkar Perut (cm)</label>
                            <input type="text" name="lingkar_perut" value={formData.lingkar_perut} onChange={handleChange} placeholder="80" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 md:p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Subjektif & Objektif
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Keluhan Utama (Subjektif)</label>
                            <textarea name="keluhan" value={formData.keluhan} onChange={handleChange} rows={4} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" placeholder="Keluhan yang dirasakan pasien..." />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Pemeriksaan Fisik (Objektif)</label>
                            <textarea name="pemeriksaan" value={formData.pemeriksaan} onChange={handleChange} rows={4} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" placeholder="Hasil pemeriksaan fisik dan penunjang..." />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                    <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                            <svg className="w-4 h-4 mr-1.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            Alergi
                        </label>
                        <input type="text" name="alergi" value={formData.alergi} onChange={handleChange} placeholder="Contoh: Penisilin, Aspirin" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                    </div>
                    <div className="relative">
                        <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                            <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Petugas Pemeriksa
                        </label>
                        <input
                            type="text"
                            value={pegawaiQuery}
                            onChange={(e) => setPegawaiQuery(e.target.value)}
                            placeholder="Ketik nama atau NIK pegawai..."
                            className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        />
                        {pegawaiOptions.length > 0 && (
                            <div className="absolute z-20 mt-1 w-full max-h-48 overflow-auto rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg">
                                {pegawaiOptions.map((p) => (
                                    <button
                                        key={p.nik}
                                        type="button"
                                        onClick={() => {
                                            setFormData((prev) => ({ ...prev, nip: p.nik }));
                                            setPegawaiQuery(p.nama + ' (' + p.nik + ')');
                                            setPegawaiOptions([]);
                                        }}
                                        className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-sm border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
                                    >
                                        <div className="font-medium text-gray-900 dark:text-white">{p.nama}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">NIK: {p.nik}</div>
                                    </button>
                                ))}
                            </div>
                        )}
                        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">💡 Mulai ketik untuk mencari pegawai</p>
                    </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 md:p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Assessment & Planning
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Penilaian (Assessment)</label>
                            <textarea name="penilaian" value={formData.penilaian} onChange={handleChange} rows={3} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" placeholder="Diagnosis dan analisis kondisi pasien..." />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Rencana Tindak Lanjut (Planning)</label>
                            <textarea name="rtl" value={formData.rtl} onChange={handleChange} rows={3} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" placeholder="Rencana pengobatan dan tindakan..." />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Instruksi Medis</label>
                            <textarea name="instruksi" value={formData.instruksi} onChange={handleChange} rows={3} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" placeholder="Instruksi untuk pasien dan perawat..." />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Evaluasi</label>
                            <textarea name="evaluasi" value={formData.evaluasi} onChange={handleChange} rows={3} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" placeholder="Evaluasi hasil pengobatan..." />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                    {editKey && (
                        <button
                            type="button"
                            onClick={() => { setEditKey(null); setMessage(null); setError(null); }}
                            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Batal
                        </button>
                    )}
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-2.5 rounded-md text-sm font-medium transition-colors disabled:cursor-not-allowed flex items-center justify-center" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {editKey ? 'Mengupdate...' : 'Menyimpan...'}
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {editKey ? 'Update Pemeriksaan' : 'Simpan Pemeriksaan'}
                            </>
                        )}
                    </button>
                </div>
            </form>
            <div className="px-4 md:px-6 pb-4 md:pb-6">
                {(message || error) && (
                    <div className={`mb-4 text-sm px-4 py-3 rounded-lg border flex items-start ${error ? 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800' : 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'}`}>
                        <svg className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${error ? 'text-red-500' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {error ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                        </svg>
                        <span>{error || message}</span>
                    </div>
                )}
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            Riwayat Pemeriksaan
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {list.length} record
                        </span>
                    </div>
                    {loadingList ? (
                        <div className="flex items-center justify-center py-8">
                            <svg className="animate-spin h-6 w-6 text-indigo-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Memuat riwayat pemeriksaan...</span>
                        </div>
                    ) : list.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Belum ada pemeriksaan</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Mulai dengan menambahkan pemeriksaan pertama.</p>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                        <tr className="text-left text-gray-600 dark:text-gray-300">
                                            <th className="px-4 py-3 font-medium">Tanggal</th>
                                            <th className="px-4 py-3 font-medium">Jam</th>
                                            <th className="px-4 py-3 font-medium">TTV</th>
                                            <th className="px-4 py-3 font-medium">Kesadaran</th>
                                            <th className="px-4 py-3 font-medium">Keluhan</th>
                                            <th className="px-4 py-3 font-medium">Pemeriksaan</th>
                                            <th className="px-4 py-3 font-medium">Penilaian</th>
                                            <th className="px-4 py-3 font-medium text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {list.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                                                    {new Date(row.tgl_perawatan).toLocaleDateString('id-ID', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </td>
                                                <td className="px-4 py-3 text-gray-900 dark:text-white font-mono">{String(row.jam_rawat).substring(0,5)}</td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                    <div className="space-y-1 text-xs">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">Suhu:</span>
                                                            <span className="font-medium">{row.suhu_tubuh || '-'}°C</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">Tensi:</span>
                                                            <span className="font-medium">{row.tensi || '-'}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">Nadi:</span>
                                                            <span className="font-medium">{row.nadi || '-'}/min</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">SpO2:</span>
                                                            <span className="font-medium">{row.spo2 || '-'}%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                        {row.kesadaran}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 max-w-xs">
                                                    <div className="truncate" title={row.keluhan || ''}>
                                                        {row.keluhan || <span className="text-gray-400 italic">Tidak ada keluhan</span>}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 max-w-xs">
                                                    <div className="truncate" title={row.pemeriksaan || ''}>
                                                        {row.pemeriksaan || <span className="text-gray-400 italic">Belum diperiksa</span>}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 max-w-xs">
                                                    <div className="truncate" title={row.penilaian || ''}>
                                                        {row.penilaian || <span className="text-gray-400 italic">Belum dinilai</span>}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-center space-x-2">
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
                                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50 transition-colors"
                                                            title="Edit pemeriksaan"
                                                        >
                                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={async () => {
                                                                if (!confirm('Yakin ingin menghapus pemeriksaan ini?\n\nData yang dihapus tidak dapat dikembalikan.')) return;
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
                                                                        setError(json.message || 'Gagal menghapus pemeriksaan');
                                                                        setMessage(null);
                                                                        return;
                                                                    }
                                                                    setError(null);
                                                                    setMessage(json.message || 'Pemeriksaan berhasil dihapus');
                                                                    await fetchList();
                                                                } catch (e) {
                                                                    setError(e.message || 'Terjadi kesalahan saat menghapus');
                                                                    setMessage(null);
                                                                }
                                                            }}
                                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                                                            title="Hapus pemeriksaan"
                                                        >
                                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


