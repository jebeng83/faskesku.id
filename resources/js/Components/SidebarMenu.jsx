import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function SidebarMenu() {
	const { menu_hierarchy, current_menu } = usePage().props;
	const [expandedMenus, setExpandedMenus] = useState(new Set());

	// Debug: Log menu data
	console.log('SidebarMenu - menu_hierarchy:', menu_hierarchy);
	console.log('SidebarMenu - current_menu:', current_menu);

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
					const result = findParentMenus(children, targetMenuId, [...parentIds, menu.id]);
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
			console.log('Auto-expanding parent menus:', parentIds);
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

		// Check if any child is active
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

	const renderMenuItem = (menu, level = 0) => {
		const children = menu.active_children_recursive || menu.children || [];
		const hasChildren = children && children.length > 0;
		const isExpanded = expandedMenus.has(menu.id);
		const isActive = isMenuActive(menu);
		const menuUrl = getMenuUrl(menu);

		// Debug: Log menu item details
		console.log(`Menu: ${menu.name}, hasChildren: ${hasChildren}, children:`, children);
		if (hasChildren) {
			console.log(`Menu ${menu.name} - isExpanded: ${isExpanded}, expandedMenus:`, expandedMenus);
		}

		return (
			<React.Fragment key={menu.id}>
				<li>
					{hasChildren ? (
						<button
							onClick={() => toggleExpanded(menu.id)}
							className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
								isActive
									? "bg-indigo-100 text-indigo-700"
									: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							}`}
							style={{ paddingLeft: `${1 + level * 0.5}rem` }}
						>
							{menu.icon && (
								<i className={`${menu.icon} mr-3 flex-shrink-0 h-5 w-5`}></i>
							)}
							<span className="flex-1 text-left">{menu.name}</span>
							{isExpanded ? (
								<ChevronDownIcon className="ml-3 h-4 w-4 flex-shrink-0" />
							) : (
								<ChevronRightIcon className="ml-3 h-4 w-4 flex-shrink-0" />
							)}
						</button>
					) : (
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
					)}
				</li>

				{hasChildren && isExpanded && (
					<li>
						<ul className="space-y-1">
							{children.map((child) => renderMenuItem(child, level + 1))}
						</ul>
					</li>
				)}
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

	return (
		<nav className="flex-1 px-4 pb-4 space-y-1">
			<ul className="space-y-1">
				{menu_hierarchy.map((menu) => renderMenuItem(menu))}
			</ul>
		</nav>
	);
}
