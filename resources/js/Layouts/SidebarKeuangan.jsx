import React, { useState, useMemo, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import {
    Gauge,
    Wallet,
    Banknote,
    CreditCard,
    BookOpen,
    FileText,
    Receipt,
    ChevronDown,
    ChevronRight,
    Calendar,
    Home,
    Scale,
} from "lucide-react";

// Sidebar khusus modul Keuangan/Akutansi, serasi dengan LanjutanRalanLayout & SidebarFarmasi
export default function SidebarKeuangan({ title = "Keuangan", children }) {
    const { url, props } = usePage();
    const auth = props?.auth || {};

    // State untuk menu & tampilan
    const [openPengaturan, setOpenPengaturan] = useState(true);
    const [openJurnal, setOpenJurnal] = useState(true);
    const [openAkutansi, setOpenAkutansi] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // Sinkronisasi tema ke root
    useEffect(() => {
        const root = document.documentElement;
        if (isDark) root.classList.add("dark");
        else root.classList.remove("dark");
    }, [isDark]);

    // Restore toggle dari localStorage
    useEffect(() => {
        try {
            const savedCollapsed = localStorage.getItem(
                "keuanganSidebarCollapsed"
            );
            if (savedCollapsed !== null)
                setIsSidebarCollapsed(savedCollapsed === "true");
            const savedOpen = localStorage.getItem("keuanganSidebarOpen");
            if (savedOpen !== null) setIsSidebarOpen(savedOpen === "true");
        } catch (_) {}
    }, []);

    // Persist states
    useEffect(() => {
        try {
            localStorage.setItem(
                "keuanganSidebarCollapsed",
                String(isSidebarCollapsed)
            );
        } catch (_) {}
    }, [isSidebarCollapsed]);
    useEffect(() => {
        try {
            localStorage.setItem("keuanganSidebarOpen", String(isSidebarOpen));
        } catch (_) {}
    }, [isSidebarOpen]);

    // Close profile dropdown saat klik di luar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isProfileDropdownOpen &&
                !event.target.closest(".profile-dropdown")
            ) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileDropdownOpen]);

    // Handle mobile sidebar overlay
    const handleSidebarOverlayClick = () => {
        if (window.innerWidth < 1024) setIsSidebarOpen(false);
    };

    // Menu Keuangan
    const items = useMemo(
        () => [
            {
                label: "Dashboard",
                href: route("dashboard"),
                icon: <Gauge className="w-4 h-4" />,
            },
            {
                label: "Home",
                href: "/akutansi/home",
                icon: <Home className="w-4 h-4" />,
            },
            {
                label: "Pengaturan Akun",
                icon: <Wallet className="w-4 h-4" />,
                children: [
                    {
                        label: "Pengaturan Rekening",
                        href: "/akutansi/pengaturan-rekening",
                        icon: <Banknote className="w-4 h-4" />,
                    },
                    {
                        label: "Rekening",
                        href: "/akutansi/rekening",
                        icon: <Banknote className="w-4 h-4" />,
                    },
                    {
                        label: "Rekening Tahun",
                        href: "/akutansi/rekening-tahun",
                        icon: <Calendar className="w-4 h-4" />,
                    },
                    {
                        label: "Akun Bayar",
                        href: "/akutansi/akun-bayar",
                        icon: <CreditCard className="w-4 h-4" />,
                    },
                    {
                        label: "Akun Piutang",
                        href: "/akutansi/akun-piutang",
                        icon: <Wallet className="w-4 h-4" />,
                    },
                ],
            },
            {
                label: "Jurnal",
                icon: <BookOpen className="w-4 h-4" />,
                children: [
                    {
                        label: "Jurnal",
                        href: "/akutansi/jurnal",
                        icon: <BookOpen className="w-4 h-4" />,
                    },
                    {
                        label: "Jurnal Penyesuaian",
                        href: "/akutansi/jurnal-penyesuaian",
                        icon: <BookOpen className="w-4 h-4" />,
                    },
                    {
                        label: "Jurnal Penutup",
                        href: "/akutansi/jurnal-penutup",
                        icon: <BookOpen className="w-4 h-4" />,
                    },
                    {
                        label: "Detail Jurnal",
                        href: "/akutansi/detail-jurnal",
                        icon: <FileText className="w-4 h-4" />,
                    },
                    {
                        label: "Buku Besar",
                        href: "/akutansi/buku-besar",
                        icon: <BookOpen className="w-4 h-4" />,
                    },
                ],
            },
            {
                label: "Akutansi",
                icon: <Receipt className="w-4 h-4" />,
                children: [
                    {
                        label: "Kasir Rawat Jalan",
                        href: "/akutansi/kasir-ralan",
                        icon: <Receipt className="w-4 h-4" />,
                    },
                    {
                        label: "Kasir Rawat Inap",
                        href: "/pembayaran/ranap",
                        icon: <Receipt className="w-4 h-4" />,
                    },
                ],
            },
        ],
        []
    );

    const isActive = (href) => {
        try {
            const u = new URL(href, window.location.origin);
            return window.location.pathname === u.pathname;
        } catch {
            return url === href || window.location.pathname === href;
        }
    };

    const KeuanganMobileBottomNav = React.memo(function KeuanganMobileBottomNav() {
        const navItems = [
            { href: "/akutansi/home", icon: Home },
            { href: "/akutansi/jurnal", icon: BookOpen },
            { href: "/akutansi/kasir-ralan", icon: Receipt },
            { href: "/akutansi/rekening", icon: Banknote },
            { href: "/akutansi/neraca", icon: Scale },
        ];

        return (
            <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 dark:bg-gray-900/85 backdrop-blur border-t border-slate-200/70 dark:border-gray-800">
                <div className="h-16 px-4 pb-[env(safe-area-inset-bottom)]">
                    <div className="grid grid-cols-5 gap-2 h-full">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center justify-center rounded-lg transition-all duration-200 ${
                                    isActive(item.href)
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-slate-700 dark:text-gray-300"
                                } hover:bg-blue-50 dark:hover:bg-blue-900/20`}
                            >
                                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        );
    });

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black shadow-2xl border-r border-blue-500/20 dark:border-blue-800 z-40 transition-all duration-300 ${
                    isSidebarOpen
                        ? "w-64 translate-x-0"
                        : isSidebarCollapsed
                        ? "w-16 -translate-x-full lg:translate-x-0"
                        : "w-64 -translate-x-full lg:translate-x-0"
                }`}
            >
                {/* Sidebar Header */}
                <div className="h-14 flex items-center px-3 gap-2 text-white">
                    <Wallet className="w-5 h-5" />
                    {!isSidebarCollapsed && (
                        <span className="font-semibold truncate">{title}</span>
                    )}
                </div>
                {/* Sidebar Menu */}
                <nav className="px-2 py-2 space-y-1 text-white/90">
                    {items.map((item, idx) => (
                        <div key={idx}>
                            {!item.children ? (
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                                        isActive(item.href)
                                            ? "bg-white/20 text-white"
                                            : "hover:bg-white/10"
                                    }`}
                                >
                                    <span className="text-white/90">
                                        {item.icon}
                                    </span>
                                    {!isSidebarCollapsed && (
                                        <span className="text-sm font-medium">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            ) : (
                                <div className="mb-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (
                                                item.label === "Pengaturan Akun"
                                            )
                                                setOpenPengaturan((v) => !v);
                                            else if (item.label === "Jurnal")
                                                setOpenJurnal((v) => !v);
                                            else if (item.label === "Akutansi")
                                                setOpenAkutansi((v) => !v);
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10"
                                    >
                                        <span className="text-white/90">
                                            {item.icon}
                                        </span>
                                        {!isSidebarCollapsed && (
                                            <span className="text-sm font-semibold flex-1 text-left">
                                                {item.label}
                                            </span>
                                        )}
                                        {!isSidebarCollapsed &&
                                            ((
                                                item.label === "Pengaturan Akun"
                                                    ? openPengaturan
                                                    : item.label === "Jurnal"
                                                    ? openJurnal
                                                    : openAkutansi
                                            ) ? (
                                                <ChevronDown className="w-4 h-4 text-white/70" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-white/70" />
                                            ))}
                                    </button>
                                    {(item.label === "Pengaturan Akun"
                                        ? openPengaturan
                                        : item.label === "Jurnal"
                                        ? openJurnal
                                        : openAkutansi) && (
                                        <div
                                            className={`mt-1 ${
                                                isSidebarCollapsed ? "" : "ml-2"
                                            } space-y-1`}
                                        >
                                            {item.children.map(
                                                (child, cIdx) => (
                                                    <Link
                                                        key={cIdx}
                                                        href={child.href}
                                                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                                                            isActive(child.href)
                                                                ? "bg-white/20 text-white"
                                                                : "hover:bg-white/10"
                                                        }`}
                                                    >
                                                        <span className="text-white/90">
                                                            {child.icon}
                                                        </span>
                                                        {!isSidebarCollapsed && (
                                                            <span className="text-sm">
                                                                {child.label}
                                                            </span>
                                                        )}
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Mobile sidebar overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={handleSidebarOverlayClick}
                />
            )}

            {/* Top Navigation Bar - Fixed Header */}
            <header
                className={`fixed top-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50 flex-shrink-0 transition-all duration-300 ${
                    isSidebarOpen
                        ? "left-64 right-0"
                        : isSidebarCollapsed
                        ? "left-0 right-0 lg:left-16"
                        : "left-0 right-0 lg:left-64"
                }`}
            >
                <div className="h-full flex items-center justify-between px-4">
                    {/* Left side - Toggle + Breadcrumb */}
                    <div className="flex items-center gap-3">
                        {/* Toggle Button */}
                        <button
                            onClick={() => {
                                if (window.innerWidth < 1024)
                                    setIsSidebarOpen(!isSidebarOpen);
                                else setIsSidebarCollapsed(!isSidebarCollapsed);
                            }}
                            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle sidebar"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                            >
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        {/* Breadcrumb */}
                        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <Link
                                href={route("dashboard")}
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Dashboard
                            </Link>
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
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <span className="text-gray-900 dark:text-white font-medium">
                                Keuangan
                            </span>
                        </nav>
                    </div>

                    {/* Right side - User menu */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 text-gray-600 dark:text-gray-400"
                                >
                                    <path d="M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 text-gray-600 dark:text-gray-400"
                                >
                                    <path d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75 9.75 9.75 0 0 1 9.9 2.28a.75.75 0 0 1 .893.987A8.25 8.25 0 0 0 20.73 13.86a.75.75 0 0 1 1.022.893Z" />
                                </svg>
                            )}
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative profile-dropdown">
                            <button
                                onClick={() =>
                                    setIsProfileDropdownOpen(
                                        !isProfileDropdownOpen
                                    )
                                }
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">
                                        {auth?.user?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "U"}
                                    </span>
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {auth?.user?.name || "Unknown User"}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {auth?.user?.email || ""}
                                    </p>
                                </div>
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                            </button>

                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                    <div className="py-1">
                                        <Link
                                            href={route("dashboard")}
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Dashboard
                                        </Link>
                                        <hr className="my-1 border-gray-200 dark:border-gray-700" />
                                        <button
                                            onClick={() => {
                                                try {
                                                    const form =
                                                        document.createElement(
                                                            "form"
                                                        );
                                                    form.method = "POST";
                                                    form.action =
                                                        route("logout");
                                                    const csrfInput =
                                                        document.createElement(
                                                            "input"
                                                        );
                                                    csrfInput.type = "hidden";
                                                    csrfInput.name = "_token";
                                                    csrfInput.value =
                                                        document
                                                            .querySelector(
                                                                'meta[name="csrf-token"]'
                                                            )
                                                            ?.getAttribute(
                                                                "content"
                                                            ) || "";
                                                    form.appendChild(csrfInput);
                                                    document.body.appendChild(
                                                        form
                                                    );
                                                    form.submit();
                                                } catch (error) {
                                                    console.error(
                                                        "Logout error:",
                                                        error
                                                    );
                                                }
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <KeuanganMobileBottomNav />

            {/* Main Content */}
            <main
                className={`pt-14 transition-all duration-300 ${
                    isSidebarOpen
                        ? "lg:ml-64"
                        : isSidebarCollapsed
                        ? "lg:ml-16"
                        : "lg:ml-64"
                }`}
            >
                <div className="min-h-[calc(100vh-3.5rem)] px-4 sm:px-6 lg:px-8 pt-6 pb-24 md:pb-6">
                    {children}
                </div>
            </main>
            <KeuanganMobileBottomNav />
        </div>
    );
}
