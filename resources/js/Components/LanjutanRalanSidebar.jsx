
import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDownIcon, ChevronRightIcon, HomeIcon, UserGroupIcon, ClipboardDocumentListIcon, DocumentTextIcon, CalculatorIcon, BeakerIcon, HeartIcon, CameraIcon, ClockIcon, DocumentIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { route } from "ziggy-js";

export default function LanjutanRalanSidebar({
	collapsed = false,
	title = "Lanjutan Rawat Jalan",
	menuConfig = {},
	onToggle,
}) {
	const { auth, menu_hierarchy, current_menu } = usePage().props;
	const [expandedMenus, setExpandedMenus] = useState(new Set());

	// Map icon names to Heroicon components
	const iconMap = {
		'home': HomeIcon,
		'user-group': UserGroupIcon,
		'clipboard-document-list': ClipboardDocumentListIcon,
		'document-text': DocumentTextIcon,
		'calculator': CalculatorIcon,
		'beaker': BeakerIcon,
		'heart': HeartIcon,
		'camera': CameraIcon,
		'clock': ClockIcon,
		'document': DocumentIcon,
		'calendar': CalendarIcon
	};

	// Helper function to render icon
	const renderIcon = (iconName) => {
		const IconComponent = iconMap[iconName];
		if (IconComponent) {
			return <IconComponent className="h-5 w-5" />;
		}
		return <span className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700" />;
	};

	// Helper function to get color scheme classes
	const getColorClasses = (colorScheme, isActive = false, isCollapsed = false) => {
		const colorMap = {
			blue: {
				active: isCollapsed 
					? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
					: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500',
				inactive: 'text-white/80 hover:text-blue-300 hover:bg-blue-500/20'
			},
			orange: {
				active: isCollapsed 
					? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
					: 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-l-4 border-orange-500',
				inactive: 'text-white/80 hover:text-orange-300 hover:bg-orange-500/20'
			},
			green: {
				active: isCollapsed 
					? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
					: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-l-4 border-green-500',
				inactive: 'text-white/80 hover:text-green-300 hover:bg-green-500/20'
			},
			red: {
				active: isCollapsed 
					? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
					: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-l-4 border-red-500',
				inactive: 'text-white/80 hover:text-red-300 hover:bg-red-500/20'
			},
			purple: {
				active: isCollapsed 
					? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
					: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-l-4 border-purple-500',
				inactive: 'text-white/80 hover:text-purple-300 hover:bg-purple-500/20'
			},
			indigo: {
				active: isCollapsed 
					? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
					: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-l-4 border-indigo-500',
				inactive: 'text-white/80 hover:text-indigo-300 hover:bg-indigo-500/20'
			},
			primary: {
				active: isCollapsed 
					? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
					: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500',
				inactive: 'text-white/80 hover:text-blue-300 hover:bg-blue-500/20'
			},
			slate: {
				active: isCollapsed 
					? 'bg-slate-500 text-white shadow-lg shadow-slate-500/30'
					: 'bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 border-l-4 border-slate-500',
				inactive: 'text-white/80 hover:text-slate-300 hover:bg-slate-500/20'
			},
			gray: {
				active: isCollapsed 
					? 'bg-gray-500 text-white shadow-lg shadow-gray-500/30'
					: 'bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-l-4 border-gray-500',
				inactive: 'text-white/80 hover:text-gray-300 hover:bg-gray-500/20'
			}
		};

		return colorMap[colorScheme]?.[isActive ? 'active' : 'inactive'] || colorMap.slate[isActive ? 'active' : 'inactive'];
	};

	// Define specific menu items for Lanjutan Rawat Jalan
	const lanjutanMenus = [
		{
			id: 'dashboard',
			name: 'Dashboard',
			icon: 'home',
			url: (() => {
				try {
					return route('dashboard');
				} catch (error) {
					console.warn('Dashboard route not found');
					return '/';
				}
			})(),
			active: false,
			colorScheme: 'slate'
		},
		{
			id: 'rawat-jalan-list',
			name: 'Data Rawat Jalan',
			icon: 'user-group',
			url: (() => {
				try {
					return route('rawat-jalan.index');
				} catch (error) {
					console.warn('Rawat Jalan route not found');
					return '#';
				}
			})(),
			active: false,
			colorScheme: 'slate'
		},
		{
			id: 'lanjutan-group',
			name: 'Menu Pemeriksaan',
			icon: 'clipboard-document-list',
			active: false,
			colorScheme: 'primary',
			children: [
				{
					id: 'cppt',
					name: 'CPPT / SOAP',
					icon: 'document-text',
					description: 'Catatan Perkembangan Pasien',
					active: menuConfig.activeTab === 'cppt',
					colorScheme: 'blue'
				},
				{
					id: 'tarif-tindakan',
					name: 'Tarif Tindakan',
					icon: 'calculator',
					description: 'Input Tarif Tindakan Medis',
					active: menuConfig.activeTab === 'tarifTindakan',
					colorScheme: 'orange'
				},
				{
					id: 'resep',
					name: 'Resep',
					icon: 'beaker',
					description: 'Resep Obat & Farmasi',
					active: menuConfig.activeTab === 'resep',
					colorScheme: 'green'
				},
				{
					id: 'diagnosa',
					name: 'Diagnosa',
					icon: 'heart',
					description: 'Diagnosis & Kode ICD',
					active: menuConfig.activeTab === 'diagnosa',
					colorScheme: 'red'
				},
				{
					id: 'lab',
					name: 'Permintaan Lab',
					icon: 'beaker',
					description: 'Laboratorium & Pemeriksaan',
					active: menuConfig.activeTab === 'lab',
					colorScheme: 'purple'
				},
				{
					id: 'radiologi',
					name: 'Permintaan Radiologi',
					icon: 'camera',
					description: 'Radiologi & Imaging',
					active: menuConfig.activeTab === 'radiologi',
					colorScheme: 'indigo'
				}
			]
		}
	];

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

	// Auto-expand active menu groups
	useEffect(() => {
		const activeGroups = new Set();
		
		lanjutanMenus.forEach(menu => {
			if (menu.children) {
				const hasActiveChild = menu.children.some(child => child.active);
				if (hasActiveChild) {
					activeGroups.add(menu.id);
				}
			}
		});
		
		setExpandedMenus(activeGroups);
	}, [menuConfig.activeTab]);

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
		// Check direct active state
		if (menu.active) return true;
		
		// Check if has active children
		if (menu.children) {
			return menu.children.some(child => child.active);
		}
		
		return false;
	};

	const getMenuUrl = (menu) => {
		// Khusus menu "Data Rawat Jalan": ambil kd_dokter/kd_poli terakhir dari localStorage
		// agar saat klik menu, filter Dokter/Poli tetap dipertahankan.
		if (menu.id === 'rawat-jalan-list' || (menu.name && menu.name.toLowerCase().includes('rawat jalan'))) {
			let basePath = '/rawat-jalan';
			try {
				// Gunakan path relatif agar konsisten dengan origin aktif
				basePath = route('rawat-jalan.index', {}, false);
			} catch (_) {}

			let kd_dokter = '';
			let kd_poli = '';
			try {
				const saved = window.localStorage.getItem('rawatJalanFilters');
				if (saved) {
					const parsed = JSON.parse(saved);
					kd_dokter = parsed?.kd_dokter || '';
					kd_poli = parsed?.kd_poli || '';
				}
			} catch (_) {
				// Abaikan error parsing localStorage
			}

			try {
				const u = new URL(basePath, window.location.origin);
				if (kd_dokter) u.searchParams.set('kd_dokter', kd_dokter);
				if (kd_poli) u.searchParams.set('kd_poli', kd_poli);
				return u.pathname + u.search + u.hash;
			} catch (_) {
				const qs = [];
				if (kd_dokter) qs.push(`kd_dokter=${encodeURIComponent(kd_dokter)}`);
				if (kd_poli) qs.push(`kd_poli=${encodeURIComponent(kd_poli)}`);
				return basePath + (qs.length ? `?${qs.join('&')}` : '');
			}
		}

		if (menu.url) return menu.url;
		if (menu.route) {
			try {
				return route(menu.route);
			} catch (error) {
				console.warn(`Route ${menu.route} not found for menu ${menu.name}`);
				return "#";
			}
		}
		return "#";
	};

	const handleMenuClick = (menu) => {
		if (menu.children && menu.children.length > 0) {
			toggleExpanded(menu.id);
		} else if (menuConfig.onTabChange && ['cppt', 'tarif-tindakan', 'resep', 'diagnosa', 'lab', 'radiologi'].includes(menu.id)) {
			// Handle tab change for examination menus
			const tabMap = {
				'cppt': 'cppt',
				'tarif-tindakan': 'tarifTindakan',
				'resep': 'resep',
				'diagnosa': 'diagnosa',
				'lab': 'lab',
				'radiologi': 'radiologi'
			};
			menuConfig.onTabChange(tabMap[menu.id]);
		} else {
			// Normal navigation
			const url = getMenuUrl(menu);
			if (url !== "#") {
				window.location.href = url;
			}
		}
	};

	// Collapsed renderer: icons only, show tooltip and active state
	const renderCollapsed = (menus) => {
		return (
			<motion.nav
				className="space-y-2 px-2"
				variants={listVariants}
				initial="hidden"
				animate="show"
			>
				{menus.map((menu) => {
					const isActive = isMenuActive(menu);
					return (
						<motion.div
							key={menu.id}
							className="relative group"
							variants={collapsedItemVariants}
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 200, damping: 18 }}
						>
							<button
								onClick={() => handleMenuClick(menu)}
								className={`relative w-full flex items-center justify-center p-3 rounded-xl transition-all duration-300 group ${
									getColorClasses(menu.colorScheme || 'slate', isActive, true)
								}`}
								title={menu.name}
							>
								{/* Pulse animation for active items */}
								{isActive && (
									<motion.div
										className="absolute inset-0 rounded-xl"
										animate={{
											boxShadow: [
												'0 0 0 0 rgba(59, 130, 246, 0.4)',
												'0 0 0 8px rgba(59, 130, 246, 0)',
												'0 0 0 0 rgba(59, 130, 246, 0)'
											]
										}}
										transition={{ duration: 2, repeat: Infinity }}
									/>
								)}

								{/* Icon */}
								<div className="relative z-10">
									{renderIcon(menu.icon)}
								</div>

								{/* Tooltip */}
								<div className="absolute left-full ml-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
									<div className="bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg py-2 px-3 whitespace-nowrap shadow-lg border border-gray-700 dark:border-gray-600">
										{menu.name}
										<div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45 border-l border-b border-gray-700 dark:border-gray-600"></div>
									</div>
								</div>
							</button>
						</motion.div>
					);
				})}
			</motion.nav>
		);
	};

	const renderMenuItem = (menu, level = 0) => {
		const children = menu.children || [];
		const hasChildren = children && children.length > 0;
		const isExpanded = expandedMenus.has(menu.id);
		const isActive = isMenuActive(menu);

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
					className="relative"
				>
					<motion.button
						onClick={() => handleMenuClick(menu)}
						className={`relative w-full flex items-center p-3 text-sm font-medium rounded-xl transition-all duration-300 group ${
							getColorClasses(menu.colorScheme || 'slate', isActive)
						} ${level === 0 ? 'mb-1' : 'mb-0.5'}`}
						style={{ paddingLeft: `${0.75 + level * 0.5}rem` }}
						whileTap={{ scale: 0.98 }}
						whileHover={{ scale: level === 0 ? 1.02 : 1.01 }}
					>
						{/* Pulse animation for active items */}
						{isActive && (
							<motion.div
								className="absolute inset-0 rounded-xl"
								animate={{
									boxShadow: [
										'0 0 0 0 rgba(59, 130, 246, 0.2)',
										'0 0 0 4px rgba(59, 130, 246, 0)',
										'0 0 0 0 rgba(59, 130, 246, 0)'
									]
								}}
								transition={{ duration: 2, repeat: Infinity }}
							/>
						)}

						{/* Content */}
						<div className="relative z-10 flex items-center w-full">
							{menu.icon && (
								<div className="mr-3 flex-shrink-0">
									{renderIcon(menu.icon)}
								</div>
							)}
							<div className="flex-1 text-left">
								<div className="flex items-center justify-between">
									<span className="font-medium">{menu.name}</span>
									{hasChildren && (
										<motion.span
											animate={{ rotate: isExpanded ? 180 : 0 }}
											transition={{ duration: 0.2 }}
											className="ml-3"
										>
											<ChevronDownIcon className="h-4 w-4 flex-shrink-0 opacity-60" />
										</motion.span>
									)}
								</div>
								{menu.description && level > 0 && (
									<p className="text-xs opacity-70 mt-0.5 leading-tight">{menu.description}</p>
								)}
							</div>
						</div>
					</motion.button>
				</motion.li>

				<AnimatePresence initial={false}>
					{hasChildren && isExpanded && (
						<motion.li
							initial={{ opacity: 0, height: 0, marginTop: 0 }}
							animate={{ opacity: 1, height: "auto", marginTop: 8 }}
							exit={{ opacity: 0, height: 0, marginTop: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<motion.ul
								className="space-y-1 pl-3 border-l-2 border-white/10 ml-3"
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

	if (collapsed) {
		// Render top-level menus as icons only
		return (
			<div className="h-full flex flex-col">
				{/* Logo - Collapsed */}
				<div className="p-4 border-b border-blue-400/30 dark:border-blue-600/30 flex-shrink-0">
					<div className="flex items-center justify-center">
						<motion.div 
							className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg border border-blue-400/20"
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
						>
							<span className="text-white font-bold text-lg drop-shadow-sm">
								L
							</span>
						</motion.div>
					</div>
				</div>
				<nav className="px-2 py-4 flex-1 overflow-y-auto">
					{renderCollapsed(lanjutanMenus)}
				</nav>
			</div>
		);
	}

	return (
		<div className="h-full flex flex-col">
			{/* Logo - Normal */}
			<div className="p-4 border-b border-blue-400/30 dark:border-blue-600/30 flex-shrink-0">
				<motion.div 
					className="flex items-center gap-3"
					whileHover={{ scale: 1.02 }}
					transition={{ type: "spring", stiffness: 300, damping: 20 }}
				>
					<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg border border-blue-400/20">
						<span className="text-white font-bold text-lg drop-shadow-sm">
							L
						</span>
					</div>
					<div className="flex flex-col">
						<span className="font-bold text-white text-base leading-tight">{title}</span>
						<span className="text-xs text-blue-200 -mt-0.5 leading-tight">
							Rawat Jalan
						</span>
					</div>
				</motion.div>
			</div>
			
			<motion.nav
				className="px-3 py-4 space-y-2 flex-1 overflow-y-auto"
				variants={listVariants}
				initial="hidden"
				animate="show"
			>
				<motion.ul className="space-y-2" variants={listVariants}>
					{lanjutanMenus.map((menu) => renderMenuItem(menu))}
				</motion.ul>
			</motion.nav>
			
			{/* Footer with version or additional info */}
			<div className="p-3 border-t border-blue-400/20">
				<div className="text-center">
					<p className="text-xs text-blue-200/60">
						Faskesku v2.0
					</p>
				</div>
			</div>
		</div>
	);
}