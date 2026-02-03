import React from 'react';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

// Import icons (assuming these are available or will be created)
// For now, using simple SVG placeholders or common icons
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const SalesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);
const ProductsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
);
const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const NavItem = ({ icon: Icon, label, href, active, ...rest }) => {
    const isActive = active || (href && route().current(href));
    return (
        <Link
            href={href}
            className={`flex items-center justify-center p-3 rounded-lg transition-colors duration-200 ${isActive
                    ? 'bg-white/20 text-white shadow-md'
                    : 'text-blue-100/70 hover:bg-white/10 hover:text-white'
                }`}
            title={label}
            {...rest}
        >
            <Icon />
        </Link>
    );
};

export default function LayoutPOS({ children }) {

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-20 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black text-white flex flex-col items-center py-4 shadow-2xl border-r border-blue-500/20 dark:border-blue-800">
                {/* Logo or App Name Initial */}
                <div className="mb-8">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">F</span>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex flex-col space-y-4">
                    <NavItem icon={HomeIcon} label="Dashboard" href={route('dashboard', {}, false)} active={route().current('dashboard')} />
                    <NavItem icon={SalesIcon} label="Penjualan" href={route('farmasi.penjualan-obat', {}, false)} active={route().current('farmasi.penjualan-obat')} />
                    <NavItem icon={ProductsIcon} label="Produk" href={route('farmasi.data-obat', {}, false)} active={route().current('farmasi.data-obat')} />
                </nav>

                {/* Spacer to push settings/logout to bottom */}
                <div className="flex-grow"></div>

                {/* Bottom Navigation Items */}
                <div className="flex flex-col space-y-4 mt-auto">
                    <NavItem icon={SettingsIcon} label="Pengaturan" href={route('setting.index', {}, false)} active={route().current('setting.index')} />
                    <NavItem icon={LogoutIcon} label="Logout" href={route('logout', {}, false)} method="post" as="button" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}
