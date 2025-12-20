import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import LanjutanRegistrasiSidebar from "@/Components/LanjutanRegistrasiSidebar";
import MobileBottomNav from "@/Components/MobileBottomNav";

function LanjutanRegistrasiLayout({
  title = "Registrasi Pasien",
  children,
  menuConfig = {},
}) {
  const page = usePage();
  const { auth } = page.props;
  const currentUrl = page?.url || (typeof window !== "undefined" ? window.location.pathname : "");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  // Theme: light | dark | system
  const [theme, setTheme] = useState("system");
  const [isDark, setIsDark] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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

  // Restore sidebar toggle state from localStorage
  useEffect(() => {
    try {
      const savedCollapsed = localStorage.getItem(
        "lanjutanRegistrasiSidebarCollapsed"
      );
      if (savedCollapsed !== null) {
        setIsSidebarCollapsed(savedCollapsed === "true");
      }
      const savedOpen = localStorage.getItem("lanjutanRegistrasiSidebarOpen");
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
      localStorage.setItem(
        "lanjutanRegistrasiSidebarCollapsed",
        String(isSidebarCollapsed)
      );
    } catch (_) {}
  }, [isSidebarCollapsed]);

  useEffect(() => {
    try {
      localStorage.setItem("lanjutanRegistrasiSidebarOpen", String(isSidebarOpen));
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

  // Provide sensible default menu behavior: when a page doesn't supply
  // an onTabChange handler, clicking sidebar tabs should navigate to
  // the corresponding index pages using Ziggy routes.
  const defaultMenuConfig = {
    onTabChange: (tab) => {
      try {
        if (tab === "registrasi") {
          router.visit(route("registration.lanjutan"), { preserveScroll: true, preserveState: true });
        } else if (tab === "pasien") {
          router.visit(route("patients.index"), { preserveScroll: true, preserveState: true });
        } else if (tab === "dokter") {
          router.visit(route("doctors.index"), { preserveScroll: true, preserveState: true });
        } else if (tab === "poliklinik") {
          router.visit(route("poliklinik.index"), { preserveScroll: true, preserveState: true });
        } else if (tab === "keg_kelompok_pcare") {
          router.visit(route("pcare.kelompok.entri"), { preserveScroll: true, preserveState: true });
        }
      } catch (_) {
        // Fallback to hard navigation if needed
        if (tab === "registrasi") {
          window.location.href = route("registration.lanjutan");
        } else if (tab === "pasien") {
          window.location.href = route("patients.index");
        } else if (tab === "dokter") {
          window.location.href = route("doctors.index");
        } else if (tab === "poliklinik") {
          window.location.href = route("poliklinik.index");
        } else if (tab === "keg_kelompok_pcare") {
          window.location.href = route("pcare.kelompok.entri");
        }
      }
    },
  };
  const mergedMenuConfig = { ...defaultMenuConfig, ...menuConfig };

  // Page transition variants for smoother cross-page animations
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
        <LanjutanRegistrasiSidebar
          collapsed={isSidebarCollapsed}
          title={title}
          menuConfig={mergedMenuConfig}
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
          {/* Left side - Sidebar toggle + Breadcrumb */}
          <div className="flex items-center gap-3">
            {/* Sidebar Toggle */}
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
                href={route("dashboard")}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Dashboard
              </a>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <a
                href={route("registration.index")}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Registrasi
              </a>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 dark:text-white font-medium">Lanjutan</span>
            </nav>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center gap-3">
            {/* Theme Switcher */}
            <button
              onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light'))}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              aria-label="Toggle theme"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
          isSidebarOpen ? "lg:ml-64" : isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        {/* Tambahkan padding horizontal agar ada jarak kanan-kiri antara konten dan sidebar */}
        <div className="min-h-[calc(100vh-3.5rem)] px-4 sm:px-6 lg:px-8 pt-4 pb-24">
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
      <MobileBottomNav />
    </div>
  );
}

export default LanjutanRegistrasiLayout;
