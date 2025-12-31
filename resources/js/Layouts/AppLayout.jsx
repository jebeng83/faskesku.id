import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarMenu from "@/Components/SidebarMenu";
import Breadcrumb from "@/Components/Breadcrumb";
import MenuSearch from "@/Components/MenuSearch";

export default function AppLayout({
    title = "Faskesku",
    children,
    variant = "default",
}) {
    const page = usePage();
    const { auth, menu_hierarchy, current_menu } = page.props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    // Theme: light | dark | system
    const [theme, setTheme] = useState("system");
    const [isDark, setIsDark] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isMenuSearchOpen, setIsMenuSearchOpen] = useState(false);

    const currentUrl = page?.url || (typeof window !== "undefined" ? window.location.pathname : "");
    const prefersReducedMotion = useReducedMotion();
    const pageVariants = {
        hidden: {
            opacity: 0,
            y: prefersReducedMotion ? 0 : 12,
            filter: prefersReducedMotion ? "none" : "blur(2px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "none",
            transition: {
                duration: prefersReducedMotion ? 0 : 0.35,
                ease: [0.22, 1, 0.36, 1],
            },
        },
        exit: {
            opacity: 0,
            y: prefersReducedMotion ? 0 : -8,
            filter: prefersReducedMotion ? "none" : "blur(1px)",
            transition: {
                duration: prefersReducedMotion ? 0 : 0.25,
                ease: "easeInOut",
            },
        },
    };

    // Restore theme preference
    useEffect(() => {
        try {
            const savedTheme = localStorage.getItem("theme-preference");
            if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
                setTheme(savedTheme);
            }
        } catch (_) {}
    }, []);

    // Compute dark mode from theme + system preference
    useEffect(() => {
        const mediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
        const compute = () => {
            const systemPrefersDark = mediaQuery ? mediaQuery.matches : false;
            const nextIsDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);
            setIsDark(nextIsDark);
        };
        compute();
        if (mediaQuery) {
            const listener = () => compute();
            if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', listener);
            else if (mediaQuery.addListener) mediaQuery.addListener(listener);
            return () => {
                if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', listener);
                else if (mediaQuery.removeListener) mediaQuery.removeListener(listener);
            };
        }
    }, [theme]);

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDark]);

    // Persist theme preference
    useEffect(() => {
        try {
            localStorage.setItem("theme-preference", theme);
        } catch (_) {}
    }, [theme]);

    useEffect(() => {
        const limit = 30 * 60 * 1000;
        let timeoutId;
        let hasLoggedOut = false;

        const logout = () => {
            if (hasLoggedOut) return;
            hasLoggedOut = true;
            try {
                const form = document.createElement("form");
                form.method = "POST";
                form.action = route("logout");
                const csrfInput = document.createElement("input");
                csrfInput.type = "hidden";
                csrfInput.name = "_token";
                csrfInput.value =
                    document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content") || "";
                form.appendChild(csrfInput);
                document.body.appendChild(form);
                form.submit();
            } catch (_) {}
        };

        const resetTimer = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(logout, limit);
        };

        const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
        events.forEach((evt) => {
            window.addEventListener(evt, resetTimer, { passive: true });
        });

        resetTimer();

        return () => {
            clearTimeout(timeoutId);
            events.forEach((evt) => {
                window.removeEventListener(evt, resetTimer);
            });
        };
    }, []);

	// Restore sidebar toggle state from localStorage
	useEffect(() => {
		try {
			const savedCollapsed = localStorage.getItem("sidebarCollapsed");
			if (savedCollapsed !== null) {
				setIsSidebarCollapsed(savedCollapsed === "true");
			}
			const savedOpen = localStorage.getItem("sidebarOpen");
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
			localStorage.setItem("sidebarCollapsed", String(isSidebarCollapsed));
		} catch (_) {}
	}, [isSidebarCollapsed]);

	useEffect(() => {
		try {
			localStorage.setItem("sidebarOpen", String(isSidebarOpen));
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

	// Global keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (event) => {
			// Command+K or Ctrl+K to open menu search
			if ((event.metaKey || event.ctrlKey) && event.key === "k") {
				event.preventDefault();
				setIsMenuSearchOpen(true);
			}
			// Escape to close menu search
			else if (event.key === "Escape" && isMenuSearchOpen) {
				setIsMenuSearchOpen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isMenuSearchOpen]);

    

    const cycleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light'));

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
                    <div className="flex items-center gap-2">
                        <button
                            onClick={cycleTheme}
                            className="p-2 rounded-md hover:bg-white/50 dark:hover:bg-white/5"
                            aria-label="Toggle theme"
                            title={`Theme: ${theme}`}
                        >
                            {theme === 'light' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M12 4.5a.75.75 0 0 1 .75-.75h.003a.75.75 0 0 1 0 1.5H12.75A.75.75 0 0 1 12 4.5Zm0 13.5a.75.75 0 0 1 .75-.75h.003a.75.75 0 0 1 0 1.5H12.75a.75.75 0 0 1-.75-.75ZM4.5 12a.75.75 0 0 1 .75-.75h.003a.75.75 0 0 1 0 1.5H5.25A.75.75 0 0 1 4.5 12Zm13.5 0a.75.75 0 0 1 .75-.75h.003a.75.75 0 0 1 0 1.5H18.75a.75.75 0 0 1-.75-.75ZM6.22 6.22a.75.75 0 0 1 1.06 0l.002.002a.75.75 0 1 1-1.062 1.06l-.002-.002a.75.75 0 0 1 0-1.06Zm10.5 10.5a.75.75 0 0 1 1.06 0l.002.002a.75.75 0 1 1-1.062 1.06l-.002-.002a.75.75 0 0 1 0-1.06ZM6.22 17.78a.75.75 0 0 1 0-1.06l.002-.002a.75.75 0 1 1 1.06 1.062l-.002.002a.75.75 0 0 1-1.06 0Zm10.5-10.5a.75.75 0 0 1 0-1.06l.002-.002a.75.75 0 1 1 1.06 1.062l-.002.002a.75.75 0 0 1-1.06 0ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z" />
                                </svg>
                            ) : theme === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75 9.75 9.75 0 0 1 9.9 2.28a.75.75 0 0 1 .893.987A8.25 8.25 0 0 0 20.73 13.86a.75.75 0 0 1 1.022.893Z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M4.5 6A2.25 2.25 0 0 1 6.75 3.75h10.5A2.25 2.25 0 0 1 19.5 6v12A2.25 2.25 0 0 1 17.25 20.25H6.75A2.25 2.25 0 0 1 4.5 18V6Zm1.5 0v12h12V6h-12Z" />
                                </svg>
                            )}
                        </button>
                    </div>
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
						<div className="w-full max-w-md">
							<AnimatePresence mode="wait" initial={false}>
								<motion.div
									key={currentUrl}
									initial="hidden"
									animate="visible"
									exit="exit"
									variants={pageVariants}
								>
									{children}
								</motion.div>
							</AnimatePresence>
						</div>
					</section>
				</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
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
						<Breadcrumb
							currentMenu={current_menu}
							menuHierarchy={menu_hierarchy}
						/>
					</div>

                    {/* Right side - Actions */}
                    <div className="flex items-center gap-3">
                        {/* Theme switcher */}
                        <button
                            onClick={cycleTheme}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                            title={`Theme: ${theme}`}
                        >
                            {theme === 'light' ? (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 4a1 1 0 0 1 1 1v1h-2V5a1 1 0 0 1 1-1Zm0 14a1 1 0 0 1 1 1v1h-2v-1a1 1 0 0 1 1-1ZM4 12a1 1 0 0 1 1-1h1v2H5a1 1 0 0 1-1-1Zm14 0a1 1 0 0 1 1-1h1v2h-1a1 1 0 0 1-1-1ZM6.464 6.464a1 1 0 0 1 1.414 0l.707.707-1.414 1.414-.707-.707a1 1 0 0 1 0-1.414Zm9.192 9.192a1 1 0 0 1 1.414 0l.707.707-1.414 1.414-.707-.707a1 1 0 0 1 0-1.414ZM6.464 17.536a1 1 0 0 1 0-1.414l.707-.707 1.414 1.414-.707.707a1 1 0 0 1-1.414 0Zm9.192-9.192a1 1 0 0 1 0-1.414l.707-.707 1.414 1.414-.707.707a1 1 0 0 1-1.414 0ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
                                </svg>
                            ) : theme === 'dark' ? (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75 9.75 9.75 0 0 1 9.9 2.28a.75.75 0 0 1 .893.987A8.25 8.25 0 0 0 20.73 13.86a.75.75 0 0 1 1.022.893Z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.5 6A2.25 2.25 0 0 1 6.75 3.75h10.5A2.25 2.25 0 0 1 19.5 6v12A2.25 2.25 0 0 1 17.25 20.25H6.75A2.25 2.25 0 0 1 4.5 18V6Zm1.5 0v12h12V6h-12Z" />
                                </svg>
                            )}
                            <span className="hidden sm:inline capitalize">{theme}</span>
                        </button>
                        {/* Search Button */}
                        <button
                        onClick={() => setIsMenuSearchOpen(true)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                        title="Search menus (⌘+K)"
                        >
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
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <span className="hidden sm:inline">Search</span>
                            <kbd className="hidden sm:inline-flex ml-2 px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
                                ⌘K
                            </kbd>
                        </button>
						{/* Manage Button */}
						{/* <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
							</svg>
							<span>Manage</span>
						</button> */}

						{/* Share Button */}
						{/* <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3 3 0 000-2.408l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
							</svg>
							<span>Share</span>
						</button> */}

						{/* User Profile Dropdown */}
						<div className="relative profile-dropdown">
							<button
								onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
								className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
							>
								<div className="flex flex-col items-end text-right">
									<span className="text-sm font-medium text-gray-900 dark:text-white">
										{auth?.user?.name || auth?.user?.username || "User"}
									</span>
									<span className="text-xs text-gray-500 dark:text-gray-400">
										{auth?.user?.employee?.jabatan || "User"}
									</span>
								</div>
								<div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
									<span className="text-white font-semibold text-sm">
										{(auth?.user?.name || auth?.user?.username || "U")
											.substring(0, 2)
											.toUpperCase()}
									</span>
								</div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${
										isProfileDropdownOpen ? "rotate-180" : ""
									}`}
								>
									<path
										fillRule="evenodd"
										d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
										clipRule="evenodd"
									/>
								</svg>
							</button>

							{/* Dropdown Menu */}
							{isProfileDropdownOpen && (
								<div
									className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700"
									onClick={(e) => e.stopPropagation()}
									onMouseDown={(e) => e.stopPropagation()}
									onMouseUp={(e) => e.stopPropagation()}
								>
									{/* User Info */}
									<div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
										<div className="flex items-center gap-3">
											<div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
												<span className="text-white font-semibold">
													{(auth?.user?.name || auth?.user?.username || "U")
														.substring(0, 2)
														.toUpperCase()}
												</span>
											</div>
											<div>
												<p className="text-sm font-medium text-gray-900 dark:text-white">
													{auth?.user?.name || auth?.user?.username || "User"}
												</p>
												<p className="text-xs text-gray-500 dark:text-gray-400">
													{auth?.user?.email || "No email"}
												</p>
											</div>
										</div>
									</div>

									{/* Menu Items */}
									<div className="py-1">
										<button
											onClick={() => {
												router.visit(route("profile.show"));
												setIsProfileDropdownOpen(false);
											}}
											className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
										>
											<svg
												className="w-4 h-4"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
													clipRule="evenodd"
												/>
											</svg>
											Profil Saya
										</button>
										<a
											href="#"
											className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
										>
											<svg
												className="w-4 h-4"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
													clipRule="evenodd"
												/>
											</svg>
											Pengaturan
										</a>
										<a
											href="#"
											className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
										>
											<svg
												className="w-4 h-4"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.759 8.071 16 9.007 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.532a1.5 1.5 0 00-2.414.414l-.504.504a1.5 1.5 0 00.414 2.414l.504-.504a1.5 1.5 0 00.414-2.414l-.504.504zM4 10a1.5 1.5 0 011.5-1.5H6a1.5 1.5 0 000 3H5.5A1.5 1.5 0 014 10z"
													clipRule="evenodd"
												/>
											</svg>
											Bantuan
										</a>
									</div>

									{/* Divider */}
									<div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                                    {/* Logout */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            // Gunakan form submission agar CSRF selalu tervalidasi oleh Laravel
                                            try {
                                                const form = document.createElement("form");
                                                form.method = "POST";
                                                form.action = route("logout");
                                                const csrfInput = document.createElement("input");
                                                csrfInput.type = "hidden";
                                                csrfInput.name = "_token";
                                                csrfInput.value =
                                                    document
                                                        .querySelector('meta[name="csrf-token"]')
                                                        ?.getAttribute("content") || "";
                                                form.appendChild(csrfInput);
                                                document.body.appendChild(form);
                                                form.submit();
                                            } catch (error) {
                                                console.error("Logout error:", error);
                                            }
                                        }}
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onMouseUp={(e) => e.stopPropagation()}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
											<path
												fillRule="evenodd"
												d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
												clipRule="evenodd"
											/>
										</svg>
										Keluar
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</header>

			{/* Mobile backdrop */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			{/* Layout Container */}
			<div className="flex h-screen">
				{/* Sidebar - Fixed with Independent Scroll */}
				<aside
					className={`bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 dark:from-blue-800 dark:via-blue-700 dark:to-blue-600 border-r border-gray-200 dark:border-gray-800 transform transition-all duration-300 flex-shrink-0 ${
						isSidebarOpen
							? "translate-x-0 w-64"
							: isSidebarCollapsed
							? "lg:translate-x-0 lg:w-16 -translate-x-full"
							: "lg:translate-x-0 lg:w-64 -translate-x-full"
					} lg:relative fixed z-[60] h-screen`}
				>
					<div className="h-full flex flex-col overflow-hidden">
						{/* Dynamic Navigation */}
						{!isSidebarCollapsed ? (
							<div className="flex-1 overflow-y-auto">
								<SidebarMenu
									title={title}
									onToggle={() => {
										if (window.innerWidth < 1024) {
											setIsSidebarOpen(!isSidebarOpen);
										} else {
											setIsSidebarCollapsed(!isSidebarCollapsed);
										}
									}}
								/>
							</div>
						) : (
							<div className="flex-1 overflow-y-auto">
								<SidebarMenu
									collapsed
									title={title}
									onToggle={() => {
										if (window.innerWidth < 1024) {
											setIsSidebarOpen(!isSidebarOpen);
										} else {
											setIsSidebarCollapsed(!isSidebarCollapsed);
										}
									}}
								/>
							</div>
						)}
					</div>
				</aside>

				{/* Main Content Area */}
				<div className="flex-1 overflow-hidden">
					<main className="h-screen overflow-y-auto bg-white dark:bg-gray-950">
						<div className="p-4 pt-20 min-h-full">
							<AnimatePresence mode="wait" initial={false}>
								<motion.div
									key={currentUrl}
									initial="hidden"
									animate="visible"
									exit="exit"
									variants={pageVariants}
								>
									{children}
								</motion.div>
							</AnimatePresence>
						</div>
					</main>
				</div>
			</div>

			{/* Menu Search Modal */}
			<MenuSearch
				isOpen={isMenuSearchOpen}
				onClose={() => setIsMenuSearchOpen(false)}
			/>
		</div>
	);
}
