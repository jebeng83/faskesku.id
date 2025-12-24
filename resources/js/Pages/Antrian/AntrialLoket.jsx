import React, { useEffect, useMemo, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/Card";
import Button from "@/Components/ui/Button";
import { Ticket, Printer, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
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

export default function AntrialLoket() {
  const { props } = usePage();
  const kopTitle = useMemo(() => {
    const s = props?.setting || props?.settings || {};
    return (
      s.nama_instansi || s.nama || props?.nama_instansi || "Kop Surat"
    );
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
  const [processing, setProcessing] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [lastNumber, setLastNumber] = useState(null);
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState([]);
  const [clock, setClock] = useState({ date: todayDateString(), time: new Date().toLocaleTimeString("id-ID", { hour12: false }) });
  const todayPoli = useMemo(() => Array.isArray(props?.today_poli) ? props.today_poli : [], [props]);

  const addToast = (type = "info", title = "", message = "", duration = 3500) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/queue/current`, { headers: { Accept: "application/json" } });
        if (!mounted) return;
        if (res.ok) {
          const json = await res.json();
          setLastNumber(json?.number || json?.nomor || null);
        }
      } catch {}
    })();
    const timer = setInterval(() => {
      setClock({ date: todayDateString(), time: new Date().toLocaleTimeString("id-ID", { hour12: false }) });
    }, 1000);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const formatNomor = (n, prefix) => {
    const num = typeof n === "number" ? n : parseInt(String(n || "0"), 10);
    const pad = String(Math.max(1, num)).padStart(3, "0");
    return prefix ? `${prefix}-${pad}` : pad;
  };

  const formatTanggalIndonesia = (d) => {
    const s = String(d || todayDateString());
    const parts = s.split(/[-/]/);
    if (parts.length < 3) return s;
    const yyyy = parts[0];
    const mm = parseInt(parts[1], 10);
    const dd = parts[2];
    const bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][Math.max(0, Math.min(11, (isNaN(mm) ? 1 : mm) - 1))];
    return `${parseInt(dd, 10)} ${bulan} ${yyyy}`;
  };

  const formatJam = (dt) => {
    const s = String(dt || nowDateTimeString());
    const m = s.match(/\b(\d{2}):(\d{2}):(\d{2})\b/);
    if (!m) return s;
    return `${m[1]}:${m[2]}:${m[3]}`;
  };

  const nextNumber = useMemo(() => {
    const num = typeof lastNumber === "number" ? lastNumber : parseInt(String(lastNumber || "0"), 10);
    const n = (isNaN(num) ? 0 : num) + 1;
    return n > 999 ? 1 : n;
  }, [lastNumber]);

  const handleTakeNumber = async () => {
    if (processing || cooldown) return;
    setProcessing(true);
    setError("");
    const key = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    try {
      const res = await axios.post(`/api/queue/tickets?channel=kiosk`, {}, {
        headers: {
          Accept: "application/json",
          "Idempotency-Key": key,
        },
      });
      const data = res?.data || {};
      const nomor = data?.number ?? data?.nomor ?? null;
      const prefix = data?.prefix ?? null;
      const kode_tiket = data?.kode_tiket ?? null;
      const tanggal = data?.tanggal ?? todayDateString();
      const created_at = data?.created_at ?? nowDateTimeString();
      const t = { nomor, prefix, kode_tiket, tanggal, created_at };
      setTicket(t);
      setLastNumber(nomor);
      addToast("success", "Nomor diambil", `Nomor ${formatNomor(nomor, prefix)} berhasil dibuat.`);
      setCooldown(true);
      setTimeout(() => setCooldown(false), 2000);
      requestAnimationFrame(() => handlePrint());
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Gagal mengambil nomor. Silakan menuju loket.";
      setError(msg);
      addToast("danger", "Gagal mengambil nomor", msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleTakeNumberForPoli = async (kd_poli) => {
    if (processing || cooldown) return;
    setProcessing(true);
    setError("");
    const key = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    try {
      const res = await axios.post(`/api/queue/tickets?channel=kiosk${kd_poli ? `&poli=${encodeURIComponent(kd_poli)}` : ""}`, {}, {
        headers: {
          Accept: "application/json",
          "Idempotency-Key": key,
        },
      });
      const data = res?.data || {};
      const nomor = data?.number ?? data?.nomor ?? null;
      const prefix = data?.prefix ?? null;
      const kode_tiket = data?.kode_tiket ?? null;
      const tanggal = data?.tanggal ?? todayDateString();
      const created_at = data?.created_at ?? nowDateTimeString();
      const poliObj = Array.isArray(todayPoli) ? todayPoli.find(p => String(p.kd_poli || "") === String(kd_poli || "")) : null;
      const nm_poli = String(poliObj?.nm_poli || poliObj?.kd_poli || "");
      const t = { nomor, prefix, kode_tiket, tanggal, created_at, nm_poli };
      setTicket(t);
      setLastNumber(nomor);
      addToast("success", "Nomor diambil", `Nomor ${formatNomor(nomor, prefix)} berhasil dibuat.`);
      setCooldown(true);
      setTimeout(() => setCooldown(false), 2000);
      requestAnimationFrame(() => handlePrint());
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Gagal mengambil nomor. Silakan menuju loket.";
      setError(msg);
      addToast("danger", "Gagal mengambil nomor", msg);
    } finally {
      setProcessing(false);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {}
  };

  const headerTitle = useMemo(() => "Antrian Loket — Kiosk Self-Service", []);

  return (
    <div className="min-h-screen min-h-dvh w-full bg-black">
      <Head title={"Antrian Loket"} />
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full min-h-screen min-h-dvh px-6 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10 flex flex-col">
        <motion.div variants={itemVariants} className="relative px-6 py-5 md:px-8 md:py-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-6 print:hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-gray-800/70 border border-gray-200/60 dark:border-gray-700/60">
                <Ticket className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">Antrian Loket</span>
              </div>
            </div>
            <div className="text-center">
              <motion.h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                {kopTitle}
              </motion.h1>
              <div className="mt-0.5 text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-300">{kopSubtitle || "Kiosk Self-Service"}</div>
            </div>
            <div className="text-right text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-300">
              <div>{clock.date}</div>
              <div>{clock.time}</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="print:hidden flex-1 flex items-center justify-center">
          <div className="w-full max-w-screen-xl mx-auto">
          <Card>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  Ambil Nomor Antrian
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center justify-center">
                  <div className="flex flex-row items-center justify-center gap-8 md:gap-10 lg:gap-12">
                    <div className="w-64 h-48 sm:w-72 sm:h-56 md:w-80 md:h-64 lg:w-96 lg:h-72 xl:w-[28rem] xl:h-[18rem] rounded-[2rem] border-2 border-gray-300/70 dark:border-gray-600/60 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-inner flex flex-col items-center justify-center gap-3">
                      <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-extrabold tracking-widest text-gray-900 dark:text-white">
                        {ticket?.nomor ? formatNomor(ticket.nomor, ticket.prefix) : (lastNumber ? formatNomor(lastNumber) : "NO ANTRIAN")}
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-700 dark:text-gray-200">Nomor Selanjutnya</div>
                    <div className="w-64 h-48 sm:w-72 sm:h-56 md:w-80 md:h-64 lg:w-96 lg:h-72 xl:w-[28rem] xl:h-[18rem] rounded-[2rem] border-2 border-gray-300/70 dark:border-gray-600/60 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-inner flex flex-col items-center justify-center gap-3">
                      <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-extrabold tracking-widest text-gray-900 dark:text-white">
                        {formatNomor(nextNumber)}
                      </div>
                    </div>
                  </div>
                </div>

                

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
                  {todayPoli.map((p, idx) => {
                    const palette = [
                      "from-violet-500 to-fuchsia-600",
                      "from-emerald-500 to-teal-600",
                      "from-rose-500 to-orange-500",
                      "from-blue-500 to-indigo-600",
                      "from-cyan-500 to-sky-600",
                      "from-amber-500 to-orange-600",
                    ];
                    const grad = palette[idx % palette.length];
                    return (
                      <motion.button
                        key={p.kd_poli || idx}
                        onClick={() => handleTakeNumberForPoli(p.kd_poli)}
                        whileHover={{ scale: processing || cooldown ? 1 : 1.02 }}
                        whileTap={{ scale: processing || cooldown ? 1 : 0.98 }}
                        disabled={processing || cooldown}
                        className={`relative rounded-2xl px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12 text-center shadow-lg border border-white/20 dark:border-gray-700/30`}
                      >
                        <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${grad} opacity-90`} />
                        <span className="relative block text-white font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide">
                          {String(p.nm_poli || p.kd_poli).toUpperCase()}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {error && (
                  <div className="flex items-center justify-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                {ticket && (
                  <AnimatePresence>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="flex flex-col items-center gap-3">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-300">Nomor Antrian</div>
                        <div className="mt-1 inline-flex items-center px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 ring-2 ring-blue-200 dark:ring-blue-800 font-mono text-3xl font-extrabold tracking-widest">
                          {formatNomor(ticket.nomor, ticket.prefix)}
                        </div>
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{ticket.tanggal} • {ticket.created_at}</div>
                      </div>
                      
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </CardContent>
          </Card>
          </div>
        </motion.div>

        

        <motion.div variants={itemVariants} className="mt-6 print:hidden">
          <div className="border-t border-b border-gray-200/60 dark:border-gray-700/60 py-2">
            <div className="overflow-hidden">
              <motion.div initial={{ x: "100%" }} animate={{ x: ["100%", "-100%"] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }} className="whitespace-nowrap text-center font-semibold text-lg md:text-xl lg:text-2xl text-white dark:text-white">
                Marqueeee — Selamat datang di Loket Antrian • Ambil nomor dan tunggu panggilan • Terima kasih
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="hidden print:block">
          <div className="w-full px-6">
            <div className="mx-auto w-[58mm] border-2 border-black rounded-md p-3 bg-white">
              <div className="text-center">
                  <div className="mt-0.5 text-[11px] font-semibold">{kopTitle}</div>
                  <div className="mt-1 text-[10px]">==================</div>
                  <div className="mt-1 font-mono text-5xl font-extrabold tracking-widest">{formatNomor(ticket?.nomor, ticket?.prefix)}</div>
                  <div className="mt-1 text-[10px]">==================</div>
                  {ticket?.nm_poli ? (
                    <div className="text-[11px] font-semibold">{ticket.nm_poli}</div>
                  ) : null}
                  <div className="mt-1 text-xs">{formatTanggalIndonesia(ticket?.tanggal)}</div>
                  <div className="text-[11px] font-semibold">{formatJam(ticket?.created_at)}</div>
                  {ticket?.kode_tiket && <div className="mt-1 text-[10px]">Kode: {ticket?.kode_tiket}</div>}
                </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
