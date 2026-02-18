import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Head } from '@inertiajs/react';
import LayoutUtama from '@/Pages/LayoutUtama';
import SidebarRawatInapMenu from '@/Components/SidebarRawatInapMenu';
import RiwayatPemeriksaan from './components/RiwayatPemeriksaan';
import CpptSoap from '../RawatJalan/components/CpptSoap';
import Resep from './components/Resep';
import Diagnosa from './components/Diagnosa';
import PermintaanLab from './components/PermintaanLab';
import TarifTindakan from './components/TarifTindakan';
import Konsultasi from './components/Konsultasi';
import CatatanObservasiRanap from './Catatan/CatatanObservasiRanap';

export default function Lanjutan({ rawatInap, params }) {
    const [activeTab, setActiveTab] = useState(params?.tab || 'cppt');
    const [openAcc, setOpenAcc] = useState({ pemeriksaan: true, patientInfo: false });
    const shouldReduceMotion = useReducedMotion();

    const handleTabChange = (tab) => setActiveTab(tab);
    const toggle = (section) => setOpenAcc(prev => ({ ...prev, [section]: !prev[section] }));
    
    useEffect(() => {
        const nextTab = params?.tab || 'cppt';
        setActiveTab((prev) => (prev === nextTab ? prev : nextTab));
    }, [params?.tab]);

    const menuTabs = [
        {
            key: 'cppt', title: 'CPPT / SOAP', subtitle: 'Catatan Perkembangan Pasien', color: 'blue',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        },
        {
            key: 'tarifTindakan', title: 'Tarif Tindakan', subtitle: 'Input Tarif Tindakan Medis', color: 'orange',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
        },
        {
            key: 'resep', title: 'Resep', subtitle: 'Resep Obat & Farmasi', color: 'green',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        },
        {
            key: 'diagnosa', title: 'Diagnosa', subtitle: 'Diagnosis & Kode ICD', color: 'red',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        },
        {
            key: 'lab', title: 'Permintaan Lab', subtitle: 'Laboratorium & Pemeriksaan', color: 'purple',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        },
        {
            key: 'observasi', title: 'Observasi', subtitle: 'Catatan Observasi Pasien', color: 'indigo',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        }
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
            case 'cppt': return <CpptSoap {...commonProps} context="ranap" onOpenResep={() => handleTabChange('resep')} />;
            case 'konsultasi': return <Konsultasi {...commonProps} />;
            case 'tarifTindakan': return <TarifTindakan {...commonProps} />;
            case 'resep': return <Resep {...commonProps} kdPoli={rawatInap?.kd_poli || ''} />;
            case 'diagnosa': return <Diagnosa {...commonProps} kdPj={rawatInap?.kd_pj || rawatInap?.penjab?.kd_pj || ''} />;
            case 'lab': return <PermintaanLab {...commonProps} />;
            case 'observasi': return <CatatanObservasiRanap {...commonProps} />;
            default: return <CpptSoap {...commonProps} context="ranap" />;
        }
    };

    const parseYmdToLocalDate = (ymd) => {
        if (!ymd) return null;
        const s = String(ymd);
        const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
        const d = new Date(s);
        return Number.isNaN(d.getTime()) ? null : d;
    };

    const tglMasukRaw = rawatInap?.tgl_masuk || rawatInap?.tgl_registrasi || '';
    const jamMasukRaw = rawatInap?.jam_masuk || rawatInap?.jam_reg || '';
    const kamarRaw = rawatInap?.nm_bangsal || rawatInap?.kamar || '';

    const lamaInapText = (() => {
        const raw = rawatInap?.lama ?? rawatInap?.lama_inap;
        if (raw !== null && raw !== undefined && String(raw) !== '') return String(raw);
        const start = parseYmdToLocalDate(tglMasukRaw);
        if (!start) return '-';
        const end = parseYmdToLocalDate(rawatInap?.tgl_keluar) || new Date();
        const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        const msPerDay = 24 * 60 * 60 * 1000;
        const diff = Math.floor((endDay.getTime() - startDay.getTime()) / msPerDay) + 1;
        return String(Math.max(1, diff));
    })();

    return (
        <LayoutUtama title="Lanjutan Rawat Inap" left={<SidebarRawatInapMenu title="Rawat Inap" />}>
            <Head title={`Lanjutan Rawat Inap${params?.no_rawat ? ' - ' + params.no_rawat : ''}`} />
            <div className="px-4 sm:px-6 lg:px-8 pt-0 pb-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
                {/* Patient Info */}
                <div className="bg-white/80 dark:bg-gray-900/70 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-indigo-500/5 mb-8 overflow-hidden backdrop-blur-xl">
                    <div className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/60 dark:to-gray-900/60 px-6 py-4 border-b border-gray-200/60 dark:border-gray-800/60 backdrop-blur-sm">
                        <button
                            type="button"
                            onClick={() => toggle('patientInfo')}
                            aria-expanded={!!openAcc.patientInfo}
                            className="w-full flex items-center justify-between text-left rounded-lg transition-all duration-200"
                        >
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Informasi Pasien
                            </h3>
                            <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openAcc.patientInfo ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                    {openAcc.patientInfo && (
                        <div className="p-6">
                            {rawatInap?.patient ? (
                                <div className="space-y-2">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-24 text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0">No Rawat</div>
                                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">:</div>
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white font-mono truncate">{rawatInap?.no_rawat || '-'}</div>
                                        </div>
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-24 text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0">Tgl Masuk</div>
                                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">:</div>
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{tglMasukRaw ? new Date(tglMasukRaw).toLocaleDateString('id-ID') : '-'}</div>
                                        </div>
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-24 text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0">Kamar</div>
                                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">:</div>
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{kamarRaw || '-'}</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-24 text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0">Nama</div>
                                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">:</div>
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{rawatInap?.patient?.nm_pasien || '-'}</div>
                                        </div>
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-24 text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0">Jam Masuk</div>
                                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">:</div>
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{jamMasukRaw || '-'}</div>
                                        </div>
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-24 text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0">Lama Inap</div>
                                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">:</div>
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{lamaInapText}</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                                    <h4 className="text-lg font-semibold text-yellow-800">Data Pasien Tidak Ditemukan</h4>
                                    <p className="text-sm text-yellow-600 mt-1">No. Rawat: {params?.no_rawat || '-'}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Tab Navigation */}
                <div className="bg-white/80 dark:bg-gray-900/70 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-indigo-500/5 mb-6 backdrop-blur-xl">
                    <div className="px-6 py-4 bg-gray-50/60 dark:bg-gray-900/40 border-b border-gray-200/60 dark:border-gray-800/60">
                        <div className="flex flex-wrap gap-2">
                            {menuTabs.map((tab) => {
                                const isActive = activeTab === tab.key;
                                return (
                                    <motion.button
                                        key={tab.key}
                                        onClick={() => handleTabChange(tab.key)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${getTabColorClasses(tab.color, isActive)} ${isActive ? 'border-current shadow-sm' : 'border-transparent'}`}
                                        whileHover={shouldReduceMotion ? undefined : { y: -1, scale: 1.01 }}
                                        whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                                    >
                                        {tab.icon}
                                        <span>{tab.title}</span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-6">
                    {/* Left - Medical History */}
                    <div className="bg-white/80 dark:bg-gray-900/70 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-indigo-500/5 overflow-hidden sticky top-6 backdrop-blur-xl">
                        <div className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-gray-800/60 dark:to-gray-900/60 px-4 py-3 border-b border-gray-200/60 dark:border-gray-800/60 backdrop-blur-sm">
                            <button onClick={() => toggle('pemeriksaan')} className="w-full flex items-center justify-between text-left group rounded-lg p-2 transition-all duration-200 hover:bg-white/60">
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
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                                transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                                className="min-h-[140px]"
                            >
                                {renderActiveTabContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </LayoutUtama>
    );
}
