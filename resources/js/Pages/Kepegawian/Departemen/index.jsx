import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Departemen({ auth, departemen, flash }) {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        dep_id: '',
        nama: '',
    });

    // Filter data berdasarkan search term
    const filteredData = departemen.filter(item =>
        item.dep_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editMode) {
            put(route('departemen.update', data.dep_id), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                    setEditMode(false);
                }
            });
        } else {
            post(route('departemen.store'), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    const handleEdit = (item) => {
        setData({
            dep_id: item.dep_id,
            nama: item.nama,
        });
        setEditMode(true);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            destroy(route('departemen.destroy', id));
        }
    };

    const openModal = () => {
        reset();
        setEditMode(false);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
        setEditMode(false);
    };

    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Data Departemen</h2>}
        >
            <Head title="Data Departemen" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Flash Messages */}
                            {flash?.success && (
                                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                    {flash.success}
                                </div>
                            )}
                            {flash?.error && (
                                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    {flash.error}
                                </div>
                            )}

                            {/* Header Actions */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Cari departemen..."
                                            value={searchTerm}
                                            onChange={handleSearch}
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={openModal}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Tambah Departemen
                                </button>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ID Departemen
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Departemen
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentData.length > 0 ? (
                                            currentData.map((item) => (
                                                <tr key={item.dep_id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {item.dep_id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.nama}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleEdit(item)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                <PencilIcon className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(item.dep_id)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                <TrashIcon className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                                    Tidak ada data departemen
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
                                    <div className="flex flex-1 justify-between sm:hidden">
                                        <button
                                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                                                <span className="font-medium">{Math.min(endIndex, filteredData.length)}</span> of{' '}
                                                <span className="font-medium">{filteredData.length}</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                                <button
                                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                                    disabled={currentPage === 1}
                                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                                >
                                                    Previous
                                                </button>
                                                {[...Array(totalPages)].map((_, index) => (
                                                    <button
                                                        key={index + 1}
                                                        onClick={() => setCurrentPage(index + 1)}
                                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                            currentPage === index + 1
                                                                ? 'z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                                        }`}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                                    disabled={currentPage === totalPages}
                                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                                >
                                                    Next
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                                {editMode ? 'Edit Departemen' : 'Tambah Departemen'}
                                            </h3>
                                            
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="dep_id" className="block text-sm font-medium text-gray-700">
                                                        ID Departemen
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="dep_id"
                                                        value={data.dep_id}
                                                        onChange={(e) => setData('dep_id', e.target.value)}
                                                        disabled={editMode}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                                                        required
                                                    />
                                                    {errors.dep_id && <p className="mt-1 text-sm text-red-600">{errors.dep_id}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                                                        Nama Departemen
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="nama"
                                                        value={data.nama}
                                                        onChange={(e) => setData('nama', e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        required
                                                    />
                                                    {errors.nama && <p className="mt-1 text-sm text-red-600">{errors.nama}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : (editMode ? 'Update' : 'Simpan')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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