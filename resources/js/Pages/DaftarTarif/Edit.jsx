import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Edit({ title, tarif, category, polikliniks = [], penjaabs = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        kd_jenis_prw: tarif.kd_jenis_prw || '',
        nm_perawatan: tarif.nm_perawatan || '',
        kd_kategori: tarif.kd_kategori || '',
        material: tarif.material || 0,
        bhp: tarif.bhp || 0,
        tarif_tindakandr: tarif.tarif_tindakandr || 0,
        tarif_tindakanpr: tarif.tarif_tindakanpr || 0,
        kso: tarif.kso || 0,
        menejemen: tarif.menejemen || 0,
        kd_pj: tarif.kd_pj || '',
        kd_poli: tarif.kd_poli || '',
        status: tarif.status || '1',
        category: category,
        total_dr: tarif.total_dr || 0,
        total_pr: tarif.total_pr || 0,
        total_drpr: tarif.total_drpr || 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('daftar-tarif.update', { daftar_tarif: tarif.kd_jenis_prw, category }), {
            onSuccess: () => {
                // Redirect back to index with success message
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
            }
        });
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value || 0);
    };

    const getCategoryTitle = () => {
        switch (category) {
            case 'rawat-jalan': return 'Rawat Jalan';
            case 'rawat-inap': return 'Rawat Inap';
            case 'laboratorium': return 'Laboratorium';
            case 'radiologi': return 'Radiologi';
            default: return 'Tarif';
        }
    };

    return (
        <AppLayout>
            <Head title={title} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Edit Tarif {getCategoryTitle()}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        Ubah data tarif tindakan
                                    </p>
                                </div>
                                <Link
                                    href={route('daftar-tarif.index', { category })}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Kembali
                                </Link>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Basic Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Informasi Dasar
                                        </h3>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Kode Jenis Perawatan
                                            </label>
                                            <input
                                                type="text"
                                                value={data.kd_jenis_prw}
                                                onChange={(e) => setData('kd_jenis_prw', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                            {errors.kd_jenis_prw && (
                                                <p className="text-red-500 text-sm mt-1">{errors.kd_jenis_prw}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Nama Perawatan
                                            </label>
                                            <input
                                                type="text"
                                                value={data.nm_perawatan}
                                                onChange={(e) => setData('nm_perawatan', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                            {errors.nm_perawatan && (
                                                <p className="text-red-500 text-sm mt-1">{errors.nm_perawatan}</p>
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
                                                <option value="0">Nonaktif</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Tarif Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Komponen Tarif
                                        </h3>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Material
                                            </label>
                                            <input
                                                type="number"
                                                value={data.material}
                                                onChange={(e) => setData('material', parseFloat(e.target.value) || 0)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                BHP
                                            </label>
                                            <input
                                                type="number"
                                                value={data.bhp}
                                                onChange={(e) => setData('bhp', parseFloat(e.target.value) || 0)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Tarif Tindakan Dokter
                                            </label>
                                            <input
                                                type="number"
                                                value={data.tarif_tindakandr}
                                                onChange={(e) => setData('tarif_tindakandr', parseFloat(e.target.value) || 0)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Tarif Tindakan Perawat
                                            </label>
                                            <input
                                                type="number"
                                                value={data.tarif_tindakanpr}
                                                onChange={(e) => setData('tarif_tindakanpr', parseFloat(e.target.value) || 0)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                KSO
                                            </label>
                                            <input
                                                type="number"
                                                value={data.kso}
                                                onChange={(e) => setData('kso', parseFloat(e.target.value) || 0)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Menejemen
                                            </label>
                                            <input
                                                type="number"
                                                value={data.menejemen}
                                                onChange={(e) => setData('menejemen', parseFloat(e.target.value) || 0)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Total Information */}
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Total Tarif
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Dokter</p>
                                            <p className="text-lg font-semibold text-blue-600">
                                                {formatCurrency(data.total_dr)}
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Perawat</p>
                                            <p className="text-lg font-semibold text-green-600">
                                                {formatCurrency(data.total_pr)}
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Dokter + Perawat</p>
                                            <p className="text-lg font-semibold text-purple-600">
                                                {formatCurrency(data.total_drpr)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end space-x-4">
                                    <Link
                                        href={route('daftar-tarif.index', { category })}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}