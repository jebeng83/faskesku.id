import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
    Activity,
    ChartColumn,
    Plus,
    Zap,
    Stethoscope,
    FileText,
    MessageSquare,
    Search,
    RefreshCw,
    User,
    Clock,
    Loader2,
    ChevronRight,
} from "lucide-react";
import LayoutHandover from "@/Layouts/LayoutHandover";
import VitalSignsChart from "@/Pages/RawatJalan/components/VitalSignsChart";
import CpptSoap from "@/Pages/RawatJalan/components/CpptSoap";
import Resep from "@/Pages/RawatInap/components/Resep";
import CatatanKeperawatanRanap from "@/Pages/RawatInap/Catatan/CatatanKeperawatanRanap";
import CatatanObservasiRanap from "@/Pages/RawatInap/Catatan/CatatanObservasiRanap";
import axios from "axios";
import Modal from "@/Components/Modal";

const TabButton = ({ active, onClick, icon: Icon, label, color }) => {
    const colors = {
        indigo: {
            active: "bg-indigo-600 text-white ring-indigo-600 shadow-indigo-500/20",
            inactive: "bg-white/80 dark:bg-gray-800/60 text-slate-600 dark:text-gray-200 ring-slate-200/70 dark:ring-gray-700/60 hover:bg-white dark:hover:bg-gray-800/80"
        },
        emerald: {
            active: "bg-emerald-600 text-white ring-emerald-600 shadow-emerald-500/20",
            inactive: "bg-white/80 dark:bg-gray-800/60 text-slate-600 dark:text-gray-200 ring-slate-200/70 dark:ring-gray-700/60 hover:bg-white dark:hover:bg-gray-800/80"
        },
        amber: {
            active: "bg-amber-600 text-white ring-amber-600 shadow-amber-500/20",
            inactive: "bg-white/80 dark:bg-gray-800/60 text-slate-600 dark:text-gray-200 ring-slate-200/70 dark:ring-gray-700/60 hover:bg-white dark:hover:bg-gray-800/80"
        },
        rose: {
            active: "bg-rose-600 text-white ring-rose-600 shadow-rose-500/20",
            inactive: "bg-white/80 dark:bg-gray-800/60 text-slate-600 dark:text-gray-200 ring-slate-200/70 dark:ring-gray-700/60 hover:bg-white dark:hover:bg-gray-800/80"
        }
    };

    const config = colors[color] || colors.indigo;

    return (
        <button
            onClick={onClick}
            aria-pressed={active}
            className={`flex items-center gap-2 px-4 h-10 rounded-xl text-xs font-black transition-colors ring-1 ring-inset shadow-sm ${active ? config.active : config.inactive}`}
        >
            <Icon className={`w-3.5 h-3.5 ${active ? "text-white" : "text-slate-400 dark:text-gray-400"}`} />
            {label}
        </button>
    );
};

