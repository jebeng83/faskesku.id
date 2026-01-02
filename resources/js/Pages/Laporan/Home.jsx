import React, { useDeferredValue, useMemo, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import SidebarLaporan from "@/Layouts/SidebarLaporan";
import { route } from "ziggy-js";
import { motion, useReducedMotion } from "framer-motion";
import { BarChart2, Activity, FileText, ClipboardList, Search, X } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delayChildren: 0.02,
            staggerChildren: 0.06,
            ease: [0.22, 0.61, 0.36, 1],
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.28, ease: "easeOut" },
    },
    hover: {
        y: -3,
        scale: 1.01,
        transition: { type: "spring", stiffness: 240, damping: 22 },
    },
};

const items = [
    {
        title: "Ringkasan Kunjungan",
        description: "Grafik dan rekap kunjungan pasien per poli.",
        href: route("dashboard"),
        icon: BarChart2,
        accent: "from-sky-500 to-indigo-500",
    },
    {
        title: "Kunjungan Ralan",
        description: "Laporan kunjungan rawat jalan dengan filter detail.",
        href: "/laporan/ralan/kunjungan",
        icon: Stethoscope,
        accent: "from-emerald-500 to-teal-500",
    },
    {
        title: "Kunjungan Ranap",
        description: "Laporan kunjungan rawat inap dengan filter bangsal.",
        href: "/laporan/ranap/kunjungan",
        icon: Bed,
        accent: "from-indigo-500 to-purple-500",
    },
    {
        title: "Laporan Keuangan",
        description: "Akses cepat ke laporan neraca dan arus kas.",
        href: "/akutansi/neraca",
        icon: Activity,
        accent: "from-emerald-500 to-teal-500",
    },
    {
        title: "Buku Besar",
        description: "Detail mutasi akun keuangan per periode.",
        href: "/akutansi/buku-besar",
        icon: FileText,
        accent: "from-fuchsia-500 to-pink-500",
    },
    {
        title: "Billing Rawat Jalan",
        description: "Rekap billing dan nota rawat jalan.",
        href: "/akutansi/billing",
        icon: ClipboardList,
        accent: "from-orange-500 to-amber-500",
    },
];

