import React, { useState, useMemo, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { 
    Pill,
    Gauge,
    ClipboardList,
    ShoppingCart,
    Truck,
    Boxes,
    FlaskConical,
    Package,
    Settings,
    ChevronDown,
    ChevronRight,
    Home,
    BarChart2,
} from "lucide-react";
import useTheme from "@/hooks/useTheme";
import usePermission from "@/hooks/usePermission";

// Sidebar khusus modul Farmasi, konsisten dengan pola LanjutanRalanLayout/SidebarRalan
export default function SidebarFarmasi({ title = "Farmasi", children }) {
    const { url, props } = usePage();
    const auth = props?.auth || {};
    const menuHierarchy = props?.menu_hierarchy || [];

    // State untuk menu dan tampilan
    const [openPelayanan, setOpenPelayanan] = useState(true);
    const [openMaster, setOpenMaster] = useState(false);
    const [openLaporan, setOpenLaporan] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { isDark, toggleDarkLight } = useTheme();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [expandedGroupIds, setExpandedGroupIds] = useState(new Set());

    

    // Restore sidebar toggle state dari localStorage
    useEffect(() => {
        try {
            const savedCollapsed = localStorage.getItem(
                "farmasiSidebarCollapsed"
            );
            if (savedCollapsed !== null)
                setIsSidebarCollapsed(savedCollapsed === "true");
            const savedOpen = localStorage.getItem("farmasiSidebarOpen");
            if (savedOpen !== null) setIsSidebarOpen(savedOpen === "true");
        } catch (_) {}
    }, []);

    // Persist sidebar states
    useEffect(() => {
        try {
            localStorage.setItem(
                "farmasiSidebarCollapsed",
                String(isSidebarCollapsed)
            );
        } catch (_) {}
    }, [isSidebarCollapsed]);
    useEffect(() => {
        try {
            localStorage.setItem("farmasiSidebarOpen", String(isSidebarOpen));
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

    const resolveRouteUrl = (routeName, absolute = false) => {
        const candidates = [];
        if (typeof routeName === "string") {
            const raw = routeName;
            candidates.push(raw);
            candidates.push(raw.toLowerCase());
            candidates.push(raw.replace(/\s+/g, "-").toLowerCase());
            candidates.push(raw.replace(/\s+/g, "_").toLowerCase());
        } else if (routeName) {
            candidates.push(routeName);
        }
        for (const name of candidates) {
            try {
                const u = route(name, {}, absolute);
                if (u) return u;
            } catch (_) {}
        }
        return null;
    };

    const isMenuEnabled = (menu) => {
        if (!menu || typeof menu !== "object") return false;
        const val = menu.is_active;
        if (
            val === false ||
            val === 0 ||
            val === "0" ||
            val === "inactive" ||
            val === "disabled"
        ) {
            return false;
        }
        return true;
    };

    const getMenuUrl = (menu) => {
        if (!menu) return "#";
        if (
            menu.slug === "farmasi" ||
            (menu.name && String(menu.name).toLowerCase() === "farmasi")
        ) {
            try {
                return route("farmasi.index", {}, false);
            } catch (_) {
                return "/farmasi";
            }
        }
        if (menu.url) {
            try {
                const currentOrigin = window.location.origin;
                const u = new URL(menu.url, currentOrigin);
                return u.pathname + u.search + u.hash;
            } catch (_) {
                if (String(menu.url).startsWith("/")) return menu.url;
                return "/" + String(menu.url).replace(/^https?:\/\/[^/]+/, "");
            }
        }
        if (menu.route) {
            const u = resolveRouteUrl(menu.route, false);
            if (u) return u;
            return "#";
        }
        return "#";
    };

    const findFarmasiNode = useMemo(() => {
        const source = Array.isArray(menuHierarchy)
            ? menuHierarchy
            : menuHierarchy && typeof menuHierarchy === "object"
            ? Object.values(menuHierarchy)
            : [];
        const match = (m) => {
            const slug = (m?.slug || "").toLowerCase();
            const name = (m?.name || "").toLowerCase();
            return slug === "farmasi" || name.includes("farmasi");
        };
        const dfs = (arr) => {
            if (!Array.isArray(arr)) return null;
            for (const m of arr) {
                if (match(m)) return m;
                const children = Array.isArray(m?.active_children_recursive)
                    ? m.active_children_recursive
                    : Array.isArray(m?.children)
                    ? m.children
                    : [];
                const found = dfs(children);
                if (found) return found;
            }
            return null;
        };
        return dfs(source);
    }, [menuHierarchy]);

    const dynamicItems = useMemo(() => {
        if (!findFarmasiNode) return null;
        const rawChildren = Array.isArray(
            findFarmasiNode.active_children_recursive
        )
            ? findFarmasiNode.active_children_recursive
            : Array.isArray(findFarmasiNode.children)
            ? findFarmasiNode.children
            : [];
        const children = rawChildren.filter(isMenuEnabled);
        if (!children.length) return null;
        const built = [];
        for (const child of children) {
            const grand = (
                Array.isArray(child.active_children_recursive)
                    ? child.active_children_recursive
                    : Array.isArray(child.children)
                    ? child.children
                    : []
            ).filter(isMenuEnabled);
            if (grand.length > 0) {
                built.push({
                    __dynamic: true,
                    id: child.id,
                    label: child.name || child.slug || "Menu",
                    icon: <i className={`${child.icon || ""} w-4 h-4`}></i>,
                    children: grand.map((g) => ({
                        label: g.name || g.slug || "Menu",
                        href: getMenuUrl(g),
                        icon: <i className={`${g.icon || ""} w-4 h-4`}></i>,
                    })),
                });
            } else {
                built.push({
                    __dynamic: true,
                    id: child.id,
                    label: child.name || child.slug || "Menu",
                    href: getMenuUrl(child),
                    icon: <i className={`${child.icon || ""} w-4 h-4`}></i>,
                });
            }
        }
        return [
            {
                label: "Dashboard",
                href: route("dashboard", {}, false),
                icon: <Gauge className="w-4 h-4" />,
            },
            {
                label: "Home",
                href: (() => {
                    try {
                        return route("farmasi.index", {}, false);
                    } catch (_) {
                        return "/farmasi";
                    }
                })(),
                icon: <Home className="w-4 h-4" />,
            },
            ...built,
        ];
    }, [findFarmasiNode]);

    const hutangObatUrl = (() => {
        try {
            return route("farmasi.hutang-obat", {}, false);
        } catch (_) {
            return "/farmasi/hutang-obat";
        }
    })();

    const riwayatBarangMedisUrl = (() => {
        try {
            return route("farmasi.riwayat-barang-medis", {}, false);
        } catch (_) {
            return "/farmasi/riwayat-barang-medis";
        }
    })();

    const riwayatTransaksiGudangUrl = (() => {
        try {
            return route("farmasi.riwayat-transaksi-gudang", {}, false);
        } catch (_) {
            return "/farmasi/riwayat-transaksi-gudang";
        }
    })();

    const sisaStokUrl = (() => {
        try {
            return route("farmasi.sisa-stok", {}, false);
        } catch (_) {
            return "/farmasi/sisa-stok";
        }
    })();

    const sirkulasiObatUrl = (() => {
        try {
            return route("farmasi.sirkulasi-obat", {}, false);
        } catch (_) {
            return "/farmasi/sirkulasi-obat";
        }
    })();

    const cekStokObatUrl = (() => {
        try {
            return route("farmasi.cek-stok-obat", {}, false);
        } catch (_) {
            return "/farmasi/cek-stok-obat";
        }
    })();

    const { can } = usePermission();

    const items = useMemo(() => {
        if (dynamicItems && Array.isArray(dynamicItems)) return dynamicItems;
        const base = [
            {
                label: "Dashboard",
                href: route("dashboard", {}, false),
                icon: <Gauge className="w-4 h-4" />,
                permission: "farmasi.dashboard",
            },
            {
                label: "Home",
                href: route("farmasi.index", {}, false),
                icon: <Home className="w-4 h-4" />,
                permission: "farmasi.index",
            },
            {
                label: "Pelayanan Farmasi",
                icon: <Pill className="w-4 h-4" />,
                children: [
                    {
                        label: "Stok Opname",
                        href: route("farmasi.stok-opname", {}, false),
                        icon: <ClipboardList className="w-4 h-4" />,
                        permission: "farmasi.stok-opname",
                    },
                    {
                        label: "Pembelian Obat",
                        href: route("farmasi.pembelian-obat", {}, false),
                        icon: <Truck className="w-4 h-4" />,
                        permission: "farmasi.pembelian-obat",
                    },
                    {
                        label: "Hutang Obat",
                        href: hutangObatUrl,
                        icon: <ClipboardList className="w-4 h-4" />,
                        permission: "farmasi.hutang-obat",
                    },
                    {
                        label: "Penjualan Obat",
                        href: route("farmasi.penjualan-obat", {}, false),
                        icon: <ShoppingCart className="w-4 h-4" />,
                        permission: "farmasi.penjualan-obat",
                    },
                    {
                        label: "Permintaan Obat",
                        href: route("farmasi.permintaan-resep", {}, false),
                        icon: <Package className="w-4 h-4" />,
                        permission: "farmasi.permintaan-resep",
                    },
                ],
            },
            {
                label: "Master Data",
                icon: <Settings className="w-4 h-4" />,
                children: [
                    {
                        label: "Industri Farmasi",
                        href: route("farmasi.industri-farmasi.index", {}, false),
                        icon: <ClipboardList className="w-4 h-4" />,
                        permission: "farmasi.industri-farmasi.index",
                    },
                    {
                        label: "Data Suplier",
                        href: route("farmasi.datasuplier.index", {}, false),
                        icon: <Truck className="w-4 h-4" />,
                        permission: "farmasi.datasuplier.index",
                    },
                    {
                        label: "Satuan Barang",
                        href: route("farmasi.satuan-barang.index", {}, false),
                        icon: <ClipboardList className="w-4 h-4" />,
                        permission: "farmasi.satuan-barang.index",
                    },
                    {
                        label: "Metode Racik",
                        href: route("farmasi.metode-racik.index", {}, false),
                        icon: <FlaskConical className="w-4 h-4" />,
                        permission: "farmasi.metode-racik.index",
                    },
                    {
                        label: "Konversi Satuan",
                        href: route("farmasi.konversi-satuan.index", {}, false),
                        icon: <ClipboardList className="w-4 h-4" />,
                        permission: "farmasi.konversi-satuan.index",
                    },
                    {
                        label: "Jenis Obat, Alkes & BHP",
                        href: route("farmasi.jenis-obat.index", {}, false),
                        icon: <Pill className="w-4 h-4" />,
                        permission: "farmasi.jenis-obat.index",
                    },
                    {
                        label: "Kategori Obat",
                        href: route("farmasi.kategori-obat.index", {}, false),
                        icon: <ClipboardList className="w-4 h-4" />,
                        permission: "farmasi.kategori-obat.index",
                    },
                    {
                        label: "Golongan Obat",
                        href: route("farmasi.golongan-obat.index", {}, false),
                        icon: <ClipboardList className="w-4 h-4" />,
                        permission: "farmasi.golongan-obat.index",
                    },
                    {
                        label: "Setting Harga Obat",
                        href: route("farmasi.set-harga-obat", {}, false),
                        icon: <Settings className="w-4 h-4" />,
                        permission: "farmasi.set-harga-obat",
                    },
                    {
                        label: "Data Obat",
                        href: route("farmasi.data-obat", {}, false),
                        icon: <Pill className="w-4 h-4" />,
                        permission: "farmasi.data-obat",
                    },
                ],
            },
            {
                label: "Laporan Farmasi",
                icon: <ClipboardList className="w-4 h-4" />,
                children: [
                    {
                        label: "LPLPO",
                        href: "#",
                        disabled: true,
                        icon: <ClipboardList className="w-4 h-4" />,
                    },
                    {
                        label: "Sirkulasi Obat",
                        href: sirkulasiObatUrl,
                        icon: <BarChart2 className="w-4 h-4" />,
                        permission: "farmasi.sirkulasi-obat",
                    },
                    {
                        label: "Cek Stok Obat",
                        href: cekStokObatUrl,
                        icon: <Boxes className="w-4 h-4" />,
                        permission: "farmasi.cek-stok-obat",
                    },
                    {
                        label: "Riwayat Barang Medis",
                        href: riwayatBarangMedisUrl,
                        icon: <ClipboardList className="w-4 h-4" />,
                        permission: "farmasi.riwayat-barang-medis",
                    },
                    {
                        label: "Riwayat Transaksi Gudang",
                        href: riwayatTransaksiGudangUrl,
                        icon: <ClipboardList className="w-4 h-4" />,
                        permission: "farmasi.riwayat-transaksi-gudang",
                    },
                    {
                        label: "Sisa Stok",
                        href: sisaStokUrl,
                        icon: <Boxes className="w-4 h-4" />,
                        permission: "farmasi.sisa-stok",
                    },
                    {
                        label: "Darurat Stok",
                        href: route("farmasi.darurat-stok", {}, false),
                        icon: <ClipboardList className="w-4 h-4" />,
                        permission: "farmasi.darurat-stok",
                    },
                ],
            },
        ];

        const filterGroup = (group) => {
            if (!group.children) return can(group.permission);
            const children = group.children.filter((c) => !c.permission || can(c.permission));
            if (children.length === 0) return false;
            return { ...group, children };
        };

        const filtered = [];
        for (const g of base) {
            if (!g.children) {
                if (!g.permission || can(g.permission)) filtered.push(g);
            } else {
                const fg = filterGroup(g);
                if (fg) filtered.push(fg);
            }
        }
        return filtered;
    }, [dynamicItems, can]);

    const isActive = (href) => {
        try {
            const u = new URL(href, window.location.origin);
            return window.location.pathname === u.pathname;
        } catch {
            return url === href || window.location.pathname === href;
        }
    };

    const MobileBottomNav = React.memo(function MobileBottomNav() {
        const navItems = [
            {
                href: (() => {
                    try {
                        return route("farmasi.index", {}, false);
                    } catch (_) {
                        return "/farmasi";
                    }
                })(),
                icon: Home,
                permission: "farmasi.index",
            },
            {
                href: (() => {
                    try {
                        return route("farmasi.penjualan-obat", {}, false);
                    } catch (_) {
                        return "/farmasi/penjualan-obat";
                    }
                })(),
                icon: ShoppingCart,
                permission: "farmasi.penjualan-obat",
            },
            {
                href: (() => {
                    try {
                        return route("farmasi.permintaan-resep", {}, false);
                    } catch (_) {
                        return "/farmasi/permintaan-resep";
                    }
                })(),
                icon: Package,
                permission: "farmasi.permintaan-resep",
            },
            {
                href: (() => {
                    try {
                        return route("farmasi.pembelian-obat", {}, false);
                    } catch (_) {
                        return "/farmasi/pembelian-obat";
                    }
                })(),
                icon: Truck,
                permission: "farmasi.pembelian-obat",
            },
            {
                href: cekStokObatUrl,
                icon: Boxes,
                permission: "farmasi.cek-stok-obat",
            },
        ];
        const { can } = usePermission();
        const visible = navItems.filter((n) => !n.permission || can(n.permission));
        return (
            <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 dark:bg-gray-900/85 backdrop-blur border-t border-slate-200/70 dark:border-gray-800">
                <div className="h-16 px-4 pb-[env(safe-area-inset-bottom)]">
                    <div className="grid grid-cols-5 gap-2 h-full">
                        {visible.map((item) => (
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
                    <Pill className="w-5 h-5" />
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
                                            if (item.__dynamic && item.id) {
                                                setExpandedGroupIds((prev) => {
                                                    const next = new Set(prev);
                                                    if (next.has(item.id))
                                                        next.delete(item.id);
                                                    else next.add(item.id);
                                                    return next;
                                                });
                                                return;
                                            }
                                            if (
                                                item.label ===
                                                "Pelayanan Farmasi"
                                            )
                                                setOpenPelayanan((v) => !v);
                                            else if (
                                                item.label === "Master Data"
                                            )
                                                setOpenMaster((v) => !v);
                                            else if (
                                                item.label === "Laporan Farmasi"
                                            )
                                                setOpenLaporan((v) => !v);
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
                                                item.__dynamic && item.id
                                                    ? expandedGroupIds.has(
                                                          item.id
                                                      )
                                                    : item.label ===
                                                      "Pelayanan Farmasi"
                                                    ? openPelayanan
                                                    : item.label ===
                                                      "Master Data"
                                                    ? openMaster
                                                    : openLaporan
                                            ) ? (
                                                <ChevronDown className="w-4 h-4 text-white/70" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-white/70" />
                                            ))}
                                    </button>
                                    {(item.__dynamic && item.id
                                        ? expandedGroupIds.has(item.id)
                                        : item.label === "Pelayanan Farmasi"
                                        ? openPelayanan
                                        : item.label === "Master Data"
                                        ? openMaster
                                        : openLaporan) && (
                                        <div
                                            className={`mt-1 ${
                                                isSidebarCollapsed ? "" : "ml-2"
                                            } space-y-1`}
                                        >
                                            {item.children.map((child, cIdx) =>
                                                child.disabled ? (
                                                    <div
                                                        key={cIdx}
                                                        className="flex items-center gap-3 px-3 py-2 rounded-md opacity-60 cursor-not-allowed"
                                                        title="Segera hadir"
                                                    >
                                                        <span className="text-white/90">
                                                            {child.icon}
                                                        </span>
                                                        {!isSidebarCollapsed && (
                                                            <span className="text-sm">
                                                                {child.label}
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
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
                            <Link
                                href={route("farmasi.index")}
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Farmasi
                            </Link>
                        </nav>
                    </div>

                    {/* Right side - User menu */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleDarkLight}
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
            <MobileBottomNav />

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
        </div>
    );
}
