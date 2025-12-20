import React, { useEffect, useMemo, useState, useRef, Suspense } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Sparkles,
    BookOpen,
    ArrowRight,
    ShieldCheck,
    Activity,
    ClipboardList,
    Bell,
    CheckCircle2,
    Clock4,
    UserPlus,
    Settings,
    Search,
    FlaskConical,
    Radiation,
    Ambulance,
    Pill,
    Stethoscope,
    Bed,
    LogOut,
    CreditCard,
    Mail,
    Phone,
    MapPin,
    ArrowUp,
    Link as LinkIcon,
    Wallet,
} from "lucide-react";
import { route } from "ziggy-js";

// Lazy-loaded components (code splitting) for heavy sections
const ChartPoliMonthlyLazy = React.lazy(() =>
    import("./DashboardComponents/ChartPoliMonthly")
);
const MonthlyInfoPanelLazy = React.lazy(() =>
    import("./DashboardComponents/MonthlyInfoPanel")
);

// Stats akan dibuat dinamis di dalam komponen menggunakan data dari endpoint

const quickLinks = [
    {
        title: "Pengaturan",
        description: "Kelola konfigurasi aplikasi & bridging",
        href: route("profile.home"),
    },
    {
        title: "Pendaftaran Pasien",
        description: "Registrasi cepat atau tambah pasien baru",
        href: "/registration/lanjutan",
    },
    {
        title: "Monitoring Satusehat",
        description: "Pantau status FHIR & Encounter",
        href: "/satusehat/monitoring",
    },
    {
        title: "Briding",
        description: "Akses modul bridging",
        href: "/pcare",
    },
    {
        title: "PCare & Rujukan",
        description: "Sinkron data PCare dan status rujukan",
        href: "/pcare",
    },
    {
        title: "Rawat Jalan",
        description: "Kelola pemeriksaan & SOAP RME",
        href: "/rawat-jalan",
    },
    {
        title: "Laboratorium",
        description: "Kelola pemeriksaan laboratorium & data hasil",
        href: route("laboratorium.index"),
    },
    {
        title: "Pembayaran",
        description: "Kelola pembayaran Ralan & Ranap",
        href: "/pembayaran",
    },
    {
        title: "Keuangan",
        description: "Kelola Rekening, Jurnal, dan Nota",
        // Arahkan ke halaman Home Akutansi
        href: "/akutansi/home",
    },
];

const timeline = [
    {
        title: "Kunjungan diterima SATUSEHAT",
        meta: "09:42 WIB • Dr. Sita Anindya",
        status: "success",
    },
    {
        title: "Bundle Rajal diproses",
        meta: "09:10 WIB • IGD 01",
        status: "info",
    },
    {
        title: "Token SATUSEHAT diperbarui",
        meta: "08:55 WIB • Otomatis",
        status: "neutral",
    },
];

const updates = [
    {
        label: "IGD",
        text: "Flow triase baru mulai 08:00 - pastikan form SOAP terisi lengkap.",
    },
    {
        label: "Farmasi",
        text: "Resep favorit & stok kritikal kini tersedia di panel farmasi.",
    },
    {
        label: "Keuangan",
        text: "Laporan tarif baru dapat di-export di Pengaturan > Tarif.",
    },
];

function AutoScrollRow({ items, renderItem, speed = 40 }) {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const rafRef = useRef(0);
    const xRef = useRef(0);
    const pausedRef = useRef(false);
    useEffect(() => {
        const cw = containerRef.current ? containerRef.current.clientWidth : 0;
        xRef.current = cw;
        function loop() {
            if (!pausedRef.current) {
                xRef.current -= speed / 60;
                const w = trackRef.current
                    ? trackRef.current.scrollWidth / 2
                    : 0;
                if (xRef.current <= -w) xRef.current = cw;
                if (trackRef.current)
                    trackRef.current.style.transform = `translateX(${xRef.current}px)`;
            }
            rafRef.current = requestAnimationFrame(loop);
        }
        rafRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafRef.current);
    }, [items, speed]);
    return (
        <div ref={containerRef} className="overflow-hidden">
            <div
                ref={trackRef}
                className="flex whitespace-nowrap will-change-transform"
                onMouseEnter={() => (pausedRef.current = true)}
                onMouseLeave={() => (pausedRef.current = false)}
            >
                {items.map((item, idx) => (
                    <span
                        key={`a-${idx}`}
                        className="inline-flex items-center text-sm text-gray-800 dark:text-gray-200 mr-8"
                    >
                        {renderItem(item, idx)}
                    </span>
                ))}
                {items.length > 1 &&
                    items.map((item, idx) => (
                        <span
                            key={`b-${idx}`}
                            className="inline-flex items-center text-sm text-gray-800 dark:text-gray-200 mr-8"
                        >
                            {renderItem(item, idx)}
                        </span>
                    ))}
            </div>
        </div>
    );
}

const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};
// Variants global untuk stagger container & item sesuai panduan UI/UX
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};
const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

