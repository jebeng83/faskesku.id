import React, { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import {
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { route } from "ziggy-js";

export default function LanjutanRegistrasiSidebar({
  collapsed = false,
  title = "Registrasi Pasien",
  menuConfig = {},
  onToggle,
}) {
  const { auth } = usePage().props;
  const [expandedMenus, setExpandedMenus] = useState(new Set());
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1];
  const baseDuration = shouldReduceMotion ? 0 : 0.18;
  const expandDuration = shouldReduceMotion ? 0 : 0.22;

  // Map icon names to Heroicon components
  const iconMap = {
    home: HomeIcon,
    "user-group": UserGroupIcon,
    "clipboard-document-list": ClipboardDocumentListIcon,
    "document-text": DocumentTextIcon,
    building: BuildingOfficeIcon,
  };

  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    if (IconComponent) {
      return <IconComponent className="h-5 w-5" />;
    }
    return <span className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700" />;
  };

  const getColorClasses = (colorScheme, isActive = false, isCollapsed = false) => {
    const colorMap = {
      blue: {
        active: isCollapsed
          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
          : "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500",
        inactive: "text-white/80 hover:text-blue-300 hover:bg-blue-500/20",
      },
      slate: {
        active: isCollapsed
          ? "bg-slate-500 text-white shadow-lg shadow-slate-500/30"
          : "bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 border-l-4 border-slate-500",
        inactive: "text-white/80 hover:text-slate-300 hover:bg-slate-500/20",
      },
      primary: {
        active: isCollapsed
          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
          : "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500",
        inactive: "text-white/80 hover:text-blue-300 hover:bg-blue-500/20",
      },
    };

    return (
      colorMap[colorScheme]?.[isActive ? "active" : "inactive"] ||
      colorMap.slate[isActive ? "active" : "inactive"]
    );
  };

  const registrasiMenus = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: "home",
      url: (() => {
        try {
          return route("dashboard");
        } catch (error) {
          console.warn("Dashboard route not found");
          return "/";
        }
      })(),
      active: false,
      colorScheme: "slate",
    },
    {
      id: "registrasi-group",
      name: "Registrasi",
      icon: "clipboard-document-list",
      active: false,
      colorScheme: "primary",
      children: [
        {
          id: "registrasi",
          name: "Registrasi",
          icon: "clipboard-document-list",
          description: "Halaman registrasi lanjutan",
          // Klik membuka /registration/lanjutan
          route: "registration.lanjutan",
          active: menuConfig.activeTab === "registrasi",
          colorScheme: "blue",
        },
        {
          id: "pasien",
          name: "Pasien",
          icon: "user-group",
          description: "Data dan pencarian pasien",
          // When menuConfig.onTabChange is NOT provided, clicking this item should navigate
          // to the patients index page via Ziggy route name
          route: "patients.index",
          active: menuConfig.activeTab === "pasien",
          colorScheme: "blue",
        },
        {
          id: "dokter",
          name: "Dokter",
          icon: "document-text",
          description: "Daftar dan pencarian dokter",
          // Navigate to doctors index page when not using local tab change
          route: "doctors.index",
          active: menuConfig.activeTab === "dokter",
          colorScheme: "blue",
        },
        {
          id: "poliklinik",
          name: "Poliklinik",
          icon: "building",
          description: "Daftar poliklinik dan jadwal",
          // Navigate to poliklinik index page when not using local tab change
          route: "poliklinik.index",
          active: menuConfig.activeTab === "poliklinik",
          colorScheme: "blue",
        },
        {
          id: "keg_kelompok_pcare",
          name: "Keg Kelompok PCare",
          icon: "clipboard-document-list",
          description: "Entri kegiatan kelompok PCare",
          // Navigate to PCare Kegiatan Kelompok Entri page
          route: "pcare.kelompok.entri",
          active: menuConfig.activeTab === "keg_kelompok_pcare",
          colorScheme: "blue",
        },
      ],
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0 },
  };
  const collapsedItemVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1 },
  };
  const listVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: shouldReduceMotion ? 0 : 0.02 } },
  };

  useEffect(() => {
    const activeGroups = new Set();
    registrasiMenus.forEach((menu) => {
      if (menu.children) {
        const hasActiveChild = menu.children.some((child) => child.active);
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
    if (menu.active) return true;
    if (menu.children) {
      return menu.children.some((child) => child.active);
    }
    return false;
  };

  const getMenuUrl = (menu) => {
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
    } else if (
      menuConfig.onTabChange && ["pasien", "dokter", "poliklinik"].includes(menu.id)
    ) {
      menuConfig.onTabChange(menu.id);
    } else {
      const url = getMenuUrl(menu);
      if (url !== "#") {
        try {
          router.visit(url, { preserveScroll: true, preserveState: true });
        } catch (_) {
          // Fallback to normal navigation if router isn't available
          window.location.href = url;
        }
      }
    }
  };

  const renderCollapsed = (menus) => {
    return (
      <motion.nav className="space-y-2 px-2" variants={listVariants} initial="hidden" animate="show" transition={{ duration: baseDuration, ease }}>
        {menus.map((menu) => {
          const isActive = isMenuActive(menu);
          return (
            <motion.div
              key={menu.id}
              className="relative group"
              variants={collapsedItemVariants}
              whileHover={{ y: -1 }}
              transition={{ duration: baseDuration, ease }}
            >
              <button
                onClick={() => handleMenuClick(menu)}
                className={`relative w-full flex items-center justify-center p-3 rounded-xl transition-all duration-300 group ${getColorClasses(
                  menu.colorScheme || "slate",
                  isActive,
                  true
                )}`}
                title={menu.name}
              >
                {isActive && <div className="absolute inset-0 rounded-xl ring-2 ring-blue-400/30" />}

                <div className="relative z-10">{renderIcon(menu.icon)}</div>

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
      if (level === 0) return null;
    }

    return (
      <React.Fragment key={menu.id}>
        <motion.li
          layout
          variants={itemVariants}
          initial="hidden"
          animate="show"
          transition={{ duration: baseDuration, ease }}
          className="relative"
        >
          <motion.button
            onClick={() => handleMenuClick(menu)}
            className={`relative w-full flex items-center p-3 text-sm font-medium rounded-xl transition-all duration-300 group ${getColorClasses(
              menu.colorScheme || "slate",
              isActive
            )} ${level === 0 ? "mb-1" : "mb-0.5"}`}
            style={{ paddingLeft: `${0.75 + level * 0.5}rem` }}
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -1 }}
            transition={{ duration: baseDuration, ease }}
          >
            {isActive && <div className="absolute inset-0 rounded-xl ring-2 ring-blue-400/20" />}

            <div className="relative z-10 flex items-center w-full">
              {menu.icon && <div className="mr-3 flex-shrink-0">{renderIcon(menu.icon)}</div>}
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{menu.name}</span>
                  {hasChildren && (
                    <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: baseDuration, ease }} className="ml-3">
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
              transition={{ duration: expandDuration, ease }}
            >
              <motion.ul
                layout
                className="space-y-1 pl-3 border-l-2 border-white/10 ml-3"
                variants={listVariants}
                initial="hidden"
                animate="show"
                transition={{ duration: baseDuration, ease }}
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
              <span className="text-white font-bold text-lg drop-shadow-sm">R</span>
            </motion.div>
          </div>
        </div>
        <nav className="px-2 py-4 flex-1 overflow-y-auto">{renderCollapsed(registrasiMenus)}</nav>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Logo - Normal */}
      <div className="p-4 border-b border-blue-400/30 dark:border-blue-600/30 flex-shrink-0">
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg border border-blue-400/20">
            <span className="text-white font-bold text-lg drop-shadow-sm">R</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text.white text-base leading-tight text-white">{title}</span>
            <span className="text-xs text-blue-200 -mt-0.5 leading-tight">Registrasi</span>
          </div>
        </motion.div>
      </div>

      <motion.nav className="px-3 py-4 space-y-2 flex-1 overflow-y-auto" variants={listVariants} initial="hidden" animate="show">
        <motion.ul className="space-y-2" variants={listVariants}>
          {registrasiMenus.map((menu) => renderMenuItem(menu))}
        </motion.ul>
      </motion.nav>

      <div className="p-3 border-t border-blue-400/20">
        <div className="text-center">
          <p className="text-xs text-blue-200/60">Faskesku v2.0</p>
        </div>
      </div>
    </div>
  );
}