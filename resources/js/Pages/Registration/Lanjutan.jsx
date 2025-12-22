import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Head, Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import LanjutanRegistrasiLayout from "@/Layouts/LanjutanRegistrasiLayout";
import axios from "axios";

export default function Lanjutan() {
  // Set tab aktif ke "registrasi" agar item sidebar "Registrasi" disorot pada halaman ini
  const [activeTab, setActiveTab] = useState("registrasi");
  const [queueCurrent, setQueueCurrent] = useState(null);
  const [queueLastCalledNumber, setQueueLastCalledNumber] = useState(null);
  const [queueStatusCode, setQueueStatusCode] = useState(null);

  const formatQueueLabel = (nomor, prefix) => {
    if (!nomor) return "-";
    const padded = String(nomor).padStart(3, "0");
    return prefix ? `${prefix}-${padded}` : padded;
  };

  const getApiBaseCandidates = () => {
    const c = [];
    try {
      const envUrl = import.meta?.env?.VITE_BACKEND_URL;
      if (envUrl) c.push(envUrl);
    } catch (_) {}
    c.push(window.location.origin);
    c.push("http://127.0.0.1:8000");
    c.push("http://localhost:8000");
    return c;
  };

  const httpGet = async (path) => {
    const bases = getApiBaseCandidates();
    let lastErr = null;
    for (const base of bases) {
      try {
        const url = new URL(path, base).href;
        const res = await axios.get(url, { headers: { Accept: "application/json" } });
        return res;
      } catch (e) {
        lastErr = e;
        const status = e?.response?.status;
        if (status && status !== 404) throw e;
      }
    }
    throw lastErr || new Error("API not reachable");
  };

  const httpPost = async (path, data) => {
    const bases = getApiBaseCandidates();
    let lastErr = null;
    for (const base of bases) {
      try {
        const url = new URL(path, base).href;
        const res = await axios.post(url, data, { headers: { Accept: "application/json" } });
        return res;
      } catch (e) {
        lastErr = e;
        const status = e?.response?.status;
        if (status && status !== 404) throw e;
      }
    }
    throw lastErr || new Error("API not reachable");
  };

  const fetchQueueCurrent = async () => {
    try {
      const res = await httpGet("/api/queue/current");
      const d = res?.data || {};
      const n = d.nomor ?? d.number;
      if (n) {
        setQueueCurrent({ nomor: n, prefix: d.prefix || "" });
        const s = String(d.status || "").toLowerCase();
        setQueueStatusCode(s === "dipanggil" ? 1 : 0);
      } else {
        setQueueCurrent(null);
        setQueueStatusCode(null);
      }
    } catch (_) {
      setQueueCurrent(null);
      setQueueStatusCode(null);
    }
  };

  useEffect(() => { fetchQueueCurrent(); }, []);

  const handleCallLoketQueue = async (repeat = false) => {
    if (!queueCurrent?.nomor && !queueLastCalledNumber) return;
    try {
      const targetNomor = repeat ? (queueLastCalledNumber ?? queueCurrent?.nomor) : queueCurrent.nomor;
      await httpPost("/api/queue/call", { nomor: targetNomor, loket: 1 });
      if (!repeat) {
        setQueueLastCalledNumber(queueCurrent.nomor);
        setQueueStatusCode(1);
      }
    } catch (_) {
    }
  };

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
              <div className="flex items-center gap-3">
                <div className="px-2 py-1 rounded-md bg-white/10 border border-white/20">
                  <span className="text-[11px] font-semibold text-blue-100">Nomor Antrean</span>
                  <div className="flex items-center gap-2">
                    <div className="text-base font-extrabold tracking-tight">{formatQueueLabel(queueCurrent?.nomor, queueCurrent?.prefix)}</div>
                    <span className="text-[11px] font-semibold text-blue-100">{queueStatusCode ?? '-'}</span>
                  </div>
                </div>
                <motion.button disabled={!queueCurrent?.nomor} onClick={() => handleCallLoketQueue(false)} className="px-3 py-1.5 text-xs font-medium rounded-md bg-white/20 text-white hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>Panggil</motion.button>
                <motion.button disabled={!queueCurrent?.nomor && !queueLastCalledNumber} onClick={() => handleCallLoketQueue(true)} className="px-3 py-1.5 text-xs font-medium rounded-md bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>Ulang</motion.button>
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
