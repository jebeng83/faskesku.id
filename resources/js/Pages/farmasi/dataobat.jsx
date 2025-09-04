import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';
import axios from 'axios';

export default function DataObat({ dataBarang, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        kode_brng: '',
        nama_brng: '',
        kode_sat: '',
        kode_satbesar: '',
        letak_barang: '',
        dasar: '',
        h_beli: '',
        ralan: '',
        kelas1: '',
        kelas2: '',
        kelas3: '',
        utama: '',
        vip: '',
        vvip: '',
        beliluar: '',
        jualbebas: '',
        karyawan: '',
        stokminimal: '',
        kdjns: '',
        kapasitas: '',
        expire: '',
        status: '1',
        kode_industri: '',
        kode_kategori: '',
        kode_golongan: '',
        kemasan: '',
        bahan: '',
        officetarif: '',
        tipesarana: '',
        kode_ralan: '',
        bpjs: '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('data-barang.index'), { search }, {
            preserveState: true,
            replace: true,
        });
    };

    const openCreateModal = () => {
        setModalType('create');
        setSelectedItem(null);
        setFormData({
            kode_brng: '',
            nama_brng: '',
            kode_sat: '',
            kode_satbesar: '',
            letak_barang: '',
            dasar: '',
            h_beli: '',
            ralan: '',
            kelas1: '',
            kelas2: '',
            kelas3: '',
            utama: '',
            vip: '',
            vvip: '',
            beliluar: '',
            jualbebas: '',
            karyawan: '',
            stokminimal: '',
            kdjns: '',
            kapasitas: '',
            expire: '',
            status: '1',
            kode_industri: '',
            kode_kategori: '',
            kode_golongan: '',
            kemasan: '',
            bahan: '',
            officetarif: '',
            tipesarana: '',
            kode_ralan: '',
            bpjs: '',
        });
        setErrors({});
        setShowModal(true);
    };

    const openEditModal = async (item) => {
        setModalType('edit');
        setSelectedItem(item);
        setFormData({
            kode_brng: item.kode_brng,
            nama_brng: item.nama_brng,
            kode_sat: item.kode_sat,
            kode_satbesar: item.kode_satbesar || '',
            letak_barang: item.letak_barang || '',
            dasar: item.dasar || '',
            h_beli: item.h_beli || '',
            ralan: item.ralan || '',
            kelas1: item.kelas1 || '',
            kelas2: item.kelas2 || '',
            kelas3: item.kelas3 || '',
            utama: item.utama || '',
            vip: item.vip || '',
            vvip: item.vvip || '',
            beliluar: item.beliluar || '',
            jualbebas: item.jualbebas || '',
            karyawan: item.karyawan || '',
            stokminimal: item.stokminimal || '',
            kdjns: item.kdjns || '',
            kapasitas: item.kapasitas || '',
            expire: item.expire || '',
            status: item.status || '1',
            kode_industri: item.kode_industri || '',
            kode_kategori: item.kode_kategori || '',
            kode_golongan: item.kode_golongan || '',
            kemasan: item.kemasan || '',
            bahan: item.bahan || '',
            officetarif: item.officetarif || '',
            tipesarana: item.tipesarana || '',
            kode_ralan: item.kode_ralan || '',
            bpjs: item.bpjs || '',
        });
        setErrors({});
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        setErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            let response;
            if (modalType === 'create') {
                response = await axios.post(route('data-barang.store'), formData);
            } else {
                response = await axios.put(route('data-barang.update', selectedItem.kode_brng), formData);
            }

            if (response.data.success) {
                closeModal();
                router.reload();
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (item) => {
        if (confirm('Apakah Anda yakin ingin menghapus data obat ini?')) {
            try {
                await axios.delete(route('data-barang.destroy', item.kode_brng));
                router.reload();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const formatCurrency = (value) => {
        if (!value) return '-';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <AppLayout>
            <Head title="Data Obat" />

            <div className="space-y-6 -mt-6 -mx-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Data Obat
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Kelola data obat dan barang medis
                                </p>
                            </div>
                            <button
                                onClick={openCreateModal}
                                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm whitespace-nowrap transform hover:scale-105"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                </svg>
                                <span>Tambah Obat</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berdasarkan kode, nama obat, atau satuan..."
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Cari
                            </button>
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        router.get(route('data-barang.index'));
                                    }}
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Reset
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Kode
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Nama Obat
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Satuan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Harga Beli
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Harga Ralan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {dataBarang.data.map((item) => (
                                    <tr key={item.kode_brng} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {item.kode_brng}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {item.nama_brng}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {item.kode_sat}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {formatCurrency(item.h_beli)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {formatCurrency(item.ralan)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                item.status === '1' 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                            }`}>
                                                {item.status === '1' ? 'Aktif' : 'Non-Aktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item)}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {dataBarang.links && (
                        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Menampilkan {dataBarang.from} sampai {dataBarang.to} dari {dataBarang.total} data
                                </div>
                                <div className="flex space-x-2">
                                    {dataBarang.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => router.get(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-1 text-sm rounded-md ${
                                                link.active
                                                    ? 'bg-blue-500 text-white'
                                                    : link.url
                                                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                                            }`}
                                        >
                                            {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {modalType === 'create' ? 'Tambah Data Obat' : 'Edit Data Obat'}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Kode Barang */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Kode Barang *
                                        </label>
                                        <input
                                            type="text"
                                            name="kode_brng"
                                            value={formData.kode_brng}
                                            onChange={handleInputChange}
                                            disabled={modalType === 'edit'}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                errors.kode_brng ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        />
                                        {errors.kode_brng && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kode_brng[0]}</p>
                                        )}
                                    </div>

                                    {/* Nama Barang */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nama Barang *
                                        </label>
                                        <input
                                            type="text"
                                            name="nama_brng"
                                            value={formData.nama_brng}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                errors.nama_brng ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        />
                                        {errors.nama_brng && (
                                            <p className="mt-1 text-sm text-red-600">{errors.nama_brng[0]}</p>
                                        )}
                                    </div>

                                    {/* Kode Satuan */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Kode Satuan *
                                        </label>
                                        <input
                                            type="text"
                                            name="kode_sat"
                                            value={formData.kode_sat}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                errors.kode_sat ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        />
                                        {errors.kode_sat && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kode_sat[0]}</p>
                                        )}
                                    </div>

                                    {/* Harga Beli */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Harga Beli
                                        </label>
                                        <input
                                            type="number"
                                            name="h_beli"
                                            value={formData.h_beli}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                errors.h_beli ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        />
                                        {errors.h_beli && (
                                            <p className="mt-1 text-sm text-red-600">{errors.h_beli[0]}</p>
                                        )}
                                    </div>

                                    {/* Harga Ralan */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Harga Ralan
                                        </label>
                                        <input
                                            type="number"
                                            name="ralan"
                                            value={formData.ralan}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                errors.ralan ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        />
                                        {errors.ralan && (
                                            <p className="mt-1 text-sm text-red-600">{errors.ralan[0]}</p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="1">Aktif</option>
                                            <option value="0">Non-Aktif</option>
                                        </select>
                                    </div>

                                    {/* Letak Barang */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Letak Barang
                                        </label>
                                        <input
                                            type="text"
                                            name="letak_barang"
                                            value={formData.letak_barang}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>

                                    {/* Stok Minimal */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Stok Minimal
                                        </label>
                                        <input
                                            type="number"
                                            name="stokminimal"
                                            value={formData.stokminimal}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {loading ? 'Menyimpan...' : (modalType === 'create' ? 'Simpan' : 'Update')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
