import { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SidebarRalan from '@/Layouts/SidebarRalan';
import { todayDateString } from '@/tools/datetime';
import QRCode from 'qrcode';

<<<<<<< HEAD
export default function SuratSakit({ rawatJalan, patient, dokter, setting }) {
=======
export default function SuratSakit({ rawatJalan, patient, dokter, setting, suratSakitData, embedded = false, templateSelector, validationUrl }) {
>>>>>>> c30c174a (qrcode validasi surat)
    const { props } = usePage();
    const triggerPrint = !!props?.flash?.trigger_print;
    
    // Check for print mode from URL
    const [isPrintMode, setIsPrintMode] = useState(false);
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('mode') === 'print') {
            setIsPrintMode(true);
            setTimeout(() => {
                window.print();
            }, 800);
        }
    }, []);

    const [formData, setFormData] = useState({
        no_surat: '',
        no_rawat: rawatJalan?.no_rawat || '',
        tanggalawal: todayDateString(),
        tanggalakhir: '',
        lamasakit: '',
        nama2: '',
        tgl_lahir: patient?.tgl_lahir || '',
        umur: '',
        jk: patient?.jk || '',
        alamat: patient?.alamat || '',
        hubungan: 'Suami',
        pekerjaan: 'Karyawan Swasta',
        instansi: '',
        is_pihak_kedua: false,
        diagnosa: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [duplicateWarning, setDuplicateWarning] = useState('');
    const [duplicateExists, setDuplicateExists] = useState(false);
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [valQrDataUrl, setValQrDataUrl] = useState('');

    useEffect(() => {
        let active = true;

        if (!formData.tanggalawal) return;

        // Skip if editing existing data and date hasn't changed
        if (suratSakitData && suratSakitData.tanggalawal === formData.tanggalawal) {
            return;
        }

        const ac = new AbortController();
        const t = setTimeout(async () => {
            try {
                const url = route('rawat-jalan.surat-sakit.next-no-surat', {
                    tanggalawal: formData.tanggalawal,
                });
                const res = await fetch(url, {
                    method: 'GET',
                    headers: { Accept: 'application/json' },
                    credentials: 'include',
                    signal: ac.signal,
                });
                const json = await res.json().catch(() => null);
                if (!active) return;

                const nextNoSurat = (json?.no_surat ?? '').toString().trim();
                if (!nextNoSurat) return;

                setFormData((prev) => ({ ...prev, no_surat: nextNoSurat }));
            } catch {
                return;
            }
        }, 150);

        return () => {
            active = false;
            ac.abort();
            clearTimeout(t);
        };
    }, [formData.tanggalawal]);

    useEffect(() => {
        let active = true;
        setDuplicateExists(false);
        setDuplicateWarning('');

        if (!formData.no_rawat || !formData.tanggalawal) return;

<<<<<<< HEAD
=======
        // If editing existing data, skip duplicate check if no_surat matches
        if (suratSakitData && suratSakitData.no_surat === formData.no_surat) {
            return;
        }

>>>>>>> e5c6ba05 (surat sehat perbaikan tombol)
        const ac = new AbortController();
        const t = setTimeout(async () => {
            try {
                const url = route('rawat-jalan.surat-sakit.check-duplicate', {
                    no_rawat: formData.no_rawat,
                    tanggalawal: formData.tanggalawal,
                    no_surat: formData.no_surat,
                });
                const res = await fetch(url, {
                    method: 'GET',
                    headers: { Accept: 'application/json' },
                    credentials: 'include',
                    signal: ac.signal,
                });
                const json = await res.json().catch(() => null);
                if (!active) return;

                if (json?.exists) {
                    setDuplicateExists(true);
                    setDuplicateWarning(
                        (json?.message ?? '').toString() ||
                        'Tidak bisa simpan. Surat sakit sudah ada untuk No. Rawat dan tanggal yang sama.'
                    );
                } else {
                    setDuplicateExists(false);
                    setDuplicateWarning('');
                }
            } catch {
                return;
            }
        }, 250);

        return () => {
            active = false;
            ac.abort();
            clearTimeout(t);
        };
    }, [formData.no_rawat, formData.tanggalawal, formData.no_surat]);

    // Hitung otomatis lama sakit
    useEffect(() => {
        if (formData.tanggalawal && formData.tanggalakhir) {
            const start = new Date(formData.tanggalawal);
            const end = new Date(formData.tanggalakhir);

            // Set both to midnight for accurate day calculation
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);

            if (end >= start) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                setFormData(prev => ({
                    ...prev,
                    lamasakit: `${diffDays} hari`
                }));
            }
        }
    }, [formData.tanggalawal, formData.tanggalakhir]);

    useEffect(() => {
        const noRawat = rawatJalan?.no_rawat || formData.no_rawat;
        if (!noRawat) return;
        if ((formData.diagnosa || '').trim() !== '') return;

        let active = true;

        const loadDiagnosa = async () => {
            try {
                const params = new URLSearchParams({ no_rawat: noRawat });
                const res = await fetch(`/api/rawat-jalan/diagnosa?${params.toString()}`, {
                    method: 'GET',
                    credentials: 'same-origin',
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                });

                if (!res.ok) return;

                const json = await res.json();
                const items = Array.isArray(json?.data) ? json.data : [];
                const joined = Array.from(
                    new Set(
                        items
                            .map((it) => (it?.nama ?? '').toString().trim())
                            .filter(Boolean)
                    )
                ).join('; ');

                if (!active) return;
                if (!joined) return;

                setFormData((prev) => {
                    if ((prev.diagnosa || '').trim() !== '') return prev;
                    return { ...prev, diagnosa: joined };
                });
            } catch {
                return;
            }
        };

        loadDiagnosa();

        return () => {
            active = false;
        };
    }, [rawatJalan?.no_rawat, formData.no_rawat, formData.diagnosa]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSubmitError('');
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitError('');

        if (duplicateExists) {
            setSubmitError(duplicateWarning || 'Tidak bisa simpan. Surat sakit sudah ada untuk No. Rawat dan tanggal yang sama.');
            return;
        }

        setIsLoading(true);

        router.post(route('rawat-jalan.surat-sakit.store'), formData, {
            preserveScroll: true,
            preserveState: true,
            onError: (errors) => {
                const firstKey = errors ? Object.keys(errors)[0] : null;
                const firstValue = firstKey ? errors[firstKey] : null;
                const msg = Array.isArray(firstValue)
                    ? (firstValue[0] ?? '').toString()
                    : (firstValue ?? '').toString();

                setSubmitError(msg || 'Tidak bisa menyimpan surat sakit.');
                setIsLoading(false);
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        if (!triggerPrint) return;
        const t = setTimeout(() => {
            window.print();
        }, 150);
        return () => clearTimeout(t);
    }, [triggerPrint]);

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
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
        const normalize = (value) => (value ?? '').toString().trim();
        const kel = normalize(patient?.kelurahan?.nm_kel || patient?.kelurahanpj || patient?.kelurahan);
        const kec = normalize(patient?.kecamatan?.nm_kec || patient?.kecamatanpj || patient?.kecamatan);
        const kab = normalize(patient?.kabupaten?.nm_kab || patient?.kabupatenpj || patient?.kabupaten);

        const parts = [
            normalize(patient?.alamat),
            kel,
            kec,
            kab,
        ].filter(Boolean);
        return parts.join(', ');
    };

    const qrText = `FASKESKU|SURAT_SAKIT|${safeText(formData.no_surat)}|${safeText(formData.no_rawat)}|${safeText(formData.tanggalawal)}|${safeText(formData.tanggalakhir)}`;

    useEffect(() => {
        let active = true;
        QRCode.toDataURL(qrText, { width: 256, margin: 1, errorCorrectionLevel: 'M' })
            .then((url) => {
                if (active) setQrDataUrl(url);
            })
            .catch(() => {
                if (active) setQrDataUrl('');
            });

        return () => {
            active = false;
        };
    }, [qrText]);

    useEffect(() => {
        let active = true;
        const url = (validationUrl || '').toString();
        if (!url) {
            setValQrDataUrl('');
            return;
        }
        QRCode.toDataURL(url, { width: 256, margin: 1, errorCorrectionLevel: 'M' })
            .then((data) => { if (active) setValQrDataUrl(data); })
            .catch(() => { if (active) setValQrDataUrl(''); });
        return () => { active = false; };
    }, [validationUrl]);

    const backToRalanUrl = route('rawat-jalan.index');

    return (
        <SidebarRalan>
            <Head title="Surat Sakit" />
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
                    /* Hide all navigation elements */
                    nav, header, footer, .sidebar, [role="navigation"] {
                        display: none !important;
                    }
                    /* Ensure content takes full width */
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
                        width: 210mm;
                        min-height: 297mm;
                        margin: 0 auto;
                        padding: 12mm;
                        box-sizing: border-box;
                        background: #fff !important;
                    }

                    /* Print-specific text colors - HITAM PEKAT */
                    .print-text-black {
                        color: #000 !important;
                    }
                    .print-text-bold {
                        font-weight: 700 !important;
                        color: #000 !important;
                    }
                }
            `}</style>

            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg print:hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Surat Sakit
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Cetak surat keterangan sakit untuk pasien
                                </p>
                            </div>
                            <div className="flex gap-3">
<<<<<<< HEAD
                                <button
                                    onClick={handlePrint}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" />
                                    </svg>
                                    Cetak
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.get(backToRalanUrl)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Kembali Rawat Jalan
                                </button>
=======
                                {!embedded && (
                                    <button
                                        type="button"
                                        onClick={() => router.get(backToRalanUrl)}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Kembali Rawat Jalan
                                    </button>
                                )}
>>>>>>> e5c6ba05 (surat sehat perbaikan tombol)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-700/60 bg-gradient-to-br from-blue-50/80 via-white/70 to-indigo-50/80 dark:from-gray-900/70 dark:via-gray-900/60 dark:to-gray-800/70 p-4 lg:p-5 print:border-0 print:bg-transparent print:p-0 print:rounded-none">
                    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 print:block">
                        {!isPrintMode && (
                            <div className="lg:col-span-5 xl:col-span-4 print:hidden">
                                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl sm:rounded-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden">
                                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Input Data Surat Sakit
                                    </h3>
                                </div>

                                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                    {(submitError || duplicateWarning) && (
                                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                                            {submitError || duplicateWarning}
                                        </div>
                                    )}

                                    {/* Section: Identitas Surat */}
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-1">
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                                                Nomor Surat
                                            </label>
                                            <input
                                                type="text"
                                                name="no_surat"
                                                value={formData.no_surat}
                                                readOnly
                                                className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white text-sm font-mono"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Section: Data Pasien (Read Only) */}
                                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg space-y-3">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Informasi Pasien</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Nama Pasien</label>
                                                <input
                                                    type="text"
                                                    value={patient?.nm_pasien || ''}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white text-sm"
                                                    readOnly
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">No. Rekam Medis</label>
                                                <input
                                                    type="text"
                                                    value={patient?.no_rkm_medis || ''}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white text-sm"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section: Periode Istirahat */}
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg space-y-3">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Periode Istirahat</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Mulai Tanggal</label>
                                                <input
                                                    type="date"
                                                    name="tanggalawal"
                                                    value={formData.tanggalawal}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Sampai Tanggal</label>
                                                <input
                                                    type="date"
                                                    name="tanggalakhir"
                                                    value={formData.tanggalakhir}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1 md:col-span-2">
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Lama Istirahat (Hari)</label>
                                                <input
                                                    type="text"
                                                    name="lamasakit"
                                                    value={formData.lamasakit ? `${formData.lamasakit}` : ''}
                                                    readOnly
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white font-bold text-sm"
                                                    placeholder="Otomatis..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Diagnosa */}
                                    <div className="space-y-1">
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Diagnosa Pemeriksaan</label>
                                        <input
                                            type="text"
                                            name="diagnosa"
                                            value={formData.diagnosa}
                                            onChange={handleInputChange}
                                            placeholder="Contoh: Febris, Dyspepsia..."
                                            className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Section: Pihak Kedua */}
                                    <div className="space-y-4">
                                        <label className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-colors">
                                            <input
                                                type="checkbox"
                                                name="is_pihak_kedua"
                                                checked={formData.is_pihak_kedua}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-all"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Gunakan Pihak Kedua</span>
                                                <span className="text-[10px] text-gray-500">Aktifkan untuk Wali atau Keluarga Pasien</span>
                                            </div>
                                        </label>

                                        {formData.is_pihak_kedua && (
                                            <div className="bg-indigo-50/30 dark:bg-indigo-900/10 p-3 rounded-lg border border-indigo-100/50 dark:border-indigo-900/30 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-widest px-1">
                                                    Identitas Wali/Keluarga
                                                </h4>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div className="space-y-1 md:col-span-2">
                                                        <label className="block text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Nama Lengkap</label>
                                                        <input
                                                            type="text"
                                                            name="nama2"
                                                            value={formData.nama2}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-1.5 border border-indigo-200 dark:border-indigo-900/50 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
                                                            placeholder="Nama Wali"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="block text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Tgl Lahir</label>
                                                        <input
                                                            type="date"
                                                            name="tgl_lahir"
                                                            value={formData.tgl_lahir}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-1.5 border border-indigo-200 dark:border-indigo-900/50 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="block text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Umur</label>
                                                        <input
                                                            type="text"
                                                            name="umur"
                                                            value={formData.umur}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-1.5 border border-indigo-200 dark:border-indigo-900/50 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
                                                            placeholder="Contoh: 35 Thn"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="block text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Jenis Kelamin</label>
                                                        <select
                                                            name="jk"
                                                            value={formData.jk}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-1.5 border border-indigo-200 dark:border-indigo-900/50 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
                                                        >
                                                            <option value="L">Laki-laki</option>
                                                            <option value="P">Perempuan</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="block text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Hubungan</label>
                                                        <select
                                                            name="hubungan"
                                                            value={formData.hubungan}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-1.5 border border-indigo-200 dark:border-indigo-900/50 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
                                                        >
                                                            <option value="Suami">Suami</option>
                                                            <option value="Istri">Istri</option>
                                                            <option value="Anak">Anak</option>
                                                            <option value="Ayah">Ayah</option>
                                                            <option value="Saudara">Saudara</option>
                                                            <option value="Keponakan">Keponakan</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="block text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Pekerjaan</label>
                                                        <select
                                                            name="pekerjaan"
                                                            value={formData.pekerjaan}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-1.5 border border-indigo-200 dark:border-indigo-900/50 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
                                                        >
                                                            <option value="Karyawan Swasta">Karyawan Swasta</option>
                                                            <option value="PNS">PNS</option>
                                                            <option value="Wiraswasta">Wiraswasta</option>
                                                            <option value="Pelajar">Pelajar</option>
                                                            <option value="Mahasiswa">Mahasiswa</option>
                                                            <option value="Buruh">Buruh</option>
                                                            <option value="Lain-lain">Lain-lain</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1 md:col-span-2">
                                                        <label className="block text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Instansi</label>
                                                        <input
                                                            type="text"
                                                            name="instansi"
                                                            value={formData.instansi}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-1.5 border border-indigo-200 dark:border-indigo-900/50 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
                                                            placeholder="Nama Instansi/Perusahaan"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-1 md:col-span-2">
                                                        <label className="block text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Alamat Lengkap</label>
                                                        <textarea
                                                            name="alamat"
                                                            value={formData.alamat}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-1.5 border border-indigo-200 dark:border-indigo-900/50 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
                                                            placeholder="Tuliskan alamat lengkap wali..."
                                                            rows={2}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    <div className="flex justify-end pt-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={handlePrint}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-semibold"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" />
                                            </svg>
                                            Cetak
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading || duplicateExists || !formData.no_surat}
                                            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-semibold"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                                                    {suratSakitData ? 'Update & Cetak' : 'Simpan & Cetak'}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        )}

                        {/* Print Preview */}
                        <div className={`lg:col-span-7 xl:col-span-8 ${isPrintMode ? 'lg:col-span-12 flex justify-center' : ''}`}>
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg print:shadow-none lg:sticky lg:top-20">
                                <div className="p-4 sm:p-6 print:p-0">
                                    <div className="mx-auto w-full bg-white text-gray-900 rounded-xl border border-gray-200 shadow-sm print:shadow-none print:border-0 print:rounded-none print-container print:p-3">
                                        {/* Kop Surat */}
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

                                        {/* Judul Surat */}
                                        <div className="px-5 pt-3 pb-2 print:px-3 print:pt-1 print:pb-1">
                                            <div className="text-center">
                                                <div className="text-sm font-bold tracking-wide underline">SURAT KETERANGAN SAKIT</div>
                                                <div className="text-xs text-gray-700 mt-0.5 uppercase print:text-[10px] print:mt-1">Nomor: {safeText(formData.no_surat)}</div>
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
                                                        <div className="font-semibold print-text-bold truncate">{formData.is_pihak_kedua ? safeText(formData.nama2) : safeText(patient?.nm_pasien)}</div>
                                                        <div className="text-gray-700 print-text-black">Tgl Lahir</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{formData.is_pihak_kedua ? formatShortDate(formData.tgl_lahir) : formatShortDate(patient?.tgl_lahir)}</div>
                                                        <div className="text-gray-700 print-text-black">JK</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{formData.is_pihak_kedua ? (formData.jk === 'L' ? 'Laki-laki' : 'Perempuan') : (patient?.jk === 'L' ? 'Laki-laki' : 'Perempuan')}</div>
                                                        <div className="text-gray-700 print-text-black">Alamat</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black uppercase whitespace-normal break-words">{formData.is_pihak_kedua ? safeText(formData.alamat) : (patientFullAddress() || safeText(patient?.alamat))}</div>
                                                    </div>
                                                </div>

                                                <div className="rounded-lg border border-gray-300 px-2.5 py-1.5 print:border-gray-800 print:px-2 print:py-1">
                                                    <div className="text-[10px] font-bold tracking-wide mb-0.5 print-text-bold uppercase print:mb-1">DETIL KETERANGAN</div>
                                                    <div className="grid grid-cols-[85px_3px_1fr] gap-x-1 gap-y-0.5">
                                                        <div className="text-gray-700 print-text-black">Diagnosa</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="font-semibold print-text-bold leading-none">{safeText(formData.diagnosa)}</div>
                                                        {formData.is_pihak_kedua && (
                                                            <>
                                                                <div className="text-gray-700 print-text-black">Pekerjaan</div>
                                                                <div className="text-gray-700 print-text-black">:</div>
                                                                <div className="print-text-black">{safeText(formData.pekerjaan)}</div>
                                                                <div className="text-gray-700 print-text-black">Instansi</div>
                                                                <div className="text-gray-700 print-text-black">:</div>
                                                                <div className="print-text-black">{safeText(formData.instansi)}</div>
                                                            </>
                                                        )}
                                                        <div className="text-gray-700 print-text-black">Istirahat</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="font-semibold print-text-bold">{safeText(formData.lamasakit)} hari</div>
                                                        <div className="text-gray-700 print-text-black">Dari Tanggal</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{formatShortDate(formData.tanggalawal)}</div>
                                                        <div className="text-gray-700 print-text-black">S/D Tanggal</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{formatShortDate(formData.tanggalakhir)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-2 text-xs leading-tight print:mt-1.5 print-text-black print:text-[10px]">
                                                Berdasarkan hasil pemeriksaan kesehatan, yang bersangkutan dalam keadaan <span className="font-bold print-text-bold uppercase">Sakit</span> dan memerlukan istirahat selama <span className="font-bold print-text-bold">{formData.lamasakit || '...'}</span> hari terhitung sejak tanggal <span className="font-semibold print-text-bold">{formatDate(formData.tanggalawal)}</span> sampai dengan <span className="font-semibold print-text-bold">{formatDate(formData.tanggalakhir)}</span>.
                                            </div>

                                            <div className="mt-1.5 text-xs leading-tight print:mt-1 print:mb-2 print-text-black">
                                                Demikian surat keterangan ini dibuat untuk dipergunakan seperlunya.
                                            </div>

                                            <div className="mt-3 grid grid-cols-3 gap-6 items-start print:mt-0">
                                                {/* Validation Side */}
                                                <div className="w-[86mm] text-xs print:text-[10px]">
                                                    <div className="text-center">
                                                        <div className="print-text-black">Validasi Dokumen</div>
                                                        <div className="mt-1.5 w-24 h-24 print:w-20 print:h-20 bg-white flex items-center justify-center mx-auto">
                                                            {valQrDataUrl ? (
                                                                <img src={valQrDataUrl} alt="QR Validasi" className="w-full h-full object-contain" />
                                                            ) : (
                                                                <div className="text-xs text-gray-500 print-text-black">QR</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Consent Middle */}
                                                <div className="w-[86mm] text-xs print:text-[10px]">
                                                    <div className="text-center">
                                                        <div className="font-semibold print-text-black">Persetujuan Pasien</div>
                                                        <div className="mt-0.5 text-[10px] leading-snug print-text-black">
                                                            Saya menyetujui pemberian informasi diagnosa pada surat keterangan sakit ini.
                                                        </div>
                                                        <div className="mt-2 h-20 print:h-18 bg-white border border-gray-300 print:border-gray-800 rounded-md mx-auto"></div>
                                                        <div className="mt-2 text-[10px] print-text-black">
                                                            <div className="font-medium">{formData.is_pihak_kedua ? safeText(formData.nama2) : safeText(patient?.nm_pasien)}</div>
                                                            <div>Tanggal: {formatShortDate(formData.tanggalawal)}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Doctor Side */}
                                                <div className="w-[86mm] text-xs print:text-[10px]">
                                                    <div className="text-center">
                                                        <div className="print-text-black">{(setting?.kabupaten || 'Madiun')}, {formatShortDate(formData.tanggalawal)}</div>
                                                        <div className="print-text-black">Dokter Pemeriksa</div>
                                                        <div className="mt-1.5 w-24 h-24 print:w-20 print:h-20 bg-white flex items-center justify-center mx-auto">
                                                            {qrDataUrl ? (
                                                                <img src={qrDataUrl} alt="QR Code" className="w-full h-full object-contain" />
                                                            ) : (
                                                                <div className="text-xs text-gray-500 print-text-black">QR</div>
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
        </SidebarRalan>
    );
}
