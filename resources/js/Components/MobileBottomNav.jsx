import React from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import { UserPlus, Stethoscope, FlaskConical, Pill, CreditCard } from "lucide-react";

const MobileBottomNav = React.memo(function MobileBottomNav() {
    const navItems = [
        { href: route("registration.index"), label: "Pendaftaran", icon: UserPlus },
        { href: route("rawat-jalan.index"), label: "Rawat Jalan", icon: Stethoscope },
        { href: route("laboratorium.permintaan-lab.index"), label: "Laborat", icon: FlaskConical },
        { href: route("farmasi.permintaan-resep"), label: "Farmasi", icon: Pill },
        { href: route("akutansi.kasir-ralan.page"), label: "Kasir", icon: CreditCard },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 dark:bg-gray-900/85 backdrop-blur border-t border-slate-200/70 dark:border-gray-800">
            <div className="h-16 px-4 pb-[env(safe-area-inset-bottom)]">
                <div className="grid grid-cols-5 gap-2 h-full">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="group flex flex-col items-center justify-center rounded-lg text-xs font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                        >
                            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                            <span className="mt-1">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
});

export default MobileBottomNav;