export default function LaporanHome({ summary }) {
    const [search, setSearch] = useState("");
    const [trendMode, setTrendMode] = useState("ralan");
    const deferredSearch = useDeferredValue(search);
    const shouldReduceMotion = useReducedMotion();

    // Stats State
    const [ralanPeriod, setRalanPeriod] = useState('today');
    const [ranapPeriod, setRanapPeriod] = useState('today');
    const [igdPeriod, setIgdPeriod] = useState('today');

    const [ralan, setRalan] = useState(summary?.rawat_jalan || {});
    const [ranap, setRanap] = useState(summary?.rawat_inap || {});
    const [igd, setIgd] = useState(summary?.igd || {});
    
    const [lastUpdate, setLastUpdate] = useState(summary?.updated_at || "-");
    
    const [isLoadingRalan, setIsLoadingRalan] = useState(false);
    const [isLoadingRanap, setIsLoadingRanap] = useState(false);
    const [isLoadingIgd, setIsLoadingIgd] = useState(false);

    const handleFilterChange = async (type, period) => {
        if (type === 'ralan') {
            if (period === ralanPeriod) return;
            setIsLoadingRalan(true);
        } else if (type === 'ranap') {
            if (period === ranapPeriod) return;
            setIsLoadingRanap(true);
        } else if (type === 'igd') {
            if (period === igdPeriod) return;
            setIsLoadingIgd(true);
        }

        try {
            const res = await fetch(route('laporan.stats', { type, period }));
            const data = await res.json();

            if (type === 'ralan') {
                setRalan(data);
                setRalanPeriod(period);
            } else if (type === 'ranap') {
                setRanap(data);
                setRanapPeriod(period);
            } else if (type === 'igd') {
                setIgd(data);
                setIgdPeriod(period);
            }

            const now = new Date();
            setLastUpdate(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            if (type === 'ralan') setIsLoadingRalan(false);
            if (type === 'ranap') setIsLoadingRanap(false);
            if (type === 'igd') setIsLoadingIgd(false);
        }
    };

    const chartRef = useRef(null);
    const [shouldLoadChart, setShouldLoadChart] = useState(false);
    const [poliMonthly, setPoliMonthly] = useState(null);

    useEffect(() => {
        const el = chartRef.current;
        if (!el) return;

        if (typeof IntersectionObserver === "undefined") {
            setShouldLoadChart(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setShouldLoadChart(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!shouldLoadChart) return;
        let active = true;

        const run = async () => {
            try {
                const year = new Date().getFullYear();
                const url = route(
                    "registration.poli-monthly-stats",
                    { year, limit: 6 },
                    false
                );
                const res = await fetch(url, {
                    headers: { Accept: "application/json" },
                });
                const json = await res.json();
                if (active) setPoliMonthly(json?.data || null);
            } catch (e) {
                if (active) setPoliMonthly(null);
            }
        };

        run();
        return () => {
            active = false;
        };
    }, [shouldLoadChart]);

    const filteredItems = useMemo(() => {
        if (!deferredSearch) return items;
        const q = deferredSearch.toLowerCase();
        return items.filter(
            (item) =>
                item.title.toLowerCase().includes(q) ||
                (item.description || "").toLowerCase().includes(q)
        );
    }, [deferredSearch]);

    const motionGridProps = shouldReduceMotion
        ? {}
        : {
              variants: containerVariants,
              initial: "hidden",
              animate: "visible",
          };

    const formatNumber = (n) => new Intl.NumberFormat("id-ID").format(Number(n || 0));
    const formatPct = (n) => {
        const v = Number(n || 0);
        const sign = v > 0 ? "+" : "";
        return `${sign}${v}%`;
    };

    const MetricRow = ({ label, value }) => (
        <div className="flex items-center justify-between gap-4 text-sm">
            <div className="text-gray-600 dark:text-gray-300">{label}</div>
            <div className="font-semibold text-gray-900 dark:text-white tabular-nums">
                {value}
            </div>
        </div>
    );

    const DeltaRow = ({ deltaPct, href, accent = "blue" }) => {
        const v = Number(deltaPct || 0);
        const positive = v >= 0;
        const Icon = positive ? TrendingUp : TrendingDown;
        const color = positive
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-red-600 dark:text-red-400";

        return (
            <div className="flex items-center justify-between gap-3 pt-3 mt-3 border-t border-gray-100 dark:border-gray-800">
                <div className={`flex items-center gap-2 text-xs ${color}`}>
                    <Icon className="h-4 w-4" />
                    <span>vs kemarin {formatPct(v)}</span>
                </div>
                <Link
                    href={href}
                    className={`text-xs font-semibold ${
                        accent === "red"
                            ? "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            : accent === "green"
                              ? "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                              : "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    }`}
                >
                    Lihat Detail →
                </Link>
            </div>
        );
    };

    const Panel = ({
        title,
        icon: Icon,
        iconBg,
        iconColor,
        accentBar,
        children,
        menuAccent,
        currentPeriod,
        onPeriodChange,
        loading
    }) => {
        const periodLabels = {
            today: 'Hari Ini',
            week: 'Minggu Ini',
            month: 'Bulan Ini',
            year: 'Tahun Ini'
        };

        return (
            <div className={`relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm transition-opacity duration-200 ${loading ? 'opacity-60 pointer-events-none' : ''}`}>
                <div className={`absolute inset-x-0 top-0 h-1 ${accentBar}`} />
                <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                            <div
                                className={`shrink-0 inline-flex items-center justify-center rounded-xl ${iconBg} p-2`}
                                aria-hidden="true"
                            >
                                <Icon className={`h-5 w-5 ${iconColor}`} />
                            </div>
                            <div className="min-w-0">
                                <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                    {title}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {periodLabels[currentPeriod] || 'Hari Ini'}
                                </div>
                            </div>
                        </div>
                        <DropdownMenu
                            trigger={
                                <button
                                    type="button"
                                    className={`shrink-0 rounded-lg p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 ${menuAccent}`}
                                    aria-label="Menu"
                                >
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                            }
                            align="end"
                        >
                            {Object.entries(periodLabels).map(([key, label]) => (
                                <DropdownItem
                                    key={key}
                                    onClick={() => onPeriodChange(key)}
                                    className={currentPeriod === key ? 'bg-gray-50 dark:bg-gray-700 font-medium' : ''}
                                >
                                    {label}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </div>
                    <div className="mt-4">{children}</div>
                </div>
            </div>
        );
    };

    const formatNumber = (value) => {
        const n = typeof value === "number" ? value : parseFloat(value || "0");
        return new Intl.NumberFormat("id-ID").format(isNaN(n) ? 0 : n);
    };

    const formatPercent = (value) => {
        const n = typeof value === "number" ? value : parseFloat(value || "0");
        if (!isFinite(n)) return "0%";
        const fixed = Math.round(n * 10) / 10;
        const sign = fixed > 0 ? "+" : "";
        return `${sign}${fixed}%`;
    };

    const renderDelta = (value) => {
        const n = typeof value === "number" ? value : parseFloat(value || "0");
        if (!isFinite(n) || n === 0) {
            return (
                <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1" />
                    Stabil
                </span>
            );
        }
        const positive = n > 0;
        const Icon = positive ? TrendingUp : TrendingDown;
        return (
            <span
                className={
                    "inline-flex items-center text-xs font-medium " +
                    (positive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400")
                }
            >
                <Icon className="w-3 h-3 mr-1" />
                {formatPercent(n)}
            </span>
        );
    };

    const trendData = trendMode === "ralan" ? summary?.tren_ralan : summary?.tren_ranap;

    return (
        <SidebarLaporan title="Laporan">
            <Head title="Laporan" />

            <div className="px-2 sm:px-4 lg:px-6">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                    <div className="min-w-[220px]">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Pusat Laporan
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Akses cepat ke laporan operasional dan keuangan.
                        </p>
                    </div>
                    <div className="w-full sm:w-auto">
                        <div className="relative w-full sm:w-80">
                            <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <Search className="h-5 w-5" />
                            </span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Escape" && search) setSearch("");
                                }}
                                placeholder="Cari laporan..."
                                className="block w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm pl-10 pr-9 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <motion.div
                    {...motionGridProps}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6"
                >
                    {filteredItems.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={cardVariants}
                            whileHover="hover"
                            className="group relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                            />
                            <div className="relative p-5 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="inline-flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 p-2">
                                        <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                                    {item.title}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-1">
                                    {item.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={item.href}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Buka laporan
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </SidebarLaporan>
    );
}
