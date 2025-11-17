import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Head, Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import LanjutanRegistrasiLayout from "@/Layouts/LanjutanRegistrasiLayout";

export default function Lanjutan() {
  // Set tab aktif ke "registrasi" agar item sidebar "Registrasi" disorot pada halaman ini
  const [activeTab, setActiveTab] = useState("registrasi");

  const menuTabs = [
    {
      key: "registrasi",
      title: "Registrasi",
      subtitle: "Halaman registrasi utama",
      color: "gray",
      href: route("registration.index"),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      key: "pasien",
      title: "Pasien",
      subtitle: "Data dan pencarian pasien",
      color: "blue",
      href: route("patients.index"),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      key: "dokter",
      title: "Dokter",
      subtitle: "Daftar dan pencarian dokter",
      color: "green",
      href: route("doctors.index"),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 002-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      key: "poliklinik",
      title: "Poliklinik",
      subtitle: "Daftar poliklinik dan jadwal",
      color: "purple",
      href: route("poliklinik.index"),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
    },
  ];

  const getTabColorClasses = (color, isActive) => {
    const colors = {
      gray: {
        active: "bg-gray-100 text-gray-700 border-gray-500",
        inactive: "text-gray-600 hover:text-gray-700 hover:bg-gray-50",
      },
      blue: {
        active: "bg-blue-100 text-blue-700 border-blue-500",
        inactive: "text-gray-600 hover:text-blue-600 hover:bg-blue-50",
      },
      green: {
        active: "bg-green-100 text-green-700 border-green-500",
        inactive: "text-gray-600 hover:text-green-600 hover:bg-green-50",
      },
      purple: {
        active: "bg-purple-100 text-purple-700 border-purple-500",
        inactive: "text-gray-600 hover:text-purple-600 hover:bg-purple-50",
      },
    };
    const palette = colors[color] || colors.gray;
    return palette[isActive ? "active" : "inactive"];
  };

  // Variants untuk animasi halus sesuai panduan UI/UX
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "pasien":
        return (
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Pasien</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Modul pencarian dan pendaftaran pasien. Silakan tambahkan komponen form pencarian atau daftar pasien di sini.
            </p>
          </motion.div>
        );
      case "dokter":
        return (
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daftar Dokter</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Tampilkan daftar dokter dan fitur pencarian/penyaringan sesuai kebutuhan.
            </p>
          </motion.div>
        );
      case "poliklinik":
        return (
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daftar Poliklinik</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Tampilkan daftar poliklinik, jadwal, dan kapasitas kunjungan.
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <LanjutanRegistrasiLayout
      title="Registrasi Pasien"
      menuConfig={{
        activeTab,
      }}
    >
      <Head title="Lanjutan Registrasi Pasien" />

      <motion.div
        className="px-4 sm:px-6 lg:px-8 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Gradient */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Registrasi Pasien</h1>
                  <p className="text-sm text-blue-100">Kelola pendaftaran pasien, dokter, dan poliklinik</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div className="mb-6" variants={itemVariants}>
          <div className="flex flex-wrap gap-3">
            {menuTabs.map((tab) => (
              <Link
                key={tab.key}
                href={tab.href}
                preserveScroll
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors ${getTabColorClasses(
                  tab.color,
                  false
                )}`}
              >
                {tab.icon}
                <span className="text-sm font-medium">{tab.title}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Active Tab Content */}
        <AnimatePresence mode="wait">
          {renderActiveTabContent()}
        </AnimatePresence>
      </motion.div>
    </LanjutanRegistrasiLayout>
  );
}