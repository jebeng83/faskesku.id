import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Pencil, Trash2, Activity, MoreVertical, RefreshCw, HeartPulse } from "lucide-react";
import { regPeriksa as regPeriksaList } from "@/routes/api";
import regPeriksaApi from "@/routes/api/reg-periksa";
import kamarApi from "@/routes/api/kamar";
import kamarInapApi from "@/routes/api/kamar-inap";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import Label from "@/Components/ui/Label";
import Modal from "@/Components/Modal";
import PatientCreateModal from "@/Components/PatientCreateModal";
import { todayDateString, nowDateTimeString } from "@/tools/datetime";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/Components/ui/Table";
import DropdownMenu, { DropdownItem } from "@/Components/DropdownMenu";
import { toast } from "@/tools/toast";
import Badge from "@/Components/ui/Badge";
import TriaseUGD from "./TriaseUGD";

export default function UGD() {
  const [query, setQuery] = useState("");
  const [dateFrom, setDateFrom] = useState(() => {
    try { return todayDateString(); } catch { return new Date().toISOString().slice(0, 10); }
  });
  const [dateTo, setDateTo] = useState(() => {
    try { return todayDateString(); } catch { return new Date().toISOString().slice(0, 10); }
  });
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [triaseOpen, setTriaseOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alamatTerm, setAlamatTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchAbortRef = useRef(null);
  const listAbortRef = useRef(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [usePatientAddress, setUsePatientAddress] = useState(false);
  const [dokterOptions, setDokterOptions] = useState([]);
  const [penjabOptions, setPenjabOptions] = useState([]);
  const [poliIGD, setPoliIGD] = useState(null);
  const currency = useMemo(() => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }), []);
  const [noRegInfo, setNoRegInfo] = useState({ last: "", next: "" });
  const [_noRegError, setNoRegError] = useState(null);
  const [dokterLoadedFromDb, setDokterLoadedFromDb] = useState(false);
  const [bpjsNik, setBpjsNik] = useState("");
  const [bpjsLoading, setBpjsLoading] = useState(false);
  const [bpjsError, setBpjsError] = useState(null);
  const [bpjsData, setBpjsData] = useState(null);
  const [checkInRooms, setCheckInRooms] = useState([]);
  const [checkInForm, setCheckInForm] = useState({ kd_kamar: "", diagnosa_awal: "" });
  const [checkInErrors, setCheckInErrors] = useState({});
  const [form, setForm] = useState({
    no_reg: "",
    no_rawat: "",
    tgl_registrasi: todayDateString(),
    jam_reg: (() => {
      try { return String(nowDateTimeString()).slice(11, 16); } catch { return new Date().toTimeString().slice(0, 5); }
    })(),
    kd_dokter: "",
    nm_dokter: "",
    no_rkm_medis: "",
    nm_pasien: "",
    kd_poli: "IGDK",
    p_jawab: "",
    almt_pj: "",
    hubunganpj: "Keluarga",
    biaya_reg: "",
    stts: "Belum",
    stts_daftar: "Baru",
    status_lanjut: "Ralan",
    kd_pj: "",
    status_bayar: "Belum Bayar",
    status_poli: "Baru",
  });
  const [errors, setErrors] = useState({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  useEffect(() => {
    const loadDokter = async () => {
      try {
        const respDokter = await axios.get("/api/dokter", { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
        const listDokter = Array.isArray(respDokter?.data?.data) ? respDokter.data.data : [];
        const validDokter = listDokter.filter((d) => d.kd_dokter && d.kd_dokter !== "-");
        setDokterOptions(validDokter);
        setDokterLoadedFromDb(true);
      } catch {
        try {
          const respAlt = await axios.get("/api/public/dokter", { params: { search: "" }, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
          const arr = Array.isArray(respAlt?.data?.data) ? respAlt.data.data : Array.isArray(respAlt?.data) ? respAlt.data : [];
          const normalized = arr.map((d) => ({ kd_dokter: d.kd_dokter ?? d.kode ?? "", nm_dokter: d.nm_dokter ?? d.nama ?? "" })).filter((d) => d.kd_dokter && d.nm_dokter);
          setDokterOptions(normalized);
          setDokterLoadedFromDb(false);
        } catch {
          setDokterOptions([]);
          setDokterLoadedFromDb(false);
        }
      }
    };
    loadDokter();
  }, []);

  useEffect(() => {
    if (!checkInOpen) return;
    const loadRooms = async () => {
      try {
        const url = kamarApi.index.url({ status: "KOSONG", limit: 200 });
        const resp = await axios.get(url, { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
        const list = Array.isArray(resp?.data?.list)
          ? resp.data.list
          : Array.isArray(resp?.data?.data)
          ? resp.data.data
          : Array.isArray(resp?.data)
          ? resp.data
          : [];
        const filtered = list.filter((k) => k && k.status === "KOSONG" && String(k.statusdata) === "1");
        setCheckInRooms(filtered);
      } catch {
        setCheckInRooms([]);
      }
    };
    loadRooms();
  }, [checkInOpen]);

  const dokterMap = useMemo(() => {
    const m = {};
    (Array.isArray(dokterOptions) ? dokterOptions : []).forEach((d) => {
      const kd = String(d?.kd_dokter || "").trim();
      if (kd) m[kd] = d?.nm_dokter || "";
    });
    return m;
  }, [dokterOptions]);

  useEffect(() => {
    const loadPenjab = async () => {
      try {
        const respPenjab = await axios.get("/api/penjab", { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
        const listPenjab = Array.isArray(respPenjab?.data?.data) ? respPenjab.data.data : [];
        setPenjabOptions(listPenjab);
      } catch {
        setPenjabOptions([]);
      }
    };
    loadPenjab();
  }, []);

  const penjabMap = useMemo(() => {
    const m = {};
    (Array.isArray(penjabOptions) ? penjabOptions : []).forEach((p) => {
      const kd = String(p?.kd_pj || "").trim();
      if (kd) m[kd] = p?.png_jawab || "";
    });
    return m;
  }, [penjabOptions]);

  const handleSearch = async (term, alamat = "") => {
    if (!String(term || "").trim() && !String(alamat || "").trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      if (searchAbortRef.current) {
        try { searchAbortRef.current.abort(); } catch (_) {}
      }
      const controller = new AbortController();
      searchAbortRef.current = controller;
      const response = await axios.get("/registration/search-patients", { params: { search: term, alamat }, signal: controller.signal });
      const data = Array.isArray(response?.data?.data) ? response.data.data : [];
      const a = String(alamat || "").trim().toLowerCase();
      const filtered = a
        ? data.filter((p) => {
            const addr = [p?.alamat, p?.alamatpj, p?.kelurahanpj, p?.kecamatanpj, p?.kabupatenpj, p?.propinsipj]
              .filter(Boolean)
              .join(", ")
              .toLowerCase();
            return addr.includes(a);
          })
        : data;
      setSearchResults(filtered);
    } catch (e) {
      const code = e?.code || e?.name || "";
      if (code === "ERR_CANCELED" || code === "CanceledError") return;
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const sanitizeNik = (v) => String(v || "").replace(/[^0-9]/g, "").slice(0, 16);
  const fetchBpjsByNik = async (nikOverride) => {
    const nik = sanitizeNik(nikOverride ?? bpjsNik);
    setBpjsNik(nik);
    if (!nik) {
      setBpjsError("NIK kosong");
      setBpjsData(null);
      return;
    }
    setBpjsLoading(true);
    setBpjsError(null);
    try {
      const response = await axios.get(`/pcare/api/peserta/nik/${nik}`);
      setBpjsData(response.data);
    } catch (error) {
      setBpjsError(error?.response?.data?.metaData?.message || error?.message || "Gagal cek BPJS");
      setBpjsData(null);
    } finally {
      setBpjsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm, alamatTerm);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, alamatTerm]);

  useEffect(() => {
    if (!createOpen && !editOpen) return;
    const load = async () => {
      try {
        const respDokter = await axios.get("/api/dokter", { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
        const listDokter = Array.isArray(respDokter?.data?.data) ? respDokter.data.data : [];
        const validDokter = listDokter.filter((d) => d.kd_dokter && d.kd_dokter !== "-");
        setDokterOptions(validDokter);
        setDokterLoadedFromDb(true);
      } catch {
        try {
          const respAlt = await axios.get("/api/public/dokter", { params: { search: "" }, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
          const arr = Array.isArray(respAlt?.data?.data) ? respAlt.data.data : Array.isArray(respAlt?.data) ? respAlt.data : [];
          const normalized = arr.map((d) => ({ kd_dokter: d.kd_dokter ?? d.kode ?? "", nm_dokter: d.nm_dokter ?? d.nama ?? "" })).filter((d) => d.kd_dokter && d.nm_dokter);
          setDokterOptions(normalized);
          setDokterLoadedFromDb(false);
        } catch {
          setDokterOptions([]);
          setDokterLoadedFromDb(false);
        }
      }
      try {
        const respPenjab = await axios.get("/api/penjab", { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
        const listPenjab = Array.isArray(respPenjab?.data?.data) ? respPenjab.data.data : [];
        setPenjabOptions(listPenjab);
      } catch {
        setPenjabOptions([]);
      }
      try {
        const respPoli = await axios.get("/api/poliklinik", { params: { q: "IGDK", limit: 25 }, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
        const list = Array.isArray(respPoli?.data?.list) ? respPoli.data.list : Array.isArray(respPoli?.data?.data) ? respPoli.data.data : [];
        const igd = (list || []).find((p) => String(p?.kd_poli || "") === "IGDK") || (list || []).find((p) => String(p?.nm_poli || "").toLowerCase().includes("igd"));
        setPoliIGD(igd || { kd_poli: "IGDK", nm_poli: "IGD" });
      } catch {
        setPoliIGD({ kd_poli: "IGDK", nm_poli: "IGD" });
      }
    };
    load();
  }, [createOpen, editOpen]);

  useEffect(() => {
    if (!createOpen) return;
    const kdDokter = String(form.kd_dokter || "").trim();
    const kdPoli = String((poliIGD && poliIGD.kd_poli) || form.kd_poli || "IGDK").trim();
    const tanggal = String(form.tgl_registrasi || todayDateString());
    setNoRegError(null);
    if (!kdPoli) return;
    if (kdPoli !== "IGDK" && (!kdDokter || !dokterLoadedFromDb)) return;
    const fetchNoReg = async () => {
      try {
        // Pastikan parameter tidak kosong
        const params = kdPoli === "IGDK"
          ? { kd_poli: kdPoli, tanggal: tanggal }
          : { kd_dokter: kdDokter, kd_poli: kdPoli, tanggal: tanggal };
        
        // Validasi parameter sebelum request
        if (!params.kd_poli || !params.tanggal) {
          console.warn("Parameter tidak lengkap:", params);
          return;
        }
        
        const url = regPeriksaApi.nextNumbers.url(params);
        const res = await axios.get(url, { params, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
        
        if (!res.data || !res.data.success) {
          console.warn("Response tidak sukses:", res.data);
          throw new Error(res.data?.message || "Gagal mengambil nomor registrasi");
        }
        
        const data = res?.data?.data || {};
        setNoRegInfo({ last: String(data.last_no_reg || ""), next: String(data.next_no_reg || "") });
        setNoRegError(null);
        const nx = String(data.next_no_reg || "").trim();
        if (nx) {
          setForm((f) => (f.no_reg ? f : { ...f, no_reg: nx }));
        }
      } catch (err) {
        console.error("Error fetching next numbers:", err);
        if (err.response?.status === 422) {
          const errors = err.response?.data?.errors || {};
          const errorMessages = Object.values(errors).flat();
          console.error("Validation errors:", errorMessages);
          const needKdPoli = Object.keys(errors).includes('kd_poli');
          if (needKdPoli) {
            const retryParams = { kd_poli: 'IGDK', tanggal };
            try {
              const retryUrl = regPeriksaApi.nextNumbers.url(retryParams);
              const retryRes = await axios.get(retryUrl, { params: retryParams, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
              if (retryRes?.data?.success) {
                const d = retryRes?.data?.data || {};
                setNoRegInfo({ last: String(d.last_no_reg || ''), next: String(d.next_no_reg || '') });
                const nx2 = String(d.next_no_reg || '').trim();
                if (nx2) {
                  setForm((f) => (f.no_reg ? f : { ...f, no_reg: nx2 }));
                }
                setNoRegError(null);
                return;
              }
            } catch {}
          }
          setNoRegError(errorMessages.join(", ") || "Validasi gagal");
        }
        try {
          const params = tanggal ? { tanggal } : {};
          const url2 = regPeriksaList.url(params);
          const res2 = await axios.get(url2, { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true });
          const arr = Array.isArray(res2?.data?.data?.data)
            ? res2.data.data.data
            : Array.isArray(res2?.data?.data)
            ? res2.data.data
            : Array.isArray(res2?.data)
            ? res2.data
            : [];
          const onlyIgd = (arr || []).filter((r) => String(r?.kd_poli || '').trim() === 'IGDK');
          const regs = onlyIgd.map((r) => String(r?.no_reg || '').trim()).filter(Boolean);
          let lastStr = '';
          let lastNum = -1;
          for (const s of regs) {
            const n = parseInt(String(s).replace(/[^0-9]/g, ''), 10);
            if (!Number.isNaN(n) && n >= lastNum) {
              lastNum = n;
              lastStr = s;
            }
          }
          const width = Math.max((lastStr || '').length, 1);
          const nextStr = String((lastNum > 0 ? lastNum + 1 : 1)).padStart(width, '0');
          setNoRegInfo({ last: lastStr, next: nextStr });
          setForm((f) => (f.no_reg ? f : { ...f, no_reg: nextStr }));
          setNoRegError(null);
        } catch (_e2) {
          setNoRegInfo({ last: '', next: '' });
          setNoRegError(null);
        }
      }
    };
    fetchNoReg();
  }, [createOpen, form.kd_dokter, poliIGD, form.tgl_registrasi, dokterLoadedFromDb]);

  useEffect(() => {
    if (usePatientAddress && selectedPatient) {
      const fullAddress = [selectedPatient.alamat, selectedPatient.kelurahan?.nm_kel, selectedPatient.kecamatan?.nm_kec, selectedPatient.kabupaten?.nm_kab]
        .filter(Boolean)
        .join(", ");
      setForm((f) => ({ ...f, almt_pj: fullAddress || selectedPatient.alamatpj || "" }));
    }
  }, [usePatientAddress, selectedPatient]);

  useEffect(() => {
    if (!form.kd_dokter) return;
    const d = (dokterOptions || []).find((x) => String(x.kd_dokter) === String(form.kd_dokter));
    if (d) setForm((f) => ({ ...f, nm_dokter: d.nm_dokter || f.nm_dokter }));
  }, [form.kd_dokter, dokterOptions]);

  const selectPatient = (patient) => {
    const fullAddress = [patient.alamat, patient.kelurahan?.nm_kel, patient.kecamatan?.nm_kec, patient.kabupaten?.nm_kab]
      .filter(Boolean)
      .join(", ");
    setForm((f) => ({
      ...f,
      no_rkm_medis: patient.no_rkm_medis || "",
      nm_pasien: patient.nm_pasien || "",
      p_jawab: patient.namakeluarga || "",
      almt_pj: fullAddress || patient.alamatpj || "",
      kd_poli: "IGDK",
    }));
    setSelectedPatient(patient);
    setSearchTerm("");
    setAlamatTerm("");
    setSearchResults([]);
    if (patient?.no_rkm_medis) {
      checkPoliStatus("IGDK", patient.no_rkm_medis);
    }
    try {
      const nik = sanitizeNik(patient?.no_ktp || "");
      setBpjsNik(nik);
      setBpjsError(null);
      setBpjsData(null);
      if (nik) {
        fetchBpjsByNik(nik);
      }
    } catch {}
  };

  const checkPoliStatus = async (kdPoli, noRkmMedis) => {
    try {
      const url = `/registration/${encodeURIComponent(noRkmMedis)}/check-poli-status`;
      const res = await axios.get(url, { params: { kd_poli: kdPoli } });
      const data = res?.data?.data || {};
      setForm((f) => ({
        ...f,
        status_poli: data.status_poli || f.status_poli || "Baru",
        biaya_reg: typeof data.biaya_reg !== "undefined" ? String(data.biaya_reg) : f.biaya_reg,
      }));
    } catch {}
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

  const header = useMemo(
    () => (
      <motion.div
        variants={itemVariants}
        className="relative px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Activity className="w-6 h-6 text-white" />
            </motion.div>
            <motion.h1
              className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Data Pasien UGD
            </motion.h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setCreateOpen(true)} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2 py-1">
              <Plus className="w-3 h-3 mr-1" />
              Pasien Baru
            </Button>
          </div>
        </div>
      </motion.div>
    ),
    [itemVariants]
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      if (listAbortRef.current) {
        try { listAbortRef.current.abort(); } catch (_) {}
      }
      const controller = new AbortController();
      listAbortRef.current = controller;
      const params = {};
      params.poli = 'IGDK';
      params.per_page = 200;
      if (query) params.search = query;
      if (dateFrom && dateTo) {
        if (dateFrom === dateTo) {
          params.tanggal = dateFrom;
        } else {
          params.tanggal_awal = dateFrom;
          params.tanggal_akhir = dateTo;
        }
      } else if (dateFrom) {
        params.tanggal = dateFrom;
      } else if (dateTo) {
        params.tanggal = dateTo;
      }
      const url = regPeriksaList.url(params);
      const res = await axios.get(url, { signal: controller.signal, headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, withCredentials: true });
      const data = Array.isArray(res?.data?.data?.data)
        ? res.data.data.data
        : Array.isArray(res?.data?.data)
        ? res.data.data
        : Array.isArray(res?.data)
        ? res.data
        : [];
      const normalizeDate = (val) => {
        const s = String(val || '').trim();
        if (!s) return '';
        // Expect formats like 'YYYY-MM-DD' or 'YYYY/MM/DD HH:MM:SS'
        const core = s.slice(0, 10).replace(/\//g, '-');
        return core;
      };
      const withinRange = (row) => {
        const d = normalizeDate(row?.tgl_registrasi);
        if (!d) return false;
        if (dateFrom && dateTo) {
          const from = String(dateFrom);
          const to = String(dateTo);
          return d >= from && d <= to;
        }
        if (dateFrom) return d >= String(dateFrom);
        if (dateTo) return d <= String(dateTo);
        return true;
      };
      const filteredByDate = (data || []).filter(withinRange);
      const filtered = filteredByDate.filter((r) => String(r?.kd_poli || '').trim() === 'IGDK');
      const q = String(query || '').trim().toLowerCase();
      let finalRows = q
        ? filtered.filter((r) => {
            const noRawat = String(r?.no_rawat || '').toLowerCase();
            const noRm = String(r?.no_rkm_medis || '').toLowerCase();
            const nmPasien = String(r?.patient?.nm_pasien || r?.nm_pasien || '').toLowerCase();
            return (
              noRawat.includes(q) || noRm.includes(q) || nmPasien.includes(q)
            );
          })
        : filtered;
      if (q.includes('/')) {
        try {
          const byRawatRes = await axios.get(regPeriksaApi.byRawat.url({ no_rawat: query }), { signal: controller.signal, headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
          const item = byRawatRes?.data?.data;
          if (item && withinRange(item) && String(item?.kd_poli || '').trim() === 'IGDK') {
            const exists = finalRows.some((r) => String(r?.no_rawat || '') === String(item.no_rawat));
            if (!exists) finalRows = [item, ...finalRows];
          }
        } catch (_) {}
      }
      setItems(finalRows);
    } catch (e) {
      const code = e?.code || e?.name || '';
      if (code === 'ERR_CANCELED' || code === 'CanceledError') return;
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [dateFrom, dateTo]);

  const onChange = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e?.target?.value ?? e }));
  };

  const resetForm = () => {
    setForm({
      no_reg: "",
      no_rawat: "",
      tgl_registrasi: todayDateString(),
      jam_reg: (() => { try { return String(nowDateTimeString()).slice(11, 16); } catch { return new Date().toTimeString().slice(0, 5); } })(),
      kd_dokter: "",
      nm_dokter: "",
      no_rkm_medis: "",
      nm_pasien: "",
      kd_poli: "IGDK",
      p_jawab: "",
      almt_pj: "",
      hubunganpj: "Keluarga",
      biaya_reg: "",
      stts: "Belum",
      stts_daftar: "Baru",
      status_lanjut: "Ralan",
      kd_pj: "",
      status_bayar: "Belum Bayar",
      status_poli: "Baru",
    });
    setErrors({});
  };

  const validateCreate = () => {
    const f = form || {};
    const e = {};
    const required = (v) => String(v || "").trim().length > 0;
    if (!required(f.no_rkm_medis)) e.no_rkm_medis = "No. RM wajib diisi";
    if (!required(f.kd_dokter)) e.kd_dokter = "Dokter wajib dipilih";
    if (!required(f.kd_pj)) e.kd_pj = "Cara bayar wajib dipilih";
    if (!required(f.p_jawab)) e.p_jawab = "Nama Penanggung Jawab wajib diisi";
    if (!required(f.almt_pj)) e.almt_pj = "Alamat Penanggung Jawab wajib diisi";
    if (!required(f.hubunganpj)) e.hubunganpj = "Hubungan P.J. wajib diisi";
    if (!required(f.tgl_registrasi)) e.tgl_registrasi = "Tanggal wajib diisi";
    if (!required(f.jam_reg)) e.jam_reg = "Jam wajib diisi";
    // Pastikan kd_poli IGD ada
    if (!required(f.kd_poli)) e.kd_poli = "Poliklinik IGD tidak valid";
    // biaya_reg wajib numeric, default ke 0 jika kosong
    const biayaStr = String(f.biaya_reg ?? "").trim();
    if (!biayaStr) {
      // tidak menandai error, tetapi isi default agar lulus validasi backend
      f.biaya_reg = "0";
    }
    setErrors(e);
    if (Object.keys(e).length) {
      const msg = Object.values(e)
        .map((m) => String(Array.isArray(m) ? m[0] : m))
        .join("\n- ");
      toast.error(`Lengkapi data berikut:\n- ${msg}`);
    }
    return e;
  };

  const submitCreate = async () => {
    const e = validateCreate();
    if (Object.keys(e).length) return;
    const payload = { ...form };
    delete payload.no_rawat;
    delete payload.no_reg;
    payload.kd_poli = "IGDK";
    try {
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true, headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
        await new Promise((r) => setTimeout(r, 300));
      } catch {}
      await axios.post(regPeriksaApi.store.url(), payload, { withCredentials: true, headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
      setCreateOpen(false);
      resetForm();
      fetchData();
    } catch (err) {
      try {
        if (err?.response?.status === 422) {
          const backendErrors = err?.response?.data?.errors || {};
          const messages = Object.values(backendErrors)
            .flat()
            .map((m) => String(m));
          setErrors(backendErrors);
          toast.error(messages.length ? messages.join("\n") : "Validasi gagal");
          return;
        }
        if (err?.response?.status === 419) {
          try {
            await axios.get('/sanctum/csrf-cookie', { withCredentials: true, headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
            await new Promise((r) => setTimeout(r, 300));
            const retryPayload = { ...form };
            delete retryPayload.no_rawat;
            delete retryPayload.no_reg;
            retryPayload.kd_poli = 'IGDK';
            await axios.post(regPeriksaApi.store.url(), retryPayload, { withCredentials: true, headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
            setCreateOpen(false);
            resetForm();
            fetchData();
            return;
          } catch {}
          toast.error('Sesi telah berakhir. Muat ulang halaman dan coba lagi.');
          return;
        }
      } catch {}
    }
  };

  const openCheckIn = (row) => {
    setSelected(row);
    setForm({
      no_reg: row?.no_reg || "",
      no_rawat: row?.no_rawat || "",
      tgl_registrasi: row?.tgl_registrasi || "",
      jam_reg: row?.jam_reg || "",
      kd_dokter: row?.kd_dokter || "",
      nm_dokter: row?.dokter?.nm_dokter || row?.nm_dokter || "",
      no_rkm_medis: row?.no_rkm_medis || "",
      nm_pasien: row?.patient?.nm_pasien || row?.nm_pasien || "",
      kd_poli: row?.kd_poli || "IGDK",
      p_jawab: row?.p_jawab || "",
      almt_pj: row?.almt_pj || "",
      hubunganpj: row?.hubunganpj || "",
      biaya_reg: row?.biaya_reg || "",
      stts: row?.stts || "Belum",
      stts_daftar: row?.stts_daftar || "Baru",
      status_lanjut: "Ralan",
      kd_pj: row?.kd_pj || "",
      status_bayar: row?.status_bayar || "Belum Bayar",
      status_poli: row?.status_poli || "Baru",
    });
    setCheckInForm({ kd_kamar: "", diagnosa_awal: "" });
    setCheckInErrors({});
    setCheckInOpen(true);
  };

  const validateCheckIn = () => {
    const e = {};
    const required = (v) => String(v || "").trim().length > 0;
    if (!required(checkInForm.kd_kamar)) e.kd_kamar = "Kamar wajib dipilih";
    if (!required(checkInForm.diagnosa_awal)) e.diagnosa_awal = "Diagnosa awal wajib diisi";
    setCheckInErrors(e);
    if (Object.keys(e).length) {
      const msg = Object.values(e)
        .map((m) => String(Array.isArray(m) ? m[0] : m))
        .join("\n- ");
      toast.error(`Lengkapi data berikut:\n- ${msg}`);
    }
    return e;
  };

  const submitCheckIn = async () => {
    if (!selected?.no_rawat) {
      toast.error("Data IGD tidak valid");
      return;
    }
    const errs = validateCheckIn();
    if (Object.keys(errs).length) return;
    const id = selected.no_rawat;
    try {
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true, headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
        await new Promise((r) => setTimeout(r, 200));
      } catch {}

      await axios.post(kamarInapApi.store.url(), { no_rawat: id, kd_kamar: checkInForm.kd_kamar, diagnosa_awal: checkInForm.diagnosa_awal }, { withCredentials: true, headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });

      setCheckInOpen(false);
      setCheckInForm({ kd_kamar: '', diagnosa_awal: '' });
      fetchData();
      toast.success('Pasien masuk kamar inap berhasil');
    } catch (err) {
      try {
        if (err?.response?.status === 422) {
          const be = err?.response?.data?.errors || {};
          setCheckInErrors(be);
          const messages = Object.values(be).flat().map((m) => String(m));
          toast.error(messages.length ? messages.join("\n") : 'Validasi gagal');
          return;
        }
        if (err?.response?.status === 419) {
          try {
            await axios.get('/sanctum/csrf-cookie', { withCredentials: true, headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
            await new Promise((r) => setTimeout(r, 200));
            await axios.post(kamarInapApi.store.url(), { no_rawat: id, kd_kamar: checkInForm.kd_kamar, diagnosa_awal: checkInForm.diagnosa_awal }, { withCredentials: true, headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
            setCheckInOpen(false);
            setCheckInForm({ kd_kamar: '', diagnosa_awal: '' });
            fetchData();
            toast.success('Pasien masuk kamar inap berhasil');
            return;
          } catch {}
          toast.error('Sesi telah berakhir. Muat ulang halaman dan coba lagi.');
          return;
        }
      } catch {}
    }
  };

  const openEdit = (row) => {
    setSelected(row);
    setForm({
      no_reg: row?.no_reg || "",
      no_rawat: row?.no_rawat || "",
      tgl_registrasi: row?.tgl_registrasi || "",
      jam_reg: row?.jam_reg || "",
      kd_dokter: row?.kd_dokter || "",
      nm_dokter: row?.dokter?.nm_dokter || row?.nm_dokter || "",
      no_rkm_medis: row?.no_rkm_medis || "",
      nm_pasien: row?.patient?.nm_pasien || row?.nm_pasien || "",
      kd_poli: row?.kd_poli || "",
      p_jawab: row?.p_jawab || "",
      almt_pj: row?.almt_pj || "",
      hubunganpj: row?.hubunganpj || "",
      biaya_reg: row?.biaya_reg || "",
      stts: row?.stts || "Belum",
      stts_daftar: row?.stts_daftar || "Baru",
      status_lanjut: row?.status_lanjut || "Ralan",
      kd_pj: row?.kd_pj || "",
      status_bayar: row?.status_bayar || "Belum Bayar",
      status_poli: row?.status_poli || "Baru",
    });
    if (row?.patient) setSelectedPatient(row.patient);
    const kdPoli = row?.kd_poli || "IGDK";
    if (row?.no_rkm_medis) checkPoliStatus(kdPoli, row.no_rkm_medis);
    setEditOpen(true);
  };

  const openTriase = (row) => {
    setSelected(row);
    setTriaseOpen(true);
  };

  const submitEdit = async () => {
    try {
      const id = selected?.no_rawat || selected?.id || "";
      if (!id) return;
      const payload = { ...form, no_rawat: id };
      await axios.put(regPeriksaApi.actions.update.url(), payload);
      setEditOpen(false);
      setSelected(null);
      resetForm();
      fetchData();
    } catch {}
  };

  const submitDelete = async (row) => {
    try {
      const id = row?.no_rawat || row?.id || "";
      if (!id) return;
      const safeId = encodeURIComponent(id);
      await axios.delete(regPeriksaApi.destroy.url(safeId));
      fetchData();
    } catch {}
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {header}

      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="basis-full sm:basis-[15%]">
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors text-xs h-8 px-2"
          />
        </div>
        <div className="basis-full sm:basis-[15%]">
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors text-xs h-8 px-2"
          />
        </div>
        <div className="relative basis-full sm:flex-1 min-w-0">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari No. Rawat / No. RM / Nama Pasien"
            className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors placeholder:text-gray-400 text-xs h-8 pl-10 pr-2"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <div className="w-8 flex justify-end sm:mt-0 mt-1">
          <Button onClick={fetchData} aria-label="Terapkan" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 p-0 grid place-items-center text-xs">
            <RefreshCw className="w-3 h-3" />
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <Table className="text-xs sm:text-sm">
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
              <TableHead className="text-right px-3 sm:px-4">Aksi</TableHead>
              <TableHead className="px-3 sm:px-4">No. Rawat</TableHead>
              <TableHead className="hidden sm:table-cell px-3 sm:px-4">No. RM</TableHead>
              <TableHead className="px-3 sm:px-4">Pasien</TableHead>
              <TableHead className="hidden md:table-cell px-3 sm:px-4">Dokter</TableHead>
              <TableHead className="px-3 sm:px-4">Tanggal</TableHead>
              <TableHead className="hidden sm:table-cell px-3 sm:px-4">Jam</TableHead>
              <TableHead className="hidden md:table-cell px-3 sm:px-4">Penjamin</TableHead>
              <TableHead className="px-3 sm:px-4">Status</TableHead>
              <TableHead className="px-3 sm:px-4">Lanjut</TableHead>
              <TableHead className="hidden md:table-cell px-3 sm:px-4">Status Bayar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence initial={false}>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={11}>
                    <div className="py-8 text-center text-gray-500 dark:text-gray-400">Memuat data IGD...</div>
                  </TableCell>
                </TableRow>
              ) : items?.length ? (
                items.map((r, idx) => (
                  <motion.tr key={r?.no_rawat || idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <TableCell className="text-right px-3 sm:px-4">
                      <DropdownMenu
                        trigger={
                          <button
                            aria-label="Menu Aksi"
                            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        }
                        position="bottom"
                        align="start"
                      >
                        <DropdownItem onClick={() => openEdit(r)} icon={<Pencil className="w-4 h-4" />}>Edit</DropdownItem>
                        <DropdownItem onClick={() => openTriase(r)} icon={<HeartPulse className="w-4 h-4" />}>Triase</DropdownItem>
                        <DropdownItem onClick={() => openCheckIn(r)} icon={<Activity className="w-4 h-4" />}>Masuk kamar inap</DropdownItem>
                        <DropdownItem onClick={() => submitDelete(r)} icon={<Trash2 className="w-4 h-4" />}>Hapus</DropdownItem>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell className="font-mono px-3 sm:px-4">{r?.no_rawat || "-"}</TableCell>
                    <TableCell className="hidden sm:table-cell px-3 sm:px-4">{r?.no_rkm_medis || "-"}</TableCell>
                    <TableCell className="px-3 sm:px-4">{r?.patient?.nm_pasien || r?.nm_pasien || "-"}</TableCell>
                    <TableCell className="hidden md:table-cell px-3 sm:px-4">{
                      r?.dokter?.nm_dokter
                      || r?.nm_dokter
                      || dokterMap[String(r?.kd_dokter || '').trim()]
                      || r?.kd_dokter
                      || "-"
                    }</TableCell>
                    <TableCell className="px-3 sm:px-4">{r?.tgl_registrasi || "-"}</TableCell>
                    <TableCell className="hidden sm:table-cell px-3 sm:px-4">{r?.jam_reg || "-"}</TableCell>
                    <TableCell className="hidden md:table-cell px-3 sm:px-4">{
                      r?.penjab?.png_jawab
                      || penjabMap[String(r?.kd_pj || '').trim()]
                      || r?.kd_pj
                      || "-"
                    }</TableCell>
                    <TableCell className="px-3 sm:px-4">{r?.stts || r?.stts_daftar || "-"}</TableCell>
                    <TableCell className="px-3 sm:px-4">
                      <Badge
                        variant={
                          r?.status_lanjut === "Ranap"
                            ? "danger"
                            : r?.status_lanjut === "Ralan"
                            ? "success"
                            : "default"
                        }
                        size="sm"
                      >
                        {r?.status_lanjut || "-"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell px-3 sm:px-4">{r?.status_bayar || "-"}</TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11}>
                    <div className="py-8 text-center text-gray-500 dark:text-gray-400">Belum ada data IGD</div>
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>

      <Modal show={createOpen} onClose={() => setCreateOpen(false)} size="wide" className="max-w-full sm:max-w-7xl mx-2 sm:mx-0">
        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Tambah Pasien UGD
              </h3>
              <Button onClick={() => setIsPatientModalOpen(true)} variant="success" size="sm" className="px-2 py-1 text-xs h-7">
                <Plus className="w-3 h-3 mr-1" /> Pasien Baru
              </Button>
            </div>
          </div>
          <div className="relative p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
            <div className="md:col-span-2 space-y-3">
              <div className="flex flex-col md:flex-row gap-2 sm:gap-3 items-stretch">
                <div className="relative md:basis-[40%]">
                  <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Cari Pasien (Nama / NIK / No Peserta / No. RM)" className="h-8 pl-10 text-xs" />
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <div className="md:basis-[35%]">
                  <Input value={alamatTerm} onChange={(e) => setAlamatTerm(e.target.value)} placeholder="Filter Alamat (opsional)" className="h-8 text-xs" />
                </div>
                <div className="md:basis-[15%]">
                  <Input type="date" value={form.tgl_registrasi} onChange={onChange("tgl_registrasi")} className="h-8 text-xs" error={!!errors.tgl_registrasi} />
                </div>
                <div className="md:basis-[10%]">
                  <Input type="time" value={form.jam_reg} onChange={onChange("jam_reg")} className="h-8 text-xs" error={!!errors.jam_reg} />
                </div>
              </div>
              <div className="max-h-56 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700">
                {isSearching ? (
                  <div className="p-2 text-xs text-gray-500 dark:text-gray-400">Mencari pasien...</div>
                ) : (searchResults?.length ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {searchResults.map((p) => (
                      <li key={p.no_rkm_medis} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer" onClick={() => selectPatient(p)}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{p.nm_pasien} <span className="font-mono text-xs text-gray-500">({p.no_rkm_medis})</span></div>
                            <div className="text-xs text-gray-600 dark:text-gray-300">{[p.alamat, p.kelurahan?.nm_kel, p.kecamatan?.nm_kec, p.kabupaten?.nm_kab].filter(Boolean).join(', ')}</div>
                          </div>
                        <Button onClick={(e) => { e.stopPropagation(); selectPatient(p); }} size="sm" className="px-2 py-1 text-xs h-7 bg-blue-600 hover:bg-blue-700 text-white">Pilih</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-2 text-xs text-gray-500 dark:text-gray-400">Tidak ada hasil</div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-end">
              <div className="sm:basis-[10%] w-full">
                <Label>No. RM</Label>
                <Input value={form.no_rkm_medis} onChange={onChange("no_rkm_medis")} placeholder="No. RM" className="h-8 text-xs px-2 py-1" error={!!errors.no_rkm_medis} />
              </div>
              <div className="sm:basis-[30%] w-full">
                <Label>Nama Pasien</Label>
                <Input value={form.nm_pasien} onChange={onChange("nm_pasien")} placeholder="Nama Pasien" className="h-8 text-xs px-2 py-1" />
              </div>
              <div className="sm:basis-[10%] w-full">
                <Label required>Poliklinik</Label>
                <div className="px-2 py-1 h-8 flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-xs text-gray-900 dark:text-white">
                  {(poliIGD?.nm_poli || "IGD")} <span className="text-xs text-gray-500">({poliIGD?.kd_poli || "IGDK"})</span>
                </div>
              </div>
              <div className="sm:basis-[25%] w-full">
                <Label required>Dokter</Label>
                <select value={form.kd_dokter} onChange={onChange("kd_dokter")} className={`w-full h-8 px-2 py-1 text-xs border rounded-lg focus:ring-2 dark:bg-gray-700 dark:text-white ${errors.kd_dokter ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent'}`}> 
                  <option value="">Pilih Dokter</option>
                  {(Array.isArray(dokterOptions) ? dokterOptions : []).map((d) => (
                    <option key={d.kd_dokter} value={d.kd_dokter}>{d.nm_dokter}</option>
                  ))}
                </select>
              </div>
              <div className="sm:basis-[25%] w-full">
                <Label required>Cara Bayar</Label>
                <select value={form.kd_pj} onChange={onChange("kd_pj")} className={`w-full h-8 px-2 py-1 text-xs border rounded-lg focus:ring-2 dark:bg-gray-700 dark:text-white ${errors.kd_pj ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent'}`}> 
                  <option value="">Pilih Cara Bayar</option>
                  {(Array.isArray(penjabOptions) ? penjabOptions : []).map((p) => (
                    <option key={p.kd_pj} value={p.kd_pj}>{p.png_jawab}</option>
                  ))}
                </select>
              </div>
            </div>

              <div className="flex items-center gap-2 flex-wrap">
              <Label className="mb-0 text-xs">Status Poli</Label>
              <span className={(form.status_poli === "Baru") ? "inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" : "inline-flex px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"}>
                {form.status_poli || "Baru"}
              </span>
              <Label className="mb-0 text-xs">Biaya Registrasi</Label>
              <div className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-xs text-gray-900 dark:text-white">
                {currency.format(Number(form.biaya_reg || 0))}
              </div>
              <Label className="mb-0 text-xs">No. Registrasi</Label>
              <span className="text-[10px] text-gray-500 dark:text-gray-400">Terakhir: {noRegInfo.last || '-'}</span>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <Input value={form.no_reg} onChange={onChange("no_reg")} placeholder="No. Registrasi" className="h-8 text-xs px-2 py-1 w-40 md:w-48" readOnly />
                  <div className="hidden md:flex items-center gap-2 ml-2">
                    {bpjsLoading ? (
                      <span className="text-gray-600 text-xs">Memuat…</span>
                    ) : bpjsError ? (
                      <span className="text-red-700 text-xs">{bpjsError}</span>
                    ) : (bpjsData?.response ? (
                      <>
                        <span className="text-[10px] text-gray-700">Status BPJS :</span>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${bpjsData.response?.aktif ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {bpjsData.response?.aktif ? 'AKTIF' : 'TIDAK AKTIF'}
                        </span>
                        <span className="text-xs text-gray-700 truncate max-w-[12rem]">
                          FKTP: {bpjsData.response?.kdProviderPst?.nmProvider || '-'}
                        </span>
                      </>
                    ) : null)}
                  </div>
                </div>
            </div>

            

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required className="text-xs">Nama Penanggung Jawab</Label>
                  <Input value={form.p_jawab} onChange={onChange("p_jawab")} placeholder="Nama Penanggung Jawab" className="h-8 text-xs px-2 py-1" error={!!errors.p_jawab} />
                </div>
                <div>
                  <Label required className="text-xs">Hubungan</Label>
                  <Input value={form.hubunganpj} onChange={onChange("hubunganpj")} placeholder="Hubungan P.J." className="h-8 text-xs px-2 py-1" error={!!errors.hubunganpj} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label required className="text-xs">Alamat Penanggung Jawab</Label>
                  {selectedPatient && (
                    <label className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                      <input type="checkbox" checked={usePatientAddress} onChange={(e) => setUsePatientAddress(e.target.checked)} />
                      Gunakan alamat pasien
                    </label>
                  )}
                </div>
                <Input value={form.almt_pj} onChange={onChange("almt_pj")} placeholder="Alamat Penanggung Jawab" className="h-8 text-xs px-2 py-1" error={!!errors.almt_pj} />
              </div>
            </div>
          </div>
          <div className="relative px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-end gap-2">
            <Button onClick={() => setCreateOpen(false)} className="bg-gray-200 dark:bg-gray-700">Batal</Button>
            <Button onClick={submitCreate} className="bg-indigo-600 hover:bg-indigo-700 text-white">Simpan</Button>
          </div>
        </div>
      </Modal>

      {isPatientModalOpen && (
        <PatientCreateModal
          isOpen={isPatientModalOpen}
          onClose={() => setIsPatientModalOpen(false)}
          onSuccess={(newPatient) => {
            setIsPatientModalOpen(false);
            if (newPatient && newPatient.no_rkm_medis) {
              setSearchTerm(newPatient.no_rkm_medis);
              handleSearch(newPatient.no_rkm_medis, alamatTerm);
            }
          }}
        />
      )}

      <Modal show={editOpen} onClose={() => setEditOpen(false)}>
        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
          <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-amber-50/80 via-orange-50/80 to-red-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Pencil className="w-4 h-4" />
              Edit IGD
            </h3>
          </div>
          <div className="relative p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>No. RM</Label>
                <Input value={form.no_rkm_medis} onChange={onChange("no_rkm_medis")} placeholder="No. RM" />
                <div className="mt-3">
                  <Label>Nama Pasien</Label>
                  <Input value={form.nm_pasien} onChange={onChange("nm_pasien")} placeholder="Nama Pasien" />
                </div>
              </div>
              <div>
                <Label required>Poliklinik</Label>
                <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white">
                  {(poliIGD?.nm_poli || "IGD")} <span className="text-xs text-gray-500">({poliIGD?.kd_poli || "IGDK"})</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label required>Dokter</Label>
                <select value={form.kd_dokter} onChange={onChange("kd_dokter")} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value="">Pilih Dokter</option>
                  {(Array.isArray(dokterOptions) ? dokterOptions : []).map((d) => (
                    <option key={d.kd_dokter} value={d.kd_dokter}>{d.nm_dokter}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label required>Cara Bayar</Label>
                <select value={form.kd_pj} onChange={onChange("kd_pj")} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value="">Pilih Cara Bayar</option>
                  {(Array.isArray(penjabOptions) ? penjabOptions : []).map((p) => (
                    <option key={p.kd_pj} value={p.kd_pj}>{p.png_jawab}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label required>Tanggal</Label>
                <Input type="date" value={form.tgl_registrasi} onChange={onChange("tgl_registrasi")} />
              </div>
              <div>
                <Label required>Jam</Label>
                <Input type="time" value={form.jam_reg} onChange={onChange("jam_reg")} />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Label className="mb-0 text-xs">Status Poli</Label>
              <span className={(form.status_poli === "Baru") ? "inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" : "inline-flex px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"}>
                {form.status_poli || "Baru"}
              </span>
              <Label className="mb-0 text-xs">Biaya Registrasi</Label>
              <div className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-xs text-gray-900 dark:text-white">
                {currency.format(Number(form.biaya_reg || 0))}
              </div>
              <Label className="mb-0 text-xs">No. Registrasi</Label>
              <span className="text-[10px] text-gray-500 dark:text-gray-400">Terakhir: {noRegInfo.last || '-'}</span>
              <Input value={form.no_reg} onChange={onChange("no_reg")} placeholder="No. Registrasi" className="h-8 text-xs px-2 py-1 w-40 md:w-48" />
            </div>

            

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required className="text-xs">Nama Penanggung Jawab</Label>
                  <Input value={form.p_jawab} onChange={onChange("p_jawab")} placeholder="Nama Penanggung Jawab" className="h-8 text-xs px-2 py-1" />
                </div>
                <div>
                  <Label required className="text-xs">Hubungan</Label>
                  <Input value={form.hubunganpj} onChange={onChange("hubunganpj")} placeholder="Hubungan P.J." className="h-8 text-xs px-2 py-1" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label required className="text-xs">Alamat Penanggung Jawab</Label>
                  {selectedPatient && (
                    <label className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                      <input type="checkbox" checked={usePatientAddress} onChange={(e) => setUsePatientAddress(e.target.checked)} />
                      Gunakan alamat pasien
                    </label>
                  )}
                </div>
                <Input value={form.almt_pj} onChange={onChange("almt_pj")} placeholder="Alamat Penanggung Jawab" className="h-8 text-xs px-2 py-1" />
              </div>
            </div>
          </div>
          <div className="relative px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-end gap-2">
            <Button onClick={() => setEditOpen(false)} className="bg-gray-200 dark:bg-gray-700">Batal</Button>
            <Button onClick={submitEdit} className="bg-amber-600 hover:bg-amber-700 text-white">Simpan Perubahan</Button>
          </div>
        </div>
      </Modal>

      <Modal show={checkInOpen} onClose={() => setCheckInOpen(false)}>
        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500" />
          <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-emerald-50/80 via-teal-50/80 to-sky-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Masuk Kamar Inap (Check In)
            </h3>
          </div>
          <div className="relative p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label required>Pilih Kamar</Label>
                <select
                  value={checkInForm.kd_kamar}
                  onChange={(e) => setCheckInForm((s) => ({ ...s, kd_kamar: e.target.value }))}
                  className={`w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-emerald-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ${checkInErrors.kd_kamar ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                >
                  <option value="">Pilih kamar kosong</option>
                  {(Array.isArray(checkInRooms) ? checkInRooms : []).map((k) => (
                    <option key={k.kd_kamar} value={k.kd_kamar}>
                      {(k.nm_bangsal || k.kd_bangsal)} — {k.kd_kamar} {k.kelas ? `(${k.kelas})` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label required>Diagnosa Awal</Label>
                <Input
                  value={checkInForm.diagnosa_awal}
                  onChange={(e) => setCheckInForm((s) => ({ ...s, diagnosa_awal: e.target.value }))}
                  placeholder="Contoh: Pneumonia"
                  className={`h-10 text-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-emerald-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ${checkInErrors.diagnosa_awal ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                />
              </div>
            </div>
          </div>
          <div className="relative px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-end gap-2">
            <Button onClick={() => setCheckInOpen(false)} className="bg-gray-200 dark:bg-gray-700">Batal</Button>
            <Button onClick={submitCheckIn} className="bg-emerald-600 hover:bg-emerald-700 text-white">Simpan</Button>
          </div>
        </div>
      </Modal>

      <Modal show={triaseOpen} onClose={() => setTriaseOpen(false)} size="xxl">
        <TriaseUGD
          row={selected}
          onClose={() => setTriaseOpen(false)}
          onSubmit={async (payload) => {
            try {
              if (!payload?.no_rawat || String(payload.no_rawat).trim() === '') {
                toast.error('No. Rawat tidak ditemukan. Tidak dapat menyimpan triase.');
                return;
              }
              const data = {
                ...payload,
                indikator: Array.isArray(payload?.indikator) ? payload.indikator.join(', ') : (payload?.indikator || ''),
              };
              await axios.post('/triase-ugd', data, { headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, withCredentials: true });
              toast.success("Triase disimpan");
              setTriaseOpen(false);
            } catch (e) {
              const msg = e?.response?.data?.message || e?.message || 'Gagal menyimpan triase';
              toast.error(msg);
            }
          }}
        />
      </Modal>
    </motion.div>
  );
}
