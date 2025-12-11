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

export default function Lanjutan({ rawatJalan, params }) {
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
                return <CpptSoap {...commonProps} />;
            case "tarifTindakan":
                return <TarifTindakan {...commonProps} />;
            case "resep":
                return (
                    <Resep
                        {...commonProps}
                        kdPoli={rawatJalan?.kd_poli || params?.kd_poli || ""}
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

            <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-full overflow-x-hidden">
                {/* Header dengan Gradient */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
                                    <svg
                                        className="w-8 h-8 text-white"
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
                                    <h1 className="text-3xl font-bold mb-2">
                                        Pelayanan Rawat Jalan
                                    </h1>
                                </div>
                            </div>
                            {/* Auto-save Status Indicator */}
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

                {/* Informasi Pasien */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm mb-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            Informasi Pasien
                        </h3>
                    </div>
                    <div className="p-6">
                        {error ? (
                            <ErrorMessage
                                message={error}
                                onRetry={() => {
                                    setError(null);
                                    setIsLoading(true);
                                    setTimeout(() => setIsLoading(false), 1000);
                                }}
                            />
                        ) : rawatJalan?.patient ? (
                            <div className="space-y-6">
                                {/* Baris Pertama: Informasi Dasar */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                                                <svg
                                                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                                                    Nama Pasien
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1 truncate">
                                                    {rawatJalan.patient.nm_pasien ||
                                                        "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
                                                <svg
                                                    className="w-5 h-5 text-green-600 dark:text-green-400"
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
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">
                                                    No. Rekam Medis
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1 truncate font-mono">
                                                    {rawatJalan.patient
                                                        .no_rkm_medis || "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
                                                <svg
                                                    className="w-5 h-5 text-purple-600 dark:text-purple-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                                                    No. Rawat
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1 truncate font-mono">
                                                    {rawatJalan.no_rawat || "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-orange-100 dark:bg-orange-800/30 rounded-lg">
                                                <svg
                                                    className="w-5 h-5 text-orange-600 dark:text-orange-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3a4 4 0 118 0v4m-4 4v6m0 0l-3-3m3 3l3-3"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                                                    Tanggal Registrasi
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                                                    {formatDate(
                                                        rawatJalan.tgl_registrasi
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Baris Kedua: Informasi Tambahan */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {/* Umur */}
                                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-indigo-100 dark:bg-indigo-800/30 rounded-lg">
                                                <svg
                                                    className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                                                    Umur
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                                                    {rawatJalan.patient.umur || rawatJalan.umurdaftar 
                                                        ? `${rawatJalan.patient.umur || rawatJalan.umurdaftar} ${rawatJalan.sttsumur || 'Th'}`
                                                        : "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Jenis Kelamin */}
                                    <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 border border-pink-200 dark:border-pink-800">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-pink-100 dark:bg-pink-800/30 rounded-lg">
                                                <svg
                                                    className="w-5 h-5 text-pink-600 dark:text-pink-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-pink-600 dark:text-pink-400 uppercase tracking-wide">
                                                    Jenis Kelamin
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                                                    {rawatJalan.patient.jk === 'L' 
                                                        ? 'Laki-laki' 
                                                        : rawatJalan.patient.jk === 'P' 
                                                        ? 'Perempuan' 
                                                        : rawatJalan.patient.jk || "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Alamat */}
                                    <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-800 lg:col-span-2">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-teal-100 dark:bg-teal-800/30 rounded-lg flex-shrink-0">
                                                <svg
                                                    className="w-5 h-5 text-teal-600 dark:text-teal-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-teal-600 dark:text-teal-400 uppercase tracking-wide">
                                                    Alamat
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1 break-words">
                                                    {rawatJalan.patient.alamat || "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Baris Ketiga: Riwayat Alergi */}
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-red-100 dark:bg-red-800/30 rounded-lg flex-shrink-0">
                                                <svg
                                                    className="w-5 h-5 text-red-600 dark:text-red-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wide mb-2">
                                                    Riwayat Alergi
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white break-words">
                                                    {rawatJalan.alergi || rawatJalan.patient?.alergi || "Tidak ada alergi"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-yellow-100 dark:bg-yellow-800/30 rounded-xl">
                                        <svg
                                            className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                                            Data Pasien Tidak Ditemukan
                                        </h4>
                                        <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                                            No. Rawat: {params?.no_rawat || "-"}{" "}
                                            | No. RM:{" "}
                                            {params?.no_rkm_medis || "-"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            />
                                        </svg>
                                        Muat Ulang
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tab Navigation for Menu Pemeriksaan */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm mb-6 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <svg
                                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <div>
                                <span>Menu Pemeriksaan</span>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-normal mt-1">
                                    Pilih menu untuk mengelola data pemeriksaan
                                </p>
                            </div>
                        </h3>
                    </div>

                    {/* Tab Buttons */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-2">
                            {menuTabs.map((tab) => {
                                const isActive = activeTab === tab.key;
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => handleTabChange(tab.key)}
                                        className={`
                                            flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium text-sm
                                            ${getTabColorClasses(
                                                tab.color,
                                                isActive
                                            )}
                                            ${
                                                isActive
                                                    ? "border-current shadow-sm"
                                                    : "border-transparent"
                                            }
                                        `}
                                    >
                                        {tab.icon}
                                        <span>{tab.title}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main Content Area - Dynamic layout based on collapsed state */}
                {/* Note: Sidebar (first column) is handled by LanjutanRalanLayout */}
                <div className="flex flex-col lg:flex-row gap-6 w-full max-w-full overflow-x-hidden">
                    {/* Middle Column - Medical History (collapsible sidebar) */}
                    <div className={`transition-all duration-300 flex-shrink-0 ${
                        openAcc.pemeriksaan ? "lg:w-[30%]" : "lg:w-16"
                    }`}>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden sticky top-6 transition-all duration-300">
                            <div className={`bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${
                                openAcc.pemeriksaan ? "px-4 py-3" : "px-2 py-3"
                            }`}>
                                <button
                                    onClick={() => toggle("pemeriksaan")}
                                    className={`w-full group hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 ${
                                        openAcc.pemeriksaan 
                                            ? "flex items-center justify-between text-left p-2" 
                                            : "p-2 lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-2 flex items-center justify-between"
                                    }`}
                                    title={openAcc.pemeriksaan ? "Sembunyikan Riwayat" : "Tampilkan Riwayat"}
                                >
                                    <div className={`flex items-center gap-3 transition-all duration-300 ${
                                        openAcc.pemeriksaan ? "" : "lg:flex-col lg:gap-2 lg:w-full"
                                    }`}>
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
                                            className="w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 lg:hidden"
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
                            {openAcc.pemeriksaan && (
                                <div className="p-4 max-h-[calc(100vh-32rem)] min-h-[calc(100vh-28rem)] overflow-y-auto">
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

                    {/* Right Column - Active Tab Content (expands when collapsed) */}
                    <div className={`transition-all duration-300 w-full max-w-full overflow-x-hidden ${
                        openAcc.pemeriksaan ? "lg:flex-1" : "lg:flex-1"
                    }`}>
                        <div className="space-y-4 w-full max-w-full overflow-x-hidden">
                            {/* Tab Content Header */}
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
