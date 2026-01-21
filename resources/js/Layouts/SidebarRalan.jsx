import React, { useState, useMemo, useEffect } from 'react';
import '../../css/rawat-jalan.css';
import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Stethoscope, Hospital, Gauge, HeartPulse, ChevronDown, ChevronRight, Receipt, FileText } from 'lucide-react';
import useTheme from '@/hooks/useTheme';
import usePermission from '@/hooks/usePermission';

// Sidebar khusus modul Rawat Jalan dengan pola tampilan seperti LanjutanRalanLayout
export default function SidebarRalan({ title = 'Rawat Jalan', children }) {
  const { url, props } = usePage();
  const auth = props?.auth || {};
  const { permissions, can } = usePermission();

  // State untuk menu dan tampilan
  const [openRalan, setOpenRalan] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isDark, toggleDarkLight } = useTheme();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  

  // Restore sidebar toggle state dari localStorage
  useEffect(() => {
    try {
      const savedCollapsed = localStorage.getItem('ralanSidebarCollapsed');
      if (savedCollapsed !== null) setIsSidebarCollapsed(savedCollapsed === 'true');
      const savedOpen = localStorage.getItem('ralanSidebarOpen');
      if (savedOpen !== null) setIsSidebarOpen(savedOpen === 'true');
    } catch (_) {}
  }, []);

  // Persist sidebar states
  useEffect(() => {
    try { localStorage.setItem('ralanSidebarCollapsed', String(isSidebarCollapsed)); } catch (_) {}
  }, [isSidebarCollapsed]);
  useEffect(() => {
    try { localStorage.setItem('ralanSidebarOpen', String(isSidebarOpen)); } catch (_) {}
  }, [isSidebarOpen]);

  // Close profile dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, [isProfileDropdownOpen]);

  // Handle mobile sidebar overlay
  const handleSidebarOverlayClick = () => {
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const items = useMemo(() => ([
    {
      label: 'Dashboard',
      href: route('dashboard'),
      icon: <Gauge className="w-4 h-4" />,
      permission: 'dashboard.index',
    },
    {
      label: 'Rawat Jalan',
      icon: <Stethoscope className="w-4 h-4" />,
      children: [
        {
          label: 'Rawat Jalan',
          href: route('rawat-jalan.index'),
          icon: <Hospital className="w-4 h-4" />,
          permission: 'reg-periksa.index',
        },
        {
          label: 'Tarif Ralan',
          href: route('daftar-tarif.index', { category: 'rawat-jalan', search: '', status: '1' }),
          icon: <Receipt className="w-4 h-4" />,
          permission: 'daftar-tarif.index',
        },
        {
          label: 'Satu Sehat',
          href: route('satusehat.interoperabilitas.rajal.encounter'),
          icon: <HeartPulse className="w-4 h-4" />,
          permission: 'satusehat.index',
        },
        {
          label: 'Data Surat',
          href: route('rawat-jalan.surat-sehat.index'),
          icon: <FileText className="w-4 h-4" />,
        },
      ],
    },
  ]), []);

  const filteredItems = useMemo(() => {
    return items
      .map((item) => {
        if (!item.children) {
          if (item.permission && !can(item.permission)) return null;
          return item;
        }
        const children = (item.children || []).filter(
          (c) => !c.permission || can(c.permission)
        );
        if (children.length === 0) return null;
        return { ...item, children };
      })
      .filter(Boolean);
  }, [items, permissions]);

  const isActive = (href) => {
    try {
      const u = new URL(href, window.location.origin);
      return (url || window.location.pathname).startsWith(u.pathname);
    } catch {
      return (url || window.location.pathname).startsWith(href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black shadow-2xl border-r border-blue-500/20 dark:border-blue-800 z-40 transition-all duration-300 ${
          isSidebarOpen ? 'w-64 translate-x-0' : isSidebarCollapsed ? 'w-16 -translate-x-full lg:translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-14 flex items-center px-3 gap-2 text-white">
          <Stethoscope className="w-5 h-5" />
          {!isSidebarCollapsed && <span className="font-semibold truncate">{title}</span>}
        </div>
        {/* Sidebar Menu */}
        <nav className="px-2 py-2 space-y-1 text-white/90">
          {filteredItems.map((item, idx) => (
            <div key={idx}>
              {!item.children ? (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-white/20 text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="text-white/90">{item.icon}</span>
                  {!isSidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              ) : (
                <div className="mb-1">
                  <button
                    type="button"
                    onClick={() => setOpenRalan((v) => !v)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10"
                  >
                    <span className="text-white/90">{item.icon}</span>
                    {!isSidebarCollapsed && <span className="text-sm font-semibold flex-1 text-left">{item.label}</span>}
                    {!isSidebarCollapsed && (openRalan ? (
                      <ChevronDown className="w-4 h-4 text-white/70" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-white/70" />
                    ))}
                  </button>
                  {openRalan && (
                    <div className={`mt-1 ${isSidebarCollapsed ? '' : 'ml-2'} space-y-1`}>
                      {item.children.map((child, cIdx) => (
                        <Link
                          key={cIdx}
                          href={child.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                            isActive(child.href)
                              ? 'bg-white/20 text-white'
                              : 'hover:bg-white/10'
                          }`}
                        >
                          <span className="text-white/90">{child.icon}</span>
                          {!isSidebarCollapsed && <span className="text-sm">{child.label}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={handleSidebarOverlayClick} />
      )}

      {/* Top Navigation Bar - Fixed Header */}
      <header
        className={`fixed top-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50 flex-shrink-0 transition-all duration-300 ${
          isSidebarOpen ? 'left-64 right-0' : isSidebarCollapsed ? 'left-0 right-0 lg:left-16' : 'left-0 right-0 lg:left-64'
        }`}
      >
        <div className="h-full flex items-center justify-between px-4">
          {/* Left side - Toggle + Breadcrumb */}
          <div className="flex items-center gap-3">
            {/* Toggle Button */}
            <button
              onClick={() => {
                if (window.innerWidth < 1024) setIsSidebarOpen(!isSidebarOpen);
                else setIsSidebarCollapsed(!isSidebarCollapsed);
              }}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-600 dark:text-gray-400">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Link href={route('dashboard')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href={route('rawat-jalan.index')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Rawat Jalan</Link>
            </nav>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkLight}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-400">
                  <path d="M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-400">
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
                  <span className="text-white font-bold text-sm">{auth?.user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{auth?.user?.name || 'Unknown User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{auth?.user?.email || ''}</p>
                </div>
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="py-1">
                    <Link href={route('dashboard')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={() => {
                        try {
                          const form = document.createElement('form');
                          form.method = 'POST';
                          form.action = route('logout');
                          const csrfInput = document.createElement('input');
                          csrfInput.type = 'hidden';
                          csrfInput.name = '_token';
                          csrfInput.value = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
                          form.appendChild(csrfInput);
                          document.body.appendChild(form);
                          form.submit();
                        } catch (error) {
                          console.error('Logout error:', error);
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
      <main className={`pt-14 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="min-h-[calc(100vh-3.5rem)] px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
