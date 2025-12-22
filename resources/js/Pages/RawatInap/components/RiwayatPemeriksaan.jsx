import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchableSelect from '@/Components/SearchableSelect.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDownIcon,
    CalendarIcon,
    ClockIcon,
    ClipboardDocumentListIcon,
    BeakerIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function RiwayatPemeriksaan({ token = '', noRawat = '', noRkmMedis = '' }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [obatRows, setObatRows] = useState([]);
    const [labRows, setLabRows] = useState([]);
    const [radRows, setRadRows] = useState([]);
    const [loadingObat, setLoadingObat] = useState(false);
    const [loadingLab, setLoadingLab] = useState(false);
    const [loadingRad, setLoadingRad] = useState(false);
    const [editing, setEditing] = useState(null);
    const [editForm, setEditForm] = useState({
        suhu_tubuh: '',
        tensi: '',
        nadi: '',
        respirasi: '',
        tinggi: '',
        berat: '',
        spo2: '',
        gcs: '',
        kesadaran: '',
        keluhan: '',
        pemeriksaan: '',
        alergi: '',
        penilaian: '',
        rtl: '',
        instruksi: '',
        evaluasi: '',
        nip: '',
    });
    const [expandedSections, setExpandedSections] = useState({
        pemeriksaan: true,
        obat: false,
        lab: false,
        radiologi: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
        if (section === 'obat' && !loadingObat && obatRows.length === 0) {
            fetchObat();
        }
        if (section === 'lab' && !loadingLab && labRows.length === 0) {
            fetchLab();
        }
        if (section === 'radiologi' && !loadingRad && radRows.length === 0) {
            fetchRad();
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/rawat-inap/pemeriksaan-ranap', {
                params: {
                    t: token || undefined,
                    no_rawat: noRawat || undefined,
                },
            });
            const data = Array.isArray(res.data?.data) ? res.data.data : [];
            setRows(data);
            setLoading(false);
        } catch (e) {
            setError(e.message || 'Gagal memuat riwayat pemeriksaan');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        setObatRows([]);
        setLabRows([]);
        setRadRows([]);
        setExpandedSections({
            pemeriksaan: true,
            obat: false,
            lab: false,
            radiologi: false
        });
    }, [noRawat]);

    const kesadaranOptions = [
        'Compos Mentis','Somnolence','Sopor','Coma','Alert','Confusion','Voice','Pain','Unresponsive','Apatis','Delirium'
    ];

    const startEdit = (row) => {
        setEditing({
            no_rawat: row.no_rawat,
            tgl_perawatan: row.tgl_perawatan,
            jam_rawat: row.jam_rawat,
        });
        setEditForm({
            suhu_tubuh: row.suhu_tubuh || '',
            tensi: row.tensi || '',
            nadi: row.nadi || '',
            respirasi: row.respirasi || '',
            tinggi: row.tinggi || '',
            berat: row.berat || '',
            spo2: row.spo2 || '',
            gcs: row.gcs || '',
            kesadaran: row.kesadaran || '',
            keluhan: row.keluhan || '',
            pemeriksaan: row.pemeriksaan || '',
            alergi: row.alergi || '',
            penilaian: row.penilaian || '',
            rtl: row.rtl || '',
            instruksi: row.instruksi || '',
            evaluasi: row.evaluasi || '',
            nip: row.nip || '',
        });
        setMessage(null);
        setError(null);
    };

    const cancelEdit = () => {
        setEditing(null);
        setMessage(null);
        setError(null);
    };

    const saveEdit = async () => {
        if (!editing) return;
        setMessage(null);
        setError(null);
        try {
            const payload = {
                key: {
                    no_rawat: editing.no_rawat,
                    tgl_perawatan: editing.tgl_perawatan,
                    jam_rawat: editing.jam_rawat,
                },
                ...editForm,
            };
            const res = await axios.put('/rawat-inap/pemeriksaan-ranap', payload, {
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            });
            setMessage(res.data?.message || 'Pemeriksaan diperbarui');
            setEditing(null);
            await fetchData();
        } catch (e) {
            const msg = e?.response?.data?.message || 'Gagal memperbarui pemeriksaan';
            setError(msg);
        }
    };

    const deleteRow = async (row) => {
        if (!row) return;
        const ok = window.confirm('Yakin ingin menghapus pemeriksaan ini?');
        if (!ok) return;
        setMessage(null);
        setError(null);
        try {
            const res = await axios.delete('/rawat-inap/pemeriksaan-ranap', {
                data: {
                    no_rawat: row.no_rawat,
                    tgl_perawatan: row.tgl_perawatan,
                    jam_rawat: row.jam_rawat,
                },
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            });
            setMessage(res.data?.message || 'Pemeriksaan dihapus');
            await fetchData();
        } catch (e) {
            const msg = e?.response?.data?.message || 'Gagal menghapus pemeriksaan';
            setError(msg);
        }
    };

    const fetchObat = async () => {
        if (!noRawat) return;
        setLoadingObat(true);
        try {
            const res = await fetch(`/rawat-inap/obat-ranap/${encodeURIComponent(noRawat)}`, { headers: { Accept: 'application/json' } });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            const data = Array.isArray(json.data) ? json.data : [];
            setObatRows(data);
        } catch (e) {
            setObatRows([]);
        } finally {
            setLoadingObat(false);
        }
    };

    const fetchLab = async () => {
        if (!noRawat) return;
        setLoadingLab(true);
        try {
            const res = await fetch(`/rawat-inap/lab/${encodeURIComponent(noRawat)}`, { headers: { Accept: 'application/json' } });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            const data = Array.isArray(json.data) ? json.data : [];
            setLabRows(data);
        } catch (e) {
            setLabRows([]);
        } finally {
            setLoadingLab(false);
        }
    };

    const fetchRad = async () => {
        if (!noRawat) return;
        setLoadingRad(true);
        try {
            const res = await fetch(`/rawat-inap/radiologi/${encodeURIComponent(noRawat)}`, { headers: { Accept: 'application/json' } });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            const data = Array.isArray(json.data) ? json.data : [];
            setRadRows(data);
        } catch (e) {
            setRadRows([]);
        } finally {
            setLoadingRad(false);
        }
    };

    const getSectionIcon = (section) => {
        const icons = {
            pemeriksaan: ClipboardDocumentListIcon,
            obat: BeakerIcon,
            lab: BeakerIcon,
            radiologi: DocumentTextIcon
        };
        return icons[section] || DocumentTextIcon;
    };

    const getSectionColor = (section) => {
        const colors = {
            pemeriksaan: 'bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-700',
            obat: 'bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-700',
            lab: 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 text-purple-700',
            radiologi: 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 text-orange-700'
        };
        return colors[section] || 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 text-gray-700';
    };

    const getIconColor = (section) => {
        const colors = {
            pemeriksaan: 'text-indigo-600',
            obat: 'text-green-600',
            lab: 'text-purple-600',
            radiologi: 'text-orange-600'
        };
        return colors[section] || 'text-gray-600';
    };

    const sections = [
        {
            key: 'pemeriksaan',
            title: 'Riwayat Pemeriksaan',
            subtitle: `${rows.length} pemeriksaan`,
            content: rows
        },
        {
            key: 'obat',
            title: 'Riwayat Obat',
            subtitle: `${obatRows.length} item`,
            content: obatRows
        },
        {
            key: 'lab',
            title: 'Riwayat Lab',
            subtitle: `${labRows.length} item`,
            content: labRows
        },
        {
            key: 'radiologi',
            title: 'Riwayat Radiologi',
            subtitle: `${radRows.length} item`,
            content: radRows
        }
    ];

    const renderMedicationTable = () => {
        if (loadingObat) {
            return (
                <div className="text-center py-6 text-gray-500">
                    <div className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xs">Memuat data obat...</span>
                    </div>
                </div>
            );
        }
        if (!Array.isArray(obatRows) || obatRows.length === 0) {
            return (
                <div className="text-center py-6 text-gray-500">
                    <BeakerIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-xs">Belum ada data obat</p>
                </div>
            );
        }
        const grouped = obatRows.reduce((acc, item) => {
            const key = item.tgl_perawatan || '-';
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
        const sortedDates = Object.keys(grouped).sort((a, b) => {
            if (a === '-') return 1;
            if (b === '-') return -1;
            return new Date(b) - new Date(a);
        });
        const formatDateId = (date) => {
            if (!date || date === '-') return '-';
            try {
                return new Date(date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } catch {
                return date;
            }
        };
        return (
            <div>
                {sortedDates.map((dateKey) => {
                    const items = grouped[dateKey].slice().sort((a, b) => (a.jam || '').localeCompare(b.jam || ''));
                    return (
                        <div key={dateKey} className="border-t border-gray-100">
                            <div className="px-4 py-2 bg-gray-50 flex items-center justify-between">
                                <div className="text-xs font-medium text-gray-700">{formatDateId(dateKey)}</div>
                                <div className="text-[11px] text-gray-500">{items.length} item</div>
                            </div>
                            <div className="md:hidden divide-y divide-gray-100">
                                {items.map((item, index) => (
                                    <div key={`${item.kode_brng}-${item.jam}-${index}`} className="px-4 py-3 flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <div className="text-sm text-gray-900">{item.nama_brng || '-'}</div>
                                            <div className="mt-1 text-xs text-gray-500">{item.aturan || '-'}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-900">{item.jml || '-'}</div>
                                            <div className="text-[11px] text-gray-400">{item.jam || ''}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="hidden md:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Obat</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aturan Pakai</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {items.map((item, index) => (
                                            <tr key={`${item.kode_brng}-${item.jam}-${index}`}>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="text-sm text-gray-900">{item.nama_brng || '-'}</div>
                                                    <div className="text-[11px] text-gray-400 mt-0.5">{item.jam || ''}</div>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.jml || '-'}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.aturan || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderGroupedByDate = (rows, { title, emptyIcon, columns, mobileTemplate }) => {
        if (!Array.isArray(rows) || rows.length === 0) {
            return (
                <div className="text-center py-6 text-gray-500">
                    {emptyIcon}
                    <p className="text-xs">Belum ada data {title}</p>
                </div>
            );
        }
        const grouped = rows.reduce((acc, item) => {
            const key = item.tgl_periksa || item.tgl_perawatan || '-';
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
        const sortedDates = Object.keys(grouped).sort((a, b) => {
            if (a === '-') return 1;
            if (b === '-') return -1;
            return new Date(b) - new Date(a);
        });
        const formatDateId = (date) => {
            if (!date || date === '-') return '-';
            try {
                return new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            } catch {
                return date;
            }
        };
        return (
            <div>
                {sortedDates.map((dateKey) => {
                    const items = grouped[dateKey].slice().sort((a, b) => (a.jam || '').localeCompare(b.jam || ''));
                    return (
                        <div key={dateKey} className="border-t border-gray-100">
                            <div className="px-4 py-2 bg-gray-50 flex items-center justify-between">
                                <div className="text-xs font-medium text-gray-700">{formatDateId(dateKey)}</div>
                                <div className="text-[11px] text-gray-500">{items.length} item</div>
                            </div>
                            <div className="md:hidden divide-y divide-gray-100">
                                {items.map((item, idx) => (
                                    <div key={idx} className="px-4 py-3">{mobileTemplate(item)}</div>
                                ))}
                            </div>
                            <div className="hidden md:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {columns.map((c) => (
                                                <th key={c.key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{c.header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {items.map((item, idx) => (
                                            <tr key={idx}>
                                                {columns.map((c) => (
                                                    <td key={c.key} className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{c.render(item)}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderLab = () => {
        if (loadingLab) return (<div className="py-6 text-center text-xs text-gray-500">Memuat data lab...</div>);
        return renderGroupedByDate(labRows, {
            title: 'lab',
            emptyIcon: <BeakerIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />,
            columns: [
                { key: 'pemeriksaan', header: 'Pemeriksaan', render: (r) => (
                    <div>
                        <div className="text-sm">{r.pemeriksaan || '-'}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{r.jam || ''}</div>
                    </div>
                )},
                { key: 'nilai', header: 'Nilai', render: (r) => r.nilai || '-' },
                { key: 'satuan', header: 'Satuan', render: (r) => r.satuan || '-' },
                { key: 'rujukan', header: 'Nilai Rujukan', render: (r) => r.nilai_rujukan || '-' },
                { key: 'ket', header: 'Keterangan', render: (r) => r.keterangan || '-' },
            ],
            mobileTemplate: (r) => (
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <div className="text-sm text-gray-900">{r.pemeriksaan || '-'}</div>
                        <div className="mt-1 text-xs text-gray-500">{r.nilai || '-'} {r.satuan || ''}</div>
                        <div className="mt-0.5 text-[11px] text-gray-400">{r.nilai_rujukan || '-'} · {r.jam || ''}</div>
                    </div>
                    <div className="text-right text-xs text-gray-600">{r.keterangan || '-'}</div>
                </div>
            )
        });
    };

    const renderRadiologi = () => {
        if (loadingRad) return (<div className="py-6 text-center text-xs text-gray-500">Memuat data radiologi...</div>);
        return renderGroupedByDate(radRows, {
            title: 'radiologi',
            emptyIcon: <DocumentTextIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />,
            columns: [
                { key: 'hasil', header: 'Hasil', render: (r) => (
                    <div>
                        <div className="text-sm">{r.hasil || '-'}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{r.jam || ''}</div>
                    </div>
                )},
            ],
            mobileTemplate: (r) => (
                <div>
                    <div className="text-sm text-gray-900">{r.hasil || '-'}</div>
                    <div className="mt-0.5 text-[11px] text-gray-400">{r.jam || ''}</div>
                </div>
            )
        });
    };

    return (
        <div className="space-y-3">
            {message && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700">
                    {message}
                </div>
            )}
            {loading && (
                <div className="flex items-center justify-center py-8">
                    <div className="text-gray-500">Memuat riwayat...</div>
                </div>
            )}
            
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && sections.map((section) => {
                const Icon = getSectionIcon(section.key);
                const isExpanded = expandedSections[section.key];
                
                return (
                    <motion.div
                        key={section.key}
                        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={() => toggleSection(section.key)}
                            className={`w-full px-6 py-4 flex items-center justify-between transition-all duration-200 ${getSectionColor(section.key)} hover:shadow-sm`}
                        >
                            <div className="flex items-center space-x-4">
                                <div className={`p-2 rounded-lg bg-white/80 ${getIconColor(section.key)}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900">
                                        {section.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {section.subtitle}
                                    </p>
                                </div>
                            </div>
                            <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-t border-gray-200"
                                >
                                    <div className="p-6">
                                        {section.key === 'pemeriksaan' ? (
                                            section.content.length > 0 ? (
                                                <div className="space-y-4">
                                                    {section.content.map((row, idx) => (
                                                        <div key={idx} className="bg-gray-50 rounded-lg p-4 space-y-3">
                                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                                <div className="flex items-center justify-between text-sm">
                                                                    <div className="flex items-center space-x-2 text-gray-600">
                                                                        <CalendarIcon className="w-4 h-4" />
                                                                        <span>{new Date(row.tgl_perawatan).toLocaleDateString('id-ID')}</span>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2 text-gray-600">
                                                                        <ClockIcon className="w-4 h-4" />
                                                                        <span>{String(row.jam_rawat).substring(0,5)}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                                                    <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 border border-indigo-200">NIP: {row.nip || '-'}</span>
                                                                    {row.kesadaran ? (
                                                                        <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 border border-purple-200">{row.kesadaran}</span>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
                                                                <div className="bg-white rounded p-2">
                                                                    <div className="text-gray-500 text-xs">Suhu</div>
                                                                    <div className="font-medium">{row.suhu_tubuh || '-'}</div>
                                                                </div>
                                                                <div className="bg-white rounded p-2">
                                                                    <div className="text-gray-500 text-xs">Tensi</div>
                                                                    <div className="font-medium">{row.tensi || '-'}</div>
                                                                </div>
                                                                <div className="bg-white rounded p-2">
                                                                    <div className="text-gray-500 text-xs">Nadi</div>
                                                                    <div className="font-medium">{row.nadi || '-'}</div>
                                                                </div>
                                                                <div className="bg-white rounded p-2">
                                                                    <div className="text-gray-500 text-xs">Respirasi</div>
                                                                    <div className="font-medium">{row.respirasi || '-'}</div>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                <div className="bg-white rounded p-3">
                                                                    <div className="text-gray-500 text-xs mb-1">Keluhan</div>
                                                                    <div className="text-sm whitespace-pre-wrap break-words">{row.keluhan || '-'}</div>
                                                                </div>
                                                                <div className="bg-white rounded p-3">
                                                                    <div className="text-gray-500 text-xs mb-1">Pemeriksaan</div>
                                                                    <div className="text-sm whitespace-pre-wrap break-words">{row.pemeriksaan || '-'}</div>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                <div className="bg-white rounded p-3">
                                                                    <div className="text-gray-500 text-xs mb-1">Penilaian</div>
                                                                    <div className="text-sm whitespace-pre-wrap break-words">{row.penilaian || '-'}</div>
                                                                </div>
                                                                <div className="bg-white rounded p-3">
                                                                    <div className="text-gray-500 text-xs mb-1">Rencana</div>
                                                                    <div className="text-sm whitespace-pre-wrap break-words">{row.rtl || '-'}</div>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                <div className="bg-white rounded p-3">
                                                                    <div className="text-gray-500 text-xs mb-1">Instruksi</div>
                                                                    <div className="text-sm whitespace-pre-wrap break-words">{row.instruksi || '-'}</div>
                                                                </div>
                                                                <div className="bg-white rounded p-3">
                                                                    <div className="text-gray-500 text-xs mb-1">Evaluasi</div>
                                                                    <div className="text-sm whitespace-pre-wrap break-words">{row.evaluasi || '-'}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8 text-gray-500">
                                                    <Icon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                                    <p className="text-sm">Belum ada data pemeriksaan</p>
                                                </div>
                                            )
                                        ) : section.key === 'obat' ? (
                                            renderMedicationTable()
                                        ) : section.key === 'lab' ? (
                                            renderLab()
                                        ) : section.key === 'radiologi' ? (
                                            renderRadiologi()
                                        ) : null}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-xl border shadow-lg w-full max-w-3xl">
                        <div className="px-6 py-4 border-b flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Edit Pemeriksaan</h3>
                            <button onClick={cancelEdit} className="p-2 rounded hover:bg-gray-100">
                                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-medium mb-1">Suhu</label>
                                    <input type="text" value={editForm.suhu_tubuh} onChange={(e) => setEditForm({ ...editForm, suhu_tubuh: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Tensi</label>
                                    <input type="text" value={editForm.tensi} onChange={(e) => setEditForm({ ...editForm, tensi: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Nadi</label>
                                    <input type="text" value={editForm.nadi} onChange={(e) => setEditForm({ ...editForm, nadi: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Respirasi</label>
                                    <input type="text" value={editForm.respirasi} onChange={(e) => setEditForm({ ...editForm, respirasi: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Tinggi</label>
                                    <input type="text" value={editForm.tinggi} onChange={(e) => setEditForm({ ...editForm, tinggi: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Berat</label>
                                    <input type="text" value={editForm.berat} onChange={(e) => setEditForm({ ...editForm, berat: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">SpO2</label>
                                    <input type="text" value={editForm.spo2} onChange={(e) => setEditForm({ ...editForm, spo2: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">GCS</label>
                                    <input type="text" value={editForm.gcs} onChange={(e) => setEditForm({ ...editForm, gcs: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Kesadaran</label>
                                    <select value={editForm.kesadaran} onChange={(e) => setEditForm({ ...editForm, kesadaran: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" required>
                                        <option value="">Pilih Kesadaran</option>
                                        {kesadaranOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Petugas (NIP)</label>
                                    <SearchableSelect
                                        source="petugas"
                                        value={editForm.nip}
                                        onChange={(val) => setEditForm({ ...editForm, nip: val })}
                                        placeholder="Cari petugas"
                                        searchPlaceholder="Cari nama atau NIP…"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1">Keluhan</label>
                                <textarea value={editForm.keluhan} onChange={(e) => setEditForm({ ...editForm, keluhan: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1">Pemeriksaan</label>
                                <textarea value={editForm.pemeriksaan} onChange={(e) => setEditForm({ ...editForm, pemeriksaan: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium mb-1">Alergi</label>
                                    <input type="text" value={editForm.alergi} onChange={(e) => setEditForm({ ...editForm, alergi: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Penilaian</label>
                                    <input type="text" value={editForm.penilaian} onChange={(e) => setEditForm({ ...editForm, penilaian: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium mb-1">Rencana</label>
                                    <textarea value={editForm.rtl} onChange={(e) => setEditForm({ ...editForm, rtl: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} required />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Instruksi</label>
                                    <textarea value={editForm.instruksi} onChange={(e) => setEditForm({ ...editForm, instruksi: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1">Evaluasi</label>
                                <textarea value={editForm.evaluasi} onChange={(e) => setEditForm({ ...editForm, evaluasi: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} required />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t flex items-center justify-end gap-3">
                            <button onClick={cancelEdit} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">Batal</button>
                            <button onClick={saveEdit} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm">Simpan Perubahan</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
