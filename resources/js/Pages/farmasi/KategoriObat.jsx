import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function KategoriObat({ kategoriObat = { data: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [showModal, setShowModal] = useState(false);
    const [editingKategori, setEditingKategori] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        nama_kategori: '',
        keterangan: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingKategori) {
            put(route('farmasi.kategori-obat.update', editingKategori.id), {
                onSuccess: () => {
                    setShowModal(false);
                    setEditingKategori(null);
                    reset();
                }
            });
        } else {
            post(route('farmasi.kategori-obat.store'), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    const handleEdit = (kategori) => {
        setEditingKategori(kategori);
        setData({
            nama_kategori: kategori.nama_kategori,
            keterangan: kategori.keterangan || '',
        });
        setShowModal(true);
    };

    const handleDelete = (kategori) => {
        if (confirm(`Apakah Anda yakin ingin menghapus kategori "${kategori.nama_kategori}"?`)) {
            destroy(route('farmasi.kategori-obat.destroy', kategori.id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('farmasi.kategori-obat.index'), { search }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Kategori Obat" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Kategori Obat
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Kelola kategori obat untuk klasifikasi dan organisasi data obat
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setEditingKategori(null);
                                    reset();
                                    setShowModal(true);
                                }}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Tambah Kategori
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari kategori obat..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Cari
                            </button>
                        </form>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        No
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Nama Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Keterangan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {kategoriObat.data.length > 0 ? (
                                    kategoriObat.data.map((kategori, index) => (
                                        <tr key={kategori.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {kategori.nama_kategori}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-500 dark:text-gray-300">
                                                    {kategori.keterangan || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(kategori)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(kategori)}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                            Tidak ada data kategori obat
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)}></div>

                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                                {editingKategori ? 'Edit Kategori Obat' : 'Tambah Kategori Obat'}
                                            </h3>
                                            <div className="mt-4 space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Nama Kategori
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.nama_kategori}
                                                        onChange={(e) => setData('nama_kategori', e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                                        required
                                                    />
                                                    {errors.nama_kategori && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.nama_kategori}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Keterangan
                                                    </label>
                                                    <textarea
                                                        value={data.keterangan}
                                                        onChange={(e) => setData('keterangan', e.target.value)}
                                                        rows={3}
                                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                                    />
                                                    {errors.keterangan && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.keterangan}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : (editingKategori ? 'Update' : 'Simpan')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-700"
                                    >
                                        Batal
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