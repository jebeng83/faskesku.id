import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { SettingsIcon } from "@/Components/IconSettings";
import SidebarMenu from "@/Components/SidebarMenu";

export default function AppLayout({
	title = "Faskesku",
	children,
	variant = "default",
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [isDark, setIsDark] = useState(false);
	const [collapsedGroups, setCollapsedGroups] = useState({});
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

	useEffect(() => {
		const root = document.documentElement;
		if (isDark) {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [isDark]);

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

	const toggleGroup = (groupTitle) => {
		setCollapsedGroups((prev) => ({
			...prev,
			[groupTitle]: !prev[groupTitle],
		}));
	};

	if (variant === "auth") {
		return (
			<div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black">
				<header className="h-14 flex items-center justify-between px-4 max-w-6xl mx-auto">
					<div className="flex items-center gap-2">
						<div className="h-7 w-7 rounded-md bg-blue-600 shadow-sm" />
						<span className="font-semibold tracking-tight text-gray-900 dark:text-white">
							{title}
						</span>
						<span className="hidden sm:inline text-xs text-gray-500 dark:text-gray-400">
							SIMRS
						</span>
					</div>
					<button
						onClick={() => setIsDark((v) => !v)}
						className="p-2 rounded-md hover:bg-white/50 dark:hover:bg-white/5"
						aria-label="Toggle theme"
					>
						{isDark ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-5 h-5"
							>
								<path d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75 9.75 9.75 0 0 1 9.9 2.28a.75.75 0 0 1 .893.987A8.25 8.25 0 0 0 20.73 13.86a.75.75 0 0 1 1.022.893Z" />
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-5 h-5"
							>
								<path d="M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z" />
							</svg>
						)}
					</button>
				</header>
				<div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
					<div className="absolute -top-28 -right-24 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
					<div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-purple-400/10 blur-3xl" />
				</div>
				<main className="min-h-[calc(100vh-56px)] grid lg:grid-cols-2 items-stretch gap-6 max-w-6xl mx-auto px-4 pb-10">
					<section className="hidden lg:flex flex-col justify-center">
						<h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
							Selamat datang kembali
						</h1>
						<p className="mt-2 text-gray-600 dark:text-gray-400">
							Masuk untuk mengelola SIMRS Faskesku Anda. Aman, cepat, dan
							modern.
						</p>
						<ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
							<li className="flex items-center gap-2">
								<span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Single
								Sign-On dan Role-based Access
							</li>
							<li className="flex items-center gap-2">
								<span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> UI
								responsif ala Gradient Able
							</li>
							<li className="flex items-center gap-2">
								<span className="h-1.5 w-1.5 rounded-full bg-purple-500" />{" "}
								Audit & keamanan sesuai best practice
							</li>
						</ul>
					</section>
					<section className="flex items-center justify-center">
						<div className="w-full max-w-md">{children}</div>
					</section>
				</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
			{/* Top Navigation Bar - Gradient Able Style */}
			<header className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
				<div className="h-full flex items-center justify-between px-4">
					{/* Left side - Toggle + Logo */}
					<div className="flex items-center gap-3">
						{/* Sidebar Toggle Button */}
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
								fill="currentColor"
								className="w-5 h-5"
							>
								<path d="M3.75 5.25h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm0 7.5h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm0 7.5h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Z" />
							</svg>
						</button>

						{/* Logo */}
						<div className="flex items-center gap-2">
							<div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border border-blue-400/20">
								<span className="text-white font-bold text-sm drop-shadow-sm">
									F
								</span>
							</div>
							<div className="flex flex-col">
								<span className="font-bold text-gray-900 dark:text-white text-sm">
									{title}
								</span>
								<span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
									Elektronik Rekam Medis
								</span>
							</div>
						</div>
					</div>

					{/* Right side - Search + Actions */}
					<div className="flex items-center gap-3">
						{/* Search */}
						<div className="hidden md:flex items-center relative">
							<input
								className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
								placeholder="Cari..."
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-4 h-4 text-gray-400 absolute left-3"
							>
								<path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5z" />
							</svg>
						</div>

						{/* Notifications */}
						<button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-5 h-5 text-gray-600 dark:text-gray-400"
							>
								<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
							</svg>
							<span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
						</button>

						{/* Messages */}
						<button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-5 h-5 text-gray-600 dark:text-gray-400"
							>
								<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
							</svg>
							<span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full"></span>
						</button>

						{/* User Profile Dropdown */}
						<UserProfileDropdown
							isOpen={isProfileDropdownOpen}
							onToggle={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
						/>
					</div>
				</div>
			</header>

			{/* Mobile backdrop - dipindahkan keluar dari sidebar */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-30 lg:hidden"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			{/* Sidebar - Gradient Able Style */}
			<aside
				className={`fixed lg:sticky top-14 left-0 z-40 h-[calc(100vh-56px)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-all duration-300 ${
					isSidebarOpen
						? "translate-x-0 w-64"
						: isSidebarCollapsed
						? "lg:translate-x-0 lg:w-16 -translate-x-full"
						: "lg:translate-x-0 lg:w-64 -translate-x-full"
				}`}
			>
				{/* Mobile backdrop */}
				{isSidebarOpen && (
					<div
						className="fixed inset-0 bg-black/50 z-30 lg:hidden"
						onClick={() => setIsSidebarOpen(false)}
					/>
				)}

				<div className="h-full flex flex-col">
					{/* Dynamic Navigation */}
					{!isSidebarCollapsed ? (
						<SidebarMenu />
					) : (
						<nav className="flex-1 p-4 space-y-2">
							<div className="space-y-2">
								<NavItemCollapsed icon="home" active />
								<NavItemCollapsed icon="box" />
								<NavItemCollapsed icon="users" />
								<NavItemCollapsed icon="lock" />
								<NavItemCollapsed icon="file-text" />
							</div>
						</nav>
					)}

					{/* Bottom Card - Gradient Pro */}
					{!isSidebarCollapsed && (
						<div className="p-4 border-t border-gray-200 dark:border-gray-800">
							<div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 text-center">
								<div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border border-blue-400/20">
									<span className="text-white font-bold text-lg drop-shadow-sm">
										F
									</span>
								</div>
								<h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
									Faskesku.id
								</h4>
								<p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
									Sistem Informasi Free & open Source{" "}
								</p>
								<button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-md transition-colors">
									Panduan Aplikasi
								</button>
							</div>
						</div>
					)}
				</div>
			</aside>

			{/* Main Content */}
			<main
				className={`absolute top-14 p-4 left-0 right-0 bottom-0 transition-all duration-300 ${
					isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
				}`}
			>
				{children}
			</main>
		</div>
	);
}

function NavGroup({ title, children, onToggle, isCollapsed = false }) {
	return (
		<div className={`mb-6 ${isSubGroup ? "ml-4" : ""}`}>
			<button
				onClick={() => onToggle && onToggle(title)}
				className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
			>
				<span>{title}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className={`w-3 h-3 transition-transform duration-200 ${
						isCollapsed ? "rotate-180" : ""
					}`}
				>
					<path d="M7 14l5-5 5 5z" />
				</svg>
			</button>
			{!isCollapsed && <div className="space-y-1 mt-2">{children}</div>}
		</div>
	);
}

function NavItem({
	icon,
	label,
	active = false,
	hasSubmenu = false,
	href = "#",
}) {
	return (
		<a
			href={href}
			className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
				active
					? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
					: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
			}`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="w-4 h-4"
			>
				{icon === "home" && <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />}
				{icon === "box" && (
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				)}
				{icon === "users" && (
					<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
				)}
				{icon === "walking" && (
					<path d="M13 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM9.75 10.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-.75h1.5v2.25a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-.75-.75h-1.25Z" />
				)}
				{icon === "bed" && (
					<path d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a1 1 0 1 1-2 0v-3H3v3a1 1 0 1 1-2 0V9Z" />
				)}
				{icon === "lock" && (
					<path d="M18 10V6a6 6 0 0 0-12 0v4H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1ZM8 6a4 4 0 0 1 8 0v4H8V6Z" />
				)}
				{icon === "log-in" && (
					<path d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2a1 1 0 0 0-2 0v2H7V5h8v2a1 1 0 0 0 2 0V5a2 2 0 0 0-2-2Z" />
				)}
				{icon === "unlock" && (
					<path d="M18 8h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM9 6a3 3 0 0 1 6 0v2H9V6Z" />
				)}
				{icon === "sidebar" && (
					<path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Zm2 1v14h6V5H5Zm8 0v14h6V5h-6Z" />
				)}
				{icon === "help-circle" && (
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
				)}
				{icon === "stethoscope" && (
					<path d="M19 14a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3ZM8.5 8.5c0 1.5 1.5 3 3 3s3-1.5 3-3V6c0-1.5-1.5-3-3-3s-3 1.5-3 3v2.5ZM6 8.5V6c0-2.5 2.5-5 5.5-5S17 3.5 17 6v2.5c0 1-.5 2-1.5 2.5v1c0 2-1.5 3.5-3.5 3.5h-1v2.5c0 1.5-1.5 3-3 3s-3-1.5-3-3 1.5-3 3-3c.5 0 1 .5 1.5 1v-2.5H8c-1 0-2-.5-2-1.5v-1c-1-.5-1.5-1.5-1.5-2.5Z" />
				)}
				{icon === "bed-double" && (
					<path d="M2 12h20v2H2v-2zm0 4h20v2H2v-2zm18-8V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2H2v2h2v2h16v-2h2V8h-2zm-2 0H6V6h12v2z" />
				)}
				{icon === "ambulance" && (
					<path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
				)}
				{icon === "surgery" && (
					<path d="M9.83 8.17l-3.66 3.66c-.39.39-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0l3.66-3.66L9.83 8.17zM14.5 4l1.41 1.41L12.17 9.17l-1.41-1.41L14.5 4zm2.12-2.12c.78-.78 2.05-.78 2.83 0l1.41 1.41c.78.78.78 2.05 0 2.83L18.17 8.83l-2.83-2.83 2.28-2.28z" />
				)}
				{icon === "flask" && (
					<path d="M9 2v3h6V2h2v3.5c0 .28-.11.53-.29.71L14 9v8c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2V9L3.29 6.21C3.11 6.03 3 5.78 3 5.5V2h2v3h4V2h2zm1 7.5L8.5 8H15.5l-1.5 1.5V17h-4V9.5z" />
				)}
				{icon === "x-ray" && (
					<path d="M22 6v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-2 0H4v12h16V6zm-8 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4 6c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm8 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
				)}
				{icon === "therapy" && (
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
				)}
			</svg>
			<span>{label}</span>
		</a>
	);
}

function NavItemCollapsed({ icon, active = false, href = "#" }) {
	return (
		<a
			href={href}
			className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
				active
					? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
					: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
			}`}
			title={icon}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="w-5 h-5"
			>
				{icon === "home" && <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />}
				{icon === "users" && (
					<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
				)}
				{icon === "walking" && (
					<path d="M13 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM9.75 10.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-.75h1.5v2.25a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-.75-.75h-1.25Z" />
				)}
				{icon === "user-md" && (
					<path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h1a4 4 0 1 0 0-8v1a3 3 0 0 1 0 6H9m0 0V9a5 5 0 0 1 10 0v1M7 20l4-16m6 16l-4-16" />
				)}
				{icon === "pills" && (
					<path d="M11 1a5 5 0 0 0-5 5v4a5 5 0 0 0 10 0V6a5 5 0 0 0-5-5ZM8 6a3 3 0 1 1 6 0v4a3 3 0 1 1-6 0V6ZM5 15a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" />
				)}
				{icon === "bed" && (
					<path d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a1 1 0 1 1-2 0v-3H3v3a1 1 0 1 1-2 0V9Z" />
				)}
			</svg>
		</a>
	);
}

function UserProfileDropdown({ isOpen, onToggle }) {
	const handleLogout = () => {
		router.post(route('logout'));
	};

	return (
		<div className="relative profile-dropdown">
			<button
				onClick={onToggle}
				className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			>
				<div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
					<span className="text-white font-semibold text-sm">A</span>
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				>
					<path d="M7 10l5 5 5-5z" />
				</svg>
			</button>

			{isOpen && (
				<div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
					<a
						href="#"
						className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
					>
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
						</svg>
						Profile
					</a>
					<a
						href="#"
						className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
					>
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
						</svg>
						Settings
					</a>
					<hr className="my-1 border-gray-200 dark:border-gray-600" />
					<button
						onClick={handleLogout}
						className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
					>
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 0 1 2 2v2h-2V4H4v16h10v-2h2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10Z" />
						</svg>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}
