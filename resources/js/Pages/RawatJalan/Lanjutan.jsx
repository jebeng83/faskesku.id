import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import { motion, useReducedMotion } from "framer-motion";
import LanjutanRalanLayout from "@/Layouts/LanjutanRalanLayout";
import RiwayatPerawatan from "./components/RiwayatPerawatan"; // Updated import
import CpptSoap from "./components/CpptSoap";
import Resep from "./components/Resep";
import Diagnosa from "./components/Diagnosa";
import PermintaanLab from "./components/PermintaanLab";
import PermintaanRadiologi from "./components/PermintaanRadiologi";
import TarifTindakan from "./components/TarifTindakan";
import { getAppTimeZone } from '@/tools/datetime';

export default function Lanjutan({ rawatJalan, params, lastVisitDays, lastVisitDate }) {
    // UI/UX variants (guided by docs/UI_UX_IMPROVEMENTS_GUIDE.md)
    const prefersReducedMotion = useReducedMotion();
    const itemVariants = {
        hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 24, scale: prefersReducedMotion ? 1 : 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const [activeTab, setActiveTab] = useState("cppt");
    const [openAcc, setOpenAcc] = useState({
        pemeriksaan: true,
        kunjungan: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [autoSaveStatus, setAutoSaveStatus] = useState("");
    const [showPatientDetails, setShowPatientDetails] = useState(false);
    const [resepAppendItems, setResepAppendItems] = useState(null);

    const toggle = (section) => {
        setOpenAcc((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        try {
            const tz = getAppTimeZone();
            const date = new Date(dateString);
            return date.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: tz
            });
        } catch (error) {
            return dateString;
        }
    };

    const formatTime = (timeString) => {
        if (!timeString) return "-";
        try {
            return timeString.substring(0, 8);
        } catch (error) {
            return timeString;
        }
    };

    const menuTabs = [
        {
            key: "cppt",
            title: "CPPT / SOAP",
            subtitle: "Catatan Perkembangan Pasien",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ),
            color: "blue",
        },
        {
            key: "tarifTindakan",
            title: "Tarif Tindakan",
            subtitle: "Input Tarif Tindakan Medis",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                </svg>
            ),
            color: "orange",
        },
        {
            key: "resep",
            title: "Resep",
            subtitle: "Resep Obat & Farmasi",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                </svg>
            ),
            color: "green",
        },
        {
            key: "diagnosa",
            title: "Diagnosa",
            subtitle: "Diagnosis & Kode ICD",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ),
            color: "red",
        },
        {
            key: "lab",
            title: "Permintaan Lab",
            subtitle: "Laboratorium & Pemeriksaan",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                </svg>
            ),
            color: "purple",
        },
        {
            key: "radiologi",
            title: "Permintaan Radiologi",
            subtitle: "Radiologi & Imaging",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                </svg>
            ),
            color: "indigo",
        },
    ];

    const getTabColorClasses = (color, isActive) => {
        const colors = {
            blue: {
                active: "bg-blue-100 text-blue-700 border-blue-500",
                inactive: "text-gray-600 hover:text-blue-600 hover:bg-blue-50",
            },
            orange: {
                active: "bg-orange-100 text-orange-700 border-orange-500",
                inactive:
                    "text-gray-600 hover:text-orange-600 hover:bg-orange-50",
            },
            green: {
                active: "bg-green-100 text-green-700 border-green-500",
                inactive:
                    "text-gray-600 hover:text-green-600 hover:bg-green-50",
            },
            red: {
                active: "bg-red-100 text-red-700 border-red-500",
                inactive: "text-gray-600 hover:text-red-600 hover:bg-red-50",
            },
            purple: {
                active: "bg-purple-100 text-purple-700 border-purple-500",
                inactive:
                    "text-gray-600 hover:text-purple-600 hover:bg-purple-50",
            },
            indigo: {
                active: "bg-indigo-100 text-indigo-700 border-indigo-500",
                inactive:
                    "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50",
            },
        };
        return colors[color][isActive ? "active" : "inactive"];
    };

    const renderActiveTabContent = () => {
        const commonProps = {
            token:
                typeof window !== "undefined"
                    ? new URLSearchParams(window.location.search).get("t")
                    : "",
            noRkmMedis:
                params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis,
            noRawat: params?.no_rawat || rawatJalan?.no_rawat,
        };

        switch (activeTab) {
            case "cppt":
                return <CpptSoap {...commonProps} onOpenResep={() => setActiveTab("resep")} appendToPlanning={resepAppendItems} onPlanningAppended={() => setResepAppendItems(null)} />;
            case "tarifTindakan":
                return <TarifTindakan {...commonProps} />;
            case "resep":
                return (
                    <Resep
                        {...commonProps}
                        kdPoli={rawatJalan?.kd_poli || params?.kd_poli || ""}
                        onResepSaved={(items) => {
                            setResepAppendItems(items);
                            setActiveTab("cppt");
                        }}
                    />
                );
            case "diagnosa":
                return <Diagnosa {...commonProps} />;
            case "lab":
                return <PermintaanLab {...commonProps} />;
            case "radiologi":
                return <PermintaanRadiologi {...commonProps} />;
            default:
                return <CpptSoap {...commonProps} />;
        }
    };

    const ErrorMessage = ({ message, onRetry }) => (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <svg
                    className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                        Terjadi Kesalahan
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1 break-words">
                        {message}
                    </p>
                </div>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded transition-colors flex-shrink-0"
                    >
                        Coba Lagi
                    </button>
                )}
            </div>
        </div>
    );

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoSaveStatus) {
                setTimeout(() => setAutoSaveStatus(""), 3000);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [autoSaveStatus]);

    return (
        <LanjutanRalanLayout
            title="Lanjutan Rawat Jalan"
            menuConfig={{
                activeTab,
                onTabChange: handleTabChange,
            }}
        >
            <Head
                title={`Lanjutan Rawat Jalan${
                    params?.no_rawat ? " - " + params.no_rawat : ""
                }`}
            />

            <div className="px-4 sm:px-6 lg:px-8 py-6 w-full overflow-x-hidden mx-auto max-w-[1600px]">
                <div className="mb-1">
                    <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 rounded-lg p-2 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-1 bg-white/20 backdrop-blur rounded-lg">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold">
                                        Pelayanan Rawat Jalan
                                    </h1>
                                </div>
                            </div>
                            {autoSaveStatus && (
                                <div className="bg-white/20 backdrop-blur border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4 text-blue-200"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-sm font-medium text-white">
                                        {autoSaveStatus}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tab Navigation for Menu Pemeriksaan dihilangkan sesuai permintaan */}

                {/* Main Content Area - two columns 50:50 (riwayat : input) */}
                {/* Note: Sidebar (first column) is handled by LanjutanRalanLayout */}
                <div className={`grid grid-cols-1 ${openAcc.pemeriksaan ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-6 w-full max-w-full overflow-x-hidden`}>
                    {/* Left Column - Riwayat Perawatan (scrollable) */}
                    <div className={`transition-all duration-300 w-full lg:overflow-auto ${openAcc.pemeriksaan ? 'lg:col-span-4' : 'hidden lg:hidden'}`}>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden sticky top-3 transition-all duration-300">
                            <div className={`bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${
                                openAcc.pemeriksaan ? "px-4 py-3" : "px-2 py-3"
                            }`}>
                                <button
                                    onClick={() => toggle("pemeriksaan")}
                                    className={`w-full group hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 flex items-center justify-between text-left p-2`}
                                    title={openAcc.pemeriksaan ? "Sembunyikan Riwayat" : "Tampilkan Riwayat"}
                                >
                                    <div className={`flex items-center gap-3 transition-all duration-300`}>
                                        <div
                                            className={`w-3 h-3 rounded-full transition-colors flex-shrink-0 ${
                                                openAcc.pemeriksaan
                                                    ? "bg-blue-500 shadow-lg shadow-blue-500/30"
                                                    : "bg-gray-400"
                                            }`}
                                        ></div>
                                        <svg
                                            className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                            />
                                        </svg>
                                        {openAcc.pemeriksaan && (
                                            <div className="transition-all duration-300">
                                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    Riwayat Perawatan
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    History pemeriksaan
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {openAcc.pemeriksaan && (
                                        <svg
                                            className="w-5 h-5 text-gray-500 transition-transform duration-200 rotate-180 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    )}
                                    {!openAcc.pemeriksaan && (
                                        <svg
                                            className="w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {/* Patient summary under the Riwayat header for large screens */}
                            <div className="hidden lg:block px-2 py-0.5 border-b border-gray-200 dark:border-gray-700">
                                <div className="text-[11px] font-medium text-gray-800 dark:text-gray-200 mb-1">Identitas Pasien</div>
                                <div className="space-y-0 text-[12px] leading-tight">
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="text-left text-gray-700 dark:text-gray-300">Nama</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white font-semibold">{rawatJalan?.patient?.nm_pasien || rawatJalan?.nama_pasien || '-'}</span>
                                    </div>
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="text-left text-gray-700 dark:text-gray-300">Umur</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white">{(rawatJalan?.patient?.umur || rawatJalan?.umurdaftar) ? `${rawatJalan?.patient?.umur || rawatJalan?.umurdaftar} ${rawatJalan?.sttsumur || 'Th'}` : '-'}</span>
                                    </div>
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="text-left text-gray-700 dark:text-gray-300">JK</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white">{rawatJalan?.patient?.jk || '-'}</span>
                                    </div>
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="text-left text-gray-700 dark:text-gray-300">Alamat</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white break-words">
                                            {[
                                                rawatJalan?.patient?.alamat,
                                                rawatJalan?.patient?.kelurahan?.nm_kel || rawatJalan?.patient?.kd_kel,
                                                rawatJalan?.patient?.kecamatan?.nm_kec || rawatJalan?.patient?.kd_kec,
                                                rawatJalan?.patient?.kabupaten?.nm_kab || rawatJalan?.patient?.kd_kab,
                                            ].filter(Boolean).join(', ') || '-'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="text-left text-gray-700 dark:text-gray-300">Cara bayar</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white">{rawatJalan?.penjab?.png_jawab || rawatJalan?.cara_bayar || 'BPJS'}</span>
                                    </div>
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="block mb-1 text-left text-gray-700 dark:text-gray-300">Kunjung Terakhir</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white">
                                            {typeof lastVisitDays === 'number' ? `${lastVisitDays} hari` : '-'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {openAcc.pemeriksaan && (
                                <div className="p-3 max-h-[20rem] overflow-y-auto">
                                    {/* Updated to use the new combined component */}
                                    <RiwayatPerawatan
                                        token={
                                            typeof window !== "undefined"
                                                ? new URLSearchParams(
                                                     window.location.search
                                                 ).get("t")
                                                : ""
                                        }
                                        noRkmMedis={
                                            params?.no_rkm_medis ||
                                            rawatJalan?.patient?.no_rkm_medis
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Input Form Content (50%) */}
                    <div className={`transition-all duration-300 w-full max-w-full overflow-x-hidden min-w-0 ${openAcc.pemeriksaan ? 'lg:col-span-8' : ''}`}>
                        {!openAcc.pemeriksaan && (
                            <div className="flex justify-end mb-2">
                                <button
                                    onClick={() => toggle('pemeriksaan')}
                                    className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700 flex items-center gap-2"
                                    title="Tampilkan Riwayat Perawatan"
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
                        <div className={`space-y-4 w-full max-w-full overflow-x-hidden ${openAcc.pemeriksaan ? 'lg:mt-6' : ''}`}>
                            {/* Tab Content Header */}
                            {activeTab !== 'cppt' && (
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                {
                                                    menuTabs.find(
                                                        (tab) =>
                                                            tab.key === activeTab
                                                    )?.icon
                                                }
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {
                                                        menuTabs.find(
                                                            (tab) =>
                                                                tab.key ===
                                                                activeTab
                                                        )?.title
                                                    }
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                                                    {
                                                        menuTabs.find(
                                                            (tab) =>
                                                                tab.key ===
                                                                activeTab
                                                        )?.subtitle
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tab Content */}
                            <div className="w-full max-w-full overflow-x-hidden">
                                {isLoading ? (
                                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-12">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                            <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                                                Memuat...
                                            </span>
                                        </div>
                                    </div>
                                ) : error ? (
                                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
                                        <ErrorMessage
                                            message={error}
                                            onRetry={() => {
                                                setError(null);
                                                setIsLoading(true);
                                                setTimeout(
                                                    () => setIsLoading(false),
                                                    1000
                                                );
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full max-w-full overflow-x-hidden">
                                        {renderActiveTabContent()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LanjutanRalanLayout>
    );
}
