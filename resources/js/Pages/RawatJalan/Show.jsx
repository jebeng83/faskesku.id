import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';

export default function Show({ rawatJalan }) {
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

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            // Use POST with method spoofing to avoid 405 errors
            router.post(route('rawat-jalan.destroy', rawatJalan.no_rawat), {
                _method: 'DELETE'
            }, {
                forceFormData: true,
                preserveScroll: true
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Detail Data Rawat Jalan" />

            <div className="space-y-6 -mt-6 -mx-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Detail Data Rawat Jalan
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Informasi lengkap registrasi rawat jalan pasien
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={route('rawat-jalan.index')}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                                    </svg>
                                    <span>Kembali</span>
                                </Link>
                                <Link
                                    href={route('rawat-jalan.edit', rawatJalan.no_rawat)}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                    </svg>
                                    <span>Edit</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Informasi Registrasi */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Informasi Registrasi
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">No. Rawat</span>
                                    <span className="text-gray-900 dark:text-white">{rawatJalan.no_rawat}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">No. Registrasi</span>
                                    <span className="text-gray-900 dark:text-white">{rawatJalan.no_reg || '-'}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Tanggal Registrasi</span>
                                    <span className="text-gray-900 dark:text-white">{formatDate(rawatJalan.tgl_registrasi)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Jam Registrasi</span>
                                    <span className="text-gray-900 dark:text-white">{formatTime(rawatJalan.jam_reg)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Kode Dokter</span>
                                    <span className="text-gray-900 dark:text-white">{rawatJalan.kd_dokter || '-'}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Kode Poli</span>
                                    <span className="text-gray-900 dark:text-white">{rawatJalan.kd_poli || '-'}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Status</span>
                                    <span>{getStatusBadge(rawatJalan.stts)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Status Bayar</span>
                                    <span>{getStatusBayarBadge(rawatJalan.status_bayar)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Biaya Registrasi</span>
                                    <span className="text-gray-900 dark:text-white">{formatCurrency(rawatJalan.biaya_reg)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Informasi Pasien */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Informasi Pasien
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">No. RM</span>
                                    <span className="text-gray-900 dark:text-white">{rawatJalan.patient?.no_rkm_medis || '-'}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Nama Pasien</span>
                                    <span className="text-gray-900 dark:text-white">{rawatJalan.patient?.nm_pasien || '-'}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">NIK</span>
                                    <span className="text-gray-900 dark:text-white">{rawatJalan.patient?.no_ktp || '-'}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Jenis Kelamin</span>
                                    <span className="text-gray-900 dark:text-white">
                                        {rawatJalan.patient?.jk === 'L' ? 'Laki-laki' : 'Perempuan'}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Umur</span>
                                    <span className="text-gray-900 dark:text-white">{rawatJalan.patient?.umur || '-'}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">No. Telepon</span>
                                    <span className="text-gray-900 dark:text-white">{rawatJalan.patient?.no_tlp || '-'}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Alamat</span>
                                    <span className="text-gray-900 dark:text-white">{rawatJalan.patient?.alamat || '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Informasi Tambahan */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg lg:col-span-2">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Informasi Tambahan
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Status Daftar</span>
                                        <span className="text-gray-900 dark:text-white">{rawatJalan.stts_daftar}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Status Lanjut</span>
                                        <span className="text-gray-900 dark:text-white">{rawatJalan.status_lanjut}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Status Poli</span>
                                        <span className="text-gray-900 dark:text-white">{rawatJalan.status_poli}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Kode Penjamin</span>
                                        <span className="text-gray-900 dark:text-white">{rawatJalan.kd_pj || '-'}</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Umur Daftar</span>
                                        <span className="text-gray-900 dark:text-white">{rawatJalan.umurdaftar || '-'}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Status Umur</span>
                                        <span className="text-gray-900 dark:text-white">{rawatJalan.sttsumur || '-'}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Keputusan</span>
                                        <span className="text-gray-900 dark:text-white">{rawatJalan.keputusan || '-'}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Penanggung Jawab</span>
                                        <span className="text-gray-900 dark:text-white">{rawatJalan.p_jawab || '-'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Alamat Penanggung Jawab */}
                            {rawatJalan.almt_pj && (
                                <div className="mt-6">
                                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Alamat Penanggung Jawab</span>
                                        <span className="text-gray-900 dark:text-white">{rawatJalan.almt_pj}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452a51.18 51.18 0 013.273 0z" clipRule="evenodd" />
                                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V8.25a3 3 0 00-3-3H5.25z" />
                                </svg>
                                Hapus Data
                            </button>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Terakhir diperbarui: {rawatJalan.updated_at ? new Date(rawatJalan.updated_at).toLocaleString('id-ID') : '-'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