// Top navigation bar
const TopNavbar = React.memo(function TopNavbar() {
    const { props } = usePage();
    const instansi =
        props?.settings?.nama_instansi ||
        props?.setting?.nama_instansi ||
        props?.nama_instansi ||
        "Faskesku.id";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-slate-200/70 dark:border-gray-800">
            <div className="w-full -mx-6 sm:-mx-6">
                <div className="h-16 flex items-center justify-between">
                    <Link
                        href="/"
                        className="ml-6 sm:ml-10 md:ml-12 flex items-center font-bold text-slate-800 dark:text-white"
                    >
                        <span
                            className="truncate max-w-[50vw] text-lg sm:text-xl"
                            style={{
                                fontFamily:
                                    '"Expletus Sans", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
                            }}
                        >
                            {instansi}
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            href={route("registration.index")}
                            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                        >
                            <UserPlus className="w-4 h-4 transition-transform group-hover:scale-110" />
                            <span className="relative">
                                Pendaftaran
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                            </span>
                        </Link>
                        <Link
                            href={route("rawat-jalan.index")}
                            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                        >
                            <Stethoscope className="w-4 h-4 transition-transform group-hover:scale-110" />
                            <span className="relative">
                                Rawat Jalan
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                            </span>
                        </Link>
                        <Link
                            href={route("laboratorium.index")}
                            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                        >
                            <FlaskConical className="w-4 h-4 transition-transform group-hover:scale-110" />
                            <span className="relative">
                                Laborat
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                            </span>
                        </Link>
                        <Link
                            href={route("farmasi.permintaan-resep")}
                            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                        >
                            <Pill className="w-4 h-4 transition-transform group-hover:scale-110" />
                            <span className="relative">
                                Farmasi
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                            </span>
                        </Link>
                        <Link
                            href={route("akutansi.kasir-ralan.page")}
                            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                        >
                            <CreditCard className="w-4 h-4 transition-transform group-hover:scale-110" />
                            <span className="relative">
                                Kasir
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                            </span>
                        </Link>
                    </nav>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/docs"
                            className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/30 text-black border border-white/40 hover:bg-white/50 backdrop-blur-sm transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <BookOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
                            <span className="text-sm font-medium">DOC</span>
                        </Link>
                        <button
                            onClick={() => {
                                try {
                                    const form = document.createElement("form");
                                    form.method = "POST";
                                    form.action = route("logout");
                                    const csrfInput =
                                        document.createElement("input");
                                    csrfInput.type = "hidden";
                                    csrfInput.name = "_token";
                                    csrfInput.value =
                                        document
                                            .querySelector(
                                                'meta[name="csrf-token"]'
                                            )
                                            ?.getAttribute("content") || "";
                                    form.appendChild(csrfInput);
                                    document.body.appendChild(form);
                                    form.submit();
                                } catch (error) {
                                    console.error("Logout error:", error);
                                }
                            }}
                            className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/90 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <LogOut className="w-4 h-4 transition-transform group-hover:scale-110" />
                            <span className="text-sm font-medium">Keluar</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
});

