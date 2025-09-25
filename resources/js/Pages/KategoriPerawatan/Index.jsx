import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';

// Modal Component for Add/Edit Kategori
const KategoriModal = ({ isOpen, onClose, editData = null }) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        kd_kategori: editData?.kd_kategori || '',
        nm_kategori: editData?.nm_kategori || ''
    });

    const isEditMode = !!editData;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEditMode) {
            put(route('kategori-perawatan.update', editData.kd_kategori), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
                onError: (errors) => {
                    console.error('Update errors:', errors);
                }
            });
        } else {
            post(route('kategori-perawatan.store'), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
                onError: (errors) => {
                    console.error('Store errors:', errors);
                }
            });
        }
    };

    const generateKode = async () => {
        try {
            const response = await fetch(route('kategori-perawatan.generate-kode'));
            const result = await response.json();
            if (result.kode) {
                setData('kd_kategori', result.kode);
            }
        } catch (error) {
            console.error('Error generating kode:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        {isEditMode ? 'Edit Kategori Perawatan' : 'Tambah Kategori Perawatan'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kode Kategori <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={data.kd_kategori}
                                onChange={(e) => setData('kd_kategori', e.target.value)}
                                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan kode kategori"
                                maxLength="5"
                                required
                                disabled={isEditMode}
                            />
                            {!isEditMode && (
                                <button
                                    type="button"
                                    onClick={generateKode}
                                    className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Auto
                                </button>
                            )}
                        </div>
                        {errors.kd_kategori && (
                            <p className="text-red-500 text-sm mt-1">{errors.kd_kategori}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Kategori <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.nm_kategori}
                            onChange={(e) => setData('nm_kategori', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan nama kategori"
                            maxLength="30"
                            required
                        />
                        {errors.nm_kategori && (
                            <p className="text-red-500 text-sm mt-1">{errors.nm_kategori}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                            disabled={processing}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                            disabled={processing}
                        >
                            {processing ? 'Menyimpan...' : (isEditMode ? 'Update' : 'Simpan')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function Index({ title, data, search, filters }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchTerm, setSearchTerm] = useState(search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('kategori-perawatan.index'), { search: searchTerm }, {
            preserveState: true,
            replace: true
        });
    };

    const handleEdit = (kategori) => {
        setEditData(kategori);
        setIsModalOpen(true);
    };

    const handleDelete = (kategori) => {
        if (confirm(`Apakah Anda yakin ingin menghapus kategori "${kategori.nm_kategori}"?`)) {
            router.delete(route('kategori-perawatan.destroy', kategori.kd_kategori), {
                onSuccess: () => {
                    // Success handled by Inertia
                },
                onError: (errors) => {
                    console.error('Delete errors:', errors);
                    alert('Gagal menghapus kategori. Mungkin kategori masih digunakan.');
                }
            });
        }
    };

    const openAddModal = () => {
        setEditData(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditData(null);
    };

    return (
        <AppLayout title={title}>
            <Head title={title} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Kategori Perawatan</h2>
                                    <p className="text-gray-600 mt-1">Kelola kategori perawatan rumah sakit</p>
                                </div>
                                <button
                                    onClick={openAddModal}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                                >
                                    <span>+</span>
                                    Tambah Kategori
                                </button>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <form onSubmit={handleSearch} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Cari kategori..."
                                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Cari
                                    </button>
                                    {search && (
                                        <Link
                                            href={route('kategori-perawatan.index')}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                                        >
                                            Reset
                                        </Link>
                                    )}
                                </form>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Kode Kategori
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Kategori
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {data.data && data.data.length > 0 ? (
                                            data.data.map((kategori, index) => (
                                                <tr key={kategori.kd_kategori} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {(data.current_page - 1) * data.per_page + index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {kategori.kd_kategori}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {kategori.nm_kategori}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleEdit(kategori)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(kategori)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                                    Tidak ada data kategori perawatan
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {data.data && data.data.length > 0 && (
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Menampilkan {data.from} sampai {data.to} dari {data.total} hasil
                                    </div>
                                    <div className="flex space-x-1">
                                        {data.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-3 py-2 text-sm rounded-md ${
                                                    link.active
                                                        ? 'bg-blue-500 text-white'
                                                        : link.url
                                                        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <KategoriModal
                isOpen={isModalOpen}
                onClose={closeModal}
                editData={editData}
            />
        </AppLayout>
    );
}