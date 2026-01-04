import React, { useEffect, useMemo, useRef, useState } from "react";
import { Head } from "@inertiajs/react";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import axios from "axios";
import { motion } from "framer-motion";
import SearchableSelect from "@/Components/SearchableSelect";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/Card";
import { Upload, Music2, Play, CheckCircle2 } from "lucide-react";

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

export default function SuaraDisplay() {
  const [kdPoli, setKdPoli] = useState("");
  const [nmPoliDisplay, setNmPoliDisplay] = useState("");
  const [fileObj, setFileObj] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [list, setList] = useState([]);
  const audioRef = useRef(null);
  const selectedBaseRef = useRef(null);

  const getApiBaseCandidates = () => {
    const list = [];
    // Prioritaskan origin saat ini terlebih dahulu
    try { list.push(window.location.origin); } catch {}
    // Kemudian env backend jika ada
    try {
      const envUrl = import.meta?.env?.VITE_BACKEND_URL;
      if (envUrl) list.push(envUrl);
    } catch {}
    // Lalu port Laravel default (8000), terakhir 8080
    list.push("http://127.0.0.1:8000");
    list.push("http://localhost:8000");
    list.push("http://127.0.0.1:8080");
    list.push("http://localhost:8080");
    // Dedup sederhana
    return Array.from(new Set(list.filter(Boolean)));
  };

  const loadList = async () => {
    const bases = getApiBaseCandidates();
    const pickBase = async () => {
      // Coba HEAD ping cepat untuk memilih base yang tersedia tanpa error
      for (const base of bases) {
        try {
          const url = new URL('/api/poli-voice-mapping', base).href;
          await axios.head(url, { timeout: 800, withCredentials: false, validateStatus: (s) => s === 200 });
          return base;
        } catch {}
      }
      return bases[0];
    };
    if (!selectedBaseRef.current) {
      selectedBaseRef.current = await pickBase();
    }
    let lastErr = null;
    const order = [selectedBaseRef.current, ...bases.filter((b) => b !== selectedBaseRef.current)];
    for (const base of order) {
      try {
        const url = new URL('/api/poli-voice-mapping', base).href;
        const res = await axios.get(url, { headers: { Accept: "application/json" }, withCredentials: false });
        const arr = res?.data?.data || [];
        setList(arr);
        return;
      } catch (e) {
        lastErr = e;
        const s = e?.response?.status;
        if (s && s !== 404) throw e;
      }
    }
    throw lastErr || new Error('Gagal memuat mapping');
  };

  useEffect(() => { loadList(); }, []);

  const handleSelect = (val, opt) => {
    setKdPoli(val || "");
    setNmPoliDisplay(opt?.label || "");
  };

  const handleFileChange = (e) => {
    const f = e?.target?.files?.[0] || null;
    setFileObj(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kdPoli || !fileObj) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("kd_poli", kdPoli);
      fd.append("nm_poli", nmPoliDisplay);
      fd.append("file", fileObj);

      const bases = getApiBaseCandidates();
      const base = selectedBaseRef.current || bases[0];
      const order = [base, ...bases.filter((b) => b !== base)];

      let done = false;
      let lastErr = null;
      for (const base of order) {
        try {
          const postUrl = new URL('/api/poli-voice-mapping', base).href;
          await axios.post(postUrl, fd, {
            withCredentials: false,
            headers: {
              "Accept": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
          });
          done = true;
          break;
        } catch (e) {
          lastErr = e;
          const s = e?.response?.status;
          if (s && s !== 404 && s !== 401 && s !== 419) throw e;
        }
      }
      if (!done) throw lastErr || new Error('Gagal menyimpan mapping');
      setKdPoli("");
      setNmPoliDisplay("");
      setFileObj(null);
      await loadList();
    } catch {} finally {
      setSubmitting(false);
    }
  };

  const playAudio = (row) => {
    try {
      const p = String(row?.file_path || "").trim();
      const url = p.startsWith("/Suara") ? p : `/Suara/${p}`;
      const a = new Audio(url);
      audioRef.current = a;
      a.play().catch(() => {});
    } catch {}
  };

  const headerTitle = useMemo(() => "Mapping Suara Poliklinik", []);

  return (
    <SidebarPengaturan title="Pengaturan" wide>
      <Head title={headerTitle} />
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full px-2 sm:px-4 py-6 flex flex-col">
        <motion.div variants={itemVariants} className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-6">
          <div className="flex items-center gap-3">
            <motion.div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
              <Music2 className="w-6 h-6 text-white" />
            </motion.div>
            <motion.h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">{headerTitle}</motion.h1>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6">
          <Card className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <CardHeader className="!px-4 !py-2.5 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
              <CardTitle className="!text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Unggah Suara Poli</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="!p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Pilih Poliklinik</div>
                  <SearchableSelect
                    source="poliklinik"
                    value={kdPoli}
                    onChange={(val, opt) => handleSelect(val, opt)}
                    placeholder="Cari atau pilih poliklinik"
                    searchPlaceholder="Ketik kode/nama poliklinik"
                    defaultDisplay={nmPoliDisplay}
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">File Suara (MP3)</div>
                  <input type="file" accept=".mp3,audio/mpeg" onChange={handleFileChange} className="block w-full text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 focus:outline-none" />
                  <p className="mt-2 text-xs text-gray-500">Maks 20MB, format MP3</p>
                </div>
                <div className="flex items-center gap-3">
                  <button disabled={submitting || !kdPoli || !fileObj} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simpan Mapping</span>
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <CardHeader className="!px-4 !py-2.5 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
              <CardTitle className="!text-lg text-gray-900 dark:text-white">Daftar Mapping Saat Ini</CardTitle>
            </CardHeader>
            <CardContent className="!p-0">
              <div className="divide-y divide-gray-200">
                {Array.isArray(list) && list.length > 0 ? (
                  list.map((row, idx) => (
                    <div key={idx} className="px-4 py-3 grid grid-cols-[15%_55%_20%_10%] items-center">
                      <div className="font-mono font-bold text-gray-900 dark:text-white">{row.kd_poli}</div>
                      <div className="truncate text-gray-700 dark:text-gray-300">{row.nm_poli || "-"}</div>
                      <div className="truncate text-xs text-gray-500">{row.file_path}</div>
                      <div className="flex items-center justify-end">
                        <button onClick={() => playAudio(row)} className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                          <Play className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-sm text-gray-600">Belum ada mapping suara poli</div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </SidebarPengaturan>
  );
}
