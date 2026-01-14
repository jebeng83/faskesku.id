import React, { useState } from "react";
import { motion } from "framer-motion";
import SidebarBriding from "@/Layouts/SidebarBriding";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/Card";
import Input from "@/Components/ui/Input";
import Label from "@/Components/ui/Label";
import Button from "@/Components/ui/Button";
import Toaster from "@/Components/ui/Toaster";
import { Search, IdCard, User, CalendarDays, Phone, Mail, MapPin, BadgeInfo } from "lucide-react";

export default function Practitioner() {
  const [nik, setNik] = useState("");
  const [loading, setLoading] = useState(false);
  const [pr, setPr] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (type = "info", title = "", message = "", duration = 4000) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  async function handleSearch() {
    if (!nik || String(nik).trim() === "") {
      addToast("danger", "Validasi", "Masukkan NIK terlebih dahulu");
      return;
    }
    setLoading(true);
    setPr(null);
    try {
      const url = `/api/satusehat/practitioner?nik=${encodeURIComponent(String(nik).trim())}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const json = await res.json();
      if (!res.ok || json?.ok === false) {
        addToast("danger", "Gagal mencari Practitioner", json?.message || json?.error || `Status: ${res.status}`);
        return;
      }
      const first = Array.isArray(json.list) && json.list.length > 0 ? json.list[0] : null;
      if (!first) {
        addToast("warning", "Tidak ditemukan", "Tidak ada Practitioner dengan NIK tersebut");
      }
      setPr(first);
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Gagal menghubungi API SATUSEHAT");
    } finally {
      setLoading(false);
    }
  }

  const nikIdentifier = pr?.identifier?.find?.((id) => String(id?.system || "").includes("/nik")) || null;
  const telecoms = Array.isArray(pr?.telecom) ? pr.telecom : [];
  const emails = telecoms.filter((t) => t?.system === "email");
  const phones = telecoms.filter((t) => t?.system === "phone");
  const address = Array.isArray(pr?.address) && pr.address.length > 0 ? pr.address[0] : null;

  return (
    <SidebarBriding title="Pengaturan">
      <motion.div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
          <div className="relative flex items-center gap-3">
            <motion.div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <BadgeInfo className="w-6 h-6 text-white" />
            </motion.div>
            <motion.h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Pencarian Practitioner</motion.h1>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <CardHeader className="relative bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                <motion.div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md" whileHover={{ rotate: 90, scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <Search className="w-5 h-5 text-white" />
                </motion.div>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Cari Practitioner berdasar NIK</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
              <div className="md:col-span-2 space-y-2">
                <Label required className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">NIK</Label>
                <Input value={nik} onChange={(e) => setNik(e.target.value)} placeholder="Contoh: 7209061211900001" className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
              </div>
              <div className="md:col-span-1 flex items-end">
                <Button onClick={handleSearch} disabled={loading} variant="primary" className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold px-6 py-2.5">
                  {loading ? <span className="animate-spin">⏳</span> : <Search className="w-4 h-4" />}
                  Cari
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <CardHeader className="relative bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                <motion.div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md" whileHover={{ rotate: 90, scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <IdCard className="w-5 h-5 text-white" />
                </motion.div>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Detail Practitioner</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {!pr ? (
                <div className="flex flex-col items-center justify-center gap-2 py-6">
                  <User className="w-12 h-12 text-gray-400" />
                  <span>Belum ada data.</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">{pr.name || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IdCard className="w-4 h-4 text-blue-600" />
                      <span className="font-mono text-sm">{nikIdentifier?.value || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{pr.birthDate || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeInfo className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{pr.gender || "-"}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{emails[0]?.value || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{phones[0]?.value || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{address?.text || address?.line?.[0] || "-"}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <Toaster toasts={toasts} onRemove={removeToast} />
      </motion.div>
    </SidebarBriding>
  );
}
