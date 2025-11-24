import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SidebarFarmasi from '@/Layouts/SidebarFarmasi';

export default function ResepObat() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [notif, setNotif] = useState(null);

    const [prescriptions, setPrescriptions] = useState([
        {
            id: 1,
            no_resep: 'RSP001',
            tanggal: '2024-01-15',
            pasien: 'Ahmad Rizki',
            dokter: 'Dr. Sarah',
            status: 'selesai',
            total: 150000,
            items: 3,
            tgl_penyerahan: '2024-01-15',
            jam_penyerahan: '10:20:00'
        },
        {
            id: 2,
            no_resep: 'RSP002',
            tanggal: '2024-01-15',
            pasien: 'Siti Nurhaliza',
            dokter: 'Dr. Ahmad',
            status: 'proses',
            total: 250000,
            items: 4,
            tgl_penyerahan: '',
            jam_penyerahan: '',
            _processing: false
        },
        {
            id: 3,
            no_resep: 'RSP003',
            tanggal: '2024-01-14',
            pasien: 'Budi Santoso',
            dokter: 'Dr. Maria',
            status: 'selesai',
            total: 180000,
            items: 2,
            tgl_penyerahan: '2024-01-14',
            jam_penyerahan: '14:05:00'
        },
        {
            id: 4,
            no_resep: 'RSP004',
            tanggal: '2024-01-14',
            pasien: 'Dewi Sartika',
            dokter: 'Dr. John',
            status: 'menunggu',
            total: 320000,
            items: 5,
            tgl_penyerahan: '',
            jam_penyerahan: '',
            _processing: false
        }
    ]);

    const filteredData = prescriptions.filter(item => {
        const matchesSearch = item.no_resep.toLowerCase().includes(search.toLowerCase()) ||
                            item.pasien.toLowerCase().includes(search.toLowerCase()) ||
                            item.dokter.toLowerCase().includes(search.toLowerCase());
        
        const matchesFilter = filter === 'all' || item.status === filter;
        
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'selesai':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'proses':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'menunggu':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'selesai':
                return 'Selesai';
            case 'proses':
                return 'Diproses';
            case 'menunggu':
                return 'Menunggu';
            default:
                return 'Tidak Diketahui';
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const handlePenyerahan = async (item) => {
        try {
            if (item._processing) return;
            // Jika sudah ada tgl/jam penyerahan, jangan proses lagi
            if (item.tgl_penyerahan && item.jam_penyerahan) {
                setNotif({ type: 'info', message: `Resep ${item.no_resep} sudah diserahkan pada ${item.tgl_penyerahan} ${item.jam_penyerahan}.` });
                return;
            }

            // Konfirmasi sederhana
            const ok = window.confirm(`Proses penyerahan obat untuk resep ${item.no_resep}? Stok akan dikurangi sesuai FIFO.`);
            if (!ok) return;

            // Set processing state
            setPrescriptions((prev) => prev.map((p) => p.id === item.id ? { ...p, _processing: true } : p));

            const url = route('api.resep.penyerahan', { no_resep: item.no_resep });
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(data?.message || `Gagal memproses penyerahan resep ${item.no_resep}`);
            }

            // Update status dan tgl/jam penyerahan di UI
            setPrescriptions((prev) => prev.map((p) => {
                if (p.id === item.id) {
                    return {
                        ...p,
                        status: 'selesai',
                        tgl_penyerahan: data?.tgl_penyerahan || new Date().toISOString().slice(0, 10),
                        jam_penyerahan: data?.jam_penyerahan || new Date().toTimeString().slice(0, 8),
                        _processing: false,
                    };
                }
                return p;
            }));

            setNotif({ type: 'success', message: data?.message || `Penyerahan obat berhasil untuk resep ${item.no_resep}` });
        } catch (e) {
            console.error(e);
            setPrescriptions((prev) => prev.map((p) => p.id === item.id ? { ...p, _processing: false } : p));
            setNotif({ type: 'error', message: e.message || 'Terjadi kesalahan saat penyerahan obat' });
        }
    };

    return (
        <SidebarFarmasi title="Farmasi">
            <Head title="Resep Obat" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Resep Obat
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Kelola resep obat dan pengeluaran farmasi
                                </p>
                            </div>
                            <button className="bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Buat Resep
                            </button>
                        </div>
                        {notif && (
                            <div className={`mt-4 px-4 py-2 rounded-md text-sm ${notif.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : notif.type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}
                                role="alert">
                                {notif.message}
                            </div>
                        )}
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Resep</p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">4</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Selesai</p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">2</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Diproses</p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">1</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Nilai</p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">Rp 900K</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berdasarkan no resep, pasien, atau dokter..."
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            >
                                <option value="all">Semua Status</option>
                                <option value="selesai">Selesai</option>
                                <option value="proses">Diproses</option>
                                <option value="menunggu">Menunggu</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        No Resep
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Pasien
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Dokter
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Item
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Penyerahan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {item.no_resep}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {new Date(item.tanggal).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {item.pasien}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {item.dokter}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                                {getStatusText(item.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {item.items} item
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {formatCurrency(item.total)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {item.tgl_penyerahan && item.jam_penyerahan ? (
                                                <div className="space-y-0.5">
                                                    <div className="text-xs">{item.tgl_penyerahan}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.jam_penyerahan}</div>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-500 dark:text-gray-400">Belum diserahkan</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                                    Detail
                                                </button>
                                                <button
                                                    className={`text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 ${item._processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    onClick={() => handlePenyerahan(item)}
                                                    disabled={item._processing || (item.tgl_penyerahan && item.jam_penyerahan)}
                                                    title={item.tgl_penyerahan ? 'Sudah diserahkan' : 'Penyerahan Obat'}
                                                >
                                                    {item._processing ? 'Memproses...' : 'Penyerahan Obat'}
                                                </button>
                                                <button className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300">
                                                    Print
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SidebarFarmasi>
    );
}
