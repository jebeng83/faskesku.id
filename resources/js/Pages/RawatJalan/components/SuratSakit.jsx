import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SidebarRalan from '@/Layouts/SidebarRalan';
import { todayDateString } from '@/tools/datetime';
import QRCode from 'qrcode';

export default function SuratSakit({ rawatJalan, patient, dokter, setting }) {
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
    const [qrDataUrl, setQrDataUrl] = useState('');

    useEffect(() => {
        // Generate nomor surat otomatis
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

        setFormData(prev => ({
            ...prev,
            no_surat: `SK/${year}${month}${day}/${randomNum}`
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.post(route('rawat-jalan.surat-sakit.store'), formData, {
            onSuccess: () => {
                // Redirect back to rawat jalan index
                router.get(route('rawat-jalan.index'));
            },
            onError: (errors) => {
                console.error('Error:', errors);
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

    const backToRalanUrl = route('rawat-jalan.index');

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

    return (
        <SidebarRalan>
            <Head title="Surat Sakit" />
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
                        padding: 8mm;
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
                                    Surat Sakit
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Cetak surat keterangan sakit untuk pasien
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
                                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Nomor Surat */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Nomor Surat
                                            </label>
                                            <input
                                                type="text"
                                                name="no_surat"
                                                value={formData.no_surat}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>

                                        {/* Tanggal Awal */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Tanggal Awal Sakit
                                            </label>
                                            <input
                                                type="date"
                                                name="tanggalawal"
                                                value={formData.tanggalawal}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>

                                        {/* Diagnosa */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Diagnosa
                                            </label>
                                            <input
                                                type="text"
                                                name="diagnosa"
                                                value={formData.diagnosa}
                                                onChange={handleInputChange}
                                                placeholder="Masukan diagnosa penyakit"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Data Pasien (Read Only) */}
                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Pasien</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Nama Pasien
                                                </label>
                                                <input
                                                    type="text"
                                                    value={patient?.nm_pasien || ''}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    No. RM
                                                </label>
                                                <input
                                                    type="text"
                                                    value={patient?.no_rkm_medis || ''}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Periode Sakit */}
                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Periode Sakit</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Tanggal Akhir */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Tanggal Akhir Sakit
                                                </label>
                                                <input
                                                    type="date"
                                                    name="tanggalakhir"
                                                    value={formData.tanggalakhir}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    required
                                                />
                                            </div>

                                            {/* Lama Sakit */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Lama Sakit
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lamasakit"
                                                    value={formData.lamasakit}
                                                    onChange={handleInputChange}
                                                    placeholder="Contoh: 3 hari"
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Checkbox Pihak Kedua */}
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="is_pihak_kedua"
                                                checked={formData.is_pihak_kedua}
                                                onChange={handleInputChange}
                                                className="form-checkbox h-5 w-5 text-blue-600 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Gunakan Data Pihak Kedua? (Keluarga/Wali)
                                            </span>
                                        </label>
                                    </div>

                                    {/* Data Pihak Kedua */}
                                    {formData.is_pihak_kedua && (
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Pihak Kedua</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Nama Pihak Kedua */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Nama Pihak Kedua
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="nama2"
                                                        value={formData.nama2}
                                                        onChange={handleInputChange}
                                                        placeholder="Nama lengkap pihak kedua"
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                        required
                                                    />
                                                </div>

                                                {/* Tanggal Lahir */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Tanggal Lahir
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="tgl_lahir"
                                                        value={formData.tgl_lahir}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                        required
                                                    />
                                                </div>

                                                {/* Umur */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Umur
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="umur"
                                                        value={formData.umur}
                                                        onChange={handleInputChange}
                                                        placeholder="Contoh: 25 tahun"
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                        required
                                                    />
                                                </div>

                                                {/* Jenis Kelamin */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Jenis Kelamin
                                                    </label>
                                                    <select
                                                        name="jk"
                                                        value={formData.jk}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                        required
                                                    >
                                                        <option value="Laki-laki">Laki-laki</option>
                                                        <option value="Perempuan">Perempuan</option>
                                                    </select>
                                                </div>

                                                {/* Alamat */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Alamat
                                                    </label>
                                                    <textarea
                                                        name="alamat"
                                                        value={formData.alamat}
                                                        onChange={handleInputChange}
                                                        rows={3}
                                                        placeholder="Alamat lengkap pihak kedua"
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                        required
                                                    />
                                                </div>

                                                {/* Hubungan */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Hubungan
                                                    </label>
                                                    <select
                                                        name="hubungan"
                                                        value={formData.hubungan}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                        required
                                                    >
                                                        <option value="Suami">Suami</option>
                                                        <option value="Istri">Istri</option>
                                                        <option value="Anak">Anak</option>
                                                        <option value="Ayah">Ayah</option>
                                                        <option value="Saudara">Saudara</option>
                                                        <option value="Keponakan">Keponakan</option>
                                                    </select>
                                                </div>

                                                {/* Pekerjaan */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Pekerjaan
                                                    </label>
                                                    <select
                                                        name="pekerjaan"
                                                        value={formData.pekerjaan}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                        required
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

                                                {/* Instansi */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Instansi
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="instansi"
                                                        value={formData.instansi}
                                                        onChange={handleInputChange}
                                                        placeholder="Nama instansi tempat bekerja"
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
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
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                    </svg>
                                                    Simpan Surat Sakit
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
                                    <div className="mx-auto w-full bg-white text-gray-900 shadow-sm print:shadow-none print:border-0 print:rounded-none print-container print:p-8">
                                        {/* Kop Surat */}
                                        <div className="flex items-center gap-4 pb-4 border-b-2 border-gray-900">
                                            {setting?.logo && (
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={`data:image/png;base64,${setting.logo}`}
                                                        alt="Logo"
                                                        className="w-20 h-20 object-contain"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <div className="text-xl font-bold uppercase tracking-wider">{setting?.nama_instansi || 'PRAKTEK DOKTER'}</div>
                                                <div className="text-sm text-gray-800 mt-1 space-y-0.5">
                                                    {setting?.alamat_instansi && <div>{setting.alamat_instansi}</div>}
                                                    {(setting?.kabupaten || setting?.propinsi) && (
                                                        <div>{[setting?.kabupaten, setting?.propinsi].filter(Boolean).join(', ')}</div>
                                                    )}
                                                    {(setting?.kontak || setting?.email) && (
                                                        <div className="flex flex-wrap gap-x-4">
                                                            {setting?.kontak && <span>WA : {setting.kontak}</span>}
                                                            {setting?.email && <span>e-mail: {setting.email}</span>}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Judul Surat */}
                                        <div className="mt-6 text-center">
                                            <h1 className="text-xl font-bold underline uppercase tracking-wide">SURAT KETERANGAN SAKIT</h1>
                                        </div>

                                        {/* Isi Surat */}
                                        <div className="mt-8 text-base leading-relaxed text-gray-900">
                                            <p className="mb-4">Yang bertanda tangan dibawah ini menerangkan bahwa:</p>

                                            <table className="w-full mb-6 text-base">
                                                <tbody>
                                                    <tr>
                                                        <td className="w-[160px] py-1 align-top print-text-black">Nama Pasien</td>
                                                        <td className="w-[10px] py-1 align-top">:</td>
                                                        <td className="py-1 align-top font-bold print-text-black">
                                                            {formData.is_pihak_kedua ? safeText(formData.nama2) : safeText(patient?.nm_pasien)}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-1 align-top print-text-black">Umur</td>
                                                        <td className="py-1 align-top">:</td>
                                                        <td className="py-1 align-top print-text-black">
                                                            {formData.is_pihak_kedua ? safeText(formData.umur) : calculateAge(patient?.tgl_lahir) + ' Tahun'}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-1 align-top print-text-black">Jenis Kelamin</td>
                                                        <td className="py-1 align-top">:</td>
                                                        <td className="py-1 align-top print-text-black">
                                                            {formData.is_pihak_kedua ? safeText(formData.jk) : (patient?.jk === 'L' ? 'Laki-laki' : 'Perempuan')}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-1 align-top print-text-black">Alamat</td>
                                                        <td className="py-1 align-top">:</td>
                                                        <td className="py-1 align-top print-text-black uppercase">
                                                            {formData.is_pihak_kedua ? safeText(formData.alamat) : safeText(patient?.alamat)}
                                                        </td>
                                                    </tr>
                                                    {formData.is_pihak_kedua && (
                                                        <>
                                                            <tr>
                                                                <td className="py-1 align-top print-text-black">Pekerjaan</td>
                                                                <td className="py-1 align-top">:</td>
                                                                <td className="py-1 align-top print-text-black">{safeText(formData.pekerjaan)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="py-1 align-top print-text-black">Instansi</td>
                                                                <td className="py-1 align-top">:</td>
                                                                <td className="py-1 align-top print-text-black">{safeText(formData.instansi)}</td>
                                                            </tr>
                                                        </>
                                                    )}
                                                    <tr>
                                                        <td className="py-1 align-top print-text-black">Diagnosa</td>
                                                        <td className="py-1 align-top">:</td>
                                                        <td className="py-1 align-top print-text-black">{safeText(formData.diagnosa)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <p className="textAlign-justify leading-relaxed print-text-black">
                                                Telah diperiksa kesehatan badannya dan sekarang dalam keadaan sakit dan perlu istirahat {formData.lamasakit || '...'} ({formData.lamasakit ? '...' : ''}) hari
                                                dari tanggal {formatDate(formData.tanggalawal)} sampai dengan {formatDate(formData.tanggalakhir)}.
                                            </p>
                                        </div>

                                        {/* Footer / Tanda Tangan */}
                                        <div className="mt-12 flex justify-between items-start text-sm">
                                            {/* Column 1: Consent */}
                                            <div className="w-[50%] text-center">
                                                <p className="leading-tight mb-20 print-text-black">
                                                    Saya memberi ijin kepada<br />
                                                    <span className="font-bold print-text-black uppercase">{setting?.nama_instansi || 'PRAKTEK DOKTER'}</span><br />
                                                    untuk memberikan keterangan<br />
                                                    diagnosa kepada pihak yang<br />
                                                    berkepentingan
                                                </p>
                                                <p className="font-medium mt-4 print-text-black text-center">
                                                    {formData.is_pihak_kedua ? safeText(formData.nama2) : safeText(patient?.nm_pasien)}
                                                </p>
                                            </div>

                                            <div className="w-[50%] flex justify-end">
                                                <div className="text-center">
                                                    <div className="print-text-black">{(setting?.kabupaten || 'Madiun')}, {formatShortDate(formData.tanggalawal)}</div>
                                                    <div className="print-text-black">Dokter Pemeriksa</div>
                                                    <div className="mt-2 w-32 h-32 bg-white flex items-center justify-center mx-auto">
                                                        {qrDataUrl ? (
                                                            <img src={qrDataUrl} alt="QR Code" className="w-full h-full object-contain" />
                                                        ) : (
                                                            <div className="text-xs text-gray-500 print-text-black">QR</div>
                                                        )}
                                                    </div>
                                                    <div className="mt-4 text-base font-medium print-text-black">{safeText(dokter?.nm_dokter)}</div>
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
