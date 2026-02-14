import React, { useMemo, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import LayoutUtama from '@/Pages/LayoutUtama';
import SidebarFarmasiMenu from '@/Components/SidebarFarmasiMenu';
import { MapPin, Save, Database, Warehouse, CheckCircle2, Globe, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Modal from '@/Components/Modal';

export default function SetLokasi({ current, bangsal, bangsal_ranap = [], poliklinik = [], ralan_mappings = [], ranap_mappings = [] }) {
    const { data, setData, post, put, processing, errors, recentlySuccessful } = useForm({
        kd_bangsal: current?.kd_bangsal || '',
        asal_stok: current?.asal_stok || 'Gunakan Stok Utama Obat'
    });

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [activeTab, setActiveTab] = useState('umum');
    const [ralanForm, setRalanForm] = useState({ kd_poli: '', kd_bangsal: '' });
    const [ranapForm, setRanapForm] = useState({ kd_bangsal: '', kd_depo: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (current) {
            put(route('farmasi.set-lokasi.update'));
        } else {
            post(route('farmasi.set-lokasi.store'));
        }
    };

    const openDeleteConfirm = () => {
        setConfirmOpen(true);
    };

    const requestDelete = async (url, payload = {}) => {
        const fd = new FormData();
        fd.append('_method', 'DELETE');
        Object.entries(payload).forEach(([k, v]) => {
            if (v !== undefined && v !== null) fd.append(k, String(v));
        });
        return axios.post(url, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    };

    const performDelete = async () => {
        if (deleting) return;
        setDeleting(true);
        try {
            await requestDelete(route('farmasi.set-lokasi.destroy'));
            window.location.reload();
        } catch (err) {
            setDeleting(false);
            alert(err?.response?.data?.message || 'Gagal menghapus pengaturan lokasi');
        }
    };

    const handleAddRalanMapping = async () => {
        if (!ralanForm.kd_poli || !ralanForm.kd_bangsal) return;
        const fd = new FormData();
        fd.append('kd_poli', ralanForm.kd_poli);
        fd.append('kd_bangsal', ralanForm.kd_bangsal);
        try {
            await axios.post(route('farmasi.set-lokasi.ralan-mapping.store'), fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            window.location.reload();
        } catch (_e) {}
    };

    const handleDeleteRalanMapping = async (row) => {
        try {
            await requestDelete(route('farmasi.set-lokasi.ralan-mapping.destroy'), { kd_poli: row.kd_poli, kd_bangsal: row.kd_bangsal });
            window.location.reload();
        } catch (err) {
            alert(err?.response?.data?.message || 'Gagal menghapus mapping ralan');
        }
    };

    const handleAddRanapMapping = async () => {
        if (!ranapForm.kd_bangsal || !ranapForm.kd_depo) return;
        const fd = new FormData();
        fd.append('kd_bangsal', ranapForm.kd_bangsal);
        fd.append('kd_depo', ranapForm.kd_depo);
        try {
            await axios.post(route('farmasi.set-lokasi.ranap-mapping.store'), fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            window.location.reload();
        } catch (_e) {}
    };

    const handleDeleteRanapMapping = async (row) => {
        try {
            await requestDelete(route('farmasi.set-lokasi.ranap-mapping.destroy'), { kd_bangsal: row.kd_bangsal, kd_depo: row.kd_depo });
            window.location.reload();
        } catch (err) {
            alert(err?.response?.data?.message || 'Gagal menghapus mapping ranap');
        }
    };

    const currentRow = useMemo(() => {
        if (!current) return null;
        const nmBangsal = bangsal.find(b => b.kd_bangsal === current.kd_bangsal)?.nm_bangsal || current.kd_bangsal;
        return {
            kd_bangsal: current.kd_bangsal,
            nm_bangsal: nmBangsal,
            asal_stok: current.asal_stok,
        };
    }, [current, bangsal]);

    return (
        <LayoutUtama title="Pengaturan Lokasi Farmasi" left={<SidebarFarmasiMenu title="Farmasi" />}>
            <Head title="Pengaturan Lokasi Farmasi" />

            <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/50 p-6 flex items-center justify-center" aria-busy={processing}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10"
                >
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-emerald-500/5 overflow-hidden border border-gray-100 dark:border-gray-800">
                        <div className="p-8 md:p-12">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-emerald-500 rounded-3xl shadow-lg shadow-emerald-500/20">
                                    <MapPin className="w-8 h-8 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Set Lokasi</h1>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 italic">Konfigurasi sumber stok obat untuk modul farmasi</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setActiveTab('umum')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'umum' ? 'bg-blue-500 text-white shadow' : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50'}`}>Umum</button>
                                    <button onClick={() => setActiveTab('ralan')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'ralan' ? 'bg-blue-500 text-white shadow' : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50'}`}>Ralan</button>
                                    <button onClick={() => setActiveTab('ranap')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'ranap' ? 'bg-blue-500 text-white shadow' : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50'}`}>Ranap</button>
                                </div>
                                {activeTab === 'umum' && (
                                    <div className="space-y-4">
                                        <h2 className="text-sm font-black uppercase tracking-wider text-gray-500">Daftar Pengaturan</h2>
                                        <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
                                            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                                                <thead className="bg-gray-50 dark:bg-gray-800">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left font-bold text-gray-600">Bangsal</th>
                                                        <th className="px-4 py-2 text-left font-bold text-gray-600">Kode</th>
                                                        <th className="px-4 py-2 text-left font-bold text-gray-600">Sumber Stok</th>
                                                        <th className="px-4 py-2 text-right font-bold text-gray-600">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                    {currentRow ? (
                                                        <tr>
                                                            <td className="px-4 py-3">{currentRow.nm_bangsal}</td>
                                                            <td className="px-4 py-3 text-gray-500">{currentRow.kd_bangsal}</td>
                                                            <td className="px-4 py-3">
                                                                <motion.span
                                                                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold ${
                                                                        currentRow.asal_stok === 'Gunakan Stok Utama Obat'
                                                                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 ring-1 ring-green-200 dark:ring-green-800'
                                                                            : 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-700 dark:text-yellow-300 ring-1 ring-yellow-200 dark:ring-yellow-800'
                                                                    }`}
                                                                    whileHover={{ scale: 1.02 }}
                                                                >
                                                                    {currentRow.asal_stok}
                                                                </motion.span>
                                                            </td>
                                                            <td className="px-4 py-3 text-right">
                                                                <button onClick={openDeleteConfirm} className="px-3 py-1.5 text-xs font-medium rounded-md bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">Hapus</button>
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        <tr>
                                                            <td className="px-4 py-6" colSpan={4}>
                                                                <motion.div
                                                                    className="flex flex-col items-center justify-center gap-2"
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                >
                                                                    <Globe className="w-12 h-12 text-gray-400" />
                                                                    <span className="text-sm text-gray-500">Belum ada pengaturan lokasi. Tetapkan di form di bawah.</span>
                                                                </motion.div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'ralan' && (
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/60 to-indigo-50/60 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-800/50 text-xs text-gray-700 dark:text-gray-300">Jika mapping kosong, pengambilan stok mengikuti pengaturan Umum.</div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2 md:col-span-1">
                                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Poliklinik</label>
                                                <select value={ralanForm.kd_poli} onChange={(e) => setRalanForm((p) => ({ ...p, kd_poli: e.target.value }))} className="w-full h-10 rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm px-3">
                                                    <option value="">-- Pilih Poli --</option>
                                                    {poliklinik.map((p) => (
                                                        <option key={p.kd_poli} value={p.kd_poli}>{p.nm_poli} ({p.kd_poli})</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2 md:col-span-1">
                                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Bangsal</label>
                                                <select value={ralanForm.kd_bangsal} onChange={(e) => setRalanForm((p) => ({ ...p, kd_bangsal: e.target.value }))} className="w-full h-10 rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm px-3">
                                                    <option value="">-- Pilih Bangsal --</option>
                                                    {bangsal.map((b) => (
                                                        <option key={b.kd_bangsal} value={b.kd_bangsal}>{b.nm_bangsal} ({b.kd_bangsal})</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex items-end md:col-span-1">
                                                <button type="button" onClick={handleAddRalanMapping} className="w-full h-10 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold rounded-md">
                                                    <Plus className="w-4 h-4" />
                                                    Tambah Mapping
                                                </button>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
                                            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                                                <thead className="bg-gray-50 dark:bg-gray-800">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left font-bold text-gray-600">Poliklinik</th>
                                                        <th className="px-4 py-2 text-left font-bold text-gray-600">Bangsal</th>
                                                        <th className="px-4 py-2 text-right font-bold text-gray-600">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                    {ralan_mappings.length > 0 ? ralan_mappings.map((r) => (
                                                        <tr key={`${r.kd_poli}-${r.kd_bangsal}`}>
                                                            <td className="px-4 py-3">{r.nm_poli} <span className="text-gray-400">({r.kd_poli})</span></td>
                                                            <td className="px-4 py-3">{r.nm_bangsal} <span className="text-gray-400">({r.kd_bangsal})</span></td>
                                                            <td className="px-4 py-3 text-right">
                                                                <button type="button" onClick={() => handleDeleteRalanMapping(r)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/90 dark:bg-gray-700/90 border border-gray-200/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-200">
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                    Hapus
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )) : (
                                                        <tr>
                                                            <td className="px-4 py-6" colSpan={3}>
                                                                <div className="flex items-center justify-center gap-2 text-gray-500"><Globe className="w-5 h-5" /> Belum ada mapping</div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'ranap' && (
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/60 to-indigo-50/60 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-800/50 text-xs text-gray-700 dark:text-gray-300">Jika mapping kosong, pengambilan stok mengikuti pengaturan Umum.</div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2 md:col-span-1">
                                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Bangsal Ranap</label>
                                                <select value={ranapForm.kd_bangsal} onChange={(e) => setRanapForm((p) => ({ ...p, kd_bangsal: e.target.value }))} className="w-full h-10 rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm px-3">
                                                    <option value="">-- Pilih Bangsal Ranap --</option>
                                                    {bangsal_ranap.map((b) => (
                                                        <option key={b.kd_bangsal} value={b.kd_bangsal}>{b.nm_bangsal} ({b.kd_bangsal})</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2 md:col-span-1">
                                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Depo Pengambilan</label>
                                                <select value={ranapForm.kd_depo} onChange={(e) => setRanapForm((p) => ({ ...p, kd_depo: e.target.value }))} className="w-full h-10 rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm px-3">
                                                    <option value="">-- Pilih Depo --</option>
                                                    {bangsal.map((b) => (
                                                        <option key={b.kd_bangsal} value={b.kd_bangsal}>{b.nm_bangsal} ({b.kd_bangsal})</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex items-end md:col-span-1">
                                                <button type="button" onClick={handleAddRanapMapping} className="w-full h-10 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold rounded-md">
                                                    <Plus className="w-4 h-4" />
                                                    Tambah Mapping
                                                </button>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
                                            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                                                <thead className="bg-gray-50 dark:bg-gray-800">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left font-bold text-gray-600">Bangsal Ranap</th>
                                                        <th className="px-4 py-2 text-left font-bold text-gray-600">Depo</th>
                                                        <th className="px-4 py-2 text-right font-bold text-gray-600">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                    {ranap_mappings.length > 0 ? ranap_mappings.map((r) => (
                                                        <tr key={`${r.kd_bangsal}-${r.kd_depo}`}>
                                                            <td className="px-4 py-3">{r.nm_bangsal} <span className="text-gray-400">({r.kd_bangsal})</span></td>
                                                            <td className="px-4 py-3">{r.nm_depo} <span className="text-gray-400">({r.kd_depo})</span></td>
                                                            <td className="px-4 py-3 text-right">
                                                                <button type="button" onClick={() => handleDeleteRanapMapping(r)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/90 dark:bg-gray-700/90 border border-gray-200/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-200">
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                    Hapus
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )) : (
                                                        <tr>
                                                            <td className="px-4 py-6" colSpan={3}>
                                                                <div className="flex items-center justify-center gap-2 text-gray-500"><Globe className="w-5 h-5" /> Belum ada mapping</div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {activeTab === 'umum' && (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Pilih Unit/Bangsal</label>
                                        <div className="relative">
                                            <select
                                                value={data.kd_bangsal}
                                                onChange={(e) => setData('kd_bangsal', e.target.value)}
                                                className="w-full h-12 pl-10 pr-3 rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors text-sm font-medium appearance-none cursor-pointer"
                                            >
                                                <option value="">-- Pilih Lokasi --</option>
                                                {bangsal.map((b) => (
                                                    <option key={b.kd_bangsal} value={b.kd_bangsal}>
                                                        {b.nm_bangsal} ({b.kd_bangsal})
                                                    </option>
                                                ))}
                                            </select>
                                            <Warehouse className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                        {errors.kd_bangsal && <p className="text-xs font-bold text-red-500 ml-1">{errors.kd_bangsal}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Sumber Pengambilan Stok</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <motion.button
                                                type="button"
                                                onClick={() => setData('asal_stok', 'Gunakan Stok Utama Obat')}
                                                className={`relative h-24 rounded-2xl p-4 text-left overflow-hidden ring-1 transition-colors ${
                                                    data.asal_stok === 'Gunakan Stok Utama Obat'
                                                        ? 'bg-gradient-to-r from-green-50/70 to-emerald-50/70 dark:from-green-900/20 dark:to-emerald-900/20 ring-green-200 dark:ring-green-800'
                                                        : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-gray-200 dark:ring-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Database className={`w-6 h-6 mb-2 ${data.asal_stok === 'Gunakan Stok Utama Obat' ? 'text-emerald-500' : 'text-gray-400'}`} />
                                                <span className={`block text-xs font-black uppercase tracking-wider ${data.asal_stok === 'Gunakan Stok Utama Obat' ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-600 dark:text-gray-300'}`}>Stok Utama</span>
                                                <p className="text-[10px] text-gray-400 mt-1 italic">Gunakan persediaan pusat (Gudang)</p>
                                                {data.asal_stok === 'Gunakan Stok Utama Obat' && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-emerald-500" />}
                                            </motion.button>

                                            <motion.button
                                                type="button"
                                                onClick={() => setData('asal_stok', 'Gunakan Stok Bangsal')}
                                                className={`relative h-24 rounded-2xl p-4 text-left overflow-hidden ring-1 transition-colors ${
                                                    data.asal_stok === 'Gunakan Stok Bangsal'
                                                        ? 'bg-gradient-to-r from-yellow-50/70 to-amber-50/70 dark:from-yellow-900/20 dark:to-amber-900/20 ring-amber-200 dark:ring-amber-800'
                                                        : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-gray-200 dark:ring-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Warehouse className={`w-6 h-6 mb-2 ${data.asal_stok === 'Gunakan Stok Bangsal' ? 'text-amber-500' : 'text-gray-400'}`} />
                                                <span className={`block text-xs font-black uppercase tracking-wider ${data.asal_stok === 'Gunakan Stok Bangsal' ? 'text-amber-700 dark:text-amber-300' : 'text-gray-600 dark:text-gray-300'}`}>Stok Bangsal</span>
                                                <p className="text-[10px] text-gray-400 mt-1 italic">Gunakan persediaan unit terpilih</p>
                                                {data.asal_stok === 'Gunakan Stok Bangsal' && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-amber-500" />}
                                            </motion.button>
                                        </div>
                                        {errors.asal_stok && <p className="text-xs font-bold text-red-500 ml-1">{errors.asal_stok}</p>}
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-col items-center">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold rounded-md mb-4 disabled:opacity-60"
                                    >
                                        <Save className={`w-4 h-4 ${processing ? 'animate-pulse' : ''}`} />
                                        <span>SIMPAN PERUBAHAN</span>
                                    </button>
                                    {current && (
                                        <button
                                            type="button"
                                            onClick={openDeleteConfirm}
                                            className="w-full h-10 inline-flex items-center justify-center gap-2 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-md"
                                        >
                                            HAPUS PENGATURAN
                                        </button>
                                    )}

                                    {recentlySuccessful && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="px-6 py-3 bg-emerald-50 text-emerald-600 text-xs font-black rounded-full shadow-sm flex items-center gap-2 italic uppercase"
                                            aria-live="polite"
                                        >
                                            <CheckCircle2 className="w-3 h-3" />
                                            Berhasil Diperbarui
                                        </motion.div>
                                    )}
                                </div>
                            </form>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
            <Modal show={confirmOpen} onClose={() => setConfirmOpen(false)} title="Hapus Pengaturan Lokasi" size="sm">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-red-50/50 to-rose-50/50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200/50 dark:border-red-800/50">
                        <div className="text-sm text-gray-700 dark:text-gray-300">Tindakan ini akan menghapus pengaturan lokasi aktif. Lanjutkan?</div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setConfirmOpen(false)} className="inline-flex items-center gap-1 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-3 py-1.5 rounded-md">Batal</button>
                        <button onClick={performDelete} disabled={deleting} className="inline-flex items-center gap-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-800/50 hover:bg-red-100 dark:hover:bg-red-900/50 font-medium text-sm px-4 py-2 rounded-md disabled:opacity-60">Hapus</button>
                    </div>
                </motion.div>
            </Modal>
        </LayoutUtama>
    );
}
