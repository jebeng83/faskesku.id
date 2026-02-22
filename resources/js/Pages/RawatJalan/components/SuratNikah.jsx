import { useEffect, useMemo, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SidebarRalan from '@/Layouts/SidebarRalan';
import { todayDateString } from '@/tools/datetime';
import QRCode from 'qrcode';

export default function SuratNikah({ rawatJalan, patient, dokter, setting, suratNikahData, embedded = false, templateSelector, validationUrl }) {
    const [formData, setFormData] = useState({
        no_surat: suratNikahData?.no_surat || '',
        no_rawat: rawatJalan?.no_rawat || '',
        no_ktp_suami: suratNikahData?.no_ktp_suami || '',
        nm_suami: suratNikahData?.nm_suami || '',
        tgl_lahir: suratNikahData?.tgl_lahir || '',
        umur: suratNikahData?.umur || '',
        jk: suratNikahData?.jk || 'Perjaka',
        alamat: suratNikahData?.alamat || '',
        hasil_pp_test: suratNikahData?.hasil_pp_test || 'Negatif',
        tanggal_pp_test: suratNikahData?.tanggal_pp_test || '',
        pekerjaan: suratNikahData?.pekerjaan || 'Karyawan Swasta',
        tanggal: suratNikahData?.tanggal || todayDateString(),
        tanggal_nikah: suratNikahData?.tanggal_nikah || todayDateString(),
    });

    const [isLoading, setIsLoading] = useState(false);
    const [hasSaved, setHasSaved] = useState(!!suratNikahData);
    const [submitError, setSubmitError] = useState('');
    const [ttdQrDataUrl, setTtdQrDataUrl] = useState('');
    const [valQrDataUrl, setValQrDataUrl] = useState('');
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('mode') === 'print') {
            setTimeout(() => {
                window.print();
            }, 800);
        }
    }, []);

    useEffect(() => {
        if (suratNikahData?.no_surat) {
            setFormData((prev) => ({ ...prev, no_surat: suratNikahData.no_surat }));
            return;
        }
        const baseDate = formData.tanggal || formData.tanggal_nikah;
        if (!baseDate) return;
        try {
            const d = new Date(baseDate);
            if (Number.isNaN(d.getTime())) return;
            const yyyy = d.getFullYear();
            const key = `suratSeq:SKNIKAH:${yyyy}`;
            let curr = 0;
            try {
                const raw = localStorage.getItem(key);
                curr = raw ? parseInt(raw, 10) || 0 : 0;
            } catch { }
            const next = curr + 1;
            try {
                localStorage.setItem(key, String(next));
            } catch { }
            const nomor = `No. 445.1/${next}.14/${yyyy}`;
            setFormData((prev) => ({ ...prev, no_surat: nomor }));
        } catch { }
    }, [formData.tanggal, formData.tanggal_nikah, suratNikahData]);

    useEffect(() => {
        if (!formData.tgl_lahir) return;
        try {
            const birth = new Date(formData.tgl_lahir);
            if (Number.isNaN(birth.getTime())) return;
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
            setFormData((prev) => ({ ...prev, umur: String(Math.max(age, 0)) }));
        } catch { }
    }, [formData.tgl_lahir]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubmitError('');
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const firstErrorMessage = (errors) => {
        if (!errors) return '';
        if (typeof errors === 'string') return errors;
        if (errors?.message && typeof errors.message === 'string') return errors.message;
        if (errors?.error && typeof errors.error === 'string') return errors.error;
        if (typeof errors === 'object') {
            const keys = Object.keys(errors);
            if (keys.length === 0) return '';
            const v = errors[keys[0]];
            if (Array.isArray(v)) return v[0] || '';
            if (typeof v === 'string') return v;
        }
        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitError('');
        setIsLoading(true);

        const payload = {
            no_surat: formData.no_surat,
            no_rawat: formData.no_rawat,
            no_ktp_suami: formData.no_ktp_suami,
            nm_suami: formData.nm_suami,
            tgl_lahir: formData.tgl_lahir,
            umur: formData.umur,
            jk: formData.jk,
            alamat: formData.alamat,
            hasil_pp_test: formData.hasil_pp_test,
            tanggal_pp_test: formData.tanggal_pp_test,
            pekerjaan: formData.pekerjaan,
            tanggal: formData.tanggal,
            tanggal_nikah: formData.tanggal_nikah,
        };

        router.post(route('rawat-jalan.surat-nikah.store'), payload, {
            onSuccess: () => {
                setHasSaved(true);
            },
            onError: (errors) => {
                const msg = firstErrorMessage(errors) || 'Tidak bisa menyimpan surat nikah.';
                setSubmitError(msg);
                setIsLoading(false);
            },
            onFinish: () => {
                setIsLoading(false);
            },
        });
    };

    const handlePrint = () => {
        window.print();
    };

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatShortDate = (date) => {
        if (!date) return '-';
        try {
            const iso = typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00` : date;
            const d = new Date(iso);
            if (Number.isNaN(d.getTime())) return String(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        } catch {
            return String(date);
        }
    };

    const safeText = (value) => {
        const v = (value ?? '').toString().trim();
        return v === '' ? '-' : v;
    };

    const patientFullAddress = () => {
        const parts = [
            rawatJalan?.patient?.alamat,
            rawatJalan?.patient?.kelurahan?.nm_kel || rawatJalan?.patient?.kd_kel,
            rawatJalan?.patient?.kecamatan?.nm_kec || rawatJalan?.patient?.kd_kec,
            rawatJalan?.patient?.kabupaten?.nm_kab || rawatJalan?.patient?.kd_kab,
        ].filter(Boolean);
        return parts.join(', ');
    };

    const ttdQrText = useMemo(() => ([
        `Dikeluarkan oleh: ${safeText(setting?.nama_instansi)}`,
        `Ditandatangani oleh: ${safeText(dokter?.nm_dokter)}`,
        `Untuk: ${safeText(patient?.nm_pasien)}`,
        `No Surat: ${safeText(formData.no_surat)}`,
        `Pada: ${formatDate(formData.tanggal)}`,
    ].join('\n')), [setting?.nama_instansi, dokter?.nm_dokter, patient?.nm_pasien, formData.no_surat, formData.tanggal]);

    useEffect(() => {
        let active = true;
        QRCode.toDataURL(ttdQrText, { width: 384, margin: 1, errorCorrectionLevel: 'M' })
            .then((url) => {
                if (active) setTtdQrDataUrl(url);
            })
            .catch(() => {
                if (active) setTtdQrDataUrl('');
            });
        return () => {
            active = false;
        };
    }, [ttdQrText]);

    useEffect(() => {
        let active = true;
        const url = (validationUrl || '').toString();
        if (!url) {
            setValQrDataUrl('');
            return;
        }
        QRCode.toDataURL(url, { width: 384, margin: 1, errorCorrectionLevel: 'M' })
            .then((data) => { if (active) setValQrDataUrl(data); })
            .catch(() => { if (active) setValQrDataUrl(''); });
        return () => { active = false; };
    }, [validationUrl]);

    const backToRalanUrl = route('rawat-jalan.index');
    const pekerjaanOptions = ['Karyawan Swasta', 'PNS', 'Wiraswasta', 'Pelajar', 'Mahasiswa', 'Buruh', 'Lain-lain'];
    const statusOptions = ['Perjaka', 'Dudha', 'Menikah'];
    const hasilPpOptions = ['Negatif', 'Positif'];
    const Layout = embedded ? ({ children }) => <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">{children}</div> : SidebarRalan;

    return (
        <Layout>
            {!embedded && <Head title="Surat Keterangan Nikah" />}
            <style>{`
                @page { 
                    size: A4 portrait; 
                    margin: 0;
                }
                @media print {
                    html, body {
                        background: #fff !important;
                    }
                    body { 
                        -webkit-print-color-adjust: exact; 
                        print-color-adjust: exact; 
                    }
                    body * {
                        visibility: hidden !important;
                    }
                    .print-container,
                    .print-container * {
                        visibility: visible !important;
                    }
                    nav, header, footer, .sidebar, [role="navigation"] {
                        display: none !important;
                    }
                    body > div > div > nav,
                    body > div > div > aside,
                    body > div > div > header {
                        display: none !important;
                    }
                    body > div > div > main,
                    body > div > div {
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                        max-width: 100% !important;
                    }
                    .print-container {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: #fff;
                        z-index: 9999;
                    }
                    .print-text-black { color: #000 !important; }
                    .print-text-bold { font-weight: 700 !important; }
                }
            `}</style>

            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg print:hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Surat Keterangan Nikah</h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">Cetak surat keterangan nikah untuk pasien</p>
                            </div>
                            <div className="flex gap-3">
                                {!embedded && (
                                    <button
                                        type="button"
                                        onClick={() => router.get(backToRalanUrl)}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Kembali Rawat Jalan
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-700/60 bg-gradient-to-br from-purple-50/80 via-white/70 to-indigo-50/80 dark:from-gray-900/70 dark:via-gray-900/60 dark:to-gray-800/70 p-4 lg:p-5 print:border-0 print:bg-transparent print:p-0 print:rounded-none">
                    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 print:block">
                        <div className="lg:col-span-5 xl:col-span-4 print:hidden">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                {templateSelector && (
                                    <div className="px-4 pt-4">
                                        {templateSelector}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                    <div className="mb-3 p-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 rounded-lg">
                                        <label className="block text-xs font-medium text-purple-700 dark:text-purple-300 mb-1">
                                            Jenis Surat
                                        </label>
                                        <div className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                                            Surat Keterangan Nikah
                                        </div>
                                    </div>

                                    {submitError && (
                                        <div className="rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/20 px-3 py-2 text-sm text-red-700 dark:text-red-200">
                                            {submitError}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Surat</label>
                                            <input
                                                type="text"
                                                name="no_surat"
                                                value={formData.no_surat}
                                                readOnly
                                                className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white text-sm font-mono"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Surat</label>
                                            <input
                                                type="date"
                                                name="tanggal"
                                                value={formData.tanggal}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Nikah</label>
                                            <input
                                                type="date"
                                                name="tanggal_nikah"
                                                value={formData.tanggal_nikah}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Hasil PP Test</label>
                                            <select
                                                name="hasil_pp_test"
                                                value={formData.hasil_pp_test}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                required
                                            >
                                                {hasilPpOptions.map((opt) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal PP Test</label>
                                        <input
                                            type="date"
                                            name="tanggal_pp_test"
                                            value={formData.tanggal_pp_test}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                        />
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Identitas Suami</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">No. KTP Suami</label>
                                                <input
                                                    type="text"
                                                    name="no_ktp_suami"
                                                    value={formData.no_ktp_suami}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Suami</label>
                                                <input
                                                    type="text"
                                                    name="nm_suami"
                                                    value={formData.nm_suami}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Lahir</label>
                                                <input
                                                    type="date"
                                                    name="tgl_lahir"
                                                    value={formData.tgl_lahir}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Umur</label>
                                                <input
                                                    type="text"
                                                    name="umur"
                                                    value={formData.umur}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                                <select
                                                    name="jk"
                                                    value={formData.jk}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                >
                                                    {statusOptions.map((opt) => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Pekerjaan</label>
                                                <select
                                                    name="pekerjaan"
                                                    value={formData.pekerjaan}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                >
                                                    {pekerjaanOptions.map((opt) => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Suami</label>
                                                <input
                                                    type="text"
                                                    name="alamat"
                                                    value={formData.alamat}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Data Pasien</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Pasien</label>
                                                <input
                                                    type="text"
                                                    value={patient?.nm_pasien || ''}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white text-sm"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">No. Rekam Medis</label>
                                                <input
                                                    type="text"
                                                    value={patient?.no_rkm_medis || ''}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white text-sm"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={handlePrint}
                                            disabled={!hasSaved}
                                            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-semibold"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" />
                                            </svg>
                                            Cetak
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-semibold"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Menyimpan...
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {suratNikahData || hasSaved ? 'Edit' : 'Simpan'}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="lg:col-span-7 xl:col-span-8">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg print:shadow-none lg:sticky lg:top-20">
                                <div className="p-4 sm:p-6 print:p-0">
                                    <div className="mx-auto w-full bg-white text-gray-900 rounded-xl border border-gray-200 shadow-sm print:shadow-none print:border-0 print:rounded-none print-container print:p-3">
                                        <div className="px-5 pt-4 pb-3 border-b-2 border-gray-800 print:px-4 print:pt-1 print:pb-1">
                                            <div className="flex items-center gap-4 print:gap-3">
                                                {setting?.logo && (
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={`data:image/png;base64,${setting.logo}`}
                                                            alt="Logo"
                                                            className="w-16 h-16 object-contain print:w-14 print:h-14"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1 text-center">
                                                    <div className="text-base font-bold tracking-wide uppercase print:text-sm print-text-bold">{setting?.nama_instansi || 'Rumah Sakit'}</div>
                                                    <div className="text-[11px] text-gray-700 leading-tight mt-1 print:text-[10px] print:mt-0.5 print-text-black">
                                                        {setting?.alamat_instansi && <div>{setting.alamat_instansi}</div>}
                                                        {(setting?.kabupaten || setting?.propinsi) && (
                                                            <div>{[setting?.kabupaten, setting?.propinsi].filter(Boolean).join(', ')}</div>
                                                        )}
                                                        {(setting?.kontak || setting?.email) && (
                                                            <div>{[setting?.kontak, setting?.email].filter(Boolean).join(' | ')}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0 w-16 print:w-14"></div>
                                            </div>
                                        </div>

                                        <div className="px-5 pt-3 pb-2 print:px-3 print:pt-1 print:pb-1">
                                            <div className="text-center">
                                                <div className="text-sm font-bold tracking-wide underline">SURAT KETERANGAN NIKAH</div>
                                                <div className="text-xs text-gray-700 mt-0.5">Nomor: {safeText(formData.no_surat)}</div>
                                            </div>
                                        </div>

                                        <div className="px-5 pt-2 pb-3 print:px-3 print:pt-0 print:pb-0">
                                            <div className="text-xs leading-tight print:leading-tight print-text-black">
                                                Yang bertanda tangan di bawah ini, Dokter yang bertugas di <span className="font-semibold print-text-bold">{setting?.nama_instansi || 'Rumah Sakit'}</span>, menerangkan bahwa:
                                            </div>

                                            <div className="mt-2 grid grid-cols-2 gap-3 text-xs leading-tight print:mt-1.5 print:gap-2 print:text-[10px]">
                                                <div className="rounded-lg border border-gray-300 px-2.5 py-1.5 print:border-gray-800 print:px-2 print:py-1">
                                                    <div className="text-[10px] font-bold tracking-wide mb-0.5 print-text-bold uppercase print:mb-1">IDENTITAS PASIEN</div>
                                                    <div className="grid grid-cols-[70px_3px_1fr] gap-x-1 gap-y-0.5">
                                                        <div className="text-gray-700 print-text-black">Nama</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="font-semibold print-text-bold truncate">{safeText(patient?.nm_pasien)}</div>
                                                        <div className="text-gray-700 print-text-black">No. RM</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{safeText(patient?.no_rkm_medis)}</div>
                                                        <div className="text-gray-700 print-text-black">Tgl Lahir</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{formatShortDate(patient?.tgl_lahir)}</div>
                                                        <div className="text-gray-700 print-text-black">JK</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{patient?.jk === 'L' ? 'Laki-laki' : patient?.jk === 'P' ? 'Perempuan' : safeText(patient?.jk)}</div>
                                                        <div className="text-gray-700 print-text-black">Alamat</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="text-gray-900 dark:text-white break-words whitespace-normal print-text-black">
                                                            {patientFullAddress() || safeText(patient?.alamat)}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="rounded-lg border border-gray-300 px-2.5 py-1.5 print:border-gray-800 print:px-2 print:py-1">
                                                    <div className="text-[10px] font-bold tracking-wide mb-0.5 print-text-bold uppercase print:mb-1">IDENTITAS SUAMI</div>
                                                    <div className="grid grid-cols-[85px_3px_1fr] gap-x-1 gap-y-0.5">
                                                        <div className="text-gray-700 print-text-black">Nama</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{safeText(formData.nm_suami)}</div>
                                                        <div className="text-gray-700 print-text-black">No. KTP</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{safeText(formData.no_ktp_suami)}</div>
                                                        <div className="text-gray-700 print-text-black">Tgl Lahir</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{formatShortDate(formData.tgl_lahir)}</div>
                                                        <div className="text-gray-700 print-text-black">Umur</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{safeText(formData.umur)} Tahun</div>
                                                        <div className="text-gray-700 print-text-black">Status</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{safeText(formData.jk)}</div>
                                                        <div className="text-gray-700 print-text-black">Pekerjaan</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{safeText(formData.pekerjaan)}</div>
                                                        <div className="text-gray-700 print-text-black">Alamat</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{safeText(formData.alamat)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-2 text-xs leading-tight print:mt-1.5 print-text-black print:text-[10px]">
                                                Berdasarkan hasil pemeriksaan PP Test pada tanggal {formatShortDate(formData.tanggal_pp_test)}, hasilnya dinyatakan <span className="font-bold print-text-bold">{safeText(formData.hasil_pp_test).toUpperCase()}</span>.
                                            </div>

                                            <div className="mt-1.5 text-xs leading-tight print:mt-1 print-text-black">
                                                Demikian surat keterangan ini dibuat untuk dipergunakan seperlunya.
                                            </div>

                                            <div className="mt-3 grid grid-cols-2 gap-6 print:mt-0">
                                                <div className="w-[86mm] text-xs print:text-[10px]">
                                                    <div className="text-center">
                                                        <div className="print-text-black">Validasi Dokumen</div>
                                                        <div className="mt-1.5 w-24 h-24 print:w-24 print:h-24 bg-white flex items-center justify-center mx-auto">
                                                            {valQrDataUrl ? (
                                                                <img src={valQrDataUrl} alt="QR Validasi" className="w-full h-full object-contain" />
                                                            ) : (
                                                                <div className="text-xs text-gray-500 print-text-black">QR</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-[86mm] text-xs print:text-[10px]">
                                                    <div className="text-center">
                                                        <div className="print-text-black">{(setting?.kabupaten || 'Madiun')}, {formatShortDate(formData.tanggal)}</div>
                                                        <div className="print-text-black">Dokter Pemeriksa</div>
                                                        <div className="mt-1.5 w-24 h-24 print:w-24 print:h-24 bg-white flex items-center justify-center mx-auto">
                                                            {ttdQrDataUrl ? (
                                                                <img src={ttdQrDataUrl} alt="QR Code" className="w-full h-full object-contain" />
                                                            ) : (
                                                                <div className="text-xs text-gray-500 print:text-black">QR</div>
                                                            )}
                                                        </div>
                                                        <div className="mt-4 text-sm font-medium print-text-black">{safeText(dokter?.nm_dokter)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
