import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';

export default function Create({ polikliniks, penjaabs, kategoris }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        kd_jenis_prw: '',
        nm_perawatan: '',
        kd_kategori: '',
        kd_poli: '',
        kd_pj: '',
        status: '1',
        material: '0',
        bhp: '0',
        tarif_tindakandr: '0',
        tarif_tindakanpr: '0',
        kso: '0',
        menejemen: '0',
        show_total_dokter: true,
        show_total_perawat: true,
        show_total_dokter_perawat: true,
    });

    const [totals, setTotals] = useState({
        total_dokter: 0,
        total_perawat: 0,
        total_dokter_perawat: 0,
    });

    const [focusedField, setFocusedField] = useState(null);

    // Auto-generate kode when kategori changes
    const generateAutoCode = async (kdKategori) => {
        if (!kdKategori) return;
        
        try {
            const response = await fetch(route('daftar-tarif.generate-kode') + `?kd_kategori=${kdKategori}&category=rawat-jalan`);
            const result = await response.json();
            if (result.success) {
                setData('kd_jenis_prw', result.kode);
            }
        } catch (error) {
            console.error('Error generating code:', error);
        }
    };

    // Handle kategori change
    const handleKategoriChange = (value) => {
        setData('kd_kategori', value);
        generateAutoCode(value);
    };

    // Handle numeric input with proper zero handling
    const handleNumericInput = (field, value) => {
        // Allow empty string or valid numbers
        if (value === '' || (!isNaN(value) && value >= 0)) {
            setData(field, value);
        }
    };

    // Get display value for numeric inputs
    const getDisplayValue = (field) => {
        if (focusedField === field) {
            // When focused, show actual value (empty if 0)
            return data[field] === '0' ? '' : data[field];
        }
        // When not focused, show 0 if empty
        return data[field] || '0';
    };

    // Handle focus
    const onFocus = (field) => {
        setFocusedField(field);
    };

    // Handle blur
    const onBlur = (field) => {
        setFocusedField(null);
        // Set to '0' if empty
        if (!data[field] || data[field] === '') {
            setData(field, '0');
        }
    };

    // Calculate totals automatically
    useEffect(() => {
        const material = parseFloat(data.material) || 0;
        const bhp = parseFloat(data.bhp) || 0;
        const tarif_tindakandr = parseFloat(data.tarif_tindakandr) || 0;
        const tarif_tindakanpr = parseFloat(data.tarif_tindakanpr) || 0;
        const kso = parseFloat(data.kso) || 0;
        const menejemen = parseFloat(data.menejemen) || 0;

        const total_dokter = material + bhp + tarif_tindakandr + kso + menejemen;
        const total_perawat = material + bhp + tarif_tindakanpr + kso + menejemen;
        const total_dokter_perawat = material + bhp + tarif_tindakandr + tarif_tindakanpr + kso + menejemen;

        setTotals({
            total_dokter,
            total_perawat,
            total_dokter_perawat,
        });
    }, [data.material, data.bhp, data.tarif_tindakandr, data.tarif_tindakanpr, data.kso, data.menejemen]);

    // Refresh CSRF token every 30 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: [] });
        }, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('daftar-tarif.store'), {
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.csrf) {
                    router.reload();
                }
            },
        });
    };

    // Handle Enter key press to move to next input field
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            // Find all focusable elements in the form
            const form = e.target.closest('form');
            const focusableElements = form.querySelectorAll(
                'input[type="text"], input[type="number"], select, textarea, button[type="submit"]'
            );
            
            // Convert NodeList to Array
            const focusableArray = Array.from(focusableElements);
            
            // Find current element index
            const currentIndex = focusableArray.indexOf(e.target);
            
            // Move to next element, or submit if at the end
            if (currentIndex >= 0 && currentIndex < focusableArray.length - 1) {
                const nextElement = focusableArray[currentIndex + 1];
                nextElement.focus();
                
                // If next element is a select, open it
                if (nextElement.tagName === 'SELECT') {
                    nextElement.click();
                }
            } else if (currentIndex === focusableArray.length - 1) {
                // If we're at the last element (submit button), trigger form submission
                handleSubmit(e);
            }
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout
            title="Tambah Tarif"
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Tambah Tarif Perawatan
                </h2>
            )}
        >
            <Head title="Tambah Tarif" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Tambah Tarif Perawatan Baru
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Isi form di bawah untuk menambahkan tarif perawatan baru
                                    </p>
                                </div>
                                <Link
                                    href={route('daftar-tarif.index')}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Kembali
                                </Link>
                            </div>
                        </div>
                    </div>

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
                                            Kategori <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-2">
                                            <select
                                                value={data.kd_kategori}
                                                onChange={(e) => handleKategoriChange(e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                required
                                            >
                                                <option value="">Pilih Kategori</option>
                                                {kategoris.map((kategori) => (
                                                    <option key={kategori.kd_kategori} value={kategori.kd_kategori}>
                                                        {kategori.nm_kategori}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {errors.kd_kategori && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kd_kategori}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Kode Jenis Perawatan <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.kd_jenis_prw}
                                            onChange={(e) => setData('kd_jenis_prw', e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Masukkan kode jenis perawatan"
                                            required
                                        />
                                        {errors.kd_jenis_prw && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kd_jenis_prw}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nama Perawatan <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nm_perawatan}
                                            onChange={(e) => setData('nm_perawatan', e.target.value)}
                                            onKeyDown={handleKeyDown}
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
                                            Bagian RS <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={getDisplayValue('material')}
                                            onChange={(e) => handleNumericInput('material', e.target.value)}
                                            onFocus={() => onFocus('material')}
                                            onBlur={() => onBlur('material')}
                                            onKeyDown={handleKeyDown}
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
                                            type="text"
                                            value={getDisplayValue('bhp')}
                                            onChange={(e) => handleNumericInput('bhp', e.target.value)}
                                            onFocus={() => onFocus('bhp')}
                                            onBlur={() => onBlur('bhp')}
                                            onKeyDown={handleKeyDown}
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
                                            Jasa Dokter <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={getDisplayValue('tarif_tindakandr')}
                                            onChange={(e) => handleNumericInput('tarif_tindakandr', e.target.value)}
                                            onFocus={() => onFocus('tarif_tindakandr')}
                                            onBlur={() => onBlur('tarif_tindakandr')}
                                            onKeyDown={handleKeyDown}
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
                                            Jasa Perawat <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={getDisplayValue('tarif_tindakanpr')}
                                            onChange={(e) => handleNumericInput('tarif_tindakanpr', e.target.value)}
                                            onFocus={() => onFocus('tarif_tindakanpr')}
                                            onBlur={() => onBlur('tarif_tindakanpr')}
                                            onKeyDown={handleKeyDown}
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
                                            type="text"
                                            value={getDisplayValue('kso')}
                                            onChange={(e) => handleNumericInput('kso', e.target.value)}
                                            onFocus={() => onFocus('kso')}
                                            onBlur={() => onBlur('kso')}
                                            onKeyDown={handleKeyDown}
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
                                            type="text"
                                            value={getDisplayValue('menejemen')}
                                            onChange={(e) => handleNumericInput('menejemen', e.target.value)}
                                            onFocus={() => onFocus('menejemen')}
                                            onBlur={() => onBlur('menejemen')}
                                            onKeyDown={handleKeyDown}
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
                                        {processing ? 'Menyimpan...' : 'Simpan Tarif'}
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