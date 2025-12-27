import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SidebarRalan from '@/Layouts/SidebarRalan';
import { todayDateString } from '@/tools/datetime';
import QRCode from 'qrcode';

export default function SuratSehat({ rawatJalan, patient, dokter, setting, suratSehatData }) {
    const [formData, setFormData] = useState({
        no_surat: suratSehatData?.no_surat || '',
        no_rawat: rawatJalan?.no_rawat || '',
        tanggalsurat: suratSehatData?.tanggalsurat || todayDateString(),
        berat: suratSehatData?.berat || '',
        tinggi: suratSehatData?.tinggi || '',
        tensi: suratSehatData?.tensi || '',
        suhu: suratSehatData?.suhu || '',
        butawarna: suratSehatData?.butawarna || 'Tidak',
        keperluan: suratSehatData?.keperluan || '',
        kesimpulan: suratSehatData?.kesimpulan || 'Sehat'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [duplicateWarning, setDuplicateWarning] = useState('');
    const [duplicateExists, setDuplicateExists] = useState(false);

    useEffect(() => {
        if (formData.no_surat) return;

        // Generate nomor surat otomatis
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

        setFormData(prev => ({
            ...prev,
            no_surat: `SS/${year}${month}${day}/${randomNum}`
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubmitError('');
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        let active = true;
        setDuplicateExists(false);
        setDuplicateWarning('');

        if (!formData.no_rawat || !formData.tanggalsurat) return;

        // Skip duplicate check if we are editing the same record properties
        if (suratSehatData &&
            formData.no_surat === suratSehatData.no_surat &&
            formData.tanggalsurat === suratSehatData.tanggalsurat) {
            return;
        }

        const ac = new AbortController();
        const t = setTimeout(async () => {
            try {
                const url = route('rawat-jalan.surat-sehat.check-duplicate', {
                    no_rawat: formData.no_rawat,
                    tanggalsurat: formData.tanggalsurat,
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
                    setDuplicateWarning(json?.message || 'Tidak bisa simpan. Data surat sehat sudah ada untuk No. RM dan tanggal yang sama.');
                } else {
                    setDuplicateExists(false);
                    setDuplicateWarning('');
                }
            } catch {
                if (!active) return;
                setDuplicateExists(false);
                setDuplicateWarning('');
            }
        }, 250);

        return () => {
            active = false;
            clearTimeout(t);
            try {
                ac.abort();
            } catch { }
        };
    }, [formData.no_rawat, formData.no_surat, formData.tanggalsurat, suratSehatData]);

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

        if (duplicateExists) {
            setSubmitError(duplicateWarning || 'Tidak bisa simpan. Data surat sehat sudah ada untuk No. RM dan tanggal yang sama.');
            return;
        }

        setIsLoading(true);

        router.post(route('rawat-jalan.surat-sehat.store'), formData, {
            onSuccess: () => {
                // Redirect back to rawat jalan index
                router.get(route('rawat-jalan.index'));
            },
            onError: (errors) => {
                const msg = firstErrorMessage(errors) || 'Tidak bisa menyimpan surat sehat.';
                setSubmitError(msg);
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

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateAge = (birthDate) => {
        if (!birthDate) return '';
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    const safeText = (value) => {
        const v = (value ?? '').toString().trim();
        return v === '' ? '-' : v;
    };

    const qrText = `FASKESKU|SURAT_SEHAT|${safeText(formData.no_surat)}|${safeText(formData.no_rawat)}|${safeText(formData.tanggalsurat)}`;

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

    const backToRalanUrl = route('rawat-jalan.index');

    return (
        <SidebarRalan>
            <Head title="Surat Sehat" />
            <style>{`
                @page { 
                    size: A5 landscape; 
                    margin: 0;
                }
                @media print {
                    body { 
                        -webkit-print-color-adjust: exact; 
                        print-color-adjust: exact; 
                    }
                    /* Hide all navigation elements */
                    nav, header, footer, .sidebar, [role="navigation"] {
                        display: none !important;
                    }
                    /* Hide AppLayout/SidebarRalan navigation */
                    body > div > div > nav,
                    body > div > div > aside,
                    body > div > div > header {
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
                    /* Format for A5 Landscape */
                    .print-container {
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        padding: 4mm; /* Minimal padding for A5 */
                        box-sizing: border-box;
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
                                    Surat Sehat
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Cetak surat keterangan sehat untuk pasien
                                </p>
                            </div>
                            <div className="flex gap-3">
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
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-700/60 bg-gradient-to-br from-blue-50/80 via-white/70 to-indigo-50/80 dark:from-gray-900/70 dark:via-gray-900/60 dark:to-gray-800/70 p-4 lg:p-5 print:border-0 print:bg-transparent print:p-0 print:rounded-none">
                    <div className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-30 bg-[repeating-linear-gradient(135deg,rgba(59,130,246,0.14)_0,rgba(59,130,246,0.14)_1px,transparent_1px,transparent_12px)] print:hidden" />
                    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 print:block">
                        {/* Form */}
                        <div className="lg:col-span-5 xl:col-span-4 print:hidden">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Nomor Surat */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Nomor Surat
                                            </label>
                                            <input
                                                type="text"
                                                name="no_surat"
                                                value={formData.no_surat}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                required
                                            />
                                        </div>

                                        {/* Tanggal Surat */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Tanggal Surat
                                            </label>
                                            <input
                                                type="date"
                                                name="tanggalsurat"
                                                value={formData.tanggalsurat}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {(duplicateWarning || submitError) && (
                                        <div className="rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/20 px-3 py-2 text-sm text-red-700 dark:text-red-200">
                                            {duplicateWarning || submitError}
                                        </div>
                                    )}

                                    {/* Data Pasien (Read Only) */}
                                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Data Pasien</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Nama Pasien
                                                </label>
                                                <input
                                                    type="text"
                                                    value={patient?.nm_pasien || ''}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white text-sm"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    No. RM
                                                </label>
                                                <input
                                                    type="text"
                                                    value={patient?.no_rkm_medis || ''}
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white text-sm"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pemeriksaan Fisik */}
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Pemeriksaan Fisik</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {/* Berat Badan */}
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Berat Badan (kg)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="berat"
                                                    value={formData.berat}
                                                    onChange={handleInputChange}
                                                    placeholder="Contoh: 65"
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                    required
                                                />
                                            </div>

                                            {/* Tinggi Badan */}
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Tinggi Badan (cm)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="tinggi"
                                                    value={formData.tinggi}
                                                    onChange={handleInputChange}
                                                    placeholder="Contoh: 170"
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                    required
                                                />
                                            </div>

                                            {/* Tekanan Darah */}
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Tekanan Darah
                                                </label>
                                                <input
                                                    type="text"
                                                    name="tensi"
                                                    value={formData.tensi}
                                                    onChange={handleInputChange}
                                                    placeholder="Contoh: 120/80"
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                    required
                                                />
                                            </div>

                                            {/* Suhu Tubuh */}
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Suhu Tubuh (°C)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="suhu"
                                                    value={formData.suhu}
                                                    onChange={handleInputChange}
                                                    placeholder="Contoh: 36.5"
                                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pemeriksaan Tambahan */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Buta Warna */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Buta Warna
                                            </label>
                                            <select
                                                name="butawarna"
                                                value={formData.butawarna}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                required
                                            >
                                                <option value="Tidak">Tidak</option>
                                                <option value="Ya">Ya</option>
                                            </select>
                                        </div>

                                        {/* Keperluan */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Keperluan
                                            </label>
                                            <input
                                                type="text"
                                                name="keperluan"
                                                value={formData.keperluan}
                                                onChange={handleInputChange}
                                                placeholder="Contoh: Melamar kerja, Sekolah, dll"
                                                className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Kesimpulan */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Kesimpulan
                                        </label>
                                        <select
                                            name="kesimpulan"
                                            value={formData.kesimpulan}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                            required
                                        >
                                            <option value="Sehat">Sehat</option>
                                            <option value="Tidak Sehat">Tidak Sehat</option>
                                        </select>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isLoading || duplicateExists}
                                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
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
                                                    {suratSehatData ? 'Ubah Surat Sehat' : 'Simpan Surat Sehat'}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Print Preview */}
                        <div className="lg:col-span-7 xl:col-span-8">
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
                                                <div className="text-sm font-bold tracking-wide underline">SURAT KETERANGAN SEHAT</div>
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
                                                        <div className="print-text-black">{patient?.tgl_lahir ? patient.tgl_lahir.split('-').reverse().join('-') : '-'}</div>
                                                        <div className="text-gray-700 print-text-black">JK</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{patient?.jk === 'L' ? 'Laki-laki' : patient?.jk === 'P' ? 'Perempuan' : safeText(patient?.jk)}</div>
                                                    </div>
                                                </div>

                                                <div className="rounded-lg border border-gray-300 px-2.5 py-1.5 print:border-gray-800 print:px-2 print:py-1">
                                                    <div className="text-[10px] font-bold tracking-wide mb-0.5 print-text-bold uppercase print:mb-1">HASIL PEMERIKSAAN</div>
                                                    <div className="grid grid-cols-[85px_3px_1fr] gap-x-1 gap-y-0.5">
                                                        <div className="text-gray-700 print-text-black">Berat Badan</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{safeText(formData.berat)} kg</div>
                                                        <div className="text-gray-700 print-text-black">Tinggi Badan</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{safeText(formData.tinggi)} cm</div>
                                                        <div className="text-gray-700 print-text-black">Tekanan Darah</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{safeText(formData.tensi)} mmHg</div>
                                                        <div className="text-gray-700 print-text-black">Suhu Tubuh</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{safeText(formData.suhu)} °C</div>
                                                        <div className="text-gray-700 print-text-black">Buta Warna</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{safeText(formData.butawarna)}</div>
                                                        <div className="text-gray-700 print-text-black">Keperluan</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="font-semibold print-text-bold leading-none">{safeText(formData.keperluan)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-2 text-xs leading-tight print:mt-1.5 print-text-black print:text-[10px]">
                                                Maka yang bersangkutan dinyatakan <span className="font-bold text-lg print-text-bold print:text-sm">{safeText(formData.kesimpulan).toUpperCase()}</span> dan dapat melakukan aktivitas normal.
                                            </div>

                                            <div className="mt-1.5 text-xs leading-tight print:mt-1 print-text-black">
                                                Demikian surat keterangan ini dibuat untuk dipergunakan seperlunya.
                                            </div>

                                            <div className="mt-3 flex justify-end print:mt-0">
                                                <div className="w-[86mm] text-center text-xs">
                                                    <div className="mb-1 font-medium print-text-black">{formatDate(formData.tanggalsurat)}</div>
                                                    <div className="mx-auto w-14 h-14 mb-1 print:w-12 print:h-12">
                                                        {qrDataUrl ? (
                                                            <img src={qrDataUrl} alt="QR Code" className="w-14 h-14 print:w-12 print:h-12" />
                                                        ) : (
                                                            <div className="w-14 h-14 border border-gray-300 print:w-12 print:h-12" />
                                                        )}
                                                    </div>
                                                    <div className="font-bold text-sm print-text-bold print:text-xs">{safeText(dokter?.nm_dokter)}</div>
                                                    <div className="font-medium print-text-black">Dokter</div>
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
