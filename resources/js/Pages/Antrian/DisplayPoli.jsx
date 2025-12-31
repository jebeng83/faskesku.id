import React, { useEffect, useMemo, useState, useRef } from "react";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/Card";

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

export default function DisplayPoli() {
  const { props } = usePage();
  const instansiName = useMemo(() => {
    const s = props?.setting || props?.settings || {};
    return s.nama_instansi || s.nama || "Instansi Kesehatan";
  }, [props]);

  const [cards, setCards] = useState(() => Array.isArray(props?.cards) ? props.cards : []);
  const [highlight, setHighlight] = useState(() => props?.highlight || null);
  const [voiceMap, setVoiceMap] = useState({});
  const sortedCards = useMemo(() => {
    const arr = Array.isArray(cards) ? [...cards] : [];
    arr.sort((a, b) => String(a?.nm_poli || a?.kd_poli || "").localeCompare(String(b?.nm_poli || b?.kd_poli || "")));
    return arr;
  }, [cards]);

  function makeKey(h) {
    if (!h) return "";
    const a = String(h.kd_poli || "").trim();
    const b = String(h.no_reg || "").trim();
    const c = String(h.nm_pasien || "").trim();
    return `${a}-${b}-${c}`;
  }
  function isSameHighlight(a, b) {
    return makeKey(a) === makeKey(b);
  }
  const QUEUE_KEY = 'displayPoliQueue';
  const loadQueue = () => {
    try {
      const s = localStorage.getItem(QUEUE_KEY);
      const arr = JSON.parse(s);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };
  const saveQueue = (q) => {
    try {
      localStorage.setItem(QUEUE_KEY, JSON.stringify((Array.isArray(q) ? q : []).slice(0, 20)));
    } catch {}
  };
  const latestFromQueue = () => {
    const q = loadQueue();
    return q && q.length ? q[0] : null;
  };
  const pushQueue = (item) => {
    const now = Date.now();
    let q = loadQueue();
    q = (Array.isArray(q) ? q : []).filter((x) => now - (x.ts || 0) < 5 * 60 * 1000);
    const ts = typeof item.ts === 'number' && item.ts > 0 ? item.ts : now;
    const it = { ...item, ts };
    const last = q[0] || null;
    const keyNow = makeKey(it);
    const keyLast = makeKey(last);
    if (keyLast === keyNow && ts - (last?.ts || 0) < 2000 && !it.repeat) {
      return q;
    }
    q.unshift(it);
    q.sort((a, b) => (b.ts || 0) - (a.ts || 0));
    const seen = new Set();
    q = q.filter((x) => {
      const k = makeKey(x);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    saveQueue(q);
    return q;
  };

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/antrian-poli`, { headers: { Accept: "application/json" } });
        if (!mounted) return;
        const data = res?.data || {};
        setCards(Array.isArray(data.cards) ? data.cards : []);
        const qLatest = latestFromQueue();
        if (!qLatest) {
          const newH = data.highlight || null;
          setHighlight((prev) => (isSameHighlight(newH, prev) ? prev : newH));
        }
      } catch {}
    };
    fetchData();
    const it = setInterval(fetchData, 2000);
    return () => { mounted = false; clearInterval(it); };
  }, []);
  useEffect(() => {
    return () => { stopAudio(); };
  }, []);
  useEffect(() => {
    const getApiBaseCandidates = () => {
      const c = [];
      try {
        const envUrl = import.meta?.env?.VITE_BACKEND_URL;
        if (envUrl) c.push(envUrl);
      } catch {}
      c.push(window.location.origin);
      c.push("http://127.0.0.1:8080");
      c.push("http://localhost:8080");
      c.push("http://127.0.0.1:8000");
      c.push("http://localhost:8000");
      return c;
    };

    const loadVoice = async () => {
      const bases = getApiBaseCandidates();
      let lastErr = null;
      for (const base of bases) {
        try {
          const url = new URL('/api/poli-voice-mapping', base).href;
          const res = await axios.get(url, { headers: { Accept: 'application/json' }, withCredentials: false });
          const list = res?.data?.data || res?.data?.list || [];
          const obj = {};
          for (const row of list) {
            const key = String(row.kd_poli || '').trim();
            const path = String(row.file_path || '').trim();
            if (key && path) {
              obj[key] = path.startsWith('/Suara') ? path : `/Suara/${path}`;
            }
          }
          setVoiceMap(obj);
          return;
        } catch (e) {
          lastErr = e;
          const s = e?.response?.status;
          if (s && s !== 404) throw e;
        }
      }
      throw lastErr || new Error('Gagal memuat mapping suara poli');
    };
    loadVoice();
  }, []);
  useEffect(() => {
    try {} catch (_) {}
  }, []);

  const audioLastKeyRef = useRef(null);
  const lastRepeatKeyRef = useRef(null);
  const lastRepeatAtRef = useRef(0);
  const soundInitRef = useRef(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showSoundOverlay, setShowSoundOverlay] = useState(false);
  const [repeatTick, setRepeatTick] = useState(0);
  const lastPlayAtRef = useRef(0);
  const baseSuara = "/Suara";
  const currentAudioRef = useRef(null);
  const audioQueueRef = useRef([]);
  const isPlayingRef = useRef(false);
  const enableSound = () => {
    setSoundEnabled(true);
    setShowSoundOverlay(false);
    try { localStorage.setItem("displaySoundEnabled", "1"); } catch (_) {}
    try { const a = new Audio(`${baseSuara}/notifbell.mp3`); a.play().catch(() => {}); } catch (_) {}
  };
  const playOne = (url) => {
    return new Promise((resolve) => {
      try {
        const a = new Audio(url);
        a.preload = 'auto';
        currentAudioRef.current = a;
        a.onended = () => resolve();
        a.onerror = () => resolve();
        a.play().catch(() => resolve());
      } catch {
        resolve();
      }
    });
  };
  const stopAudio = () => {
    try {
      const a = currentAudioRef.current;
      if (a) { a.pause(); a.src = ''; }
    } catch {}
    currentAudioRef.current = null;
  };
  const playSequence = async (urls) => {
    for (const u of urls) {
      const url = Array.isArray(u) ? u[0] : u;
      if (!url) continue;
      // eslint-disable-next-line no-await-in-loop
      await playOne(url);
    }
  };
  const processAudioQueue = async () => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    try {
      while (audioQueueRef.current.length) {
        const job = audioQueueRef.current.shift();
        const urls = Array.isArray(job?.urls) ? job.urls : [];
        if (!urls.length) continue;
        // eslint-disable-next-line no-await-in-loop
        await playSequence(urls);
      }
    } finally {
      isPlayingRef.current = false;
    }
  };
  const enqueueAudio = (urls, isRepeat = false) => {
    const job = { urls: Array.isArray(urls) ? urls : [] };
    if (isRepeat) {
      audioQueueRef.current.unshift(job);
    } else {
      audioQueueRef.current.push(job);
    }
    processAudioQueue();
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
  const poliAudio = (nm, kd) => {
    const m = String(kd || '').trim();
    if (m && voiceMap[m]) return voiceMap[m];
    const s = String(nm || '').toLowerCase();
    if (!s) return `${baseSuara}/Poli/${encodeURIComponent('poli Umum.mp3')}`;
    if (s.includes('umum')) return `${baseSuara}/Poli/${encodeURIComponent('poli Umum.mp3')}`;
    if (s.includes('gigi')) return `${baseSuara}/Poli/${encodeURIComponent('Poli Gigi.mp3')}`;
    if (s.includes('anak')) return `${baseSuara}/Poli/${encodeURIComponent('Poli Anak.mp3')}`;
    if (s.includes('kb')) return `${baseSuara}/Poli/${encodeURIComponent('Poli KB.mp3')}`;
    if (s.includes('kia')) return `${baseSuara}/Poli/${encodeURIComponent('Poli KIA.mp3')}`;
    if (s.includes('lansia')) return `${baseSuara}/Poli/${encodeURIComponent('Poli Lansia.mp3')}`;
    if (s.includes('tb') || s.includes('paru')) return `${baseSuara}/Poli/${encodeURIComponent('Poli TB-Paru.mp3')}`;
    if (s.includes('mtbs')) return `${baseSuara}/Poli/${encodeURIComponent('poli MTBS.mp3')}`;
    if (s.includes('fisio') || s.includes('fisioterapi')) return `${baseSuara}/Poli/${encodeURIComponent('fisioterapi.mp3')}`;
    return `${baseSuara}/Poli/${encodeURIComponent('poli Umum.mp3')}`;
  };
  useEffect(() => {
    try {
      const v = localStorage.getItem("displaySoundEnabled");
      if (v === "1") {
        setSoundEnabled(true);
        setShowSoundOverlay(false);
      } else {
        setShowSoundOverlay(true);
      }
    } catch (_) {}
    if (soundInitRef.current) return;
    soundInitRef.current = true;
    try {
      const a = new Audio(`${baseSuara}/notifbell.mp3`);
      a.muted = true;
      a.play().catch(() => {});
    } catch (_) {}
    const handler = () => { enableSound(); };
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
    const ch = new BroadcastChannel('antrian-poli-call');
    ch.onmessage = async (ev) => {
      const d = ev?.data || {};
      const snapCards = Array.isArray(cards) ? cards : [];
      const nmPasienMsg = String(d.nm_pasien || '').trim();
      const nmPoliMsg = String(d.nm_poli || '').trim();
      const cardSnap = snapCards.find((c) => String(c.kd_poli || '') === String(d.kd_poli || '')) || null;
      const rowSnap = cardSnap && Array.isArray(cardSnap.upcoming)
        ? cardSnap.upcoming.find((r) => String(r.no_rawat || '') === String(d.no_rawat || ''))
        : null;
      const noRegSnap = rowSnap ? String(rowSnap.no_reg || '') : '';
      const chosenInitial = String(d.no_reg || '') || noRegSnap || String(highlight?.no_reg || '');
      const nmPoliInitial = nmPoliMsg || (cardSnap ? String(cardSnap.nm_poli || cardSnap.kd_poli || '') : '');
      const nmPasienInitial = nmPasienMsg || String(highlight?.nm_pasien || '');
      const tsMsg = typeof d.ts === 'number' && d.ts > 0 ? d.ts : Date.now();
      const baseH = {
        kd_poli: String(d.kd_poli || ''),
        no_reg: chosenInitial,
        nm_poli: nmPoliInitial,
        nm_pasien: nmPasienInitial,
        repeat: !!d.repeat,
        ts: tsMsg,
      };
      const q = pushQueue(baseH);
      const top = q[0] || baseH;
      setHighlight((prev) => (isSameHighlight(top, prev) ? prev : top));
      if (top.repeat) {
        const k = makeKey(top);
        lastRepeatKeyRef.current = k;
        lastRepeatAtRef.current = Date.now();
        setRepeatTick((t) => t + 1);
      }
      try {
        const res = await axios.get(`/api/antrian-poli`, { headers: { Accept: 'application/json' } });
        const data = res?.data || {};
        const cardsArr = Array.isArray(data.cards) ? data.cards : [];
        setCards(cardsArr);
      } catch (_) {}
    };
    return () => { ch.close(); };
  }, [soundEnabled]);
  useEffect(() => {
    const h = highlight;
    const k = makeKey(h);
    if (!h || !k || !soundEnabled) return;
    const forceRepeat = (lastRepeatKeyRef.current === k) && (Date.now() - lastRepeatAtRef.current < 6000);
    if (audioLastKeyRef.current === k && !forceRepeat) return;
    audioLastKeyRef.current = k;
    lastPlayAtRef.current = Date.now();
    const nomor = parseInt(String(h.no_reg || '0'), 10) || 0;
    const nmPoli = String(h.nm_poli || h.kd_poli || '').trim();
    const seq = [
      `${baseSuara}/notifbell.mp3`,
      `${baseSuara}/${encodeURIComponent('Antrian.mp3')}`,
      poliAudio(nmPoli, h.kd_poli),
      `${baseSuara}/${encodeURIComponent('Nomor.mp3')}`,
      ...numberAudio(nomor),
      `${baseSuara}/${encodeURIComponent('Silahkan Masuk.mp3')}`,
    ];
    enqueueAudio(seq, forceRepeat);
    if (forceRepeat) {
      lastRepeatKeyRef.current = null;
      lastRepeatAtRef.current = 0;
    }
  }, [highlight, repeatTick, soundEnabled]);

  const displayNmPoli = useMemo(() => {
    const nm = String(highlight?.nm_poli || '').trim();
    const kd = String(highlight?.kd_poli || '').trim();
    const codeLike = nm && (nm === kd || /^[A-Z0-9]+$/.test(nm));
    if (codeLike || !nm) {
      const c = (Array.isArray(cards) ? cards : []).find((v) => String(v.kd_poli || '') === kd);
      if (c) return String(c.nm_poli || c.kd_poli || nm || kd);
      return nm || kd || '-';
    }
    return nm || '-';
  }, [highlight, cards]);

  return (
    <div className="min-h-screen min-h-dvh w-full bg-black">
      <Head title={"Display Poli"} />
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full min-h-screen min-h-dvh px-6 py-6 flex flex-col">
        {!soundEnabled && (
          <div className="fixed top-4 right-4 z-50">
            <button className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg" onClick={enableSound}>Aktifkan Suara</button>
          </div>
        )}
        {showSoundOverlay && !soundEnabled && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="max-w-md w-full mx-4 rounded-2xl bg-white shadow-xl border border-gray-200">
              <div className="px-5 py-4">
                <div className="text-lg font-bold text-gray-900">Aktifkan Suara Panggilan</div>
                <div className="mt-1 text-sm text-gray-600">Klik sekali untuk mengaktifkan dan menyimpan preferensi</div>
                <div className="mt-4">
                  <button className="w-full px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold" onClick={enableSound}>Aktifkan Suara</button>
                </div>
              </div>
            </div>
          </div>
        )}
        <motion.div variants={itemVariants} className="rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-white to-slate-50 shadow-xl border border-gray-200">
          <div className="flex items-center w-full divide-x divide-gray-200">
            <div className="basis-[10%] px-4 py-3">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-widest text-gray-900">{highlight?.no_reg || "-"}</div>
            </div>
            <div className="basis-[25%] px-4 py-3">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide text-gray-900 truncate">{displayNmPoli}</div>
            </div>
            <div className="basis-[65%] px-4 py-3">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide text-gray-900 truncate">{highlight?.nm_pasien || "-"}</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex-1">
          <div className="flex flex-col gap-4">
            {sortedCards
              .filter((card) => Array.isArray(card.upcoming) && card.upcoming.some((r) => String(r.stts || '').trim().toLowerCase() === 'belum'))
              .map((card, idx) => (
                <Card key={card.kd_poli || idx} className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
                  <CardHeader className="!px-4 !py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm">
                    <CardTitle className="!text-lg text-white tracking-wide">{String(card.nm_poli || card.kd_poli).toUpperCase()}</CardTitle>
                  </CardHeader>
                  <CardContent className="!p-0">
                  <div className="grid grid-cols-5 gap-3 md:gap-4 p-3">
                    <div className="col-span-1">
                      <div className="rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow flex flex-col items-center justify-center h-36 sm:h-40 md:h-44 ring-1 ring-white/30">
                        <div className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-widest text-white text-center">
                          {card.last_called ? card.last_called : "-"}
                        </div>
                        <div className="mt-2 h-1 w-full max-w-[92%] bg-white/80 rounded"></div>
                        <div className="mt-2 text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest text-center">{String(card.nm_poli || card.kd_poli)}</div>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                        <div className="px-3 py-2 border-b border-gray-200 bg-gray-50 text-xs sm:text-sm md:text-base font-semibold text-gray-700 grid grid-cols-[10%_50%_25%_15%]">
                          <div>Antrian</div>
                          <div>Pasien</div>
                          <div>Ruangan</div>
                          <div>Status</div>
                        </div>
                        {Array.isArray(card.upcoming) && card.upcoming.length > 0 ? (
                          card.upcoming.map((r, i) => (
                            <div key={`${card.kd_poli}-${r.no_rawat || i}`} className="px-3 py-2 text-base sm:text-lg md:text-xl grid grid-cols-[10%_50%_25%_15%] odd:bg-gray-50">
                              <div className="font-mono font-bold">{r.no_reg}</div>
                              <div className="font-bold truncate">{r.nm_pasien || "-"}</div>
                              <div className="font-bold truncate">{r.nm_poli || String(card.nm_poli || card.kd_poli)}</div>
                              <div className="inline-flex items-center justify-start px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">{String(r.stts || "Belum")}</div>
                            </div>
                          ))
                        ) : (
                          <div className="px-3 py-3 text-sm text-gray-600">Antrian Pasien Tidak Ada</div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-3">
          <div className="border-t border-b border-gray-200/60 dark:border-gray-700/60 py-2">
            <div className="overflow-hidden">
              <motion.div initial={{ x: "100%" }} animate={{ x: ["100%", "-100%"] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }} className="whitespace-nowrap text-center font-semibold text-lg md:text-xl lg:text-2xl text-white">
                {`Selamat datang di ${instansiName}, perhatikan nomor antrian anda`}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
