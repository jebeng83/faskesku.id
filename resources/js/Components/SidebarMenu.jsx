import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function SidebarMenu({ collapsed = false }) {
	const { menu_hierarchy, current_menu } = usePage().props;
	const [expandedMenus, setExpandedMenus] = useState(new Set());

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
		if (current_menu && current_menu.id === menu.id) {
			return true;
		}

		const children = menu.active_children_recursive || menu.children || [];
		if (children && children.length > 0) {
			return children.some((child) => isMenuActive(child));
		}

		return false;
	};

	const getMenuUrl = (menu) => {
		if (menu.url) {
			return menu.url;
		}

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
								className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
									isActive
										? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
										: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
								}`}
								title={menu.name}
							>
								{menu.icon ? (
									<i className={`${menu.icon} h-5 w-5`}></i>
								) : (
									<span className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700" />
								)}
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
							className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
								isActive
									? "bg-indigo-100 text-indigo-700"
									: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							}`}
							style={{ paddingLeft: `${1 + level * 0.5}rem` }}
							whileTap={{ scale: 0.98 }}
						>
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
						</motion.button>
					) : (
						<motion.div whileTap={{ scale: 0.98 }}>
							<Link
								href={menuUrl}
								className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
									isActive
										? "bg-indigo-100 text-indigo-700"
										: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
								}`}
								style={{ paddingLeft: `${1 + level * 0.5}rem` }}
							>
								{menu.icon && (
									<i className={`${menu.icon} mr-3 flex-shrink-0 h-5 w-5`}></i>
								)}
								{menu.name}
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

	if (collapsed) {
		// Render top-level menus as icons only
		return <nav className="px-1 pb-2">{renderCollapsed(menu_hierarchy)}</nav>;
	}

	return (
		<motion.nav
			className="px-4 py-4 pb-4 space-y-1"
			variants={listVariants}
			initial="hidden"
			animate="show"
		>
			<motion.ul className="space-y-1" variants={listVariants}>
				{menu_hierarchy.map((menu) => renderMenuItem(menu))}
			</motion.ul>
		</motion.nav>
	);
}
