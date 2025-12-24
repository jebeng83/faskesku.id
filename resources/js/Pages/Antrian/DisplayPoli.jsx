import React, { useEffect, useMemo, useState } from "react";
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
  const sortedCards = useMemo(() => {
    const arr = Array.isArray(cards) ? [...cards] : [];
    arr.sort((a, b) => String(a?.nm_poli || a?.kd_poli || "").localeCompare(String(b?.nm_poli || b?.kd_poli || "")));
    return arr;
  }, [cards]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/antrian-poli`, { headers: { Accept: "application/json" } });
        if (!mounted) return;
        const data = res?.data || {};
        setCards(Array.isArray(data.cards) ? data.cards : []);
        setHighlight(data.highlight || null);
      } catch {}
    };
    fetchData();
    const it = setInterval(fetchData, 2000);
    return () => { mounted = false; clearInterval(it); };
  }, []);

  return (
    <div className="min-h-screen min-h-dvh w-full bg-black">
      <Head title={"Display Poli"} />
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full min-h-screen min-h-dvh px-6 py-6 flex flex-col">
        <motion.div variants={itemVariants} className="rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-white to-slate-50 shadow-xl border border-gray-200">
          <div className="flex items-center w-full divide-x divide-gray-200">
            <div className="basis-[10%] px-4 py-3">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-widest text-gray-900">{highlight?.no_reg || "-"}</div>
            </div>
            <div className="basis-[25%] px-4 py-3">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide text-gray-900 truncate">{highlight?.nm_poli || "-"}</div>
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
