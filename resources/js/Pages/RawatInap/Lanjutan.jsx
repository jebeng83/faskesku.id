import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import LanjutanRalanLayout from '@/Layouts/LanjutanRalanLayout';
import RiwayatKunjunganRanap from './components/RiwayatKunjungan';
import CpptSoap from './components/CpptSoap';
import Diagnosa from './components/Diagnosa';
import PermintaanLab from './components/PermintaanLab';
import PermintaanRadiologi from './components/PermintaanRadiologi';
import TarifTindakan from './components/TarifTindakan';
import Operasi from './components/Operasi';
import Konsultasi from './components/Konsultasi';
import Resep from './components/Resep';

export default function Lanjutan({ rawatInap, params }) {
    const [activeTab, setActiveTab] = useState('cppt');
    const [openAcc, setOpenAcc] = useState({ riwayatKunjungan: true });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const isRanap = String(rawatInap?.status_lanjut || '').toLowerCase() === 'ranap';

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
            noRawat: params?.no_rawat || rawatInap?.no_rawat,
            kdBangsal: rawatInap?.kd_bangsal || '',
            kdPj: rawatInap?.kd_pj || '',
        };

        switch (activeTab) {
            case 'cppt':
                return <CpptSoap {...commonProps} />;
            case 'operasi':
                return <Operasi {...commonProps} />;
            case 'konsultasi':
                return <Konsultasi {...commonProps} />;
            case 'tarifTindakan':
                return <TarifTindakan {...commonProps} />;
            case 'resep':
                return (
                    <Resep
                        {...commonProps}
                        kdPoli={rawatInap?.kd_poli || params?.kd_poli || ''}
                    />
                );
            case 'diagnosa':
                return <Diagnosa {...commonProps} />;
            case 'lab':
                return <PermintaanLab {...commonProps} />;
            case 'radiologi':
                return <PermintaanRadiologi {...commonProps} />;
            default:
                return <CpptSoap {...commonProps} />;
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

                


                <div className={`grid grid-cols-1 ${openAcc.riwayatKunjungan ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-6 w-full max-w-full overflow-x-hidden items-stretch`}>
                    {isRanap && (
                        <div className={`transition-all duration-300 w-full lg:overflow-auto self-start ${openAcc.riwayatKunjungan ? 'lg:col-span-4' : 'hidden lg:hidden'}`}>
                            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden sticky top-6">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 border-b">
                            <button
                                onClick={() => toggle('riwayatKunjungan')}
                                className="w-full flex items-center justify-between text-left group rounded-lg p-2 transition-all duration-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full transition-colors ${openAcc.riwayatKunjungan ? 'bg-indigo-500' : 'bg-gray-400'}`}></div>
                                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                            <div>
                                                <h3 className="text-sm font-semibold">Riwayat Kunjungan</h3>
                                            </div>
                                        </div>
                                        <svg
                                            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openAcc.riwayatKunjungan ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="hidden lg:block px-2 py-0.5 border-t border-gray-200">
                                    <div className="text-[11px] font-medium text-gray-800 mb-1">Identitas Pasien</div>
                                    <div className="space-y-0 text-[12px] leading-tight">
                                        <div className="grid grid-cols-[7.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                            <span className="text-left text-gray-700">Nama</span>
                                            <span className="text-gray-400 text-center">:</span>
                                            <span className="text-gray-900 font-semibold">
                                                {rawatInap?.patient?.nm_pasien || '-'}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[7.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                            <span className="text-left text-gray-700">No RM (rekamedis)</span>
                                            <span className="text-gray-400 text-center">:</span>
                                            <span className="text-gray-900 font-mono">
                                                {rawatInap?.patient?.no_rkm_medis || params?.no_rkm_medis || '-'}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[7.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                            <span className="text-left text-gray-700">Umur</span>
                                            <span className="text-gray-400 text-center">:</span>
                                            <span className="text-gray-900">
                                                {(rawatInap?.patient?.umur || rawatInap?.umurdaftar)
                                                    ? `${rawatInap?.patient?.umur || rawatInap?.umurdaftar} ${rawatInap?.sttsumur || 'Th'}`
                                                    : '-'}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[7.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                            <span className="text-left text-gray-700">JK</span>
                                            <span className="text-gray-400 text-center">:</span>
                                            <span className="text-gray-900">
                                                {rawatInap?.patient?.jk || '-'}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[7.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                            <span className="text-left text-gray-700">Alamat</span>
                                            <span className="text-gray-400 text-center">:</span>
                                            <span className="text-gray-900 break-words">
                                                {[
                                                    rawatInap?.patient?.alamat,
                                                    rawatInap?.patient?.kelurahan?.nm_kel || rawatInap?.patient?.kd_kel,
                                                    rawatInap?.patient?.kecamatan?.nm_kec || rawatInap?.patient?.kd_kec,
                                                    rawatInap?.patient?.kabupaten?.nm_kab || rawatInap?.patient?.kd_kab,
                                                ].filter(Boolean).join(', ') || '-'}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[7.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                            <span className="text-left text-gray-700">Cara bayar</span>
                                            <span className="text-gray-400 text-center">:</span>
                                            <span className="text-gray-900">
                                                {rawatInap?.penjab?.png_jawab || rawatInap?.cara_bayar || '-'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {openAcc.riwayatKunjungan && (
                                    <div className="p-4 max-h-[700px] overflow-y-auto">
                                        <RiwayatKunjunganRanap
                                            token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''}
                                            noRkmMedis={params?.no_rkm_medis || rawatInap?.patient?.no_rkm_medis}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className={`transition-all duration-300 w-full max-w-full overflow-x-hidden min-w-0 ${openAcc.riwayatKunjungan && isRanap ? 'lg:col-span-8' : ''} flex flex-col h-full`}>
                        {isRanap && !openAcc.riwayatKunjungan && (
                            <div className="flex justify-end mb-2">
                                <button
                                    onClick={() => toggle('riwayatKunjungan')}
                                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded border border-gray-200 flex items-center gap-2"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                    Tampilkan Riwayat
                                </button>
                            </div>
                        )}
                        <div className="space-y-4 w-full max-w-full overflow-x-hidden h-full">
                            {activeTab !== 'cppt' && (
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
                            )}
                            <div>{renderActiveTabContent()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </LanjutanRalanLayout>
    );
}
