import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import { overlayTransition, contentSpring, transformOriginForDir, createPageVariants, hoverTapVariants, headerItemVariants } from "@/tools/motion";
import { todayDateString } from "@/tools/datetime";
import { Head, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import LanjutanRalanLayout from "@/Layouts/LanjutanRalanLayout";
import NewCpptSoap from "./NewComponen/NewCpptSoap";
import NewTarifTindakan from "./NewComponen/NewTarifTindakan";
import NewResep from "./NewComponen/NewResep";
import NewPermintaanLab from "./NewComponen/NewPermintaanLab";
import NewDiagnosa from "./NewComponen/NewDiagnosa";
import OdontogramForm from "../Odontogram/odontogram";
import axios from "axios";
import SearchableSelect from "@/Components/SearchableSelect";
import { setRawatJalanFilters } from "@/tools/rawatJalanFilters";
import Icare from "./NewComponen/Icare";
import RiwayatKunjungan from "./components/RiwayatKunjungan";

export default function CanvasRajal({ token = "", noRkmMedis = "", noRawat = "", kdPoli = "", tab = "" }) {
  const [isOpen, setIsOpen] = useState(true);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const dragThreshold = 40;
  const [patientInfo, setPatientInfo] = useState({ name: "", birth: "", age: "" });
  const [poliName, setPoliName] = useState("");
  const [poliCode, setPoliCode] = useState(kdPoli || "");
  const [identityOpen, setIdentityOpen] = useState(false);
  const [cpptModalOpen, setCpptModalOpen] = useState(false);
  const [poliCalling, setPoliCalling] = useState(false);
  const [poliRepeatCalling, setPoliRepeatCalling] = useState(false);
  const [doctorCode, setDoctorCode] = useState("");
  const [bridgingOpen, setBridgingOpen] = useState(false);
  
  const [pcarePendaftaran, setPcarePendaftaran] = useState(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [rujukanActive, setRujukanActive] = useState(false);
  const [rujukanManual, setRujukanManual] = useState(false);
  const [kunjunganPreview, setKunjunganPreview] = useState(null);
  const [sendingKunjungan, setSendingKunjungan] = useState(false);
  const [kunjunganResult, setKunjunganResult] = useState(null);
  const [noKunjungan, setNoKunjungan] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [rujukForm, setRujukForm] = useState({ kdppk: "", tglEstRujuk: "", kdSubSpesialis1: "", kdSarana: "" });
  const [poliOptions, setPoliOptions] = useState([]);
  const [dokterOptions, setDokterOptions] = useState([]);
  const [kdTaccVisible, setKdTaccVisible] = useState(false);
  const [diagnosaLabel, setDiagnosaLabel] = useState("");
  const [taccError, setTaccError] = useState("");
  const [isDiagnosaNonSpesialis, setIsDiagnosaNonSpesialis] = useState(false);
  const [providerOptions, setProviderOptions] = useState([]);
  const [spesialisOptions, setSpesialisOptions] = useState([]);
  const [subSpesialisOptions, setSubSpesialisOptions] = useState([]);
  const [saranaOptions, setSaranaOptions] = useState([]);
  const [selectedSpesialis, setSelectedSpesialis] = useState("");
  
  const [bpjsNoPeserta, setBpjsNoPeserta] = useState("");
  const [bridgingVisible, setBridgingVisible] = useState(false);
  const [closeConfirmOpen, setCloseConfirmOpen] = useState(false);
  const [closeSubmitting, setCloseSubmitting] = useState(false);
  const [mcuData, setMcuData] = useState(null);
  const [loadingMcu, setLoadingMcu] = useState(false);
  const [mcuFormOpen, setMcuFormOpen] = useState(false);
  const [savingMcu, setSavingMcu] = useState(false);
  const [skriningData, setSkriningData] = useState(null);
  const [loadingSkrining, setLoadingSkrining] = useState(false);
  const [skriningError, setSkriningError] = useState('');
  const [mcuForm, setMcuForm] = useState({
    kdMCU: 0,
    noKunjungan: '',
    kdProvider: '',
    tglPelayanan: '',
    tekananDarahSistole: 0,
    tekananDarahDiastole: 0,
    radiologiFoto: null,
    darahRutinHemo: 0,
    darahRutinLeu: 0,
    darahRutinErit: 0,
    darahRutinLaju: 0,
    darahRutinHema: 0,
    darahRutinTrom: 0,
    lemakDarahHDL: 0,
    lemakDarahLDL: 0,
    lemakDarahChol: 0,
    lemakDarahTrigli: 0,
    gulaDarahSewaktu: 0,
    gulaDarahPuasa: 0,
    gulaDarahPostPrandial: 0,
    gulaDarahHbA1c: 0,
    fungsiHatiSGOT: 0,
    fungsiHatiSGPT: 0,
    fungsiHatiGamma: 0,
    fungsiHatiProtKual: 0,
    fungsiHatiAlbumin: 0,
    fungsiGinjalCrea: 0,
    fungsiGinjalUreum: 0,
    fungsiGinjalAsam: 0,
    fungsiJantungABI: 0,
    fungsiJantungEKG: null,
    fungsiJantungEcho: null,
    funduskopi: null,
    pemeriksaanLain: null,
    keterangan: null,
  });

  useEffect(() => {
    const refreshBridgingVisible = async () => {
      if (!noRawat) { setBridgingVisible(false); return; }
      try {
        const res = await fetch(`/api/pcare/pendaftaran/rawat/${encodeURIComponent(noRawat)}`, {
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          credentials: "include",
        });
        if (res.status === 401) { setBridgingVisible(false); return; }
        const json = await res.json();
        const data = json?.data || null;
        setBridgingVisible(!!(data && String(data.status) === "Terkirim"));
      } catch (_) {
        setBridgingVisible(false);
      }
    };
    refreshBridgingVisible();
    // expose method on window for child callbacks (optional)
    try { window.__refreshBridgingVisible = refreshBridgingVisible; } catch {}
  }, [noRawat]);

  useEffect(() => {
    const loadNoKunjungan = async () => {
      if (!noRawat || !bridgingVisible) return;
      try {
        const res = await fetch(`/api/pcare/kunjungan/nokunjungan/${encodeURIComponent(noRawat)}`, {
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          credentials: "include",
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.noKunjungan) {
            setNoKunjungan(json.noKunjungan);
            setKunjunganPreview((prev) => prev ? { ...prev, noKunjungan: json.noKunjungan } : prev);
          }
        }
      } catch (_) {}
    };
    loadNoKunjungan();
  }, [noRawat, bridgingVisible]);

  // Load MCU data when bridging modal opens and noKunjungan is available
  useEffect(() => {
    const loadMcuData = async () => {
      const currentNoKunjungan = noKunjungan || (kunjunganPreview && kunjunganPreview.noKunjungan);
      if (!bridgingOpen || !currentNoKunjungan) {
        setMcuData(null);
        return;
      }
      
      setLoadingMcu(true);
      try {
        const res = await axios.get(`/api/pcare/mcu/kunjungan/${encodeURIComponent(currentNoKunjungan)}`, {
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          withCredentials: true,
        });
        
        if (res.status === 200 && res.data && res.data.response) {
          setMcuData(res.data.response);
        } else {
          setMcuData(null);
        }
      } catch (_error) {
        // Jika error, set null (MCU mungkin tidak tersedia)
        setMcuData(null);
      } finally {
        setLoadingMcu(false);
      }
    };
    
    loadMcuData();
  }, [bridgingOpen, noKunjungan, kunjunganPreview]);

  // Load Skrining Riwayat Kesehatan data when bridging modal opens and bpjsNoPeserta is available
  useEffect(() => {
    const loadSkriningData = async () => {
      const currentNoPeserta = bpjsNoPeserta 
        || (pcarePendaftaran && (pcarePendaftaran.noKartu || pcarePendaftaran.no_kartu))
        || (kunjunganPreview && kunjunganPreview.noKartu);
      if (!bridgingOpen || !currentNoPeserta) {
        setSkriningData(null);
        setSkriningError('');
        return;
      }
      
      setLoadingSkrining(true);
      setSkriningError('');
      try {
        // BPJS API tidak menerima start=0, minimal harus 1
        const res = await axios.get(`/api/pcare/skrining/peserta/${encodeURIComponent(currentNoPeserta)}/1/10`, {
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          withCredentials: true,
        });
        
        // Cek apakah response berhasil dan memiliki data
        if (res.status === 200 && res.data) {
          // Cek metaData code untuk memastikan sukses
          const metaCode = res.data?.metaData?.code;
          if (metaCode === 200 && res.data.response && res.data.response.list) {
            setSkriningData(res.data.response);
            setSkriningError('');
          } else {
            // Jika metaData code bukan 200, ada error dari BPJS
            const errorMsg = res.data?.metaData?.message || 'Data tidak tersedia';
            if (errorMsg.includes('not registered') || errorMsg.includes('Unauthorized')) {
              setSkriningError('Layanan Skrining Riwayat Kesehatan tidak terdaftar untuk PPK ini.');
            } else {
              setSkriningError(errorMsg);
            }
            setSkriningData(null);
          }
        } else {
          const errorMsg = res.data?.metaData?.message || 'Gagal memuat data';
          setSkriningError(errorMsg);
          setSkriningData(null);
        }
      } catch (error) {
        // Cek apakah error dari BPJS API
        const errorResponse = error?.response?.data;
        const errorMsg = errorResponse?.metaData?.message || error?.message || '';
        
        if (errorMsg.includes('not registered') || errorMsg.includes('Unauthorized')) {
          setSkriningError('Layanan Skrining Riwayat Kesehatan tidak terdaftar untuk PPK ini.');
        } else if (errorResponse?.metaData?.message) {
          setSkriningError(errorResponse.metaData.message);
        } else if (errorMsg) {
          setSkriningError(errorMsg);
        } else {
          setSkriningError('Terjadi kesalahan saat memuat data Skrining Riwayat Kesehatan');
        }
        setSkriningData(null);
      } finally {
        setLoadingSkrining(false);
      }
    };
    
    loadSkriningData();
  }, [bridgingOpen, bpjsNoPeserta, pcarePendaftaran, kunjunganPreview]);

  useEffect(() => {
    const preloadKdProvider = async () => {
      try {
        const res = await axios.get('/api/pcare/config/kd-provider', {
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
          withCredentials: true,
        });
        if (res.status === 200 && res.data && typeof res.data.kdProvider === 'string') {
          setMcuForm((p) => ({ ...p, kdProvider: res.data.kdProvider || '' }));
        }
      } catch (_) {
        // ignore
      }
    };
    preloadKdProvider();
  }, []);

  useEffect(() => {
    const loadKdProvider = async () => {
      if (!mcuFormOpen) return;
      setMcuForm((p) => ({ ...p, tglPelayanan: p.tglPelayanan || todayDateString() }));
      try {
        const res = await axios.get('/api/pcare/config/kd-provider', {
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
          withCredentials: true,
        });
        if (res.status === 200 && res.data && typeof res.data.kdProvider === 'string') {
          setMcuForm((p) => ({ ...p, kdProvider: res.data.kdProvider || '' }));
        }
      } catch (_) {
        // ignore
      }
    };
    loadKdProvider();
  }, [mcuFormOpen]);

  const REF_TACC = useMemo(() => ([
    { kdTacc: -1, nmTacc: "Tanpa TACC", alasanTacc: [] },
    { kdTacc: 1, nmTacc: "Time", alasanTacc: ["< 3 Hari", ">= 3 - 7 Hari", ">= 7 Hari"] },
    { kdTacc: 2, nmTacc: "Age", alasanTacc: ["< 1 Bulan", ">= 1 Bulan s/d < 12 Bulan", ">= 1 Tahun s/d < 5 Tahun", ">= 5 Tahun s/d < 12 Tahun", ">= 12 Tahun s/d < 55 Tahun", ">= 55 Tahun"] },
    { kdTacc: 3, nmTacc: "Complication", alasanTacc: [] },
    { kdTacc: 4, nmTacc: "Comorbidity", alasanTacc: ["< 3 Hari", ">= 3 - 7 Hari", ">= 7 Hari"] },
  ]), []);

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
        const kdDokter = (regData?.kd_dokter ?? regData?.dokter?.kd_dokter ?? "").toString();
        let noka = (regData?.no_peserta ?? regData?.pasien?.no_peserta ?? "").toString();
        if (!noka && noRawat) {
          try {
            const respPcare = await axios.get(`/api/pcare/pendaftaran/rawat/${encodeURIComponent(noRawat)}`, {
              withCredentials: true,
              headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            });
            const d = respPcare?.data?.data || null;
            noka = (d?.noKartu ?? d?.no_kartu ?? "").toString();
          } catch (_) {}
        }
        if (!cancelled) {
          setPoliCode(kd);
          if (nm) setPoliName(nm);
          setDoctorCode(kdDokter);
          setBpjsNoPeserta(noka);
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
          onOpenBridging={() => openBridgingModal()}
          onPcareUpdated={() => {
            try {
              if (typeof window !== 'undefined' && typeof window.__refreshBridgingVisible === 'function') {
                window.__refreshBridgingVisible();
              }
            } catch {}
          }}
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
      key: "diagnosa",
      title: "Diagnosa (ICD)",
      render: () => (
        <NewDiagnosa noRawat={noRawat} />
      ),
    });

    arr.push({
      key: "odontogram",
      title: "Odontogram",
      render: () => (
        <OdontogramForm noRawat={noRawat} />
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

  useEffect(() => {
    const t = typeof tab === "string" ? tab.trim() : "";
    if (!t) {
      try {
        const u = new URL(window.location.href);
        const q = u.searchParams.get("tab") || u.searchParams.get("page") || "";
        if (q) {
          const idx = pages.findIndex((p) => p.key === q);
          if (idx >= 0) setIndex(idx);
        }
      } catch {}
      return;
    }
    const idx = pages.findIndex((p) => p.key === t);
    if (idx >= 0) setIndex(idx);
  }, [tab, pages]);

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

  const openCpptModal = () => {
    setCpptModalOpen(true);
  };

  const openBridgingModal = async () => {
    setBridgingOpen(true);
    setIsEditMode(false); // Reset mode edit saat modal dibuka
    try {
      setKunjunganResult(null);
      try { await toggleKunjungan(true); } catch {}
      
      // Ambil noKunjungan dari endpoint baru
      try {
        const nkRes = await fetch(`/api/pcare/kunjungan/nokunjungan/${encodeURIComponent(noRawat)}`, {
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          credentials: "include",
        });
        if (nkRes.ok) {
          const nkJson = await nkRes.json();
          if (nkJson.success && nkJson.noKunjungan) {
            setNoKunjungan(nkJson.noKunjungan);
            setKunjunganPreview((prev) => prev ? { ...prev, noKunjungan: nkJson.noKunjungan } : prev);
          }
        }
      } catch (_) {}
      
      const res = await fetch(`/api/pcare/pendaftaran/rawat/${encodeURIComponent(noRawat)}`, {
        headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
        credentials: "include",
      });
      const json = await res.json();
      const data = json && json.data ? json.data : null;
      setPcarePendaftaran(data);
      const shouldFetchRujuk = (rujukanManual === true) || (kunjunganPreview && String(kunjunganPreview.kdStatusPulang || '') === '4');
      if (shouldFetchRujuk) {
        try {
          const rujukRes = await fetch(`/api/pcare/rujuk-subspesialis/rawat/${encodeURIComponent(noRawat)}`, {
            headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            credentials: "include",
          });
          if (rujukRes.ok) {
            const rujukJson = await rujukRes.json();
            const rujukData = rujukJson.data || null;
            if (rujukData) {
              // no-op: data tersedia bila memang ada rujukan
            }
          }
        } catch {}
      }
      const needPoli = poliOptions.length === 0;
      const needDokter = dokterOptions.length === 0;
      const needSpesialis = spesialisOptions.length === 0;
      const needSarana = saranaOptions.length === 0;
      const tasks = [];
      const params200 = new URLSearchParams({ start: 0, limit: 200 });
      if (needPoli) tasks.push(fetch(`/api/pcare/poli?${params200.toString()}`, { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, credentials: "include" }));
      if (needDokter) tasks.push(fetch(`/api/pcare/dokter?${params200.toString()}`, { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, credentials: "include" }));
      if (needSpesialis) tasks.push(fetch(`/api/pcare/spesialis`, { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, credentials: "include" }));
      if (needSarana) tasks.push(fetch(`/api/pcare/spesialis/sarana`, { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, credentials: "include" }));
      if (tasks.length > 0) {
        try {
          const results = await Promise.all(tasks);
          let idx = 0;
          if (needPoli) {
            const r = results[idx++];
            const j = await r.json();
            const list = j?.response?.list || j?.list || j?.data || [];
            setPoliOptions(list.map((row) => ({ value: row?.kdPoli || row?.kode || "", label: row?.nmPoli || row?.nama || "" })));
          }
          if (needDokter) {
            const r = results[idx++];
            const j = await r.json();
            const list = j?.response?.list || j?.list || j?.data || [];
            setDokterOptions(list.map((row) => ({ value: row?.kdDokter || row?.kdProvider || row?.kdDok || row?.kode || "", label: row?.nmDokter || row?.nmProvider || row?.nama || "" })));
          }
          if (needSpesialis) {
            const r = results[idx++];
            const j = await r.json();
            const list = j?.response?.list || [];
            setSpesialisOptions(list.map((row) => ({ value: row.kdSpesialis, label: `${row.kdSpesialis || ""} — ${row.nmSpesialis || ""}` })));
          }
          if (needSarana) {
            const r = results[idx++];
            const j = await r.json();
            const list = j?.response?.list || [];
            setSaranaOptions(list.map((row) => ({ value: row.kdSarana, label: `${row.kdSarana || ""} — ${row.nmSarana || ""}` })));
            setRujukForm((p) => ({ ...p, kdSarana: p.kdSarana || "1" }));
          }
        } catch {
          if (needPoli) setPoliOptions([]);
          if (needDokter) setDokterOptions([]);
          if (needSpesialis) setSpesialisOptions([]);
          if (needSarana) setSaranaOptions([]);
        }
      }
    } catch (_e) {
    }
  };

  const closeBridgingModal = () => {
    setBridgingOpen(false);
    setIsUnauthorized(false);
    setRujukanActive(false);
    setRujukanManual(false);
    setKunjunganPreview(null);
    setKunjunganResult(null);
    setIsEditMode(false); // Reset mode edit saat modal ditutup
    setSelectedSpesialis("");
    setSubSpesialisOptions([]);
  };

  const hapusPendaftaranPcare = async () => {
    try {
      const ok = typeof window !== 'undefined' ? window.confirm('Yakin ingin menghapus pendaftaran PCare?') : true;
      if (!ok) return;
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        await new Promise((r) => setTimeout(r, 200));
      } catch (_) {}
      await axios({
        method: 'DELETE',
        url: '/api/pcare/pendaftaran',
        data: { no_rawat: noRawat },
        withCredentials: true,
        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      });
      setPcarePendaftaran(null);
      setBridgingVisible(false);
      closeBridgingModal();
    } catch (_) {}
  };

  const toInputDate = (ddmmyyyy) => {
    if (!ddmmyyyy || typeof ddmmyyyy !== "string") return "";
    const parts = ddmmyyyy.split("-");
    if (parts.length !== 3) return "";
    const [dd, mm, yyyy] = parts;
    const d = dd.padStart(2, "0");
    const m = mm.padStart(2, "0");
    return `${yyyy}-${m}-${d}`;
  };

  const fromInputDate = (iso) => {
    if (!iso || typeof iso !== "string") return null;
    const parts = iso.split("-");
    if (parts.length !== 3) return null;
    const [yyyy, mm, dd] = parts;
    const d = dd.padStart(2, "0");
    const m = mm.padStart(2, "0");
    return `${d}-${m}-${yyyy}`;
  };

  const updateKunjunganField = (key, value, type = "text") => {
    setKunjunganPreview((prev) => {
      if (!prev) return prev;
      let val = value;
      if (type === "int") {
        const n = parseInt(value, 10);
        val = isNaN(n) ? "" : n;
      } else if (type === "float") {
        const f = parseFloat(value);
        val = isNaN(f) ? "" : f;
      }
      return { ...prev, [key]: val };
    });
  };

  const toggleKunjungan = async (checked) => {
    setKunjunganResult(null);
    if (checked) {
      try {
        const res = await fetch(`/api/pcare/kunjungan/preview/${encodeURIComponent(noRawat)}`, {
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          credentials: "include",
        });
        if (res.status === 401) {
          setIsUnauthorized(true);
          setKunjunganPreview(null);
          return;
        } else {
          setIsUnauthorized(false);
        }
        const json = await res.json();
        if (json && json.success) {
          const payload = json.payload || {};
          const withDefaults = {
            ...payload,
            kdSadar: payload.kdSadar ?? "01",
            nmSadar: payload.nmSadar ?? "Compos mentis",
            kdStatusPulang: "3",
            nmStatusPulang: payload.nmStatusPulang ?? "Berobat Jalan",
            kdPrognosa: payload.kdPrognosa ?? "02",
            nmPrognosa: payload.nmPrognosa ?? "Bonam (Baik)",
            alergiMakan: payload.alergiMakan ?? "00",
            alergiUdara: payload.alergiUdara ?? "00",
            alergiObat: payload.alergiObat ?? "00",
            nmAlergi: payload.nmAlergi ?? "Tidak Ada",
          };
          setKunjunganPreview(withDefaults);
        } else {
          setKunjunganPreview(null);
        }
      } catch {
        setKunjunganPreview(null);
      }
    } else {
      setKunjunganPreview(null);
    }
  };

  useEffect(() => {
    if (!kunjunganPreview) {
      setRujukanActive(false);
      return;
    }
    const k = kunjunganPreview.kdStatusPulang ? String(kunjunganPreview.kdStatusPulang) : "";
    const derived = k === "4";
    const finalActive = rujukanManual || derived;
    setRujukanActive(finalActive);
    if (!finalActive) {
      setRujukForm({ kdppk: "", tglEstRujuk: "", kdSubSpesialis1: "", kdSarana: "" });
      setProviderOptions([]);
    }
  }, [kunjunganPreview?.kdStatusPulang, rujukanManual]);

  useEffect(() => {
    const loadSubSpesialis = async () => {
      if (!selectedSpesialis) { setSubSpesialisOptions([]); return; }
      try {
        const params = new URLSearchParams({ kdSpesialis: selectedSpesialis });
        const ssRes = await fetch(`/api/pcare/spesialis/subspesialis?${params.toString()}`, { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, credentials: "include" });
        const ssJson = await ssRes.json();
        const ssList = ssJson?.response?.list || [];
        setSubSpesialisOptions(ssList.map((row) => ({ value: row.kdSubSpesialis, label: `${row.kdSubSpesialis || ""} — ${row.nmSubSpesialis || ""}` })));
      } catch { setSubSpesialisOptions([]); }
    };
    loadSubSpesialis();
  }, [selectedSpesialis]);

  useEffect(() => {
    const loadProviders = async () => {
      const kdSub = rujukForm.kdSubSpesialis1;
      const kdSa = rujukForm.kdSarana;
      const tglIso = rujukForm.tglEstRujuk;
      if (!kdSub || !kdSa || !tglIso) { setProviderOptions([]); setRujukForm((p) => ({ ...p, kdppk: "" })); return; }
      const tglParam = fromInputDate(tglIso);
      if (!tglParam) { setProviderOptions([]); setRujukForm((p) => ({ ...p, kdppk: "" })); return; }
      try {
        const url = `/api/pcare/spesialis/rujuk/subspesialis/${encodeURIComponent(kdSub)}/sarana/${encodeURIComponent(kdSa)}/tglEstRujuk/${encodeURIComponent(tglParam)}`;
        const res = await fetch(url, { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, credentials: "include" });
        const json = await res.json();
        const list = json?.response?.list || [];
        const DAY_ORDER = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"];
        const parseJadwal = (text) => {
          const result = {};
          if (!text || typeof text !== "string") return result;
          const re = /(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu)\s*:/gi;
          let match;
          const segments = [];
          while ((match = re.exec(text)) !== null) { segments.push({ day: match[1], start: match.index, end: null }); }
          for (let i = 0; i < segments.length; i++) { segments[i].end = i < segments.length - 1 ? segments[i + 1].start : text.length; }
          segments.forEach(seg => {
            const raw = text.slice(seg.start, seg.end);
            const parts = raw.split(":");
            const dayLabel = parts[0];
            const rest = parts[1];
            if (!dayLabel || !rest) return;
            const day = dayLabel.trim();
            const times = rest.replace(/\n/g, " ").split(/[,;]+/).map(s => s.trim()).filter(Boolean);
            if (times.length) { result[day] = times; }
          });
          return result;
        };
        const newOptions = list.map((row) => {
          const jadwalParsed = parseJadwal(row.jadwal);
          return {
            value: row.kdppk,
            label: `${row.kdppk || ""} — ${row.nmppk || ""}${row.nmkc ? ` (${row.nmkc}${row.kelas ? `, Kelas ${row.kelas}` : ""})` : (row.kelas ? ` (Kelas ${row.kelas})` : "")}`,
            meta: { nmppk: row.nmppk, alamat: row.alamatPpk, telp: row.telpPpk, kelas: row.kelas, nmkc: row.nmkc, jadwal: row.jadwal, jadwalParsed, kapasitas: row.kapasitas, persentase: row.persentase, jmlRujuk: row.jmlRujuk, distance: row.distance, dayOrder: DAY_ORDER },
          };
        });
        setProviderOptions(newOptions);
        if (rujukForm.kdppk) {
          const stillExists = newOptions.some((opt) => String(opt.value) === String(rujukForm.kdppk));
          if (!stillExists) { setRujukForm((p) => ({ ...p, kdppk: "" })); }
        }
      } catch { setProviderOptions([]); }
    };
    loadProviders();
  }, [rujukForm.kdSubSpesialis1, rujukForm.kdSarana, rujukForm.tglEstRujuk]);

  const sendKunjungan = async () => {
    if (!kunjunganPreview) return;
    setSendingKunjungan(true);
    setKunjunganResult(null);
    setTaccError("");
    
    // Gunakan data dari kunjunganPreview yang sudah diubah oleh user
    const payload = { ...kunjunganPreview };
    if (noRawat) payload.no_rawat = noRawat;
    
    // Jika mode edit, pastikan noKunjungan ada
    if (isEditMode) {
      if (!noKunjungan && !payload.noKunjungan) {
        setKunjunganResult({ success: false, message: 'NoKunjungan belum tersedia untuk edit.' });
        setSendingKunjungan(false);
        return;
      }
      payload.noKunjungan = noKunjungan || payload.noKunjungan;
    }
    if (isDiagnosaNonSpesialis) {
      const v = payload.kdTacc;
      const isEmpty = v === undefined || v === null || v === "" || String(v).trim() === "";
      const isMinusOne = v === -1 || v === "-1" || v === 0 || v === "0";
      const isValidTacc = v === 1 || v === 2 || v === 3 || v === 4 || v === "1" || v === "2" || v === "3" || v === "4";
      if (isEmpty || isMinusOne || !isValidTacc) { setTaccError("KD TACC wajib diisi untuk diagnosa NonSpesialis."); setSendingKunjungan(false); return; }
      const alasan = payload.alasanTacc;
      const alasanEmpty = alasan === undefined || alasan === null || String(alasan).trim() === "";
      if (alasanEmpty) { setTaccError("Alasan TACC wajib diisi saat KD TACC dipilih."); setSendingKunjungan(false); return; }
    }
    const isMinusOne = payload.kdTacc === -1 || payload.kdTacc === "-1";
    const isEmptyTacc = payload.kdTacc === undefined || payload.kdTacc === null || payload.kdTacc === "";
    if (isEmptyTacc || isMinusOne) { payload.kdTacc = -1; payload.alasanTacc = null; } else { if (payload.alasanTacc === undefined || payload.alasanTacc === null) { payload.alasanTacc = ""; } if (payload.kdTacc === -1 || payload.kdTacc === "-1") { payload.alasanTacc = null; } }
    const fmtDate = (d) => { if (!d) return null; try { const dt = new Date(d); const dd = String(dt.getDate()).padStart(2, "0"); const mm = String(dt.getMonth() + 1).padStart(2, "0"); const yyyy = dt.getFullYear(); return `${dd}-${mm}-${yyyy}`; } catch { return d; } };
    
    // Handle rujukLanjut: jika rujukan aktif dan ada kdppk, set rujukLanjut; jika tidak, hapus/null
    if (rujukanActive && rujukForm.kdppk) {
      const selectedSubSp = subSpesialisOptions.find(opt => String(opt.value) === String(rujukForm.kdSubSpesialis1));
      const nmSubSpesialis = selectedSubSp ? (selectedSubSp.label.split(" — ")[1] || selectedSubSp.label || "").trim() : "";
      let nmPPK = "";
      const selectedProvider = providerOptions.find(opt => String(opt.value) === String(rujukForm.kdppk));
      if (selectedProvider) {
        const labelParts = selectedProvider.label.split(" — ");
        nmPPK = (labelParts.length > 1 ? labelParts[1] : labelParts[0] || "").trim();
        if (!nmPPK && selectedProvider.meta?.nmppk) nmPPK = String(selectedProvider.meta.nmppk).trim();
        if (!nmPPK && selectedProvider.meta?.nmProvider) nmPPK = String(selectedProvider.meta.nmProvider).trim();
      }
      
      // Bangun struktur rujukLanjut sesuai katalog BPJS Edit Kunjungan
      const rujukLanjutPayload = {
        kdppk: rujukForm.kdppk,
        tglEstRujuk: fmtDate(rujukForm.tglEstRujuk) || null,
        subSpesialis: null,
        khusus: null,
      };
      
      // Jika ada subSpesialis data, tambahkan ke payload
      if (rujukForm.kdSubSpesialis1 || rujukForm.kdSarana) {
        rujukLanjutPayload.subSpesialis = {
          kdSubSpesialis1: rujukForm.kdSubSpesialis1 || null,
          kdSarana: rujukForm.kdSarana || null,
        };
      }
      
      // Jika subSpesialis kosong, set null (sesuai katalog BPJS)
      if (!rujukLanjutPayload.subSpesialis || (!rujukLanjutPayload.subSpesialis.kdSubSpesialis1 && !rujukLanjutPayload.subSpesialis.kdSarana)) {
        rujukLanjutPayload.subSpesialis = null;
      }
      
      payload.rujukLanjut = rujukLanjutPayload;
      payload.nmSubSpesialis = nmSubSpesialis;
      payload.nmPPK = nmPPK;
    } else {
      // Jika tidak ada rujukan aktif atau kdppk kosong, hapus rujukLanjut dari payload
      // Ini penting untuk edit: jika sebelumnya rujukan, sekarang tidak, harus hapus rujukLanjut
      delete payload.rujukLanjut;
      delete payload.nmSubSpesialis;
      delete payload.nmPPK;
    }
    // Tentukan method berdasarkan mode edit
    const method = isEditMode ? "PUT" : "POST";
    
    try {
      // Refresh CSRF cookie sebelum request
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        await new Promise((r) => setTimeout(r, 200));
      } catch (_) {}
      
      const res = await axios({
        method: method,
        url: "/api/pcare/kunjungan",
        data: payload,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      });
      const json = res.data || {};
      const resStatus = res.status;
      
      if (resStatus >= 200 && resStatus < 300) {
        let nk = "";
        if (!isEditMode) {
          // Untuk POST, ambil noKunjungan dari response
          const r = json && typeof json === "object" ? (json.response || json) : null;
          if (r && Array.isArray(r) && r[0]) {
            if (typeof r[0].noKunjungan === "string") nk = String(r[0].noKunjungan);
            else if (r[0].field === "noKunjungan" && r[0].message) nk = String(r[0].message);
          } else if (r && typeof r === "object") {
            if (typeof r.noKunjungan === "string") nk = String(r.noKunjungan);
            else if (r.field === "noKunjungan" && r.message) nk = String(r.message);
          }
          
          if (!nk) {
            // Jika tidak ditemukan di response langsung, coba ambil dari endpoint
            try {
              const nkRes = await axios.get(`/api/pcare/kunjungan/nokunjungan/${encodeURIComponent(noRawat)}`, {
                headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
                withCredentials: true,
              });
              if (nkRes.status === 200 && nkRes.data && nkRes.data.success && nkRes.data.noKunjungan) {
                nk = nkRes.data.noKunjungan;
              }
            } catch (_) {}
          }
          
          if (nk) {
            setNoKunjungan(nk);
            setKunjunganPreview((prev) => prev ? { ...prev, noKunjungan: nk } : prev);
          }
        } else {
          // Untuk PUT (edit), refresh noKunjungan dari endpoint
          try {
            const nkRes = await axios.get(`/api/pcare/kunjungan/nokunjungan/${encodeURIComponent(noRawat)}`, {
              headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
              withCredentials: true,
            });
            if (nkRes.status === 200 && nkRes.data && nkRes.data.success && nkRes.data.noKunjungan) {
              setNoKunjungan(nkRes.data.noKunjungan);
              setKunjunganPreview((prev) => prev ? { ...prev, noKunjungan: nkRes.data.noKunjungan } : prev);
            }
          } catch (_) {}
        }
        
        const msg = isEditMode 
          ? ((json && json.metaData && json.metaData.message) ? json.metaData.message : "OK")
          : (nk || ((json && json.response && json.response.message) ? json.response.message : "CREATED"));
        
        if (!isEditMode && payload.rujukLanjut && noRawat) {
          try {
            const rujukRes = await axios.get(`/api/pcare/rujuk-subspesialis/rawat/${encodeURIComponent(noRawat)}`, {
              headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
              withCredentials: true,
            });
            if (rujukRes.status === 200 && rujukRes.data) { }
          } catch { }
        }
        
        setKunjunganResult({ success: true, message: msg });
        
        // Keluar dari mode edit setelah berhasil update
        if (isEditMode) {
          setIsEditMode(false);
        }
      } else {
        const errMsg = (json && json.metaData && json.metaData.message) 
          ? json.metaData.message 
          : (isEditMode ? `Gagal update Kunjungan (${resStatus})` : `Gagal kirim Kunjungan (${resStatus})`);
        setKunjunganResult({ success: false, message: errMsg });
      }
    } catch (axiosError) {
      const resStatus = axiosError?.response?.status || 500;
      const json = axiosError?.response?.data || {};
      
      // Jika error 419, coba refresh CSRF dan retry sekali
      if (resStatus === 419) {
        try {
          await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
          await new Promise((r) => setTimeout(r, 300));
          
          const retryResponse = await axios({
            method: method,
            url: "/api/pcare/kunjungan",
            data: payload,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
            withCredentials: true,
          });
          
          const retryJson = retryResponse.data || {};
          const retryStatus = retryResponse.status;
          
          if (retryStatus >= 200 && retryStatus < 300) {
            const msg = isEditMode 
              ? ((retryJson && retryJson.metaData && retryJson.metaData.message) ? retryJson.metaData.message : "OK")
              : "CREATED";
            setKunjunganResult({ success: true, message: msg });
            
            if (isEditMode) {
              setIsEditMode(false);
            }
            return;
          }
        } catch (retryError) {
          const retryStatus = retryError?.response?.status || 500;
          const retryJson = retryError?.response?.data || {};
          const retryErrMsg = (retryJson && retryJson.metaData && retryJson.metaData.message) 
            ? retryJson.metaData.message 
            : (isEditMode ? `Gagal update Kunjungan setelah retry (${retryStatus})` : `Gagal kirim Kunjungan setelah retry (${retryStatus})`);
          setKunjunganResult({ success: false, message: retryErrMsg });
          return;
        }
      }
      
      // Ambil pesan error dari BPJS API jika ada
      let errMsg = isEditMode ? `Gagal update Kunjungan (${resStatus})` : `Gagal kirim Kunjungan (${resStatus})`;
      if (json && json.metaData && json.metaData.message) {
        errMsg = json.metaData.message;
      } else if (json && json.response && Array.isArray(json.response) && json.response.length > 0) {
        const firstError = json.response[0];
        if (firstError.message) {
          errMsg = firstError.message;
        } else if (firstError.field) {
          errMsg = `Error pada field ${firstError.field}`;
        }
      } else if (json && typeof json === 'object') {
        errMsg = json.message || json.error || errMsg;
      }
      
      setKunjunganResult({ success: false, message: errMsg });
    } finally {
      setSendingKunjungan(false);
    }
  };

  const handleKirimKunjunganPcare = async () => {
    try {
      if (!bridgingOpen) {
        await openBridgingModal();
      } else {
        await toggleKunjungan(true);
      }
      let tries = 0;
      while (!kunjunganPreview && tries < 15) {
        await new Promise((r) => setTimeout(r, 200));
        tries += 1;
      }
      await sendKunjungan();
    } catch (_) {}
  };

  const editKunjungan = async () => {
    if (!noRawat) return;
    
    // Cek apakah noKunjungan sudah ada
    let candidateNoKunjungan = noKunjungan || (kunjunganPreview && kunjunganPreview.noKunjungan) || '';
    
    if (!candidateNoKunjungan) {
      try {
        const nkRes = await axios.get(`/api/pcare/kunjungan/nokunjungan/${encodeURIComponent(noRawat)}`, {
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          withCredentials: true,
        });
        if (nkRes.status === 200 && nkRes.data && nkRes.data.success && nkRes.data.noKunjungan) {
          candidateNoKunjungan = nkRes.data.noKunjungan;
        }
      } catch (_) {}
    }
    
    if (!candidateNoKunjungan) {
      setKunjunganResult({ success: false, message: 'NoKunjungan belum tersedia untuk edit.' });
      return;
    }
    
    // Load preview data jika belum ada atau refresh jika sudah ada
    if (!kunjunganPreview) {
      try {
        const resPrev = await axios.get(`/api/pcare/kunjungan/preview/${encodeURIComponent(noRawat)}`, {
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          withCredentials: true,
        });
        if (resPrev.status === 200 && resPrev.data && resPrev.data.success) {
          const payload = resPrev.data.payload || {};
          setKunjunganPreview({ ...payload, noKunjungan: candidateNoKunjungan });
        }
      } catch (error) {
        setKunjunganResult({ success: false, message: `Gagal memuat preview: ${error.message || error}` });
        return;
      }
    } else {
      // Update noKunjungan di preview jika belum ada
      setKunjunganPreview((prev) => prev ? { ...prev, noKunjungan: candidateNoKunjungan } : prev);
      setNoKunjungan(candidateNoKunjungan);
    }
    
    // Aktifkan mode edit
    setIsEditMode(true);
    setKunjunganResult(null);
  };

  const deleteKunjungan = async () => {
    if (!noRawat) return;
    
    // Konfirmasi sebelum hapus
    const confirmed = typeof window !== 'undefined' 
      ? window.confirm('Yakin ingin menghapus kunjungan PCare? Tindakan ini tidak dapat dibatalkan.')
      : false;
    
    if (!confirmed) return;
    
    // Cek apakah noKunjungan sudah ada
    let candidateNoKunjungan = noKunjungan || (kunjunganPreview && kunjunganPreview.noKunjungan) || '';
    
    if (!candidateNoKunjungan) {
      try {
        const nkRes = await axios.get(`/api/pcare/kunjungan/nokunjungan/${encodeURIComponent(noRawat)}`, {
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          withCredentials: true,
        });
        if (nkRes.status === 200 && nkRes.data && nkRes.data.success && nkRes.data.noKunjungan) {
          candidateNoKunjungan = nkRes.data.noKunjungan;
        }
      } catch (_) {}
    }
    
    if (!candidateNoKunjungan) {
      setKunjunganResult({ success: false, message: 'NoKunjungan belum tersedia untuk dihapus.' });
      return;
    }
    
    setSendingKunjungan(true);
    setKunjunganResult(null);
    
    try {
      // Refresh CSRF cookie sebelum request
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        await new Promise((r) => setTimeout(r, 200));
      } catch (_) {}
      
      // Kirim DELETE request sesuai katalog BPJS: DELETE /kunjungan/{noKunjungan}
      const res = await axios.delete(`/api/pcare/kunjungan/${encodeURIComponent(candidateNoKunjungan)}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      });
      
      const json = res.data || {};
      const resStatus = res.status;
      
      if (resStatus >= 200 && resStatus < 300) {
        const msg = (json && json.metaData && json.metaData.message) ? json.metaData.message : "OK";
        setKunjunganResult({ success: true, message: msg });
        
        // Reset state setelah berhasil hapus
        setNoKunjungan("");
        setKunjunganPreview(null);
        setIsEditMode(false);
        
        // Refresh bridging visible status
        try {
          if (typeof window !== 'undefined' && typeof window.__refreshBridgingVisible === 'function') {
            window.__refreshBridgingVisible();
          }
        } catch (_) {}
      } else {
        const errMsg = (json && json.metaData && json.metaData.message) 
          ? json.metaData.message 
          : `Gagal hapus Kunjungan (${resStatus})`;
        setKunjunganResult({ success: false, message: errMsg });
      }
    } catch (axiosError) {
      const resStatus = axiosError?.response?.status || 500;
      const json = axiosError?.response?.data || {};
      
      // Jika error 419, coba refresh CSRF dan retry sekali
      if (resStatus === 419) {
        try {
          await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
          await new Promise((r) => setTimeout(r, 300));
          
          const retryResponse = await axios.delete(`/api/pcare/kunjungan/${encodeURIComponent(candidateNoKunjungan)}`, {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
            withCredentials: true,
          });
          
          const retryJson = retryResponse.data || {};
          const retryStatus = retryResponse.status;
          
          if (retryStatus >= 200 && retryStatus < 300) {
            const msg = (retryJson && retryJson.metaData && retryJson.metaData.message) ? retryJson.metaData.message : "OK";
            setKunjunganResult({ success: true, message: msg });
            
            // Reset state setelah berhasil hapus
            setNoKunjungan("");
            setKunjunganPreview(null);
            setIsEditMode(false);
            
            // Refresh bridging visible status
            try {
              if (typeof window !== 'undefined' && typeof window.__refreshBridgingVisible === 'function') {
                window.__refreshBridgingVisible();
              }
            } catch (_) {}
            return;
          }
        } catch (retryError) {
          const retryStatus = retryError?.response?.status || 500;
          const retryJson = retryError?.response?.data || {};
          const retryErrMsg = (retryJson && retryJson.metaData && retryJson.metaData.message) 
            ? retryJson.metaData.message 
            : `Gagal hapus Kunjungan setelah retry (${retryStatus})`;
          setKunjunganResult({ success: false, message: retryErrMsg });
          return;
        }
      }
      
      // Ambil pesan error dari BPJS API jika ada
      let errMsg = `Gagal hapus Kunjungan (${resStatus})`;
      if (json && json.metaData && json.metaData.message) {
        errMsg = json.metaData.message;
      } else if (json && json.response && Array.isArray(json.response) && json.response.length > 0) {
        const firstError = json.response[0];
        if (firstError.message) {
          errMsg = firstError.message;
        } else if (firstError.field) {
          errMsg = `Error pada field ${firstError.field}`;
        }
      } else if (json && typeof json === 'object') {
        errMsg = json.message || json.error || errMsg;
      }
      
      setKunjunganResult({ success: false, message: errMsg });
    } finally {
      setSendingKunjungan(false);
    }
  };

  const handlePanggilPasien = async () => {
    if (poliCalling) return;
    setPoliCalling(true);
    try {
      const no_rawat = noRawat || "";
      const kd_poli = poliCode || kdPoli || "";
      const kd_dokter = doctorCode || "";
      const payload = { no_rawat, kd_poli, kd_dokter, status: "1" };
      try {
        await axios.get("/sanctum/csrf-cookie", { withCredentials: true });
        await new Promise((r) => setTimeout(r, 150));
      } catch (_) {}
      try {
        await axios.post("/api/antrian-poli/call", payload, {
          withCredentials: true,
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
        });
      } catch (_) {}
      try {
        let no_reg_bc = "";
        try {
          const resAP = await axios.get("/api/antrian-poli", { headers: { Accept: "application/json" }, withCredentials: false });
          const dataAP = resAP?.data || {};
          const cardsAP = Array.isArray(dataAP.cards) ? dataAP.cards : [];
          const cardAP = cardsAP.find((c) => String(c.kd_poli || "") === String(kd_poli || "")) || null;
          const rowAP = cardAP && Array.isArray(cardAP.upcoming)
            ? cardAP.upcoming.find((r) => String(r.no_rawat || "") === String(no_rawat || ""))
            : null;
          no_reg_bc = String(rowAP?.no_reg || "");
          if (!no_reg_bc) {
            const h = dataAP.highlight || null;
            if (h && String(h.kd_poli || "") === String(kd_poli || "") && String(h.no_rawat || "") === String(no_rawat || "")) {
              no_reg_bc = String(h.no_reg || "");
            }
          }
        } catch (_) {}
        const bc = new BroadcastChannel("antrian-poli-call");
        bc.postMessage({
          no_rawat,
          kd_poli,
          kd_dokter,
          ts: Date.now(),
          no_reg: no_reg_bc,
          nm_pasien: patientInfo?.name || "",
          nm_poli: poliName || kd_poli || "",
          repeat: false,
        });
        bc.close();
      } catch (_) {}
    } catch (_) {
    } finally {
      setPoliCalling(false);
    }
  };

  const addMcu = async () => {
    const currentNoKunjungan = noKunjungan || (kunjunganPreview && kunjunganPreview.noKunjungan);
    if (!currentNoKunjungan) {
      alert('No Kunjungan belum tersedia. Silakan kirim kunjungan terlebih dahulu.');
      return;
    }

    setSavingMcu(true);
    try {
      // Refresh CSRF cookie sebelum request
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        await new Promise((r) => setTimeout(r, 200));
      } catch (_) {}

      // Format tanggal pelayanan dari input date ke format dd-mm-yyyy
      const formatDateForBPJS = (dateStr) => {
        if (!dateStr) return '';
        const parts = dateStr.split('-');
        if (parts.length === 3) {
          return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return dateStr;
      };

      const payload = {
        ...mcuForm,
        noKunjungan: currentNoKunjungan,
        tglPelayanan: formatDateForBPJS(mcuForm.tglPelayanan),
        // Convert empty strings to null for nullable fields
        radiologiFoto: mcuForm.radiologiFoto || null,
        fungsiJantungEKG: mcuForm.fungsiJantungEKG || null,
        fungsiJantungEcho: mcuForm.fungsiJantungEcho || null,
        funduskopi: mcuForm.funduskopi || null,
        pemeriksaanLain: mcuForm.pemeriksaanLain || null,
        keterangan: mcuForm.keterangan || null,
      };

      const res = await axios.post('/api/pcare/mcu', payload, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        withCredentials: true,
      });

      if (res.status >= 200 && res.status < 300) {
        // Reload data MCU setelah berhasil add
        const loadMcuData = async () => {
          setLoadingMcu(true);
          try {
            const mcuRes = await axios.get(`/api/pcare/mcu/kunjungan/${encodeURIComponent(currentNoKunjungan)}`, {
              headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
              withCredentials: true,
            });
            
            if (mcuRes.status === 200 && mcuRes.data && mcuRes.data.response) {
              setMcuData(mcuRes.data.response);
            }
          } catch (_) {}
          finally {
            setLoadingMcu(false);
          }
        };
        
        await loadMcuData();
        
        // Reset form dan tutup popup
        setMcuForm({
          kdMCU: 0,
          noKunjungan: '',
          kdProvider: '',
          tglPelayanan: '',
          tekananDarahSistole: 0,
          tekananDarahDiastole: 0,
          radiologiFoto: null,
          darahRutinHemo: 0,
          darahRutinLeu: 0,
          darahRutinErit: 0,
          darahRutinLaju: 0,
          darahRutinHema: 0,
          darahRutinTrom: 0,
          lemakDarahHDL: 0,
          lemakDarahLDL: 0,
          lemakDarahChol: 0,
          lemakDarahTrigli: 0,
          gulaDarahSewaktu: 0,
          gulaDarahPuasa: 0,
          gulaDarahPostPrandial: 0,
          gulaDarahHbA1c: 0,
          fungsiHatiSGOT: 0,
          fungsiHatiSGPT: 0,
          fungsiHatiGamma: 0,
          fungsiHatiProtKual: 0,
          fungsiHatiAlbumin: 0,
          fungsiGinjalCrea: 0,
          fungsiGinjalUreum: 0,
          fungsiGinjalAsam: 0,
          fungsiJantungABI: 0,
          fungsiJantungEKG: null,
          fungsiJantungEcho: null,
          funduskopi: null,
          pemeriksaanLain: null,
          keterangan: null,
        });
        setMcuFormOpen(false);
        alert('Data MCU berhasil ditambahkan.');
      }
    } catch (error) {
      const resStatus = error?.response?.status || 500;
      const json = error?.response?.data || {};
      const errMsg = (json && json.metaData && json.metaData.message) 
        ? json.metaData.message 
        : `Gagal menambahkan data MCU (${resStatus})`;
      alert(`Gagal: ${errMsg}`);
    } finally {
      setSavingMcu(false);
    }
  };

  const handleUlangPanggilPasien = async () => {
    if (poliRepeatCalling) return;
    setPoliRepeatCalling(true);
    try {
      const no_rawat = noRawat || "";
      const kd_poli = poliCode || kdPoli || "";
      const kd_dokter = doctorCode || "";
      const payload = { no_rawat, kd_poli, kd_dokter, status: "1" };
      try {
        await axios.get("/sanctum/csrf-cookie", { withCredentials: true });
        await new Promise((r) => setTimeout(r, 150));
      } catch (_) {}
      try {
        const ck = typeof document !== "undefined" ? document.cookie || "" : "";
        const hasSession = ck.includes("laravel_session=");
        if (hasSession) {
          await axios.post("/api/antrian-poli/repeat", payload, {
            withCredentials: true,
            headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          });
        }
      } catch (_) {}
      try {
        let no_reg_bc = "";
        try {
          const resAP = await axios.get("/api/antrian-poli", { headers: { Accept: "application/json" }, withCredentials: false });
          const dataAP = resAP?.data || {};
          const cardsAP = Array.isArray(dataAP.cards) ? dataAP.cards : [];
          const cardAP = cardsAP.find((c) => String(c.kd_poli || "") === String(kd_poli || "")) || null;
          const rowAP = cardAP && Array.isArray(cardAP.upcoming)
            ? cardAP.upcoming.find((r) => String(r.no_rawat || "") === String(no_rawat || ""))
            : null;
          no_reg_bc = String(rowAP?.no_reg || "");
          if (!no_reg_bc) {
            const h = dataAP.highlight || null;
            if (h && String(h.kd_poli || "") === String(kd_poli || "") && String(h.no_rawat || "") === String(no_rawat || "")) {
              no_reg_bc = String(h.no_reg || "");
            }
          }
        } catch (_) {}
        const bc = new BroadcastChannel("antrian-poli-call");
        bc.postMessage({
          no_rawat,
          kd_poli,
          kd_dokter,
          ts: Date.now(),
          no_reg: no_reg_bc,
          nm_pasien: patientInfo?.name || "",
          nm_poli: poliName || kd_poli || "",
          repeat: true,
        });
        bc.close();
      } catch (_) {}
    } catch (_) {
    } finally {
      setPoliRepeatCalling(false);
    }
  };

  

  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") {
        setIsOpen(false);
        setTimeout(() => {
          try {
            try { setRawatJalanFilters({ kd_dokter: doctorCode || "", kd_poli: poliCode || "" }); } catch (_) {}
            let basePath = "/rawat-jalan";
            try { basePath = route("rawat-jalan.index", {}, false) || "/rawat-jalan"; } catch (_) {}
            try {
              const u = new URL(basePath, window.location.origin);
              if (doctorCode) u.searchParams.set("kd_dokter", doctorCode);
              if (poliCode) u.searchParams.set("kd_poli", poliCode);
              router.visit(u.pathname + u.search + u.hash);
            } catch (_) {
              const qs = [];
              if (doctorCode) qs.push(`kd_dokter=${encodeURIComponent(doctorCode)}`);
              if (poliCode) qs.push(`kd_poli=${encodeURIComponent(poliCode)}`);
              router.visit(basePath + (qs.length ? `?${qs.join("&")}` : ""));
            }
          } catch {
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
                  className="h-10 w-10 rounded-full bg-neutral-900/70 border border-[oklch(29.1%_0.149_302.717)] text-[oklch(98.5%_0_0)] shadow-[0_0_10px_oklch(84.1%_0.238_128.85_/_0.45)] hover:bg-neutral-800"
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
                <div className="relative overflow-hidden rounded-xl bg-[oklch(98.5%_0_0)] text-[oklch(14.5%_0_0)] backdrop-blur-sm border border-[oklch(29.1%_0.149_302.717)] shadow-[0_0_20px_oklch(84.1%_0.238_128.85_/_0.25)] font-mono">
                  <motion.div className="flex items-center justify-between px-4 py-3 border-b border-[oklch(29.1%_0.149_302.717_/_0.7)] bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)]" initial="initial" whileHover="hover" whileTap="tap">
                    <div className="flex items-center gap-2">
                      <motion.div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[oklch(84.1%_0.238_128.85)] text-[oklch(98.5%_0_0)] shadow-[0_0_12px_oklch(84.1%_0.238_128.85_/_0.45)]" variants={headerItemVariants}>
                        <span className="text-xs font-bold">IT</span>
                      </motion.div>
                      <motion.div className="text-sm font-semibold text-[oklch(98.5%_0_0)]" variants={headerItemVariants}>
                        {pages[index].title}
                      </motion.div>
                    <div className="flex items-center gap-2 ml-3">
                        <button
                          type="button"
                          onClick={() => {
                            const idx = pages.findIndex((p) => p.key === "new-cppt");
                            if (idx >= 0) {
                              setDir(idx > index ? 1 : -1);
                              setIndex(idx);
                            }
                          }}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-[oklch(98.5%_0_0)] border border-white shrink-0 whitespace-nowrap"
                          aria-label="Buka SOAP"
                          title="Buka SOAP"
                        >
                          SOAP
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const idx = pages.findIndex((p) => p.key === "tarif");
                            if (idx >= 0) {
                              setDir(idx > index ? 1 : -1);
                              setIndex(idx);
                            }
                          }}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-[oklch(98.5%_0_0)] border border-white shrink-0 whitespace-nowrap"
                          aria-label="Buka Tindakan"
                          title="Buka Tindakan"
                        >
                          Tindakan
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const idx = pages.findIndex((p) => p.key === "diagnosa");
                            if (idx >= 0) {
                              setDir(idx > index ? 1 : -1);
                              setIndex(idx);
                            }
                          }}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-[oklch(98.5%_0_0)] border border-white shrink-0 whitespace-nowrap"
                          aria-label="Buka Diagnosa"
                          title="Buka Diagnosa"
                        >
                          Diagnosa
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const idx = pages.findIndex((p) => p.key === "odontogram");
                            if (idx >= 0) {
                              setDir(idx > index ? 1 : -1);
                              setIndex(idx);
                            }
                          }}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-[oklch(98.5%_0_0)] border border-white shrink-0 whitespace-nowrap"
                          aria-label="Buka Odontogram"
                          title="Buka Odontogram"
                        >
                          Odontogram
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const idx = pages.findIndex((p) => p.key === "resep");
                            if (idx >= 0) {
                              setDir(idx > index ? 1 : -1);
                              setIndex(idx);
                            }
                          }}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-[oklch(98.5%_0_0)] border border-white shrink-0 whitespace-nowrap"
                          aria-label="Buka Resep"
                          title="Buka Resep"
                        >
                          Resep
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const idx = pages.findIndex((p) => p.key === "lab");
                            if (idx >= 0) {
                              setDir(idx > index ? 1 : -1);
                              setIndex(idx);
                            }
                          }}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-[oklch(98.5%_0_0)] border border-white shrink-0 whitespace-nowrap"
                          aria-label="Buka Laboratorium"
                          title="Buka Laboratorium"
                        >
                          Laboratorium
                        </button>
                      </div>
                    </div>
                    <motion.div className="flex items-center gap-2 cursor-grab active:cursor-grabbing" drag="x" dragConstraints={{ left: -60, right: 60 }} dragElastic={0.12} dragMomentum={false} onDragEnd={handleDragEnd}>
                      <div className="text-xs text-[oklch(98.5%_0_0)]">
                        {new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                      </div>
                      <button
                        type="button"
                        onClick={() => { setCloseConfirmOpen(true); }}
                        className="p-1 rounded-md hover:bg-neutral-800 transition-colors border border-[oklch(29.1%_0.149_302.717)] text-[oklch(98.5%_0_0)] shadow-[0_0_10px_oklch(84.1%_0.238_128.85_/_0.45)]"
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

              <AnimatePresence>
                {closeConfirmOpen && (
                  <motion.div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.div className="w-full max-w-sm rounded-2xl border border-[oklch(29.1%_0.149_302.717_/_0.35)] bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)] shadow-[0_0_18px_oklch(84.1%_0.238_128.85_/_0.3)]" initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}>
                      <div className="px-4 py-2.5 border-b border-[oklch(29.1%_0.149_302.717_/_0.35)] flex items-center justify-between">
                        <div className="text-sm font-semibold">Konfirmasi Tutup</div>
                        <button type="button" onClick={() => setCloseConfirmOpen(false)} className="p-1 rounded-md hover:bg-neutral-800 transition-colors border border-[oklch(29.1%_0.149_302.717)] text-[oklch(98.5%_0_0)]">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="text-sm">Apakah Pelayanan Pasien Sudah Selesai</div>
                        <div className="flex items-center justify-end gap-2">
                          <button type="button" disabled={closeSubmitting} onClick={() => {
                            setCloseConfirmOpen(false);
                            setIsOpen(false);
                            setTimeout(() => {
                              try {
                                try { setRawatJalanFilters({ kd_dokter: doctorCode || '', kd_poli: poliCode || '' }); } catch (_) {}
                                let basePath = '/rawat-jalan';
                                try { basePath = route('rawat-jalan.index', {}, false) || '/rawat-jalan'; } catch (_) {}
                                try {
                                  const u = new URL(basePath, window.location.origin);
                                  if (doctorCode) u.searchParams.set('kd_dokter', doctorCode);
                                  if (poliCode) u.searchParams.set('kd_poli', poliCode);
                                  router.visit(u.pathname + u.search + u.hash);
                                } catch (_) {
                                  const qs = [];
                                  if (doctorCode) qs.push(`kd_dokter=${encodeURIComponent(doctorCode)}`);
                                  if (poliCode) qs.push(`kd_poli=${encodeURIComponent(poliCode)}`);
                                  router.visit(basePath + (qs.length ? `?${qs.join('&')}` : ''));
                                }
                              } catch {
                                router.visit('/rawat-jalan');
                              }
                            }, 250);
                          }} className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:opacity-60 text-white">
                            Sudah
                          </button>
                          <button type="button" disabled={closeSubmitting} onClick={async () => {
                            try {
                              setCloseSubmitting(true);
                              if (noRawat) {
                                try { await axios.get('/sanctum/csrf-cookie', { withCredentials: true }); await new Promise((r) => setTimeout(r, 160)); } catch (_) {}
                                try {
                                  await axios({ method: 'PUT', url: `/api/reg-periksa/${encodeURIComponent(noRawat)}/status`, data: { stts: 'Belum' }, withCredentials: true, headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'X-CSRF-TOKEN': typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]').getAttribute('content') : undefined } });
                                } catch (_) {
                                  try { await axios.get('/sanctum/csrf-cookie', { withCredentials: true }); await new Promise((r) => setTimeout(r, 140)); } catch (_) {}
                                  await axios({ method: 'PUT', url: `/api/reg-periksa/${encodeURIComponent(noRawat)}/status`, data: { stts: 'Belum' }, withCredentials: true, headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'X-CSRF-TOKEN': typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]').getAttribute('content') : undefined } });
                                }
                              }
                            } catch (_) {}
                            setCloseSubmitting(false);
                            setCloseConfirmOpen(false);
                            setIsOpen(false);
                            setTimeout(() => {
                              try {
                                try { setRawatJalanFilters({ kd_dokter: doctorCode || '', kd_poli: poliCode || '' }); } catch (_) {}
                                let basePath = '/rawat-jalan';
                                try { basePath = route('rawat-jalan.index', {}, false) || '/rawat-jalan'; } catch (_) {}
                                try {
                                  const u = new URL(basePath, window.location.origin);
                                  if (doctorCode) u.searchParams.set('kd_dokter', doctorCode);
                                  if (poliCode) u.searchParams.set('kd_poli', poliCode);
                                  router.visit(u.pathname + u.search + u.hash);
                                } catch (_) {
                                  const qs = [];
                                  if (doctorCode) qs.push(`kd_dokter=${encodeURIComponent(doctorCode)}`);
                                  if (poliCode) qs.push(`kd_poli=${encodeURIComponent(poliCode)}`);
                                  router.visit(basePath + (qs.length ? `?${qs.join('&')}` : ''));
                                }
                              } catch {
                                router.visit('/rawat-jalan');
                              }
                            }, 250);
                          }} className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 disabled:opacity-60 text-white">
                            Belum
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
                  <div className="px-4 py-2 border-b border-[oklch(29.1%_0.149_302.717_/_0.35)] text-[oklch(98.5%_0_0)]">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={openCpptModal}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-[oklch(98.5%_0_0)] border border-[oklch(29.1%_0.149_302.717)]"
                        title="Tampilkan Riwayat SOAP"
                      >
                        CPPT
                      </button>
                      <button
                        type="button"
                        onClick={handlePanggilPasien}
                        disabled={poliCalling}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-[oklch(98.5%_0_0)] border border-[oklch(29.1%_0.149_302.717)] disabled:opacity-60"
                        title="Panggil pasien"
                      >
                        {poliCalling ? 'Memanggil...' : 'Panggil'}
                      </button>
                      <button
                        type="button"
                        onClick={handleUlangPanggilPasien}
                        disabled={poliRepeatCalling}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-[oklch(98.5%_0_0)] border border-[oklch(29.1%_0.149_302.717)] disabled:opacity-60"
                        title="Ulang panggil pasien"
                      >
                        {poliRepeatCalling ? 'Mengulang...' : 'Ulang panggil'}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          let url = '/rawat-jalan/canvas-surat';
                          const q = { token, no_rawat: noRawat, no_rkm_medis: noRkmMedis };
                          try {
                            url = route('rawat-jalan.canvas-surat', q);
                          } catch (_) {
                            const qs = new URLSearchParams(Object.entries(q).filter(([, v]) => v)).toString();
                            url = qs ? `${url}?${qs}` : url;
                          }
                          setIsOpen(false);
                          setTimeout(() => {
                            router.visit(url);
                          }, 200);
                        }}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-[oklch(98.5%_0_0)] border border-[oklch(29.1%_0.149_302.717)]"
                        aria-label="Buka Surat"
                        title="Buka Surat"
                      >
                        Surat
                      </button>
                      {bridgingVisible && (
                        <button
                          type="button"
                          onClick={handleKirimKunjunganPcare}
                          disabled={sendingKunjungan}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-red-600 hover:bg-red-700 text-[oklch(98.5%_0_0)] border border-[oklch(29.1%_0.149_302.717)] disabled:opacity-60"
                          title="Kirim Kunjungan PCare"
                        >
                          Kirim Kunjungan Pcare
                        </button>
                      )}
                      {bridgingVisible && (
                        <Icare
                          noPeserta={bpjsNoPeserta}
                          kodeDokter={doctorCode}
                          noRawat={noRawat}
                          label="Icare"
                          buttonClassName="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-[oklch(98.5%_0_0)] border border-[oklch(29.1%_0.149_302.717)] disabled:opacity-60"
                        />
                      )}
                    </div>
                  </div>

                  <div className="px-4 py-2 border-b border-[oklch(29.1%_0.149_302.717_/_0.35)] text-[oklch(14.5%_0_0)]">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-medium mb-1">Identitas Pasien</div>
                      <button
                        type="button"
                        onClick={() => setIdentityOpen((v) => !v)}
                        className="p-1 rounded-md hover:bg-neutral-800 transition-colors border border-[oklch(29.1%_0.149_302.717)] text-[oklch(14.5%_0_0)]"
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
                  className="h-10 w-10 rounded-full bg-neutral-900/70 border border-[oklch(29.1%_0.149_302.717)] text-[oklch(98.5%_0_0)] shadow-[0_0_10px_oklch(84.1%_0.238_128.85_/_0.45)] hover:bg-neutral-800"
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
              {cpptModalOpen && (
                <div className="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto">
                  <div className="absolute inset-0 bg-black/50" onClick={() => setCpptModalOpen(false)}></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-full md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[90vw] mx-2 sm:mx-4 my-4 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Riwayat SOAP</h3>
                      <button onClick={() => setCpptModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-3 sm:p-4 space-y-2">
                      <RiwayatKunjungan token={token} noRkmMedis={noRkmMedis} />
                    </div>
                  </div>
                </div>
              )}
              {bridgingOpen && (
                <div className="fixed inset-0 z-[10001] flex items-start justify-center overflow-y-auto">
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeBridgingModal}></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full xl:max-w-7xl 2xl:max-w-screen-2xl mx-1 sm:mx-2 my-4 sm:my-8 flex flex-col max-h-[88vh] overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600">
                      <h3 className="text-lg md:text-xl font-semibold text-white">Bridging PCare</h3>
                      <button onClick={closeBridgingModal} className="text-white/90 hover:text-white rounded-md p-2 hover:bg-white/10">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {isUnauthorized && (
                      <div className="px-4 pt-2">
                        <div className="mt-2 flex items-center justify-between rounded-md border border-red-200 bg-red-50 p-2 text-xs text-red-700">
                          <span>Anda belum login. Silakan login untuk mengakses PCare.</span>
                          <a href="/login" className="inline-flex items-center rounded bg-red-600 px-2 py-1 text-white">Login</a>
                        </div>
                      </div>
                    )}
                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1 overflow-x-hidden">
                      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 lg:gap-6">
                        <div className="rounded-xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 shadow-sm p-4 overflow-x-hidden lg:col-span-3">
                          <div className="flex items-center gap-2 mb-2 text-indigo-800 dark:text-indigo-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            <h4 className="text-sm font-semibold">Pendaftaran PCare</h4>
                          </div>
                        {pcarePendaftaran ? (
                          <div className="grid grid-cols-1 gap-y-3 text-sm text-gray-700 dark:text-gray-200">
                            <div className="space-y-1"><div className="text-xs font-medium">No Rawat</div><div className="text-sm">{pcarePendaftaran.no_rawat}</div></div>
                            <div className="space-y-1"><div className="text-xs font-medium">No Kartu</div><div className="text-sm">{pcarePendaftaran.noKartu || pcarePendaftaran.no_kartu || '-'}</div></div>
                            <div className="space-y-1"><div className="text-xs font-medium">Tgl Daftar</div><div className="text-sm">{pcarePendaftaran.tglDaftar || '-'}</div></div>
                            <div className="space-y-1"><div className="text-xs font-medium">Kd Poli</div><div className="text-sm">{pcarePendaftaran.kdPoli || '-'}</div></div>
                            <div className="space-y-1"><div className="text-xs font-medium">Keluhan</div><div className="text-sm break-words">{pcarePendaftaran.keluhan || '-'}</div></div>
                            <div className="space-y-1"><div className="text-xs font-medium">Sistole/Diastole</div><div className="text-sm">{(pcarePendaftaran.sistole || pcarePendaftaran.diastole) ? `${pcarePendaftaran.sistole || ''}/${pcarePendaftaran.diastole || ''}` : '-'}</div></div>
                            <div className="space-y-1"><div className="text-xs font-medium">Berat/Tinggi</div><div className="text-sm">{(pcarePendaftaran.beratBadan || pcarePendaftaran.tinggiBadan) ? `${pcarePendaftaran.beratBadan || ''}kg / ${pcarePendaftaran.tinggiBadan || ''}cm` : '-'}</div></div>
                            <div className="space-y-1"><div className="text-xs font-medium">Resp/HR</div><div className="text-sm">{(pcarePendaftaran.respRate || pcarePendaftaran.heartRate) ? `${pcarePendaftaran.respRate || ''} / ${pcarePendaftaran.heartRate || ''}` : '-'}</div></div>
                            <div className="pt-2">
                              <button type="button" onClick={hapusPendaftaranPcare} className="inline-flex items-center px-3 py-1.5 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white border border-red-700">Hapus Pendaftaran PCare</button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600 dark:text-gray-300">Data pendaftaran belum tersedia.</p>
                        )}
                        </div>
                        <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-gray-800 shadow-sm p-4 lg:col-span-7">
                          <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <h4 className="text-sm font-semibold">Kunjungan PCare</h4>
                          </div>
                          <div className="text-xs font-medium text-emerald-700 dark:text-emerald-300">No Kunjungan: {noKunjungan || (kunjunganPreview && kunjunganPreview.noKunjungan) || '-'}</div>
                        </div>
                          <div className="space-y-3">
                            {kunjunganPreview && (
                              <div className="space-y-4 md:space-y-5">
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                <div>
                                  <label className="block text-xs font-medium mb-1">No Kartu BPJS</label>
                                  <input type="text" value={kunjunganPreview.noKartu || ''} onChange={(e) => updateKunjunganField('noKartu', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Tanggal Daftar</label>
                                  <input type="date" value={toInputDate(kunjunganPreview.tglDaftar)} onChange={(e) => updateKunjunganField('tglDaftar', fromInputDate(e.target.value))} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">KD Poli (PCare)</label>
                                  <SearchableSelect options={poliOptions} value={kunjunganPreview.kdPoli ?? ''} onChange={(val) => updateKunjunganField('kdPoli', val)} placeholder="Pilih Poli" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">KD Dokter (PCare)</label>
                                  <SearchableSelect options={dokterOptions} value={kunjunganPreview.kdDokter ?? ''} onChange={(val) => updateKunjunganField('kdDokter', val)} placeholder="Pilih Dokter" />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                                <div>
                                  <label className="block text-xs font-medium mb-1">Keluhan</label>
                                  <textarea value={kunjunganPreview.keluhan || ''} onChange={(e) => updateKunjunganField('keluhan', e.target.value)} rows={2} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm"></textarea>
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Anamnesa</label>
                                  <textarea value={kunjunganPreview.anamnesa || ''} onChange={(e) => updateKunjunganField('anamnesa', e.target.value)} rows={2} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm"></textarea>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                <div>
                                  <label className="block text-xs font-medium mb-1">Sistole</label>
                                  <input type="number" value={kunjunganPreview.sistole ?? ''} onChange={(e) => updateKunjunganField('sistole', e.target.value, 'int')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Diastole</label>
                                  <input type="number" value={kunjunganPreview.diastole ?? ''} onChange={(e) => updateKunjunganField('diastole', e.target.value, 'int')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Berat Badan (kg)</label>
                                  <input type="number" step="0.1" value={kunjunganPreview.beratBadan ?? ''} onChange={(e) => updateKunjunganField('beratBadan', e.target.value, 'float')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Tinggi Badan (cm)</label>
                                  <input type="number" step="0.1" value={kunjunganPreview.tinggiBadan ?? ''} onChange={(e) => updateKunjunganField('tinggiBadan', e.target.value, 'float')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                <div>
                                  <label className="block text-xs font-medium mb-1">Resp Rate</label>
                                  <input type="number" value={kunjunganPreview.respRate ?? ''} onChange={(e) => updateKunjunganField('respRate', e.target.value, 'int')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Heart Rate</label>
                                  <input type="number" value={kunjunganPreview.heartRate ?? ''} onChange={(e) => updateKunjunganField('heartRate', e.target.value, 'int')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Lingkar Perut (cm)</label>
                                  <input type="number" step="0.1" value={kunjunganPreview.lingkarPerut ?? ''} onChange={(e) => updateKunjunganField('lingkarPerut', e.target.value, 'float')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Suhu</label>
                                  <input type="text" value={kunjunganPreview.suhu ?? ''} onChange={(e) => updateKunjunganField('suhu', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                <div>
                                  <label className="block text-xs font-medium mb-1">Tanggal Pulang</label>
                                  <input type="date" value={toInputDate(kunjunganPreview.tglPulang)} onChange={(e) => updateKunjunganField('tglPulang', fromInputDate(e.target.value))} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Poli Rujuk Internal (kdPoliRujukInternal)</label>
                                  <input type="text" value={kunjunganPreview.kdPoliRujukInternal ?? ''} onChange={(e) => updateKunjunganField('kdPoliRujukInternal', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Terapi Non Obat</label>
                                  <input type="text" value={kunjunganPreview.terapiNonObat ?? ''} onChange={(e) => updateKunjunganField('terapiNonObat', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">BMHP</label>
                                  <input type="text" value={kunjunganPreview.bmhp ?? ''} onChange={(e) => updateKunjunganField('bmhp', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                <div>
                                  <label className="block text-xs font-medium mb-1">Status Pulang (kdStatusPulang)</label>
                                  <SearchableSelect source="statuspulang" value={kunjunganPreview.kdStatusPulang ?? ''} onChange={(val) => { updateKunjunganField('kdStatusPulang', val); if (!val) updateKunjunganField('nmStatusPulang', ''); }} onSelect={(opt) => { const label = typeof opt === 'string' ? opt : (opt?.label ?? ''); updateKunjunganField('nmStatusPulang', label); }} placeholder="Pilih Status Pulang" searchPlaceholder="Cari status pulang…" sourceParams={{ rawatInap: false }} defaultDisplay={kunjunganPreview?.nmStatusPulang ?? (String(kunjunganPreview?.kdStatusPulang) === '3' ? 'Berobat Jalan' : null)} />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Diagnosa Utama (kdDiag1)</label>
                                  <SearchableSelect source="diagnosa" value={kunjunganPreview.kdDiag1 ?? ''} onChange={(val) => { updateKunjunganField('kdDiag1', val); if (!val || val === '') { setIsDiagnosaNonSpesialis(false); setKdTaccVisible(false); setTaccError(''); updateKunjunganField('kdTacc', -1, 'int'); updateKunjunganField('alasanTacc', ''); setDiagnosaLabel(''); updateKunjunganField('nmDiag1', ''); } }} onSelect={(opt) => { const labelRaw = typeof opt === 'string' ? opt : (opt?.label ?? ''); const parts = labelRaw.split(' — '); const code = parts[0] || ''; const name = parts.length > 1 ? parts[1] : ''; setDiagnosaLabel(`${code}${name ? ' — ' + name : ''}`.trim()); updateKunjunganField('nmDiag1', name); const isNonSpesialis = !!opt && typeof opt === 'object' && opt.nonSpesialis === true; setIsDiagnosaNonSpesialis(isNonSpesialis); setKdTaccVisible(!!isNonSpesialis); setTaccError(''); if (isNonSpesialis) { updateKunjunganField('kdTacc', '', 'int'); updateKunjunganField('alasanTacc', ''); } else { updateKunjunganField('kdTacc', -1, 'int'); updateKunjunganField('alasanTacc', ''); } }} placeholder="Pilih Diagnosa Utama" searchPlaceholder="Cari diagnosa (kode atau nama)…" className="" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Diagnosa 2 (kdDiag2)</label>
                                  <SearchableSelect source="diagnosa" value={kunjunganPreview.kdDiag2 ?? ''} onChange={(val) => updateKunjunganField('kdDiag2', val)} placeholder="Pilih Diagnosa 2 (opsional)" searchPlaceholder="Cari diagnosa (kode atau nama)…" className="" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Diagnosa 3 (kdDiag3)</label>
                                  <SearchableSelect source="diagnosa" value={kunjunganPreview.kdDiag3 ?? ''} onChange={(val) => updateKunjunganField('kdDiag3', val)} placeholder="Pilih Diagnosa 3 (opsional)" searchPlaceholder="Cari diagnosa (kode atau nama)…" className="" />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                                <div>
                                  <label className="block text-xs font-medium mb-1">Alergi Makan</label>
                                  <SearchableSelect source="alergi" value={kunjunganPreview.alergiMakan ?? '00'} onChange={(val) => { updateKunjunganField('alergiMakan', val); if (!val) updateKunjunganField('nmAlergiMakanan', ''); }} onSelect={(opt) => { const label = typeof opt === 'string' ? opt : (opt?.label ?? ''); updateKunjunganField('nmAlergiMakanan', label); }} placeholder="Pilih Alergi Makanan" searchPlaceholder="Cari alergi (makanan)…" sourceParams={{ jenis: '01' }} defaultDisplay="Tidak Ada" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Alergi Udara</label>
                                  <SearchableSelect source="alergi" value={kunjunganPreview.alergiUdara ?? '00'} onChange={(val) => { updateKunjunganField('alergiUdara', val); if (!val) updateKunjunganField('nmAlergiUdara', ''); }} onSelect={(opt) => { const label = typeof opt === 'string' ? opt : (opt?.label ?? ''); updateKunjunganField('nmAlergiUdara', label); }} placeholder="Pilih Alergi Udara" searchPlaceholder="Cari alergi (udara)…" sourceParams={{ jenis: '02' }} defaultDisplay="Tidak Ada" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Alergi Obat</label>
                                  <SearchableSelect source="alergi" value={kunjunganPreview.alergiObat ?? '00'} onChange={(val) => { updateKunjunganField('alergiObat', val); if (!val) updateKunjunganField('nmAlergiObat', ''); }} onSelect={(opt) => { const label = typeof opt === 'string' ? opt : (opt?.label ?? ''); updateKunjunganField('nmAlergiObat', label); }} placeholder="Pilih Alergi Obat" searchPlaceholder="Cari alergi (obat)…" sourceParams={{ jenis: '03' }} defaultDisplay="Tidak Ada" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">KD Prognosa</label>
                                  <SearchableSelect source="prognosa" value={kunjunganPreview.kdPrognosa ?? '02'} onChange={(val) => { updateKunjunganField('kdPrognosa', val); if (!val) updateKunjunganField('nmPrognosa', ''); }} onSelect={(opt) => { const label = typeof opt === 'string' ? opt : (opt?.label ?? ''); updateKunjunganField('nmPrognosa', label); }} placeholder="Pilih Prognosa" searchPlaceholder="Cari prognosa…" defaultDisplay="Bonam (Baik)" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">KD Sadar</label>
                                  <SearchableSelect source="kesadaran" value={kunjunganPreview.kdSadar ?? '01'} onChange={(val) => { updateKunjunganField('kdSadar', val); if (!val) updateKunjunganField('nmSadar', ''); }} onSelect={(opt) => { const label = typeof opt === 'string' ? opt : (opt?.label ?? ''); updateKunjunganField('nmSadar', label); }} placeholder="Pilih Kesadaran" searchPlaceholder="Cari kesadaran…" defaultDisplay="Compos mentis" />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Terapi Obat</label>
                                <textarea value={kunjunganPreview.terapiObat ?? ''} onChange={(e) => updateKunjunganField('terapiObat', e.target.value)} rows={2} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm"></textarea>
                              </div>
                            </div>
                          )}
                          <div className="flex justify-end hidden">
                            <button type="button" onClick={sendKunjungan} disabled={sendingKunjungan || !kunjunganPreview || (rujukanActive && !rujukForm.kdppk)} className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center">
                              {sendingKunjungan ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                  Mengirim...
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                  Kirim Kunjungan
                                </>
                              )}
                            </button>
                          </div>
                          {kunjunganResult && (
                            <div className={`text-sm px-3 py-2 rounded border ${kunjunganResult.success ? 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800' : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'}`}>
                              {kunjunganResult.success ? (
                                <div className="flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Berhasil: {kunjunganResult.message}</div>
                              ) : (
                                <div className="flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Gagal: {kunjunganResult.message}</div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 md:px-4">
                        <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 dark:border-gray-600 text-violet-600 focus:ring-violet-500"
                            checked={rujukanManual}
                            onChange={(e) => {
                              const manual = e.target.checked;
                              setRujukanManual(manual);
                              // Set Status Pulang otomatis sesuai checklist
                              if (manual) {
                                updateKunjunganField('kdStatusPulang', '4');
                                updateKunjunganField('nmStatusPulang', 'Rujuk Vertikal');
                                setRujukForm((p) => ({ ...p, kdSarana: p.kdSarana || '1' }));
                              } else {
                                updateKunjunganField('kdStatusPulang', '3');
                                updateKunjunganField('nmStatusPulang', 'Berobat Jalan');
                              }
                              const k = kunjunganPreview?.kdStatusPulang ? String(kunjunganPreview.kdStatusPulang) : "";
                              const derived = k === "4";
                              const finalActive = manual || derived;
                              setRujukanActive(finalActive);
                              if (!finalActive) {
                                setRujukForm({ kdppk: "", tglEstRujuk: "", kdSubSpesialis1: "", kdSarana: "" });
                                setProviderOptions([]);
                              }
                            }}
                            disabled={!kunjunganPreview}
                          />
                          Aktifkan Rujukan manual
                        </label>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{rujukanActive ? 'Rujukan aktif' : 'Rujukan nonaktif'}</span>
                      </div>
                      <div className={`border rounded-lg p-3 md:p-4 ${rujukanActive ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700' : 'bg-gray-50 dark:bg-gray-700/20 border-gray-200 dark:border-gray-700'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`text-sm font-semibold ${rujukanActive ? 'text-violet-800 dark:text-violet-300' : 'text-gray-700 dark:text-gray-300'}`}>Rujukan PCare</h4>
                        </div>
                        {!rujukanActive && (
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Kartu Rujukan akan terbuka otomatis saat memilih Status Pulang "Rujuk Vertikal" (kode 4).</div>
                        )}
                        {rujukanActive && (
                          <div className="space-y-3 text-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                              <div>
                                <label className="block text-xs font-medium mb-1">Tanggal Estimasi Rujuk</label>
                                <input type="date" value={rujukForm.tglEstRujuk} onChange={(e) => setRujukForm((p) => ({ ...p, tglEstRujuk: e.target.value }))} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Spesialis</label>
                                <SearchableSelect options={spesialisOptions} value={selectedSpesialis} onChange={(val) => setSelectedSpesialis(val)} placeholder="— Pilih Spesialis —" searchPlaceholder="Cari spesialis…" displayKey="label" valueKey="value" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Sub Spesialis (kdSubSpesialis1)</label>
                                <SearchableSelect options={subSpesialisOptions} value={rujukForm.kdSubSpesialis1} onChange={(val) => setRujukForm((p) => ({ ...p, kdSubSpesialis1: val }))} placeholder="— Pilih Sub Spesialis —" searchPlaceholder="Cari sub spesialis…" displayKey="label" valueKey="value" />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
                              <div className="md:col-span-1">
                                <label className="block text-xs font-medium mb-1">Sarana (kdSarana)</label>
                                <SearchableSelect options={saranaOptions} value={rujukForm.kdSarana} onChange={(val) => setRujukForm((p) => ({ ...p, kdSarana: val }))} placeholder="— Pilih Sarana —" searchPlaceholder="Cari sarana…" displayKey="label" valueKey="value" defaultDisplay="1 — REKAM MEDIK" />
                              </div>
                              <div className="md:col-span-3">
                                <label className="block text-xs font-medium mb-1">PPK Rujukan (kdppk)</label>
                                <SearchableSelect options={providerOptions} value={rujukForm.kdppk} onChange={(val) => setRujukForm((p) => ({ ...p, kdppk: val }))} placeholder="— Pilih PPK Rujukan —" searchPlaceholder="Cari PPK…" displayKey="label" valueKey="value" />
                              </div>
                            </div>
                            {kdTaccVisible && (
                              <div>
                                <label className="block text-xs font-medium mb-1">KD TACC <span className="text-red-500">*</span></label>
                                <input type="text" required value={kunjunganPreview?.kdTacc ?? ''} onChange={(e) => { setTaccError(''); updateKunjunganField('kdTacc', e.target.value, 'int'); }} placeholder="Isi KD TACC (1=Time, 2=Age, 3=Complication, 4=Comorbidity)" className={`w-full rounded-md text-sm dark:bg-gray-800 dark:text-white ${taccError ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                                {taccError && (<div className="mt-1 text-xs text-red-600 dark:text-red-400">{taccError}</div>)}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="text-xs text-gray-700 dark:text-gray-300">
                                    Diagnosa: <span className="font-semibold">{(kunjunganPreview?.nmDiag1 && kunjunganPreview?.kdDiag1) ? `${kunjunganPreview.nmDiag1} (${kunjunganPreview.kdDiag1})` : (diagnosaLabel || kunjunganPreview?.kdDiag1 || '-')}</span>
                                  </div>
                                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${isDiagnosaNonSpesialis ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{isDiagnosaNonSpesialis ? 'Non Spesialis' : 'Spesialis'}</span>
                                </div>
                                <label className="block text-xs font-medium mb-1">Alasan TACC {kdTaccVisible && <span className="text-red-500">*</span>}</label>
                              </div>
                              {(() => {
                                const selected = REF_TACC.find((x) => x.kdTacc === (kunjunganPreview?.kdTacc ?? -1));
                                if (!selected || selected.kdTacc === -1) {
                                  return (
                                    <input type="text" value={kunjunganPreview?.alasanTacc ?? ''} onChange={(e) => updateKunjunganField('alasanTacc', e.target.value)} placeholder="Tanpa TACC (alasan kosong)" disabled className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                  );
                                }
                                if (selected.kdTacc === 3) {
                                  return (
                                    <input type="text" value={kunjunganPreview?.alasanTacc ?? ''} onChange={(e) => { setTaccError(''); updateKunjunganField('alasanTacc', e.target.value); }} placeholder={`mis. ${kunjunganPreview?.kdDiag1 ? `${kunjunganPreview.kdDiag1} - NamaDiagnosa` : 'A09 - Diarrhoea and gastroenteritis of presumed infectious origin'}`} className={`w-full rounded-md text-sm dark:bg-gray-800 dark:text-white ${taccError ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                                  );
                                }
                                return (
                                  <SearchableSelect options={(selected?.alasanTacc || []).map((a) => ({ label: a, value: a }))} value={kunjunganPreview?.alasanTacc ?? ''} onChange={(val) => { setTaccError(''); updateKunjunganField('alasanTacc', val); }} placeholder="— Pilih Alasan —" searchPlaceholder="Cari alasan…" displayKey="label" valueKey="value" />
                                );
                              })()}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Card MCU */}
                      <div className="border rounded-lg p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300">Data MCU</h4>
                          {!mcuFormOpen && (noKunjungan || (kunjunganPreview && kunjunganPreview.noKunjungan)) && (
                            <button
                              type="button"
                              onClick={() => {
                                const currentNoKunjungan = noKunjungan || (kunjunganPreview && kunjunganPreview.noKunjungan);
                                setMcuForm((prev) => ({ ...prev, noKunjungan: currentNoKunjungan }));
                                setMcuFormOpen(true);
                              }}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                              </svg>
                              Add MCU
                            </button>
                          )}
                        </div>
                        {loadingMcu ? (
                          <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Memuat data MCU...
                          </div>
                        ) : mcuData && mcuData.list && mcuData.list.length > 0 ? (
                          <div className="space-y-3 text-sm">
                            {mcuData.list.map((mcu, idx) => (
                              <div key={idx} className="space-y-2">
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Tanggal Pelayanan:</span>
                                    <span className="ml-1 text-gray-600 dark:text-gray-400">{mcu.tglPelayanan || '-'}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">KD Provider:</span>
                                    <span className="ml-1 text-gray-600 dark:text-gray-400">{mcu.kdProvider || '-'}</span>
                                  </div>
                                </div>
                                
                                {/* Tekanan Darah */}
                                {(mcu.tekananDarahSistole > 0 || mcu.tekananDarahDiastole > 0) && (
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                      <span className="font-medium text-gray-700 dark:text-gray-300">Tekanan Darah:</span>
                                      <span className="ml-1 text-gray-600 dark:text-gray-400">{mcu.tekananDarahSistole}/{mcu.tekananDarahDiastole} mmHg</span>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Darah Rutin */}
                                {(mcu.darahRutinHemo > 0 || mcu.darahRutinLeu > 0 || mcu.darahRutinErit > 0 || mcu.darahRutinLaju > 0 || mcu.darahRutinHema > 0 || mcu.darahRutinTrom > 0) && (
                                  <div className="border-t border-blue-200 dark:border-blue-700 pt-2">
                                    <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-1">Darah Rutin:</div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                      {mcu.darahRutinHemo > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Hemoglobin:</span>
                                          <span className="ml-1 font-medium">{mcu.darahRutinHemo}</span>
                                        </div>
                                      )}
                                      {mcu.darahRutinLeu > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Leukosit:</span>
                                          <span className="ml-1 font-medium">{mcu.darahRutinLeu}</span>
                                        </div>
                                      )}
                                      {mcu.darahRutinErit > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Eritrosit:</span>
                                          <span className="ml-1 font-medium">{mcu.darahRutinErit}</span>
                                        </div>
                                      )}
                                      {mcu.darahRutinLaju > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Laju Endap:</span>
                                          <span className="ml-1 font-medium">{mcu.darahRutinLaju}</span>
                                        </div>
                                      )}
                                      {mcu.darahRutinHema > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Hematokrit:</span>
                                          <span className="ml-1 font-medium">{mcu.darahRutinHema}</span>
                                        </div>
                                      )}
                                      {mcu.darahRutinTrom > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Trombosit:</span>
                                          <span className="ml-1 font-medium">{mcu.darahRutinTrom}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                {/* Lemak Darah */}
                                {(mcu.lemakDarahHDL > 0 || mcu.lemakDarahLDL > 0 || mcu.lemakDarahChol > 0 || mcu.lemakDarahTrigli > 0) && (
                                  <div className="border-t border-blue-200 dark:border-blue-700 pt-2">
                                    <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-1">Lemak Darah:</div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                      {mcu.lemakDarahHDL > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">HDL:</span>
                                          <span className="ml-1 font-medium">{mcu.lemakDarahHDL}</span>
                                        </div>
                                      )}
                                      {mcu.lemakDarahLDL > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">LDL:</span>
                                          <span className="ml-1 font-medium">{mcu.lemakDarahLDL}</span>
                                        </div>
                                      )}
                                      {mcu.lemakDarahChol > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Kolesterol:</span>
                                          <span className="ml-1 font-medium">{mcu.lemakDarahChol}</span>
                                        </div>
                                      )}
                                      {mcu.lemakDarahTrigli > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Triglyceride:</span>
                                          <span className="ml-1 font-medium">{mcu.lemakDarahTrigli}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                {/* Gula Darah */}
                                {(mcu.gulaDarahSewaktu > 0 || mcu.gulaDarahPuasa > 0 || mcu.gulaDarahPostPrandial > 0 || mcu.gulaDarahHbA1c > 0) && (
                                  <div className="border-t border-blue-200 dark:border-blue-700 pt-2">
                                    <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-1">Gula Darah:</div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                      {mcu.gulaDarahSewaktu > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Sewaktu:</span>
                                          <span className="ml-1 font-medium">{mcu.gulaDarahSewaktu}</span>
                                        </div>
                                      )}
                                      {mcu.gulaDarahPuasa > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Puasa:</span>
                                          <span className="ml-1 font-medium">{mcu.gulaDarahPuasa}</span>
                                        </div>
                                      )}
                                      {mcu.gulaDarahPostPrandial > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Post Prandial:</span>
                                          <span className="ml-1 font-medium">{mcu.gulaDarahPostPrandial}</span>
                                        </div>
                                      )}
                                      {mcu.gulaDarahHbA1c > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">HbA1c:</span>
                                          <span className="ml-1 font-medium">{mcu.gulaDarahHbA1c}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                {/* Fungsi Hati */}
                                {(mcu.fungsiHatiSGOT > 0 || mcu.fungsiHatiSGPT > 0 || mcu.fungsiHatiGamma > 0 || mcu.fungsiHatiProtKual > 0 || mcu.fungsiHatiAlbumin > 0) && (
                                  <div className="border-t border-blue-200 dark:border-blue-700 pt-2">
                                    <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-1">Fungsi Hati:</div>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                                      {mcu.fungsiHatiSGOT > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">SGOT:</span>
                                          <span className="ml-1 font-medium">{mcu.fungsiHatiSGOT}</span>
                                        </div>
                                      )}
                                      {mcu.fungsiHatiSGPT > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">SGPT:</span>
                                          <span className="ml-1 font-medium">{mcu.fungsiHatiSGPT}</span>
                                        </div>
                                      )}
                                      {mcu.fungsiHatiGamma > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Gamma GT:</span>
                                          <span className="ml-1 font-medium">{mcu.fungsiHatiGamma}</span>
                                        </div>
                                      )}
                                      {mcu.fungsiHatiProtKual > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Prot. Kual:</span>
                                          <span className="ml-1 font-medium">{mcu.fungsiHatiProtKual}</span>
                                        </div>
                                      )}
                                      {mcu.fungsiHatiAlbumin > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Albumin:</span>
                                          <span className="ml-1 font-medium">{mcu.fungsiHatiAlbumin}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                {/* Fungsi Ginjal */}
                                {(mcu.fungsiGinjalCrea > 0 || mcu.fungsiGinjalUreum > 0 || mcu.fungsiGinjalAsam > 0) && (
                                  <div className="border-t border-blue-200 dark:border-blue-700 pt-2">
                                    <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-1">Fungsi Ginjal:</div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                      {mcu.fungsiGinjalCrea > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Kreatinin:</span>
                                          <span className="ml-1 font-medium">{mcu.fungsiGinjalCrea}</span>
                                        </div>
                                      )}
                                      {mcu.fungsiGinjalUreum > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Ureum:</span>
                                          <span className="ml-1 font-medium">{mcu.fungsiGinjalUreum}</span>
                                        </div>
                                      )}
                                      {mcu.fungsiGinjalAsam > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Asam Urat:</span>
                                          <span className="ml-1 font-medium">{mcu.fungsiGinjalAsam}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                {/* Fungsi Jantung */}
                                {(mcu.fungsiJantungABI > 0 || mcu.fungsiJantungEKG || mcu.fungsiJantungEcho) && (
                                  <div className="border-t border-blue-200 dark:border-blue-700 pt-2">
                                    <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-1">Fungsi Jantung:</div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                      {mcu.fungsiJantungABI > 0 && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">ABI:</span>
                                          <span className="ml-1 font-medium">{mcu.fungsiJantungABI}</span>
                                        </div>
                                      )}
                                      {mcu.fungsiJantungEKG && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">EKG:</span>
                                          <span className="ml-1 font-medium">{mcu.fungsiJantungEKG}</span>
                                        </div>
                                      )}
                                      {mcu.fungsiJantungEcho && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Echo:</span>
                                          <span className="ml-1 font-medium">{mcu.fungsiJantungEcho}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                {/* Pemeriksaan Lainnya */}
                                {(mcu.radiologiFoto || mcu.funduskopi || mcu.pemeriksaanLain || mcu.keterangan) && (
                                  <div className="border-t border-blue-200 dark:border-blue-700 pt-2">
                                    <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-1">Pemeriksaan Lainnya:</div>
                                    <div className="space-y-1 text-xs">
                                      {mcu.radiologiFoto && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Radiologi Foto:</span>
                                          <span className="ml-1 font-medium">{mcu.radiologiFoto}</span>
                                        </div>
                                      )}
                                      {mcu.funduskopi && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Funduskopi:</span>
                                          <span className="ml-1 font-medium">{mcu.funduskopi}</span>
                                        </div>
                                      )}
                                      {mcu.pemeriksaanLain && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Pemeriksaan Lain:</span>
                                          <span className="ml-1 font-medium">{mcu.pemeriksaanLain}</span>
                                        </div>
                                      )}
                                      {mcu.keterangan && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Keterangan:</span>
                                          <span className="ml-1 font-medium">{mcu.keterangan}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-600 dark:text-gray-400">Data MCU belum tersedia untuk kunjungan ini.</div>
                        )}
                      </div>
                      
                      {/* Card Skrining Riwayat Kesehatan */}
                      <div className="border rounded-lg p-3 md:p-4 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-300">Skrining Riwayat Kesehatan</h4>
                          {skriningData && skriningData.count !== undefined && (
                            <span className="text-xs text-purple-600 dark:text-purple-400">
                              Total: {skriningData.count}
                            </span>
                          )}
                        </div>
                        {loadingSkrining ? (
                          <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2 py-2">
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Memuat data Skrining Riwayat Kesehatan...
                          </div>
                        ) : skriningError ? (
                          <div className="text-xs px-3 py-2 rounded-md border border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800">
                            <div className="flex items-start gap-2">
                              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <div>
                                <strong className="font-semibold">Informasi:</strong>
                                <span className="ml-1">{skriningError}</span>
                              </div>
                            </div>
                          </div>
                        ) : skriningData && skriningData.list && Array.isArray(skriningData.list) && skriningData.list.length > 0 ? (
                          <div className="space-y-4">
                            {skriningData.list.map((peserta, idx) => (
                              <div key={`peserta-${idx}-${peserta.nomor_peserta || idx}`} className="space-y-3">
                                {/* Informasi Peserta */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                                  <div className="flex items-start">
                                    <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">Nomor Peserta:</span>
                                    <span className="ml-2 text-gray-600 dark:text-gray-400 break-all">{peserta.nomor_peserta || '-'}</span>
                                  </div>
                                  <div className="flex items-start">
                                    <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[60px]">Nama:</span>
                                    <span className="ml-2 text-gray-600 dark:text-gray-400 break-words">{peserta.nama || '-'}</span>
                                  </div>
                                  <div className="flex items-start">
                                    <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[60px]">Usia:</span>
                                    <span className="ml-2 text-gray-600 dark:text-gray-400">{peserta.usia !== undefined && peserta.usia !== null ? `${peserta.usia} tahun` : '-'}</span>
                                  </div>
                                  {peserta.no_hp && (
                                    <div className="flex items-start">
                                      <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">No. HP:</span>
                                      <span className="ml-2 text-gray-600 dark:text-gray-400">{peserta.no_hp}</span>
                                    </div>
                                  )}
                                  {peserta.email && (
                                    <div className="flex items-start md:col-span-2">
                                      <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[60px]">Email:</span>
                                      <span className="ml-2 text-gray-600 dark:text-gray-400 break-all">{peserta.email}</span>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Status Penyakit */}
                                {peserta.status_penyakit && typeof peserta.status_penyakit === 'object' && Object.keys(peserta.status_penyakit).length > 0 ? (
                                  <div className="border-t border-purple-200 dark:border-purple-700 pt-3">
                                    <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-3">Status Penyakit:</div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                                      {Object.entries(peserta.status_penyakit).map(([penyakit, status]) => {
                                        const formatPenyakit = (key) => {
                                          return key
                                            .replace(/_/g, ' ')
                                            .replace(/\b\w/g, (char) => char.toUpperCase());
                                        };
                                        
                                        const getStatusColor = (status) => {
                                          if (status === 'Berisiko') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800';
                                          if (status === 'Tidak Berisiko') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800';
                                          if (status === 'Tidak Mengisi') return 'bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400 border-gray-200 dark:border-gray-700';
                                          return 'bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400 border-gray-200 dark:border-gray-700';
                                        };
                                        
                                        return (
                                          <div key={penyakit} className="flex flex-col p-2 rounded-md bg-white/50 dark:bg-gray-800/50 border border-purple-100 dark:border-purple-800/50">
                                            <span className="font-medium text-gray-700 dark:text-gray-300 text-xs mb-1">{formatPenyakit(penyakit)}</span>
                                            <span className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium border ${getStatusColor(status)}`}>
                                              {status}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-xs text-gray-500 dark:text-gray-400 italic">Status penyakit tidak tersedia</div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-600 dark:text-gray-400 py-2">
                            Data Skrining Riwayat Kesehatan belum tersedia untuk peserta ini.
                          </div>
                        )}
                      </div>
                    </div>
                      <div className="sticky bottom-0 px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between bg-white/95 dark:bg-gray-900/80 backdrop-blur shadow-sm">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Tutup popup ini untuk kembali ke form pemeriksaan.</div>
                        <div className="flex items-center gap-2">
                          {!isEditMode && (noKunjungan || (kunjunganPreview && kunjunganPreview.noKunjungan)) && (
                            <>
                              <button type="button" onClick={deleteKunjungan} disabled={sendingKunjungan || !noRawat} className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:opacity-60 text-white shadow-lg">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                Hapus Kunjungan
                              </button>
                              <button type="button" onClick={editKunjungan} disabled={sendingKunjungan || !noRawat} className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 disabled:opacity-60 text-white shadow-lg">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                Edit Kunjungan
                              </button>
                            </>
                          )}
                          {isEditMode && (
                            <button type="button" onClick={() => setIsEditMode(false)} className="px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">
                              Batal Edit
                            </button>
                          )}
                          <button type="button" onClick={closeBridgingModal} className="px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">Tutup</button>
                          <button type="button" onClick={sendKunjungan} disabled={sendingKunjungan || !kunjunganPreview || (rujukanActive && !rujukForm.kdppk)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-emerald-400 disabled:to-teal-400 text-white shadow-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            {isEditMode ? 'Update Data' : `Kirim Kunjungan${rujukanActive ? ' + Rujuk' : ''}`}
                          </button>
                        </div>
                      </div>
                  </div>
                </div>
              )}
              
              <AnimatePresence>
                {mcuFormOpen && (
                  <motion.div
                    className="fixed inset-0 z-[10002] flex items-start justify-center overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={overlayTransition}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mcu-modal-title"
                  >
                    <div
                      className="absolute inset-0 bg-[oklch(14.5%_0_0_/_0.5)] backdrop-blur-md"
                      onClick={() => setMcuFormOpen(false)}
                    ></div>
                    <motion.div
                      className="relative bg-white/95 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full xl:max-w-5xl 2xl:max-w-6xl mx-1 sm:mx-2 my-4 sm:my-8 flex flex-col max-h-[90vh] overflow-hidden border border-gray-200/80 dark:border-gray-800/70 ring-1 ring-gray-200 dark:ring-gray-800"
                      initial={{ opacity: 0, y: 18, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.98 }}
                      transition={contentSpring}
                    >
                      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                        <div className="flex items-center gap-2 text-white">
                          <HeartPulse className="w-5 h-5 opacity-90" />
                          <h3 id="mcu-modal-title" className="text-lg md:text-xl font-semibold">Tambah Data MCU</h3>
                        </div>
                        <button onClick={() => setMcuFormOpen(false)} className="text-white/90 hover:text-white rounded-md p-2 hover:bg-white/10">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <motion.div
                        className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <div className="space-y-3 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-medium mb-1">KD Provider</label>
                              <input
                                type="text"
                                value={mcuForm.kdProvider}
                                readOnly
                                className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium mb-1">Tanggal Pelayanan</label>
                              <input
                                type="date"
                                value={mcuForm.tglPelayanan}
                                onChange={(e) => setMcuForm((p) => ({ ...p, tglPelayanan: e.target.value }))}
                                className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-medium mb-1">Tekanan Darah Sistole</label>
                              <input
                                type="number"
                                value={mcuForm.tekananDarahSistole || ''}
                                onChange={(e) => setMcuForm((p) => ({ ...p, tekananDarahSistole: parseInt(e.target.value) || 0 }))}
                                className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium mb-1">Tekanan Darah Diastole</label>
                              <input
                                type="number"
                                value={mcuForm.tekananDarahDiastole || ''}
                                onChange={(e) => setMcuForm((p) => ({ ...p, tekananDarahDiastole: parseInt(e.target.value) || 0 }))}
                                className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm"
                              />
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                            <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-2">Darah Rutin</div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              <div>
                                <label className="block text-xs font-medium mb-1">Hemoglobin</label>
                                <input type="number" value={mcuForm.darahRutinHemo || ''} onChange={(e) => setMcuForm((p) => ({ ...p, darahRutinHemo: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Leukosit</label>
                                <input type="number" value={mcuForm.darahRutinLeu || ''} onChange={(e) => setMcuForm((p) => ({ ...p, darahRutinLeu: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Eritrosit</label>
                                <input type="number" value={mcuForm.darahRutinErit || ''} onChange={(e) => setMcuForm((p) => ({ ...p, darahRutinErit: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Laju Endap</label>
                                <input type="number" value={mcuForm.darahRutinLaju || ''} onChange={(e) => setMcuForm((p) => ({ ...p, darahRutinLaju: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Hematokrit</label>
                                <input type="number" value={mcuForm.darahRutinHema || ''} onChange={(e) => setMcuForm((p) => ({ ...p, darahRutinHema: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Trombosit</label>
                                <input type="number" value={mcuForm.darahRutinTrom || ''} onChange={(e) => setMcuForm((p) => ({ ...p, darahRutinTrom: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                            <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-2">Lemak Darah</div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              <div>
                                <label className="block text-xs font-medium mb-1">HDL</label>
                                <input type="number" value={mcuForm.lemakDarahHDL || ''} onChange={(e) => setMcuForm((p) => ({ ...p, lemakDarahHDL: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">LDL</label>
                                <input type="number" value={mcuForm.lemakDarahLDL || ''} onChange={(e) => setMcuForm((p) => ({ ...p, lemakDarahLDL: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Kolesterol</label>
                                <input type="number" value={mcuForm.lemakDarahChol || ''} onChange={(e) => setMcuForm((p) => ({ ...p, lemakDarahChol: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Triglyceride</label>
                                <input type="number" value={mcuForm.lemakDarahTrigli || ''} onChange={(e) => setMcuForm((p) => ({ ...p, lemakDarahTrigli: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                            <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-2">Gula Darah</div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              <div>
                                <label className="block text-xs font-medium mb-1">Sewaktu</label>
                                <input type="number" value={mcuForm.gulaDarahSewaktu || ''} onChange={(e) => setMcuForm((p) => ({ ...p, gulaDarahSewaktu: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Puasa</label>
                                <input type="number" value={mcuForm.gulaDarahPuasa || ''} onChange={(e) => setMcuForm((p) => ({ ...p, gulaDarahPuasa: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Post Prandial</label>
                                <input type="number" value={mcuForm.gulaDarahPostPrandial || ''} onChange={(e) => setMcuForm((p) => ({ ...p, gulaDarahPostPrandial: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">HbA1c</label>
                                <input type="number" value={mcuForm.gulaDarahHbA1c || ''} onChange={(e) => setMcuForm((p) => ({ ...p, gulaDarahHbA1c: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                            <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-2">Fungsi Hati</div>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                              <div>
                                <label className="block text-xs font-medium mb-1">SGOT</label>
                                <input type="number" value={mcuForm.fungsiHatiSGOT || ''} onChange={(e) => setMcuForm((p) => ({ ...p, fungsiHatiSGOT: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">SGPT</label>
                                <input type="number" value={mcuForm.fungsiHatiSGPT || ''} onChange={(e) => setMcuForm((p) => ({ ...p, fungsiHatiSGPT: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Gamma GT</label>
                                <input type="number" value={mcuForm.fungsiHatiGamma || ''} onChange={(e) => setMcuForm((p) => ({ ...p, fungsiHatiGamma: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Prot. Kual</label>
                                <input type="number" value={mcuForm.fungsiHatiProtKual || ''} onChange={(e) => setMcuForm((p) => ({ ...p, fungsiHatiProtKual: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Albumin</label>
                                <input type="number" value={mcuForm.fungsiHatiAlbumin || ''} onChange={(e) => setMcuForm((p) => ({ ...p, fungsiHatiAlbumin: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                            <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-2">Fungsi Ginjal</div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              <div>
                                <label className="block text-xs font-medium mb-1">Kreatinin</label>
                                <input type="number" value={mcuForm.fungsiGinjalCrea || ''} onChange={(e) => setMcuForm((p) => ({ ...p, fungsiGinjalCrea: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Ureum</label>
                                <input type="number" value={mcuForm.fungsiGinjalUreum || ''} onChange={(e) => setMcuForm((p) => ({ ...p, fungsiGinjalUreum: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Asam Urat</label>
                                <input type="number" value={mcuForm.fungsiGinjalAsam || ''} onChange={(e) => setMcuForm((p) => ({ ...p, fungsiGinjalAsam: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                            <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-2">Fungsi Jantung</div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <div>
                                <label className="block text-xs font-medium mb-1">ABI</label>
                                <input type="number" value={mcuForm.fungsiJantungABI || ''} onChange={(e) => setMcuForm((p) => ({ ...p, fungsiJantungABI: parseInt(e.target.value) || 0 }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">EKG</label>
                                <input type="text" value={mcuForm.fungsiJantungEKG || ''} onChange={(e) => setMcuForm((p) => ({ ...p, fungsiJantungEKG: e.target.value || null }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Echo</label>
                                <input type="text" value={mcuForm.fungsiJantungEcho || ''} onChange={(e) => setMcuForm((p) => ({ ...p, fungsiJantungEcho: e.target.value || null }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                            <div className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-2">Pemeriksaan Lainnya</div>
                            <div className="space-y-2">
                              <div>
                                <label className="block text-xs font-medium mb-1">Radiologi Foto</label>
                                <input type="text" value={mcuForm.radiologiFoto || ''} onChange={(e) => setMcuForm((p) => ({ ...p, radiologiFoto: e.target.value || null }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Funduskopi</label>
                                <input type="text" value={mcuForm.funduskopi || ''} onChange={(e) => setMcuForm((p) => ({ ...p, funduskopi: e.target.value || null }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Pemeriksaan Lain</label>
                                <input type="text" value={mcuForm.pemeriksaanLain || ''} onChange={(e) => setMcuForm((p) => ({ ...p, pemeriksaanLain: e.target.value || null }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">Keterangan</label>
                                <textarea value={mcuForm.keterangan || ''} onChange={(e) => setMcuForm((p) => ({ ...p, keterangan: e.target.value || null }))} rows={2} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm"></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      <div className="sticky bottom-0 px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2 bg-white/95 dark:bg-gray-900/80 backdrop-blur shadow-sm">
                        <button
                          type="button"
                          onClick={() => setMcuFormOpen(false)}
                          className="px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={addMcu}
                          disabled={savingMcu || !mcuForm.noKunjungan}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-emerald-400 disabled:to-teal-400 disabled:opacity-70 text-white shadow-lg"
                        >
                          {savingMcu ? (
                            <>
                              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Menyimpan...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              Simpan MCU
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </motion.div>
        )}
      </AnimatePresence>
    </LanjutanRalanLayout>
  );
}
