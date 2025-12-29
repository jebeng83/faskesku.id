import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { overlayTransition, contentSpring, transformOriginForDir, createPageVariants, hoverTapVariants, headerItemVariants } from "@/tools/motion";
import { Head, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import LanjutanRalanLayout from "@/Layouts/LanjutanRalanLayout";
import NewCpptSoap from "./NewComponen/NewCpptSoap";
import NewTarifTindakan from "./NewComponen/NewTarifTindakan";
import NewResep from "./NewComponen/NewResep";
import NewPermintaanLab from "./NewComponen/NewPermintaanLab";
import axios from "axios";

export default function CanvasRajal({ token = "", noRkmMedis = "", noRawat = "", kdPoli = "" }) {
  const [isOpen, setIsOpen] = useState(true);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const dragThreshold = 40;
  const [patientInfo, setPatientInfo] = useState({ name: "", birth: "", age: "" });
  const [poliName, setPoliName] = useState("");
  const [poliCode, setPoliCode] = useState(kdPoli || "");
  const [identityOpen, setIdentityOpen] = useState(false);

  const formatDateId = (d) => {
    if (!d) return "-";
    try {
      const dt = new Date(d);
      if (Number.isNaN(dt.getTime())) return String(d);
      return dt.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
    } catch {
      return String(d);
    }
  };

  const computeAgeLabel = (birthStr) => {
    if (!birthStr) return "-";
    const b = new Date(birthStr);
    if (Number.isNaN(b.getTime())) return "-";
    const now = new Date();
    let years = now.getFullYear() - b.getFullYear();
    let months = now.getMonth() - b.getMonth();
    const days = now.getDate() - b.getDate();
    if (months < 0 || (months === 0 && days < 0)) {
      years -= 1;
      months += 12;
      if (days < 0) {
        months -= 1;
      }
    }
    if (years < 0) return "-";
    months = Math.max(0, months);
    return `${years} tahun ${months} bulan`;
  };

  useEffect(() => {
    let cancelled = false;
    const loadIdentity = async () => {
      if (!noRawat && !noRkmMedis) return;
      try {
        let regData = null;
        if (noRawat) {
          try {
            const respRegExact = await axios.get("/api/reg-periksa/by-rawat", {
              params: { no_rawat: noRawat },
              withCredentials: true,
              headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            });
            regData = respRegExact?.data?.data || null;
          } catch (_) {
            try {
              const respReg = await axios.get("/api/reg-periksa", {
                params: { search: noRawat, per_page: 1 },
                withCredentials: true,
                headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
              });
              regData = respReg?.data?.data?.data?.[0] || null;
            } catch (_) {}
          }
        }

        const patient = regData?.patient || regData?.pasien || null;
        const name = (patient?.nm_pasien ?? regData?.nm_pasien ?? "").toString();
        const birth = (patient?.tgl_lahir ?? regData?.tgl_lahir ?? "").toString();
        const age = computeAgeLabel(birth);
        if (!cancelled) setPatientInfo({ name, birth, age });

        const kd = (regData?.kd_poli ?? regData?.poliklinik?.kd_poli ?? kdPoli ?? "").toString();
        const nm = (regData?.poliklinik?.nm_poli ?? regData?.nm_poli ?? "").toString();
        if (!cancelled) {
          setPoliCode(kd);
          if (nm) setPoliName(nm);
        }
      } catch (_) {}
    };
    loadIdentity();
    return () => { cancelled = true; };
  }, [noRawat, noRkmMedis]);

  useEffect(() => {
    let cancelled = false;
    const loadPoliName = async () => {
      const code = poliCode || "";
      if (!code) {
        if (!cancelled) setPoliName("");
        return;
      }
      if (poliName) return;
      let name = "";
      try {
        const resp = await axios.get("/api/poliklinik", {
          params: { q: code, start: 0, limit: 50 },
          withCredentials: true,
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
        });
        const list = resp?.data?.list || [];
        const item = Array.isArray(list)
          ? list.find((r) => String(r.kd_poli || "") === String(code))
          : null;
        name = item?.nm_poli || "";
      } catch (_) {}
      if (!cancelled) setPoliName(name);
    };
    loadPoliName();
    return () => { cancelled = true; };
  }, [poliCode]);

  const pages = useMemo(() => {
    const arr = [];
    const openResep = () =>
      setIndex((i) => {
        const idx = arr.findIndex((p) => p.key === "resep");
        setDir(idx > i ? 1 : -1);
        return idx;
      });

    arr.push({
      key: "new-cppt",
      title: "New CPPT SOAP",
      render: () => (
        <NewCpptSoap
          token={token}
          noRkmMedis={noRkmMedis}
          noRawat={noRawat}
          onOpenResep={openResep}
        />
      ),
    });
    arr.push({
      key: "tarif",
      title: "Tarif/Tindakan",
      render: () => (
        <NewTarifTindakan token={token} noRkmMedis={noRkmMedis} noRawat={noRawat} />
      ),
    });

    arr.push({
      key: "resep",
      title: "Resep Obat",
      render: () => (
        <NewResep token={token} noRkmMedis={noRkmMedis} noRawat={noRawat} kdPoli={poliCode || kdPoli} />
      ),
    });

    arr.push({
      key: "lab",
      title: "Permintaan Lab",
      render: () => (
        <NewPermintaanLab token={token} noRkmMedis={noRkmMedis} noRawat={noRawat} />
      ),
    });

    return arr;
  }, [token, noRkmMedis, noRawat, kdPoli, poliCode]);

  const prev = () =>
    setIndex((i) => {
      const ni = i > 0 ? i - 1 : pages.length - 1;
      setDir(ni > i ? 1 : -1);
      return ni;
    });
  const next = () =>
    setIndex((i) => {
      const ni = i < pages.length - 1 ? i + 1 : 0;
      setDir(ni > i ? 1 : -1);
      return ni;
    });

  const handleDragEnd = (_, info) => {
    const dx = info?.offset?.x || 0;
    const vx = info?.velocity?.x || 0;
    if (dx > dragThreshold || vx > 400) {
      next();
      return;
    }
    if (dx < -dragThreshold || vx < -400) {
      prev();
      return;
    }
  };

  const pageVariants = createPageVariants(prefersReducedMotion);

  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") {
        setIsOpen(false);
        setTimeout(() => {
          try {
            router.visit(route("rawat-jalan.index"));
          } catch (err) {
            router.visit("/rawat-jalan");
          }
        }, 250);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <LanjutanRalanLayout title="Rawat Jalan" menuConfig={{}} context="ralan">
      <Head title="Canvas Rawat Jalan" />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[oklch(14.5%_0_0_/_0.5)] backdrop-blur-md flex items-center justify-center p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
          >
          <motion.div
            className="w-full max-w-[99vw] sm:max-w-[98.5vw] lg:max-w-[99vw] xl:max-w-[99.5vw] max-h-[97vh] grid grid-cols-10 gap-2 transform-gpu will-change-transform will-change-opacity"
            initial={{ scale: 0.992, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.992, y: 10 }}
            transition={overlayTransition}
          >
              <div className="col-span-1 flex items-center justify-center">
                <motion.button
                  type="button"
                  onClick={prev}
                  className="h-10 w-10 rounded-full bg-neutral-900/70 border border-[oklch(84.1%_0.238_128.85)] text-[oklch(98.5%_0_0)] shadow-[0_0_10px_oklch(84.1%_0.238_128.85_/_0.45)] hover:bg-neutral-800"
                  aria-label="Sebelumnya"
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  whileTap="tap"
                  variants={hoverTapVariants}
                >
                  &lt;
                </motion.button>
              </div>

              <div className="col-span-8">
                <div className="relative overflow-hidden rounded-xl bg-[oklch(14.5%_0_0_/_0.95)] text-[oklch(14.5%_0_0)] backdrop-blur-sm border border-[oklch(84.1%_0.238_128.85)] shadow-[0_0_20px_oklch(84.1%_0.238_128.85_/_0.25)] font-mono">
                  <motion.div className="flex items-center justify-between px-4 py-3 border-b border-[oklch(84.1%_0.238_128.85_/_0.7)]" initial="initial" whileHover="hover" whileTap="tap">
                    <div className="flex items-center gap-2">
                      <motion.div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[oklch(84.1%_0.238_128.85)] text-[oklch(14.5%_0_0)] shadow-[0_0_12px_oklch(84.1%_0.238_128.85_/_0.45)]" variants={headerItemVariants}>
                        <span className="text-xs font-bold">IT</span>
                      </motion.div>
                      <motion.div className="text-sm font-semibold text-[oklch(98.5%_0_0)]" variants={headerItemVariants}>
                        {pages[index].title}
                      </motion.div>
                    </div>
                    <motion.div className="flex items-center gap-2 cursor-grab active:cursor-grabbing" drag="x" dragConstraints={{ left: -60, right: 60 }} dragElastic={0.12} dragMomentum={false} onDragEnd={handleDragEnd}>
                      <div className="text-xs text-[oklch(98.5%_0_0)]">
                        {new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          setTimeout(() => {
                            try {
                              router.visit(route('rawat-jalan.index'));
                            } catch (e) {
                              router.visit('/rawat-jalan');
                            }
                          }, 250);
                        }}
                        className="p-1 rounded-md hover:bg-neutral-800 transition-colors border border-[oklch(84.1%_0.238_128.85)] text-[oklch(14.5%_0_0)] shadow-[0_0_10px_oklch(84.1%_0.238_128.85_/_0.45)]"
                        aria-label="Tutup"
                        title="Tutup"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4 text-[oklch(98.5%_0_0)]"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  </motion.div>

                  <div className="px-4 py-2 border-b border-[oklch(84.1%_0.238_128.85_/_0.35)] text-[oklch(98.5%_0_0)]">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-medium mb-1">Identitas Pasien</div>
                      <button
                        type="button"
                        onClick={() => setIdentityOpen((v) => !v)}
                        className="p-1 rounded-md hover:bg-neutral-800 transition-colors border border-[oklch(84.1%_0.238_128.85)] text-[oklch(98.5%_0_0)]"
                        aria-label={identityOpen ? "Collapse" : "Expand"}
                        title={identityOpen ? "Sembunyikan" : "Tampilkan"}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          {identityOpen ? (
                            <path d="M18 15l-6-6-6 6" />
                          ) : (
                            <path d="M6 9l6 6 6-6" />
                          )}
                        </svg>
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {identityOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={contentSpring}
                        >
                          <div className="grid grid-cols-2 gap-x-4 space-y-0.5 text-[12px] leading-tight">
                            <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                              <span className="text-left">Nama</span>
                              <span className="text-center">:</span>
                              <span className="font-semibold">{patientInfo.name || "-"}</span>
                            </div>
                            <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                              <span className="text-left">No. Rawat</span>
                              <span className="text-center">:</span>
                              <span className="font-semibold">{noRawat || "-"}</span>
                            </div>
                            <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                              <span className="text-left">Tanggal Lahir</span>
                              <span className="text-center">:</span>
                              <span className="font-semibold">{formatDateId(patientInfo.birth)}</span>
                            </div>
                            <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                              <span className="text-left">No. RM</span>
                              <span className="text-center">:</span>
                              <span className="font-semibold">{noRkmMedis || "-"}</span>
                            </div>
                            <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                              <span className="text-left">Umur</span>
                              <span className="text-center">:</span>
                              <span className="font-semibold">{patientInfo.age || "-"}</span>
                            </div>
                            <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                              <span className="text-left">Poli</span>
                              <span className="text-center">:</span>
                              <span className="font-semibold">{poliName || "-"}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="p-3 sm:p-4 overflow-y-auto max-h-[84vh]">
                    <AnimatePresence initial={false} mode="sync">
                      <motion.div
                        key={pages[index].key}
                        className="transform-gpu will-change-transform will-change-opacity"
                        variants={pageVariants}
                        custom={dir}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        style={{ transformOrigin: transformOriginForDir(dir) }}
                        transition={contentSpring}
                      >
                        {pages[index].render()}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="col-span-1 flex items-center justify-center">
                <motion.button
                  type="button"
                  onClick={next}
                  className="h-10 w-10 rounded-full bg-neutral-900/70 border border-[oklch(84.1%_0.238_128.85)] text-[oklch(98.5%_0_0)] shadow-[0_0_10px_oklch(84.1%_0.238_128.85_/_0.45)] hover:bg-neutral-800"
                  aria-label="Berikutnya"
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  whileTap="tap"
                  variants={hoverTapVariants}
                >
                  &gt;
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LanjutanRalanLayout>
  );
}
