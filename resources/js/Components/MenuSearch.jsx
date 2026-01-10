import React, { useState, useEffect, useRef, useMemo } from "react";
import { router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { route } from "ziggy-js";

export default function MenuSearch({ isOpen, onClose }) {
	const { menu_hierarchy } = usePage().props;
	const [query, setQuery] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [activeTab, setActiveTab] = useState("");
	const inputRef = useRef(null);
	const containerRef = useRef(null);

	// Process menu hierarchy and flatten it based on parent_id structure
	const { flattenedMenus, groupedMenus } = useMemo(() => {
		if (!menu_hierarchy || !Array.isArray(menu_hierarchy)) {
			return { flattenedMenus: [], groupedMenus: {} };
		}

		// Flatten the hierarchical structure
		const flattenHierarchy = (menus, level = 0, parentMenu = null) => {
			const result = [];

			menus.forEach((menu) => {
				// Add current menu with metadata
				const menuWithMeta = {
					...menu,
					searchText: menu.name + " " + (menu.description || ""),
					breadcrumb: parentMenu
						? `${parentMenu.name} › ${menu.name}`
						: menu.name,
					fullPath: parentMenu ? [parentMenu.name, menu.name] : [menu.name],
					rootMenu: parentMenu || menu,
					level: level,
					isParent: level === 0,
					parentMenu: parentMenu,
				};

				result.push(menuWithMeta);

				// Process children if they exist
				const children = menu.active_children_recursive || menu.children || [];
				if (children.length > 0) {
					result.push(
						...flattenHierarchy(
							children,
							level + 1,
							level === 0 ? menu : parentMenu
						)
					);
				}
			});

			return result;
		};

		const flattened = flattenHierarchy(menu_hierarchy);

		// Group by root menu (parent menu)
		const grouped = flattened.reduce((acc, menu) => {
			const rootName = menu.rootMenu.name;
			if (!acc[rootName]) {
				acc[rootName] = {
					root: menu.rootMenu,
					items: [],
				};
			}
			acc[rootName].items.push(menu);
			return acc;
		}, {});

		// Sort items within each group (parent first, then children)
		Object.keys(grouped).forEach((groupName) => {
			grouped[groupName].items.sort((a, b) => {
				if (a.level !== b.level) {
					return a.level - b.level; // Parent menus first
				}
				return a.name.localeCompare(b.name); // Then alphabetical
			});
		});

		// Set default active tab if not set
		if (!activeTab && Object.keys(grouped).length > 0) {
			setActiveTab(Object.keys(grouped)[0]);
		}

		return { flattenedMenus: flattened, groupedMenus: grouped };
	}, [menu_hierarchy, activeTab]);

	// Filter menus based on search query and group results
    const { filteredMenus, displayGroups } = useMemo(() => {
		if (!query.trim()) {
			// Show all groups when no query, more items per group for desktop-style display
			const limitedGroups = Object.keys(groupedMenus).reduce(
				(acc, rootName) => {
					const group = groupedMenus[rootName];
					acc[rootName] = {
						...group,
						items: group.items.slice(0, 20), // More items for desktop-style layout
					};
					return acc;
				},
				{}
			);

            return {
                filteredMenus: flattenedMenus.slice(0, 30),
                displayGroups: limitedGroups,
            };
		}

		const searchTerms = query.toLowerCase().trim().split(/\s+/);

		const filtered = flattenedMenus
			.filter((menu) => {
				const searchableText = (menu.searchText || "").toLowerCase();
				return searchTerms.every((term) => searchableText.includes(term));
			})
			.sort((a, b) => {
				// Prioritize exact matches
				const aName = a.name.toLowerCase();
				const bName = b.name.toLowerCase();
				const queryLower = query.toLowerCase();

				if (aName.includes(queryLower) && !bName.includes(queryLower))
					return -1;
				if (!aName.includes(queryLower) && bName.includes(queryLower)) return 1;

				// Then prioritize by level (root menus first)
				return a.level - b.level;
			})
			.slice(0, 15);

		// Group filtered results
		const searchGroups = filtered.reduce((acc, menu) => {
			const rootName = menu.rootMenu.name;
			if (!acc[rootName]) {
				acc[rootName] = {
					root: menu.rootMenu,
					items: [],
				};
			}
			acc[rootName].items.push(menu);
			return acc;
		}, {});

        return {
            filteredMenus: filtered,
            displayGroups: query.trim() ? searchGroups : groupedMenus,
        };
    }, [query, flattenedMenus, groupedMenus]);

	// Reset selected index when filtered results change
	useEffect(() => {
		setSelectedIndex(0);
	}, [filteredMenus]);

	// Focus input when modal opens
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (!isOpen) return;

			switch (e.key) {
				case "ArrowDown":
					e.preventDefault();
					setSelectedIndex((prev) =>
						prev < filteredMenus.length - 1 ? prev + 1 : 0
					);
					break;
				case "ArrowUp":
					e.preventDefault();
					setSelectedIndex((prev) =>
						prev > 0 ? prev - 1 : filteredMenus.length - 1
					);
					break;
				case "Enter":
					e.preventDefault();
					if (filteredMenus[selectedIndex]) {
						handleMenuSelect(filteredMenus[selectedIndex]);
					}
					break;
				case "Escape":
					e.preventDefault();
					onClose();
					break;
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, filteredMenus, selectedIndex, onClose]);

	const getMenuUrl = (menu) => {
		if (menu.url) {
			try {
				const currentOrigin = window.location.origin;
				const u = new URL(menu.url, currentOrigin);
				return u.pathname + u.search + u.hash;
            } catch (_e) {
                if (menu.url.startsWith("/")) return menu.url;
                return "/" + menu.url.replace(/^https?:\/\/[^/]+/, "");
            }
		}

		if (menu.route) {
			try {
				return route(menu.route, {}, false);
            } catch (_error) {
                console.warn(`Route ${menu.route} not found for menu ${menu.name}`);
                return "#";
            }
		}

		return "#";
	};

	const handleMenuSelect = (menu) => {
		const url = getMenuUrl(menu);
		if (url && url !== "#") {
			router.visit(url);
			onClose();
		}
	};

	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-[100] flex flex-col"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={handleBackdropClick}
				>
					{/* Full-screen transparent backdrop */}
					<div className="absolute inset-0 bg-black/30 backdrop-blur-md" />

					{/* Full-screen content */}
					<motion.div
						ref={containerRef}
						className="relative flex flex-col h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 30,
							duration: 0.2,
						}}
					>
						{/* Search Header */}
						<div className="flex-shrink-0 px-8 py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
							<div className="flex items-center gap-4">
								{/* Search Icon */}
								<svg
									className="h-6 w-6 text-gray-400 dark:text-gray-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>

								{/* Search Input */}
								<input
									ref={inputRef}
									type="text"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="Cari menu atau ketik untuk menjelajahi..."
									className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-xl font-medium"
								/>

								{/* Keyboard Shortcut Indicator */}
								<div className="hidden sm:flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
									<kbd className="px-2 py-1 bg-gray-100/80 dark:bg-gray-800/80 rounded-lg border border-gray-300/50 dark:border-gray-600/50 backdrop-blur-sm">
										ESC
									</kbd>
									<span>untuk keluar</span>
								</div>
							</div>
						</div>

						{/* Results */}
						<div className="flex-1 overflow-hidden bg-transparent flex flex-col">
							{query.trim() ? (
								// Search Results - show filtered results in desktop-style grid boxes
								<div className="flex-1 overflow-y-auto p-8">
									{filteredMenus.length > 0 ? (
										<>
											<div className="mb-8">
												<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
													Hasil Pencarian
												</h2>
												<p className="text-gray-600 dark:text-gray-400">
													Ditemukan {filteredMenus.length} menu untuk "{query}"
												</p>
											</div>
											<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
												{filteredMenus.map((menu, index) => {
													const isSelected = index === selectedIndex;
													return (
														<motion.button
															key={`${menu.id}-${menu.breadcrumb}`}
															onClick={() => handleMenuSelect(menu)}
															className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 text-center transition-all duration-200 hover:shadow-xl hover:scale-105 hover:-translate-y-1 ${
																isSelected
																	? "ring-2 ring-blue-500 shadow-xl scale-105 -translate-y-1"
																	: "hover:border-blue-300/50 dark:hover:border-blue-600/50"
															}`}
															initial={{ opacity: 0, scale: 0.9 }}
															animate={{ opacity: 1, scale: 1 }}
															transition={{
																delay: index * 0.05,
																type: "spring",
																stiffness: 300,
																damping: 25,
															}}
															whileHover={{ scale: 1.05, y: -4 }}
															whileTap={{ scale: 0.95 }}
														>
															<div className="mb-4">
																<div
																	className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 ${
																		isSelected
																			? "bg-blue-500 text-white shadow-lg"
																			: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400 group-hover:from-blue-100 group-hover:to-indigo-200 dark:group-hover:from-blue-800/30 dark:group-hover:to-indigo-800/30"
																	}`}
																>
																	{menu.icon ? (
																		<i className={`${menu.icon} text-2xl`}></i>
																	) : (
																		<svg
																			className="w-8 h-8"
																			fill="currentColor"
																			viewBox="0 0 20 20"
																		>
																			<path
																				fillRule="evenodd"
																				d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
																				clipRule="evenodd"
																			/>
																		</svg>
																	)}
																</div>
															</div>
															<div className="space-y-1">
																<h3
																	className={`font-semibold text-sm leading-tight transition-colors ${
																		isSelected
																			? "text-blue-600 dark:text-blue-400"
																			: "text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400"
																	}`}
																>
																	{menu.name}
																</h3>
																{menu.level === 0 && (
																	<span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
																		Parent Menu
																	</span>
																)}
																{menu.level > 0 && (
																	<p className="text-xs text-gray-400 dark:text-gray-500 truncate">
																		{menu.breadcrumb}
																	</p>
																)}
															</div>
															{isSelected && (
																<div className="absolute top-2 right-2">
																	<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
																		<kbd className="text-white text-xs font-bold">
																			↵
																		</kbd>
																	</div>
																</div>
															)}
														</motion.button>
													);
												})}
											</div>
										</>
									) : (
										<div className="flex items-center justify-center h-96">
											<div className="text-center">
												<svg
													className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={1}
														d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.463.77-6.172 2.172a7.962 7.962 0 012.172-6.172C9.168 9.832 10.34 9 12 9s2.832.832 4 2.172c1.168-.339 2.34-.172 3 .828z"
													/>
												</svg>
												<h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
													Tidak ada menu ditemukan
												</h3>
												<p className="text-gray-500 dark:text-gray-400">
													Coba gunakan kata kunci yang berbeda
												</p>
											</div>
										</div>
									)}
								</div>
							) : (
								// Tab-based Navigation - show all menus organized by tabs
								<>
									{/* Tab Navigation */}
									<div className="flex-shrink-0 border-b border-gray-200/30 dark:border-gray-700/30 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
										<div className="px-8 py-4">
											<nav className="flex space-x-1 overflow-x-auto scrollbar-hide">
												{Object.entries(displayGroups).map(
													([rootName, group]) => (
														<button
															key={rootName}
															onClick={() => setActiveTab(rootName)}
															className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 whitespace-nowrap ${
																activeTab === rootName
																	? "bg-blue-500 text-white shadow-lg"
																	: "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm"
															}`}
														>
															{group.root.icon && (
																<i className={`${group.root.icon} h-4 w-4`}></i>
															)}
															<span>{group.root.name}</span>
															<span
																className={`px-2 py-1 rounded-full text-xs ${
																	activeTab === rootName
																		? "bg-white/20 text-white"
																		: "bg-gray-200/60 dark:bg-gray-700/60 text-gray-600 dark:text-gray-400"
																}`}
															>
																{
																	group.items.filter((item) => item.level > 0)
																		.length
																}
															</span>
														</button>
													)
												)}
											</nav>
										</div>
									</div>

									{/* Tab Content - Desktop-style Menu Grid */}
									<div className="flex-1 overflow-y-auto p-8">
										{activeTab && displayGroups[activeTab] && (
											<motion.div
												key={activeTab}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.3 }}
											>
												{/* Tab Header */}
												<div className="mb-8">
													<div className="flex items-center gap-4 mb-2">
														{displayGroups[activeTab].root.icon && (
															<div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
																<i
																	className={`${displayGroups[activeTab].root.icon} h-8 w-8 text-blue-600 dark:text-blue-400`}
																></i>
															</div>
														)}
														<div>
															<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
																{displayGroups[activeTab].root.name}
															</h2>
															{displayGroups[activeTab].root.description && (
																<p className="text-gray-600 dark:text-gray-400 mt-1">
																	{displayGroups[activeTab].root.description}
																</p>
															)}
														</div>
													</div>
												</div>

												{/* Desktop-style Menu Grid */}
												<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
													{displayGroups[activeTab].items
														.filter((menu) => menu.level > 0) // Only show child menus
														.map((menu, index) => {
															const globalIndex = filteredMenus.findIndex(
																(m) => m.id === menu.id
															);
															const isSelected = globalIndex === selectedIndex;

															return (
																<motion.button
																	key={`${menu.id}-${menu.breadcrumb}`}
																	onClick={() => handleMenuSelect(menu)}
																	className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 text-center transition-all duration-200 hover:shadow-xl hover:scale-105 hover:-translate-y-1 ${
																		isSelected
																			? "ring-2 ring-blue-500 shadow-xl scale-105 -translate-y-1"
																			: "hover:border-blue-300/50 dark:hover:border-blue-600/50"
																	}`}
																	initial={{ opacity: 0, scale: 0.9 }}
																	animate={{ opacity: 1, scale: 1 }}
																	transition={{
																		delay: index * 0.05,
																		type: "spring",
																		stiffness: 300,
																		damping: 25,
																	}}
																	whileHover={{ scale: 1.05, y: -4 }}
																	whileTap={{ scale: 0.95 }}
																>
																	{/* Menu Icon */}
																	<div className="mb-4">
																		<div
																			className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 ${
																				isSelected
																					? "bg-blue-500 text-white shadow-lg"
																					: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400 group-hover:from-blue-100 group-hover:to-indigo-200 dark:group-hover:from-blue-800/30 dark:group-hover:to-indigo-800/30"
																			}`}
																		>
																			{menu.icon ? (
																				<i
																					className={`${menu.icon} text-2xl`}
																				></i>
																			) : (
																				<svg
																					className="w-8 h-8"
																					fill="currentColor"
																					viewBox="0 0 20 20"
																				>
																					<path
																						fillRule="evenodd"
																						d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
																						clipRule="evenodd"
																					/>
																				</svg>
																			)}
																		</div>
																	</div>

																	{/* Menu Name */}
																	<div className="space-y-1">
																		<h3
																			className={`font-semibold text-sm leading-tight transition-colors ${
																				isSelected
																					? "text-blue-600 dark:text-blue-400"
																					: "text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400"
																			}`}
																		>
																			{menu.name}
																		</h3>
																		{menu.description && (
																			<p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
																				{menu.description}
																			</p>
																		)}
																	</div>

																	{/* Selected Indicator */}
																	{isSelected && (
																		<div className="absolute top-2 right-2">
																			<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
																				<kbd className="text-white text-xs font-bold">
																					↵
																				</kbd>
																			</div>
																		</div>
																	)}
																</motion.button>
															);
														})}
												</div>
											</motion.div>
										)}
									</div>
								</>
							)}
						</div>

						{/* Footer */}
						<div className="flex-shrink-0 px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200/20 dark:border-gray-700/20">
							<div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-1">
										<kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
											↑
										</kbd>
										<kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
											↓
										</kbd>
										<span>to navigate</span>
									</div>
									<div className="flex items-center gap-1">
										<kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
											↵
										</kbd>
										<span>to select</span>
									</div>
								</div>
								<div className="text-gray-400 dark:text-gray-500">
									{filteredMenus.length} hasil
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
