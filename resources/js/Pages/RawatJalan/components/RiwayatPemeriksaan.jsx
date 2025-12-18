import React, { useState, useEffect } from 'react';
import { BeakerIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function RiwayatPemeriksaan({ token = '', noRawat = '', noRkmMedis = '' }) {
    const [medicationItems, setMedicationItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Load medication data dynamically based on noRawat
    useEffect(() => {
        // Clear previous data immediately when noRawat changes
        setMedicationItems([]);
        setError('');
        
        if (noRawat) {
            const controller = new AbortController();
            const fetchMedicationData = async () => {
                try {
                    setLoading(true);
                    
                    const baseUrl = `/rawat-jalan/obat-ralan/${noRawat}`;
                    const url = baseUrl;
                    
                    const res = await fetch(url, {
                        signal: controller.signal,
                        headers: { 'Accept': 'application/json' }
                    });
                    
                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.message || `HTTP ${res.status}: ${res.statusText}`);
                    }
                    
                    const json = await res.json();
                    
                    // Ensure we're working with an array
                    const data = Array.isArray(json.data) ? json.data : [];
                    setMedicationItems(data);
                } catch (e) {
                    if (e.name !== 'AbortError') {
                        setError(e.message || 'Terjadi kesalahan saat memuat data obat');
                    }
                } finally {
                    setLoading(false);
                }
            };
            
            fetchMedicationData();
            
            return () => {
                controller.abort();
            };
        } else {
            setMedicationItems([]);
        }
    }, [noRawat]);

    const sections = [
        {
            key: 'obat',
            title: 'Riwayat Obat',
            subtitle: medicationItems.length > 0 ? `${medicationItems.length} item` : 'Belum ada data obat',
            icon: BeakerIcon,
            color: 'bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-700',
            iconColor: 'text-green-600'
        },
        {
            key: 'lab',
            title: 'Riwayat Lab',
            subtitle: 'Belum ada data lab',
            icon: BeakerIcon,
            color: 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 text-purple-700',
            iconColor: 'text-purple-600'
        },
        {
            key: 'radiologi',
            title: 'Riwayat Radiologi',
            subtitle: 'Belum ada data radiologi',
            icon: DocumentTextIcon,
            color: 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 text-orange-700',
            iconColor: 'text-orange-600'
        }
    ];

    // Render medication table
    const renderMedicationTable = () => {
        if (loading) {
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
        
        if (error) {
            return (
                <div className="text-center py-6 text-gray-500">
                    <svg className="w-8 h-8 mx-auto mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p className="text-xs text-red-500">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-2 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        Coba lagi
                    </button>
                </div>
            );
        }

        if (medicationItems.length === 0) {
            return (
                <div className="text-center py-6 text-gray-500">
                    <BeakerIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-xs">Belum ada data obat</p>
                </div>
            );
        }
        
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Obat</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aturan Pakai</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {medicationItems.map((item, index) => (
                            <tr key={`${item.kode_brng}-${item.tgl_perawatan}-${item.jam}-${index}`}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.nama_brng || '-'}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.jml || '-'}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.aturan || '-'}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {item.tgl_perawatan ? `${item.tgl_perawatan} ${item.jam || ''}` : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="space-y-3">
            {sections.map((section) => {
                const Icon = section.icon;
                
                return (
                    <div
                        key={section.key}
                        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                    >
                        <div className={`w-full px-4 py-3 flex items-center justify-between ${section.color}`}>
                            <div className="flex items-center space-x-3">
                                <div className={`p-1.5 rounded-md bg-white/80 ${section.iconColor}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900 text-sm">
                                        {section.title}
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                        {section.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-3 border-t border-gray-200">
                            {section.key === 'obat' ? (
                                renderMedicationTable()
                            ) : (
                                <div className="text-center py-6 text-gray-500">
                                    <Icon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                    <p className="text-xs">
                                        {`Belum ada data ${section.title.toLowerCase()}`}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