export default function HandOver() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [selectedNoRawat, setSelectedNoRawat] = useState(null);
    const shouldReduceMotion = useReducedMotion();

    const fetchHandoverData = async () => {
        try {
            const res = await axios.get(route('rawat-inap.handover-data'));
            setPatients(res.data.data);
            setLastUpdated(new Date());
        } catch (e) {
            console.error("Failed to fetch handover data", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHandoverData();
        const interval = setInterval(fetchHandoverData, 30000); // Poll every 30s for more "realtime" feel
        return () => clearInterval(interval);
    }, []);

    const filteredPatients = useMemo(() => {
        if (!searchTerm) return patients;
        const lowerSearch = searchTerm.toLowerCase();
        return patients.filter(p =>
            p.patient?.nm_pasien?.toLowerCase().includes(lowerSearch) ||
            p.no_rawat?.toLowerCase().includes(lowerSearch) ||
            p.kamar?.toLowerCase().includes(lowerSearch) ||
            p.nm_bangsal?.toLowerCase().includes(lowerSearch)
        );
    }, [patients, searchTerm]);

    const selectedPatient = useMemo(() => {
        if (!filteredPatients.length) return null;
        if (selectedNoRawat) {
            const found = filteredPatients.find((p) => String(p?.no_rawat || "") === String(selectedNoRawat));
            if (found) return found;
        }
        return filteredPatients[0] || null;
    }, [filteredPatients, selectedNoRawat]);

    useEffect(() => {
        if (!filteredPatients.length) return;
        if (!selectedNoRawat) {
            setSelectedNoRawat(filteredPatients[0]?.no_rawat || null);
            return;
        }
        const exists = filteredPatients.some((p) => String(p?.no_rawat || "") === String(selectedNoRawat));
        if (!exists) setSelectedNoRawat(filteredPatients[0]?.no_rawat || null);
    }, [filteredPatients, selectedNoRawat]);

    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: shouldReduceMotion
                ? { duration: 0 }
                : { staggerChildren: 0.06, delayChildren: 0.02 },
        },
    }), [shouldReduceMotion]);

    const itemVariants = useMemo(() => ({
        hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 },
        visible: shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
        exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.2 } },
    }), [shouldReduceMotion]);

    return (
        <LayoutHandover
            title="Handover Rawat Inap"
            subtitle="Display Monitoring Pasien"
            right={
                <>
                    <div className="relative hidden md:block">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Cari pasien..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-80 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-slate-200/70 dark:ring-gray-700/60 focus:ring-2 focus:ring-indigo-500/40 focus:outline-none transition-colors placeholder:text-slate-400 text-sm h-10 pl-10 pr-3"
                        />
                    </div>
                    <button
                        onClick={() => {
                            setLoading(true);
                            fetchHandoverData();
                        }}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-slate-200/70 dark:ring-gray-700/60 text-slate-700 hover:bg-white hover:text-indigo-600 transition-colors shadow-sm active:scale-95"
                        title="Refresh Data"
                        aria-label="Refresh Data"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    </button>
                </>
            }
        >
            <div className="rounded-3xl p-4 md:p-6 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 ring-1 ring-slate-200/60 dark:ring-gray-800/60 shadow-xl shadow-indigo-500/5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm ring-1 ring-slate-200/60 dark:ring-gray-800/60 text-slate-700 dark:text-gray-200">
                            <Clock className="w-4 h-4 text-indigo-600" />
                            <span className="text-xs font-semibold">Update</span>
                            <span className="text-xs font-black tracking-tight">{lastUpdated.toLocaleTimeString("id-ID")}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm ring-1 ring-slate-200/60 dark:ring-gray-800/60 text-indigo-700 dark:text-indigo-300">
                            <Activity className="w-4 h-4" />
                            <span className="text-xs font-black tracking-tight">{patients.length} Pasien Aktif</span>
                        </div>
                    </div>

                    <div className="relative md:hidden">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Cari pasien..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-slate-200/70 dark:ring-gray-700/60 focus:ring-2 focus:ring-indigo-500/40 focus:outline-none transition-colors placeholder:text-slate-400 text-sm h-10 pl-10 pr-3"
                        />
                    </div>
                </div>

                {loading && patients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                            <Loader2 className="w-14 h-14 text-indigo-500 animate-spin relative z-10" />
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-lg font-black text-slate-800 tracking-tight dark:text-white">
                                Menghimpun Monitoring Pasien
                            </p>
                            <p className="text-sm text-slate-500 font-medium italic dark:text-gray-400">
                                Sedang menyinkronkan data vital sign dan catatan asuhan...
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-4 xl:col-span-3">
                            <div className="rounded-3xl bg-white/90 dark:bg-gray-900/70 backdrop-blur-xl ring-1 ring-slate-200/60 dark:ring-gray-800/60 shadow-xl shadow-indigo-500/5 overflow-hidden">
                                <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100/80 dark:border-gray-800/60">
                                    <div className="min-w-0">
                                        <div className="text-xs font-black tracking-widest text-slate-500 dark:text-gray-400 uppercase">
                                            Daftar Pasien
                                        </div>
                                        <div className="text-sm font-black text-slate-900 dark:text-white truncate">
                                            {filteredPatients.length} hasil
                                        </div>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/40" />
                                </div>

                                {filteredPatients.length === 0 ? (
                                    <div className="py-16 flex flex-col items-center justify-center opacity-60">
                                        <Search className="w-10 h-10 mb-3 text-slate-300" />
                                        <p className="text-sm font-bold text-slate-500">Pasien tidak ditemukan</p>
                                    </div>
                                ) : (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="max-h-[calc(100vh-18rem)] overflow-y-auto"
                                    >
                                        {filteredPatients.map((p) => (
                                            <PatientListItem
                                                key={p.no_rawat}
                                                patient={p}
                                                active={String(selectedPatient?.no_rawat || "") === String(p.no_rawat || "")}
                                                onSelect={() => setSelectedNoRawat(p.no_rawat)}
                                                variants={itemVariants}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-8 xl:col-span-9">
                            <AnimatePresence mode="wait">
                                {selectedPatient ? (
                                    <motion.div
                                        key={selectedPatient.no_rawat}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <PatientHandoverCard patient={selectedPatient} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="empty-detail"
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="rounded-3xl bg-white/90 dark:bg-gray-900/70 backdrop-blur-xl ring-1 ring-slate-200/60 dark:ring-gray-800/60 shadow-xl shadow-indigo-500/5 p-10 flex flex-col items-center justify-center text-center"
                                    >
                                        <User className="w-12 h-12 text-slate-300 mb-4" />
                                        <div className="text-lg font-black text-slate-800 dark:text-white">Pilih pasien</div>
                                        <div className="text-sm text-slate-500 dark:text-gray-400">Klik salah satu pasien untuk melihat detail monitoring</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
        </LayoutHandover>
    );
}

function PatientListItem({ patient, active, onSelect, variants }) {
    const latestVitals = patient.vitals?.[0] || {};
    return (
        <motion.button
            type="button"
            variants={variants}
            onClick={onSelect}
            className={`w-full text-left px-5 py-4 border-b border-slate-100/80 dark:border-gray-800/60 transition-colors ${active ? "bg-indigo-50/80 dark:bg-indigo-950/30" : "hover:bg-slate-50/80 dark:hover:bg-gray-900/60"}`}
        >
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black tracking-widest ring-1 ${active ? "bg-indigo-600 text-white ring-indigo-600" : "bg-white/70 dark:bg-gray-800/60 text-slate-600 dark:text-gray-300 ring-slate-200/70 dark:ring-gray-700/60"}`}>
                            {patient.kamar || "-"}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-gray-500 truncate">
                            {patient.nm_bangsal || "-"}
                        </span>
                    </div>
                    <div className="mt-2 text-sm font-black text-slate-900 dark:text-white truncate">
                        {patient.patient?.nm_pasien || "-"}
                    </div>
                    <div className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-gray-400 truncate">
                        RM {patient.no_rkm_medis || "-"} • {patient.no_rawat || "-"}
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                        <div className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">TD</div>
                        <div className="text-xs font-black text-slate-800 dark:text-gray-200">{latestVitals.td || "-"}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">Nadi</div>
                        <div className="text-xs font-black text-slate-800 dark:text-gray-200">{latestVitals.hr || "-"}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${active ? "text-indigo-600" : "text-slate-300 dark:text-gray-600"}`} />
                </div>
            </div>
        </motion.button>
    );
}

function PatientHandoverCard({ patient }) {
    const [activeTab, setActiveTab] = useState("grafik");
    const [resepOpen, setResepOpen] = useState(false);
    const [catatanKeperawatanOpen, setCatatanKeperawatanOpen] = useState(false);
    const [cpptSoapOpen, setCpptSoapOpen] = useState(false);
    const [observasiOpen, setObservasiOpen] = useState(false);
    const [soapNotes, setSoapNotes] = useState([]);
    const [soapLoading, setSoapLoading] = useState(false);
    const token =
        typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("t") || ""
            : "";
    const patientInitials = useMemo(() => {
        const raw = String(patient?.patient?.nm_pasien || "").trim();
        if (!raw) return "P";
        const parts = raw.split(/\s+/).filter(Boolean);
        const first = parts[0]?.[0] || "";
        const last = parts.length > 1 ? parts[parts.length - 1]?.[0] || "" : "";
        const out = (first + last).toUpperCase();
        return out || "P";
    }, [patient?.patient?.nm_pasien]);

    const vitalsData = useMemo(() => {
        if (!patient.vitals) return [];
        return patient.vitals.map(v => ({
            tgl_perawatan: v.tgl_perawatan,
            jam_rawat: v.jam_rawat,
            suhu_tubuh: v.suhu,
            tensi: v.td,
            nadi: v.hr,
            respirasi: v.rr,
            spo2: v.spo2,
            gcs: v.gcs
        }));
    }, [patient.vitals]);

    const latestVitals = patient.vitals?.[0] || {};

    useEffect(() => {
        let didCancel = false;

        const loadSoap = async () => {
            if (activeTab !== "soap") return;
            if (!patient?.no_rawat) return;
            setSoapLoading(true);
            try {
                const res = await axios.get(route("rawat-inap.pemeriksaan-ranap", { no_rawat: patient.no_rawat }), {
                    headers: { Accept: "application/json" },
                });
                const rows = Array.isArray(res?.data?.data) ? res.data.data : [];
                if (!didCancel) setSoapNotes(rows);
            } catch {
                if (!didCancel) setSoapNotes([]);
            } finally {
                if (!didCancel) setSoapLoading(false);
            }
        };

        loadSoap();
        return () => {
            didCancel = true;
        };
    }, [activeTab, patient?.no_rawat]);

    return (
        <motion.div
            className="group rounded-[36px] bg-white/90 dark:bg-gray-900/70 backdrop-blur-xl ring-1 ring-slate-200/60 dark:ring-gray-800/60 shadow-2xl shadow-indigo-500/10 overflow-hidden flex flex-col h-[680px] lg:h-[calc(100vh-14rem)]"
        >
            {/* Header: Patient Profile */}
            <div className="px-5 pt-5 pb-4 md:px-6 md:pt-6 md:pb-5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_55%)] pointer-events-none" />
                <div className="absolute -top-20 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-28 w-72 h-72 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none -z-10">
                    <User className="w-28 h-28" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/15 flex items-center justify-center text-sm font-black tracking-tight shadow-lg shadow-indigo-500/20">
                                {patientInitials}
                            </div>
                            <div className="min-w-0 flex-1 flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h2 className="text-2xl md:text-3xl font-black truncate leading-none tracking-tight">
                                        {patient.patient?.nm_pasien}
                                    </h2>
                                    <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-white/80">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xl ring-1 ring-white/15">
                                            RM {patient.no_rkm_medis || "-"}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-white/30" />
                                        <span className="truncate">{patient.nm_bangsal || "-"}</span>
                                    </div>
                                </div>

                                <div className="hidden lg:grid grid-cols-3 gap-2.5 flex-shrink-0">
                                    <div className="rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/15 px-2.5 py-2">
                                        <QuickVital label="Suhu" value={latestVitals.suhu} unit="°C" />
                                    </div>
                                    <div className="rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/15 px-2.5 py-2">
                                        <QuickVital label="TD" value={latestVitals.td} unit="" />
                                    </div>
                                    <div className="rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/15 px-2.5 py-2">
                                        <QuickVital label="Nadi" value={latestVitals.hr} unit="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/60" />
                                <span className="px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-white/15">
                                    {patient.kamar || "-"}
                                </span>
                            </div>
                            <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-tight bg-white/10 backdrop-blur-xl ring-1 ring-white/10 text-white/80">
                                {patient.no_rawat || "-"}
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2.5 lg:hidden">
                        <div className="rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/15 px-2.5 py-2">
                            <QuickVital label="Suhu" value={latestVitals.suhu} unit="°C" />
                        </div>
                        <div className="rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/15 px-2.5 py-2">
                            <QuickVital label="TD" value={latestVitals.td} unit="" />
                        </div>
                        <div className="rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/15 px-2.5 py-2">
                            <QuickVital label="Nadi" value={latestVitals.hr} unit="" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-5 py-4 bg-white/90 dark:bg-gray-900/70 backdrop-blur border-b border-slate-100/70 dark:border-gray-800/60">
                <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
                    <TabButton
                        active={activeTab === "grafik"}
                        onClick={() => setActiveTab("grafik")}
                        icon={Activity}
                        label="Grafik"
                        color="indigo"
                    />
                    <TabButton
                        active={activeTab === "advis"}
                        onClick={() => setActiveTab("advis")}
                        icon={Stethoscope}
                        label="Advis"
                        color="emerald"
                    />
                    <button
                        type="button"
                        onClick={() => setResepOpen(true)}
                        className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 dark:bg-gray-800/60 backdrop-blur ring-1 ring-slate-200/70 dark:ring-gray-700/60 text-slate-700 dark:text-gray-200 hover:bg-white hover:text-indigo-600 transition-colors active:scale-95"
                        title="Tambah Resep"
                        aria-label="Tambah Resep"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                    <TabButton
                        active={activeTab === "catatan"}
                        onClick={() => setActiveTab("catatan")}
                        icon={FileText}
                        label="Catatan"
                        color="amber"
                    />
                    <button
                        type="button"
                        onClick={() => setCatatanKeperawatanOpen(true)}
                        className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 dark:bg-gray-800/60 backdrop-blur ring-1 ring-slate-200/70 dark:ring-gray-700/60 text-slate-700 dark:text-gray-200 hover:bg-white hover:text-amber-600 transition-colors active:scale-95"
                        title="Tambah Catatan Keperawatan"
                        aria-label="Tambah Catatan Keperawatan"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                    <TabButton
                        active={activeTab === "observasi"}
                        onClick={() => setActiveTab("observasi")}
                        icon={ChartColumn}
                        label="Observasi"
                        color="indigo"
                    />
                    <button
                        type="button"
                        onClick={() => setObservasiOpen(true)}
                        className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 dark:bg-gray-800/60 backdrop-blur ring-1 ring-slate-200/70 dark:ring-gray-700/60 text-slate-700 dark:text-gray-200 hover:bg-white hover:text-indigo-600 transition-colors active:scale-95"
                        title="Tambah Observasi"
                        aria-label="Tambah Observasi"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                    <TabButton
                        active={activeTab === "soap"}
                        onClick={() => setActiveTab("soap")}
                        icon={MessageSquare}
                        label="SOAP"
                        color="rose"
                    />
                    <button
                        type="button"
                        onClick={() => setCpptSoapOpen(true)}
                        className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 dark:bg-gray-800/60 backdrop-blur ring-1 ring-slate-200/70 dark:ring-gray-700/60 text-slate-700 dark:text-gray-200 hover:bg-white hover:text-rose-600 transition-colors active:scale-95"
                        title="Tambah CPPT/SOAP"
                        aria-label="Tambah CPPT/SOAP"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5 scroll-smooth custom-scrollbar bg-white/80 dark:bg-gray-900/40">
                <AnimatePresence mode="wait">
                    {activeTab === "grafik" && (
                        <motion.div
                            key="grafik"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="h-full flex flex-col space-y-6"
                        >
                            <div className="flex-1 min-h-[240px] bg-slate-50/60 dark:bg-gray-950/30 rounded-3xl p-4 ring-1 ring-slate-200/60 dark:ring-gray-800/60 shadow-inner">
                                {vitalsData.length > 0 ? (
                                    <VitalSignsChart variant="minimal-grid" data={vitalsData} />
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center opacity-30 text-slate-400">
                                        <Activity className="w-16 h-16 mb-4" />
                                        <p className="text-sm font-black uppercase tracking-widest">Belum ada vitals</p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <MetricBox label="GCS" value={latestVitals.gcs} icon={Zap} color="indigo" />
                                <MetricBox label="Kesadaran" value={latestVitals.kesadaran} icon={Activity} color="emerald" />
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "advis" && (
                        <motion.div
                            key="advis"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between px-2">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Advis & Resep</h4>
                                <span className="text-[10px] font-black text-slate-300">Ranap/Ralan</span>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="rounded-[32px] bg-white/90 dark:bg-gray-900/60 backdrop-blur ring-1 ring-slate-200/60 dark:ring-gray-800/60 shadow-sm overflow-hidden">
                                    <div className="p-6 relative overflow-hidden">
                                        <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none" />
                                        <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-indigo-200/35 blur-3xl pointer-events-none" />
                                        <div className="grid grid-cols-[170px_1fr] gap-x-6 gap-y-3 relative z-10">
                                            <div className="text-sm font-black text-slate-900 dark:text-gray-100 truncate">
                                                {patient.soap_dokter?.nm_dokter || patient.dokter?.nm_dokter || "-"}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">RTL</div>
                                                <div className="mt-1 text-sm font-medium text-slate-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                                                    {patient.soap_dokter?.rtl || "-"}
                                                </div>
                                            </div>

                                            <div className="text-[11px] font-bold text-slate-500 dark:text-gray-400">
                                                {patient.soap_dokter?.tgl_perawatan
                                                    ? `${patient.soap_dokter.tgl_perawatan} / ${String(patient.soap_dokter?.jam_rawat || "").slice(0, 5)}`
                                                    : "-"}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-700">Instruksi</div>
                                                <div className="mt-1 text-sm font-medium text-slate-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                                                    {patient.soap_dokter?.instruksi || "-"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-100/80 dark:border-gray-800/60 p-5">
                                        <div className="flex items-center justify-between gap-3 mb-3">
                                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Resep Ranap</div>
                                            <div className="text-[10px] font-black text-slate-400">
                                                {patient.resep_ranap?.no_resep ? `No. Resep ${patient.resep_ranap.no_resep}` : "Tidak ada resep"}
                                            </div>
                                        </div>
                                        {Array.isArray(patient.resep_ranap?.items) && patient.resep_ranap.items.length > 0 ? (
                                            <div className="space-y-2">
                                                {patient.resep_ranap.items.map((it, i) => (
                                                    <div
                                                        key={`${it?.kode_brng || ""}_${i}`}
                                                        className="p-4 rounded-2xl bg-slate-50/70 dark:bg-gray-950/30 ring-1 ring-slate-100/80 dark:ring-gray-800/60"
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="min-w-0">
                                                                <div className="text-xs font-black text-slate-900 dark:text-gray-100 truncate">
                                                                    {it?.nama_brng || it?.kode_brng || "-"}
                                                                </div>
                                                                <div className="mt-1 text-[11px] font-semibold text-slate-600 dark:text-gray-300">
                                                                    {it?.aturan_pakai || "-"}
                                                                </div>
                                                            </div>
                                                            <div className="flex-shrink-0 text-right">
                                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jml</div>
                                                                <div className="text-xs font-black text-slate-900 dark:text-gray-100">{it?.jml ?? "-"}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-6 text-center text-slate-400 text-xs font-bold">
                                                Tidak ada detail obat dari resep ranap.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "catatan" && (
                        <motion.div
                            key="catatan"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between px-2">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Timeline Keperawatan</h4>
                                <span className="text-[10px] font-black text-slate-300">Last 5</span>
                            </div>
                            {patient.nursing_notes?.length > 0 ? (
                                <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-3 before:w-px before:bg-slate-100">
                                    {patient.nursing_notes.map((note, idx) => (
                                        <div key={idx} className="relative pl-8 space-y-2 group/note">
                                            <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-amber-500 shadow-sm z-10 flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                            </div>
                                            <div className="p-5 rounded-[24px] bg-slate-50 border border-slate-100 group-hover/note:bg-white group-hover/note:border-amber-200 group-hover/note:shadow-lg group-hover/note:shadow-amber-500/5 transition-all duration-300">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-[10px] font-black text-amber-600">{note.tanggal} {note.jam}</span>
                                                    <span className="text-[9px] font-bold text-slate-400 tracking-tighter uppercase">{note.nip}</span>
                                                </div>
                                                <p className="text-xs text-slate-700 font-medium leading-relaxed">{note.uraian}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 flex flex-col items-center justify-center text-slate-300 opacity-50">
                                    <FileText className="w-12 h-12 mb-3" />
                                    <p className="text-xs font-black uppercase tracking-widest">No entries yet</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === "observasi" && (
                        <motion.div
                            key="observasi"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between px-2">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Observasi Terbaru</h4>
                                <span className="text-[10px] font-black text-slate-300">Last 10</span>
                            </div>
                            {patient.vitals?.length > 0 ? (
                                <div className="space-y-3">
                                    {patient.vitals.slice(0, 10).map((v, idx) => (
                                        <div
                                            key={`${v.tgl_perawatan || ""}_${v.jam_rawat || ""}_${idx}`}
                                            className="rounded-3xl bg-white/90 dark:bg-gray-900/60 backdrop-blur ring-1 ring-slate-200/60 dark:ring-gray-800/60 p-4"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="min-w-0">
                                                    <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                                        {v.tgl_perawatan || "-"} • {v.jam_rawat || "-"}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100">
                                                        TD {v.td || "-"}
                                                    </span>
                                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                                                        N {v.hr || "-"}
                                                    </span>
                                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-50 text-amber-800 ring-1 ring-amber-100">
                                                        RR {v.rr || "-"}
                                                    </span>
                                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-50 text-rose-700 ring-1 ring-rose-100">
                                                        S {v.suhu || "-"}°C
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 flex flex-col items-center justify-center text-slate-300 opacity-50">
                                    <ChartColumn className="w-12 h-12 mb-3" />
                                    <p className="text-xs font-black uppercase tracking-widest">No Observasi</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === "soap" && (
                        <motion.div
                            key="soap"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between px-2">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600">Riwayat SOAP</h4>
                                <span className="text-[10px] font-black text-slate-300">{soapLoading ? "Loading" : `${soapNotes.length} record`}</span>
                            </div>
                            {soapLoading ? (
                                <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                                    <Loader2 className="w-6 h-6 animate-spin mb-3" />
                                    <p className="text-xs font-black uppercase tracking-widest">Memuat SOAP</p>
                                </div>
                            ) : soapNotes.length > 0 ? (
                                <div className="space-y-4">
                                    {soapNotes.map((row, idx) => {
                                        const rawNama = row?.nama_petugas || row?.nama || "";
                                        const nama = String(rawNama).trim() || row?.nip || "-";
                                        const jam = String(row?.jam_rawat || "").slice(0, 5) || "-";
                                        const tgl = row?.tgl_perawatan || "-";
                                        return (
                                            <div
                                                key={`${row?.tgl_perawatan || ""}_${row?.jam_rawat || ""}_${row?.nip || ""}_${idx}`}
                                                className="rounded-[28px] bg-white/90 dark:bg-gray-900/60 backdrop-blur ring-1 ring-slate-200/60 dark:ring-gray-800/60 p-5"
                                            >
                                                <div className="grid grid-cols-[170px_1fr] gap-5">
                                                    <div className="grid grid-rows-4 gap-2 pr-2">
                                                        <div className="text-xs font-black text-slate-900 dark:text-gray-100 truncate">
                                                            {nama}
                                                        </div>
                                                        <div className="text-[10px] font-black text-slate-400">
                                                            {tgl} • {jam}
                                                        </div>
                                                        <div />
                                                        <div />
                                                    </div>
                                                    <div className="grid grid-rows-4 gap-2">
                                                        <SoapLine letter="S" color="blue" value={row?.keluhan} />
                                                        <SoapLine letter="O" color="emerald" value={row?.pemeriksaan} />
                                                        <SoapLine letter="A" color="amber" value={row?.penilaian} />
                                                        <SoapLine letter="P" color="rose" value={row?.rtl} />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="py-20 flex flex-col items-center justify-center text-slate-300 opacity-50">
                                    <MessageSquare className="w-12 h-12 mb-3" />
                                    <p className="text-xs font-black uppercase tracking-widest">No SOAP record</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Modal
                show={resepOpen}
                onClose={() => setResepOpen(false)}
                title="Resep"
                size="wide"
            >
                <Resep
                    token={token}
                    noRkmMedis={patient.no_rkm_medis}
                    noRawat={patient.no_rawat}
                    kdPoli={patient.kd_poli || ""}
                />
            </Modal>

            <Modal
                show={catatanKeperawatanOpen}
                onClose={() => setCatatanKeperawatanOpen(false)}
                title="Catatan Keperawatan"
                size="wide"
            >
                <CatatanKeperawatanRanap noRawat={patient.no_rawat} useLayout={false} />
            </Modal>

            <Modal
                show={cpptSoapOpen}
                onClose={() => setCpptSoapOpen(false)}
                title="CPPT / SOAP"
                size="wide"
            >
                <CpptSoap
                    token={token}
                    noRkmMedis={patient.no_rkm_medis}
                    noRawat={patient.no_rawat}
                    context="ranap"
                    onOpenResep={() => {
                        setCpptSoapOpen(false);
                        setResepOpen(true);
                    }}
                />
            </Modal>

            <Modal
                show={observasiOpen}
                onClose={() => setObservasiOpen(false)}
                title="Catatan Observasi"
                size="wide"
            >
                <CatatanObservasiRanap noRawat={patient.no_rawat} useLayout={false} />
            </Modal>
        </motion.div>
    );
}

const QuickVital = ({ label, value, unit }) => (
    <div className="flex flex-col">
        <span className="text-[9px] font-black opacity-60 uppercase tracking-widest">{label}</span>
        <div className="flex items-baseline gap-0.5">
            <span className="text-sm font-black">{value || '-'}</span>
            <span className="text-[8px] font-bold opacity-60">{unit}</span>
        </div>
    </div>
);

const MetricBox = ({ label, value, unit, icon: Icon, color, isStatus }) => {
    const colors = {
        indigo: {
            bg: "bg-indigo-50/50",
            border: "border-indigo-100",
            text: "text-indigo-600",
            iconBg: "bg-white",
            iconText: "text-indigo-500",
            iconBorder: "border-indigo-50",
            shadow: "hover:shadow-indigo-500/5"
        },
        emerald: {
            bg: "bg-emerald-50/50",
            border: "border-emerald-100",
            text: "text-emerald-600",
            iconBg: "bg-white",
            iconText: "text-emerald-500",
            iconBorder: "border-emerald-50",
            shadow: "hover:shadow-emerald-500/5"
        },
        rose: {
            bg: "bg-rose-50/50",
            border: "border-rose-100",
            text: "text-rose-600",
            iconBg: "bg-white",
            iconText: "text-rose-500",
            iconBorder: "border-rose-50",
            shadow: "hover:shadow-rose-500/5"
        },
        blue: {
            bg: "bg-blue-50/50",
            border: "border-blue-100",
            text: "text-blue-600",
            iconBg: "bg-white",
            iconText: "text-blue-500",
            iconBorder: "border-blue-50",
            shadow: "hover:shadow-blue-500/5"
        }
    };

    const config = colors[color] || colors.indigo;

    return (
        <div className={`p-4 rounded-[28px] ${config.bg} border ${config.border} flex items-center justify-between group/metric hover:bg-white hover:shadow-xl ${config.shadow} transition-all duration-300`}>
            <div className="space-y-0.5">
                <span className={`text-[9px] font-black ${config.text} uppercase tracking-widest`}>{label}</span>
                <div className="flex items-baseline gap-1">
                    <span className={`text-sm font-black text-slate-800 ${isStatus ? 'text-emerald-600' : ''}`}>{value || '-'}</span>
                    <span className="text-[9px] font-bold text-slate-400">{unit}</span>
                </div>
            </div>
            <div className={`p-2 rounded-xl ${config.iconBg} ${config.iconText} shadow-sm border ${config.iconBorder} group-hover/metric:scale-110 transition-transform`}>
                <Icon className="w-3.5 h-3.5" />
            </div>
        </div>
    );
};

const SoapLine = ({ letter, value, color }) => {
    const colors = {
        blue: "bg-blue-500",
        emerald: "bg-emerald-500",
        amber: "bg-amber-500",
        rose: "bg-rose-500",
    };
    const badge = colors[color] || colors.blue;
    const text = value || "-";

    return (
        <div className="flex items-start justify-between gap-3">
            <div className="text-xs font-medium text-slate-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                {text}
            </div>
            <div className={`w-6 h-6 rounded-xl ${badge} flex items-center justify-center text-[10px] font-black text-white flex-shrink-0`}>
                {letter}
            </div>
        </div>
    );
};
