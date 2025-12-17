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
    const [selectedNoRawat, setSelectedNoRawat] = useState(params?.no_rawat || rawatJalan?.no_rawat || "");
    const [soapModalOpen, setSoapModalOpen] = useState(false);
    const [soapModalLoading, setSoapModalLoading] = useState(false);
    const [soapModalError, setSoapModalError] = useState("");
    const [soapModalItems, setSoapModalItems] = useState([]);
    const [pegawaiNameMap, setPegawaiNameMap] = useState({});
    const [expandedSoapRows, setExpandedSoapRows] = useState({});
    const [soapViewMode, setSoapViewMode] = useState('table');

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
            noRawat: selectedNoRawat || params?.no_rawat || rawatJalan?.no_rawat,
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

    const openSoapHistoryModal = async () => {
        setSoapModalOpen(true);
        setSoapModalLoading(true);
        setSoapModalError("");
        try {
            const token =
                typeof window !== "undefined"
                    ? new URLSearchParams(window.location.search).get("t")
                    : "";
            const noRkmMedis =
                params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis || "";
            const qs = token
                ? `t=${encodeURIComponent(token)}`
                : `no_rkm_medis=${encodeURIComponent(noRkmMedis)}`;
            const res = await fetch(`/rawat-jalan/riwayat?${qs}`, {
                headers: { Accept: "application/json" },
            });
            const json = await res.json();
            let arr = Array.isArray(json.data) ? json.data : [];
            arr = arr
                .slice()
                .sort(
                    (a, b) =>
                        new Date(b.tgl_registrasi || 0) -
                        new Date(a.tgl_registrasi || 0)
                )
                .slice(0, 5);
            const results = [];
            for (const v of arr) {
                try {
                    const url = route("rawat-jalan.pemeriksaan-ralan", {
                        no_rawat: v.no_rawat,
                    });
                    const r = await fetch(url);
                    const j = await r.json();
                    const list = Array.isArray(j.data) ? j.data : [];
                    const filtered = list && list.length && list.some(row => Object.prototype.hasOwnProperty.call(row, 'no_rawat'))
                        ? list.filter(row => String(row.no_rawat) === String(v.no_rawat))
                        : list;
                    const parse = (x) => {
                        const d = x.tgl_perawatan || "";
                        const t =
                            typeof x.jam_rawat === "string" ? x.jam_rawat : "";
                        const iso = `${d}T${
                            (t.length === 5 ? `${t}:00` : t) || "00:00:00"
                        }`;
                        const dt = new Date(iso);
                        return isNaN(dt.getTime()) ? new Date() : dt;
                    };
                    const sorted = filtered.slice().sort((a, b) => parse(b) - parse(a));
                    const latest = sorted[0] || null;
                    const times = filtered
                        .map((row) => {
                            const s = typeof row.jam_rawat === 'string' ? row.jam_rawat.trim() : '';
                            return s ? s.substring(0, 5) : '';
                        })
                        .filter(Boolean)
                        .sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
                    results.push({ no_rawat: v.no_rawat, tgl_registrasi: v.tgl_registrasi, latest, cpptCount: filtered.length, cpptTimes: times, entries: sorted });
                } catch (_) {}
            }
            setSoapModalItems(results);
        } catch (e) {
            setSoapModalError(e.message || "Gagal memuat riwayat SOAP");
            setSoapModalItems([]);
        } finally {
            setSoapModalLoading(false);
        }
    };

    useEffect(() => {
        const loadPegawaiNames = async () => {
            try {
                const pending = [];
                const seen = new Set();
                for (const h of soapModalItems) {
                    const allNips = [];
                    if (h?.latest?.nip) allNips.push(h.latest.nip);
                    const entries = Array.isArray(h?.entries) ? h.entries : [];
                    for (const e of entries) {
                        if (e?.nip) allNips.push(e.nip);
                    }
                    for (const nip of allNips) {
                        if (!nip) continue;
                        if (pegawaiNameMap && pegawaiNameMap[nip]) continue;
                        if (seen.has(nip)) continue;
                        seen.add(nip);
                        try {
                            const url = route('pegawai.search', { q: nip });
                            pending.push(fetch(url).then(r => r.json()).then(json => {
                                const arr = Array.isArray(json?.data) ? json.data : [];
                                const match = arr.find(row => String(row.nik) === String(nip)) || null;
                                const nama = match ? (match.nama || match.nm_pegawai || '').trim() : '';
                                if (nama && match) {
                                    setPegawaiNameMap((prev) => ({ ...prev, [nip]: nama }));
                                }
                            }).catch(() => {}));
                        } catch (_) {}
                    }
                }
                if (pending.length) {
                    await Promise.allSettled(pending);
                }
            } catch (_) {}
        };
        loadPegawaiNames();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [soapModalItems]);

    const openCpptFromHistory = (nr) => {
        setSelectedNoRawat(nr);
        setActiveTab("cppt");
        setSoapModalOpen(false);
        setTimeout(() => {
            const el = document.getElementById("cppt-root");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
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
                <div className={`grid grid-cols-1 ${openAcc.pemeriksaan ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-6 w-full max-w-full overflow-x-hidden items-stretch`}>
                    {/* Left Column - Riwayat Perawatan (scrollable) */}
                    <div className={`transition-all duration-300 w-full lg:overflow-auto self-start ${openAcc.pemeriksaan ? 'lg:col-span-4' : 'hidden lg:hidden'}`}>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-all duration-300 flex flex-col">
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
                                        <span className="text-left text-gray-700 dark:text-gray-300">No RM (rekamedis)</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white font-mono">{rawatJalan?.patient?.no_rkm_medis || rawatJalan?.no_rkm_medis || '-'}</span>
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
                                    <div className="mt-2">
                                        <button
                                            onClick={openSoapHistoryModal}
                                            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded border border-blue-200"
                                            title="Tampilkan Riwayat SOAP"
                                        >
                                            CPPT
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {openAcc.pemeriksaan && (
                                <div className="p-3">
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
                    <div className={`transition-all duration-300 w-full max-w-full overflow-x-hidden min-w-0 ${openAcc.pemeriksaan ? 'lg:col-span-8' : ''} flex flex-col h-full`}>
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
                        <div className="space-y-4 w-full max-w-full overflow-x-hidden h-full">
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
                            <div className="w-full max-w-full overflow-x-hidden h-full">
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
                                    <div className="w-full max-w-full overflow-x-hidden h-full">
                                        {renderActiveTabContent()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {soapModalOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setSoapModalOpen(false)}
                    ></div>
                    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-full md:max-w-3xl lg:max-w-5xl mx-2 sm:mx-4 my-4 sm:my-8 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Riwayat SOAP</h3>
                            <button
                                onClick={() => setSoapModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-3 sm:p-4 space-y-2">
                            {soapModalLoading ? (
                                <div className="text-xs text-gray-500">Memuat...</div>
                            ) : soapModalError ? (
                                <div className="text-xs text-red-600 dark:text-red-400">{soapModalError}</div>
                            ) : soapModalItems.length === 0 ? (
                                <div className="text-xs text-gray-500">Tidak ada data</div>
                            ) : (
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-4 md:p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                            Riwayat SOAP
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                {soapModalItems.length} record
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setSoapViewMode('table')}
                                                    className={`px-2 py-1 text-[11px] rounded border ${soapViewMode === 'table' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'}`}
                                                    title="Tampilan Tabel"
                                                >
                                                    Tabel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setSoapViewMode('compact')}
                                                    className={`px-2 py-1 text-[11px] rounded border ${soapViewMode === 'compact' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'}`}
                                                    title="Tampilan Kartu"
                                                >
                                                    Kartu
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setSoapViewMode('full')}
                                                    className={`px-2 py-1 text-[11px] rounded border ${soapViewMode === 'full' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'}`}
                                                    title="Tampilan Lengkap"
                                                >
                                                    Lengkap
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {soapViewMode === 'table' ? (
                                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden w-full">
                                            <div className="overflow-x-auto overflow-y-auto max-h-[376px] w-full max-w-full">
                                                    <table className="w-full text-xs table-fixed">
                                                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                                                            <tr className="text-left text-gray-600 dark:text-gray-300">
                                                                <th className="px-3 py-2 font-medium w-44">Tanggal</th>
                                                                <th className="px-3 py-2 font-medium w-36">TTV</th>
                                                                <th className="px-3 py-2 font-medium w-32">Kesadaran</th>
                                                                <th className="px-3 py-2 font-medium w-64">Subjektif</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                            {soapModalItems.map((h) => {
                                                                const latest = h.latest || {};
                                                                let tanggal = '-';
                                                            try {
                                                                if (typeof h.no_rawat === 'string') {
                                                                    const m = h.no_rawat.match(/^(\d{4})\/(\d{2})\/(\d{2})\//);
                                                                    if (m) {
                                                                        const y = m[1];
                                                                        const mm = m[2];
                                                                        const dd = m[3];
                                                                        const dt = new Date(`${y}-${mm}-${dd}T00:00:00`);
                                                                        tanggal = dt.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                                    } else if (h.tgl_registrasi) {
                                                                        tanggal = new Date(h.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                                    }
                                                                } else if (h.tgl_registrasi) {
                                                                    tanggal = new Date(h.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                                }
                                                            } catch (_) {}
                                                            const countDisplay = (() => {
                                                                if (Array.isArray(h.entries)) {
                                                                    const seen = new Set();
                                                                    for (const e of h.entries) {
                                                                        const t = String(e.jam_rawat || '').substring(0,5);
                                                                        if (!t) continue;
                                                                        seen.add(t);
                                                                    }
                                                                    return seen.size || h.entries.length;
                                                                } else if (Array.isArray(h.cpptTimes)) {
                                                                    const uniq = new Set(h.cpptTimes.filter(Boolean));
                                                                    return uniq.size;
                                                                }
                                                                return Number(h.cpptCount || 0);
                                                            })();
                                                            return (
                                                                <>
                                                                    <tr key={`${h.no_rawat}-summary`} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                                        <td className="px-3 py-2" colSpan={4}>
                                                                            <div className="flex items-baseline gap-2">
                                                                                <div className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">{tanggal}</div>
                                                                                <span className="text-[11px] text-gray-700 dark:text-gray-300">{countDisplay} data</span>
                                                                            </div>
                                                                            <div className="mt-1 space-y-0.5 text-[11px] leading-tight">
                                                                                <div className="grid grid-cols-[6.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                                                                    <span className="text-gray-600 dark:text-gray-300">No. Rawat</span>
                                                                                    <span className="text-gray-400 text-center">:</span>
                                                                                    <span className="font-mono text-gray-900 dark:text-white">{h.no_rawat || '-'}</span>
                                                                                </div>
                                                                                <div className="grid grid-cols-[6.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                                                                    <span className="text-gray-600 dark:text-gray-300">CPPT</span>
                                                                                    <span className="text-gray-400 text-center">:</span>
                                                                                    <span className="text-gray-700 dark:text-gray-300 truncate">{`${(Array.isArray(h.entries) ? h.entries.length : (Array.isArray(h.cpptTimes) ? [...new Set(h.cpptTimes)].length : Number(h.cpptCount || 0)))} data${(h.cpptTimes && h.cpptTimes.length) ? ' — ' + h.cpptTimes.join(' , ') : ''}`}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mt-1">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => setExpandedSoapRows((p) => ({ ...p, [h.no_rawat]: !p[h.no_rawat] }))}
                                                                                    className="inline-flex items-center px-2 py-0.5 border border-blue-200 text-[11px] font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
                                                                                >
                                                                                    {expandedSoapRows[h.no_rawat] ? 'Tutup' : 'Detail'}
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    {expandedSoapRows[h.no_rawat] && Array.isArray(h.cpptTimes) && h.cpptTimes.length > 0 && Array.isArray(h.entries) && h.entries.length > 0 && (
                                                                        <tr key={`${h.no_rawat}-details`} className="bg-gray-50/50 dark:bg-gray-800/30">
                                                                            <td colSpan={4} className="px-3 py-2">
                                                                                <div className="overflow-x-auto">
                                                                                    <table className="min-w-full text-[11px]">
                                                                                        <thead>
                                                                                            <tr className="text-left text-gray-600 dark:text-gray-300">
                                                                                                <th className="px-2 py-1 w-44">Tanggal</th>
                                                                                                <th className="px-2 py-1 w-28">TTV</th>
                                                                                                <th className="px-2 py-1 w-28">Kesadaran</th>
                                                                                            <th className="px-2 py-1 w-64">Subjektif</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                                                            {h.entries.slice().sort((a, b) => {
                                                                                                const aa = String(a.jam_rawat || '').substring(0,5);
                                                                                                const bb = String(b.jam_rawat || '').substring(0,5);
                                                                                                return aa < bb ? 1 : aa > bb ? -1 : 0;
                                                                                            }).map((e, i) => (
                                                                                                <tr key={`${h.no_rawat}-e-${i}`}>
                                                                                                    <td className="px-2 py-1 font-mono text-gray-900 dark:text-white">{`${tanggal} ${(typeof e.jam_rawat === 'string' && e.jam_rawat.trim()) ? e.jam_rawat.trim().substring(0,5) : '-'} — ${(e?.nip && pegawaiNameMap[e.nip]) || '-'}`}</td>
                                                                                                    <td className="px-2 py-1 text-gray-700 dark:text-gray-300">
                                                                                                        <div className="grid grid-cols-2 gap-x-2">
                                                                                                            <div className="text-gray-500">Suhu</div>
                                                                                                            <div className="text-right">{e.suhu_tubuh || '-'}°C</div>
                                                                                                            <div className="text-gray-500">Tensi</div>
                                                                                                            <div className="text-right">{e.tensi || '-'}</div>
                                                                                                            <div className="text-gray-500">Nadi</div>
                                                                                                            <div className="text-right">{e.nadi || '-'}/min</div>
                                                                                                            <div className="text-gray-500">SpO2</div>
                                                                                                            <div className="text-right">{e.spo2 || '-'}%</div>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                    <td className="px-2 py-1">
                                                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                                                                            {e.kesadaran || 'Compos Mentis'}
                                                                                                        </span>
                                                                                                    </td>
                                                                                                    <td className="px-2 py-1 text-gray-700 dark:text-gray-300">
                                                                                                        <div className="truncate" title={typeof e.keluhan === 'string' ? e.keluhan.trim() : ''}>
                                                                                                            {(typeof e.keluhan === 'string' && e.keluhan.trim()) ? e.keluhan.trim() : '-'}
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            ))}
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                </>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {soapModalItems.map((h) => {
                                                const latest = h.latest || {};
                                                let tanggal = '-';
                                                try {
                                                    if (typeof h.no_rawat === 'string') {
                                                        const m = h.no_rawat.match(/^(\d{4})\/(\d{2})\/(\d{2})\//);
                                                        if (m) {
                                                            const y = m[1];
                                                            const mm = m[2];
                                                            const dd = m[3];
                                                            const dt = new Date(`${y}-${mm}-${dd}T00:00:00`);
                                                            tanggal = dt.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                        } else if (h.tgl_registrasi) {
                                                            tanggal = new Date(h.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                        }
                                                    } else if (h.tgl_registrasi) {
                                                        tanggal = new Date(h.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                    }
                                                } catch (_) {}
                                                const countDisplay = (() => {
                                                    if (Array.isArray(h.entries)) {
                                                        const seen = new Set();
                                                        for (const e of h.entries) {
                                                            const t = String(e.jam_rawat || '').substring(0,5);
                                                            if (!t) continue;
                                                            seen.add(t);
                                                        }
                                                        return seen.size || h.entries.length;
                                                    } else if (Array.isArray(h.cpptTimes)) {
                                                        const uniq = new Set(h.cpptTimes.filter(Boolean));
                                                        return uniq.size;
                                                    }
                                                    return Number(h.cpptCount || 0);
                                                })();
                                                return (
                                                    <div key={`${h.no_rawat}-card`} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                                                        <div className="grid grid-cols-1 md:grid-cols-[14rem_12rem_1fr] gap-3 items-start">
                                                            <div>
                                                                <div className="flex items-baseline gap-2">
                                                                    <div className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">{tanggal}</div>
                                                                    <span className="text-[11px] text-gray-700 dark:text-gray-300">{countDisplay} data</span>
                                                                </div>
                                                                <div className="mt-1 space-y-0.5 text-[11px] leading-tight">
                                                                    <div className="grid grid-cols-[6.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                                                        <span className="text-gray-600 dark:text-gray-300">No. Rawat</span>
                                                                        <span className="text-gray-400 text-center">:</span>
                                                                        <span className="font-mono text-gray-900 dark:text-white">{h.no_rawat || '-'}</span>
                                                                    </div>
                                                                    <div className="grid grid-cols-[6.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                                                        <span className="text-gray-600 dark:text-gray-300">CPPT</span>
                                                                        <span className="text-gray-400 text-center">:</span>
                                                                        <span className="text-gray-700 dark:text-gray-300 truncate">{`${(Array.isArray(h.entries) ? h.entries.length : (Array.isArray(h.cpptTimes) ? [...new Set(h.cpptTimes)].length : Number(h.cpptCount || 0)))} data${(h.cpptTimes && h.cpptTimes.length) ? ' — ' + h.cpptTimes.join(' , ') : ''}`}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-1">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setExpandedSoapRows((p) => ({ ...p, [h.no_rawat]: !p[h.no_rawat] }))}
                                                                        className="inline-flex items-center px-2 py-0.5 border border-blue-200 text-[11px] font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
                                                                    >
                                                                        {expandedSoapRows[h.no_rawat] ? 'Tutup' : 'Detail'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="text-gray-700 dark:text-gray-300">
                                                                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                                    <div className="text-gray-500">Suhu</div>
                                                                    <div className="font-medium text-right">{latest.suhu_tubuh || '-'}°C</div>
                                                                    <div className="text-gray-500">Tensi</div>
                                                                    <div className="font-medium text-right">{latest.tensi || '-'}</div>
                                                                    <div className="text-gray-500">Nadi</div>
                                                                    <div className="font-medium text-right">{latest.nadi || '-'}/min</div>
                                                                    <div className="text-gray-500">SpO2</div>
                                                                    <div className="font-medium text-right">{latest.spo2 || '-'}%</div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                                    {h.cpptCount ? (latest.kesadaran || 'Compos Mentis') : '-'}
                                                                </span>
                                                                <div className="mt-1 text-gray-700 dark:text-gray-300">
                                                                    {(() => {
                                                                        const keluhanText = typeof latest.keluhan === 'string' ? latest.keluhan.trim() : '';
                                                                        return (
                                                                            <div className="truncate whitespace-nowrap" title={keluhanText}>
                                                                                {keluhanText || '-'}
                                                                            </div>
                                                                        );
                                                                    })()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {expandedSoapRows[h.no_rawat] && Array.isArray(h.entries) && h.entries.length > 0 && (
                                                            <div className="mt-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                                                                {(() => {
                                                                    const uniq = [];
                                                                    const seen = new Set();
                                                                    for (const e of (Array.isArray(h.entries) ? h.entries : [])) {
                                                                        const t = String(e.jam_rawat || '').substring(0,5);
                                                                        if (seen.has(t)) continue;
                                                                        seen.add(t);
                                                                        uniq.push(e);
                                                                    }
                                                                    return uniq.slice().sort((a, b) => {
                                                                        const aa = String(a.jam_rawat || '').substring(0,5);
                                                                        const bb = String(b.jam_rawat || '').substring(0,5);
                                                                        return aa < bb ? 1 : aa > bb ? -1 : 0;
                                                                    }).map((e, i) => (
                                                                        <div key={`${h.no_rawat}-cv-${i}`} className="grid grid-cols-[14rem_12rem_1fr] gap-2 py-1">
                                                                            <div className="font-mono text-gray-900 dark:text-white">{`${tanggal} ${(typeof e.jam_rawat === 'string' && e.jam_rawat.trim()) ? e.jam_rawat.trim().substring(0,5) : '-'} — ${(e?.nip && pegawaiNameMap[e.nip]) || '-'}`}</div>
                                                                            <div className="text-gray-700 dark:text-gray-300">
                                                                                <div className="grid grid-cols-2 gap-x-2">
                                                                                    <div className="text-gray-500">Suhu</div>
                                                                                    <div className="text-right">{e.suhu_tubuh || '-'}°C</div>
                                                                                    <div className="text-gray-500">Tensi</div>
                                                                                    <div className="text-right">{e.tensi || '-'}</div>
                                                                                    <div className="text-gray-500">Nadi</div>
                                                                                    <div className="text-right">{e.nadi || '-'}/min</div>
                                                                                    <div className="text-gray-500">SpO2</div>
                                                                                    <div className="text-right">{e.spo2 || '-'}%</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-gray-700 dark:text-gray-300">
                                                                                <div className="truncate" title={typeof e.keluhan === 'string' ? e.keluhan.trim() : ''}>
                                                                                    {(typeof e.keluhan === 'string' && e.keluhan.trim()) ? e.keluhan.trim() : '-'}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ));
                                                                })()}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {soapViewMode === 'full' && (
                                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden w-full">
                                            <div className="overflow-x-auto overflow-y-auto max-h-[376px] w-full max-w-full">
                                                <table className="w-full text-xs table-fixed">
                                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                                        <tr className="text-left text-gray-600 dark:text-gray-300">
                                                            <th className="px-3 py-2 font-medium w-44">Tanggal</th>
                                                            <th className="px-3 py-2 font-medium w-36">TTV</th>
                                                            <th className="px-3 py-2 font-medium w-32">Kesadaran</th>
                                                            <th className="px-3 py-2 font-medium w-64">Subjektif</th>
                                                            <th className="px-3 py-2 font-medium w-64">Pemeriksaan</th>
                                                            <th className="px-3 py-2 font-medium w-48">Penilaian</th>
                                                            <th className="px-3 py-2 font-medium text-center w-28">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                        {soapModalItems.map((h) => {
                                                            const latest = h.latest || {};
                                                            let tanggal = '-';
                                                            try {
                                                                if (typeof h.no_rawat === 'string') {
                                                                    const m = h.no_rawat.match(/^(\d{4})\/(\d{2})\/(\d{2})\//);
                                                                    if (m) {
                                                                        const y = m[1];
                                                                        const mm = m[2];
                                                                        const dd = m[3];
                                                                        const dt = new Date(`${y}-${mm}-${dd}T00:00:00`);
                                                                        tanggal = dt.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                                    } else if (h.tgl_registrasi) {
                                                                        tanggal = new Date(h.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                                    }
                                                                } else if (h.tgl_registrasi) {
                                                                    tanggal = new Date(h.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                                }
                                                            } catch (_) {}
                                                            return (
                                                                <tr key={`${h.no_rawat}-full`}>
                                                                    <td className="px-3 py-2 w-44">
                                                                        <div className="flex items-baseline gap-2">
                                                                            <div className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">{tanggal}</div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-3 py-2 text-gray-700 dark:text-gray-300 w-36">
                                                                        <div className="space-y-1 text-xs">
                                                                            <div className="flex justify-between">
                                                                                <span className="text-gray-500">Suhu:</span>
                                                                                <span className="font-medium">{latest.suhu_tubuh || '-'}°C</span>
                                                                            </div>
                                                                            <div className="flex justify-between">
                                                                                <span className="text-gray-500">Tensi:</span>
                                                                                <span className="font-medium">{latest.tensi || '-'}</span>
                                                                            </div>
                                                                            <div className="flex justify-between">
                                                                                <span className="text-gray-500">Nadi:</span>
                                                                                <span className="font-medium">{latest.nadi || '-'}/min</span>
                                                                            </div>
                                                                            <div className="flex justify-between">
                                                                                <span className="text-gray-500">SpO2:</span>
                                                                                <span className="font-medium">{latest.spo2 || '-'}%</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-3 py-2 w-32">
                                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                                            {h.cpptCount ? (latest.kesadaran || 'Compos Mentis') : '-'}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-3 py-2 text-gray-700 dark:text-gray-300 w-64">
                                                                        <div className="truncate whitespace-nowrap" title={typeof latest.keluhan === 'string' ? latest.keluhan.trim() : ''}>
                                                                            {(typeof latest.keluhan === 'string' && latest.keluhan.trim()) ? latest.keluhan.trim() : '-'}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-3 py-2 text-gray-700 dark:text-gray-300 w-64">
                                                                        <div className="truncate whitespace-nowrap" title={latest.pemeriksaan || ''}>
                                                                            {latest.pemeriksaan || '-'}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-3 py-2 text-gray-700 dark:text-gray-300 w-48">
                                                                        <div className="truncate whitespace-nowrap" title={latest.penilaian || ''}>
                                                                            {latest.penilaian || '-'}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-3 py-2 w-28">
                                                                        <div className="flex items-center justify-center">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => openCpptFromHistory(h.no_rawat)}
                                                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
                                                                            >
                                                                                Buka
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={openSoapHistoryModal}
                                className="text-[11px] bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700"
                            >
                                Muat
                            </button>
                            <button
                                type="button"
                                onClick={() => setSoapModalOpen(false)}
                                className="text-[11px] bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </LanjutanRalanLayout>
    );
}
