import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import LanjutanRalanLayout from '@/Layouts/LanjutanRalanLayout';
import SearchableSelect from '@/Components/SearchableSelect.jsx';
import { todayDateString, nowDateTimeString } from '@/tools/datetime';

export default function CatatanKeperawatan({ rawatInap, params }) {
    const [formData, setFormData] = useState(() => {
        const now = nowDateTimeString();
        const time = now.split(' ')[1]?.substring(0, 5) || '';
        return {
            tanggal: todayDateString(),
            jam: time,
            uraian: '',
            nip: '',
        };
    });
    const [list, setList] = useState([]);
    const [loadingList, setLoadingList] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const token = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : '';
    const noRawat = params?.no_rawat || rawatInap?.no_rawat || '';

    const updateField = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const fetchList = async () => {
        if (!noRawat && !token) {
            setList([]);
            return;
        }
        setLoadingList(true);
        try {
            const res = await axios.get('/rawat-inap/catatan-keperawatan-ranap', {
                params: {
                    t: token || undefined,
                    no_rawat: noRawat || undefined,
                },
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
        setMessage(null);
        setError(null);

        if (!noRawat) {
            setError('No. Rawat tidak ditemukan.');
            return;
        }

        if (!formData.tanggal || !formData.jam || !formData.nip) {
            setError('Lengkapi tanggal, jam, dan NIP.');
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                no_rawat: noRawat,
                tanggal: formData.tanggal,
                jam: formData.jam,
                uraian: formData.uraian,
                nip: formData.nip,
            };
            const res = await axios.post('/rawat-inap/catatan-keperawatan-ranap', payload, {
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            });
            const msg = res.data?.message || 'Catatan keperawatan tersimpan';
            setMessage(msg);
            const now = nowDateTimeString();
            const time = now.split(' ')[1]?.substring(0, 5) || '';
            setFormData((prev) => ({
                ...prev,
                jam: time,
                uraian: '',
            }));
            await fetchList();
        } catch (e) {
            const msg = e?.response?.data?.message || 'Gagal menyimpan catatan keperawatan';
            setError(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (row) => {
        const ok = window.confirm('Yakin ingin menghapus catatan ini?');
        if (!ok) return;
        setMessage(null);
        setError(null);
        try {
            const res = await axios.delete('/rawat-inap/catatan-keperawatan-ranap', {
                data: {
                    no_rawat: row.no_rawat,
                    tanggal: row.tanggal,
                    jam: row.jam,
                },
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            });
            const msg = res.data?.message || 'Catatan keperawatan dihapus';
            setMessage(msg);
            await fetchList();
        } catch (e) {
            const msg = e?.response?.data?.message || 'Gagal menghapus catatan keperawatan';
            setError(msg);
        }
    };

    useEffect(() => {
        fetchList();
    }, [noRawat, token]);

    const titleText = 'Catatan Keperawatan Ranap';
    const headTitle = noRawat ? `${titleText} - ${noRawat}` : titleText;

    return (
        <LanjutanRalanLayout
            title={titleText}
            context="ranap"
            menuConfig={{ activeTab: 'catatanKeperawatan' }}
        >
            <Head title={headTitle} />
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 rounded-2xl p-8 text-white">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{titleText}</h1>
                                <p className="text-blue-100 text-lg">Catatan perkembangan keperawatan harian pasien rawat inap</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-full overflow-x-hidden items-stretch">
                    <div className="transition-all duration-300 w-full lg:overflow-auto self-start lg:col-span-4">
                        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden sticky top-6">
                            <div className="bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-3 border-b">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">Identitas Pasien</h3>
                                        <p className="text-xs text-gray-600">
                                            No. Rawat: <span className="font-mono">{noRawat || '-'}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 space-y-1 text-[12px] leading-tight">
                                <div className="grid grid-cols-[7.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                    <span className="text-left text-gray-700">Nama</span>
                                    <span className="text-gray-400 text-center">:</span>
                                    <span className="text-gray-900 font-semibold">
                                        {rawatInap?.patient?.nm_pasien || '-'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-[7.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                    <span className="text-left text-gray-700">No RM</span>
                                    <span className="text-gray-400 text-center">:</span>
                                    <span className="text-gray-900 font-mono">
                                        {rawatInap?.patient?.no_rkm_medis || params?.no_rkm_medis || '-'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-[7.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                    <span className="text-left text-gray-700">Umur</span>
                                    <span className="text-gray-400 text-center">:</span>
                                    <span className="text-gray-900">
                                        {(rawatInap?.patient?.umur || rawatInap?.umurdaftar)
                                            ? `${rawatInap?.patient?.umur || rawatInap?.umurdaftar} ${rawatInap?.sttsumur || 'Th'}`
                                            : '-'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-[7.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                    <span className="text-left text-gray-700">JK</span>
                                    <span className="text-gray-400 text-center">:</span>
                                    <span className="text-gray-900">
                                        {rawatInap?.patient?.jk || '-'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-[7.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                    <span className="text-left text-gray-700">Alamat</span>
                                    <span className="text-gray-400 text-center">:</span>
                                    <span className="text-gray-900 break-words">
                                        {[
                                            rawatInap?.patient?.alamat,
                                            rawatInap?.patient?.kelurahan?.nm_kel || rawatInap?.patient?.kd_kel,
                                            rawatInap?.patient?.kecamatan?.nm_kec || rawatInap?.patient?.kd_kec,
                                            rawatInap?.patient?.kabupaten?.nm_kab || rawatInap?.patient?.kd_kab,
                                        ].filter(Boolean).join(', ') || '-'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-[7.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                    <span className="text-left text-gray-700">Cara bayar</span>
                                    <span className="text-gray-400 text-center">:</span>
                                    <span className="text-gray-900">
                                        {rawatInap?.penjab?.png_jawab || rawatInap?.cara_bayar || '-'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="transition-all duration-300 w-full max-w-full overflow-x-hidden min-w-0 lg:col-span-8 flex flex-col h-full">
                        <div className="space-y-4 w-full max-w-full overflow-x-hidden h-full">
                            <div className="bg-white rounded-2xl border shadow-sm">
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M7 7h10M5 5a2 2 0 012-2h10a2 2 0 012 2v14l-4-2-4 2-4-2-4 2V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Input Catatan Keperawatan</h3>
                                            <p className="text-sm text-gray-500">Isi catatan keperawatan harian untuk pasien ini.</p>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                    {message && (
                                        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm">
                                            {message}
                                        </div>
                                    )}
                                    {error && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                                            {error}
                                        </div>
                                    )}
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <label className="text-xs md:text-sm font-medium text-gray-700 mb-0">
                                                Tanggal
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.tanggal}
                                                onChange={(e) => updateField('tanggal', e.target.value)}
                                                className="text-sm h-9 md:h-10 px-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                required
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label className="text-xs md:text-sm font-medium text-gray-700 mb-0">
                                                Jam
                                            </label>
                                            <input
                                                type="time"
                                                value={formData.jam}
                                                onChange={(e) => updateField('jam', e.target.value)}
                                                className="text-sm h-9 md:h-10 px-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                required
                                            />
                                        </div>
                                        <div className="flex-1 min-w-[200px]">
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
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
                                    </div>
                                    <div>
                                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                            Uraian Catatan
                                        </label>
                                        <textarea
                                            value={formData.uraian}
                                            onChange={(e) => updateField('uraian', e.target.value)}
                                            rows={4}
                                            className="w-full text-sm rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none h-28"
                                            maxLength={1000}
                                            placeholder="Tuliskan catatan keperawatan terkait kondisi, tindakan, dan respon pasien…"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <p className="text-xs text-gray-500">
                                            Maksimal 1000 karakter. Pastikan catatan singkat, jelas, dan spesifik.
                                        </p>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !noRawat}
                                            className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white shadow-sm transition-colors ${
                                                isSubmitting || !noRawat
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-blue-600 hover:bg-blue-700'
                                            }`}
                                        >
                                            {isSubmitting ? 'Menyimpan…' : 'Simpan Catatan'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="bg-white rounded-2xl border shadow-sm">
                                <div className="px-6 py-4 border-b flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Riwayat Catatan Keperawatan</h3>
                                        <p className="text-sm text-gray-500">
                                            {noRawat ? `Daftar catatan untuk No. Rawat ${noRawat}` : 'No. Rawat belum dipilih.'}
                                        </p>
                                    </div>
                                    {loadingList && (
                                        <span className="text-xs text-gray-500">Memuat…</span>
                                    )}
                                </div>
                                <div className="divide-y divide-gray-100 max-h-[520px] overflow-y-auto">
                                    {list.length === 0 && !loadingList && (
                                        <div className="px-6 py-8 text-center text-sm text-gray-500">
                                            Belum ada catatan keperawatan untuk pasien ini.
                                        </div>
                                    )}
                                    {list.map((row, idx) => (
                                        <div key={`${row.tanggal}-${row.jam}-${idx}`} className="px-6 py-4 flex flex-col gap-2">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
                                                    <div className="flex items-center gap-1">
                                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span>{new Date(row.tanggal).toLocaleDateString('id-ID')}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span>{String(row.jam).substring(0, 5)}</span>
                                                    </div>
                                                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs">
                                                        NIP: {row.nip || '-'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(row)}
                                                        className="inline-flex items-center px-3 py-1.5 text-xs rounded-md text-red-700 bg-red-50 hover:bg-red-100 border border-red-200"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                            {row.uraian ? (
                                                <p className="text-sm text-gray-800 whitespace-pre-line">
                                                    {row.uraian}
                                                </p>
                                            ) : (
                                                <p className="text-sm text-gray-400 italic">
                                                    Tidak ada uraian.
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LanjutanRalanLayout>
    );
}

