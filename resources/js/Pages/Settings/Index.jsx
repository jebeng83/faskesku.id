import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';
import { toast } from '@/tools/toast';
import SettingModal from './SettingModal';

export default function Index({ settings, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create'); // create, edit, view
    const [selectedSetting, setSelectedSetting] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        console.debug('[Settings] handleSearch', { search, status: statusFilter });
        router.get(route('settings.index'), {
            search: search,
            status: statusFilter
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        console.debug('[Settings] handleStatusFilter', { search, status });
        router.get(route('settings.index'), {
            search: search,
            status: status
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleCreate = () => {
        console.debug('[Settings] handleCreate');
        setModalType('create');
        setSelectedSetting(null);
        setShowModal(true);
    };

    const handleEdit = (setting) => {
        console.debug('[Settings] handleEdit', setting);
        setModalType('edit');
        setSelectedSetting(setting);
        setShowModal(true);
    };

    const handleView = (setting) => {
        console.debug('[Settings] handleView', setting);
        setModalType('view');
        setSelectedSetting(setting);
        setShowModal(true);
    };

    const handleDelete = (setting) => {
        if (confirm('Apakah Anda yakin ingin menghapus setting ini?')) {
            const url = route('settings.destroy', { nama_instansi: setting.nama_instansi });
            console.debug('[Settings] handleDelete →', url, setting);
            router.post(url, {
                _method: 'DELETE'
            }, {
                preserveScroll: true,
                onSuccess: (page) => {
                    console.debug('[Settings] delete success', page);
                    toast('Setting berhasil dihapus', 'success');
                },
                onError: (errors) => {
                    console.error('[Settings] delete error', errors);
                    toast('Gagal menghapus setting', 'error');
                },
                onFinish: () => console.debug('[Settings] delete finished')
            });
        }
    };

    const handleActivate = (setting) => {
        if (confirm('Apakah Anda yakin ingin mengaktifkan setting ini?')) {
            const url = route('settings.activate', { setting: setting.nama_instansi });
            console.debug('[Settings] handleActivate →', url, setting);
            router.post(url, {}, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    console.debug('[Settings] activate success', page);
                    toast('Setting diaktifkan', 'success');
                },
                onError: (errors) => {
                    console.error('[Settings] activate error', errors);
                    toast('Gagal mengaktifkan setting', 'error');
                },
                onFinish: () => console.debug('[Settings] activate finished')
            });
        }
    };

    const handleModalClose = () => {
        console.debug('[Settings] handleModalClose');
        setShowModal(false);
        setSelectedSetting(null);
    };

    const handleModalSuccess = (response) => {
        console.debug('[Settings] handleModalSuccess payload:', response);
        setShowModal(false);
        setSelectedSetting(null);
        setIsLoading(true);
        router.reload({
            onSuccess: (page) => {
                console.debug('[Settings] reload after save → success', page);
                toast('Berhasil disimpan', 'success');
            },
            onError: (errors) => {
                console.error('[Settings] reload after save → error', errors);
                toast('Gagal reload data', 'error');
            },
            onFinish: () => {
                console.debug('[Settings] reload after save → finished');
                setIsLoading(false);
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Pengaturan Aplikasi" />

            <div className="space-y-6 -mt-6 -mx-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Pengaturan Aplikasi
                                </h2>
                            </div>
                            <button
                                onClick={handleCreate}
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm whitespace-nowrap transform hover:scale-105"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                </svg>
                                <span>Tambah Setting</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Settings Table */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Logo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Wallpaper
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Nama Instansi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Alamat
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Kontak
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
                                {settings.data.length > 0 ? (
                                    settings.data.map((setting) => (
                                        <tr key={setting.nama_instansi} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-center">
                                                    {setting.has_logo ? (
                                                        <img
                                                            src={route('settings.image', { setting: setting.nama_instansi, type: 'logo' })}
                                                            alt="Logo"
                                                            className="h-12 w-20 rounded-md object-cover border border-gray-200 dark:border-gray-700 shadow-sm"
                                                            onClick={() => window.open(route('settings.image', { setting: setting.nama_instansi, type: 'logo' }), '_blank')}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-400">
                                                                <path d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6ZM4 6V18H20V6H4ZM12 7.5C13.6569 7.5 15 8.84315 15 10.5C15 11.7668 14.2494 12.8599 13.1637 13.3787C14.9073 13.9387 16.2 15.5584 16.2 17.5H14.4C14.4 16.0801 13.2479 14.9 11.85 14.9H12.15C13.5479 14.9 14.7 16.0801 14.7 17.5H12.9C12.9 16.0801 11.7479 14.9 10.35 14.9H10.65C12.0479 14.9 13.2 16.0801 13.2 17.5H11.4C11.4 15.5584 12.6927 13.9387 14.4363 13.3787C13.3506 12.8599 12.6 11.7668 12.6 10.5C12.6 8.84315 13.9431 7.5 15.6 7.5H16.5V9.3H15.6C14.9373 9.3 14.4 9.83726 14.4 10.5C14.4 11.1627 14.9373 11.7 15.6 11.7H16.5V13.5H15.6C13.9431 13.5 12.6 12.1569 12.6 10.5C12.6 9.83726 13.1373 9.3 13.8 9.3H14.7V7.5H13.8C12.1431 7.5 10.8 8.84315 10.8 10.5C10.8 11.7668 11.5506 12.8599 12.6363 13.3787C10.8927 13.9387 9.6 15.5584 9.6 17.5H7.8C7.8 16.0801 8.95212 14.9 10.35 14.9H10.05C8.65212 14.9 7.5 16.0801 7.5 17.5H9.3C9.3 16.0801 10.4521 14.9 11.85 14.9H11.55C10.1521 14.9 9 16.0801 9 17.5H7.2C7.2 15.5584 8.49274 13.9387 10.2363 13.3787C9.15062 12.8599 8.4 11.7668 8.4 10.5C8.4 8.84315 9.74315 7.5 11.4 7.5H12.3V9.3H11.4C10.7373 9.3 10.2 9.83726 10.2 10.5C10.2 11.1627 10.7373 11.7 11.4 11.7H12.3V13.5H11.4C9.74315 13.5 8.4 12.1569 8.4 10.5C8.4 9.83726 8.93726 9.3 9.6 9.3H10.5V7.5H9.6C7.94315 7.5 6.6 8.84315 6.6 10.5C6.6 12.1569 7.94315 13.5 9.6 13.5H8.7V11.7H9.6C10.2627 11.7 10.8 11.1627 10.8 10.5C10.8 9.83726 10.2627 9.3 9.6 9.3H8.7V7.5H9.6C11.2569 7.5 12.6 8.84315 12.6 10.5C12.6 12.1569 11.2569 13.5 9.6 13.5H10.5V11.7H9.6C8.93726 11.7 8.4 11.1627 8.4 10.5C8.4 9.83726 8.93726 9.3 9.6 9.3H10.5V7.5H9.6Z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-center">
                                                    {setting.has_wallpaper ? (
                                                        <img
                                                            src={route('settings.image', { setting: setting.nama_instansi, type: 'wallpaper' })}
                                                            alt="Wallpaper"
                                                            className="h-12 w-20 rounded-md object-cover border border-gray-200 dark:border-gray-700 shadow-sm"
                                                            onClick={() => window.open(route('settings.image', { setting: setting.nama_instansi, type: 'wallpaper' }), '_blank')}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-20 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-400">
                                                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z"/>
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {setting.nama_instansi}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {setting.kabupaten}, {setting.propinsi}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 dark:text-white">
                                                    {setting.alamat_instansi || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-white">
                                                    {setting.kontak}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {setting.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    setting.aktifkan === 'Yes'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                }`}>
                                                    {setting.aktifkan === 'Yes' ? 'Aktif' : 'Tidak Aktif'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleView(setting)}
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        title="Lihat Detail"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(setting)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        title="Edit"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                                        </svg>
                                                    </button>
                                                    {setting.aktifkan === 'No' && (
                                                        <button
                                                            onClick={() => handleActivate(setting)}
                                                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                                            title="Aktifkan"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                                            </svg>
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(setting)}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        title="Hapus"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <div className="text-gray-500 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 mx-auto mb-4 text-gray-300">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                                </svg>
                                                <p className="text-lg font-medium mb-2">Tidak ada data setting</p>
                                                <p className="text-sm">Belum ada pengaturan yang dibuat. Klik tombol "Tambah Setting" untuk membuat pengaturan baru.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {settings.links && settings.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Menampilkan {settings.from} sampai {settings.to} dari {settings.total} hasil
                                </div>
                                <div className="flex space-x-1">
                                    {settings.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 text-sm rounded-md ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : link.url
                                                    ? 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                                                    : 'bg-gray-100 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal */}
                {showModal && (
                    <SettingModal
                        type={modalType}
                        setting={selectedSetting}
                        onClose={handleModalClose}
                        onSuccess={handleModalSuccess}
                        onError={(error) => {
                            toast('Gagal simpan pengaturan', 'error');
                            console.error('Error simpan pengaturan:', error);
                        }}
                    />
                )}
            </div>
        </AppLayout>
    );
}
