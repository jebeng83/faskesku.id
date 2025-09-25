import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';

export default function Edit({ title, kategori }) {
    const { data, setData, put, processing, errors } = useForm({
        kd_kategori: kategori.kd_kategori || '',
        nm_kategori: kategori.nm_kategori || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('kategori-perawatan.update', kategori.kd_kategori), {
            onSuccess: () => {
                // Success handled by Inertia
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
            }
        });
    };

    return (
        <AppLayout title={title}>
            <Head title={title} />
            
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Edit Kategori Perawatan</h2>
                                    <p className="text-gray-600 mt-1">Ubah informasi kategori perawatan</p>
                                </div>
                                <Link
                                    href={route('daftar-tarif.index')}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                                >
                                    ← Kembali
                                </Link>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kode Kategori <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.kd_kategori}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
                                        placeholder="Kode kategori"
                                        maxLength="5"
                                        disabled
                                        readOnly
                                    />
                                    <p className="text-gray-500 text-sm mt-1">Kode kategori tidak dapat diubah</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                    <p className="text-gray-500 text-sm mt-1">Maksimal 30 karakter</p>
                                </div>

                                <div className="flex justify-end space-x-2 pt-6 border-t">
                                    <Link
                                        href={route('daftar-tarif.index')}
                                        className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                                        disabled={processing}
                                    >
                                        {processing ? 'Menyimpan...' : 'Update Kategori'}
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