import React, { useEffect, useMemo, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/Card";
import { Ticket, AlertCircle, CheckCircle2 } from "lucide-react";
import { nowDateTimeString, todayDateString } from "@/tools/datetime";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DisplayLoket() {
  const { props } = usePage();
  const kopTitle = useMemo(() => {
    const s = props?.setting || props?.settings || {};
    return s.nama_instansi || s.nama || props?.nama_instansi || "Display Loket";
  }, [props]);
  const kopSubtitle = useMemo(() => {
    const s = props?.setting || props?.settings || {};
    const parts = [];
    const addr = [s.alamat_instansi, s.kabupaten, s.propinsi].filter(Boolean).join(", ");
    if (addr) parts.push(addr);
    const contact = [s.kontak, s.email].filter(Boolean).join(" • ");
    if (contact) parts.push(contact);
    if (s.kode_ppk) parts.push(`PPK ${s.kode_ppk}`);
    return parts.join(" • ");
  }, [props]);

  const [clock, setClock] = useState({ date: todayDateString(), time: new Date().toLocaleTimeString("id-ID", { hour12: false }) });
  useEffect(() => {
    const timer = setInterval(() => {
      setClock({ date: todayDateString(), time: new Date().toLocaleTimeString("id-ID", { hour12: false }) });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [calledNow, setCalledNow] = useState(null);
  const [nextList, setNextList] = useState([]);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const formatNomor = (n, prefix) => {
    const num = typeof n === "number" ? n : parseInt(String(n || "0"), 10);
    const pad = String(Math.max(1, num)).padStart(3, "0");
    return prefix ? `${prefix}-${pad}` : pad;
  };

  const fetchToday = async () => {
    try {
      setError("");
      const res = await axios.get("/api/queue/today", { headers: { Accept: "application/json" } });
      const rows = Array.isArray(res?.data?.data) ? res.data.data : [];
      const called = rows.filter((r) => String(r.status || "").toLowerCase() === "dipanggil");
      const nexts = rows.filter((r) => String(r.status || "").toLowerCase() === "baru");
      const latest = called.length ? called[called.length - 1] : null;
      setCalledNow(latest ? { nomor: latest.nomor, prefix: latest.prefix || "" } : null);
      setNextList(nexts.slice(0, 3).map((r) => ({ nomor: r.nomor, prefix: r.prefix || "" })));
      const hist = called.slice(Math.max(0, called.length - 6)).map((r) => ({ nomor: r.nomor, prefix: r.prefix || "" })).reverse();
      setHistory(hist);
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Gagal memuat data antrian");
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => { if (mounted) await fetchToday(); })();
    const interval = setInterval(() => { fetchToday(); }, 2000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const headerTitle = useMemo(() => "Display TV — Antrian Loket", []);

  return (
    <div className="min-h-screen min-h-dvh w-full bg-black">
      <Head title={"Display Loket"} />
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full min-h-screen min-h-dvh px-6 py-6 flex flex-col">
        <motion.div variants={itemVariants} className="relative px-6 py-5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-6">
          <div className="grid grid-cols-3 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-gray-800/70 border border-gray-200/60 dark:border-gray-700/60">
                <Ticket className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">Display Loket</span>
              </div>
            </div>
            <div className="text-center">
              <motion.h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                {kopTitle}
              </motion.h1>
              <div className="mt-0.5 text-[11px] sm:text-xs text-gray-600 dark:text-gray-300">{kopSubtitle || headerTitle}</div>
            </div>
            <div className="text-right text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              <div>{clock.date}</div>
              <div>{clock.time}</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex-1">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    Sedang Dipanggil
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="w-full h-64 sm:h-80 rounded-[2rem] border-2 border-gray-300/70 dark:border-gray-600/60 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-inner flex flex-col items-center justify-center gap-3">
                    <AnimatePresence mode="wait">
                      <motion.div key={calledNow ? `${calledNow.prefix || ""}-${calledNow.nomor}` : "none"} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="text-7xl sm:text-8xl font-extrabold tracking-widest text-gray-900 dark:text-white">
                        {calledNow ? formatNomor(calledNow.nomor, calledNow.prefix) : "MENUNGGU"}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                {error && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Berikutnya
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nextList.length === 0 ? (
                    <div className="w-full h-32 rounded-2xl border-2 border-gray-300/70 dark:border-gray-600/60 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-inner flex items-center justify-center text-gray-700 dark:text-gray-300 font-semibold">Tidak ada</div>
                  ) : (
                    nextList.map((n, i) => (
                      <div key={`${n.prefix || ""}-${n.nomor}-${i}`} className="w-full h-32 rounded-2xl border-2 border-gray-300/70 dark:border-gray-600/60 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-inner flex items-center justify-center">
                        <div className="text-5xl font-extrabold tracking-widest text-gray-900 dark:text-white">{formatNomor(n.nomor, n.prefix)}</div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-amber-600" />
                    Riwayat Terakhir
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {history.length === 0 ? (
                    <div className="col-span-3 w-full h-24 rounded-2xl border-2 border-gray-300/70 dark:border-gray-600/60 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-inner flex items-center justify-center text-gray-700 dark:text-gray-300 font-semibold">Tidak ada panggilan</div>
                  ) : (
                    history.map((h, i) => (
                      <div key={`${h.prefix || ""}-${h.nomor}-${i}`} className="w-full h-24 rounded-2xl border-2 border-gray-300/70 dark:border-gray-600/60 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-inner flex items-center justify-center">
                        <div className="text-3xl font-extrabold tracking-widest text-gray-900 dark:text-white">{formatNomor(h.nomor, h.prefix)}</div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
