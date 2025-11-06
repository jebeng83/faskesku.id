import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDownIcon, ChevronRightIcon, Bars3Icon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { route } from "ziggy-js";

// Helper to resolve a route name robustly by trying common variants (casing/spacing)
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
            const url = route(name, {}, absolute);
            if (url) return url;
        } catch (e) {
            // try next candidate
        }
    }
    return null;
};

export default function SidebarMenu({
    collapsed = false,
    title = "Faskesku",
    onToggle,
}) {
    const { menu_hierarchy, current_menu } = usePage().props;
    const [expandedMenus, setExpandedMenus] = useState(new Set());
    // Drawer state untuk mobile (efek slide-in + overlay)
    const [drawerOpen, setDrawerOpen] = useState(false);

	// Debug logging (remove in production)
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			console.log("SidebarMenu Debug Info:");
			console.log("Current Menu:", current_menu);
			console.log("Menu Hierarchy:", menu_hierarchy);
			console.log("Current Path:", window.location.pathname);
		}
    }, [current_menu, menu_hierarchy]);

    // Tutup drawer ketika route/menu aktif berubah (navigasi)
    useEffect(() => {
        if (drawerOpen) {
            setDrawerOpen(false);
        }
    }, [current_menu?.id]);

	// Variants untuk animasi
	const itemVariants = {
		hidden: { opacity: 0, x: -10 },
		show: { opacity: 1, x: 0 },
	};
	const collapsedItemVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		show: { opacity: 1, scale: 1 },
	};
    const listVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.03 } },
    };

    // Variants untuk efek drawer & overlay (mobile)
    const framerSidebarBackground = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0, transition: { delay: 0.2 } },
        transition: { duration: 0.3 },
    };
    const framerSidebarPanel = {
        initial: { x: "-100%" },
        animate: { x: 0 },
        exit: { x: "-100%" },
        transition: { duration: 0.3 },
    };

	// Auto-expand menus that have active children
	useEffect(() => {
		if (!menu_hierarchy || !current_menu) return;

		const findParentMenus = (menus, targetMenuId, parentIds = []) => {
			for (const menu of menus) {
				if (menu.id === targetMenuId) {
					return parentIds;
				}
				const children = menu.active_children_recursive || menu.children || [];
				if (children.length > 0) {
					const result = findParentMenus(children, targetMenuId, [
						...parentIds,
						menu.id,
					]);
					if (result.length > 0) {
						return result;
					}
				}
			}
			return [];
		};

		const parentIds = findParentMenus(menu_hierarchy, current_menu.id);
		if (parentIds.length > 0) {
			setExpandedMenus(new Set(parentIds));
		}
	}, [menu_hierarchy, current_menu]);

	const toggleExpanded = (menuId) => {
		const newExpanded = new Set(expandedMenus);
		if (newExpanded.has(menuId)) {
			newExpanded.delete(menuId);
		} else {
			newExpanded.add(menuId);
		}
		setExpandedMenus(newExpanded);
	};

	const isMenuActive = (menu) => {
		const currentPath = window.location.pathname;

		// Check if this menu is the current menu (from middleware)
		if (current_menu && current_menu.id === menu.id) {
			if (process.env.NODE_ENV === "development") {
				console.log(`Menu ${menu.name} is active (current_menu match)`);
			}
			return true;
		}

		// Check if menu URL matches current path exactly
		if (menu.url && currentPath === menu.url) {
			if (process.env.NODE_ENV === "development") {
				console.log(`Menu ${menu.name} is active (URL match: ${menu.url})`);
			}
			return true;
		}

		// Check if menu route matches current route name
		if (menu.route) {
			const menuUrl = resolveRouteUrl(menu.route);
			if (menuUrl && currentPath === menuUrl) {
				if (process.env.NODE_ENV === "development") {
					console.log(
						`Menu ${menu.name} is active (route match: ${menu.route} -> ${menuUrl})`
					);
				}
				return true;
			}
		}

		// Check if current path starts with menu URL (for nested routes)
		if (menu.url && currentPath.startsWith(menu.url) && menu.url !== "/") {
			if (process.env.NODE_ENV === "development") {
				console.log(
					`Menu ${menu.name} is active (URL prefix match: ${menu.url})`
				);
			}
			return true;
		}

		// Check if current path matches menu route pattern
		if (menu.route) {
			const menuUrl = resolveRouteUrl(menu.route);
			if (
				menuUrl &&
				menuUrl !== "#" &&
				currentPath.startsWith(menuUrl) &&
				menuUrl !== "/"
			) {
				if (process.env.NODE_ENV === "development") {
					console.log(
						`Menu ${menu.name} is active (route prefix match: ${menu.route} -> ${menuUrl})`
					);
				}
				return true;
			}
		}

		// Check children recursively
		const children = menu.active_children_recursive || menu.children || [];
		if (children && children.length > 0) {
			const hasActiveChild = children.some((child) => isMenuActive(child));
			if (hasActiveChild && process.env.NODE_ENV === "development") {
				console.log(`Menu ${menu.name} is active (has active child)`);
			}
			return hasActiveChild;
		}

		return false;
	};

	const getMenuUrl = (menu) => {
		// Special case: Farmasi root menu should navigate directly to Farmasi Index
        if ((menu.slug && menu.slug === "farmasi") || (menu.name && menu.name.toLowerCase() === "farmasi")) {
            try {
                // gunakan URL relatif agar mengikuti origin aktif
                return route("farmasi.index", {}, false);
            } catch (error) {
                console.warn("Route farmasi.index not found, falling back to /farmasi");
                return "/farmasi";
            }
        }
        // Special case: PCare root menu should navigate directly to PCare Index
        if (
            (menu.slug && (menu.slug === "pcare" || menu.slug === "bridging-pcare")) ||
            (menu.name && menu.name.toLowerCase().includes("pcare"))
        ) {
            try {
                // gunakan URL relatif agar mengikuti origin aktif
                return route("pcare.index", {}, false);
            } catch (error) {
                console.warn("Route pcare.index not found, falling back to /pcare");
                return "/pcare";
            }
        }
        // Special case: Rawat Jalan root should navigate to a valid default sub-route
        if (
            (menu.slug && menu.slug.replace(/\s+/g, "-").toLowerCase() === "rawat-jalan") ||
            (menu.name && menu.name.replace(/\s+/g, "-").toLowerCase().includes("rawat-jalan"))
        ) {
            try {
                return route("rawat-jalan.lanjutan", {}, false);
            } catch (error) {
                console.warn(
                    "Route rawat-jalan.lanjutan not found, falling back to /rawat-jalan/lanjutan"
                );
                return "/rawat-jalan/lanjutan";
            }
        }
		if (menu.url) {
			try {
				const currentOrigin = window.location.origin;
				const u = new URL(menu.url, currentOrigin);
				// Kembalikan path relatif agar selalu mengikuti origin aktif
				return u.pathname + u.search + u.hash;
			} catch (e) {
				// Jika parsing gagal, paksa menjadi relatif
				if (menu.url.startsWith("/")) return menu.url;
				return "/" + menu.url.replace(/^https?:\/\/[^/]+/, "");
			}
		}

		if (menu.route) {
			const url = resolveRouteUrl(menu.route, false);
			if (url) return url;
			console.warn(`Route ${menu.route} not found for menu ${menu.name}`);
			return "#";
		}

		return "#";
	};

	// Collapsed renderer: icons only, show tooltip and active state
	const renderCollapsed = (menus) => {
		return (
			<motion.nav
				className="space-y-1"
				variants={listVariants}
				initial="hidden"
				animate="show"
			>
				{menus.map((menu) => {
					const isActive = isMenuActive(menu);
					const menuUrl = getMenuUrl(menu);
					return (
						<motion.div
							key={menu.id}
							className="relative group"
							variants={collapsedItemVariants}
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 200, damping: 18 }}
						>
							<Link
								href={menuUrl}
								className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 group ${
									isActive
										? "text-blue-600 dark:text-blue-500"
										: "text-white dark:text-white hover:text-white/80 dark:hover:text-white/80"
								}`}
								title={menu.name}
							>
								{/* Background untuk active state */}
								{isActive && (
									<motion.div
										className="absolute inset-0 bg-white dark:bg-gray-100 rounded-xl shadow-lg"
										initial={{ scale: 0, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{
											type: "spring",
											stiffness: 300,
											damping: 25,
											duration: 0.3,
										}}
									/>
								)}

								{/* Hover background effect */}
								{!isActive && (
									<motion.div
										className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-xl opacity-0 group-hover:opacity-100"
										transition={{ duration: 0.2 }}
									/>
								)}

								{/* Icon */}
								<div className="relative z-10">
									{menu.icon ? (
										<i className={`${menu.icon} h-5 w-5`}></i>
									) : (
										<span className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700" />
									)}
								</div>
							</Link>
						</motion.div>
					);
				})}
			</motion.nav>
		);
	};

	const renderMenuItem = (menu, level = 0) => {
		const children = menu.active_children_recursive || menu.children || [];
		const hasChildren = children && children.length > 0;
		const isExpanded = expandedMenus.has(menu.id);
		const isActive = isMenuActive(menu);
		const menuUrl = getMenuUrl(menu);

		if (collapsed) {
			// In collapsed mode, only render top-level icons (handled in renderCollapsed)
			if (level === 0) {
				return null;
			}
		}

		return (
			<React.Fragment key={menu.id}>
				<motion.li
					variants={itemVariants}
					initial="hidden"
					animate="show"
					transition={{ type: "spring", stiffness: 200, damping: 20 }}
				>
                    {hasChildren ? (
                        <motion.button
                            onClick={() => toggleExpanded(menu.id)}
                            className={`relative w-full flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 group ${
                                (isActive || isExpanded)
                                    ? "text-blue-600 dark:text-blue-500"
                                    : "text-white hover:text-white/80 dark:text-white dark:hover:text-white/80"
                            }`}
                            style={{ paddingLeft: `${1 + level * 0.5}rem` }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Background untuk active state */}
                            {(isActive || isExpanded) && (
                                <motion.div
                                    className="absolute inset-0 bg-white dark:bg-gray-100 rounded-xl shadow-lg"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                        duration: 0.3,
                                    }}
                                />
                            )}

                            {/* Hover background effect */}
                            {!(isActive || isExpanded) && (
                                <motion.div
                                    className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-xl opacity-0 group-hover:opacity-100"
                                    transition={{ duration: 0.2 }}
                                />
                            )}

							{/* Content */}
							<div className="relative z-10 flex items-center w-full">
								{menu.icon && (
									<i className={`${menu.icon} mr-3 flex-shrink-0 h-5 w-5`}></i>
								)}
								<span className="flex-1 text-left">{menu.name}</span>
								<motion.span
									animate={{ rotate: isExpanded ? 180 : 0 }}
									transition={{ duration: 0.2 }}
									className="ml-3"
								>
									{isExpanded ? (
										<ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
									) : (
										<ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
									)}
								</motion.span>
							</div>
						</motion.button>
					) : (
						<motion.div whileTap={{ scale: 0.98 }}>
							<Link
								href={menuUrl}
								className={`relative flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 group ${
									isActive
										? "text-blue-600 dark:text-blue-500"
										: "text-white hover:text-white/80 dark:text-white dark:hover:text-white/80"
								}`}
								style={{ paddingLeft: `${1 + level * 0.5}rem` }}
							>
								{/* Background untuk active state */}
								{isActive && (
									<motion.div
										className="absolute inset-0 bg-white dark:bg-gray-100 rounded-xl shadow-lg"
										initial={{ scale: 0, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{
											type: "spring",
											stiffness: 300,
											damping: 25,
											duration: 0.3,
										}}
									/>
								)}

								{/* Hover background effect */}
								{!isActive && (
									<motion.div
										className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-xl opacity-0 group-hover:opacity-100"
										transition={{ duration: 0.2 }}
									/>
								)}

								{/* Content */}
								<div className="relative z-10 flex items-center">
									{menu.icon && (
										<i
											className={`${menu.icon} mr-3 flex-shrink-0 h-5 w-5`}
										></i>
									)}
									{menu.name}
								</div>
							</Link>
						</motion.div>
					)}
				</motion.li>

				<AnimatePresence initial={false}>
					{hasChildren && isExpanded && (
						<motion.li
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2 }}
						>
							<motion.ul
								className="space-y-1"
								variants={listVariants}
								initial="hidden"
								animate="show"
							>
								{children.map((child) => renderMenuItem(child, level + 1))}
							</motion.ul>
						</motion.li>
					)}
				</AnimatePresence>
			</React.Fragment>
		);
	};

	if (!menu_hierarchy || menu_hierarchy.length === 0) {
		return (
			<div className="px-4 py-8 text-center text-gray-500">
				<p className="text-sm">Tidak ada menu yang tersedia</p>
			</div>
		);
	}

    // Render kombinasi: Desktop (tetap seperti sebelumnya) + Mobile Drawer
    return (
        <>
            {/* Toggle button (mobile only) */}
            <div className="md:hidden p-2">
                <button
                    type="button"
                    onClick={() => setDrawerOpen(true)}
                    className="p-2 border-2 border-zinc-800 rounded-xl bg-zinc-900 text-white"
                    aria-label="Buka sidebar"
                >
                    <Bars3Icon className="h-5 w-5" />
                </button>
            </div>

            {/* Desktop/Tablet: sidebar seperti semula */}
            <div className="hidden md:flex h-full flex-col">
                {collapsed ? (
                    <>
                        {/* Logo - Collapsed */}
                        <div className="p-4 border-b border-blue-400/30 dark:border-blue-600/30 flex-shrink-0">
                            <div className="flex items-center justify-center">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border border-blue-400/20">
                                    <span className="text-white font-bold text-sm drop-shadow-sm">F</span>
                                </div>
                            </div>
                        </div>
                        <nav className="px-1 pb-2 flex-1">{renderCollapsed(menu_hierarchy)}</nav>
                    </>
                ) : (
                    <>
                        {/* Logo - Normal */}
                        <div className="p-4 border-b border-blue-400/30 dark:border-blue-600/30 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border border-blue-400/20">
                                    <span className="text-white font-bold text-sm drop-shadow-sm">F</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-white text-sm">{title}</span>
                                    <span className="text-xs text-white/80 -mt-1">Elektronik Rekam Medis</span>
                                </div>
                            </div>
                        </div>
                        <motion.nav className="px-4 py-4 pb-4 space-y-1 flex-1" variants={listVariants} initial="hidden" animate="show">
                            <motion.ul className="space-y-1" variants={listVariants}>
                                {menu_hierarchy.map((menu) => renderMenuItem(menu))}
                            </motion.ul>
                        </motion.nav>
                    </>
                )}
            </div>

            {/* Mobile drawer dengan efek overlay & slide-in */}
            <AnimatePresence mode="wait" initial={false}>
                {drawerOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            {...framerSidebarBackground}
                            aria-hidden="true"
                            className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.12)] backdrop-blur-sm"
                            onClick={() => setDrawerOpen(false)}
                        />
                        {/* Panel */}
                        <motion.div
                            {...framerSidebarPanel}
                            className="fixed inset-y-0 left-0 z-50 w-full h-screen max-w-xs border-r-2 border-zinc-800 bg-zinc-900"
                            aria-label="Sidebar"
                        >
                            <div className="flex items-center justify-between p-5 border-b-2 border-zinc-800">
                                <span className="text-white/90">Welcome</span>
                                <button
                                    type="button"
                                    onClick={() => setDrawerOpen(false)}
                                    className="p-2 border-2 border-zinc-800 rounded-xl text-white"
                                    aria-label="Tutup sidebar"
                                >
                                    <ArrowUturnLeftIcon className="h-5 w-5" />
                                </button>
                            </div>
                            {/* Isi sidebar (non-collapsed untuk mobile agar mudah dibaca) */}
                            <div className="h-full flex flex-col">
                                <div className="p-4 border-b border-blue-400/30 dark:border-blue-600/30 flex-shrink-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border border-blue-400/20">
                                            <span className="text-white font-bold text-sm drop-shadow-sm">F</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white text-sm">{title}</span>
                                            <span className="text-xs text-white/80 -mt-1">Elektronik Rekam Medis</span>
                                        </div>
                                    </div>
                                </div>
                                <motion.nav className="px-4 py-4 pb-4 space-y-1 flex-1 overflow-y-auto" variants={listVariants} initial="hidden" animate="show">
                                    <motion.ul className="space-y-1" variants={listVariants}>
                                        {menu_hierarchy.map((menu) => renderMenuItem(menu))}
                                    </motion.ul>
                                </motion.nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
