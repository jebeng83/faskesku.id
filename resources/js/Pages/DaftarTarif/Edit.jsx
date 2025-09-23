import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';

export default function Edit({ jnsPerawatan, polikliniks, penjaabs, kategoris }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        kd_jenis_prw: jnsPerawatan.kd_jenis_prw || '',
        nm_perawatan: jnsPerawatan.nm_perawatan || '',
        kd_kategori: jnsPerawatan.kd_kategori || '',
        material: jnsPerawatan.material || 0,
        bhp: jnsPerawatan.bhp || 0,
        tarif_tindakandr: jnsPerawatan.tarif_tindakandr || 0,
        tarif_tindakanpr: jnsPerawatan.tarif_tindakanpr || 0,
        kso: jnsPerawatan.kso || 0,
        menejemen: jnsPerawatan.menejemen || 0,
        kd_pj: jnsPerawatan.kd_pj || '',
        kd_poli: jnsPerawatan.kd_poli || '',
        status: jnsPerawatan.status || '1',
        show_total_dokter: jnsPerawatan.total_byrdr > 0,
        show_total_perawat: jnsPerawatan.total_byrpr > 0,
        show_total_dokter_perawat: jnsPerawatan.total_byrdrpr > 0
    });

    const [totals, setTotals] = useState({
        total_dokter: 0,
        total_perawat: 0,
        total_dokter_perawat: 0
    });

    // Hitung total otomatis
    useEffect(() => {
        const calculateTotal = () => {
            const material = parseFloat(data.material || 0);
            const bhp = parseFloat(data.bhp || 0);
            const tarif_tindakandr = parseFloat(data.tarif_tindakandr || 0);
            const tarif_tindakanpr = parseFloat(data.tarif_tindakanpr || 0);
            const kso = parseFloat(data.kso || 0);
            const menejemen = parseFloat(data.menejemen || 0);

            // Total Dokter = Material + BHP + Tarif Tindakan Dokter + KSO + Menejemen (tanpa tarif perawat)
            const totalDokter = material + bhp + tarif_tindakandr + kso + menejemen;
            
            // Total Perawat = Material + BHP + Tarif Tindakan Perawat + KSO + Menejemen (tanpa tarif dokter)
            const totalPerawat = material + bhp + tarif_tindakanpr + kso + menejemen;
            
            // Total Dokter + Perawat = Material + BHP + Tarif Tindakan Dokter + Tarif Tindakan Perawat + KSO + Menejemen
            const totalDokterPerawat = material + bhp + tarif_tindakandr + tarif_tindakanpr + kso + menejemen;

            setTotals({
                total_dokter: data.show_total_dokter ? totalDokter : 0,
                total_perawat: data.show_total_perawat ? totalPerawat : 0,
                total_dokter_perawat: data.show_total_dokter_perawat ? totalDokterPerawat : 0
            });
        };

        calculateTotal();
    }, [data.material, data.bhp, data.tarif_tindakandr, data.tarif_tindakanpr, data.kso, data.menejemen, data.show_total_dokter, data.show_total_perawat, data.show_total_dokter_perawat]);

    // Refresh CSRF token setiap 30 menit
    useEffect(() => {
        const refreshToken = () => {
            // Refresh CSRF token
            fetch('/sanctum/csrf-cookie', {
                method: 'GET',
                credentials: 'same-origin'
            }).then(() => {
                // Update axios header dengan token baru
                const token = document.head.querySelector('meta[name="csrf-token"]');
                if (token) {
                    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
                }
            });
        };

        // Refresh token setiap 30 menit (1800000 ms)
        const interval = setInterval(refreshToken, 1800000);
        
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('daftar-tarif.update', jnsPerawatan.kd_jenis_prw), {
            onError: (errors) => {
                // Jika ada error 419 (CSRF token mismatch)
                if (errors.message && (errors.message.includes('419') || errors.message.includes('PAGE EXPIRED'))) {
                    alert('Session telah berakhir. Halaman akan di-refresh untuk memperbarui token keamanan.');
                    window.location.reload();
                    return;
                }
                
                // Handle error lainnya
                console.error('Form submission error:', errors);
            },
            onSuccess: () => {
                // Refresh tab Rawat Jalan jika ada
                try {
                    // Cari tab dengan URL yang mengandung 'rawat-jalan'
                    if (window.opener) {
                        // Jika dibuka dari window lain, refresh parent window
                        window.opener.location.reload();
                    } else {
                        // Coba refresh tab lain yang mungkin terbuka
                        const tabs = window.parent.frames;
                        for (let i = 0; i < tabs.length; i++) {
                            try {
                                if (tabs[i].location.href.includes('rawat-jalan')) {
                                    tabs[i].location.reload();
                                }
                            } catch (e) {
                                // Ignore cross-origin errors
                            }
                        }
                    }
                } catch (e) {
                    console.log('Could not refresh other tabs:', e);
                }
                
                // Success akan di-handle oleh redirect dari controller
            }
        });
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value || 0);
    };

    return (
        <AppLayout>
            <Head title={`Edit Tarif - ${jnsPerawatan.nm_perawatan}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Edit Tarif Perawatan
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        {jnsPerawatan.nm_perawatan} - {jnsPerawatan.kd_jenis_prw}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={route('daftar-tarif.index')}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                                        </svg>
                                        Kembali
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Informasi Dasar */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Dasar
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Kode Jenis Perawatan
                                        </label>
                                        <input
                                            type="text"
                                            value={data.kd_jenis_prw}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nama Perawatan <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nm_perawatan}
                                            onChange={(e) => setData('nm_perawatan', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan nama perawatan"
                                            required
                                        />
                                        {errors.nm_perawatan && (
                                            <p className="mt-1 text-sm text-red-600">{errors.nm_perawatan}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Kategori <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.kd_kategori}
                                            onChange={(e) => setData('kd_kategori', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            required
                                        >
                                            <option value="">Pilih Kategori</option>
                                            {kategoris.map((kategori) => (
                                                <option key={kategori.kd_kategori} value={kategori.kd_kategori}>
                                                    {kategori.nm_kategori}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.kd_kategori && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kd_kategori}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Poliklinik <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.kd_poli}
                                            onChange={(e) => setData('kd_poli', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            required
                                        >
                                            <option value="">Pilih Poliklinik</option>
                                            {polikliniks.map((poli) => (
                                                <option key={poli.kd_poli} value={poli.kd_poli}>
                                                    {poli.nm_poli}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.kd_poli && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kd_poli}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Cara Bayar <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.kd_pj}
                                            onChange={(e) => setData('kd_pj', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            required
                                        >
                                            <option value="">Pilih Cara Bayar</option>
                                            {penjaabs.map((penjab) => (
                                                <option key={penjab.kd_pj} value={penjab.kd_pj}>
                                                    {penjab.png_jawab}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.kd_pj && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kd_pj}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="1">Aktif</option>
                                            <option value="0">Tidak Aktif</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Komponen Tarif */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Komponen Tarif
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Material <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.material}
                                            onChange={(e) => setData('material', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="0"
                                            required
                                        />
                                        {errors.material && (
                                            <p className="mt-1 text-sm text-red-600">{errors.material}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            BHP <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.bhp}
                                            onChange={(e) => setData('bhp', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="0"
                                            required
                                        />
                                        {errors.bhp && (
                                            <p className="mt-1 text-sm text-red-600">{errors.bhp}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tarif Tindakan Dokter <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.tarif_tindakandr}
                                            onChange={(e) => setData('tarif_tindakandr', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="0"
                                            required
                                        />
                                        {errors.tarif_tindakandr && (
                                            <p className="mt-1 text-sm text-red-600">{errors.tarif_tindakandr}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tarif Tindakan Perawat <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.tarif_tindakanpr}
                                            onChange={(e) => setData('tarif_tindakanpr', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="0"
                                            required
                                        />
                                        {errors.tarif_tindakanpr && (
                                            <p className="mt-1 text-sm text-red-600">{errors.tarif_tindakanpr}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            KSO <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.kso}
                                            onChange={(e) => setData('kso', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="0"
                                            required
                                        />
                                        {errors.kso && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kso}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Menejemen <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.menejemen}
                                            onChange={(e) => setData('menejemen', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="0"
                                            required
                                        />
                                        {errors.menejemen && (
                                            <p className="mt-1 text-sm text-red-600">{errors.menejemen}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Perhitungan Total Tarif */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    📊 Perhitungan Total Tarif
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Pilih total yang ingin ditampilkan
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Total Dokter */}
                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-green-200 dark:border-green-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-medium text-green-700 dark:text-green-300">
                                                🟢 Total Dokter
                                            </h4>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.show_total_dokter}
                                                    onChange={(e) => setData('show_total_dokter', e.target.checked)}
                                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Aktif</span>
                                            </label>
                                        </div>
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {formatCurrency(totals.total_dokter)}
                                        </div>
                                    </div>

                                    {/* Total Perawat */}
                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                                🔵 Total Perawat
                                            </h4>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.show_total_perawat}
                                                    onChange={(e) => setData('show_total_perawat', e.target.checked)}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Aktif</span>
                                            </label>
                                        </div>
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {formatCurrency(totals.total_perawat)}
                                        </div>
                                    </div>

                                    {/* Total Dokter + Perawat */}
                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                                🟣 Total Dokter + Perawat
                                            </h4>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.show_total_dokter_perawat}
                                                    onChange={(e) => setData('show_total_dokter_perawat', e.target.checked)}
                                                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Aktif</span>
                                            </label>
                                        </div>
                                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                            {formatCurrency(totals.total_dokter_perawat)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-end gap-4">
                                    <Link
                                        href={route('daftar-tarif.index')}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        {processing && (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        )}
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}