import React, { useEffect, useMemo, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/Card";
import { Loader2, AlertCircle, CheckCircle2, Building2, Search, Delete, IdCard, User2, Stethoscope } from "lucide-react";
import { todayDateString } from "@/tools/datetime";
import SearchableSelect from "@/Components/SearchableSelect";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const sanitizeNik = (v) => String(v || "").replace(/[^0-9]/g, "").slice(0, 16);

const hariKerjaToday = () => {
  const map = ["AKHAD", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
  const d = new Date();
  const idx = d.getDay();
  return map[idx] || "SENIN";
};

function NumericKeypad({ disabled, onDigit, onBackspace, onSearch }) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="inline-grid grid-cols-[repeat(3,max-content)] gap-3 sm:gap-4 mx-auto">
      {digits.map((d) => (
        <button
          key={d}
          type="button"
          disabled={disabled}
          onClick={() => onDigit(String(d))}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-gray-300/80 dark:border-gray-600/70 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow flex items-center justify-center text-3xl font-semibold active:scale-[0.98] transition-all duration-150 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:shadow-md"
        >
          {d}
        </button>
      ))}
      <button
        type="button"
        disabled={disabled}
        onClick={onBackspace}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-gray-300/80 dark:border-gray-600/70 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow flex items-center justify-center active:scale-[0.98] transition-all duration-150 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:shadow-md"
      >
        <Delete className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11" />
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onDigit("0")}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-gray-300/80 dark:border-gray-600/70 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow flex items-center justify-center text-3xl font-semibold active:scale-[0.98] transition-all duration-150 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:shadow-md"
      >
        0
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={onSearch}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-emerald-600 bg-emerald-600 text-white shadow flex items-center justify-center active:scale-[0.98] transition-all duration-150 hover:brightness-105 hover:shadow-md"
      >
        <Search className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11" />
      </button>
    </div>
  );
}

