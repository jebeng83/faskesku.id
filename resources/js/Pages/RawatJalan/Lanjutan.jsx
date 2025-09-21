import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';
import RiwayatKunjungan from './components/RiwayatKunjungan';
import CpptSoap from './components/CpptSoap';
import Resep from './components/Resep';
import Diagnosa from './components/Diagnosa';
import PermintaanLab from './components/PermintaanLab';
import PermintaanRadiologi from './components/PermintaanRadiologi';
import RiwayatPemeriksaan from './components/RiwayatPemeriksaan';


export default function Lanjutan({ rawatJalan, params }) {

    // Load accordion state from localStorage or use defaults
    const getStoredAccordionState = () => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('accordion-state-' + (rawatJalan?.no_rawat || params?.no_rawat));
            return stored ? JSON.parse(stored) : { pemeriksaan: false };
        }
        return { pemeriksaan: false };
    };

    const getStoredRightState = () => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('accordion-right-state-' + (rawatJalan?.no_rawat || params?.no_rawat));
            return stored ? JSON.parse(stored) : { cppt: false, resep: false, diagnosa: false, lab: false, radiologi: false, quickActions: false };
        }
        return { cppt: false, resep: false, diagnosa: false, lab: false, radiologi: false, quickActions: false };
    };

    const [openAcc, setOpenAcc] = useState(getStoredAccordionState);
    const [openRight, setOpenRight] = useState(getStoredRightState);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [autoSaveStatus, setAutoSaveStatus] = useState('');

    // Simulate loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Auto-save accordion state to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined' && (rawatJalan?.no_rawat || params?.no_rawat)) {
            const debounceTimer = setTimeout(() => {
                localStorage.setItem('accordion-state-' + (rawatJalan?.no_rawat || params?.no_rawat), JSON.stringify(openAcc));
                setAutoSaveStatus('Tersimpan');
                setTimeout(() => setAutoSaveStatus(''), 2000);
            }, 500);
            return () => clearTimeout(debounceTimer);
        }
    }, [openAcc, rawatJalan?.no_rawat, params?.no_rawat]);

    // Auto-save right accordion state to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined' && (rawatJalan?.no_rawat || params?.no_rawat)) {
            const debounceTimer = setTimeout(() => {
                localStorage.setItem('accordion-right-state-' + (rawatJalan?.no_rawat || params?.no_rawat), JSON.stringify(openRight));
                setAutoSaveStatus('Tersimpan');
                setTimeout(() => setAutoSaveStatus(''), 2000);
            }, 500);
            return () => clearTimeout(debounceTimer);
        }
    }, [openRight, rawatJalan?.no_rawat, params?.no_rawat]);
    
    // Membuka salah satu akan menutup yang lain; klik ulang menutup semuanya
    const toggle = (key) => {
        setOpenAcc((prev) => {
            const isOpening = !prev[key];
            const result = isOpening ? { pemeriksaan: false, [key]: true } : { pemeriksaan: false };
            

            
            return result;
        });
    };

    // Toggle right accordion with better behavior
    const toggleRight = (key) => {
        setOpenRight((prev) => {
            const newState = {
                ...prev,
                [key]: !prev[key]
            };
            

            
            return newState;
        });
    };

    // Close all accordions
    const closeAllAccordions = () => {
        setOpenAcc({ pemeriksaan: false });
        setOpenRight({ cppt: false, resep: false, diagnosa: false, lab: false, radiologi: false, quickActions: false });

    };

    // Format tanggal untuk display
    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format jam untuk display
    const formatTime = (time) => {
        if (!time) return '-';
        return time.substring(0, 5); // HH:MM
    };

    // Loading Skeleton Component
    const LoadingSkeleton = () => (
        <div className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-3/4 mb-2"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-1/2"></div>
        </div>
    );

    // Error Component
    const ErrorMessage = ({ message, onRetry }) => (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">Terjadi Kesalahan</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">{message}</p>
                </div>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                    >
                        Coba Lagi
                    </button>
                )}
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <AppLayout>
                <Head title="Loading - Lanjutan Rawat Jalan" />
                <div className="space-y-4 md:space-y-6 -mt-6 -mx-6 p-4 md:p-6 min-h-screen overflow-x-hidden">
                    {/* Loading Breadcrumb */}
                    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <div className="px-6 py-4">
                            <div className="animate-pulse">
                                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-64"></div>
                            </div>
                        </div>
                    </div>

                    {/* Loading Header */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="animate-pulse space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                    <div className="flex-1">
                                        <div className="bg-gray-200 dark:bg-gray-700 h-6 rounded w-48 mb-2"></div>
                                        <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-32"></div>
                                    </div>
                                </div>
                                <div className="bg-gray-200 dark:bg-gray-700 h-20 rounded-lg"></div>
                            </div>
                        </div>
                    </div>

                    {/* Loading Content */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="p-6">
                                    <div className="animate-pulse space-y-4">
                                        <div className="bg-gray-200 dark:bg-gray-700 h-6 rounded w-40"></div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="space-y-2">
                                                    <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded w-24"></div>
                                                    <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-32"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="p-4">
                                        <div className="animate-pulse">
                                            <div className="bg-gray-200 dark:bg-gray-700 h-5 rounded w-32"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title={`Lanjutan Rawat Jalan${params?.no_rawat ? ' - ' + params.no_rawat : ''}`} />

            <div className="space-y-4 md:space-y-6 -mt-6 -mx-6 p-4 md:p-6 min-h-screen overflow-x-hidden">
                {/* Breadcrumb Navigation */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="px-4 md:px-6 py-3 md:py-4">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <Link href={route('dashboard')} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                        <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                        </svg>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                        </svg>
                                        <Link href={route('rawat-jalan.index')} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                                            Rawat Jalan
                                        </Link>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                        </svg>
                                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Lanjutan</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

                {/* Header dengan Informasi Pasien */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-4 md:p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            {/* Auto-save Status Indicator */}
                            {autoSaveStatus && (
                                <div className="mb-4 lg:mb-0 lg:order-last">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {autoSaveStatus}
                                    </div>
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lanjutan Rawat Jalan</h1>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Kelola pemeriksaan dan tindakan medis pasien</p>
                                    </div>
                                </div>
                                
                                {/* Informasi Pasien dalam Card */}
                                {error ? (
                                    <ErrorMessage 
                                        message={error} 
                                        onRetry={() => {
                                            setError(null);
                                            setIsLoading(true);
                                            // Simulate retry
                                            setTimeout(() => setIsLoading(false), 1000);
                                        }} 
                                    />
                                ) : rawatJalan?.patient ? (
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 md:p-4 border border-blue-200 dark:border-blue-800">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                                            <div className="col-span-1">
                                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Nama Pasien</label>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1 break-words">{rawatJalan.patient.nm_pasien || '-'}</p>
                                            </div>
                                            <div className="col-span-1">
                                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">No. Rekam Medis</label>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1 break-all">{rawatJalan.patient.no_rkm_medis || '-'}</p>
                                            </div>
                                            <div className="col-span-1">
                                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">No. Rawat</label>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1 break-all">{rawatJalan.no_rawat || '-'}</p>
                                            </div>
                                            <div className="col-span-1">
                                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Tanggal Registrasi</label>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{formatDate(rawatJalan.tgl_registrasi)}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Status Badge */}
                                        <div className="mt-3 md:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Status Kunjungan</span>
                                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    rawatJalan.status_lanjut === 'Ralan' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                                                    rawatJalan.status_lanjut === 'Ranap' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                                                    'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                                                }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                                        rawatJalan.status_lanjut === 'Ralan' ? 'bg-green-500' :
                                                        rawatJalan.status_lanjut === 'Ranap' ? 'bg-blue-500' :
                                                        'bg-gray-400'
                                                    }`}></div>
                                                    {rawatJalan.status_lanjut || 'Tidak Diketahui'}
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Terakhir diperbarui: {formatTime(new Date().toTimeString())}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 md:p-4 border border-yellow-200 dark:border-yellow-800">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Data Pasien Tidak Ditemukan</p>
                                                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 break-all">No. Rawat: {params?.no_rawat || '-'} | No. RM: {params?.no_rkm_medis || '-'}</p>
                                            </div>
                                            <button
                                                onClick={() => window.location.reload()}
                                                className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition-colors flex-shrink-0"
                                            >
                                                Muat Ulang
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            

                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                    {/* Kolom Kiri - Riwayat Pemeriksaan */}
                    <div className="lg:col-span-1 space-y-3 md:space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">

                        {/* Riwayat Pemeriksaan */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="bg-gray-50 dark:bg-gray-900 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => toggle('pemeriksaan')}
                                    className="w-full flex items-center justify-between text-left group"
                                >
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Riwayat Perawatan</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                                            {openAcc.pemeriksaan ? 'Tutup' : 'Lihat'}
                                        </span>
                                        <svg
                                            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openAcc.pemeriksaan ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            {openAcc.pemeriksaan && (
                                <div className="p-6">
                                    <RiwayatPemeriksaan
                                        token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''}
                                        noRawat={params?.no_rawat || rawatJalan?.no_rawat}
                                        noRkmMedis={params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Kolom Kanan - Menu Pemeriksaan */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Menu Pemeriksaan
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Kelola data pemeriksaan pasien</p>
                            </div>
                            <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto space-y-3 md:space-y-4">
                        {/* Menu: CPPT / SOAP */}
                        <div id="cppt-section" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 px-3 md:px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => toggleRight('cppt')}
                                    className="w-full flex items-center justify-between text-left group hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg p-2 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                                        <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0 transition-colors ${
                                            openRight.cppt ? 'bg-blue-500 shadow-lg shadow-blue-500/30' : 'bg-gray-400'
                                        }`}></div>
                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors block truncate">CPPT / SOAP</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 block truncate">Catatan Perkembangan Pasien</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                                        {openRight.cppt && (
                                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 md:py-1 rounded-full font-medium hidden sm:inline-flex">Aktif</span>
                                        )}
                                        <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">
                                            {openRight.cppt ? 'Tutup' : 'Buka'}
                                        </span>
                                        <svg
                                            className={`w-4 h-4 md:w-5 md:h-5 text-gray-500 transition-transform duration-200 ${openRight.cppt ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            {openRight.cppt && (
                                <div className="p-3 md:p-4 max-h-80 md:max-h-96 overflow-y-auto">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                            <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">Memuat CPPT/SOAP...</span>
                                        </div>
                                    ) : error ? (
                                        <ErrorMessage 
                                            message={error} 
                                            onRetry={() => {
                                                setError(null);
                                                setIsLoading(true);
                                                setTimeout(() => setIsLoading(false), 1000);
                                            }} 
                                        />
                                    ) : (
                                        <div className="space-y-4">
                                            <CpptSoap
                                                token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''}
                                                noRkmMedis={params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis}
                                                noRawat={params?.no_rawat || rawatJalan?.no_rawat}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Menu: Resep */}
                        <div id="resep-section" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 px-3 md:px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => toggleRight('resep')}
                                    className="w-full flex items-center justify-between text-left group hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg p-2 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                                        <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0 transition-colors ${
                                            openRight.resep ? 'bg-green-500 shadow-lg shadow-green-500/30' : 'bg-gray-400'
                                        }`}></div>
                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors block truncate">Resep</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 block truncate">Resep Obat & Farmasi</span>
                                        </div>
                                        {openRight.resep && (
                                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded-full flex-shrink-0">Aktif</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                                        <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">
                                            {openRight.resep ? 'Tutup' : 'Buka'}
                                        </span>
                                        <svg
                                            className={`w-4 h-4 md:w-5 md:h-5 text-gray-500 transition-transform duration-200 ${openRight.resep ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            {openRight.resep && (
                                <div className="p-3 md:p-4 max-h-80 md:max-h-96 overflow-y-auto">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center py-6 md:py-8">
                                            <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-green-600"></div>
                                            <span className="ml-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">Memuat Resep...</span>
                                        </div>
                                    ) : error ? (
                                        <ErrorMessage 
                                            message={error} 
                                            onRetry={() => {
                                                setError(null);
                                                setIsLoading(true);
                                                setTimeout(() => setIsLoading(false), 1000);
                                            }} 
                                        />
                                    ) : (
                                        <div className="space-y-4">
                                            <Resep
                                                token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''}
                                                noRkmMedis={params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis}
                                                noRawat={params?.no_rawat || rawatJalan?.no_rawat}
                                                kdPoli={rawatJalan?.kd_poli || params?.kd_poli || ''}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Menu: Diagnosa */}
                        <div id="diagnosa-section" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 px-3 md:px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => toggleRight('diagnosa')}
                                    className="w-full flex items-center justify-between text-left group hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg p-2 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                                        <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0 transition-colors ${
                                            openRight.diagnosa ? 'bg-red-500 shadow-lg shadow-red-500/30' : 'bg-gray-400'
                                        }`}></div>
                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors block truncate">Diagnosa</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 block truncate">Diagnosis & Kode ICD</span>
                                        </div>
                                        {openRight.diagnosa && (
                                            <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded-full flex-shrink-0">Aktif</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                                        <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">
                                            {openRight.diagnosa ? 'Tutup' : 'Buka'}
                                        </span>
                                        <svg
                                            className={`w-3 h-3 md:w-4 md:h-4 text-gray-500 transition-transform duration-200 ${openRight.diagnosa ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            {openRight.diagnosa && (
                                <div className="p-3 md:p-4">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center py-6 md:py-8">
                                            <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-red-600"></div>
                                            <span className="ml-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">Memuat Diagnosa...</span>
                                        </div>
                                    ) : error ? (
                                        <ErrorMessage 
                                            message={error} 
                                            onRetry={() => {
                                                setError(null);
                                                setIsLoading(true);
                                                setTimeout(() => setIsLoading(false), 1000);
                                            }} 
                                        />
                                    ) : (
                                        <Diagnosa
                                            token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''}
                                            noRkmMedis={params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis}
                                            noRawat={params?.no_rawat || rawatJalan?.no_rawat}
                                        />
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Menu: Permintaan Lab */}
                        <div id="lab-section" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 px-3 md:px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => toggleRight('lab')}
                                    className="w-full flex items-center justify-between text-left group hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg p-2 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                                        <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0 transition-colors ${
                                            openRight.lab ? 'bg-purple-500 shadow-lg shadow-purple-500/30' : 'bg-gray-400'
                                        }`}></div>
                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors block truncate">Permintaan Lab</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 block truncate">Laboratorium & Pemeriksaan</span>
                                        </div>
                                        {openRight.lab && (
                                            <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 px-2 py-0.5 rounded-full flex-shrink-0">Aktif</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                                        <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">
                                            {openRight.lab ? 'Tutup' : 'Buka'}
                                        </span>
                                        <svg
                                            className={`w-4 h-4 md:w-5 md:h-5 text-gray-500 transition-transform duration-200 ${openRight.lab ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            {openRight.lab && (
                                <div className="p-3 md:p-4">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center py-6 md:py-8">
                                            <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-purple-600"></div>
                                            <span className="ml-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">Memuat Permintaan Lab...</span>
                                        </div>
                                    ) : error ? (
                                        <ErrorMessage 
                                            message={error} 
                                            onRetry={() => {
                                                setError(null);
                                                setIsLoading(true);
                                                setTimeout(() => setIsLoading(false), 1000);
                                            }} 
                                        />
                                    ) : (
                                        <PermintaanLab
                                            token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''}
                                            noRkmMedis={params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis}
                                            noRawat={params?.no_rawat || rawatJalan?.no_rawat}
                                        />
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Menu: Permintaan Radiologi */}
                        <div id="radiologi-section" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 px-3 md:px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => toggleRight('radiologi')}
                                    className="w-full flex items-center justify-between text-left group hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg p-2 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                                        <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0 transition-colors ${
                                            openRight.radiologi ? 'bg-indigo-500 shadow-lg shadow-indigo-500/30' : 'bg-gray-400'
                                        }`}></div>
                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                        </svg>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors block truncate">Permintaan Radiologi</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 block truncate">Radiologi & Imaging</span>
                                        </div>
                                        {openRight.radiologi && (
                                            <span className="text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400 px-2 py-0.5 rounded-full flex-shrink-0">Aktif</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                                        <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">
                                            {openRight.radiologi ? 'Tutup' : 'Buka'}
                                        </span>
                                        <svg
                                            className={`w-4 h-4 md:w-5 md:h-5 text-gray-500 transition-transform duration-200 ${openRight.radiologi ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            {openRight.radiologi && (
                                <div className="p-3 md:p-4">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center py-6 md:py-8">
                                            <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-indigo-600"></div>
                                            <span className="ml-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">Memuat Permintaan Radiologi...</span>
                                        </div>
                                    ) : error ? (
                                        <ErrorMessage 
                                            message={error} 
                                            onRetry={() => {
                                                setError(null);
                                                setIsLoading(true);
                                                setTimeout(() => setIsLoading(false), 1000);
                                            }} 
                                        />
                                    ) : (
                                        <PermintaanRadiologi
                                            token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''}
                                            noRkmMedis={params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis}
                                            noRawat={params?.no_rawat || rawatJalan?.no_rawat}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

        </AppLayout>
    );
}


