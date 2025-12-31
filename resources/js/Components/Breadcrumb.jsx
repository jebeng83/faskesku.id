import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Breadcrumb({ currentMenu, menuHierarchy }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (isDropdownOpen && !event.target.closest(".breadcrumb-dropdown")) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isDropdownOpen]);

	// Function to find breadcrumb path
	const findBreadcrumbPath = (menus, targetMenuId, path = []) => {
		for (const menu of menus) {
			const currentPath = [...path, menu];

			if (menu.id === targetMenuId) {
				return currentPath;
			}

			const children = menu.active_children_recursive || menu.children || [];
			if (children.length > 0) {
				const result = findBreadcrumbPath(children, targetMenuId, currentPath);
				if (result.length > 0) {
					return result;
				}
			}
		}
		return [];
	};

	// Get breadcrumb path
	const breadcrumbPath =
		currentMenu && menuHierarchy
			? findBreadcrumbPath(menuHierarchy, currentMenu.id)
			: [];

	// Get page title from current URL if no menu found
	const getPageTitleFromUrl = () => {
		const path = window.location.pathname;
		const segments = path.split("/").filter(Boolean);

		// Map common routes to readable titles
		const routeMap = {
			penjab: "Penjab",
			patients: "Pasien",
			employees: "Pegawai",
			doctors: "Dokter",
			spesialis: "Spesialis",
			"rawat-jalan": "Rawat Jalan",
			"rawat-inap": "Rawat Inap",
			igd: "IGD",
			laboratorium: "Laboratorium",
			radiologi: "Radiologi",
			farmasi: "Farmasi",
			users: "Pengguna",
			menus: "Menu",
			permissions: "Hak Akses",
			profile: "Profil",
			registration: "Pendaftaran",
			"permintaan-lab": "Permintaan Lab",
			"kamar-operasi": "Kamar Operasi",
			"rehabilitasi-medik": "Rehabilitasi Medik",
			"daftar-tarif": "Daftar Tarif",
			"kategori-perawatan": "Kategori Perawatan",
		};

		// Handle nested routes
		if (segments.length > 1) {
			const parentRoute = routeMap[segments[0]];
			const childRoute = routeMap[segments[1]];

			if (parentRoute && childRoute) {
				return `${parentRoute} > ${childRoute}`;
			}
		}

		const lastSegment = segments[segments.length - 1];
		return routeMap[lastSegment] || lastSegment || "Halaman";
	};

	// If no breadcrumb path found, show default with page title
	if (breadcrumbPath.length === 0) {
		const pageTitle = getPageTitleFromUrl();

		return (
			<nav className="flex items-center space-x-2 text-sm">
				{/* Mobile: Show only current page */}
				<div className="flex items-center space-x-1 text-gray-900 dark:text-white font-medium sm:hidden">
					<div className="w-4 h-4 bg-gray-800 rounded-sm flex items-center justify-center">
						<svg
							className="w-3 h-3 text-white"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<span className="truncate max-w-[200px]">{pageTitle}</span>
				</div>

				{/* Desktop: Show full breadcrumb */}
				<div className="hidden sm:flex items-center space-x-2">
					<Link
						href={route("dashboard")}
						className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
					>
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
						</svg>
						<span>Dashboard</span>
					</Link>

					<svg
						className="w-4 h-4 text-gray-400"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>

					<div className="flex items-center space-x-1 text-gray-900 dark:text-white font-medium">
						<div className="w-4 h-4 bg-gray-800 rounded-sm flex items-center justify-center">
							<svg
								className="w-3 h-3 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<span>{pageTitle}</span>
					</div>
				</div>
			</nav>
		);
	}

	return (
		<nav className="flex items-center space-x-2 text-sm">
			{/* Mobile: Show only current page with dropdown for parents */}
			<div className="flex items-center space-x-2 sm:hidden">
				{/* Dropdown for parent items */}
				{breadcrumbPath.length > 1 && (
					<div className="relative breadcrumb-dropdown">
						<button
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-1 rounded"
						>
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
							</svg>
						</button>

						{/* Dropdown menu */}
						{isDropdownOpen && (
							<div className="absolute left-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
								{/* Home/Dashboard */}
								<Link
									href={route("dashboard")}
									className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
									onClick={() => setIsDropdownOpen(false)}
								>
									<svg
										className="w-4 h-4"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
									</svg>
									<span>Dashboard</span>
								</Link>

								{/* Parent breadcrumb items */}
                                {breadcrumbPath.slice(0, -1).map((menu, _index) => {
                                    const menuUrl = getMenuUrl(menu);
                                    return (
										<Link
											key={menu.id}
											href={menuUrl}
											className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
											onClick={() => setIsDropdownOpen(false)}
										>
											{menu.icon ? (
												<i className={`${menu.icon} w-4 h-4`}></i>
											) : (
												<svg
													className="w-4 h-4"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
												</svg>
											)}
											<span className="truncate">{menu.name}</span>
										</Link>
									);
								})}
							</div>
						)}
					</div>
				)}

				{/* Current page */}
				<div className="flex items-center space-x-1 text-gray-900 dark:text-white font-medium">
					{breadcrumbPath[breadcrumbPath.length - 1].icon ? (
						<div className="w-4 h-4 bg-gray-800 rounded-sm flex items-center justify-center">
							<i
								className={`${
									breadcrumbPath[breadcrumbPath.length - 1].icon
								} text-white text-xs`}
							></i>
						</div>
					) : (
						<div className="w-4 h-4 bg-gray-800 rounded-sm flex items-center justify-center">
							<svg
								className="w-3 h-3 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					)}
					<span className="truncate max-w-[200px]">
						{breadcrumbPath[breadcrumbPath.length - 1].name}
					</span>
				</div>
			</div>

			{/* Desktop: Show full breadcrumb */}
			<div className="hidden sm:flex items-center space-x-2">
				{/* Home/Dashboard */}
				<Link
					href={route("dashboard")}
					className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
				>
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
					</svg>
					<span>Dashboard</span>
				</Link>

				{/* Breadcrumb items */}
                {breadcrumbPath.map((menu, _index) => {
                    const isLast = _index === breadcrumbPath.length - 1;
                    const menuUrl = getMenuUrl(menu);

					return (
						<React.Fragment key={menu.id}>
							{/* Separator */}
							<svg
								className="w-4 h-4 text-gray-400"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>

							{/* Menu item */}
							{isLast ? (
								// Current page - not clickable
								<div className="flex items-center space-x-1 text-gray-900 dark:text-white font-medium">
									{menu.icon ? (
										<div className="w-4 h-4 bg-gray-800 rounded-sm flex items-center justify-center">
											<i className={`${menu.icon} text-white text-xs`}></i>
										</div>
									) : (
										<div className="w-4 h-4 bg-gray-800 rounded-sm flex items-center justify-center">
											<svg
												className="w-3 h-3 text-white"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
									)}
									<span>{menu.name}</span>
								</div>
							) : (
								// Parent pages - clickable
								<Link
									href={menuUrl}
									className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
								>
									{menu.icon ? (
										<i className={`${menu.icon} w-4 h-4`}></i>
									) : (
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
										</svg>
									)}
									<span>{menu.name}</span>
								</Link>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</nav>
	);
}

// Helper function to get menu URL
function getMenuUrl(menu) {
	if (menu.url) {
		return menu.url;
	}

	if (menu.route) {
		try {
			return route(menu.route);
        } catch (_error) {
            console.warn(`Route ${menu.route} not found for menu ${menu.name}`);
            return "#";
        }
	}

	return "#";
}
