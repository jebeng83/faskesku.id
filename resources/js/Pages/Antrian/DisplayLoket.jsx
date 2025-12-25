import React, { useEffect, useMemo, useState, useRef } from "react";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/Card";
import { AlertCircle, ArrowRight } from "lucide-react";
import { todayDateString } from "@/tools/datetime";

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

  const [clock, setClock] = useState({ date: todayDateString(), time: new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()) });
  useEffect(() => {
    const timer = setInterval(() => {
      setClock({ date: todayDateString(), time: new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()) });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [calledNow, setCalledNow] = useState(null);
  const [error, setError] = useState("");
  const [lastByLoket, setLastByLoket] = useState({ 1: null, 2: null, 3: null, 4: null });
  const getApiBaseCandidates = () => {
    const c = [];
    c.push("http://localhost:8000");
    c.push(window.location.origin);
    try {
      const envUrl = import.meta?.env?.VITE_BACKEND_URL;
      if (envUrl) c.push(envUrl);
    } catch (_) {}
    return c;
  };
  const httpGet = async (path) => {
    const bases = getApiBaseCandidates();
    let lastErr = null;
    for (const base of bases) {
      try {
        const url = new URL(path, base).href;
        const res = await axios.get(url, { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
        return res;
      } catch (e) {
        lastErr = e;
        const status = e?.response?.status;
        if (status && status !== 404) throw e;
      }
    }
    throw lastErr || new Error("API not reachable");
  };

  const formatNomor = (n, prefix) => {
    const num = typeof n === "number" ? n : parseInt(String(n || "0"), 10);
    const pad = String(Math.max(1, num)).padStart(3, "0");
    return prefix ? `${prefix}-${pad}` : pad;
  };

  const fetchToday = async () => {
    try {
      setError("");
      const res = await httpGet("/api/queue/today");
      const rows = Array.isArray(res?.data?.data) ? res.data.data : [];
      const called = rows.filter((r) => String(r.status || "").toLowerCase() === "dipanggil");
      const latest = called.length ? called[called.length - 1] : null;
      setCalledNow(latest ? { nomor: latest.nomor, prefix: latest.prefix || "", loket: parseInt(latest.loket ?? 0, 10) || null } : null);
      const group = { 1: null, 2: null, 3: null, 4: null };
      for (const r of called) {
        const lk = parseInt(r.loket ?? 0, 10);
        if (lk >= 1 && lk <= 4) {
          group[lk] = { nomor: r.nomor, prefix: r.prefix || "" };
        }
      }
      setLastByLoket(group);
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
  const formatTanggalHari = (s) => {
    try {
      const clean = String(s || todayDateString()).split("T")[0];
      const d = new Date(`${clean}T00:00:00`);
      return d.toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
    } catch (_) {
      return String(s || todayDateString());
    }
  };
  const logoUrl = kopTitle ? `/setting/app/${encodeURIComponent(kopTitle)}/logo` : null;
  const wallpaperUrl = kopTitle ? `/setting/app/${encodeURIComponent(kopTitle)}/wallpaper` : null;
  const videoUrl = props?.settings?.video_url || props?.setting?.video_url || null;
  const videoPlaylist = useMemo(() => [
    "/video/vid-1.mp4",
    "/video/vid-2.mp4",
    "/video/vid-3.mp4",
    "/video/vid-4.mp4",
    "/video/vid-5.mp4",
    "/video/vid-6.mp4",
    "/video/vid-7.mp4",
    "/video/vid-8.mp4",
    "/video/vid-9.mp4",
  ], []);
  const [videoIndex, setVideoIndex] = useState(0);
  const handleVideoEnd = () => { if (videoPlaylist.length) setVideoIndex((i) => (i + 1) % videoPlaylist.length); };

  const audioLastKeyRef = useRef(null);
  const soundInitRef = useRef(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const lastPlayAtRef = useRef(0);
  const baseSuara = "/Suara";
  const [isFullscreen, setIsFullscreen] = useState(false);
  const enterFullscreen = () => {
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } catch (_) {}
  };
  const playOne = (url) => {
    return new Promise((resolve) => {
      try {
        const a = new Audio(url);
        a.onended = () => resolve();
        a.onerror = () => resolve();
        a.play().catch(() => resolve());
      } catch {
        resolve();
      }
    });
  };
  const playSequence = async (urls) => {
    for (const u of urls) {
      const url = Array.isArray(u) ? u[0] : u;
      if (!url) continue;
      // eslint-disable-next-line no-await-in-loop
      await playOne(url);
    }
  };
  const numberAudio = (n) => {
    const num = Math.max(0, parseInt(String(n || 0), 10) || 0);
    if (num === 0) return [`${baseSuara}/nomor/0.mp3`];
    if (num < 10) return [`${baseSuara}/nomor/${num}.mp3`];
    if (num === 10) return [`${baseSuara}/nomor/10.mp3`];
    if (num === 11) return [`${baseSuara}/nomor/sebelas.mp3`];
    if (num > 11 && num < 20) return [`${baseSuara}/nomor/${num - 10}.mp3`, `${baseSuara}/nomor/belas.mp3`];
    if (num < 100) {
      const tens = Math.floor(num / 10);
      const units = num % 10;
      const seq = [];
      if (tens === 1) {
        seq.push(`${baseSuara}/nomor/10.mp3`);
      } else {
        seq.push(`${baseSuara}/nomor/${tens}.mp3`, `${baseSuara}/nomor/puluh.mp3`);
      }
      if (units > 0) seq.push(`${baseSuara}/nomor/${units}.mp3`);
      return seq;
    }
    if (num === 100) return [`${baseSuara}/nomor/seratus.mp3`];
    if (num === 200) return [`${baseSuara}/nomor/duaratus.mp3`];
    if (num < 200) return [`${baseSuara}/nomor/seratus.mp3`, ...numberAudio(num - 100)];
    if (num < 300) return [`${baseSuara}/nomor/duaratus.mp3`, ...numberAudio(num - 200)];
    if (num < 1000) {
      const hundreds = Math.floor(num / 100);
      const rest = num % 100;
      const seq = [`${baseSuara}/nomor/${hundreds}.mp3`, `${baseSuara}/nomor/ratus.mp3`];
      if (rest > 0) seq.push(...numberAudio(rest));
      return seq;
    }
    if (num === 1000) return [`${baseSuara}/nomor/seribu.mp3`];
    if (num < 2000) return [`${baseSuara}/nomor/seribu.mp3`, ...numberAudio(num - 1000)];
    {
      const thousands = Math.floor(num / 1000);
      const rest = num % 1000;
      const seq = [...numberAudio(thousands), `${baseSuara}/nomor/ribu.mp3`];
      if (rest > 0) seq.push(...numberAudio(rest));
      return seq;
    }
  };
  useEffect(() => {
    const k = calledNow ? `${calledNow.prefix || ""}-${calledNow.nomor}-${calledNow.loket || ""}` : null;
    if (!k || audioLastKeyRef.current === k || !soundEnabled) return;
    if (Date.now() - lastPlayAtRef.current < 3000) return;
    audioLastKeyRef.current = k;
    lastPlayAtRef.current = Date.now();
    const seq = [
      `${baseSuara}/notifbell.mp3`,
      `${baseSuara}/awal/${encodeURIComponent("nomor antrian.mp3")}`,
      ...numberAudio(calledNow?.nomor ?? 0),
      `${baseSuara}/menuju/${encodeURIComponent("Silahkan ke.mp3")}`,
      ...numberAudio(calledNow?.loket ?? 0),
    ];
    playSequence(seq);
  }, [calledNow, soundEnabled]);

  useEffect(() => {
    try {
      const v = localStorage.getItem("displaySoundEnabled");
      if (v === "1") setSoundEnabled(true);
    } catch (_) {}
    if (soundInitRef.current) return;
    soundInitRef.current = true;
    try {
      const a = new Audio(`${baseSuara}/notifbell.mp3`);
      a.muted = true;
      a.play().catch(() => {});
    } catch (_) {}
    const handler = () => {
      setSoundEnabled(true);
      try { localStorage.setItem("displaySoundEnabled", "1"); } catch (_) {}
      try {
        const a = new Audio(`${baseSuara}/notifbell.mp3`);
        a.play().catch(() => {});
      } catch (_) {}
    };
    window.addEventListener("click", handler, { once: true });
    window.addEventListener("touchstart", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("keydown", handler);
    };
  }, []);

  useEffect(() => {
    const ch = new BroadcastChannel("queue-call");
    ch.onmessage = (ev) => {
      const d = ev?.data || {};
      if (!soundEnabled) return;
      const k2 = `${d?.prefix || ""}-${d?.nomor}-${d?.loket || ""}`;
      if (Date.now() - lastPlayAtRef.current < 3000) return;
      audioLastKeyRef.current = k2;
      lastPlayAtRef.current = Date.now();
      const seq = [
        `${baseSuara}/notifbell.mp3`,
        `${baseSuara}/awal/${encodeURIComponent("nomor antrian.mp3")}`,
        ...numberAudio(d?.nomor ?? 0),
        `${baseSuara}/menuju/${encodeURIComponent("Silahkan ke.mp3")}`,
        ...numberAudio(d?.loket ?? 0),
      ];
      playSequence(seq);
    };
    return () => { ch.close(); };
  }, [soundEnabled]);

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!(document.fullscreenElement || document.webkitFullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    document.addEventListener("webkitfullscreenchange", onFs);
    setTimeout(() => { enterFullscreen(); }, 100);
    const gesture = () => enterFullscreen();
    window.addEventListener("keydown", gesture, { once: true });
    window.addEventListener("click", gesture, { once: true });
    window.addEventListener("touchstart", gesture, { once: true });
    return () => {
      document.removeEventListener("fullscreenchange", onFs);
      document.removeEventListener("webkitfullscreenchange", onFs);
      window.removeEventListener("keydown", gesture);
      window.removeEventListener("click", gesture);
      window.removeEventListener("touchstart", gesture);
    };
  }, []);

  return (
    <div className="min-h-screen min-h-dvh w-full bg-black">
      <Head title={"Display Loket"} />
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full min-h-screen min-h-dvh px-6 py-6 flex flex-col">
        <motion.div variants={itemVariants} className="rounded-lg overflow-hidden mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="relative bg-black text-[#D4AF37] flex items-center gap-4 px-6 py-4">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-12 w-12 object-contain" />
              ) : (
                <div className="h-12 w-12 bg-gray-200" />
              )}
              <div className="flex flex-col">
                <div className="text-xl sm:text-2xl font-extrabold">{kopTitle}</div>
                <div className="text-xs sm:text-sm text-[#D4AF37]">{kopSubtitle || headerTitle}</div>
              </div>
              <div className="absolute right-[-22px] top-0 bottom-0 w-16 sm:w-20 md:w-24 z-10 bg-black" style={{ WebkitMaskImage: 'radial-gradient(120% 120% at 100% 50%, black 58%, transparent 76%)', maskImage: 'radial-gradient(120% 120% at 100% 50%, black 58%, transparent 76%)' }} />
            </div>
            <div className="lg:col-span-2 bg-black text-right px-6 py-4">
              <div className="text-xs sm:text-sm text-amber-200">{formatTanggalHari(clock.date)}</div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-300">{clock.time}</div>
            </div>
          </div>
        </motion.div>
        {!soundEnabled && (
          <div className="fixed top-2 left-2 z-50">
            <button className="px-3 py-1 rounded bg-amber-600 text-white text-xs font-bold" onClick={() => { setSoundEnabled(true); try { localStorage.setItem("displaySoundEnabled", "1"); } catch (_) {} }}>
              Aktifkan Suara
            </button>
          </div>
        )}
        {!isFullscreen && (
          <div className="fixed top-2 right-2 z-50">
            <button className="px-3 py-1 rounded bg-green-600 text-white text-xs font-bold" onClick={() => enterFullscreen()}>
              Layar Penuh
            </button>
          </div>
        )}
        <div className="w-full border-t border-gray-700/60 mb-4" />

        <motion.div variants={itemVariants} className="flex-1">
          <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            <Card className="lg:col-span-2 overflow-hidden self-center">
              <CardHeader className="!px-4 !py-2 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 text-white">
                <CardTitle className="!text-base text-white">MEMANGGIL ANTRIAN</CardTitle>
              </CardHeader>
              <CardContent className="!p-0 flex items-center justify-center">
                <div className="w-[92%] mx-auto h-[20vh] sm:h-[22vh] md:h-[24vh] lg:h-[26vh] bg-white flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full items-center px-6">
                    <div className="text-center">
                      <AnimatePresence mode="wait">
                        <motion.div key={calledNow ? `${calledNow.prefix || ""}-${calledNow.nomor}` : "none"} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="text-7xl sm:text-8xl md:text-9xl lg:text-[9rem] leading-none font-extrabold tracking-widest text-gray-900" style={{ fontFamily: 'Bookman Old Style, Bookman, URW Bookman L, serif' }}>
                          {calledNow ? formatNomor(calledNow.nomor, calledNow.prefix) : "MENUNGGU"}
                        </motion.div>
                      </AnimatePresence>
                      <div className="mt-1 text-sm sm:text-base md:text-lg font-bold text-gray-700">Nomer Antrian</div>
                    </div>
                    <div className="flex items-center justify-center md:justify-end pr-3 md:pr-6">
                      <ArrowRight className="text-rose-600 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" strokeWidth={3} />
                    </div>
                    <div className="text-center">
                      <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[9rem] leading-none font-extrabold text-gray-900" style={{ fontFamily: 'Bookman Old Style, Bookman, URW Bookman L, serif' }}>{calledNow?.loket ? calledNow.loket : "-"}</div>
                      <div className="mt-1 text-sm sm:text-base md:text-lg font-bold text-gray-700">Loket</div>
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="px-6 py-3 flex items-center justify-center gap-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 overflow-hidden border-2 border-green-600 h-[42vh] sm:h-[46vh] md:h-[52vh] lg:h-[58vh]">
              <CardContent className="!p-0 h-full">
                <div className="w-full h-full overflow-hidden">
                  {videoUrl ? (
                    <video src={videoUrl} autoPlay loop muted controls className="w-full h-full object-cover" />
                  ) : (
                    videoPlaylist.length ? (
                      <video src={videoPlaylist[videoIndex]} autoPlay muted playsInline preload="auto" onEnded={handleVideoEnd} poster="/video/cover.jpg" className="w-full h-full object-cover" />
                    ) : (
                      <img src={wallpaperUrl || "/video/cover.jpg"} alt="Informasi" className="w-full h-full object-cover" />
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-2">
          <div className="w-full overflow-x-auto">
            <div className="grid grid-flow-col auto-cols-[minmax(200px,1fr)] gap-3">
              {[1,2,3,4].map((lk) => (
                <div key={`lk-row-${lk}`} className="rounded-xl bg-gradient-to-b from-green-600 to-green-700 text-white shadow flex flex-col items-center justify-center h-32 sm:h-36 md:h-40">
                  <div className="text-5xl sm:text-6xl font-extrabold tracking-widest text-white text-center">
                    {lastByLoket[lk] ? formatNomor(lastByLoket[lk].nomor, lastByLoket[lk].prefix) : "-"}
                  </div>
                  <div className="mt-2 h-1 w-full max-w-[92%] bg-white/80 rounded"></div>
                  <div className="mt-2 text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-center" style={{ fontFamily: 'Expletus Sans, sans-serif', color: '#FFD700' }}>LOKET {lk}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-3">
          <div className="border-t border-b border-gray-200/60 dark:border-gray-700/60 py-2">
            <div className="overflow-hidden">
              <motion.div initial={{ x: "100%" }} animate={{ x: ["100%", "-100%"] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }} className="whitespace-nowrap text-center font-semibold text-lg md:text-xl lg:text-2xl text-white">
                {`Selamat datang ${kopTitle}, Perhatikan Nomor antrean anda`}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
