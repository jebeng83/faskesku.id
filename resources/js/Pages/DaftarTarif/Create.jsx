import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Create({ title, category, polikliniks = [], penjaabs = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        kd_jenis_prw: '',
        nm_perawatan: '',
        kd_kategori: '',
        material: 0,
        bhp: 0,
        tarif_tindakandr: 0,
        tarif_tindakanpr: 0,
        kso: 0,
        menejemen: 0,
        kd_pj: '',
        kd_poli: '',
        status: '1',
        category: category,
        total_dr: 0,
        total_pr: 0,
        total_drpr: 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('daftar-tarif.store', { category }), {
            onSuccess: () => {
                // Redirect back to index with success message
            },
            onError: (errors) => {
                console.error('Create errors:', errors);
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

    // Calculate totals when tarif components change
    React.useEffect(() => {
        const material = parseFloat(data.material) || 0;
        const bhp = parseFloat(data.bhp) || 0;
        const tarif_tindakandr = parseFloat(data.tarif_tindakandr) || 0;
        const tarif_tindakanpr = parseFloat(data.tarif_tindakanpr) || 0;
        const kso = parseFloat(data.kso) || 0;
        const menejemen = parseFloat(data.menejemen) || 0;

        const total_dr = material + bhp + tarif_tindakandr + kso + menejemen;
        const total_pr = material + bhp + tarif_tindakanpr + kso + menejemen;
        const total_drpr = material + bhp + tarif_tindakandr + tarif_tindakanpr + kso + menejemen;

        setData(prev => ({
            ...prev,
            total_dr,
            total_pr,
            total_drpr
        }));
    }, [data.material, data.bhp, data.tarif_tindakandr, data.tarif_tindakanpr, data.kso, data.menejemen]);

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
                                        Tambah Tarif {getCategoryTitle()}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        Tambah data tarif tindakan baru
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
                                                Kode Jenis Perawatan *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.kd_jenis_prw}
                                                onChange={(e) => setData('kd_jenis_prw', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Masukkan kode jenis perawatan"
                                                required
                                            />
                                            {errors.kd_jenis_prw && (
                                                <p className="text-red-500 text-sm mt-1">{errors.kd_jenis_prw}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Nama Perawatan *
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

                                        {/* Optional fields for specific categories */}
                                        {polikliniks.length > 0 && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Poliklinik
                                                </label>
                                                <select
                                                    value={data.kd_poli}
                                                    onChange={(e) => setData('kd_poli', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                >
                                                    <option value="">Pilih Poliklinik</option>
                                                    {polikliniks.map((poli) => (
                                                        <option key={poli.kd_poli} value={poli.kd_poli}>
                                                            {poli.nm_poli}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        {penjaabs.length > 0 && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Penanggung Jawab
                                                </label>
                                                <select
                                                    value={data.kd_pj}
                                                    onChange={(e) => setData('kd_pj', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                >
                                                    <option value="">Pilih Penanggung Jawab</option>
                                                    {penjaabs.map((pj) => (
                                                        <option key={pj.kd_pj} value={pj.kd_pj}>
                                                            {pj.png_jawab}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
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
                                                placeholder="0"
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
                                                placeholder="0"
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
                                                placeholder="0"
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
                                                placeholder="0"
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
                                                placeholder="0"
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
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Total Information */}
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Total Tarif (Preview)
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
                                        {processing ? 'Menyimpan...' : 'Simpan Tarif'}
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