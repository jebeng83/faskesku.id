
import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import LanjutanRalanSidebar from "@/Components/LanjutanRalanSidebar";
import Breadcrumb from "@/Components/Breadcrumb";

export default function LanjutanRalanLayout({
	title = "Lanjutan Rawat Jalan",
	children,
	menuConfig = {},
}) {
	const { auth, menu_hierarchy, current_menu } = usePage().props;
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [isDark, setIsDark] = useState(false);
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

	useEffect(() => {
		const root = document.documentElement;
		if (isDark) {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [isDark]);

	// Restore sidebar toggle state from localStorage
	useEffect(() => {
		try {
			const savedCollapsed = localStorage.getItem("lanjutanRalanSidebarCollapsed");
			if (savedCollapsed !== null) {
				setIsSidebarCollapsed(savedCollapsed === "true");
			}
			const savedOpen = localStorage.getItem("lanjutanRalanSidebarOpen");
			if (savedOpen !== null) {
				setIsSidebarOpen(savedOpen === "true");
			}
		} catch (_) {
			// ignore
		}
	}, []);

	// Persist sidebar states
	useEffect(() => {
		try {
			localStorage.setItem("lanjutanRalanSidebarCollapsed", String(isSidebarCollapsed));
		} catch (_) {}
	}, [isSidebarCollapsed]);

	useEffect(() => {
		try {
			localStorage.setItem("lanjutanRalanSidebarOpen", String(isSidebarOpen));
		} catch (_) {}
	}, [isSidebarOpen]);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (isProfileDropdownOpen && !event.target.closest(".profile-dropdown")) {
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
		if (window.innerWidth < 1024) {
			setIsSidebarOpen(false);
		}
	};

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
				<LanjutanRalanSidebar
					collapsed={isSidebarCollapsed}
					title={title}
					menuConfig={menuConfig}
					onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
				/>
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
					{/* Left side - Back button + Breadcrumb */}
					<div className="flex items-center gap-3">
						{/* Back Button */}
						<button
							onClick={() => {
								if (window.innerWidth < 1024) {
									setIsSidebarOpen(!isSidebarOpen);
								} else {
									setIsSidebarCollapsed(!isSidebarCollapsed);
								}
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

						{/* Breadcrumb Navigation */}
						<nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
							<a 
								href={route('dashboard')} 
								className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
							>
								Dashboard
							</a>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
							<a 
								href={route('rawat-jalan.index')} 
								className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
							>
								Rawat Jalan
							</a>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
							<span className="text-gray-900 dark:text-white font-medium">Lanjutan</span>
						</nav>
					</div>

					{/* Right side - User menu */}
					<div className="flex items-center gap-3">
						{/* Theme Toggle */}
						<button
							onClick={() => setIsDark(!isDark)}
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
								onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
								className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
							>
								<div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
									<span className="text-white font-bold text-sm">
										{auth?.user?.name?.charAt(0)?.toUpperCase() || "U"}
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
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
										>
											Profile
										</a>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
										>
											Settings
										</a>
										<hr className="my-1 border-gray-200 dark:border-gray-700" />
                                        <button
                                            onClick={() => {
                                                try {
                                                    const form = document.createElement("form");
                                                    form.method = "POST";
                                                    form.action = route("logout");
                                                    const csrfInput = document.createElement("input");
                                                    csrfInput.type = "hidden";
                                                    csrfInput.name = "_token";
                                                    csrfInput.value =
                                                        document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
                                                    form.appendChild(csrfInput);
                                                    document.body.appendChild(form);
                                                    form.submit();
                                                } catch (error) {
                                                    console.error("Logout error:", error);
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
				<div className="min-h-[calc(100vh-3.5rem)]">
					{children}
				</div>
			</main>
		</div>
	);
}
