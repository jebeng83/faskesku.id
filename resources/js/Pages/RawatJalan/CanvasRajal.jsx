import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { overlayTransition, contentSpring, transformOriginForDir, createPageVariants, hoverTapVariants, headerItemVariants } from "@/tools/motion";
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
  const [cpptModalLoading, setCpptModalLoading] = useState(false);
  const [cpptModalError, setCpptModalError] = useState("");
  const [cpptModalItems, setCpptModalItems] = useState([]);
  const [poliCalling, setPoliCalling] = useState(false);
  const [poliRepeatCalling, setPoliRepeatCalling] = useState(false);
  const [doctorCode, setDoctorCode] = useState("");
  const [bridgingOpen, setBridgingOpen] = useState(false);
  const cpptReqIdRef = useRef(0);
  
  const [pcarePendaftaran, setPcarePendaftaran] = useState(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [rujukanActive, setRujukanActive] = useState(false);
  const [rujukanManual, setRujukanManual] = useState(false);
  const [kunjunganPreview, setKunjunganPreview] = useState(null);
  const [sendingKunjungan, setSendingKunjungan] = useState(false);
  const [kunjunganResult, setKunjunganResult] = useState(null);
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

  useEffect(() => {
    const checkPendaftaranStatus = async () => {
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
    checkPendaftaranStatus();
  }, [noRawat]);

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

  const openCpptModal = async () => {
    setCpptModalOpen(true);
    setCpptModalLoading(true);
    setCpptModalError("");
    const reqId = (cpptReqIdRef.current += 1);
    try {
      const qs = token ? `t=${encodeURIComponent(token)}` : `no_rkm_medis=${encodeURIComponent(noRkmMedis)}`;
      const res = await fetch(`/rawat-jalan/riwayat?${qs}`, { headers: { Accept: "application/json" } });
      const json = await res.json();
      let arr = Array.isArray(json.data) ? json.data : [];
      arr = arr
        .slice()
        .sort((a, b) => new Date(b.tgl_registrasi || 0) - new Date(a.tgl_registrasi || 0))
        .slice(0, 5);
      const results = await Promise.all(
        arr.map(async (v) => {
          try {
            const url = route("rawat-jalan.pemeriksaan-ralan", { no_rawat: v.no_rawat });
            const r = await fetch(url);
            const j = await r.json();
            const list = Array.isArray(j.data) ? j.data : [];
            const filtered = list && list.length && list.some((row) => Object.prototype.hasOwnProperty.call(row, "no_rawat"))
              ? list.filter((row) => String(row.no_rawat) === String(v.no_rawat))
              : list;
            return { ...v, entries: filtered };
          } catch {
            return { ...v, entries: [] };
          }
        })
      );
      if (cpptReqIdRef.current === reqId && cpptModalOpen) {
        setCpptModalItems(results);
      }
    } catch (e) {
      if (cpptReqIdRef.current === reqId && cpptModalOpen) {
        setCpptModalError(String(e?.message || e));
      }
    } finally {
      setCpptModalLoading(false);
    }
  };

  const openBridgingModal = async () => {
    setBridgingOpen(true);
    try {
      setKunjunganResult(null);
      try { await toggleKunjungan(true); } catch {}
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
    setSelectedSpesialis("");
    setSubSpesialisOptions([]);
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
    const payload = { ...kunjunganPreview };
    if (noRawat) payload.no_rawat = noRawat;
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
      payload.rujukLanjut = { kdppk: rujukForm.kdppk, tglEstRujuk: fmtDate(rujukForm.tglEstRujuk) || null, subSpesialis: { kdSubSpesialis1: rujukForm.kdSubSpesialis1 || null, kdSarana: rujukForm.kdSarana || null }, khusus: null };
      payload.nmSubSpesialis = nmSubSpesialis;
      payload.nmPPK = nmPPK;
    }
    try {
      const res = await fetch("/api/pcare/kunjungan", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", "X-Requested-With": "XMLHttpRequest", "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content') },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      let json; try { json = text ? JSON.parse(text) : {}; } catch { json = {}; }
      if (res.ok) {
        const msg = (json && json.response && json.response.message) ? json.response.message : "CREATED";
        if (payload.rujukLanjut && noRawat) {
          try {
            const rujukRes = await fetch(`/api/pcare/rujuk-subspesialis/rawat/${encodeURIComponent(noRawat)}`, { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, credentials: "include" });
            const rujukJson = await rujukRes.json();
            const rujukData = rujukJson.data || null;
            if (rujukRes.ok && rujukData) { }
          } catch { }
        }
        setKunjunganResult({ success: true, message: msg });
      } else {
        const errMsg = (json && json.metaData && json.metaData.message) ? json.metaData.message : `Gagal kirim Kunjungan (${res.status})`;
        setKunjunganResult({ success: false, message: errMsg });
      }
    } catch (e) {
      setKunjunganResult({ success: false, message: `Error: ${e.message || e}` });
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
                        }}
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
                          const idx = pages.findIndex((p) => p.key === "resep");
                          if (idx >= 0) {
                            setDir(idx > index ? 1 : -1);
                            setIndex(idx);
                          }
                        }}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-[oklch(98.5%_0_0)] border border-[oklch(29.1%_0.149_302.717)]"
                        aria-label="Buka Resep"
                        title="Buka Resep"
                      >
                        Resep
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
                      <Icare noPeserta={bpjsNoPeserta} kodeDokter={doctorCode} noRawat={noRawat} label="Icare" buttonClassName="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-black text-[oklch(98.5%_0_0)] border border-[oklch(29.1%_0.149_302.717)] disabled:opacity-60" />
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
                      {cpptModalLoading ? (
                        <div className="text-xs text-gray-500">Memuat...</div>
                      ) : cpptModalError ? (
                        <div className="text-xs text-red-600 dark:text-red-400">{cpptModalError}</div>
                      ) : cpptModalItems.length === 0 ? (
                        <div className="text-xs text-gray-500">Tidak ada data</div>
                      ) : (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden w-full">
                          <div className="overflow-x-auto lg:overflow-x-hidden w-full max-w-full">
                            <table className="w-full text-xs table-auto">
                              <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr className="text-left text-gray-600 dark:text-gray-300">
                                  <th className="px-3 py-2 font-bold w-44 lg:w-auto">Tanggal</th>
                                  <th className="px-3 py-2 font-bold w-56 lg:w-auto">Keluhan (Subjektif)</th>
                                  <th className="px-3 py-2 font-bold min-w-[9rem] w-28 lg:w-auto">TTV</th>
                                  <th className="px-3 py-2 font-bold w-56 lg:w-auto">Pemeriksaan Fisik (Objektif)</th>
                                  <th className="px-3 py-2 font-bold w-48 lg:w-auto">Penilaian (Assessment)</th>
                                  <th className="px-3 py-2 font-bold w-48 lg:w-auto">Tindak Lanjut (Planning)</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {cpptModalItems.map((h) => {
                                  let tanggal = "-";
                                  try {
                                    if (typeof h.no_rawat === "string") {
                                      const m = h.no_rawat.match(/^(\d{4})\/(\d{2})\/(\d{2})\//);
                                      if (m) {
                                        const y = m[1];
                                        const mm = m[2];
                                        const dd = m[3];
                                        const dt = new Date(`${y}-${mm}-${dd}T00:00:00`);
                                        tanggal = dt.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
                                      } else if (h.tgl_registrasi) {
                                        tanggal = new Date(h.tgl_registrasi).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
                                      }
                                    } else if (h.tgl_registrasi) {
                                      tanggal = new Date(h.tgl_registrasi).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
                                    }
                                  } catch {}
                                  return Array.isArray(h.entries) && h.entries.length > 0 ? (
                                    h.entries
                                      .slice()
                                      .sort((a, b) => {
                                        const aa = String(a.jam_rawat || "").substring(0, 5);
                                        const bb = String(b.jam_rawat || "").substring(0, 5);
                                        return aa < bb ? 1 : aa > bb ? -1 : 0;
                                      })
                                      .map((e, i) => (
                                        <tr key={`${h.no_rawat}-e-${i}`} className="bg-white dark:bg-gray-900/40 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                          <td className="px-3 py-2 text-gray-900 dark:text-white">
                                            <div className="space-y-0.5">
                                              <div className="font-mono">
                                                {tanggal} {(typeof e.jam_rawat === "string" && e.jam_rawat.trim()) ? e.jam_rawat.trim().substring(0,5) : "-"}
                                              </div>
                                              <div className="text-[11px] font-mono text-gray-900 dark:text-white">{h.no_rawat || "-"}</div>
                                            </div>
                                          </td>
                                          <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                            <div className="break-words whitespace-normal" title={typeof e.keluhan === "string" ? e.keluhan.trim() : ""}>
                                              {(typeof e.keluhan === "string" && e.keluhan.trim()) ? e.keluhan.trim() : "-"}
                                            </div>
                                          </td>
                                          <td className="px-3 py-2 text-gray-700 dark:text-gray-300 min-w-[9rem]">
                                            <div className="space-y-0.5 text-[11px] leading-tight">
                                              <div className="flex justify-between gap-2">
                                                <span className="text-gray-500 whitespace-nowrap">Suhu</span>
                                                <span className="text-right">{e.suhu_tubuh || "-"}°C</span>
                                              </div>
                                              <div className="flex justify-between gap-2">
                                                <span className="text-gray-500 whitespace-nowrap">Tensi</span>
                                                <span className="text-right">{e.tensi || "-"}</span>
                                              </div>
                                              <div className="flex justify-between gap-2">
                                                <span className="text-gray-500 whitespace-nowrap">Nadi</span>
                                                <span className="text-right">{e.nadi || "-"}/min</span>
                                              </div>
                                              <div className="flex justify-between gap-2">
                                                <span className="text-gray-500 whitespace-nowrap">SpO2</span>
                                                <span className="text-right">{e.spo2 || "-"}%</span>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                            <div className="break-words whitespace-normal" title={typeof e.pemeriksaan === "string" ? e.pemeriksaan.trim() : ""}>
                                              {(typeof e.pemeriksaan === "string" && e.pemeriksaan.trim()) ? e.pemeriksaan.trim() : "-"}
                                            </div>
                                          </td>
                                          <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                            <div className="break-words whitespace-normal" title={typeof e.penilaian === "string" ? e.penilaian.trim() : ""}>
                                              {(typeof e.penilaian === "string" && e.penilaian.trim()) ? e.penilaian.trim() : "-"}
                                            </div>
                                          </td>
                                          <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                            <div className="break-words whitespace-normal" title={(() => {
                                              const s = typeof e.rtl === "string" ? e.rtl.trim() : "";
                                              const i = typeof e.instruksi === "string" ? e.instruksi.trim() : "";
                                              const v = typeof e.evaluasi === "string" ? e.evaluasi.trim() : "";
                                              return s || i || v || "";
                                            })()}>
                                              {(() => {
                                                const s = typeof e.rtl === "string" ? e.rtl.trim() : "";
                                                const i = typeof e.instruksi === "string" ? e.instruksi.trim() : "";
                                                const v = typeof e.evaluasi === "string" ? e.evaluasi.trim() : "";
                                                const joined = [s, i, v].filter(Boolean).join("\n");
                                                return joined || "-";
                                              })()}
                                            </div>
                                          </td>
                                        </tr>
                                      ))
                                  ) : null;
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
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
                                  <SearchableSelect source="alergi" value={kunjunganPreview.alergiMakan ?? '00'} onChange={(val) => updateKunjunganField('alergiMakan', val)} placeholder="Pilih Alergi Makanan" searchPlaceholder="Cari alergi (makanan)…" sourceParams={{ jenis: '01' }} defaultDisplay="Tidak Ada" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Alergi Udara</label>
                                  <SearchableSelect source="alergi" value={kunjunganPreview.alergiUdara ?? '00'} onChange={(val) => updateKunjunganField('alergiUdara', val)} placeholder="Pilih Alergi Udara" searchPlaceholder="Cari alergi (udara)…" sourceParams={{ jenis: '02' }} defaultDisplay="Tidak Ada" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">Alergi Obat</label>
                                  <SearchableSelect source="alergi" value={kunjunganPreview.alergiObat ?? '00'} onChange={(val) => updateKunjunganField('alergiObat', val)} placeholder="Pilih Alergi Obat" searchPlaceholder="Cari alergi (obat)…" sourceParams={{ jenis: '03' }} defaultDisplay="Tidak Ada" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">KD Prognosa</label>
                                  <SearchableSelect source="prognosa" value={kunjunganPreview.kdPrognosa ?? '02'} onChange={(val) => updateKunjunganField('kdPrognosa', val)} placeholder="Pilih Prognosa" searchPlaceholder="Cari prognosa…" defaultDisplay="Bonam (Baik)" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium mb-1">KD Sadar</label>
                                  <SearchableSelect source="kesadaran" value={kunjunganPreview.kdSadar ?? '01'} onChange={(val) => updateKunjunganField('kdSadar', val)} placeholder="Pilih Kesadaran" searchPlaceholder="Cari kesadaran…" defaultDisplay="Compos mentis" />
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
                    </div>
                      <div className="sticky bottom-0 px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between bg-white/95 dark:bg-gray-900/80 backdrop-blur shadow-sm">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Tutup popup ini untuk kembali ke form pemeriksaan.</div>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={closeBridgingModal} className="px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">Tutup</button>
                          <button type="button" onClick={sendKunjungan} disabled={sendingKunjungan || !kunjunganPreview || (rujukanActive && !rujukForm.kdppk)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-emerald-400 disabled:to-teal-400 text-white shadow-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            Kirim Kunjungan{rujukanActive && rujukForm.kdppk ? ' + Rujuk' : ''}
                          </button>
                        </div>
                      </div>
                  </div>
                </div>
              )}
              
            </motion.div>
        )}
      </AnimatePresence>
    </LanjutanRalanLayout>
  );
}
