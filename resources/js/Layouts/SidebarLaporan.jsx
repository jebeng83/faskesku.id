import { useState, useMemo, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import {
    Gauge,
    BarChart2,
    FileText,
    ChevronDown,
    ChevronRight,
    Stethoscope,
    Bed,
    Users,
    ClipboardList,
    Activity,
} from "lucide-react";
import MobileBottomNav from "@/Components/MobileBottomNav";

export default function SidebarLaporan({ title = "Laporan", children }) {
    const { url } = usePage();
    const [openKeuangan, setOpenKeuangan] = useState(true);
    const [openOperasional, setOpenOperasional] = useState(true);
    const [openRalan, setOpenRalan] = useState(true);
    const [openRanap, setOpenRanap] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) root.classList.add("dark");
        else root.classList.remove("dark");
    }, [isDark]);

    useEffect(() => {
        try {
            const savedCollapsed = localStorage.getItem("laporanSidebarCollapsed");
            if (savedCollapsed !== null) {
                setIsSidebarCollapsed(savedCollapsed === "true");
            }
            const savedOpen = localStorage.getItem("laporanSidebarOpen");
            if (savedOpen !== null) {
                setIsSidebarOpen(savedOpen === "true");
            }
        } catch (_) {}
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("laporanSidebarCollapsed", String(isSidebarCollapsed));
        } catch (_) {}
    }, [isSidebarCollapsed]);

    useEffect(() => {
        try {
            localStorage.setItem("laporanSidebarOpen", String(isSidebarOpen));
        } catch (_) {}
    }, [isSidebarOpen]);

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

    const handleSidebarOverlayClick = () => {
        if (window.innerWidth < 1024) setIsSidebarOpen(false);
    };

    const items = useMemo(
        () => [
            {
                label: "Dashboard",
                href: route("dashboard"),
                icon: <Gauge className="w-4 h-4" />,
            },
            {
                label: "Pusat Laporan",
                href: route("laporan.index"),
                icon: <BarChart2 className="w-4 h-4" />,
            },
            // Tombol dengan submenu diletakkan tepat di bawah anchor "Pusat Laporan"
            {
                label: "Laporan RALAN",
                icon: <Stethoscope className="w-4 h-4" />,
                groupKey: "ralan",
                children: [
                    {
                        label: "Kunjungan Ralan",
                        href: "/laporan/ralan/kunjungan",
                        icon: <Users className="w-4 h-4" />,
                    },
                    {
                        label: "Frekuensi Penyakit Ralan",
                        href: route("laporan.ralan.frekuensi-penyakit"),
                        icon: <Activity className="w-4 h-4" />,
                    },
                ],
            },
            {
                label: "Laporan RANAP",
                icon: <Bed className="w-4 h-4" />,
                groupKey: "ranap",
                children: [
                    {
                        label: "Kunjungan RANAP",
                        href: "/laporan/ranap/kunjungan",
                        icon: <Users className="w-4 h-4" />,
                    },
                    {
                        label: "Frekuensi Penyakit RANAP",
                        href: route("laporan.ranap.frekuensi-penyakit"),
                        icon: <Activity className="w-4 h-4" />,
                    },
                ],
            },
            // Ubah submenu dari "Keuangan" menjadi "Laporan Umum"
            {
                label: "Laporan Umum",
                icon: <ClipboardList className="w-4 h-4" />,
                groupKey: "keuangan",
                children: [
                    {
                        label: "RL Kemenkes",
                        href: "/laporan/rl-kemenkes",
                        icon: <FileText className="w-4 h-4" />,
                    },
                    {
                        label: "Laporan Farmasi",
                        href: "/farmasi/sirkulasi-obat",
                        icon: <FileText className="w-4 h-4" />,
                    },
                    {
                        label: "Laporan BOR",
                        href: "/laporan/bor",
                        icon: <FileText className="w-4 h-4" />,
                    },
                ],
            },
        ],
        []
    );

    const isActive = (href) => {
        try {
            const u = new URL(href, window.location.origin);
            return (url || window.location.pathname).startsWith(u.pathname);
        } catch {
            return (url || window.location.pathname).startsWith(href);
        }
    };

    const isGroupOpen = (groupKey) => {
        if (groupKey === "keuangan") return openKeuangan;
        if (groupKey === "operasional") return openOperasional;
        if (groupKey === "ralan") return openRalan;
        if (groupKey === "ranap") return openRanap;
        return false;
    };

    const toggleGroup = (groupKey) => {
        if (groupKey === "keuangan") {
            setOpenKeuangan((v) => !v);
        } else if (groupKey === "operasional") {
            setOpenOperasional((v) => !v);
        } else if (groupKey === "ralan") {
            setOpenRalan((v) => !v);
        } else if (groupKey === "ranap") {
            setOpenRanap((v) => !v);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <aside
                className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black shadow-2xl border-r border-blue-500/20 dark:border-blue-800 z-40 transition-all duration-300 print:hidden ${
                    isSidebarOpen
                        ? "w-64 translate-x-0"
                        : isSidebarCollapsed
                        ? "w-16 -translate-x-full lg:translate-x-0"
                        : "w-64 -translate-x-full lg:translate-x-0"
                }`}
            >
                <div className="h-14 flex items-center px-3 gap-2 text-white">
                    <BarChart2 className="w-5 h-5" />
                    {!isSidebarCollapsed && (
                        <span className="font-semibold truncate">{title}</span>
                    )}
                </div>
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
                                        onClick={() =>
                                            toggleGroup(item.groupKey)
                                        }
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
                                            (isGroupOpen(item.groupKey) ? (
                                                <ChevronDown className="w-4 h-4 text-white/70" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-white/70" />
                                            ))}
                                    </button>
                                    {isGroupOpen(item.groupKey) && (
                                        <div
                                            className={`mt-1 ${
                                                isSidebarCollapsed
                                                    ? ""
                                                    : "ml-2"
                                            } space-y-1`}
                                        >
                                            {item.children.map(
                                                (child, cIdx) => (
                                                    <Link
                                                        key={cIdx}
                                                        href={child.href}
                                                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                                                            isActive(
                                                                child.href
                                                            )
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

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={handleSidebarOverlayClick}
                />
            )}

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
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                if (window.innerWidth < 1024)
                                    setIsSidebarOpen(!isSidebarOpen);
                                else
                                    setIsSidebarCollapsed(!isSidebarCollapsed);
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
                                Laporan
                            </span>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
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

                        <div className="relative profile-dropdown">
                            <button
                                onClick={() =>
                                    setIsProfileDropdownOpen((v) => !v)
                                }
                                className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
                                    L
                                </span>
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
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main
                className={`pt-16 transition-all duration-300 ${
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

            <MobileBottomNav />
        </div>
    );
}
