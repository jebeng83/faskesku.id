import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDownIcon,
    CalendarIcon,
    ClockIcon,
    ClipboardDocumentListIcon,
    BeakerIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function RiwayatPemeriksaan({ _token = '', noRawat = '', _noRkmMedis = '' }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
    };

    // Placeholder data fetch - will be implemented later
    const fetchData = async () => {
        setLoading(true);
        try {
            // TODO: Implement API call for inpatient medical history
            // For now, using sample data
            setTimeout(() => {
                setRows([
                    {
                        tgl_perawatan: '2024-01-15',
                        jam_rawat: '08:30',
                        suhu_tubuh: '36.8',
                        tensi: '120/80',
                        nadi: '78',
                        respirasi: '20',
                        kesadaran: 'Compos Mentis'
                    }
                ]);
                setLoading(false);
            }, 1000);
        } catch (e) {
            setError(e.message || 'Gagal memuat riwayat pemeriksaan');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [noRawat]);

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
            subtitle: 'Belum ada data obat',
            content: []
        },
        {
            key: 'lab',
            title: 'Riwayat Lab',
            subtitle: 'Belum ada data lab',
            content: []
        },
        {
            key: 'radiologi',
            title: 'Riwayat Radiologi',
            subtitle: 'Belum ada data radiologi',
            content: []
        }
    ];

    return (
        <div className="space-y-3">
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
                                        {section.key === 'pemeriksaan' && section.content.length > 0 ? (
                                            <div className="space-y-4">
                                                {section.content.map((row, idx) => (
                                                    <div key={idx} className="bg-gray-50 rounded-lg p-4 space-y-3">
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
                                                        
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
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
                                                        
                                                        {row.kesadaran && (
                                                            <div className="bg-white rounded p-3">
                                                                <div className="text-gray-500 text-xs mb-1">Kesadaran</div>
                                                                <div className="text-sm">{row.kesadaran}</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                <Icon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                                <p className="text-sm">
                                                    {section.key === 'pemeriksaan' ? 'Belum ada data pemeriksaan' : `Belum ada data ${section.title.toLowerCase()}`}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
}
