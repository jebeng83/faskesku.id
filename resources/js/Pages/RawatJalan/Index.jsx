import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';

export default function Index({ rawatJalan, statusOptions, statusBayarOptions, filters }) {
    const [searchParams, setSearchParams] = useState({
        tanggal: filters.tanggal || new Date().toISOString().slice(0,10),
        status: filters.status || '',
        status_bayar: filters.status_bayar || '',
        nama_pasien: filters.nama_pasien || ''
    });

    const handleFilterChange = (key, value) => {
        const newParams = { ...searchParams, [key]: value };
        setSearchParams(newParams);
        
        // Auto submit form when filter changes
        router.get(route('rawat-jalan.index'), newParams, {
            preserveState: true,
            replace: true
        });
    };

    const resetFilters = () => {
        setSearchParams({
            tanggal: '',
            status: '',
            status_bayar: '',
            nama_pasien: ''
        });
        router.get(route('rawat-jalan.index'));
    };

    const getStatusBadge = (status) => {
        const badgeClasses = {
            'Belum': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            'Sudah': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            'Batal': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
            'Berkas Diterima': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            'Dirujuk': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
            'Meninggal': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
            'Dirawat': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
            'Pulang Paksa': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
        };
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'}`}>
                {status}
            </span>
        );
    };

    const getStatusBayarBadge = (status) => {
        const badgeClasses = status === 'Sudah Bayar' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses}`}>
                {status}
            </span>
        );
    };

    const formatCurrency = (amount) => {
        if (!amount) return '-';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID');
    };

    const formatTime = (time) => {
        if (!time) return '-';
        return time.substring(0, 5);
    };

    return (
        <AppLayout>
            <Head title="Data Rawat Jalan" />

            <div className="space-y-6 -mt-6 -mx-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Data Rawat Jalan
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Kelola data registrasi rawat jalan pasien
                                </p>
                            </div>
                            <Link
                                href={route('rawat-jalan.create')}
                                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm whitespace-nowrap transform hover:scale-105"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                </svg>
                                <span>Tambah Data</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Filter Tanggal */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tanggal Registrasi
                                </label>
                                <input
                                    type="date"
                                    value={searchParams.tanggal}
                                    onChange={(e) => handleFilterChange('tanggal', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            {/* Filter Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={searchParams.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">Semua Status</option>
                                    {Object.entries(statusOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Filter Status Bayar */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status Bayar
                                </label>
                                <select
                                    value={searchParams.status_bayar}
                                    onChange={(e) => handleFilterChange('status_bayar', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">Semua Status Bayar</option>
                                    {Object.entries(statusBayarOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Filter Nama Pasien */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nama Pasien
                                </label>
                                <input
                                    type="text"
                                    value={searchParams.nama_pasien}
                                    onChange={(e) => handleFilterChange('nama_pasien', e.target.value)}
                                    placeholder="Cari nama pasien..."
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Reset Button */}
                        {(searchParams.tanggal || searchParams.status || searchParams.status_bayar || searchParams.nama_pasien) && (
                            <div className="mt-4">
                                <button
                                    onClick={resetFilters}
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. Rawat</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. RM</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Pasien</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Jam</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Dokter</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Penjamin</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {rawatJalan.data.map((item) => (
                                    <tr key={item.no_rawat} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {item.no_rawat}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {item.no_rkm_medis}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {item.patient?.nm_pasien ? (
                                                <Link
                                                    href={`/rawat-jalan/lanjutan?t=${btoa(JSON.stringify({ no_rawat: item.no_rawat, no_rkm_medis: item.no_rkm_medis || '' }))
                                                        .replace(/=+$/, '')
                                                        .replace(/\+/g, '-')
                                                        .replace(/\//g, '_')}`}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-2 hover:underline"
                                                    title="Lihat lanjutan pasien"
                                                >
                                                    {item.patient.nm_pasien}
                                                </Link>
                                            ) : (
                                                <span className="text-gray-900 dark:text-white">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDate(item.tgl_registrasi)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatTime(item.jam_reg)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.dokter?.nm_dokter || item.nm_dokter || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.nm_penjamin || item.penjab?.png_jawab || item.png_jawab || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {rawatJalan.links && (
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Menampilkan {rawatJalan.from} sampai {rawatJalan.to} dari {rawatJalan.total} data
                                </div>
                                <div className="flex gap-2">
                                    {rawatJalan.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 text-sm rounded-lg ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Empty State */}
                {rawatJalan.data.length === 0 && (
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-12 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-gray-400 mx-auto mb-4">
                                <path d="M13.5 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/>
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                Tidak ada data rawat jalan
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Belum ada data rawat jalan yang tersimpan.
                            </p>
                            <Link
                                href={route('rawat-jalan.create')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Tambah Data Rawat Jalan Pertama
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
