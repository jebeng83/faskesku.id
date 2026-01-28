import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/Components/Modal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import efekEnakMd from "../../../../docs/Efekenak.md?raw";
import { Head } from "@inertiajs/react";
import { getAppTimeZone } from "@/tools/datetime";
import { ChevronDown, ChevronUp, BookOpen, Stethoscope } from "lucide-react";

export default function CanvasAskep(props = {}) {
  const { patient = {}, no_rawat = "", children, leftMenu = null } = props;
  const [isIdentityOpen, setIsIdentityOpen] = useState(true);
  const [docOpen, setDocOpen] = useState(false);
  

  const formatDateIdShort = (date) => {
    if (!date) return "-";
    try {
      const tz = getAppTimeZone();
      const d = new Date(date);
      if (isNaN(d.getTime())) return String(date);
      return d.toLocaleDateString("id-ID", {
        timeZone: tz,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return String(date);
    }
  };

  

  const leftIdentity = [
    { label: "No Rawat", value: no_rawat || "-" },
    { label: "No Rekam Medis", value: patient?.no_rkm_medis || "-" },
    { label: "Nama Pasien", value: patient?.nm_pasien || "-" },
    { label: "Tanggal Lahir", value: formatDateIdShort(patient?.tgl_lahir) },
    { label: "JK / Gol Darah", value: [patient?.jk, patient?.gol_darah].filter(Boolean).join(" / ") || "-" },
    { label: "NIK", value: patient?.no_ktp || "-" },
    { label: "No Peserta", value: patient?.no_peserta || "-" },
    { label: "Alamat", value: patient?.alamat || "-" },
  ];

  const leftInfo = [
    { label: "Kamar Inap", value: patient?.nm_bangsal || "-" },
    { label: "Dokter PJ", value: patient?.nm_dokter || "-" },
    { label: "Penjamin", value: patient?.png_jawab || "-" },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 text-gray-900 dark:text-white">
      <Head title="Asuhan Keperawatan IGD" />
      <motion.header variants={itemVariants} initial="hidden" animate="visible" className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm">
        <div className="w-full px-3 sm:px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <Stethoscope className="w-5 h-5 text-white" />
            </motion.div>
            <motion.h1 className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Asuhan Keperawatan
            </motion.h1>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setDocOpen(true)} aria-label="Buka Dokumen" className="inline-flex items-center gap-2 rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-300/70 dark:border-gray-600/60 text-gray-700 dark:text-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 px-3 py-1.5 text-xs">
              <BookOpen className="w-4 h-4" />
              Dokumen
            </button>
          </div>
        </div>
      </motion.header>
      <main className="w-full px-1 sm:px-2 md:px-3 pt-16 pb-4 overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[25%_75%] lg:grid-cols-[20%_80%] gap-2 md:gap-4 lg:gap-6">
          <div className="hidden md:block">
            <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-6">
              <button
                type="button"
                onClick={() => setIsIdentityOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-2 md:px-4 md:py-3"
              >
                <span className="text-sm font-semibold text-gray-800">Identitas Pasien</span>
                {isIdentityOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              {isIdentityOpen && (
                <div className="px-4 pb-4">
                  <div className="space-y-2">
                    {leftIdentity.map((it) => (
                      <div key={it.label} className="flex items-start gap-2">
                        <div className="w-28 text-xs text-gray-500">{it.label}</div>
                        <div className="text-xs text-gray-400">:</div>
                        <div className="text-xs font-medium text-gray-900 break-all">{it.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="space-y-2">
                      {leftInfo.map((it) => (
                        <div key={it.label} className="flex items-start gap-2">
                          <div className="w-28 text-xs text-gray-500">{it.label}</div>
                          <div className="text-xs text-gray-400">:</div>
                          <div className="text-xs font-medium text-gray-900 break-all">{it.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {leftMenu ? (
              <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-6">
                <div className="px-2 py-1.5 md:px-3 md:py-2 text-xs">
                  {leftMenu}
                </div>
              </div>
            ) : null}
          </div>
          <div className="w-full min-w-0">
            <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-6 md:hidden">
              <button
                type="button"
                onClick={() => setIsIdentityOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-2 md:px-4 md:py-3"
              >
                <span className="text-sm font-semibold text-gray-800">Identitas Pasien</span>
                {isIdentityOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              {isIdentityOpen && (
                <div className="px-4 pb-4">
                  <div className="space-y-2">
                    {leftIdentity.map((it) => (
                      <div key={it.label} className="flex items-start gap-2">
                        <div className="w-36 text-xs text-gray-500">{it.label}</div>
                        <div className="text-xs text-gray-400">:</div>
                        <div className="text-xs font-medium text-gray-900 break-all">{it.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="space-y-2">
                      {leftInfo.map((it) => (
                        <div key={it.label} className="flex items-start gap-2">
                          <div className="w-36 text-xs text-gray-500">{it.label}</div>
                          <div className="text-xs text-gray-400">:</div>
                          <div className="text-xs font-medium text-gray-900 break-all">{it.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {children ? (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-4 relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
                <div className="p-3 md:p-4">
                  {children}
                </div>
              </motion.div>
            ) : null}
            {leftMenu ? (
              <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-6 md:hidden">
                <div className="px-2 py-1.5 md:px-3 md:py-2 text-xs">
                  {leftMenu}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <Modal show={docOpen} onClose={() => setDocOpen(false)} title="Efek Enak" size="xl" showTopGradient>
        <div className="text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{efekEnakMd}</ReactMarkdown>
        </div>
      </Modal>
    </div>
  );
}
