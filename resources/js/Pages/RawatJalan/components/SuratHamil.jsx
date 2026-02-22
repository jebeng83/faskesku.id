import { useEffect, useMemo, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SidebarRalan from '@/Layouts/SidebarRalan';
import { todayDateString } from '@/tools/datetime';
import QRCode from 'qrcode';

export default function SuratHamil({ rawatJalan, patient, dokter, setting, suratHamilData, embedded = false, templateSelector, validationUrl }) {
    const [formData, setFormData] = useState({
        no_surat: suratHamilData?.no_surat || '',
        no_rawat: rawatJalan?.no_rawat || '',
        tanggalperiksa: suratHamilData?.tanggalperiksa || todayDateString(),
        hasilperiksa: suratHamilData?.hasilperiksa || 'ditemukan tanda-tanda kehamilan',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [hasSaved, setHasSaved] = useState(!!suratHamilData);
    const [submitError, setSubmitError] = useState('');
    const [ttdQrDataUrl, setTtdQrDataUrl] = useState('');
    const [valQrDataUrl, setValQrDataUrl] = useState('');
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

    useEffect(() => {
        if (!formData.tanggalperiksa) return;
        if (suratHamilData?.no_surat && suratHamilData.tanggalperiksa === formData.tanggalperiksa) {
            setFormData((prev) => ({ ...prev, no_surat: suratHamilData.no_surat }));
            return;
        }
        try {
            const d = new Date(formData.tanggalperiksa);
            if (Number.isNaN(d.getTime())) return;
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            const key = `suratSeq:SKHAMIL:${yyyy}`;
            let curr = 0;
            try {
                const raw = localStorage.getItem(key);
                curr = raw ? parseInt(raw, 10) || 0 : 0;
            } catch { }
            const next = curr + 1;
            try {
                localStorage.setItem(key, String(next));
            } catch { }
            const seq = String(next).padStart(5, '0');
            const nomor = `SKHAMIL${yyyy}${mm}${dd}${seq}`;
            setFormData((prev) => ({ ...prev, no_surat: nomor }));
        } catch { }
    }, [formData.tanggalperiksa, suratHamilData]);

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
            tanggalperiksa: formData.tanggalperiksa,
            hasilperiksa: formData.hasilperiksa,
        };

        router.post(route('rawat-jalan.surat-hamil.store'), payload, {
            onSuccess: () => {
                setHasSaved(true);
            },
            onError: (errors) => {
                const msg = firstErrorMessage(errors) || 'Tidak bisa menyimpan surat hamil.';
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
        `Pada: ${formatDate(formData.tanggalperiksa)}`,
    ].join('\n')), [setting?.nama_instansi, dokter?.nm_dokter, patient?.nm_pasien, formData.no_surat, formData.tanggalperiksa]);

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
    const Layout = embedded ? ({ children }) => <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">{children}</div> : SidebarRalan;

    return (
        <Layout>
            {!embedded && <Head title="Surat Keterangan Hamil" />}
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
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Surat Keterangan Hamil</h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">Cetak surat keterangan hamil untuk pasien</p>
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

                <div className="relative overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-700/60 bg-gradient-to-br from-pink-50/80 via-white/70 to-rose-50/80 dark:from-gray-900/70 dark:via-gray-900/60 dark:to-gray-800/70 p-4 lg:p-5 print:border-0 print:bg-transparent print:p-0 print:rounded-none">
                    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 print:block">
                        {!isPrintMode && (
                        <div className="lg:col-span-5 xl:col-span-4 print:hidden">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                {templateSelector && (
                                    <div className="px-4 pt-4">
                                        {templateSelector}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                    <div className="mb-3 p-2 bg-pink-50 dark:bg-pink-900/30 border border-pink-100 dark:border-pink-800 rounded-lg">
                                        <label className="block text-xs font-medium text-pink-700 dark:text-pink-300 mb-1">
                                            Jenis Surat
                                        </label>
                                        <select
                                            value="hamil"
                                            onChange={(e) => {
                                                if (!rawatJalan?.no_rawat) return;
                                                const value = e.target.value;
                                                if (value === "sehat") {
                                                    router.visit(route("rawat-jalan.surat-sehat", rawatJalan.no_rawat));
                                                }
                                                if (value === "sakit") {
                                                    router.visit(route("rawat-jalan.surat-sakit", rawatJalan.no_rawat));
                                                }
                                            }}
                                            className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        >
                                            <option value="sehat">Surat Keterangan Sehat</option>
                                            <option value="sakit">Surat Keterangan Sakit</option>
                                            <option value="hamil">Surat Keterangan Hamil</option>
                                        </select>
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
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Periksa</label>
                                            <input
                                                type="date"
                                                name="tanggalperiksa"
                                                value={formData.tanggalperiksa}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                                required
                                            />
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

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Hasil Pemeriksaan</label>
                                        <select
                                            name="hasilperiksa"
                                            value={formData.hasilperiksa}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                            required
                                        >
                                            <option value="ditemukan tanda-tanda kehamilan">Ditemukan tanda-tanda kehamilan</option>
                                            <option value="tidak ditemukan tanda-tanda kehamilan">Tidak ditemukan tanda-tanda kehamilan</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-end pt-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={handlePrint}
                                            disabled={!hasSaved}
                                            className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-semibold"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" />
                                            </svg>
                                            Cetak
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-semibold"
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
                                                    {suratHamilData || hasSaved ? 'Edit' : 'Simpan'}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        )}

                        <div className={`lg:col-span-7 xl:col-span-8 ${isPrintMode ? 'lg:col-span-12 flex justify-center' : ''}`}>
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
                                                <div className="text-sm font-bold tracking-wide underline">SURAT KETERANGAN HAMIL</div>
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
                                                    <div className="text-[10px] font-bold tracking-wide mb-0.5 print-text-bold uppercase print:mb-1">HASIL PEMERIKSAAN</div>
                                                    <div className="grid grid-cols-[85px_3px_1fr] gap-x-1 gap-y-0.5">
                                                        <div className="text-gray-700 print-text-black">Tanggal Periksa</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="print-text-black">{formatShortDate(formData.tanggalperiksa)}</div>
                                                        <div className="text-gray-700 print-text-black">Hasil Periksa</div>
                                                        <div className="text-gray-700 print-text-black">:</div>
                                                        <div className="font-semibold print-text-bold leading-none">{safeText(formData.hasilperiksa)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-2 text-xs leading-tight print:mt-1.5 print-text-black print:text-[10px]">
                                                Maka yang bersangkutan dinyatakan <span className="font-bold text-lg print-text-bold print:text-sm">{safeText(formData.hasilperiksa).toUpperCase()}</span>.
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
                                                        <div className="print-text-black">{(setting?.kabupaten || 'Madiun')}, {formatShortDate(formData.tanggalperiksa)}</div>
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
