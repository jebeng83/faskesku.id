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
    const [showPatientDetails, setShowPatientDetails] = useState(false);

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

            <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-full overflow-x-hidden mx-auto max-w-[1600px]">
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
                    <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-300"
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
                            <>
                            {/* Ringkasan utama di atas card */}
                            <button
                                type="button"
                                className="w-full text-left px-3 py-2 text-xs rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mb-3 flex items-center justify-between"
                                onClick={() => setShowPatientDetails((v) => !v)}
                                aria-expanded={showPatientDetails}
                                aria-controls="patient-details-card"
                                title="Klik untuk menampilkan/sembunyikan detail pasien"
                            >
                                <div className="flex-1 flex flex-wrap gap-x-6 gap-y-1 items-baseline">
                                    <div className="flex items-baseline">
                                        <span className="text-gray-900 dark:text-white font-semibold">{rawatJalan.patient?.nm_pasien || rawatJalan.nama_pasien || '-'}</span>
                                    </div>
                                    <div className="flex items-baseline">
                                        <span className="text-gray-900 dark:text-white font-mono font-semibold">{rawatJalan.no_rawat || '-'}</span>
                                    </div>
                                    <div className="flex items-baseline">
                                        <span className="text-gray-900 dark:text-white font-semibold">{(rawatJalan.patient?.umur || rawatJalan.umurdaftar) ? `${rawatJalan.patient?.umur || rawatJalan.umurdaftar} ${rawatJalan.sttsumur || 'Th'}` : '-'}</span>
                                    </div>
                                    <div className="flex items-baseline">
                                        <span className="text-gray-900 dark:text-white font-semibold">{rawatJalan.penjab?.png_jawab || rawatJalan.cara_bayar || 'BPJS'}</span>
                                    </div>
                                </div>
                                <div className="ml-3 shrink-0 flex items-center gap-1 text-gray-600 dark:text-gray-300">
                                    <span className="hidden sm:inline text-[10px]">{showPatientDetails ? 'Sembunyikan' : 'Lihat'} detail</span>
                                    <svg
                                        className={`w-3.5 h-3.5 transition-transform ${showPatientDetails ? 'rotate-180' : 'rotate-0'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>
                            {showPatientDetails && (
                            <section id="patient-details-card" className="rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                                <div className="px-2 py-1 border-b border-gray-200 dark:border-gray-800 text-[11px] font-medium text-gray-800 dark:text-gray-200">
                                    Informasi Pasien
                                </div>
                                <div className="px-2 py-1.5 text-[11px] leading-tight">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">Alergi</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{rawatJalan.alergi || rawatJalan.patient?.alergi || "Tidak ada"}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">No KTP</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{rawatJalan.patient?.no_ktp || "-"}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">Gender</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{rawatJalan.patient?.jk === 'L' ? 'Laki-laki' : rawatJalan.patient?.jk === 'P' ? 'Perempuan' : (rawatJalan.patient?.jk || '-')}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">Gol Darah</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{rawatJalan.patient?.gol_darah || '-'}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">TTL</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{(rawatJalan.patient?.tmp_lahir || '-') + ', ' + (rawatJalan.patient?.tgl_lahir ? formatDate(rawatJalan.patient.tgl_lahir) : '-')}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">Telp</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{rawatJalan.patient?.no_tlp || '-'}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">Pekerjaan</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{rawatJalan.patient?.pekerjaan || '-'}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">Nama Ibu</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{rawatJalan.patient?.namakk || rawatJalan.patient?.nama_ibu || '-'}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">Alamat</span>
                                            <span className="text-gray-900 dark:text-white flex-1 break-words">{rawatJalan.patient?.alamat || '-'}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">Keluarga</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{rawatJalan.patient?.keluarga || '-'}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">Status</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{rawatJalan.patient?.stts_nikah || '-'}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">Agama</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{rawatJalan.patient?.agama || '-'}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">Pekerjaan PJ</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{rawatJalan.pj?.pekerjaan || '-'}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">Alamat PJ</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{rawatJalan.pj?.alamat || '-'}</span>
                                        </div>
                                        <div className="py-0.5 flex items-baseline gap-1">
                                            <span className="basis-32 md:basis-40 text-gray-600 dark:text-gray-300 after:content-[':'] after:ml-0 after:text-gray-400">No Peserta</span>
                                            <span className="text-gray-900 dark:text-white flex-1">{rawatJalan.patient?.no_peserta || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            )}
                            </>
                        ) : (
                            <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                                        <svg
                                            className="w-6 h-6 text-gray-500 dark:text-gray-300"
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
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Data Pasien Tidak Ditemukan
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                            No. Rawat: {params?.no_rawat || "-"}{" "}
                                            | No. RM: {" "}
                                            {params?.no_rkm_medis || "-"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
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

                {/* Tab Navigation for Menu Pemeriksaan dihilangkan sesuai permintaan */}

                {/* Main Content Area - two columns 50:50 (riwayat : input) */}
                {/* Note: Sidebar (first column) is handled by LanjutanRalanLayout */}
                <div className={`grid grid-cols-1 ${openAcc.pemeriksaan ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-6 w-full max-w-full overflow-x-hidden`}>
                    {/* Left Column - Riwayat Perawatan (scrollable) */}
                    <div className={`transition-all duration-300 w-full lg:overflow-auto ${openAcc.pemeriksaan ? '' : 'hidden lg:hidden'}`}>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden sticky top-6 transition-all duration-300">
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
                            {openAcc.pemeriksaan && (
                                <div className="p-4 max-h-[calc(100vh-12rem)] min-h-[calc(100vh-10rem)] overflow-y-auto">
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
                    <div className={`transition-all duration-300 w-full max-w-full overflow-x-hidden min-w-0`}>
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
