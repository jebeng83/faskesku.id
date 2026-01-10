import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TarifTindakan = ({ noRawat, kdDokter, nipPerawat, onTindakanAdded }) => {
    const [activeTab, setActiveTab] = useState('dokter');
    const [jenisPerawatan, setJenisPerawatan] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stageLoading, setStageLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTindakan, setSelectedTindakan] = useState(null);
    const [riwayatTindakan, setRiwayatTindakan] = useState({
        tindakan_dokter: [],
        tindakan_perawat: [],
        tindakan_dokter_perawat: []
    });

    // Load jenis perawatan
    const loadJenisPerawatan = async (jenisTarif = '') => {
        setLoading(true);
        try {
            const response = await axios.get('/api/tarif-tindakan', {
                params: {
                    search: searchTerm,
                    jenis_tarif: jenisTarif
                }
            });
            setJenisPerawatan(response.data.data.data || []);
        } catch (error) {
            console.error('Error loading jenis perawatan:', error);
        } finally {
            setLoading(false);
        }
    };

    // Compose staging jurnal (tampjurnal2) untuk Rawat Jalan (umum)
    const handleStageJurnalRalan = async () => {
        if (!noRawat) {
            alert('No. Rawat tidak tersedia');
            return;
        }
        try {
            setStageLoading(true);
            const response = await axios.post('/api/tarif-tindakan/stage-ralan', { no_rawat: noRawat });
            const meta = response.data.meta || {};
            const msg = `Staging jurnal berhasil. Debet: ${formatCurrency(meta.debet)} | Kredit: ${formatCurrency(meta.kredit)} | Balanced: ${meta.balanced ? 'Ya' : 'Tidak'}`;
            alert(msg);
        } catch (error) {
            console.error('Error staging jurnal ralan:', error);
            alert('Gagal menyusun staging jurnal: ' + (error.response?.data?.message || error.message));
        } finally {
            setStageLoading(false);
        }
    };

    // Load riwayat tindakan
    const loadRiwayatTindakan = async () => {
        if (!noRawat) return;
        
        try {
            const response = await axios.get(`/api/tarif-tindakan/riwayat/${noRawat}`);
            setRiwayatTindakan(response.data.data);
        } catch (error) {
            console.error('Error loading riwayat tindakan:', error);
        }
    };

    // Submit tindakan
    const handleSubmitTindakan = async () => {
        if (!selectedTindakan) {
            alert('Pilih tindakan terlebih dahulu');
            return;
        }

        const currentDate = new Date().toISOString().split('T')[0];
        const currentTime = new Date().toTimeString().split(' ')[0];

        const data = {
            no_rawat: noRawat,
            kd_jenis_prw: selectedTindakan.kd_jenis_prw,
            tgl_perawatan: currentDate,
            jam_rawat: currentTime
        };

        let endpoint = '';
        
        switch (activeTab) {
            case 'dokter':
                data.kd_dokter = kdDokter;
                endpoint = '/api/tarif-tindakan/dokter';
                break;
            case 'perawat':
                data.nip = nipPerawat;
                endpoint = '/api/tarif-tindakan/perawat';
                break;
            case 'dokter_perawat':
                data.kd_dokter = kdDokter;
                data.nip = nipPerawat;
                endpoint = '/api/tarif-tindakan/dokter-perawat';
                break;
        }

        try {
            setLoading(true);
            const response = await axios.post(endpoint, data);
            alert('Tindakan berhasil disimpan');
            setSelectedTindakan(null);
            loadRiwayatTindakan();
            if (onTindakanAdded) {
                onTindakanAdded(response.data.data);
            }
        } catch (error) {
            console.error('Error saving tindakan:', error);
            alert('Gagal menyimpan tindakan: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    // Delete tindakan
    const handleDeleteTindakan = async (tindakan, jenisTindakan) => {
        if (!confirm('Yakin ingin menghapus tindakan ini?')) return;

        const data = {
            jenis_tindakan: jenisTindakan,
            no_rawat: tindakan.no_rawat,
            kd_jenis_prw: tindakan.kd_jenis_prw,
            tgl_perawatan: tindakan.tgl_perawatan,
            jam_rawat: tindakan.jam_rawat
        };

        try {
            // Method spoofing: POST + _method=DELETE
            const fd = new FormData();
            Object.entries(data).forEach(([k, v]) => fd.append(k, v));
            fd.append('_method', 'DELETE');
            await axios.post('/api/tarif-tindakan', fd, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Tindakan berhasil dihapus');
            loadRiwayatTindakan();
        } catch (error) {
            console.error('Error deleting tindakan:', error);
            alert('Gagal menghapus tindakan');
        }
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount || 0);
    };

    useEffect(() => {
        const jenisTarif = activeTab === 'dokter' ? 'dokter' : 
                          activeTab === 'perawat' ? 'perawat' : 'dokter_perawat';
        loadJenisPerawatan(jenisTarif);
    }, [activeTab, searchTerm]);

    useEffect(() => {
        loadRiwayatTindakan();
    }, [noRawat]);

    const tabs = [
        { id: 'dokter', label: 'Tindakan Dokter', icon: '👨‍⚕️' },
        { id: 'perawat', label: 'Tindakan Perawat', icon: '👩‍⚕️' },
        { id: 'dokter_perawat', label: 'Tindakan Dokter & Perawat', icon: '🏥' }
    ];

    const getCurrentRiwayat = () => {
        switch (activeTab) {
            case 'dokter':
                return riwayatTindakan.tindakan_dokter;
            case 'perawat':
                return riwayatTindakan.tindakan_perawat;
            case 'dokter_perawat':
                return riwayatTindakan.tindakan_dokter_perawat;
            default:
                return [];
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Input Tarif Tindakan</h3>
                        <p className="text-sm text-gray-600">Kelola tindakan medis dan tarif</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-4" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-4">
                {/* Search */}
                <div className="mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari nama tindakan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Daftar Tindakan */}
                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">Pilih Tindakan</h4>
                        <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
                            {loading ? (
                                <div className="p-4 text-center text-gray-500">Loading...</div>
                            ) : jenisPerawatan.length === 0 ? (
                                <div className="p-4 text-center text-gray-500">Tidak ada data tindakan</div>
                            ) : (
                                jenisPerawatan.map((item) => (
                                    <div
                                        key={item.kd_jenis_prw}
                                        onClick={() => setSelectedTindakan(item)}
                                        className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                                            selectedTindakan?.kd_jenis_prw === item.kd_jenis_prw ? 'bg-blue-50 border-blue-200' : ''
                                        }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h5 className="font-medium text-gray-900 text-sm">{item.nm_perawatan}</h5>
                                                <p className="text-xs text-gray-500 mt-1">Kode: {item.kd_jenis_prw}</p>
                                            </div>
                                            <div className="text-right">
                                                {activeTab === 'dokter' && (
                                                    <span className="text-sm font-medium text-green-600">
                                                        {formatCurrency(item.total_byrdr)}
                                                    </span>
                                                )}
                                                {activeTab === 'perawat' && (
                                                    <span className="text-sm font-medium text-green-600">
                                                        {formatCurrency(item.total_byrpr)}
                                                    </span>
                                                )}
                                                {activeTab === 'dokter_perawat' && (
                                                    <span className="text-sm font-medium text-green-600">
                                                        {formatCurrency(item.total_byrdrpr)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Submit & Stage Buttons */}
                        <button
                            onClick={handleSubmitTindakan}
                            disabled={!selectedTindakan || loading}
                            className="w-full mt-4 bg-black hover:bg-neutral-800 disabled:bg-gray-300 text-white py-1.5 px-3 rounded-md font-medium transition-colors"
                        >
                            {loading ? 'Menyimpan...' : 'Simpan Tindakan'}
                        </button>

                        <button
                            onClick={handleStageJurnalRalan}
                            disabled={!noRawat || stageLoading}
                            className="w-full mt-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                        >
                            {stageLoading ? 'Menyusun Staging...' : 'Susun Staging Jurnal (Ralan Umum)'}
                        </button>
                    </div>

                    {/* Riwayat Tindakan */}
                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">Riwayat Tindakan</h4>
                        <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
                            {getCurrentRiwayat().length === 0 ? (
                                <div className="p-4 text-center text-gray-500">Belum ada riwayat tindakan</div>
                            ) : (
                                getCurrentRiwayat().map((item, index) => (
                                    <div key={index} className="p-3 border-b border-gray-100">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h5 className="font-medium text-gray-900 text-sm">
                                                    {item.jenis_perawatan?.nm_perawatan}
                                                </h5>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {item.tgl_perawatan} - {item.jam_rawat}
                                                </p>
                                                {activeTab === 'dokter' && item.dokter && (
                                                    <p className="text-xs text-gray-600">Dr. {item.dokter.nm_dokter}</p>
                                                )}
                                                {activeTab === 'perawat' && item.perawat && (
                                                    <p className="text-xs text-gray-600">{item.perawat.nama}</p>
                                                )}
                                                {activeTab === 'dokter_perawat' && (
                                                    <div className="text-xs text-gray-600">
                                                        <p>Dr. {item.dokter?.nm_dokter}</p>
                                                        <p>{item.perawat?.nama}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm font-medium text-green-600">
                                                    {formatCurrency(item.biaya_rawat)}
                                                </span>
                                                <button
                                                    onClick={() => handleDeleteTindakan(item, activeTab)}
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                    title="Hapus"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TarifTindakan;
