import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Pendidikan({ auth, pendidikan, flash, filters }) {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState(filters.search || '');
    const [perPage, setPerPage] = useState(filters.per_page || 10);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        tingkat: '',
        indek: '',
        gapok1: '',
        kenaikan: '',
        maksimal: '',
    });

    useEffect(() => {
        if (flash?.success) {
            setShowModal(false);
            setEditMode(false);
            setEditId(null);
            reset();
        }
    }, [flash]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('pendidikan.index'), {
            search: search,
            per_page: perPage,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editMode) {
            put(route('pendidikan.update', editId), {
                onSuccess: () => {
                    setShowModal(false);
                    setEditMode(false);
                    setEditId(null);
                    reset();
                }
            });
        } else {
            post(route('pendidikan.store'), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    const handleEdit = (item) => {
        setData({
            tingkat: item.tingkat,
            indek: item.indek.toString(),
            gapok1: item.gapok1.toString(),
            kenaikan: item.kenaikan.toString(),
            maksimal: item.maksimal.toString(),
        });
        setEditId(item.id);
        setEditMode(true);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data pendidikan ini?')) {
            router.delete(route('pendidikan.destroy', id));
        }
    };

    const openModal = () => {
        reset();
        setEditMode(false);
        setEditId(null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditMode(false);
        setEditId(null);
        reset();
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Data Pendidikan</h2>}
        >
            <Head title="Data Pendidikan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header with Add Button */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Daftar Pendidikan</h3>
                                <button
                                    onClick={openModal}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <PlusIcon className="w-4 h-4 mr-2" />
                                    Tambah Pendidikan
                                </button>
                            </div>

                            {/* Search and Filter */}
                            <div className="mb-6">
                                <form onSubmit={handleSearch} className="flex gap-4 items-end">
                                    <div className="flex-1">
                                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                                            Pencarian
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="search"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                placeholder="Cari tingkat pendidikan..."
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="per_page" className="block text-sm font-medium text-gray-700 mb-1">
                                            Per Halaman
                                        </label>
                                        <select
                                            id="per_page"
                                            value={perPage}
                                            onChange={(e) => setPerPage(e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Cari
                                    </button>
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
                                                Tingkat
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Indek
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Gaji Pokok
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Kenaikan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Maksimal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pendidikan.data.length > 0 ? (
                                            pendidikan.data.map((item, index) => (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {pendidikan.from + index}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.tingkat}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.indek}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatCurrency(item.gapok1)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatCurrency(item.kenaikan)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.maksimal}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleEdit(item)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                <PencilIcon className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(item.id)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                <TrashIcon className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                                                    Tidak ada data pendidikan
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {pendidikan.last_page > 1 && (
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="flex-1 flex justify-between sm:hidden">
                                        {pendidikan.prev_page_url && (
                                            <a
                                                href={pendidikan.prev_page_url}
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Previous
                                            </a>
                                        )}
                                        {pendidikan.next_page_url && (
                                            <a
                                                href={pendidikan.next_page_url}
                                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Next
                                            </a>
                                        )}
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{pendidikan.from}</span> to{' '}
                                                <span className="font-medium">{pendidikan.to}</span> of{' '}
                                                <span className="font-medium">{pendidikan.total}</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                {pendidikan.links.map((link, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => link.url && router.get(link.url)}
                                                        disabled={!link.url}
                                                        className={`relative inline-flex items-center px-2 py-2 border text-sm font-medium ${
                                                            link.active
                                                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                                : link.url
                                                                ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                                : 'bg-white border-gray-300 text-gray-300 cursor-not-allowed'
                                                        } ${
                                                            index === 0 ? 'rounded-l-md' : ''
                                                        } ${
                                                            index === pendidikan.links.length - 1 ? 'rounded-r-md' : ''
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ))}
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
                                                {editMode ? 'Edit Pendidikan' : 'Tambah Pendidikan'}
                                            </h3>
                                            <div className="mt-2">
                                                <div className="mb-4">
                                                    <label htmlFor="tingkat" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Tingkat Pendidikan <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="tingkat"
                                                        value={data.tingkat}
                                                        onChange={(e) => setData('tingkat', e.target.value)}
                                                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                                            errors.tingkat ? 'border-red-300' : 'border-gray-300'
                                                        }`}
                                                        placeholder="Masukkan tingkat pendidikan"
                                                        maxLength="80"
                                                    />
                                                    {errors.tingkat && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.tingkat}</p>
                                                    )}
                                                    <p className="mt-1 text-xs text-gray-500">Maksimal 80 karakter</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="indek" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Indek <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="indek"
                                                        value={data.indek}
                                                        onChange={(e) => setData('indek', e.target.value)}
                                                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                                            errors.indek ? 'border-red-300' : 'border-gray-300'
                                                        }`}
                                                        placeholder="Masukkan indek"
                                                        min="0"
                                                        max="9999"
                                                    />
                                                    {errors.indek && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.indek}</p>
                                                    )}
                                                    <p className="mt-1 text-xs text-gray-500">Nilai antara 0 - 9999</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="gapok1" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Gaji Pokok <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="gapok1"
                                                        value={data.gapok1}
                                                        onChange={(e) => setData('gapok1', e.target.value)}
                                                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                                            errors.gapok1 ? 'border-red-300' : 'border-gray-300'
                                                        }`}
                                                        placeholder="Masukkan gaji pokok"
                                                        min="0"
                                                        step="0.01"
                                                    />
                                                    {errors.gapok1 && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.gapok1}</p>
                                                    )}
                                                    <p className="mt-1 text-xs text-gray-500">Nilai minimal 0</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="kenaikan" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Kenaikan <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="kenaikan"
                                                        value={data.kenaikan}
                                                        onChange={(e) => setData('kenaikan', e.target.value)}
                                                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                                            errors.kenaikan ? 'border-red-300' : 'border-gray-300'
                                                        }`}
                                                        placeholder="Masukkan kenaikan"
                                                        min="0"
                                                        step="0.01"
                                                    />
                                                    {errors.kenaikan && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.kenaikan}</p>
                                                    )}
                                                    <p className="mt-1 text-xs text-gray-500">Nilai minimal 0</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="maksimal" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Maksimal <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="maksimal"
                                                        value={data.maksimal}
                                                        onChange={(e) => setData('maksimal', e.target.value)}
                                                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                                            errors.maksimal ? 'border-red-300' : 'border-gray-300'
                                                        }`}
                                                        placeholder="Masukkan maksimal"
                                                        min="0"
                                                        max="2147483647"
                                                    />
                                                    {errors.maksimal && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.maksimal}</p>
                                                    )}
                                                    <p className="mt-1 text-xs text-gray-500">Nilai antara 0 - 2147483647</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
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