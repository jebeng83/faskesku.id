import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import {
    LayoutDashboard,
    Settings,
    Cog,
    NotebookTabs,
    Stethoscope,
    Pill,
    CalendarDays,
    Link as LinkIcon,
    Building2,
    User,
    LogIn,
    Users,
    FileText,
    Home,
} from "lucide-react";

// Theme toggle terkontrol, state diangkat ke parent agar sinkron di semua instance
function ThemeToggle({ isDark, setIsDark }) {
    return (
        <button
            type="button"
            onClick={() => setIsDark((v) => !v)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded border bg-white/70 dark:bg-slate-800 text-slate-700 dark:text-slate-100 hover:bg-white"
            title={isDark ? "Tema gelap aktif" : "Tema terang aktif"}
        >
            <Cog className="w-4 h-4" />
            <span className="text-xs">Tema</span>
        </button>
    );
}

function NavItem({ href, icon: Icon, label, active, collapsed }) {
    return (
        <Link
            href={href}
            aria-label={label}
            title={collapsed ? label : undefined}
            className={`group flex ${
                collapsed
                    ? "justify-center px-2 py-3"
                    : "items-center gap-3 px-3 py-2"
            } rounded text-sm transition-colors ${
                active
                    ? "bg-white/15 text-white ring-1 ring-white/30"
                    : "text-white/90 hover:bg-white/10"
            }`}
        >
            {Icon && (
                <Icon className={`${collapsed ? "w-5 h-5" : "w-4 h-4"}`} />
            )}
            {!collapsed && <span>{label}</span>}
        </Link>
    );
}

function Section({ title, children, collapsed }) {
    return (
        <div className="mb-4">
            {!collapsed && (
                <div className="px-3 py-2 text-[12px] uppercase tracking-wide text-white/80">
                    {title}
                </div>
            )}
            <div className="flex flex-col gap-1">{children}</div>
        </div>
    );
}

// Helper to safely resolve Ziggy route names with a fallback path
function safeRoute(name, fallback) {
    try {
        return route(name);
    } catch (_) {
        return fallback;
    }
}

export default function SidebarPengaturan({
    title = "Pengaturan",
    children,
    wide = false,
}) {
    const { url } = usePage();

    // State mirip LanjutanRalanLayout: open (mobile), collapsed (desktop), dan dark theme
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("pengaturanSidebarOpen") === "true";
    });
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("pengaturanSidebarCollapsed") === "true";
    });

    // State tema terpusat + sinkron dengan prefers-color-scheme
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") return false;
        const saved = localStorage.getItem("theme");
        if (saved === "dark") return true;
        if (saved === "light") return false;
        return (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        );
    });

    useEffect(() => {
        try {
            localStorage.setItem(
                "pengaturanSidebarOpen",
                String(isSidebarOpen)
            );
        } catch (_) {}
    }, [isSidebarOpen]);

    useEffect(() => {
        try {
            localStorage.setItem(
                "pengaturanSidebarCollapsed",
                String(isSidebarCollapsed)
            );
        } catch (_) {}
    }, [isSidebarCollapsed]);

    useEffect(() => {
        try {
            document.documentElement.classList.toggle("dark", isDark);
            localStorage.setItem("theme", isDark ? "dark" : "light");
        } catch (_) {}
    }, [isDark]);

    const paths = useMemo(
        () => ({
            dashboard: safeRoute("dashboard", "/dashboard"),
            profileHome: safeRoute("profile.home", "/profile/home"),
            settingIndex: safeRoute("setting.index", "/setting"),
            pcareSetting: safeRoute("pcare.setting.index", "/pcare/setting"),
            mobileJknSetting: safeRoute(
                "pcare.setting.mobilejkn.index",
                "/pcare/setting-mobilejkn"
            ),
            pcareMapDokter: safeRoute(
                "pcare.mapping.dokter",
                "/pcare/mapping/dokter"
            ),
            pcareMapPoli: safeRoute(
                "pcare.mapping.poli",
                "/pcare/mapping/poli"
            ),
            pcareMapObat: safeRoute(
                "pcare.mapping.obat",
                "/pcare/mapping/obat"
            ),
            jadwalDokter: safeRoute("jadwal.index", "/jadwal"),
            ssOrg: safeRoute(
                "satusehat.prerequisites.organization",
                "/satusehat/prerequisites/organization"
            ),
            ssLoc: safeRoute(
                "satusehat.prerequisites.location",
                "/satusehat/prerequisites/location"
            ),
            ssLocFarmasi: safeRoute(
                "satusehat.prerequisites.location_farmasi",
                "/satusehat/prerequisites/location-farmasi"
            ),
            ssLocRanap: safeRoute(
                "satusehat.prerequisites.location_ranap",
                "/satusehat/prerequisites/location-ranap"
            ),
            // Setting User
            userIndex: safeRoute("users.index", "/users"),
            userLogin: safeRoute("login", "/login"),
            userMapping: safeRoute("permissions.index", "/permissions"),
            // Kepegawaian
            employeesIndex: safeRoute("employees.index", "/employees"),
            sipPegawaiIndex: safeRoute("sip-pegawai.index", "/sip-pegawai"),
        }),
        []
    );

    const isActive = (href) => {
        try {
            const u = new URL(href, window.location.origin);
            return (url || window.location.pathname).startsWith(u.pathname);
        } catch (_) {
            return (url || window.location.pathname).startsWith(href);
        }
    };

    const handleSidebarOverlayClick = () => {
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full overflow-y-auto bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black shadow-2xl border-r border-blue-500/20 dark:border-blue-800 z-40 transition-all duration-300 ${
                    isSidebarOpen
                        ? "w-64 translate-x-0"
                        : isSidebarCollapsed
                        ? "w-16 -translate-x-full lg:translate-x-0"
                        : "w-64 -translate-x-full lg:translate-x-0"
                }`}
            >
                <div className="flex items-center justify-between px-3 py-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <Link
                            href={paths.dashboard}
                            className="inline-flex items-center gap-2"
                        >
                            <LayoutDashboard className="w-5 h-5 text-white" />
                            {!isSidebarCollapsed && (
                                <span className="text-sm font-semibold text-white">
                                    {title}
                                </span>
                            )}
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        {!isSidebarCollapsed && (
                            <ThemeToggle
                                isDark={isDark}
                                setIsDark={setIsDark}
                            />
                        )}
                        <button
                            type="button"
                            onClick={() => setIsSidebarCollapsed((v) => !v)}
                            className="inline-flex items-center justify-center w-8 h-8 rounded border bg-white/20 text-white hover:bg-white/30"
                            title={
                                isSidebarCollapsed
                                    ? "Perbesar sidebar"
                                    : "Perkecil sidebar"
                            }
                        >
                            <span className="sr-only">Toggle</span>
                            {isSidebarCollapsed ? "»" : "«"}
                        </button>
                    </div>
                </div>

                <nav className="px-2 py-2 text-white">
                    <Section title="Menu Utama" collapsed={isSidebarCollapsed}>
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.dashboard}
                            icon={LayoutDashboard}
                            label="Dashboard"
                            active={isActive(paths.dashboard)}
                        />
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.profileHome}
                            icon={Home}
                            label="Home"
                            active={isActive(paths.profileHome)}
                        />
                    </Section>

                    <Section
                        title="Pengaturan Aplikasi"
                        collapsed={isSidebarCollapsed}
                    >
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.settingIndex}
                            icon={Settings}
                            label="Setting Aplikasi"
                            active={isActive(paths.settingIndex)}
                        />
                    </Section>

                    {/* Setting User */}
                    <Section
                        title="Setting User"
                        collapsed={isSidebarCollapsed}
                    >
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.userIndex}
                            icon={User}
                            label="User"
                            active={isActive(paths.userIndex)}
                        />
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.userLogin}
                            icon={LogIn}
                            label="User Login"
                            active={isActive(paths.userLogin)}
                        />
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.userMapping}
                            icon={NotebookTabs}
                            label="Mapping"
                            active={isActive(paths.userMapping)}
                        />
                    </Section>

                    {/* Kepegawaian */}
                    <Section title="Kepegawaian" collapsed={isSidebarCollapsed}>
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.employeesIndex}
                            icon={Users}
                            label="Pegawai"
                            active={isActive(paths.employeesIndex)}
                        />
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.sipPegawaiIndex}
                            icon={FileText}
                            label="SIP Pegawai"
                            active={isActive(paths.sipPegawaiIndex)}
                        />
                    </Section>

                    <Section
                        title="Bridging PCare"
                        collapsed={isSidebarCollapsed}
                    >
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.pcareSetting}
                            icon={LinkIcon}
                            label="Setting Bridging PCare"
                            active={isActive(paths.pcareSetting)}
                        />
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.mobileJknSetting}
                            icon={LinkIcon}
                            label="Setting Mobile JKN"
                            active={isActive(paths.mobileJknSetting)}
                        />
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.pcareMapDokter}
                            icon={Stethoscope}
                            label="Mapping Dokter PCare"
                            active={isActive(paths.pcareMapDokter)}
                        />
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.pcareMapPoli}
                            icon={NotebookTabs}
                            label="Mapping Poli PCare"
                            active={isActive(paths.pcareMapPoli)}
                        />
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.pcareMapObat}
                            icon={Pill}
                            label="Mapping Obat PCare"
                            active={isActive(paths.pcareMapObat)}
                        />
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.jadwalDokter}
                            icon={CalendarDays}
                            label="Jadwal Dokter"
                            active={isActive(paths.jadwalDokter)}
                        />
                    </Section>

                    <Section
                        title="Bridging Satu Sehat"
                        collapsed={isSidebarCollapsed}
                    >
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.ssOrg}
                            icon={Building2}
                            label="Mapping Organisasi"
                            active={isActive(paths.ssOrg)}
                        />
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.ssLoc}
                            icon={NotebookTabs}
                            label="Mapping Location"
                            active={isActive(paths.ssLoc)}
                        />
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.ssLocFarmasi}
                            icon={NotebookTabs}
                            label="Mapping Location Farmasi"
                            active={isActive(paths.ssLocFarmasi)}
                        />
                        <NavItem
                            collapsed={isSidebarCollapsed}
                            href={paths.ssLocRanap}
                            icon={NotebookTabs}
                            label="Mapping Location Ranap"
                            active={isActive(paths.ssLocRanap)}
                        />
                    </Section>
                </nav>
            </aside>

            {/* Mobile sidebar overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
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
                        <button
                            onClick={() => {
                                if (window.innerWidth < 1024) {
                                    setIsSidebarOpen(!isSidebarOpen);
                                } else {
                                    setIsSidebarCollapsed(!isSidebarCollapsed);
                                }
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
                                href={paths.dashboard}
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
                                {title}
                            </span>
                        </nav>
                    </div>

                    {/* Right side - Theme toggle */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
                    </div>
                </div>
            </header>

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
                <div
                    className={`${
                        wide ? "max-w-[120rem]" : "max-w-7xl"
                    } mx-auto px-2 sm:px-4 py-6`}
                >
                    {children}
                </div>
            </main>
        </div>
    );
}
