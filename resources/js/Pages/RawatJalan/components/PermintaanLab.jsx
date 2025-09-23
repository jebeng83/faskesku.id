import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function PermintaanLab({ token = '', noRkmMedis = '', noRawat = '' }) {
    const [selectedTests, setSelectedTests] = useState([]);
    const [availableTests, setAvailableTests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        tgl_permintaan: new Date().toISOString().split('T')[0],
        jam_permintaan: new Date().toTimeString().split(' ')[0].substring(0, 5),
        dokter_perujuk: '-',
        status: 'ralan',
        informasi_tambahan: '',
        diagnosa_klinis: ''
    });

    // Fetch available lab tests
    useEffect(() => {
        fetchAvailableTests();
    }, []);

    const fetchAvailableTests = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/lab-tests', {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAvailableTests(data.data || []);
            } else {
                console.error('Failed to fetch lab tests:', response.status);
            }
        } catch (error) {
            console.error('Error fetching lab tests:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addTest = (test) => {
        if (!selectedTests.find(t => t.kd_jenis_prw === test.kd_jenis_prw)) {
            setSelectedTests(prev => [...prev, {
                ...test,
                stts_bayar: 'Belum'
            }]);
        }
    };

    const removeTest = (kd_jenis_prw) => {
        setSelectedTests(prev => prev.filter(t => t.kd_jenis_prw !== kd_jenis_prw));
    };

    const updateFormData = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedTests.length === 0) {
            alert('Pilih minimal satu pemeriksaan laboratorium');
            return;
        }

        setIsSubmitting(true);
        try {
            const submitData = {
                no_rawat: noRawat,
                ...formData,
                detail_tests: selectedTests.map(test => ({
                    kd_jenis_prw: test.kd_jenis_prw,
                    stts_bayar: test.stts_bayar
                }))
            };

            router.post('/permintaan-lab', submitData, {
                onSuccess: (page) => {
                    // Reset form after successful submission
                    setSelectedTests([]);
                    setFormData({
                        tgl_permintaan: new Date().toISOString().split('T')[0],
                        jam_permintaan: new Date().toTimeString().split(' ')[0].substring(0, 5),
                        dokter_perujuk: '-',
                        status: 'ralan',
                        informasi_tambahan: '',
                        diagnosa_klinis: ''
                    });
                    
                    // Show success message from flash session
                    if (page.props.flash && page.props.flash.success) {
                        alert(page.props.flash.success);
                    } else {
                        alert('Permintaan laboratorium berhasil disimpan');
                    }
                },
                onError: (errors) => {
                    console.error('Error:', errors);
                    
                    // Handle validation errors
                    if (errors.error) {
                        alert('Error: ' + errors.error);
                    } else if (Object.keys(errors).length > 0) {
                        const errorMessages = Object.values(errors).flat();
                        alert('Validation Error: ' + errorMessages.join(', '));
                    } else {
                        alert('Terjadi kesalahan saat menyimpan permintaan');
                    }
                }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredTests = availableTests.filter(test => 
        test.nm_perawatan?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTotalBiaya = () => {
        return selectedTests.reduce((total, test) => total + (test.total_byr || 0), 0);
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Permintaan Laboratorium</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Pilih pemeriksaan laboratorium dan sertakan catatan klinis</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
                {/* Form Data Permintaan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tanggal Permintaan</label>
                        <input 
                            type="date" 
                            value={formData.tgl_permintaan}
                            onChange={(e) => updateFormData('tgl_permintaan', e.target.value)}
                            className="w-full py-2.5 px-3 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jam Permintaan</label>
                        <input 
                            type="time" 
                            value={formData.jam_permintaan}
                            onChange={(e) => updateFormData('jam_permintaan', e.target.value)}
                            className="w-full py-2.5 px-3 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Diagnosa Klinis</label>
                        <input 
                            type="text" 
                            value={formData.diagnosa_klinis}
                            onChange={(e) => updateFormData('diagnosa_klinis', e.target.value)}
                            className="w-full py-2.5 px-3 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                            placeholder="Masukkan diagnosa klinis"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Informasi Tambahan</label>
                        <input 
                            type="text" 
                            value={formData.informasi_tambahan}
                            onChange={(e) => updateFormData('informasi_tambahan', e.target.value)}
                            className="w-full py-2.5 px-3 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                            placeholder="Informasi tambahan (opsional)"
                        />
                    </div>
                </div>

                {/* Pencarian Pemeriksaan */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Cari Pemeriksaan Laboratorium
                        </h4>
                    </div>
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                        placeholder="Cari nama pemeriksaan..."
                    />
                    
                    {/* Available Tests */}
                    {isLoading ? (
                        <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                            <p className="text-sm text-gray-500 mt-2">Memuat pemeriksaan...</p>
                        </div>
                    ) : (
                        <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg">
                            {filteredTests.length > 0 ? (
                                filteredTests.map(test => (
                                    <div key={test.kd_jenis_prw} className="p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h5 className="text-sm font-medium text-gray-900 dark:text-white">{test.nm_perawatan}</h5>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Kode: {test.kd_jenis_prw}</p>
                                                <p className="text-xs text-green-600 dark:text-green-400 font-medium">{test.total_byr_formatted || 'Rp 0'}</p>
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={() => addTest(test)}
                                                disabled={selectedTests.find(t => t.kd_jenis_prw === test.kd_jenis_prw)}
                                                className="ml-3 px-3 py-1.5 text-xs font-medium rounded-md bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                                            >
                                                {selectedTests.find(t => t.kd_jenis_prw === test.kd_jenis_prw) ? 'Dipilih' : 'Pilih'}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                    {searchTerm ? 'Tidak ada pemeriksaan yang ditemukan' : 'Tidak ada pemeriksaan tersedia'}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Selected Tests */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Pemeriksaan Terpilih
                        </h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {selectedTests.length} pemeriksaan
                        </span>
                    </div>
                    {selectedTests.length > 0 ? (
                        selectedTests.map((test, index) => (
                            <div key={test.kd_jenis_prw} className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium">
                                                {index + 1}
                                            </span>
                                            <h5 className="text-sm font-medium text-gray-900 dark:text-white">{test.nm_perawatan}</h5>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Kode: {test.kd_jenis_prw}</p>
                                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Rp {(test.total_byr || 0).toLocaleString('id-ID')}</p>
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={() => removeTest(test.kd_jenis_prw)} 
                                        className="ml-3 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                                        title="Hapus pemeriksaan"
                                    >
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p>Belum ada pemeriksaan yang dipilih</p>
                             <p className="text-sm">Gunakan pencarian di atas untuk memilih pemeriksaan</p> 
                        </div>
                    )}
                    
                    {selectedTests.length > 0 && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Total Biaya Pemeriksaan:</span>
                                <span className="text-lg font-bold text-blue-900 dark:text-blue-300">Rp {getTotalBiaya().toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Total: {selectedTests.length} pemeriksaan dipilih
                        </span>
                        {selectedTests.length > 0 && (
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                Rp {getTotalBiaya().toLocaleString('id-ID')}
                            </span>
                        )}
                    </div>
                    <button 
                        type="submit" 
                        className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                        disabled={isSubmitting || selectedTests.length === 0}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Mengirim Permintaan...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Kirim Permintaan Lab
                            </>
                        )}
                    </button>
                </div>
            </form>
            
            {/* Riwayat Permintaan Lab */}
            <RiwayatPermintaanLab noRawat={noRawat} />
        </div>
    );
}

// Komponen untuk menampilkan riwayat permintaan laboratorium
// Komponen terpisah untuk menangani grouping dengan state management yang benar
function PermintaanLabGroups({ permintaan }) {
    const [expandedGroups, setExpandedGroups] = useState({});

    const toggleGroup = (groupName) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    // Group by nm_perawatan from jns_perawatan_lab
    const groupedByPerawatan = permintaan.detail_permintaan.reduce((groups, detail) => {
        const perawatanName = detail.jns_perawatan_lab?.nm_perawatan || 'Perawatan Lainnya';
        if (!groups[perawatanName]) {
            groups[perawatanName] = [];
        }
        groups[perawatanName].push(detail);
        return groups;
    }, {});

    return (
        <>
            {Object.entries(groupedByPerawatan).map(([perawatanName, details]) => {
                const isExpanded = expandedGroups[perawatanName] || false;
                
                return (
                    <div key={perawatanName} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                        <div 
                            className="flex items-center mb-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/30 rounded-md p-2 -m-2 transition-colors"
                            onClick={() => toggleGroup(perawatanName)}
                        >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <h5 className="text-sm font-semibold text-gray-900 dark:text-white flex-1">
                                {perawatanName}
                            </h5>
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded-full">
                                {details.length} item
                            </span>
                            <svg 
                                className={`ml-2 w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                                    isExpanded ? 'rotate-180' : ''
                                }`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        {isExpanded && (
                            <div className="space-y-2 ml-4 animate-in slide-in-from-top-2 duration-200">
                                {details.map((detail, index) => (
                                    <div key={index} className="bg-white dark:bg-gray-800 rounded-md p-3 border border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {detail.template_laboratorium?.Pemeriksaan || 'Pemeriksaan tidak tersedia'}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Kode: {detail.kd_jenis_prw}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    detail.stts_bayar === 'Sudah' 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                                }`}>
                                                    {detail.stts_bayar === 'Sudah' ? 'Sudah Bayar' : 'Belum Bayar'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
}

export function RiwayatPermintaanLab({ noRawat = '' }) {
    const [riwayatPermintaan, setRiwayatPermintaan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedItems, setExpandedItems] = useState(new Set());

    // Fetch riwayat permintaan lab
    useEffect(() => {
        if (noRawat) {
            fetchRiwayatPermintaan();
        }
    }, [noRawat]);

    const fetchRiwayatPermintaan = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/permintaan-lab/riwayat/${noRawat}`, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setRiwayatPermintaan(data.data || []);
            } else {
                console.error('Failed to fetch riwayat permintaan:', response.status);
            }
        } catch (error) {
            console.error('Error fetching riwayat permintaan:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeletePermintaan = async (noorder) => {
        if (!confirm('Apakah Anda yakin ingin menghapus permintaan laboratorium ini?')) {
            return;
        }

        try {
            const response = await fetch(`/api/permintaan-lab/${noorder}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                }
            });

            if (response.ok) {
                // Refresh data setelah berhasil menghapus
                fetchRiwayatPermintaan();
                alert('Permintaan laboratorium berhasil dihapus');
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Gagal menghapus permintaan laboratorium');
            }
        } catch (error) {
            console.error('Error deleting permintaan:', error);
            alert('Terjadi kesalahan saat menghapus permintaan laboratorium');
        }
    };

    const toggleExpanded = (noorder) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(noorder)) {
            newExpanded.delete(noorder);
        } else {
            newExpanded.add(noorder);
        }
        setExpandedItems(newExpanded);
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            'ralan': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            'ranap': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
            'selesai': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            'batal': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                statusClasses[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}>
                {status === 'ralan' ? 'Rawat Jalan' : 
                 status === 'ranap' ? 'Rawat Inap' :
                 status === 'selesai' ? 'Selesai' :
                 status === 'batal' ? 'Batal' : status}
            </span>
        );
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric'
        });
    };

    const formatTime = (time) => {
        if (!time) return '-';
        return time.substring(0, 5); // HH:MM
    };

    if (!noRawat) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 mt-6">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Riwayat Permintaan Laboratorium</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Daftar permintaan laboratorium yang pernah dibuat</p>
                    </div>
                </div>
            </div>
            
            <div className="p-4 md:p-6">
                {isLoading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Memuat riwayat permintaan...</p>
                    </div>
                ) : riwayatPermintaan.length > 0 ? (
                    <div className="space-y-4">
                        {riwayatPermintaan.map((permintaan) => (
                            <div key={permintaan.noorder} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 dark:bg-gray-700/30 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {permintaan.noorder}
                                            </span>
                                            {getStatusBadge(permintaan.status)}
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {formatDate(permintaan.tgl_permintaan)} {formatTime(permintaan.jam_permintaan)}
                                            </span>
                                            <button
                                                onClick={() => handleDeletePermintaan(permintaan.noorder)}
                                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded transition-colors"
                                                title="Hapus permintaan"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => toggleExpanded(permintaan.noorder)}
                                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                <svg 
                                                    className={`w-5 h-5 transform transition-transform ${
                                                        expandedItems.has(permintaan.noorder) ? 'rotate-180' : ''
                                                    }`} 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                {expandedItems.has(permintaan.noorder) && (
                                    <div className="p-4 space-y-4">
                                        {/* Informasi Umum */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Dokter Perujuk</label>
                                                <p className="text-sm text-gray-900 dark:text-white">{permintaan.dokter_perujuk || '-'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Status</label>
                                                <p className="text-sm text-gray-900 dark:text-white">{permintaan.status}</p>
                                            </div>
                                            {permintaan.diagnosa_klinis && (
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Diagnosa Klinis</label>
                                                    <p className="text-sm text-gray-900 dark:text-white">{permintaan.diagnosa_klinis}</p>
                                                </div>
                                            )}
                                            {permintaan.informasi_tambahan && (
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Informasi Tambahan</label>
                                                    <p className="text-sm text-gray-900 dark:text-white">{permintaan.informasi_tambahan}</p>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Detail Pemeriksaan - Grouped by Template */}
                        {permintaan.detail_permintaan && permintaan.detail_permintaan.length > 0 && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Pemeriksaan yang Diminta
                                </h4>
                                <div className="space-y-3">
                                    <PermintaanLabGroups permintaan={permintaan} />
                                </div>
                            </div>
                        )}
                                        
                                        {/* Tanggal Sampel dan Hasil */}
                                        {(permintaan.tgl_sampel || permintaan.tgl_hasil) && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                                {permintaan.tgl_sampel && (
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Tanggal Sampel</label>
                                                        <p className="text-sm text-gray-900 dark:text-white">
                                                            {formatDate(permintaan.tgl_sampel)} {formatTime(permintaan.jam_sampel)}
                                                        </p>
                                                    </div>
                                                )}
                                                {permintaan.tgl_hasil && (
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Tanggal Hasil</label>
                                                        <p className="text-sm text-gray-900 dark:text-white">
                                                            {formatDate(permintaan.tgl_hasil)} {formatTime(permintaan.jam_hasil)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p>Belum ada riwayat permintaan laboratorium</p>
                        <p className="text-sm">Permintaan yang dibuat akan muncul di sini</p>
                    </div>
                )}
            </div>
        </div>
    );
}


