import React, { useEffect, useMemo, useState, useRef, Suspense } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Sparkles,
    BookOpen,
    ArrowRight,
    ShieldCheck,
    BarChart2,
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
    Home,
    MoreHorizontal,
    X,
} from "lucide-react";
import MobileBottomNav from "@/Components/MobileBottomNav";
import { route } from "ziggy-js";

// Lazy-loaded components (code splitting) for heavy sections
const ChartPoliMonthlyLazy = React.lazy(() =>
    import("./DashboardComponents/ChartPoliMonthly")
);
const MonthlyInfoPanelLazy = React.lazy(() =>
    import("./DashboardComponents/MonthlyInfoPanel")
);

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

const TopNavbar = React.memo(function TopNavbar() {
    const { props } = usePage();
    const instansi =
        props?.settings?.nama_instansi ||
        props?.setting?.nama_instansi ||
        props?.nama_instansi ||
        "Faskesku.id";
    const permissionNames = Array.isArray(props?.auth?.permissions)
        ? props.auth.permissions
        : [];
    const canAccess = (permission) =>
        permissionNames.includes(permission);
    const canAccessAny = (permissions) =>
        Array.isArray(permissions) &&
        permissions.some((p) => permissionNames.includes(p));

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
                        {canAccessAny([
                            "group.registrasi.access",
                            "registration.view",
                            "reg-periksa.view",
                            "reg-periksa.index",
                        ]) && (
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
                        )}
                        {canAccess("group.rawatjalan.access") && (
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
                        )}
                        {canAccess("group.laboratorium.access") && (
                            <Link
                                href={route("laboratorium.permintaan-lab.index")}
                                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                            >
                                <FlaskConical className="w-4 h-4 transition-transform group-hover:scale-110" />
                                <span className="relative">
                                    Laborat
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                                </span>
                            </Link>
                        )}
                        {canAccess("group.radiologi.access") && (
                            <Link
                                href={route("radiologi.index")}
                                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                            >
                                <Radiation className="w-4 h-4 transition-transform group-hover:scale-110" />
                                <span className="relative">
                                    Radiologi
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                                </span>
                            </Link>
                        )}
                        {canAccess("group.farmasi.access") && (
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
                        )}
                        {canAccess("group.keuangan.access") && (
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
                        )}
                        <Link
                            href="/laporan"
                            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                        >
                            <BarChart2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                            <span className="relative">
                                Laporan
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
    const permissionNames = Array.isArray(props?.auth?.permissions)
        ? props.auth.permissions
        : [];
    const canAccess = (permission) =>
        !permission || permissionNames.includes(permission);

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
    const resolveApmUrl = () => {
        try {
            if (typeof route === 'function') {
                return route('anjungan.pasien-mandiri');
            }
        } catch (_) {}
        try {
            const { protocol, hostname, port } = window.location;
            const base = `${protocol}//${hostname}`;
            if (port === '5173') {
                return `${base}:8000/anjungan/pasien-mandiri`;
            }
            return `${base}${port ? ':' + port : ''}/anjungan/pasien-mandiri`;
        } catch (_) {
            return '/anjungan/pasien-mandiri';
        }
    };
    const safeRouteFooter = (name, params = {}) => {
        try {
            return route(name, params, false);
        } catch (_) {
            return '#';
        }
    };

    const resolveDisplayPoliUrl = () => {
        try {
            const { protocol, hostname, port } = window.location;
            const base = `${protocol}//${hostname}`;
            if (port === '5173') {
                return `${base}:8000/antrian/poli`;
            }
            return `${base}${port ? ':' + port : ''}/antrian/poli`;
        } catch (_) {
            return '/antrian/poli';
        }
    };

    const footerLinks = [
        { label: "Loket Antrian", href: resolveLoketUrl(), target: "_blank" },
        { label: "Display TV Loket", href: resolveDisplayUrl(), target: "_blank" },
<<<<<<< HEAD
        { label: "APM", href: resolveApmUrl() },
=======
        { label: "Display TV Poli", href: resolveDisplayPoliUrl(), target: "_blank" },
        { label: "APM", href: route("anjungan.pasien-mandiri") },
>>>>>>> 697e42ab (BelumFixTVPoli)
        { label: "Pendaftaran Pasien", href: "/registration/lanjutan" },
        { label: "Perpustakaan (Dokumen)", href: "/docs" },
        { label: "Berita Sistem", href: "/news" },
        { label: "Kehidupan Faskes", href: "/profile" },
        { label: "Map Faskes", href: "/master-data" },
    ];

        const unitLinks = [
        {
            label: "SATUSEHAT Monitoring",
            href: "/satusehat/monitoring",
            requiredPermission: "group.satusehat.access",
        },
        {
            label: "Laporan",
            href: "/laporan",
            requiredPermission: null,
        },
        {
            label: "Penjaminan Mutu (Audit)",
            href: "/permissions",
            requiredPermission: "group.pengaturan.access",
        },
        {
            label: "Laboratorium",
            href: safeRouteFooter("laboratorium.permintaan-lab.index"),
            requiredPermission: "group.laboratorium.access",
        },
        {
            label: "Radiologi",
            href: safeRouteFooter("radiologi.index"),
            requiredPermission: "group.radiologi.access",
        },
        {
            label: "Farmasi",
            href: "/farmasi",
            requiredPermission: "group.farmasi.access",
        },
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
                                    {unitLinks
                                        .filter((l) =>
                                            canAccess(l.requiredPermission)
                                        )
                                        .map((l) => (
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

    const wallpaperUrl = namaInstansi
        ? route("setting.app.wallpaper", namaInstansi, false)
        : "/img/wallpaper.png";

    const permissionNames = Array.isArray(props?.auth?.permissions)
        ? props.auth.permissions
        : [];
    const hasPermission = (permission) =>
        !permission || permissionNames.includes(permission);
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

    const [highlightItems, setHighlightItems] = useState(
        Array.isArray(props.dashboardHighlights) &&
            props.dashboardHighlights.length > 0
            ? props.dashboardHighlights
            : []
    );

    const [priorityItems, setPriorityItems] = useState(
        Array.isArray(props.dashboardPriorities) &&
            props.dashboardPriorities.length > 0
            ? props.dashboardPriorities
            : []
    );

    useEffect(() => {
        if (Array.isArray(props.dashboardHighlights)) {
            setHighlightItems(props.dashboardHighlights);
        } else {
            setHighlightItems([]);
        }
        if (Array.isArray(props.dashboardPriorities)) {
            const mapped = props.dashboardPriorities
                .map((p) => ({
                    text:
                        typeof p === "string"
                            ? p
                            : p?.text || "",
                }))
                .filter((p) => p.text && p.text.trim() !== "");
            setPriorityItems(mapped);
        } else {
            setPriorityItems([]);
        }
    }, [props.dashboardHighlights, props.dashboardPriorities]);

    useEffect(() => {
        const hasServerConfig =
            (Array.isArray(props.dashboardHighlights) &&
                props.dashboardHighlights.length > 0) ||
            (Array.isArray(props.dashboardPriorities) &&
                props.dashboardPriorities.length > 0);

        if (hasServerConfig) {
            return;
        }

        let cancelled = false;

        const loadConfig = async () => {
            try {
                const url = route("setting.dashboard.index", [], false);
                const res = await fetch(url, {
                    headers: {
                        Accept: "application/json",
                    },
                    credentials: "same-origin",
                });
                if (!res.ok) return;
                const json = await res.json();
                if (!json || cancelled) return;

                if (
                    Array.isArray(json.highlights) &&
                    json.highlights.length > 0
                ) {
                    setHighlightItems(json.highlights);
                }
                if (
                    Array.isArray(json.priorities) &&
                    json.priorities.length > 0
                ) {
                    const mapped = json.priorities
                        .map((p) => ({
                            text:
                                typeof p === "string"
                                    ? p
                                    : p?.text || "",
                        }))
                        .filter((p) => p.text && p.text.trim() !== "");
                    if (mapped.length > 0) {
                        setPriorityItems(mapped);
                    }
                }
            } catch (_) {}
        };

        loadConfig();

        return () => {
            cancelled = true;
        };
    }, [props.dashboardHighlights, props.dashboardPriorities]);

    const [pasienHariIniCount, setPasienHariIniCount] = useState(null);
    const [pasienKemarinCount, setPasienKemarinCount] = useState(null);

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

    const [query, setQuery] = useState("");

    const safeRoute = (name, params = {}) => {
        try {
            return route(name, params, false);
        } catch (e) {
            return "#";
        }
    };

    const shortcuts = useMemo(
        () =>
            [
                {
                    key: "register",
                    label: "Register",
                    href: safeRoute("registration.lanjutan"),
                    icon: <UserPlus className="w-5 h-5" />,
                    requiredPermission: null,
                },
                {
                    key: "bridging",
                    label: "Briding",
                    href: safeRoute("pcare.index"),
                    icon: <LinkIcon className="w-5 h-5" />,
                    requiredPermission: "group.pcare.access",
                },
                {
                    key: "ugd",
                    label: "UGD",
                    href: safeRoute("igd.index"),
                    icon: <Ambulance className="w-5 h-5" />,
                    requiredPermission: "group.rawatjalan.access",
                },
                {
                    key: "lab",
                    label: "Laboratorium",
                    href: safeRoute("laboratorium.permintaan-lab.index"),
                    icon: <FlaskConical className="w-5 h-5" />,
                    requiredPermission: "group.laboratorium.access",
                },
                {
                    key: "rad",
                    label: "Radiologi",
                    href: safeRoute("radiologi.index"),
                    icon: <Radiation className="w-5 h-5" />,
                    requiredPermission: "group.radiologi.access",
                },
                {
                    key: "farmasi",
                    label: "Farmasi",
                    href: safeRoute("farmasi.index"),
                    icon: <Pill className="w-5 h-5" />,
                    requiredPermission: "group.farmasi.access",
                },
                {
                    key: "rajal",
                    label: "Rawat Jalan",
                    href: safeRoute("rawat-jalan.index"),
                    icon: <Stethoscope className="w-5 h-5" />,
                    requiredPermission: "group.rawatjalan.access",
                },
                {
                    key: "ranap",
                    label: "Rawat Inap",
                    href: safeRoute("rawat-inap.index"),
                    icon: <Bed className="w-5 h-5" />,
                    requiredPermission: "group.rawatjalan.access",
                },
                {
                    key: "keuangan",
                    label: "Keuangan",
                    // Arahkan ke halaman Home Akutansi
                    href: "/akutansi/home",
                    icon: <Wallet className="w-5 h-5" />,
                    requiredPermission: "group.keuangan.access",
                },
                {
                    key: "laporan",
                    label: "Laporan",
                    href: "/laporan",
                    icon: <BarChart2 className="w-5 h-5" />,
                    requiredPermission: null,
                },
                {
                    key: "settings",
                    label: "Pengaturan",
                    href: safeRoute("profile.home", "/profile/home"),
                    icon: <Settings className="w-5 h-5" />,
                    requiredPermission: "group.pengaturan.access",
                },
            ].filter((item) => hasPermission(item.requiredPermission)),
        [permissionNames]
    );

    const filteredShortcuts = useMemo(() => {
        const t = query.trim().toLowerCase();
        if (!t) return shortcuts;
        return shortcuts.filter((item) =>
            item.label.toLowerCase().includes(t)
        );
    }, [shortcuts, query]);

    const [showMoreMenu, setShowMoreMenu] = useState(false);

    const bottomNavItems = useMemo(() => {
        const items = [];
        items.push({
            key: "home",
            label: "Utama",
            href: route("dashboard"),
            icon: <Home className="w-5 h-5" />,
        });
        const ralan = shortcuts.find((item) => item.key === "rajal");
        if (ralan) {
            items.push({
                ...ralan,
                label: "Ralan",
            });
        }
        const ranap = shortcuts.find((item) => item.key === "ranap");
        if (ranap) {
            items.push({
                ...ranap,
                label: "Ranap",
            });
        }
        items.push({
            key: "more",
            label: "Lainnya",
            icon: <MoreHorizontal className="w-5 h-5" />,
            onClick: () => setShowMoreMenu(true),
        });
        return items;
    }, [shortcuts]);

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
    const { props: pageProps } = usePage();
    useEffect(() => {
        let active = true;
        const controller = new AbortController();
        (async () => {
            try {
                const res = await window.axios.get("/api/public/sip-pegawai/expiring", {
                    signal: controller.signal,
                    withCredentials: true,
                    headers: { Accept: "application/json" },
                });
                const json = res?.data || {};
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
            <MobileBottomNav />
            {/* Fullscreen container tanpa sidebar/layout bawaan */}
            <div
                id="page-top"
                className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 dark:from-[#0B1220] dark:via-[#0F172A] dark:to-[#111827] p-6 pt-24 sm:pt-28 pb-24 md:pb-0 relative z-0"
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
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-5 justify-items-center">
                                    {filteredShortcuts.map((s) => (
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
                                {highlightItems.map((item, idx) => (
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
                                {priorityItems.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1" />
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
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

    const lineColors = [
        "#2563eb",
        "#4f46e5",
        "#7c3aed",
        "#059669",
        "#f59e0b",
        "#f97316",
        "#06b6d4",
    ];
    const colors = [
        "from-blue-500 to-blue-600",
        "from-indigo-500 to-indigo-600",
        "from-purple-500 to-purple-600",
        "from-emerald-500 to-emerald-600",
        "from-amber-500 to-amber-600",
        "from-rose-500 to-rose-600",
        "from-cyan-500 to-cyan-600",
    ];
    const borders = [
        "border-blue-600/40",
        "border-indigo-600/40",
        "border-purple-600/40",
        "border-emerald-600/40",
        "border-amber-600/40",
        "border-rose-600/40",
        "border-cyan-600/40",
    ];

    const chartHeight = 260;
    const chartWidth = Math.max(months.length * 56, 480);
    const paddingLeft = 44;
    const paddingRight = 16;
    const paddingTop = 10;
    const paddingBottom = 30;
    const innerWidth = chartWidth - paddingLeft - paddingRight;
    const innerHeight = chartHeight - paddingTop - paddingBottom;

    const axisSteps = [0, 0.25, 0.5, 0.75, 1];

    const buildSmoothPath = (points) => {
        if (!points.length) return "";
        if (points.length === 1) {
            const p = points[0];
            return `M ${p.x} ${p.y}`;
        }
        if (points.length === 2) {
            const a = points[0];
            const b = points[1];
            return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
        }
        const tension = 0.5;
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i - 1] || points[i];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[i + 2] || p2;
            const cp1x = p1.x + ((p2.x - p0.x) * tension) / 6;
            const cp1y = p1.y + ((p2.y - p0.y) * tension) / 6;
            const cp2x = p2.x - ((p3.x - p1.x) * tension) / 6;
            const cp2y = p2.y - ((p3.y - p1.y) * tension) / 6;
            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
        }
        return d;
    };

    const [hover, setHover] = React.useState(null);
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
                    series.map((s, idx) => {
                        const isSeriesHovered = hover && hover.si === idx;
                        const isSeriesDimmed = hover && hover.si !== idx;
                        return (
                            <button
                                key={s.kd_poli}
                                type="button"
                                onMouseEnter={() =>
                                    setHover({
                                        mi: null,
                                        si: idx,
                                        val: null,
                                        x: null,
                                    })
                                }
                                onMouseLeave={() => setHover(null)}
                                className={`inline-flex items-center gap-2 rounded-full px-2 py-1 transition ${
                                    isSeriesHovered
                                        ? "bg-white/60 dark:bg-white/10 shadow-sm"
                                        : isSeriesDimmed
                                        ? "opacity-60"
                                        : ""
                                }`}
                            >
                                <span
                                    className={`inline-block w-3 h-3 rounded bg-gradient-to-br ${colors[idx]} ring-1 ${borders[idx]}`}
                                />
                                <span className="font-medium">
                                    {s.nm_poli}
                                </span>
                            </button>
                        );
                    })
                )}
            </div>

            {/* Tooltip */}
            {hover && hover.mi != null && (
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

            <div className="mt-4">
                <div className="relative overflow-x-auto">
                    <svg
                        width={chartWidth}
                        height={chartHeight}
                        className="text-gray-500 dark:text-gray-400"
                    >
                        {axisSteps.map((step, i) => {
                            const y =
                                paddingTop +
                                innerHeight * (1 - step);
                            return (
                                <g key={i}>
                                    <line
                                        x1={paddingLeft}
                                        x2={chartWidth - paddingRight}
                                        y1={y}
                                        y2={y}
                                        stroke="#e5e7eb"
                                        strokeDasharray="4 4"
                                        className="dark:stroke-gray-800"
                                    />
                                    <text
                                        x={paddingLeft - 6}
                                        y={y + 3}
                                        textAnchor="end"
                                        fontSize="10"
                                        fill="#6b7280"
                                        className="dark:fill-gray-400"
                                    >
                                        {Math.round(maxVal * step)}
                                    </text>
                                </g>
                            );
                        })}

                        {series.map((s, si) => {
                            const color =
                                lineColors[si % lineColors.length];
                            const isSeriesHovered =
                                hover && hover.si === si;
                            const isSeriesDimmed =
                                hover && hover.si !== si;
                            const pts = months.map((m, mi) => {
                                const val = s.data?.[mi] ?? 0;
                                const x =
                                    paddingLeft +
                                    (months.length > 1
                                        ? (innerWidth * mi) /
                                          (months.length - 1)
                                        : innerWidth / 2);
                                const y =
                                    paddingTop +
                                    innerHeight *
                                        (1 - val / maxVal);
                                return { x, y, val, mi };
                            });

                            const d = buildSmoothPath(pts);

                            return (
                                <g key={s.kd_poli}>
                                    <path
                                        d={d}
                                        fill="none"
                                        stroke={color}
                                        strokeWidth={isSeriesHovered ? 4.2 : 3.2}
                                        strokeOpacity={isSeriesDimmed ? 0.18 : 0.4}
                                        filter="url(#lineShadowMonthly)"
                                        pathLength={1}
                                        style={{
                                            transition:
                                                "stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                                            strokeDasharray: 1,
                                            strokeDashoffset: mounted ? 0 : 1,
                                        }}
                                    />
                                    <path
                                        d={d}
                                        fill="none"
                                        stroke={color}
                                        strokeWidth={isSeriesHovered ? 2.6 : 2.1}
                                        opacity={
                                            mounted
                                                ? isSeriesDimmed
                                                    ? 0.45
                                                    : 0.98
                                                : 0
                                        }
                                        pathLength={1}
                                        style={{
                                            transition:
                                                "opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                                            strokeDasharray: 1,
                                            strokeDashoffset: mounted ? 0 : 1,
                                        }}
                                    />
                                    {pts.map((p) => (
                                        <g key={`${s.kd_poli}-${p.mi}`}>
                                            {(() => {
                                                const isPointHovered =
                                                    hover &&
                                                    hover.si === si &&
                                                    hover.mi === p.mi;
                                                const outerR = isPointHovered
                                                    ? 9
                                                    : isSeriesHovered
                                                    ? 7
                                                    : 5.5;
                                                const innerR = isPointHovered
                                                    ? 5
                                                    : isSeriesHovered
                                                    ? 3.8
                                                    : 3.1;
                                                const outerOpacity = isSeriesDimmed
                                                    ? 0.08
                                                    : 0.18;

                                                return (
                                                    <>
                                                        <circle
                                                            cx={p.x}
                                                            cy={p.y}
                                                            r={outerR}
                                                            fill={color}
                                                            fillOpacity={outerOpacity}
                                                            stroke="none"
                                                        />
                                                        <circle
                                                            cx={p.x}
                                                            cy={p.y}
                                                            r={innerR}
                                                            fill="#0b1120"
                                                            stroke={color}
                                                            strokeWidth={2}
                                                            onMouseEnter={() =>
                                                                setHover({
                                                                    mi: p.mi,
                                                                    si,
                                                                    val: p.val,
                                                                    x: p.x,
                                                                })
                                                            }
                                                            onMouseLeave={() =>
                                                                setHover(null)
                                                            }
                                                        />
                                                    </>
                                                );
                                            })()}
                                        </g>
                                    ))}
                                </g>
                            );
                        })}

                        {months.map((m, mi) => {
                            const x =
                                paddingLeft +
                                (months.length > 1
                                    ? (innerWidth * mi) /
                                      (months.length - 1)
                                    : innerWidth / 2);
                            const y =
                                chartHeight -
                                paddingBottom +
                                16;
                            return (
                                <text
                                    key={m + "lbl"}
                                    x={x}
                                    y={y}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#6b7280"
                                    className="dark:fill-gray-400"
                                >
                                    {m}
                                </text>
                            );
                        })}
                    </svg>
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
