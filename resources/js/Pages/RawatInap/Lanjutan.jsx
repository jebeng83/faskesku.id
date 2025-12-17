import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LanjutanRalanLayout from '@/Layouts/LanjutanRalanLayout';
import RiwayatPemeriksaan from './components/RiwayatPemeriksaan';
import CpptSoap from '../RawatJalan/components/CpptSoap';
import Resep from './components/Resep';
import Diagnosa from './components/Diagnosa';
import PermintaanLab from './components/PermintaanLab';
import PermintaanRadiologi from './components/PermintaanRadiologi';
import TarifTindakan from './components/TarifTindakan';
import Operasi from './components/Operasi';
import Konsultasi from './components/Konsultasi';

export default function Lanjutan({ rawatInap, params }) {
    const [activeTab, setActiveTab] = useState('cppt');
    const [openAcc, setOpenAcc] = useState({ pemeriksaan: true });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTabChange = (tab) => setActiveTab(tab);
    const toggle = (section) => setOpenAcc(prev => ({ ...prev, [section]: !prev[section] }));

    const menuTabs = [
        { key: 'cppt', title: 'CPPT / SOAP', subtitle: 'Catatan Perkembangan Pasien', color: 'blue',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { key: 'operasi', title: 'Operasi', subtitle: 'Jadwal & Riwayat Operasi', color: 'red',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
        { key: 'tarifTindakan', title: 'Tarif Tindakan', subtitle: 'Input Tarif Tindakan Medis', color: 'orange',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
        { key: 'resep', title: 'Resep', subtitle: 'Resep Obat & Farmasi', color: 'green',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
        { key: 'diagnosa', title: 'Diagnosa', subtitle: 'Diagnosis & Kode ICD', color: 'red',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { key: 'lab', title: 'Permintaan Lab', subtitle: 'Laboratorium & Pemeriksaan', color: 'purple',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
        { key: 'radiologi', title: 'Permintaan Radiologi', subtitle: 'Radiologi & Imaging', color: 'indigo',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg> }
    ];

    const getTabColorClasses = (color, isActive) => {
        const colors = {
            blue: { active: 'bg-blue-100 text-blue-700 border-blue-500', inactive: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' },
            orange: { active: 'bg-orange-100 text-orange-700 border-orange-500', inactive: 'text-gray-600 hover:text-orange-600 hover:bg-orange-50' },
            green: { active: 'bg-green-100 text-green-700 border-green-500', inactive: 'text-gray-600 hover:text-green-600 hover:bg-green-50' },
            red: { active: 'bg-red-100 text-red-700 border-red-500', inactive: 'text-gray-600 hover:text-red-600 hover:bg-red-50' },
            purple: { active: 'bg-purple-100 text-purple-700 border-purple-500', inactive: 'text-gray-600 hover:text-purple-600 hover:bg-purple-50' },
            indigo: { active: 'bg-indigo-100 text-indigo-700 border-indigo-500', inactive: 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50' }
        };
        return colors[color][isActive ? 'active' : 'inactive'];
    };

    const renderActiveTabContent = () => {
        const commonProps = {
            token: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : '',
            noRkmMedis: params?.no_rkm_medis || rawatInap?.patient?.no_rkm_medis,
            noRawat: params?.no_rawat || rawatInap?.no_rawat
        };

        switch (activeTab) {
            case 'cppt': return <CpptSoap {...commonProps} onOpenResep={() => handleTabChange('resep')} />;
            case 'operasi': return <Operasi {...commonProps} />;
            case 'konsultasi': return <Konsultasi {...commonProps} />;
            case 'tarifTindakan': return <TarifTindakan {...commonProps} />;
            case 'resep': return <Resep {...commonProps} kdPoli={rawatInap?.kd_poli || ''} />;
            case 'diagnosa': return <Diagnosa {...commonProps} />;
            case 'lab': return <PermintaanLab {...commonProps} />;
            case 'radiologi': return <PermintaanRadiologi {...commonProps} />;
            default: return <CpptSoap {...commonProps} />;
        }
    };

    return (
        <LanjutanRalanLayout
            title="Lanjutan Rawat Inap"
            context="ranap"
            menuConfig={{ activeTab, onTabChange: handleTabChange }}
        >
            <Head title={`Lanjutan Rawat Inap${params?.no_rawat ? ' - ' + params.no_rawat : ''}`} />
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Lanjutan Rawat Inap</h1>
                                <p className="text-indigo-100 text-lg">Kelola pemeriksaan dan perawatan intensive pasien</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Patient Info */}
                <div className="bg-white rounded-2xl border shadow-sm mb-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Informasi Pasien
                        </h3>
                    </div>
                    <div className="p-6">
                        {rawatInap?.patient ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                                    <p className="text-xs font-medium text-indigo-600 uppercase">Nama Pasien</p>
                                    <p className="text-sm font-semibold mt-1">{rawatInap.patient.nm_pasien || '-'}</p>
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                                    <p className="text-xs font-medium text-purple-600 uppercase">No. RM</p>
                                    <p className="text-sm font-semibold mt-1 font-mono">{rawatInap.patient.no_rkm_medis || '-'}</p>
                                </div>
                                <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                                    <p className="text-xs font-medium text-pink-600 uppercase">No. Rawat</p>
                                    <p className="text-sm font-semibold mt-1 font-mono">{rawatInap.no_rawat || '-'}</p>
                                </div>
                                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                                    <p className="text-xs font-medium text-orange-600 uppercase">Tanggal Masuk</p>
                                    <p className="text-sm font-semibold mt-1">{rawatInap.tgl_registrasi ? new Date(rawatInap.tgl_registrasi).toLocaleDateString('id-ID') : '-'}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                                <h4 className="text-lg font-semibold text-yellow-800">Data Pasien Tidak Ditemukan</h4>
                                <p className="text-sm text-yellow-600 mt-1">No. Rawat: {params?.no_rawat || '-'}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-2xl border shadow-sm mb-6">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
                        <h3 className="text-lg font-semibold">Menu Perawatan Inap</h3>
                        <p className="text-sm text-gray-500 mt-1">Pilih menu untuk mengelola perawatan pasien</p>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-b">
                        <div className="flex flex-wrap gap-2">
                            {menuTabs.map((tab) => {
                                const isActive = activeTab === tab.key;
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => handleTabChange(tab.key)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${getTabColorClasses(tab.color, isActive)} ${isActive ? 'border-current shadow-sm' : 'border-transparent'}`}
                                    >
                                        {tab.icon}
                                        <span>{tab.title}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left - Medical History */}
                    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden sticky top-6">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 border-b">
                            <button onClick={() => toggle('pemeriksaan')} className="w-full flex items-center justify-between text-left group rounded-lg p-2 transition-all duration-200">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full transition-colors ${openAcc.pemeriksaan ? 'bg-indigo-500' : 'bg-gray-400'}`}></div>
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                    <div>
                                        <h3 className="text-sm font-semibold">Riwayat Perawatan</h3>
                                        <p className="text-xs text-gray-500">History pemeriksaan rawat inap</p>
                                    </div>
                                </div>
                                <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openAcc.pemeriksaan ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                        {openAcc.pemeriksaan && (
                            <div className="p-4 max-h-[700px] overflow-y-auto">
                                <RiwayatPemeriksaan
                                    token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''}
                                    noRawat={params?.no_rawat || rawatInap?.no_rawat}
                                    noRkmMedis={params?.no_rkm_medis || rawatInap?.patient?.no_rkm_medis}
                                />
                            </div>
                        )}
                    </div>

                    {/* Right - Active Tab Content */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl border shadow-sm">
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        {menuTabs.find(tab => tab.key === activeTab)?.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{menuTabs.find(tab => tab.key === activeTab)?.title}</h3>
                                        <p className="text-sm text-gray-500">{menuTabs.find(tab => tab.key === activeTab)?.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>{renderActiveTabContent()}</div>
                    </div>
                </div>
            </div>
        </LanjutanRalanLayout>
    );
}