export default function PasienMandiri() {
  const { props } = usePage();
  const s = props?.setting || props?.settings || {};
  const kopTitle = useMemo(() => s.nama_instansi || s.nama || "Instansi", [s]);
  const logoUrl = useMemo(() => {
    const name = s.nama_instansi || s.nama || "";
    return name ? `/setting/app/${encodeURIComponent(name)}/logo` : "";
  }, [s]);
  const [showLogo, setShowLogo] = useState(true);

  const [nik, setNik] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [bpjsLoading, setBpjsLoading] = useState(false);
  const [bpjsError, setBpjsError] = useState(null);
  const [bpjsData, setBpjsData] = useState(null);
  const [jadwalToday, setJadwalToday] = useState([]);
  const [selectedPoli, setSelectedPoli] = useState(null);
  const [selectedDokter, setSelectedDokter] = useState(null);
  const [penjabMap, setPenjabMap] = useState({});
  const [kdPenjab, setKdPenjab] = useState("BPJ");
  const [regSaving, setRegSaving] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState(null);

  useEffect(() => {
    const hari = hariKerjaToday();
    (async () => {
      try {
        const res = await axios.get("/api/jadwal", { params: { hari } });
        setJadwalToday(Array.isArray(res?.data?.data) ? res.data.data : []);
      } catch (_) {
        setJadwalToday([]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/penjab");
        const list = Array.isArray(res?.data?.data) ? res.data.data : [];
        const m = {};
        for (const p of list) {
          if (p?.kd_pj) m[p.kd_pj] = p;
        }
        setPenjabMap(m);
      } catch (_) {
        setPenjabMap({});
      }
    })();
  }, []);

  const todayPoli = useMemo(() => Array.isArray(props?.today_poli) ? props.today_poli : [], [props]);

  const handleDigit = (d) => setNik((prev) => sanitizeNik(prev + String(d)));
  const handleBackspace = () => setNik((prev) => prev.slice(0, Math.max(0, prev.length - 1)));

  

  const handleSearchPatient = async () => {
    const term = sanitizeNik(nik);
    setNik(term);
    setIsSearching(true);
    setSelectedPatient(null);
    try {
      const res = await axios.get("/registration/search-patients", { params: { search: term } });
      const rows = Array.isArray(res?.data?.data) ? res.data.data : [];
      const match = rows.find((p) => String(p?.no_ktp || "") === term) || rows[0] || null;
      setSelectedPatient(match || null);
    } catch (_) {
    } finally {
      setIsSearching(false);
    }
    await handleCheckBpjs(term);
  };

  const handleCheckBpjs = async (n) => {
    const nikVal = sanitizeNik(n || nik);
    setBpjsError(null);
    setBpjsData(null);
    if (!nikVal || nikVal.length < 8) {
      setBpjsError("Masukkan NIK yang valid");
      return;
    }
    setBpjsLoading(true);
    try {
      const res = await axios.get("/pcare/api/peserta/nik", { params: { nik: nikVal } });
      if (res.status === 200) {
        setBpjsData({ metaData: res.data?.metaData, response: res.data?.response });
      } else {
        setBpjsError(res?.data?.metaData?.message || "Gagal mengambil data peserta");
      }
    } catch (e) {
      setBpjsError(e?.response?.data?.metaData?.message || e?.message || "Terjadi kesalahan jaringan");
    } finally {
      setBpjsLoading(false);
    }
  };

  const groupedJadwal = useMemo(() => {
    const map = new Map();
    for (const j of jadwalToday) {
      const key = j.kd_poli || "";
      if (!map.has(key)) map.set(key, { kd_poli: key, nm_poli: j.nm_poli || key, dokters: [] });
      map.get(key).dokters.push({ kd_dokter: j.kd_dokter, nm_dokter: j.nm_dokter, jam_mulai: j.jam_mulai, jam_selesai: j.jam_selesai });
    }
    return Array.from(map.values());
  }, [jadwalToday]);

  const penanggungJawab = useMemo(() => {
    const code = selectedPatient?.kd_pj;
    if (!code) return "";
    const p = penjabMap[code];
    return p?.png_jawab || selectedPatient?.penjab?.png_jawab || "";
  }, [selectedPatient, penjabMap]);

  const penjabOptions = useMemo(() => {
    const vals = Object.values(penjabMap);
    return vals.map((p) => ({ value: p.kd_pj, label: p.png_jawab }));
  }, [penjabMap]);

  const handleSelectDoctor = async (grp, d) => {
    setSelectedPoli(grp);
    setSelectedDokter(d);
    if (!selectedPatient || !grp?.kd_poli || !d?.kd_dokter) return;
    setRegError("");
    setRegSaving(true);
    try {
      const noRM = String(selectedPatient.no_rkm_medis || "");
      const pjName = selectedPatient.namakeluarga || selectedPatient.nm_pasien || "-";
      const pjAddr = selectedPatient.alamat || "-";
      const hubungan = selectedPatient.keluarga || "DIRI SENDIRI";
      const payload = {
        kd_dokter: d.kd_dokter,
        kd_poli: grp.kd_poli,
        kd_pj: kdPenjab || "UMUM",
        p_jawab: pjName,
        almt_pj: pjAddr,
        hubunganpj: hubungan,
      };
      const res = await axios.post(`/registration/${encodeURIComponent(noRM)}/register`, payload);
      const ok = res?.data?.success === true;
      const data = res?.data?.data || {};
      if (ok && data?.no_rawat) {
        setRegSuccess({ no_rawat: data.no_rawat, no_reg: data.no_reg });
        const url = `/registration/${encodeURIComponent(data.no_rawat)}/print`;
        try {
          window.open(url, "_blank", "noopener,noreferrer");
        } catch (_) {}
      } else {
        const msg = res?.data?.message || "Gagal menyimpan registrasi";
        setRegError(msg);
      }
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Terjadi kesalahan";
      setRegError(msg);
    } finally {
      setRegSaving(false);
    }
  };

  return (
    <div className="min-h-screen min-h-dvh w-full bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      <Head title={"Anjungan Pasien Mandiri"} />
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full min-h-screen min-h-dvh px-0 py-4 sm:py-6 md:py-8 lg:py-10 flex flex-col">

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-4 md:gap-6 print:hidden flex-1">
          <Card className="md:col-span-1 h-full rounded-3xl border border-white/10 dark:border-gray-700/40 bg-white/10 dark:bg-gray-900/50 shadow-2xl backdrop-blur-xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <CardContent className="h-full">
              <div className="h-full min-h-[420px] flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  {logoUrl && showLogo ? (
                    <img src={logoUrl} alt="Logo" className="h-12 w-12 rounded bg-white/90" onError={() => setShowLogo(false)} />
                  ) : (
                    <Building2 className="w-12 h-12 text-indigo-600" />
                  )}
                  <div className="text-base sm:text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent text-center">{kopTitle}</div>
                </div>
                <div className="w-full mx-auto flex flex-col items-center gap-3">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={nik}
                    onChange={(e) => setNik(sanitizeNik(e.target.value))}
                    placeholder="Masukkan NIK"
                    className="w-[13.5rem] sm:w-[17rem] md:w-[20rem] rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-base sm:text-lg tracking-normal text-center focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-600 transition"
                  />
                  <NumericKeypad disabled={isSearching} onDigit={handleDigit} onBackspace={handleBackspace} onSearch={handleSearchPatient} />
                  <div className="mt-3 w-full text-xs sm:text-sm text-slate-800 dark:text-gray-200 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-2xl p-3">
                    <div className="font-semibold mb-2">Alur Anjungan Pasien Mandiri</div>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Ketik NIK kemudian Klik Tanda Cari</li>
                      <li>Cek data Informasi</li>
                      <li>
                        Pilih Jenis Pasien
                        <ul className="list-disc pl-4 mt-1 space-y-1">
                          <li>BPJS = Untuk pasien Peserta BPJS Aktif</li>
                          <li>Umum = Untuk Pasien Umum</li>
                          <li>Kir Nikah = Untuk Pasien Mencari Kir Nikah</li>
                          <li>Kir Kerja = Untuk Pasien Mencari Kir Kerja</li>
                          <li>Kir Sekolah = Untuk Pasien Anak Sekolah dengan Buku UKS</li>
                          <li>Lain - Lian = Untuk Keperluan Lainnya</li>
                        </ul>
                      </li>
                      <li>Klik dokter sesuai Poli Layanan</li>
                      <li>Selesai</li>
                    </ol>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-1 h-full rounded-3xl border border-white/10 dark:border-gray-700/40 bg-white/5 dark:bg-gray-900/40 shadow-xl backdrop-blur-lg">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
            <CardHeader className="px-6 pt-6">
              <CardTitle>
                <div className="flex items-center gap-2 w-full">
                  <User2 className="w-4 h-4 text-emerald-500" />
                  <span className="w-full text-center bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent text-2xl md:text-3xl font-extrabold tracking-wide">ANJUNGAN PASIEN MANDIRI ( APM )</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 p-4 shadow-sm">
                  {selectedPatient ? (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        <div className="rounded-lg border border-slate-200 px-2 py-1.5 bg-white/80 dark:bg-gray-900/60">
                          <div className="text-[10px] text-slate-500">Nama</div>
                          <div className="mt-0.5 text-xs text-slate-800 dark:text-white font-semibold truncate">{selectedPatient.nm_pasien || "-"}</div>
                        </div>
                        <div className="rounded-lg border border-slate-200 px-2 py-1.5 bg-white/80 dark:bg-gray-900/60">
                          <div className="text-[10px] text-slate-500">No. RM</div>
                          <div className="mt-0.5 text-xs text-slate-800 dark:text-white">{selectedPatient.no_rkm_medis || "-"}</div>
                        </div>
                        <div className="rounded-lg border border-slate-200 px-2 py-1.5 bg-white/80 dark:bg-gray-900/60">
                          <div className="text-[10px] text-slate-500">NIK</div>
                          <div className="mt-0.5 text-xs text-slate-800 dark:text-white">{selectedPatient.no_ktp || "-"}</div>
                        </div>
                        <div className="rounded-lg border border-slate-200 px-2 py-1.5 bg-white/80 dark:bg-gray-900/60">
                          <div className="text-[10px] text-slate-500">No. Telp</div>
                          <div className="mt-0.5 text-xs text-slate-800 dark:text-white">{selectedPatient.no_tlp || "-"}</div>
                        </div>
                      <div className="col-span-2 md:col-span-2 lg:col-span-3 rounded-lg border border-slate-200 px-2 py-1.5 bg-white/80 dark:bg-gray-900/60">
                        <div className="text-[10px] text-slate-500">Alamat</div>
                        <div className="mt-0.5 text-xs text-slate-800 dark:text-white truncate">{selectedPatient.alamat || "-"}</div>
                      </div>
                      <div className="rounded-lg border border-slate-200 px-2 py-1.5 bg-white/80 dark:bg-gray-900/60">
                        <div className="text-[10px] text-slate-500">Penanggung Jawab</div>
                        <div className="mt-0.5 text-xs text-slate-800 dark:text-white">{penanggungJawab || "-"}</div>
                      </div>
                      </div>

                      {bpjsLoading ? (
                        <div className="mt-3 flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                          <span className="text-sm text-slate-700">Mengecek kepesertaan BPJS…</span>
                        </div>
                      ) : bpjsError ? (
                        <div className="mt-3 inline-flex items-center gap-2 text-red-700">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">{bpjsError}</span>
                        </div>
                      ) : bpjsData?.response ? (
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <IdCard className="h-5 w-5 text-slate-500" />
                              <div className="text-sm font-semibold text-slate-800">Informasi BPJS</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            <div className="rounded-lg border border-slate-200 px-2 py-1.5 bg-white/80 dark:bg-gray-900/60">
                              <div className="text-[10px] text-slate-500">Nama Peserta</div>
                              <div className="mt-0.5 text-xs text-slate-800 truncate">{bpjsData.response?.nama || "-"}</div>
                            </div>
                            <div className="rounded-lg border border-slate-200 px-2 py-1.5 bg-white/80 dark:bg-gray-900/60">
                              <div className="text-[10px] text-slate-500">No. Kartu</div>
                              <div className="mt-0.5 text-xs text-slate-800">{bpjsData.response?.noKartu || "-"}</div>
                            </div>
                            <div className="rounded-lg border border-slate-200 px-2 py-1.5 bg-white/80 dark:bg-gray-900/60">
                              <div className="text-[10px] text-slate-500">Status</div>
                              <div className="mt-0.5 text-xs text-slate-800 dark:text-white">{bpjsData.response?.aktif ? "AKTIF" : "TIDAK AKTIF"}</div>
                            </div>
                            <div className="rounded-lg border border-slate-200 px-2 py-1.5 bg-white/80 dark:bg-gray-900/60">
                              <div className="text-[10px] text-slate-500">Provider FKTP</div>
                              <div className="mt-0.5 text-xs text-slate-800 truncate">{bpjsData.response?.kdProviderPst?.nmProvider || "-"}</div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">Masukkan NIK lalu tekan Cari untuk melihat data pasien.</div>
                  )}
                </div>

                

                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 p-4 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-4 items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Stethoscope className="w-5 h-5 text-indigo-600" />
                        <div className="text-sm font-semibold text-slate-800">Poli & Dokter Jaga Hari Ini</div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {groupedJadwal.length ? groupedJadwal.map((grp) => (
                          <motion.div key={grp.kd_poli} className="relative rounded-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden shadow-sm">
                            <div className="px-4 py-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                              <div className="text-sm font-bold tracking-wide">{String(grp.nm_poli || grp.kd_poli).toUpperCase()}</div>
                            </div>
                            <div className="p-3 space-y-2">
                                {grp.dokters.map((d, i) => (
                                <button key={`${d.kd_dokter}-${i}`} onClick={() => handleSelectDoctor(grp, d)} disabled={regSaving} className={`w-full text-left rounded-2xl border-2 px-4 py-3 transition-colors shadow-sm ${selectedDokter?.kd_dokter === d.kd_dokter && selectedPoli?.kd_poli === grp.kd_poli ? "border-emerald-600 bg-emerald-50" : "border-gray-300 bg-white/90 dark:bg-gray-800/80 hover:bg-indigo-50 hover:border-indigo-500 dark:hover:bg-gray-700"} ${regSaving ? "opacity-70 cursor-not-allowed" : ""} focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.99]`}>
                                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{d.nm_dokter || d.kd_dokter}</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-300">{(d.jam_mulai || "").slice(0,5)}–{(d.jam_selesai || "").slice(0,5)}</div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )) : (
                          todayPoli.map((p, idx) => (
                            <motion.div key={p.kd_poli || idx} className="relative rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm bg-white/80 dark:bg-gray-900/50">
                              <div className="text-sm font-bold text-gray-900 dark:text-white">{String(p.nm_poli || p.kd_poli).toUpperCase()}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">Jadwal dokter tidak tersedia</div>
                            </motion.div>
                          ))
                        )}
                      </div>
                      <AnimatePresence>
                        {selectedPoli && selectedDokter && (
                          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-4 flex items-center gap-3">
                            <div className="text-sm text-gray-700 dark:text-gray-300">Terpilih: {String(selectedPoli.nm_poli || selectedPoli.kd_poli)} • {String(selectedDokter.nm_dokter || selectedDokter.kd_dokter)} • {(selectedDokter.jam_mulai || "").slice(0,5)}–{(selectedDokter.jam_selesai || "").slice(0,5)}</div>
                            {regSaving && (
                              <div className="inline-flex items-center gap-2 text-emerald-700">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm">Mendaftar & mencetak…</span>
                              </div>
                            )}
                            {!regSaving && regError && (
                              <div className="inline-flex items-center gap-2 text-red-700">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-sm">{regError}</span>
                              </div>
                            )}
                            {!regSaving && regSuccess && (
                              <div className="inline-flex items-center gap-2 text-emerald-700">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-sm">Terdaftar: {regSuccess.no_reg || "-"}</span>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 p-3">
                      <div className="text-xs font-semibold text-slate-700 mb-2">Jenis Pasien</div>
                      <SearchableSelect
                        options={penjabOptions}
                        value={kdPenjab}
                        onChange={(val) => setKdPenjab(val)}
                        placeholder="Pilih penanggung jawab"
                        displayKey="label"
                        valueKey="value"
                        defaultDisplay="BPJS"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
