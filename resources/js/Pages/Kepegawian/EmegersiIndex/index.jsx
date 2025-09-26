import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function EmergencyIndex({ auth, emergencyIndexes, filters }) {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [loading, setLoading] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        kode_emergency: '',
        nama_emergency: '',
        indek: ''
    });

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        router.get(route('emergency-index.index'), { search: searchTerm }, {
            preserveState: true,
            onFinish: () => setLoading(false)
        });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editMode) {
            put(route('emergency-index.update', data.kode_emergency), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                    setEditMode(false);
                }
            });
        } else {
            post(route('emergency-index.store'), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    // Handle edit
    const handleEdit = (emergencyIndex) => {
        setData({
            kode_emergency: emergencyIndex.kode_emergency,
            nama_emergency: emergencyIndex.nama_emergency,
            indek: emergencyIndex.indek
        });
        setEditMode(true);
        setShowModal(true);
    };

    // Handle delete
    const handleDelete = (kode_emergency) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            router.delete(route('emergency-index.destroy', kode_emergency));
        }
    };

    // Handle modal close
    const handleCloseModal = () => {
        setShowModal(false);
        setEditMode(false);
        reset();
    };

    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Emergency Index</h2>}
        >
            <Head title="Emergency Index" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header with Add Button and Search */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                                    >
                                        <PlusIcon className="w-4 h-4 mr-2" />
                                        Tambah Emergency Index
                                    </button>
                                </div>
                                
                                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Cari emergency index..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        {loading ? 'Mencari...' : 'Cari'}
                                    </button>
                                </form>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Kode Emergency
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Emergency
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Indek
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {emergencyIndexes.data.length > 0 ? (
                                            emergencyIndexes.data.map((emergencyIndex) => (
                                                <tr key={emergencyIndex.kode_emergency} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {emergencyIndex.kode_emergency}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {emergencyIndex.nama_emergency}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {emergencyIndex.indek}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            onClick={() => handleEdit(emergencyIndex)}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                        >
                                                            <PencilIcon className="w-4 h-4 inline" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(emergencyIndex.kode_emergency)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            <TrashIcon className="w-4 h-4 inline" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                                    Tidak ada data emergency index
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {emergencyIndexes.links && (
                                <div className="mt-6 flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Menampilkan {emergencyIndexes.from} sampai {emergencyIndexes.to} dari {emergencyIndexes.total} hasil
                                    </div>
                                    <div className="flex space-x-1">
                                        {emergencyIndexes.links.map((link, index) => (
                                            <button
                                                key={index}
                                                onClick={() => link.url && router.get(link.url)}
                                                disabled={!link.url}
                                                className={`px-3 py-2 text-sm rounded ${
                                                    link.active
                                                        ? 'bg-blue-500 text-white'
                                                        : link.url
                                                        ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
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
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {editMode ? 'Edit Emergency Index' : 'Tambah Emergency Index'}
                            </h3>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Kode Emergency
                                    </label>
                                    <input
                                        type="text"
                                        value={data.kode_emergency}
                                        onChange={(e) => setData('kode_emergency', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        maxLength="3"
                                        required
                                    />
                                    {errors.kode_emergency && (
                                        <p className="text-red-500 text-xs italic mt-1">{errors.kode_emergency}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Nama Emergency
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nama_emergency}
                                        onChange={(e) => setData('nama_emergency', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        maxLength="100"
                                        required
                                    />
                                    {errors.nama_emergency && (
                                        <p className="text-red-500 text-xs italic mt-1">{errors.nama_emergency}</p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Indek
                                    </label>
                                    <input
                                        type="number"
                                        value={data.indek}
                                        onChange={(e) => setData('indek', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        min="0"
                                        required
                                    />
                                    {errors.indek && (
                                        <p className="text-red-500 text-xs italic mt-1">{errors.indek}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : (editMode ? 'Update' : 'Simpan')}
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