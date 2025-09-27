import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';

export default function Show({ tarif, category, title }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount || 0);
    };

    const getCategoryLabel = (cat) => {
        const categories = {
            'rawat-jalan': 'Rawat Jalan',
            'rawat-inap': 'Rawat Inap',
            'laboratorium': 'Laboratorium',
            'radiologi': 'Radiologi'
        };
        return categories[cat] || cat;
    };

    return (
        <AppLayout>
            <Head title={title} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Detail Tarif {getCategoryLabel(category)}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        {tarif.kd_jenis_prw} - {tarif.nm_perawatan}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={route('daftar-tarif.index', { category })}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Kembali
                                    </Link>
                                    <Link
                                        href={route('daftar-tarif.edit', { daftar_tarif: tarif.kd_jenis_prw, category })}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Dasar
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Kode Jenis Perawatan
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono">
                                            {tarif.kd_jenis_prw}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Nama Perawatan
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {tarif.nm_perawatan}
                                        </p>
                                    </div>
                                    {tarif.kd_kategori && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Kategori
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {tarif.kd_kategori}
                                            </p>
                                        </div>
                                    )}
                                    {tarif.poliklinik && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Poliklinik
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {tarif.poliklinik.nm_poli}
                                            </p>
                                        </div>
                                    )}
                                    {tarif.bangsal && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Bangsal
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {tarif.bangsal.nm_bangsal}
                                            </p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Status
                                        </label>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                                            tarif.status === '1' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {tarif.status === '1' ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tarif Information */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Komponen Tarif
                                </h3>
                                <div className="space-y-4">
                                    {(tarif.material !== undefined) && (
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Material
                                            </label>
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                                                {formatCurrency(tarif.material)}
                                            </p>
                                        </div>
                                    )}
                                    {(tarif.bhp !== undefined) && (
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                BHP
                                            </label>
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                                                {formatCurrency(tarif.bhp)}
                                            </p>
                                        </div>
                                    )}
                                    {(tarif.bagian_rs !== undefined) && (
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Bagian RS
                                            </label>
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                                                {formatCurrency(tarif.bagian_rs)}
                                            </p>
                                        </div>
                                    )}
                                    {(tarif.tarif_tindakandr !== undefined) && (
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Tarif Tindakan Dokter
                                            </label>
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                                                {formatCurrency(tarif.tarif_tindakandr)}
                                            </p>
                                        </div>
                                    )}
                                    {(tarif.tarif_tindakanpr !== undefined) && (
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Tarif Tindakan Perawat
                                            </label>
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                                                {formatCurrency(tarif.tarif_tindakanpr)}
                                            </p>
                                        </div>
                                    )}
                                    {(tarif.tarif_tindakan_dokter !== undefined) && (
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Tarif Tindakan Dokter
                                            </label>
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                                                {formatCurrency(tarif.tarif_tindakan_dokter)}
                                            </p>
                                        </div>
                                    )}
                                    {(tarif.tarif_tindakan_petugas !== undefined) && (
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Tarif Tindakan Petugas
                                            </label>
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                                                {formatCurrency(tarif.tarif_tindakan_petugas)}
                                            </p>
                                        </div>
                                    )}
                                    {(tarif.tarif_perujuk !== undefined) && (
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Tarif Perujuk
                                            </label>
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                                                {formatCurrency(tarif.tarif_perujuk)}
                                            </p>
                                        </div>
                                    )}
                                    {(tarif.kso !== undefined) && (
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                KSO
                                            </label>
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                                                {formatCurrency(tarif.kso)}
                                            </p>
                                        </div>
                                    )}
                                    {(tarif.menejemen !== undefined) && (
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Menejemen
                                            </label>
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                                                {formatCurrency(tarif.menejemen)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Total Tarif */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg lg:col-span-2">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Total Tarif
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {(tarif.total_byrdr !== undefined) && (
                                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                            <label className="block text-sm font-medium text-green-700 dark:text-green-400">
                                                Total Dokter
                                            </label>
                                            <p className="text-lg font-bold text-green-900 dark:text-green-300">
                                                {formatCurrency(tarif.total_byrdr)}
                                            </p>
                                        </div>
                                    )}
                                    {(tarif.total_byrpr !== undefined) && (
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                            <label className="block text-sm font-medium text-blue-700 dark:text-blue-400">
                                                Total Perawat
                                            </label>
                                            <p className="text-lg font-bold text-blue-900 dark:text-blue-300">
                                                {formatCurrency(tarif.total_byrpr)}
                                            </p>
                                        </div>
                                    )}
                                    {(tarif.total_byrdrpr !== undefined) && (
                                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                            <label className="block text-sm font-medium text-purple-700 dark:text-purple-400">
                                                Total Dokter + Perawat
                                            </label>
                                            <p className="text-lg font-bold text-purple-900 dark:text-purple-300">
                                                {formatCurrency(tarif.total_byrdrpr)}
                                            </p>
                                        </div>
                                    )}
                                    {(tarif.total_byr !== undefined) && (
                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                                Total Bayar
                                            </label>
                                            <p className="text-lg font-bold text-gray-900 dark:text-gray-300">
                                                {formatCurrency(tarif.total_byr)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}