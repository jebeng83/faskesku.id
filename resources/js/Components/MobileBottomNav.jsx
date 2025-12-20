import React, { useMemo, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import {
    Home,
    Stethoscope,
    Bed,
    UserPlus,
    Link as LinkIcon,
    Ambulance,
    FlaskConical,
    Radiation,
    Pill,
    Wallet,
    Settings,
    MoreHorizontal,
    X,
} from "lucide-react";

function buildShortcuts(permissionNames) {
    const hasPermission = (permission) =>
        !permission || permissionNames.includes(permission);

    const safeRoute = (name, params = {}) => {
        try {
            return route(name, params, false);
        } catch (e) {
            return "#";
        }
    };

    const base = [
        {
            key: "register",
            label: "Register",
            href: safeRoute("registration.lanjutan"),
            icon: <UserPlus className="w-5 h-5" />,
            requiredPermission: "group.registrasi.access",
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
            href: "/akutansi/home",
            icon: <Wallet className="w-5 h-5" />,
            requiredPermission: "group.keuangan.access",
        },
        {
            key: "settings",
            label: "Pengaturan",
            href: safeRoute("profile.home", "/profile/home"),
            icon: <Settings className="w-5 h-5" />,
            requiredPermission: "group.pengaturan.access",
        },
    ];

    return base.filter((item) => hasPermission(item.requiredPermission));
}

function MoreMenuSheet({ open, onClose, shortcuts }) {
    if (!open) return null;
    const items = Array.isArray(shortcuts)
        ? shortcuts.filter(
              (item) => item && !["rajal", "ranap"].includes(item.key)
          )
        : [];
    if (items.length === 0) return null;

    return (
        <div className="fixed inset-0 z-50 md:hidden">
            <button
                type="button"
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />
            <div className="absolute inset-x-0 bottom-0 max-h-[70vh] rounded-t-2xl bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800 p-4">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        Menu lainnya
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-full bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-200"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {items.map((item) => (
                        <Link
                            key={item.key}
                            href={item.href || "#"}
                            onClick={onClose}
                            className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50/80 dark:bg-gray-800/60 p-3 text-xs text-slate-700 dark:text-gray-200"
                        >
                            <div className="p-2 rounded-full bg-white dark:bg-gray-900">
                                {item.icon}
                            </div>
                            <span className="text-center">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function MobileBottomNav() {
    const { props } = usePage();
    const permissionNames = Array.isArray(props?.auth?.permissions)
        ? props.auth.permissions
        : [];

    const shortcuts = useMemo(
        () => buildShortcuts(permissionNames),
        [permissionNames]
    );

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

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
                <div className="h-16 bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800 flex items-center justify-around px-3">
                    {bottomNavItems.map((item) => {
                        const content = (
                            <>
                                <div className="p-2 rounded-full bg-slate-100 dark:bg-gray-800">
                                    {item.icon}
                                </div>
                                <span className="truncate max-w-[4rem] text-[11px]">
                                    {item.label}
                                </span>
                            </>
                        );
                        if (item.onClick) {
                            return (
                                <button
                                    key={item.key}
                                    type="button"
                                    onClick={item.onClick}
                                    className="flex flex-col items-center gap-1 text-slate-700 dark:text-gray-200"
                                >
                                    {content}
                                </button>
                            );
                        }
                        return (
                            <Link
                                key={item.key}
                                href={item.href || "#"}
                                className="flex flex-col items-center gap-1 text-slate-700 dark:text-gray-200"
                            >
                                {content}
                            </Link>
                        );
                    })}
                </div>
            </nav>
            <MoreMenuSheet
                open={showMoreMenu}
                onClose={() => setShowMoreMenu(false)}
                shortcuts={shortcuts}
            />
        </>
    );
}