// Footer
const Footer = React.memo(function Footer() {
    const year = new Date().getFullYear();
    const { props } = usePage();
    const instansiProp =
        props?.settings?.nama_instansi ||
        props?.setting?.nama_instansi ||
        props?.nama_instansi ||
        "Faskesku.id";

    // Ambil informasi dari tabel `setting` (legacy) untuk menampilkan detail instansi
    const [appSetting, setAppSetting] = useState(null);
    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const url = route("setting.app.index", {}, false);
                const res = await fetch(url, {
                    headers: { Accept: "application/json" },
                });
                const json = await res.json();
                const rows = json?.data || [];
                // Pilih record aktif (aktifkan = Yes/yes), fallback ke record pertama
                const sel =
                    rows.find(
                        (r) => String(r?.aktifkan || "").toLowerCase() === "yes"
                    ) ||
                    rows[0] ||
                    null;
                if (active) setAppSetting(sel);
            } catch (_) {
                if (active) setAppSetting(null);
            }
        })();
        return () => {
            active = false;
        };
    }, []);

    const namaInstansi = appSetting?.nama_instansi || instansiProp;
    const alamat = [
        appSetting?.alamat_instansi,
        appSetting?.kabupaten,
        appSetting?.propinsi,
    ]
        .filter(Boolean)
        .join(", ");
    const email = appSetting?.email || null;
    const kontak = appSetting?.kontak || null;
    const kodePPK = appSetting?.kode_ppk || null;
    // Hapus logo instansi di footer sesuai permintaan; hanya tampilkan nama instansi

    const resolveLoketUrl = () => {
        try {
            if (typeof route === 'function') {
                return route('antrian.loket');
            }
        } catch (_) {}
        try {
            const { protocol, hostname, port } = window.location;
            if (port === '5173') {
                return `${protocol}//${hostname}:8000/antrian/loket`;
            }
            return `${protocol}//${hostname}${port ? ':' + port : ''}/antrian/loket`;
        } catch (_) {
            return '/antrian/loket';
        }
    };

    const resolveDisplayUrl = () => {
        try {
            const { protocol, hostname, port } = window.location;
            const base = `${protocol}//${hostname}`;
            if (port === '5173') {
                return `${base}:8000/antrian/display`;
            }
            return `${base}${port ? ':' + port : ''}/antrian/display`;
        } catch (_) {
            return '/antrian/display';
        }
    };

    const footerLinks = [
        { label: "Loket Antrian", href: resolveLoketUrl(), target: "_blank" },
        { label: "Display TV Loket", href: resolveDisplayUrl(), target: "_blank" },
        { label: "Pendaftaran Pasien", href: "/registration/lanjutan" },
        { label: "Perpustakaan (Dokumen)", href: "/docs" },
        { label: "Berita Sistem", href: "/news" },
        { label: "Kehidupan Faskes", href: "/profile" },
        { label: "Map Faskes", href: "/master-data" },
    ];

    const unitLinks = [
        { label: "SATUSEHAT Monitoring", href: "/satusehat/monitoring" },
        { label: "Penjaminan Mutu (Audit)", href: "/permissions" },
        { label: "Laboratorium", href: route("laboratorium.index") },
        { label: "Radiologi", href: "/radiologi" },
        { label: "Farmasi", href: "/farmasi" },
    ];

    return (
        <footer className="mt-8">
            <div className="max-w-screen-2xl mx-auto px-0">
                <div className="rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl text-slate-800 dark:text-slate-200">
                    <div className="p-6 sm:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Kolom kiri: Identitas instansi */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div>
                                        <div className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300">
                                            Instansi
                                        </div>
                                        <div className="text-base font-semibold">
                                            {namaInstansi}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    {email && (
                                        <div className="flex items-start gap-2">
                                            <Mail className="w-4 h-4 mt-0.5 text-slate-600 dark:text-slate-300" />
                                            <span>{email}</span>
                                        </div>
                                    )}
                                    {kontak && (
                                        <div className="flex items-start gap-2">
                                            <Phone className="w-4 h-4 mt-0.5 text-slate-600 dark:text-slate-300" />
                                            <span>{kontak}</span>
                                        </div>
                                    )}
                                    {alamat && (
                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-4 h-4 mt-0.5 text-slate-600 dark:text-slate-300" />
                                            <span>{alamat}</span>
                                        </div>
                                    )}
                                    {kodePPK && (
                                        <div className="flex items-start gap-2">
                                            <ShieldCheck className="w-4 h-4 mt-0.5 text-slate-600 dark:text-slate-300" />
                                            <span>Kode PPK: {kodePPK}</span>
                                        </div>
                                    )}
                                </div>
                                {/* Ikon sosial (placeholder) */}
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-xs text-slate-600 dark:text-slate-300">
                                        Media Sosial
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-white/60 dark:bg-white/10 ring-1 ring-white/40 dark:ring-white/10">
                                            f
                                        </span>
                                        <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-white/60 dark:bg-white/10 ring-1 ring-white/40 dark:ring-white/10">
                                            ig
                                        </span>
                                        <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-white/60 dark:bg-white/10 ring-1 ring-white/40 dark:ring-white/10">
                                            yt
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Kolom tengah: Quick Link */}
                            <div>
                                <div className="text-lg font-semibold mb-3">
                                    Quick Link
                                </div>
                                <ul className="space-y-2 text-sm">
                                    {footerLinks.map((l) => (
                                        <li key={l.label}>
                                            {l.target ? (
                                                <a
                                                    href={l.href}
                                                    target={l.target}
                                                    rel={l.target === "_blank" ? "noopener noreferrer" : undefined}
                                                    className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-blue-600"
                                                >
                                                    <ArrowRight className="w-4 h-4" />
                                                    <span>{l.label}</span>
                                                </a>
                                            ) : (
                                                <Link
                                                    href={l.href}
                                                    className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-blue-600"
                                                >
                                                    <ArrowRight className="w-4 h-4" />
                                                    <span>{l.label}</span>
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Kolom kanan: Unit / Layanan */}
                            <div>
                                <div className="text-lg font-semibold mb-3">
                                    Layanan Sistem
                                </div>
                                <ul className="space-y-2 text-sm">
                                    {unitLinks.map((l) => (
                                        <li key={l.label}>
                                            <Link
                                                href={l.href}
                                                className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-blue-600"
                                            >
                                                <ArrowRight className="w-4 h-4" />
                                                <span>{l.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bar bawah (hak cipta + tombol atas) dalam panel yang sama */}
                    <div className="border-t border-white/40 dark:border-white/10 px-6 sm:px-10 py-4 flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                            <Stethoscope className="w-4 h-4" />
                            <span>
                                © {year} {namaInstansi} — Privacy & Copyright
                            </span>
                        </div>
                        <a
                            href="#page-top"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/60 dark:bg-white/10 ring-1 ring-white/40 dark:ring-white/10 hover:bg-white/70"
                            aria-label="Kembali ke atas"
                        >
                            <ArrowUp className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
});

export default function Dashboard() {
    const { props } = usePage();
    // Ambil nama instansi dari props yang tersedia
    const namaInstansi =
        props?.settings?.nama_instansi ||
        props?.setting?.nama_instansi ||
        props?.nama_instansi;
    // Gunakan wallpaper dari tabel setting via route streaming; fallback ke file default

    const wallpaperUrl = "/img/wallpaper.png";
    // const wallpaperUrl = namaInstansi
    //     ? route("setting.app.wallpaper", namaInstansi, false)
    //     : "/img/wallpaper.png";
    // Nama faskes akan diambil langsung saat render, tanpa variabel terpisah

    // Reduce motion if user prefers reduced motion
    const [enableMotion, setEnableMotion] = useState(true);
    useEffect(() => {
        try {
            const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
            const apply = () => setEnableMotion(!mq.matches);
            apply();
            mq.addEventListener("change", apply);
            return () => mq.removeEventListener("change", apply);
        } catch (_) {}
    }, []);

    // Lazy-load hero wallpaper only on good network; fallback to gradient if save-data/slow
    const [heroBg, setHeroBg] = useState(null);
    useEffect(() => {
        try {
            const conn =
                navigator.connection ||
                navigator.mozConnection ||
                navigator.webkitConnection;
            const saveData = !!conn?.saveData;
            const slow = ["slow-2g", "2g"].includes(conn?.effectiveType);
            if (saveData || slow) {
                setHeroBg(null);
                return;
            }
        } catch (_) {}
        let active = true;
        const img = new Image();
        img.src = wallpaperUrl;
        img.onload = () => {
            if (active) setHeroBg(wallpaperUrl);
        };
        img.onerror = () => {
            if (active) setHeroBg(null);
        };
        return () => {
            active = false;
        };
    }, [wallpaperUrl]);

    // State untuk jumlah registrasi/pasien hari ini
    const [pasienHariIniCount, setPasienHariIniCount] = useState(null);
    // State untuk jumlah registrasi/pasien kemarin
    const [pasienKemarinCount, setPasienKemarinCount] = useState(null);

    // Ref untuk caching hasil pencarian menu
    const cacheRef = useRef(new Map());

    // Observasi panel chart untuk menunda fetch sampai terlihat di viewport
    const chartSectionRef = useRef(null);
    const [shouldLoadChart, setShouldLoadChart] = useState(false);
    useEffect(() => {
        const el = chartSectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setShouldLoadChart(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Helper format tanggal lokal ke YYYY-MM-DD
    const formatDate = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    };

    // Ambil jumlah registrasi hari ini & kemarin secara paralel untuk mengurangi re-render
    useEffect(() => {
        let mounted = true;
        const run = async () => {
            try {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yStr = formatDate(yesterday);
                const [resToday, resYesterday] = await Promise.all([
                    fetch(
                        route(
                            "registration.get-registrations",
                            { per_page: 1 },
                            false
                        ),
                        { headers: { Accept: "application/json" } }
                    ),
                    fetch(
                        route(
                            "registration.get-registrations",
                            { per_page: 1, date: yStr },
                            false
                        ),
                        { headers: { Accept: "application/json" } }
                    ),
                ]);
                const [jsonToday, jsonYesterday] = await Promise.all([
                    resToday.json(),
                    resYesterday.json(),
                ]);
                if (mounted) {
                    setPasienHariIniCount(jsonToday?.data?.total ?? null);
                    setPasienKemarinCount(jsonYesterday?.data?.total ?? null);
                }
            } catch (e) {
                if (mounted) {
                    setPasienHariIniCount(null);
                    setPasienKemarinCount(null);
                }
            }
        };
        run();
        return () => {
            mounted = false;
        };
    }, []);

    // ===== Grafik batang: kunjungan poli per bulan =====
    const [poliMonthly, setPoliMonthly] = useState(null);
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

    // Pencarian menu (mengadopsi logic dari Landing.jsx)
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;
        const controller = new AbortController();

        const fetchMenus = async () => {
            setLoading(true);
            try {
                const trimmed = query?.trim() ?? "";
                const key = trimmed ? `search:${trimmed}` : `popular:8`;
                const cached = cacheRef.current.get(key);
                if (cached) {
                    if (active) setResults(cached);
                    if (active) setLoading(false);
                    return;
                }
                const url = trimmed
                    ? route("api.menu.search", { q: trimmed })
                    : route("api.menu.popular", { limit: 8 });
                const res = await fetch(url, { signal: controller.signal });
                const json = await res.json();
                const data = json.data || [];
                cacheRef.current.set(key, data);
                if (active) setResults(data);
            } catch (e) {
                if (active) setResults([]);
            } finally {
                if (active) setLoading(false);
            }
        };

        const t = setTimeout(fetchMenus, 250);
        return () => {
            active = false;
            controller.abort();
            clearTimeout(t);
        };
    }, [query]);

    // Helper seperti di Landing.jsx
    const safeRoute = (name, params = {}) => {
        try {
            return route(name, params, false);
        } catch (e) {
            return "#";
        }
    };

    const aliasRoute = (raw) => {
        const slug = String(raw || "")
            .trim()
            .toLowerCase();
        const map = {
            "rawat-jalan": "rawat-jalan.index",
            "rawat inap": "rawat-inap.index",
            "rawat-inap": "rawat-inap.index",
            laboratorium: "laboratorium.index",
            radiologi: "radiologi.index",
            igd: "igd.index",
            farmasi: "farmasi.index",
            registration: "registration.index",
            "reg-periksa": "reg-periksa.index",
            dashboard: "dashboard",
        };
        return map[slug] || raw;
    };

    const getMenuHref = (item) => {
        if (item?.url) {
            try {
                const currentOrigin = window.location?.origin || "";
                const u = new URL(item.url, currentOrigin);
                return u.pathname + u.search + u.hash;
            } catch (_) {
                if (String(item.url).startsWith("/")) return item.url;
                return "/" + String(item.url).replace(/^https?:\/\/[^/]+/, "");
            }
        }
        if (item?.route) {
            const normalized = aliasRoute(item.route);
            return safeRoute(normalized);
        }
        return "#";
    };

    const shortcuts = useMemo(
        () => [
            {
                key: "register",
                label: "Register",
                href: safeRoute("registration.lanjutan"),
                icon: <UserPlus className="w-5 h-5" />,
            },
            {
                key: "bridging",
                label: "Briding",
                href: safeRoute("pcare.index"),
                icon: <LinkIcon className="w-5 h-5" />,
            },
            {
                key: "ugd",
                label: "UGD",
                href: safeRoute("igd.index"),
                icon: <Ambulance className="w-5 h-5" />,
            },
            {
                key: "lab",
                label: "Laboratorium",
                href: safeRoute("laboratorium.index"),
                icon: <FlaskConical className="w-5 h-5" />,
            },
            {
                key: "rad",
                label: "Radiologi",
                href: safeRoute("radiologi.index"),
                icon: <Radiation className="w-5 h-5" />,
            },
            {
                key: "farmasi",
                label: "Farmasi",
                href: safeRoute("farmasi.index"),
                icon: <Pill className="w-5 h-5" />,
            },
            {
                key: "rajal",
                label: "Rawat Jalan",
                href: safeRoute("rawat-jalan.index"),
                icon: <Stethoscope className="w-5 h-5" />,
            },
            {
                key: "ranap",
                label: "Rawat Inap",
                href: safeRoute("rawat-inap.index"),
                icon: <Bed className="w-5 h-5" />,
            },
            {
                key: "keuangan",
                label: "Keuangan",
                // Arahkan ke halaman Home Akutansi
                href: "/akutansi/home",
                icon: <Wallet className="w-5 h-5" />,
            },
            {
                key: "settings",
                label: "Pengaturan",
                href: safeRoute("profile.home", "/profile/home"),
                icon: <Settings className="w-5 h-5" />,
            },
        ],
        []
    );

    // Stats dinamis yang menggunakan hasil dari endpoint
    const trendReady = pasienHariIniCount != null && pasienKemarinCount != null;
    const displayTrend = (() => {
        if (!trendReady) return "Memuat…";
        if (pasienKemarinCount === 0) {
            if (pasienHariIniCount === 0) return "0%";
            return "+∞%"; // tidak terdefinisi (kenaikan dari 0)
        }
        const diff = pasienHariIniCount - pasienKemarinCount;
        const pct = (diff / pasienKemarinCount) * 100;
        const sign = pct > 0 ? "+" : "";
        return `${sign}${pct.toFixed(1)}%`;
    })();

    const stats = [
        {
            label: "Pasien Hari Ini",
            value: pasienHariIniCount ?? "—",
            change: displayTrend,
            accent: "from-emerald-600 to-green-700",
            icon: Activity,
        },
        {
            label: "Kunjungan Terjadwal",
            value: "342",
            change: "+12%",
            accent: "from-teal-600 to-teal-700",
            icon: ClipboardList,
        },
        {
            label: "Integrasi SATUSEHAT",
            value: "Aktif",
            change: "98% sukses",
            accent: "from-green-600 to-emerald-700",
            icon: ShieldCheck,
        },
        {
            label: "Notifikasi Penting",
            value: "6",
            change: "Perlu tindakan",
            accent: "from-amber-600 to-orange-600",
            icon: Bell,
        },
    ];
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    useEffect(() => {
        try {
            const s = localStorage.getItem("dashboardStickyNotes");
            setNotes(s ? JSON.parse(s) : []);
        } catch (_) {}
    }, []);
    useEffect(() => {
        try {
            localStorage.setItem("dashboardStickyNotes", JSON.stringify(notes));
        } catch (_) {}
    }, [notes]);
    const addNote = () => {
        const t = String(newNote || "").trim();
        if (!t) return;
        setNotes((n) => [{ id: Date.now(), text: t }, ...n].slice(0, 20));
        setNewNote("");
    };
    const removeNote = (id) => {
        setNotes((n) => n.filter((i) => i.id !== id));
    };
    const [sipExpiring, setSipExpiring] = useState([]);
    useEffect(() => {
        let active = true;
        const controller = new AbortController();
        (async () => {
            try {
                const res = await fetch("/api/sip-pegawai/expiring", {
                    signal: controller.signal,
                    headers: { Accept: "application/json" },
                });
                const json = await res.json();
                if (!active) return;
                const list = Array.isArray(json?.data) ? json.data : [];
                const seen = new Set();
                const unique = [];
                for (const it of list) {
                    const key = String(
                        it?.nik ?? `${it?.nama ?? ""}|${it?.masa_berlaku ?? ""}`
                    );
                    if (seen.has(key)) continue;
                    seen.add(key);
                    unique.push(it);
                }
                setSipExpiring(unique);
            } catch (_) {
                if (active) setSipExpiring([]);
            }
        })();
        return () => {
            active = false;
            controller.abort();
        };
    }, []);
    const mapLat = Number(props?.map_coords?.latitude);
    const mapLng = Number(props?.map_coords?.longitude);
    const finalLat = Number.isFinite(mapLat) ? mapLat : -7.535561951939349;
    const finalLng = Number.isFinite(mapLng) ? mapLng : 111.05827946682133;
    const embedKey = String(
        import.meta?.env?.VITE_GOOGLE_MAPS_EMBED_KEY || ""
    ).trim();
    const staticOnly =
        String(
            import.meta?.env?.VITE_GOOGLE_MAPS_STATIC_ONLY || ""
        ).toLowerCase() === "true";
    const staticUrl =
        embedKey && staticOnly
            ? `https://maps.googleapis.com/maps/api/staticmap?center=${finalLat},${finalLng}&zoom=17&size=800x480&maptype=roadmap&markers=color:red%7C${finalLat},${finalLng}&key=${encodeURIComponent(
                  embedKey
              )}`
            : "";
    const mapUrl = embedKey
        ? `https://www.google.com/maps/embed/v1/view?key=${encodeURIComponent(
              embedKey
          )}&center=${finalLat},${finalLng}&zoom=17&maptype=roadmap`
        : `https://maps.google.com/maps?ll=${finalLat},${finalLng}&z=17&t=m&hl=id&output=embed`;
    return (
        <>
            <Head title="Faskesku · Selamat Datang">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Expletus+Sans:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <TopNavbar />
            {/* Fullscreen container tanpa sidebar/layout bawaan */}
            <div
                id="page-top"
                className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 dark:from-[#0B1220] dark:via-[#0F172A] dark:to-[#111827] p-6 pt-24 sm:pt-28 relative z-0"
            >
                {/* Overlay tipis untuk meningkatkan kontras teks terhadap background gradient */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.22),transparent_60%)]"
                />
                {/* Wrapper max-w agar konsisten dengan grid 12 kolom (max-w-screen-2xl) */}
                <motion.div
                    className="relative z-10 max-w-screen-2xl mx-auto space-y-8"
                    variants={containerVariants}
                    initial={enableMotion ? "hidden" : false}
                    animate={enableMotion ? "visible" : false}
                >
                    <div className="fixed top-20 right-4 z-40 hidden md:block">
                        <div className="relative w-64">
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-red-600 rounded-full shadow ring-2 ring-red-300 z-50" />
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-5 bg-red-700 rounded-full blur-[0.5px] z-50" />
                            <div className="absolute -left-3 -bottom-3 w-full h-full rounded-md bg-yellow-200 ring-1 ring-yellow-300 -rotate-2 shadow -z-10 pointer-events-none" />
                            <div className="relative rounded-md bg-yellow-100 ring-1 ring-yellow-300 shadow-xl rotate-1 z-30 mt-2">
                                <div className="rounded-t-md bg-yellow-200/60 ring-1 ring-yellow-300 px-3 py-2 text-xs font-semibold text-slate-800">
                                    Sticky Notes
                                </div>
                                <div className="px-3 pt-2 pb-3 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            value={newNote}
                                            onChange={(e) =>
                                                setNewNote(e.target.value)
                                            }
                                            placeholder="Tulis catatan…"
                                            className="flex-1 rounded-sm border border-yellow-300 bg-yellow-50 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                                        />
                                        <button
                                            onClick={addNote}
                                            className="rounded-sm bg-amber-500 hover:bg-amber-600 text-white text-xs px-2 py-1"
                                        >
                                            Tambah
                                        </button>
                                    </div>
                                    <div className="max-h-40 overflow-auto pr-1">
                                        {notes.length === 0 ? (
                                            <div className="text-[11px] text-slate-600">
                                                Belum ada catatan
                                            </div>
                                        ) : (
                                            <ul className="space-y-1">
                                                {notes.map((n) => (
                                                    <li
                                                        key={n.id}
                                                        className="group flex items-start gap-2 rounded-sm bg-yellow-50 border border-yellow-200 px-2 py-1 text-[11px] text-slate-800"
                                                    >
                                                        <span className="flex-1">
                                                            {n.text}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                removeNote(n.id)
                                                            }
                                                            className="opacity-60 group-hover:opacity-100 text-red-600"
                                                        >
                                                            ×
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="relative overflow-hidden rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-3 shadow-xl shadow-blue-500/5">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                Informasi SIP Pegawai (≤ 30 hari)
                            </span>
                        </div>
                        {sipExpiring.length > 0 ? (
                            <AutoScrollRow
                                items={sipExpiring}
                                renderItem={(item) => (
                                    <>
                                        <span className="font-semibold">
                                            {item.nama || "-"}
                                        </span>
                                        <span className="mx-2">•</span>
                                        <span>{item.jabatan || "-"}</span>
                                        <span className="mx-2">•</span>
                                        <span>
                                            berlaku s/d{" "}
                                            {item.masa_berlaku || "-"}
                                        </span>
                                        {typeof item.days_remaining ===
                                            "number" &&
                                            item.days_remaining >= 0 && (
                                                <span className="ml-2 text-xs text-amber-600">
                                                    ({item.days_remaining} hari
                                                    lagi)
                                                </span>
                                            )}
                                    </>
                                )}
                            />
                        ) : (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Tidak ada pegawai dengan masa berlaku SIP dalam
                                30 hari.
                            </div>
                        )}
                    </section>
                    {/* Panel statistik dipindah ke atas footer */}
                    {/* Hero dengan gaya frosted glass yang lebih modern, elegan, dan profesional */}
                    <motion.section
                        className="relative"
                        variants={heroVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div
                            className="relative z-20 overflow-hidden rounded-2xl text-white shadow-xl shadow-emerald-800/20 ring-1 ring-emerald-500/30 bg-center bg-cover px-8 sm:px-10 py-12 sm:py-14 flex flex-col items-center justify-center gap-6 bg-zinc-900"
                            style={{
                                backgroundImage: heroBg
                                    ? `url('${heroBg}')`
                                    : "none",
                            }}
                        >
                            {/* Tombol Keluar di hero dihapus sesuai permintaan */}
                            {/* Overlay halus bergaya Unpas (aksen hijau) */}
                            <div className="absolute inset-0 rounded-2xl pointer-events-none z-0 bg-gradient-to-t from-emerald-950/40 via-emerald-800/25 to-transparent" />
                            {/* Overlay pola halus di atas wallpaper: grid titik lembut */}
                            <div
                                className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-15 mix-blend-soft-light"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
                                    backgroundSize: "22px 22px",
                                    backgroundPosition: "0 0",
                                }}
                            />
                            {/* Top accent line tipis agar terlihat premium */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/40 via-white/20 to-transparent opacity-50" />
                            {/* Konten tengah bergaya homepage Unpas: heading + CTA, lalu pencarian & navigasi cepat */}
                            <div className="relative z-20 space-y-5 w-full max-w-3xl mx-auto text-center">
                                {/* Heading utama */}
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                    Selamat datang di{" "}
                                    {namaInstansi || "Faskesku.id"}
                                </h1>

                                {/* Nama Faskes (opsional) */}
                                {(props?.settings?.nama_instansi ||
                                    props?.setting?.nama_instansi ||
                                    props?.nama_instansi) && (
                                    <p className="text-base sm:text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
                                        {props?.settings?.nama_instansi ||
                                            props?.setting?.nama_instansi ||
                                            props?.nama_instansi}
                                    </p>
                                )}

                                {/* Search box di tengah seperti Landing */}
                                <div className="mt-4">
                                    <div className="relative max-w-3xl mx-auto">
                                        <div className="flex items-center gap-3 bg-white/95 dark:bg-gray-900/85 rounded-full shadow-xl px-5 py-3.5 border border-gray-200/70 dark:border-gray-800 ring-0 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                                            <Search className="w-5 h-5 text-slate-500" />
                                            <input
                                                type="text"
                                                value={query}
                                                onChange={(e) =>
                                                    setQuery(e.target.value)
                                                }
                                                placeholder="Cari menu… (mis. Rawat Jalan, Farmasi)"
                                                className="w-full bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none"
                                            />
                                        </div>

                                        {query.trim().length > 0 &&
                                            results.length > 0 && (
                                                <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-white/95 backdrop-blur border border-slate-200 shadow-2xl overflow-hidden z-50 pointer-events-auto">
                                                    <ul className="divide-y divide-slate-100">
                                                        {results.map((item) => {
                                                            const href =
                                                                getMenuHref(
                                                                    item
                                                                );
                                                            return (
                                                                <li
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    className="hover:bg-slate-50"
                                                                >
                                                                    <Link
                                                                        href={
                                                                            href
                                                                        }
                                                                        className="flex items-center gap-3 px-4 py-3 text-slate-800"
                                                                    >
                                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100">
                                                                            <svg
                                                                                viewBox="0 0 24 24"
                                                                                className="w-4 h-4"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                            >
                                                                                <path d="M4 12h16M4 6h16M4 18h16" />
                                                                            </svg>
                                                                        </span>
                                                                        <div className="flex-1">
                                                                            <div className="font-medium">
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </div>
                                                                            {item.breadcrumb && (
                                                                                <div className="text-xs text-slate-500">
                                                                                    {
                                                                                        item.breadcrumb
                                                                                    }
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </Link>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                    {loading && (
                                                        <div className="px-4 py-3 text-xs text-slate-500">
                                                            Memuat…
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                {/* Navigasi cepat di bawahnya—ukuran tombol diperkecil agar jarak antar tombol lebih terlihat */}
                                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-5 justify-items-center">
                                    {shortcuts.map((s) => (
                                        <Link
                                            key={s.key}
                                            href={s.href}
                                            className="group flex flex-col items-center justify-center rounded-2xl bg-white/20 hover:bg-white/30 transition text-center w-20 h-20 sm:w-24 sm:h-24"
                                        >
                                            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-blue-800 shadow group-hover:scale-105 transition-transform">
                                                {s.icon}
                                            </div>
                                            <div className="mt-2 text-xs font-semibold text-white/95 group-hover:text-white">
                                                {s.label}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Panel grafik batang kunjungan poli per bulan + panel informasi (2/3 : 1/3) */}
                    <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* Panel kiri: 2/3 lebar untuk grafik batang */}
                        <motion.div
                            ref={chartSectionRef}
                            variants={itemVariants}
                            className="relative overflow-hidden xl:col-span-2 rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-6 shadow-xl shadow-blue-500/5"
                        >
                            {/* Top border gradient */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Kunjungan Poli per Bulan
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Tahun{" "}
                                    {poliMonthly?.year ??
                                        new Date().getFullYear()}
                                </p>
                            </div>
                            {/* Chart area */}
                            <div className="mt-4">
                                <Suspense
                                    fallback={
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Memuat grafik…
                                        </div>
                                    }
                                >
                                    {shouldLoadChart && poliMonthly ? (
                                        <ChartPoliMonthlyLazy
                                            data={poliMonthly}
                                        />
                                    ) : (
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Memuat data grafik…
                                        </div>
                                    )}
                                </Suspense>
                            </div>
                        </motion.div>
                        {/* Panel kanan: 1/4 lebar untuk informasi tambahan */}
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-6 shadow-xl shadow-blue-500/5"
                        >
                            {/* Top border gradient */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Informasi
                            </h3>
                            <Suspense
                                fallback={
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Memuat ringkasan…
                                    </p>
                                }
                            >
                                {shouldLoadChart && poliMonthly ? (
                                    <MonthlyInfoPanelLazy data={poliMonthly} />
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Memuat ringkasan…
                                    </p>
                                )}
                            </Suspense>
                        </motion.div>
                    </section>

                    <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {quickLinks.map((item) => (
                                    <motion.div
                                        key={item.title}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.01, y: -3 }}
                                        className="relative overflow-hidden rounded-2xl shadow-xl shadow-blue-500/5 hover:shadow-2xl transition-all"
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                                        <Link
                                            href={item.href}
                                            className="rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-5 flex flex-col gap-3"
                                        >
                                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 flex-1">
                                                {item.description}
                                            </p>
                                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 inline-flex items-center gap-1">
                                                Buka modul{" "}
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-hidden rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/85 backdrop-blur-sm p-6 shadow-xl shadow-blue-500/5"
                            >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock4 className="w-4 h-4 text-blue-500" />
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        Aktivitas terkini
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    {timeline.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3"
                                        >
                                            <span
                                                className={`mt-1 w-2 h-2 rounded-full ${
                                                    item.status === "success"
                                                        ? "bg-emerald-500"
                                                        : item.status === "info"
                                                        ? "bg-blue-500"
                                                        : "bg-gray-400"
                                                }`}
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {item.title}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {item.meta}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-hidden rounded-2xl border border-emerald-700/40 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white p-6 shadow-lg shadow-emerald-900/30"
                            >
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/30" />
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <p className="text-sm font-medium">
                                        Integrasi berjalan mulus
                                    </p>
                                </div>
                                <p className="text-sm text-white/85 mb-3">
                                    29 bundle RME rawat jalan berhasil dikirim
                                    dalam 24 jam terakhir tanpa error validasi.
                                </p>
                                <Link
                                    href="/satusehat/monitoring"
                                    className="inline-flex items-center gap-1 text-sm font-semibold"
                                >
                                    Lihat detail
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden lg:col-span-2 rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-6 shadow-xl shadow-blue-500/5"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                Highlight Tim
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                                Update cepat dari unit operasional
                            </p>
                            <div className="space-y-4">
                                {updates.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-slate-50/90 dark:bg-gray-800/80 text-sm"
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                                            {item.label}
                                        </p>
                                        <p className="text-gray-700 dark:text-gray-200">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-6 shadow-xl shadow-blue-500/5"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                Tindakan prioritas
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Hal yang perlu perhatian hari ini
                            </p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1" />
                                    <span>
                                        Review 6 mapping lokasi baru sebelum
                                        dikirim ke SATUSEHAT.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <ShieldCheck className="w-4 h-4 text-blue-500 mt-1" />
                                    <span>
                                        Verifikasi 2 Encounter yang pending
                                        validasi.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <UserPlus className="w-4 h-4 text-purple-500 mt-1" />
                                    <span>
                                        Tambahkan NIK untuk 4 dokter baru.
                                    </span>
                                </li>
                            </ul>
                        </motion.div>
                    </section>
                    {/* Panel statistik diletakkan di atas footer sesuai permintaan */}
                    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                        {stats.map((item) => (
                            <motion.div
                                key={item.label}
                                variants={itemVariants}
                                whileHover={{ scale: 1.01, y: -4 }}
                                className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl shadow-blue-500/10 bg-gradient-to-br ${item.accent}`}
                            >
                                {/* Accent top line tipis untuk efek premium */}
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/30" />
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-white/70">
                                            {item.label}
                                        </p>
                                        <p className="text-4xl font-extrabold mt-2">
                                            {item.value}
                                        </p>
                                        <p className="text-sm text-white/85 mt-1">
                                            {item.change}
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-white/20">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </section>
                    <section className="relative overflow-hidden rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-6 shadow-xl shadow-blue-500/5">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Lokasi UPT Puskesmas Kerjo
                        </h3>
                        <div className="rounded-xl overflow-hidden">
                            {staticUrl ? (
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${finalLat},${finalLng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={staticUrl}
                                        alt="Lokasi UPT Puskesmas Kerjo"
                                        style={{
                                            width: "100%",
                                            height: 480,
                                            border: 0,
                                            display: "block",
                                        }}
                                    />
                                </a>
                            ) : (
                                <iframe
                                    title="Lokasi UPT Puskesmas Kerjo"
                                    src={mapUrl}
                                    width="100%"
                                    height="480"
                                    loading="lazy"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                />
                            )}
                        </div>
                    </section>
                    <Footer />
                </motion.div>
            </div>
        </>
    );
}

// Komponen ChartPoliMonthly: grafik batang (grouped bars) tanpa library eksternal
function ChartPoliMonthly({ data }) {
    const months = data?.months ?? [];
    const series = data?.series ?? [];
    const maxVal = Math.max(1, data?.max ?? 1);
    const totalPerMonth = months.map((_, mi) =>
        series.reduce((acc, s) => acc + (s.data?.[mi] ?? 0), 0)
    );

    // Warna untuk masing-masing seri poli (kelas Tailwind)
    const palette = [
        "from-blue-500 to-blue-600",
        "from-indigo-500 to-indigo-600",
        "from-purple-500 to-purple-600",
        "from-emerald-500 to-emerald-600",
        "from-amber-500 to-amber-600",
        "from-rose-500 to-rose-600",
        "from-cyan-500 to-cyan-600",
    ];
    const borderPalette = [
        "border-blue-600/40",
        "border-indigo-600/40",
        "border-purple-600/40",
        "border-emerald-600/40",
        "border-amber-600/40",
        "border-rose-600/40",
        "border-cyan-600/40",
    ];
    const colors = series.map((_, idx) => palette[idx % palette.length]);
    const borders = series.map(
        (_, idx) => borderPalette[idx % borderPalette.length]
    );

    // Ukuran chart
    const chartHeight = 240; // px
    const groupWidth = 54; // px untuk tiap bulan
    const barWidth = Math.max(
        7,
        Math.min(12, Math.floor(30 / Math.max(1, series.length)))
    );
    const barGap = 4; // px antar bar dalam grup

    // Axis labels (4 garis + 0)
    const axisSteps = [0, 0.25, 0.5, 0.75, 1];

    const [hover, setHover] = React.useState(null); // { mi, si, val }
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        const t = setTimeout(() => setMounted(true), 10);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="relative">
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-300">
                {series.length === 0 ? (
                    <span className="text-gray-500 dark:text-gray-400">
                        Tidak ada data poli
                    </span>
                ) : (
                    series.map((s, idx) => (
                        <div
                            key={s.kd_poli}
                            className="inline-flex items-center gap-2"
                        >
                            <span
                                className={`inline-block w-3 h-3 rounded bg-gradient-to-br ${colors[idx]} ring-1 ${borders[idx]}`}
                            />
                            <span className="font-medium">{s.nm_poli}</span>
                        </div>
                    ))
                )}
            </div>

            {/* Tooltip */}
            {hover && (
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-10">
                    <div className="px-3 py-2 rounded-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-gray-200 dark:border-gray-800 shadow text-xs text-gray-700 dark:text-gray-200">
                        <div className="font-semibold text-gray-900 dark:text-white">
                            {months[hover.mi]}
                        </div>
                        <div className="mt-0.5">
                            {series[hover.si]?.nm_poli}
                        </div>
                        <div className="mt-0.5 font-mono">
                            {hover.val} kunjungan
                            {totalPerMonth[hover.mi] > 0 && (
                                <span className="text-gray-500 dark:text-gray-400">
                                    {" "}
                                    ·{" "}
                                    {(
                                        (hover.val / totalPerMonth[hover.mi]) *
                                        100
                                    ).toFixed(1)}
                                    %
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Chart grid + bars */}
            <div className="mt-4">
                <div className="relative">
                    {/* Axis labels (left) */}
                    {axisSteps.map((step, i) => (
                        <div
                            key={i}
                            className="absolute -left-12 text-[10px] text-gray-500 dark:text-gray-400"
                            style={{ top: (1 - step) * chartHeight - 6 }}
                        >
                            {Math.round(maxVal * step)}
                        </div>
                    ))}
                    {/* Y-grid dashed */}
                    {axisSteps.map((step, i) => (
                        <div
                            key={`g-${i}`}
                            className="absolute left-0 right-0"
                            style={{ top: (1 - step) * chartHeight }}
                        >
                            <div className="border-t border-dashed border-gray-200 dark:border-gray-800" />
                        </div>
                    ))}

                    {/* Bars container */}
                    <div className="overflow-x-auto">
                        <div className="min-w-full">
                            <div
                                className="flex items-end gap-4"
                                style={{ height: chartHeight }}
                            >
                                {months.map((m, mi) => (
                                    <div
                                        key={m + mi}
                                        className="flex items-end"
                                        style={{ width: groupWidth }}
                                    >
                                        {/* Bars per poli */}
                                        <div
                                            className="flex items-end"
                                            style={{ gap: barGap }}
                                        >
                                            {series.map((s, si) => {
                                                const val = s.data?.[mi] ?? 0;
                                                const h = Math.round(
                                                    (val / maxVal) * chartHeight
                                                );
                                                return (
                                                    <div
                                                        key={s.kd_poli + mi}
                                                        className="flex flex-col items-center"
                                                        style={{
                                                            width: barWidth,
                                                        }}
                                                    >
                                                        <div
                                                            className={`w-full bg-gradient-to-t ${colors[si]} rounded-md shadow-sm ring-1 ${borders[si]}`}
                                                            style={{
                                                                height: mounted
                                                                    ? h
                                                                    : 0,
                                                                transition:
                                                                    "height 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                                                            }}
                                                            onMouseEnter={() =>
                                                                setHover({
                                                                    mi,
                                                                    si,
                                                                    val,
                                                                })
                                                            }
                                                            onMouseLeave={() =>
                                                                setHover(null)
                                                            }
                                                            aria-label={`${s.nm_poli} ${m}: ${val}`}
                                                        />
                                                        {h > 22 && (
                                                            <div className="mt-1 text-[10px] text-gray-600 dark:text-gray-300 font-mono">
                                                                {val}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* X-axis labels */}
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        {months.map((m) => (
                            <div
                                key={m + "lbl"}
                                style={{ width: groupWidth }}
                                className="text-center"
                            >
                                {m}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Panel informasi: ringkasan top poli & total setahun
function MonthlyInfoPanel({ data }) {
    const series = data?.series ?? [];
    const year = data?.year ?? new Date().getFullYear();

    const ranked = [...series].sort((a, b) => (b.total ?? 0) - (a.total ?? 0));
    const totalAll = ranked.reduce((acc, s) => acc + (s.total ?? 0), 0);

    return (
        <div className="space-y-4 text-sm">
            <p className="text-gray-600 dark:text-gray-300">
                Ringkasan kunjungan tahun {year}
            </p>
            <div className="rounded-xl bg-gradient-to-br from-slate-50/80 to-slate-100/60 dark:from-gray-800/60 dark:to-gray-800/40 border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                        Total semua poli
                    </span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                        {totalAll}
                    </span>
                </div>
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Top poli (berdasarkan total setahun)
                </p>
                <ul className="space-y-2">
                    {ranked.map((s) => (
                        <li key={s.kd_poli}>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700 dark:text-gray-200">
                                    {s.nm_poli}
                                </span>
                                <span className="text-gray-900 dark:text-white font-semibold">
                                    {s.total}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
