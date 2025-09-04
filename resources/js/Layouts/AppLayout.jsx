import React, { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import ToastContainer from '@/tools/ToastContainer';
import { toast } from '@/tools/toast';

export default function AppLayout({ title = 'Faskesku', children, variant = 'default' }) {
    const { props } = usePage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [collapsedGroups, setCollapsedGroups] = useState({
        'Navigation': false,
        'Rekam Medis': false,
        'Farmasi': false,
        'Authentication': false,
        'Pengaturan': false,
        'Support': false,
    });
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDark]);

    // Bridge flash -> toast
    useEffect(() => {
        const f = props?.flash || {};
        if (f.success) toast(f.success, 'success');
        if (f.error) toast(f.error, 'error');
        if (f.warning) toast(f.warning, 'warning');
    }, [props?.flash]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileDropdownOpen]);

    const toggleGroup = (groupTitle) => {
        setCollapsedGroups(prev => ({
            ...prev,
            [groupTitle]: !prev[groupTitle]
        }));
    };

    if (variant === 'auth') {
        return (
            <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black">
                <header className="h-14 flex items-center justify-between px-4 max-w-6xl mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-md bg-blue-600 shadow-sm" />
                        <span className="font-semibold tracking-tight text-gray-900 dark:text-white">{title}</span>
                        <span className="hidden sm:inline text-xs text-gray-500 dark:text-gray-400">SIMRS</span>
                    </div>
                    <button onClick={() => setIsDark(v => !v)} className="p-2 rounded-md hover:bg-white/50 dark:hover:bg-white/5" aria-label="Toggle theme">
                        {isDark ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75 9.75 9.75 0 0 1 9.9 2.28a.75.75 0 0 1 .893.987A8.25 8.25 0 0 0 20.73 13.86a.75.75 0 0 1 1.022.893Z"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z"/></svg>
                        )}
                    </button>
                </header>
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute -top-28 -right-24 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-purple-400/10 blur-3xl" />
                </div>
                <main className="min-h-[calc(100vh-56px)] grid lg:grid-cols-2 items-stretch gap-6 max-w-6xl mx-auto px-4 pb-10">
                    <section className="hidden lg:flex flex-col justify-center">
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">Selamat datang kembali</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Masuk untuk mengelola SIMRS Faskesku Anda. Aman, cepat, dan modern.</p>
                        <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-500"/> Single Sign-On dan Role-based Access</li>
                            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-indigo-500"/> UI responsif ala Gradient Able</li>
                            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-purple-500"/> Audit & keamanan sesuai best practice</li>
                        </ul>
                    </section>
                    <section className="flex items-center justify-center">
                        <div className="w-full max-w-md">
                            {children}
                        </div>
                    </section>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <ToastContainer />
            {/* Top Navigation Bar - Gradient Able Style */}
            <header className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
                <div className="h-full flex items-center justify-between px-4">
                    {/* Left side - Toggle + Logo */}
                    <div className="flex items-center gap-3">
                        {/* Sidebar Toggle Button */}
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M3.75 5.25h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm0 7.5h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm0 7.5h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Z"/>
                            </svg>
                        </button>
                        
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900 dark:text-white text-sm">{title}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Elektronik Rekam Medis</span>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Search + Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="hidden md:flex items-center relative">
                            <input 
                                className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" 
                                placeholder="Cari..." 
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-400 absolute left-3">
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"/>
                            </svg>
                        </div>

                        {/* Notifications */}
                        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-400">
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                            </svg>
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Messages */}
                        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-400">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full"></span>
                        </button>

                        {/* User Profile Dropdown */}
                        <UserProfileDropdown 
                            isOpen={isProfileDropdownOpen}
                            onToggle={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        />
                    </div>
                </div>
            </header>

            {/* Sidebar - Gradient Able Style */}
            <aside className={`fixed lg:sticky top-14 left-0 z-40 h-[calc(100vh-56px)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-all duration-300 ${
                isSidebarOpen ? 'translate-x-0 w-64' : 
                isSidebarCollapsed ? 'lg:translate-x-0 lg:w-16 -translate-x-full' : 
                'lg:translate-x-0 lg:w-64 -translate-x-full'
            }`}>
                {/* Mobile backdrop */}
                {isSidebarOpen && (
                    <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
                )}

                <div className="h-full flex flex-col">
                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {!isSidebarCollapsed ? (
                            <>
                                <NavGroup title="Navigation" onToggle={toggleGroup} isCollapsed={collapsedGroups['Navigation']}>
                                    <NavItem icon="home" label="Dashboard" href={route('dashboard')} active />
                                </NavGroup>
                                
                                <NavGroup title="Rekam Medis" onToggle={toggleGroup} isCollapsed={collapsedGroups['Rekam Medis']}>
                                    <NavItem icon="users" label="Data Pasien" href={route('patients.index')} />
                                    <NavItem icon="user-md" label="Data Dokter" />
                                    <NavItem icon="walking" label="Data Rawat Jalan" />
                                    <NavItem icon="bed" label="Data Rawat Inap" />
                                </NavGroup>
                                
                                <NavGroup title="Farmasi" onToggle={toggleGroup} isCollapsed={collapsedGroups['Farmasi']}>
                                    <NavItem icon="pills" label="Data Obat" href={route('data-barang.index')} />
                                    <NavItem icon="shopping-cart" label="Stok Obat" href={route('farmasi.stok-obat')} />
                                    <NavItem icon="clipboard" label="Resep Obat" href={route('farmasi.resep-obat')} />
                                    <NavItem icon="truck" label="Pembelian Obat" href={route('farmasi.pembelian-obat')} />
                                    <NavItem icon="dollar-sign" label="Penjualan Obat" href={route('farmasi.penjualan-obat')} />
                                </NavGroup>
                                
                                <NavGroup title="Authentication" onToggle={toggleGroup} isCollapsed={collapsedGroups['Authentication']}>
                                    <NavItem icon="lock" label="Login" />
                                    <NavItem icon="log-in" label="Register" />
                                    <NavItem icon="unlock" label="Reset Password" />
                                </NavGroup>
                                
                                <NavGroup title="Pengaturan" onToggle={toggleGroup} isCollapsed={collapsedGroups['Pengaturan']}>
                                    <NavItem icon="settings" label="Setting Aplikasi" href={route('settings.index')} />
                                    <NavItem icon="dollar-sign" label="Set Harga Obat" href={route('set-harga-obat.index')} />
                                </NavGroup>
                                
                                <NavGroup title="Support" onToggle={toggleGroup} isCollapsed={collapsedGroups['Support']}>
                                    <NavItem icon="sidebar" label="Sample Page" />
                                    <NavItem icon="help-circle" label="Documentation" />
                                </NavGroup>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <NavItemCollapsed icon="home" href={route('dashboard')} active />
                                <NavItemCollapsed icon="users" />
                                <NavItemCollapsed icon="pills" />
                                <NavItemCollapsed icon="lock" />
                                <NavItemCollapsed icon="log-in" />
                                <NavItemCollapsed icon="unlock" />
                                <NavItemCollapsed icon="settings" />
                                <NavItemCollapsed icon="sidebar" />
                                <NavItemCollapsed icon="help-circle" />
                            </div>
                        )}
                    </nav>

                    {/* Bottom Card - Gradient Pro */}
                    {!isSidebarCollapsed && (
                        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">F</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Faskesku.id</h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Sistem Informasi Free & open Source </p>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-md transition-colors">
                                    Panduan Aplikasi
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className={`absolute top-14 left-0 right-0 bottom-0 transition-all duration-300 ${
                isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
            }`}>
                {children}
            </main>
        </div>
    );
}

function NavGroup({ title, children, onToggle, isCollapsed = false }) {
    return (
        <div className="mb-6">
            <button 
                onClick={() => onToggle && onToggle(title)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
                <span>{title}</span>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className={`w-3 h-3 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
                >
                    <path d="M7 14l5-5 5 5z"/>
                </svg>
            </button>
            {!isCollapsed && (
                <div className="space-y-1 mt-2">
                    {children}
                </div>
            )}
        </div>
    );
}

function NavItem({ icon, label, active = false, hasSubmenu = false, href = "#" }) {
    return (
        <a 
            href={href} 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                {icon === 'home' && <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>}
                {icon === 'box' && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>}
                {icon === 'users' && <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5c-.47-.62-1.21-.99-2.01-.99H9.46c-.8 0-1.54.37-2.01.99L6 10.5c-.47-.62-1.21-.99-2.01-.99H2.46c-.8 0-1.54.37-2.01.99L0 10.5v9.5h2v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2z"/>}
                {icon === 'user-md' && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>}
                {icon === 'pills' && <path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-2.21.9-4.21 2.34-5.66L4.93 4.93C3.12 6.74 2 9.24 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/>}
                {icon === 'walking' && <path d="M13.5 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/>}
                {icon === 'bed' && <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm12-7h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-1.1-.9-2-2-2z"/>}
                {icon === 'lock' && <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>}
                {icon === 'log-in' && <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v12z"/>}
                {icon === 'unlock' && <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/>}
                {icon === 'sidebar' && <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>}
                {icon === 'help-circle' && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>}
                {icon === 'settings' && <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>}
                {icon === 'shopping-cart' && <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>}
                {icon === 'clipboard' && <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>}
                {icon === 'truck' && <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>}
                {icon === 'dollar-sign' && <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>}
            </svg>
            <span className="flex-1">{label}</span>
            {hasSubmenu && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
            )}
        </a>
    );
}

function NavItemCollapsed({ icon, active = false, href = "#" }) {
    return (
        <a 
            href={href} 
            className={`flex items-center justify-center p-3 rounded-lg transition-colors ${
                active 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title={icon}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                {icon === 'home' && <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>}
                {icon === 'box' && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>}
                {icon === 'users' && <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5c-.47-.62-1.21-.99-2.01-.99H9.46c-.8 0-1.54.37-2.01.99L6 10.5c-.47-.62-1.21-.99-2.01-.99H2.46c-.8 0-1.54.37-2.01.99L0 10.5v9.5h2v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2z"/>}
                {icon === 'user-md' && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>}
                {icon === 'pills' && <path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-2.21.9-4.21 2.34-5.66L4.93 4.93C3.12 6.74 2 9.24 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/>}
                {icon === 'walking' && <path d="M13.5 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/>}
                {icon === 'bed' && <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm12-7h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-1.1-.9-2-2-2z"/>}
                {icon === 'lock' && <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>}
                {icon === 'log-in' && <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v12z"/>}
                {icon === 'unlock' && <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/>}
                {icon === 'sidebar' && <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>}
                {icon === 'help-circle' && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>}
                {icon === 'settings' && <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>}
                {icon === 'shopping-cart' && <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>}
                {icon === 'clipboard' && <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>}
                {icon === 'truck' && <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>}
                {icon === 'dollar-sign' && <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>}
            </svg>
        </a>
    );
}

function UserProfileDropdown({ isOpen, onToggle }) {
    return (
        <div className="relative profile-dropdown">
            {/* Profile Button */}
            <button 
                onClick={onToggle}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">JD</span>
                </div>
                <div className="hidden sm:block">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">John Doe</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Administrator</div>
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    {/* Header */}
                    <div className="bg-blue-600 rounded-t-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-white font-medium text-sm">JD</span>
                            </div>
                            <div>
                                <div className="text-white font-medium">John Doe</div>
                                <div className="text-blue-100 text-xs">Administrator</div>
                            </div>
                        </div>
                        <button 
                            onClick={() => router.post(route('logout'))}
                            className="p-1 rounded hover:bg-white/20 transition-colors"
                            title="Logout"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                            </svg>
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                            </svg>
                            Settings
                        </a>
                        
                        <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                            Profile
                        </a>
                        
                        <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            My Messages
                        </a>
                        
                        <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                            </svg>
                            Lock Screen
                        </a>
                        
                        <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                            </svg>
                            Logout
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}


