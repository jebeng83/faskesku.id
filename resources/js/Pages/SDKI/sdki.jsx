import React, { useEffect, useMemo, useState, useRef } from "react";
import { Head } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarRalan from "@/Layouts/SidebarRalan";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input, Label, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Toaster } from "@/Components/ui";
import { Save, Pencil, Trash2, Search, Plus, MessageSquare, Eye } from "lucide-react";
import Modal from "@/Components/Modal";
import toast from "@/tools/toast";
import SearchableSelect from "@/Components/SearchableSelect";

export default function SDKIIndex() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [toasts, setToasts] = useState([]);
  const pushToast = (t) => setToasts((arr) => [...arr, { id: Date.now() + Math.random(), ...t }]);
  const removeToast = (id) => setToasts((arr) => arr.filter((x) => x.id !== id));

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  const [createForm, setCreateForm] = useState({
    kode: "",
    nama: "",
    kategori: "",
    subkategori: "",
    definisi: "",
  });

  const [kategoriModalOpen, setKategoriModalOpen] = useState(false);
  const [kategoriRecords, setKategoriRecords] = useState([]);
  const [kategoriLoading, setKategoriLoading] = useState(false);
  const [kategoriQuery, setKategoriQuery] = useState("");
  const [kategoriForm, setKategoriForm] = useState({ kode: "", nama: "" });
  const [kategoriEditId, setKategoriEditId] = useState(null); // ID atau kode kategori yang sedang diedit
  const kategoriCodeGeneratedRef = useRef(false); // Flag untuk mencegah generate berulang

  const [subkategoriModalOpen, setSubkategoriModalOpen] = useState(false);
  const [subkategoriRecords, setSubkategoriRecords] = useState([]);
  const [subkategoriLoading, setSubkategoriLoading] = useState(false);
  const [subkategoriQuery, setSubkategoriQuery] = useState("");
  const [subkategoriForm, setSubkategoriForm] = useState({ kode: "", nama: "", kategori: "" });
  const [subkategoriEditId, setSubkategoriEditId] = useState(null);
  const subkategoriCodeGeneratedRef = useRef(false); // Flag untuk mencegah generate berulang
  const sdkiCodeGeneratedRef = useRef(false); // Flag untuk mencegah generate kode SDKI berulang

  // State untuk Keluhan Subyektif
  const [keluhanSubyektifModalOpen, setKeluhanSubyektifModalOpen] = useState(false);
  const [keluhanSubyektifRecords, setKeluhanSubyektifRecords] = useState([]);
  const [keluhanSubyektifLoading, setKeluhanSubyektifLoading] = useState(false);
  const [keluhanSubyektifForm, setKeluhanSubyektifForm] = useState({ kode: "", keluhan: "" });
  const [keluhanSubyektifEditId, setKeluhanSubyektifEditId] = useState(null);
  const [selectedSdki, setSelectedSdki] = useState(null); // SDKI yang dipilih untuk keluhan subyektif
  const keluhanSubyektifCodeGeneratedRef = useRef(false); // Flag untuk mencegah generate berulang

  // State untuk Data Obyektif
  const [dataObyektifModalOpen, setDataObyektifModalOpen] = useState(false);
  const [dataObyektifRecords, setDataObyektifRecords] = useState([]);
  const [dataObyektifLoading, setDataObyektifLoading] = useState(false);
  const [dataObyektifForm, setDataObyektifForm] = useState({ kode: "", keluhan: "" });
  const [dataObyektifEditId, setDataObyektifEditId] = useState(null);
  const [selectedSdkiObyektif, setSelectedSdkiObyektif] = useState(null); // SDKI yang dipilih untuk data obyektif
  const dataObyektifCodeGeneratedRef = useRef(false); // Flag untuk mencegah generate berulang

  const routeSafe = (name, params = [], absolute = false) => {
    try { 
      return route(name, params, absolute); 
    } catch (error) {
      // Log error untuk debugging
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Route ${name} not found:`, error);
      }
      return null; 
    }
  };

  // Helper untuk mendapatkan CSRF token
  const getCsrfToken = () => {
    // Coba dari meta tag terlebih dahulu
    const metaToken = document.head.querySelector('meta[name="csrf-token"]');
    if (metaToken) return metaToken.getAttribute('content');
    
    // Fallback ke cookie XSRF-TOKEN
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'XSRF-TOKEN') {
        return decodeURIComponent(value);
      }
    }
    return null;
  };


  const listUrl = routeSafe("api.sdki.index", [], false) || "/api/sdki";
  const createUrl = routeSafe("api.sdki.store", [], false) || "/api/sdki";
  const updateUrl = (idOrKode) => routeSafe("api.sdki.update", idOrKode, false) || `/api/sdki/${encodeURIComponent(idOrKode)}`;
  const destroyUrl = (idOrKode) => routeSafe("api.sdki.destroy", idOrKode, false) || `/api/sdki/${encodeURIComponent(idOrKode)}`;

  const kategoriListUrl = routeSafe('api.kategori-sdki.index') || "/api/kategori-sdki";
  const kategoriCreateUrl = routeSafe('api.kategori-sdki.store') || "/api/kategori-sdki";
  const kategoriUpdateUrl = (idOrKey) => routeSafe('api.kategori-sdki.update', idOrKey, false) || `/api/kategori-sdki/${encodeURIComponent(idOrKey)}`;
  const kategoriDestroyUrl = (idOrKey) => routeSafe('api.kategori-sdki.destroy', idOrKey, false) || `/api/kategori-sdki/${encodeURIComponent(idOrKey)}`;

  const subkategoriListUrl = routeSafe('api.subkategori-sdki.index') || "/api/subkategori-sdki";
  const subkategoriCreateUrl = routeSafe('api.subkategori-sdki.store') || "/api/subkategori-sdki";
  const subkategoriUpdateUrl = (idOrKey) => routeSafe('api.subkategori-sdki.update', idOrKey, false) || `/api/subkategori-sdki/${encodeURIComponent(idOrKey)}`;
  const subkategoriDestroyUrl = (idOrKey) => routeSafe('api.subkategori-sdki.destroy', idOrKey, false) || `/api/subkategori-sdki/${encodeURIComponent(idOrKey)}`;

  const keluhanSubyektifListUrl = routeSafe('api.keluhan-subyektif.index') || "/api/keluhan-subyektif";
  const keluhanSubyektifCreateUrl = routeSafe('api.keluhan-subyektif.store') || "/api/keluhan-subyektif";
  const keluhanSubyektifUpdateUrl = (idOrKey) => routeSafe('api.keluhan-subyektif.update', idOrKey, false) || `/api/keluhan-subyektif/${encodeURIComponent(idOrKey)}`;
  const keluhanSubyektifDestroyUrl = (idOrKey) => routeSafe('api.keluhan-subyektif.destroy', idOrKey, false) || `/api/keluhan-subyektif/${encodeURIComponent(idOrKey)}`;

  const dataObyektifListUrl = routeSafe('api.data-obyektif.index') || "/api/data-obyektif";
  const dataObyektifCreateUrl = routeSafe('api.data-obyektif.store') || "/api/data-obyektif";
  const dataObyektifUpdateUrl = (idOrKey) => routeSafe('api.data-obyektif.update', idOrKey, false) || `/api/data-obyektif/${encodeURIComponent(idOrKey)}`;
  const dataObyektifDestroyUrl = (idOrKey) => routeSafe('api.data-obyektif.destroy', idOrKey, false) || `/api/data-obyektif/${encodeURIComponent(idOrKey)}`;

  const getVal = (obj, keys, fallback = "") => {
    for (const k of keys) {
      const v = obj?.[k];
      if (v !== undefined && v !== null) return v;
    }
    return fallback;
  };

  const keyId = (item) => {
    return (
      item?.id ?? item?.kode ?? item?.code ?? item?.kd ?? item?.kd_sdki ?? ""
    );
  };

  const loadRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch(listUrl);
      if (res.ok) {
        const json = await res.json();
        const list = Array.isArray(json) ? json : (json?.data || json?.list || []);
        setRecords(list);
      } else {
        pushToast({ type: "error", title: "Gagal memuat SDKI", message: `Status ${res.status}` });
      }
    } catch (_) {
      pushToast({ type: "error", title: "Koneksi gagal", message: "Tidak bisa memuat data SDKI" });
      toast.error("Tidak bisa memuat data SDKI");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRecords(); }, []);

  // Auto-generate kode SDKI saat records dimuat dan form kode kosong
  useEffect(() => {
    if (records.length > 0 && !sdkiCodeGeneratedRef.current) {
      if (!createForm.kode || createForm.kode.trim() === "") {
        const nextKode = generateNextKodeSDKI();
        setCreateForm(prev => ({ ...prev, kode: nextKode }));
        sdkiCodeGeneratedRef.current = true;
      }
    }
  }, [records.length]);

  const loadKategori = async () => {
    
    setKategoriLoading(true);
    try {
      const res = await fetch(kategoriListUrl + (kategoriQuery ? `?q=${encodeURIComponent(kategoriQuery)}` : ""), {
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
      });
      if (res.ok) {
        const json = await res.json();
        const list = Array.isArray(json) ? json : (json?.data || json?.list || []);
        setKategoriRecords(list);
      }
    } catch (_) {
      toast.error("Tidak bisa memuat kategori");
    } finally {
      setKategoriLoading(false);
    }
  };
  useEffect(() => { 
    if (kategoriModalOpen) {
      kategoriCodeGeneratedRef.current = false; // Reset flag saat modal dibuka
      loadKategori(); 
    }
  }, [kategoriModalOpen]);

  // Auto-generate kode kategori saat modal dibuka dan form kosong
  useEffect(() => {
    if (kategoriModalOpen && !kategoriEditId && kategoriRecords.length > 0 && !kategoriCodeGeneratedRef.current) {
      if (!kategoriForm.kode || kategoriForm.kode.trim() === "") {
        const nextKode = generateNextKodeKategori();
        setKategoriForm(prev => ({ ...prev, kode: nextKode }));
        kategoriCodeGeneratedRef.current = true; // Set flag setelah generate
      }
    }
  }, [kategoriModalOpen, kategoriRecords.length, kategoriEditId]);

  // Fungsi untuk generate kode kategori berikutnya
  const generateNextKodeKategori = () => {
    if (kategoriRecords.length === 0) {
      return "001";
    }
    
    // Ambil semua kode kategori yang ada
    const kodes = kategoriRecords
      .map(r => {
        const kode = r?.kode ?? r?.kd_kategori ?? r?.code ?? r?.kd ?? "";
        // Cek apakah kode adalah angka (format 000)
        const num = parseInt(kode, 10);
        return isNaN(num) ? null : num;
      })
      .filter(num => num !== null)
      .sort((a, b) => b - a); // Sort descending
    
    if (kodes.length === 0) {
      return "001";
    }
    
    // Ambil nomor terbesar dan tambah 1
    const nextNum = kodes[0] + 1;
    
    // Format dengan leading zeros (3 digit)
    return String(nextNum).padStart(3, '0');
  };

  // Fungsi untuk generate kode subkategori berikutnya dengan format S.000
  const generateNextKodeSubkategori = () => {
    if (subkategoriRecords.length === 0) {
      return "S.001";
    }
    
    // Ambil semua kode subkategori yang ada
    const kodes = subkategoriRecords
      .map(r => {
        const kode = r?.kode ?? r?.kd_subkategori ?? r?.code ?? r?.kd ?? "";
        // Cek apakah kode mengikuti format S.000
        const match = kode.match(/^S\.(\d+)$/i);
        if (match) {
          return parseInt(match[1], 10);
        }
        return null;
      })
      .filter(num => num !== null)
      .sort((a, b) => b - a); // Sort descending
    
    if (kodes.length === 0) {
      return "S.001";
    }
    
    // Ambil nomor terbesar dan tambah 1
    const nextNum = kodes[0] + 1;
    
    // Format dengan S. dan leading zeros (3 digit)
    return `S.${String(nextNum).padStart(3, '0')}`;
  };

  // Fungsi untuk generate kode SDKI berikutnya dengan format D.0000
  const generateNextKodeSDKI = () => {
    if (records.length === 0) {
      return "D.0001";
    }
    
    // Ambil semua kode SDKI yang ada
    const kodes = records
      .map(r => {
        const kode = r?.kode ?? r?.kd_sdki ?? r?.code ?? r?.kd ?? "";
        // Cek apakah kode mengikuti format D.0000 (4 digit setelah titik)
        const match = kode.match(/^D\.(\d+)$/i);
        if (match) {
          return parseInt(match[1], 10);
        }
        return null;
      })
      .filter(num => num !== null)
      .sort((a, b) => b - a); // Sort descending
    
    if (kodes.length === 0) {
      return "D.0001";
    }
    
    // Ambil nomor terbesar dan tambah 1
    const nextNum = kodes[0] + 1;
    
    // Format dengan D. dan leading zeros (4 digit)
    return `D.${String(nextNum).padStart(4, '0')}`;
  };
  
  // Load kategori saat modal subkategori dibuka untuk mendapatkan kode kategori
  useEffect(() => { 
    if (subkategoriModalOpen && kategoriRecords.length === 0) {
      loadKategori();
    }
  }, [subkategoriModalOpen]);

  const loadSubkategori = async () => {
    setSubkategoriLoading(true);
    try {
      // Pastikan menggunakan URL yang benar
      const baseUrl = subkategoriListUrl || "/api/subkategori-sdki";
      const queryParams = [];
      if (subkategoriQuery) {
        queryParams.push(`q=${encodeURIComponent(subkategoriQuery)}`);
      }
      if (createForm.kategori) {
        // Cari kode kategori dari nama kategori jika perlu
        const kategoriRecord = kategoriRecords.find(k => 
          (k?.nama ?? k?.nm_kategori ?? k?.label ?? "").toLowerCase() === createForm.kategori.toLowerCase()
        );
        const kategoriKode = kategoriRecord?.kode ?? kategoriRecord?.kd_kategori ?? createForm.kategori;
        queryParams.push(`kategori=${encodeURIComponent(kategoriKode)}`);
      }
      const url = baseUrl + (queryParams.length > 0 ? `?${queryParams.join('&')}` : "");
      
      const res = await fetch(url, {
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
      });
      if (res.ok) {
        const json = await res.json();
        const list = Array.isArray(json) ? json : (json?.data || json?.list || []);
        setSubkategoriRecords(list);
      } else {
        console.error("Error loading subkategori:", res.status, res.statusText);
        toast.error(`Gagal memuat subkategori (${res.status})`);
      }
    } catch (error) {
      console.error("Error loading subkategori:", error);
      toast.error("Tidak bisa memuat subkategori");
    } finally {
      setSubkategoriLoading(false);
    }
  };
  useEffect(() => { 
    if (subkategoriModalOpen) {
      subkategoriCodeGeneratedRef.current = false; // Reset flag saat modal dibuka
      loadSubkategori(); 
    }
  }, [subkategoriModalOpen, createForm.kategori]);

  // Load keluhan subyektif
  const loadKeluhanSubyektif = async () => {
    if (!selectedSdki) return;
    
    setKeluhanSubyektifLoading(true);
    try {
      const sdkiKode = selectedSdki?.kode ?? selectedSdki?.kd_sdki ?? "";
      const kategoriKode = selectedSdki?.kategori ?? selectedSdki?.kd_kategori ?? "";
      const subkategoriKode = selectedSdki?.subkategori ?? selectedSdki?.kd_subkategori ?? "";
      
      const params = new URLSearchParams();
      if (sdkiKode) params.append('kd_sdki', sdkiKode);
      if (kategoriKode) params.append('kd_kategori', kategoriKode);
      if (subkategoriKode) params.append('kd_subkategori', subkategoriKode);
      
      const url = `${keluhanSubyektifListUrl}?${params.toString()}`;
      const res = await fetch(url, {
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
      });
      if (res.ok) {
        const json = await res.json();
        const list = Array.isArray(json) ? json : (json?.data || json?.list || []);
        setKeluhanSubyektifRecords(list);
      } else {
        toast.error("Gagal memuat keluhan subyektif");
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error loading keluhan subyektif:", error);
      }
      toast.error("Tidak bisa memuat keluhan subyektif");
    } finally {
      setKeluhanSubyektifLoading(false);
    }
  };

  // Fungsi untuk generate kode keluhan subyektif berikutnya
  const generateNextKodeKeluhanSubyektif = () => {
    if (keluhanSubyektifRecords.length === 0) {
      return "SUB1";
    }
    
    // Ambil semua kode keluhan subyektif yang ada
    const kodes = keluhanSubyektifRecords
      .map(r => {
        const kode = r?.kode ?? r?.kd_sub ?? "";
        // Cek apakah kode mengikuti format SUB### atau hanya angka
        const match = kode.match(/^SUB(\d+)$/i);
        if (match) {
          return parseInt(match[1], 10);
        }
        // Coba cari angka di akhir
        const numMatch = kode.match(/(\d+)$/);
        if (numMatch) {
          return parseInt(numMatch[1], 10);
        }
        return null;
      })
      .filter(num => num !== null)
      .sort((a, b) => b - a); // Sort descending
    
    if (kodes.length === 0) {
      return "SUB1";
    }
    
    // Ambil nomor terbesar dan tambah 1
    const nextNum = kodes[0] + 1;
    
    // Format dengan SUB dan nomor
    return `SUB${nextNum}`;
  };

  useEffect(() => {
    if (keluhanSubyektifModalOpen && selectedSdki) {
      keluhanSubyektifCodeGeneratedRef.current = false; // Reset flag saat modal dibuka
      loadKeluhanSubyektif();
      setKeluhanSubyektifForm({ kode: "", keluhan: "" });
      setKeluhanSubyektifEditId(null);
    }
  }, [keluhanSubyektifModalOpen, selectedSdki]);

  // Load data obyektif
  const loadDataObyektif = async () => {
    if (!selectedSdkiObyektif) return;
    
    setDataObyektifLoading(true);
    try {
      const sdkiKode = selectedSdkiObyektif?.kode ?? selectedSdkiObyektif?.kd_sdki ?? "";
      const kategoriKode = selectedSdkiObyektif?.kategori ?? selectedSdkiObyektif?.kd_kategori ?? "";
      const subkategoriKode = selectedSdkiObyektif?.subkategori ?? selectedSdkiObyektif?.kd_subkategori ?? "";
      
      const params = new URLSearchParams();
      if (sdkiKode) params.append('kd_sdki', sdkiKode);
      if (kategoriKode) params.append('kd_kategori', kategoriKode);
      if (subkategoriKode) params.append('kd_subkategori', subkategoriKode);
      
      const url = `${dataObyektifListUrl}?${params.toString()}`;
      const res = await fetch(url, {
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
      });
      if (res.ok) {
        const json = await res.json();
        const list = Array.isArray(json) ? json : (json?.data || json?.list || []);
        setDataObyektifRecords(list);
      } else {
        toast.error("Gagal memuat data obyektif");
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error loading data obyektif:", error);
      }
      toast.error("Tidak bisa memuat data obyektif");
    } finally {
      setDataObyektifLoading(false);
    }
  };

  // Fungsi untuk generate kode data obyektif berikutnya
  const generateNextKodeDataObyektif = () => {
    if (dataObyektifRecords.length === 0) {
      return "OBY1";
    }
    
    // Ambil semua kode data obyektif yang ada
    const kodes = dataObyektifRecords
      .map(r => {
        const kode = r?.kode ?? r?.kd_oby ?? "";
        // Cek apakah kode mengikuti format OBY### atau hanya angka
        const match = kode.match(/^OBY(\d+)$/i);
        if (match) {
          return parseInt(match[1], 10);
        }
        // Coba cari angka di akhir
        const numMatch = kode.match(/(\d+)$/);
        if (numMatch) {
          return parseInt(numMatch[1], 10);
        }
        return null;
      })
      .filter(num => num !== null)
      .sort((a, b) => b - a); // Sort descending
    
    if (kodes.length === 0) {
      return "OBY1";
    }
    
    // Ambil nomor terbesar dan tambah 1
    const nextNum = kodes[0] + 1;
    
    // Format dengan OBY dan nomor
    return `OBY${nextNum}`;
  };

  useEffect(() => {
    if (dataObyektifModalOpen && selectedSdkiObyektif) {
      dataObyektifCodeGeneratedRef.current = false; // Reset flag saat modal dibuka
      loadDataObyektif();
      setDataObyektifForm({ kode: "", keluhan: "" });
      setDataObyektifEditId(null);
    }
  }, [dataObyektifModalOpen, selectedSdkiObyektif]);

  // Auto-generate kode data obyektif saat modal dibuka dan data sudah dimuat
  useEffect(() => {
    if (dataObyektifModalOpen && !dataObyektifEditId && dataObyektifRecords.length >= 0 && !dataObyektifCodeGeneratedRef.current) {
      // Hanya generate jika kode masih kosong
      if (!dataObyektifForm.kode || dataObyektifForm.kode.trim() === "") {
        const nextKode = generateNextKodeDataObyektif();
        setDataObyektifForm(prev => ({ ...prev, kode: nextKode }));
        dataObyektifCodeGeneratedRef.current = true; // Set flag setelah generate
      }
    }
  }, [dataObyektifModalOpen, dataObyektifRecords.length, dataObyektifEditId]);

  // Auto-generate kode keluhan subyektif saat records dimuat dan form kode kosong
  useEffect(() => {
    if (keluhanSubyektifModalOpen && !keluhanSubyektifEditId && keluhanSubyektifRecords.length >= 0 && !keluhanSubyektifCodeGeneratedRef.current) {
      if (!keluhanSubyektifForm.kode || keluhanSubyektifForm.kode.trim() === "") {
        const nextKode = generateNextKodeKeluhanSubyektif();
        setKeluhanSubyektifForm(prev => {
          if (!prev.kode || prev.kode.trim() === "") {
            keluhanSubyektifCodeGeneratedRef.current = true;
            return { ...prev, kode: nextKode };
          }
          return prev;
        });
      }
    }
  }, [keluhanSubyektifModalOpen, keluhanSubyektifRecords.length, keluhanSubyektifEditId]);

  // Auto-generate kode subkategori saat modal dibuka dan form kosong
  useEffect(() => {
    if (subkategoriModalOpen && !subkategoriEditId && !subkategoriLoading && !subkategoriCodeGeneratedRef.current) {
      if (!subkategoriForm.kode || subkategoriForm.kode.trim() === "") {
        const nextKode = generateNextKodeSubkategori();
        setSubkategoriForm(prev => {
          if (!prev.kode || prev.kode.trim() === "") {
            subkategoriCodeGeneratedRef.current = true; // Set flag setelah generate
            return { ...prev, kode: nextKode };
          }
          return prev;
        });
      }
    }
  }, [subkategoriModalOpen, subkategoriRecords.length, subkategoriEditId, subkategoriLoading]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return records;
    return records.filter((r) => {
      const fields = [
        getVal(r, ["kode", "code", "kd", "kd_sdki", "id"], "").toString(),
        getVal(r, ["nama", "label", "judul"], ""),
        getVal(r, ["kategori", "category"], ""),
        getVal(r, ["subkategori", "subcategory"], ""),
        getVal(r, ["definisi", "definition"], ""),
      ].map((v) => (v || "").toString().toLowerCase());
      return fields.some((v) => v.includes(q));
    });
  }, [records, query]);

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      // Validasi form sebelum submit
      if (!createForm.kode || !createForm.kode.trim()) {
        toast.error("Kode SDKI wajib diisi");
        return;
      }
      if (!createForm.nama || !createForm.nama.trim()) {
        toast.error("Nama SDKI wajib diisi");
        return;
      }

      // Pastikan payload tidak kosong
      const payload = {
        kode: (createForm.kode || "").trim(),
        nama: (createForm.nama || "").trim(),
        kategori: (createForm.kategori || "").trim(),
        subkategori: (createForm.subkategori || "").trim(),
        definisi: (createForm.definisi || "").trim(),
      };

      // Validasi payload tidak kosong
      if (!payload.kode || !payload.nama) {
        toast.error("Kode dan Nama SDKI wajib diisi");
        return;
      }

      const csrfToken = getCsrfToken();
      const headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      };
      
      // Tambahkan CSRF token jika ada
      if (csrfToken) {
        headers['X-CSRF-TOKEN'] = csrfToken;
        headers['X-XSRF-TOKEN'] = csrfToken;
      } else {
        console.warn('CSRF token tidak ditemukan, request mungkin akan gagal');
      }

      // Debug logging (hanya di development)
      if (process.env.NODE_ENV === 'development') {
        console.warn('Sending payload:', payload);
        console.warn('CSRF token:', csrfToken ? csrfToken.substring(0, 10) + '...' : 'NOT FOUND');
      }

      const res = await fetch(createUrl, {
        method: "POST",
        headers,
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });

      const responseData = await res.json().catch(() => ({}));

      if (res.ok) {
        pushToast({ type: "success", title: "Berhasil", message: "SDKI ditambahkan" });
        setCreateForm({ kode: "", nama: "", kategori: "", subkategori: "", definisi: "" });
        sdkiCodeGeneratedRef.current = false; // Reset flag setelah submit berhasil
        await loadRecords();
      } else if (res.status === 422) {
        // Unprocessable Entity - validation error
        const errorMessage = responseData.message || "Data tidak valid. Pastikan semua field diisi dengan benar.";
        pushToast({ type: "error", title: "Validasi Gagal", message: errorMessage });
        toast.error(errorMessage);
      } else if (res.status === 409) {
        // Conflict - kode sudah ada
        const errorMessage = responseData.message || "Kode SDKI sudah digunakan";
        pushToast({ type: "error", title: "Kode Sudah Ada", message: errorMessage });
        toast.error(errorMessage);
      } else if (res.status === 419) {
        // CSRF token expired
        pushToast({ type: "error", title: "Session Expired", message: "Silakan refresh halaman dan coba lagi" });
        toast.error("Session expired. Silakan refresh halaman.");
      } else {
        const errorMessage = responseData.message || `Gagal menyimpan SDKI (Status ${res.status})`;
        pushToast({ type: "error", title: "Gagal", message: errorMessage });
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error saving SDKI:", error);
      pushToast({ type: "error", title: "Gagal", message: "Tidak bisa menyimpan SDKI" });
      toast.error("Terjadi kesalahan saat menyimpan SDKI");
    }
  };

  const Row = ({ item }) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
      kode: getVal(item, ["kode", "code", "kd", "kd_sdki", "id"], ""),
      nama: getVal(item, ["nama", "label", "judul"], ""),
      kategori: getVal(item, ["kategori", "category"], ""),
      subkategori: getVal(item, ["subkategori", "subcategory"], ""),
      definisi: getVal(item, ["definisi", "definition"], ""),
    });

    const onSave = async (e) => {
      e.preventDefault();
      const idOrKode = keyId(item);
      if (!idOrKode) return;
      try {
      const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        };
        const res = await fetch(updateUrl(idOrKode), {
          method: "PUT",
          headers,
          credentials: 'same-origin',
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setEditing(false);
          pushToast({ type: "success", title: "Berhasil", message: "SDKI diperbarui" });
          await loadRecords();
        } else {
          pushToast({ type: "error", title: "Gagal", message: `Status ${res.status}` });
        }
      } catch {
        pushToast({ type: "error", title: "Gagal", message: "Tidak bisa memperbarui" });
      }
    };

    const onDelete = async () => {
      const idOrKode = keyId(item);
      if (!idOrKode) return;
      if (!confirm("Hapus SDKI ini?")) return;
      try {
      const headers = {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        };
        const res = await fetch(destroyUrl(idOrKode), { method: "DELETE", headers, credentials: 'same-origin' });
        if (res.ok) {
          pushToast({ type: "success", title: "Berhasil", message: "SDKI dihapus" });
          await loadRecords();
        } else {
          pushToast({ type: "error", title: "Gagal", message: `Status ${res.status}` });
        }
      } catch {
        pushToast({ type: "error", title: "Gagal", message: "Tidak bisa menghapus" });
      }
    };

    return (
      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-t">
        <TableCell className="px-3 py-2 text-xs font-mono">
          {getVal(item, ["kode", "code", "kd", "kd_sdki", "id"], "-")}
        </TableCell>
        <TableCell className="px-3 py-2">
          {editing ? (
            <Input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="text-xs" />
          ) : (
            <span className="text-xs">{getVal(item, ["nama", "label", "judul"], "-")}</span>
          )}
        </TableCell>
        <TableCell className="px-3 py-2">
          {editing ? (
            <Input value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className="text-xs" />
          ) : (
            <span className="text-xs">{getVal(item, ["kategori", "category"], "-")}</span>
          )}
        </TableCell>
        <TableCell className="px-3 py-2">
          {editing ? (
            <Input value={form.subkategori} onChange={(e) => setForm({ ...form, subkategori: e.target.value })} className="text-xs" />
          ) : (
            <span className="text-xs">{getVal(item, ["subkategori", "subcategory"], "-")}</span>
          )}
        </TableCell>
        <TableCell className="px-3 py-2">
          {editing ? (
            <Input value={form.definisi} onChange={(e) => setForm({ ...form, definisi: e.target.value })} className="text-xs" />
          ) : (
            <span className="text-xs">{getVal(item, ["definisi", "definition"], "-")}</span>
          )}
        </TableCell>
        <TableCell className="px-3 py-2 text-right">
          {editing ? (
            <div className="flex items-center gap-2 justify-end">
              <Button size="sm" onClick={onSave} className="bg-emerald-600 hover:bg-emerald-700 text-white"><Save className="w-3 h-3" /> Simpan</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Batal</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 justify-end">
              <Button 
                size="sm" 
                onClick={() => {
                  setSelectedSdki(item);
                  setKeluhanSubyektifModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white"
                title="Keluhan Subyektif"
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                onClick={() => {
                  setSelectedSdkiObyektif(item);
                  setDataObyektifModalOpen(true);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                title="Input Data Obyektif"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                onClick={() => setEditing(true)} 
                className="bg-sky-600 hover:bg-sky-700 text-white"
                title="Edit"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                onClick={onDelete} 
                className="bg-rose-600 hover:bg-rose-700 text-white"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </TableCell>
      </motion.tr>
    );
  };

  return (
    <SidebarRalan title="Asuhan Keperawatan Ralan">
      <Head title="CRUD SDKI" />
      <Toaster toasts={toasts} onRemove={removeToast} />
      <div className="px-4 py-4">
        <motion.div variants={cardVariants} initial="hidden" animate="visible" className="mb-4 p-4 rounded-2xl border bg-white/90 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-600 text-white">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <div className="text-slate-800 font-semibold">Tambah SDKI</div>
                <p className="text-[11px] text-slate-500">Input data diagnosis SDKI</p>
              </div>
            </div>
          </div>
          <form onSubmit={onCreate} className="mt-3 grid grid-cols-1 md:grid-cols-5 gap-3">
            <div>
              <Label>Kode</Label>
              <div className="flex items-center gap-2">
                <Input 
                  value={createForm.kode} 
                  onChange={(e) => {
                    const newKode = e.target.value;
                    setCreateForm({ ...createForm, kode: newKode });
                    // Reset flag jika user menghapus kode secara manual
                    if (!newKode || newKode.trim() === "") {
                      sdkiCodeGeneratedRef.current = false;
                    }
                  }} 
                  placeholder="D.0001" 
                  className="text-xs flex-1" 
                  required 
                />
                <Button 
                  type="button" 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    const nextKode = generateNextKodeSDKI();
                    setCreateForm(prev => ({ ...prev, kode: nextKode }));
                    sdkiCodeGeneratedRef.current = true;
                  }}
                  title="Generate Kode Baru"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="md:col-span-2">
              <Label>Nama</Label>
              <Input value={createForm.nama} onChange={(e) => setCreateForm({ ...createForm, nama: e.target.value })} placeholder="Label diagnosis" className="text-xs" required />
            </div>
            <div>
              <Label>Kategori</Label>
              <div className="flex items-center gap-2">
                <SearchableSelect
                  source="kategori_sdki"
                  value={createForm.kategori}
                  onChange={(value) => {
                    // Reset subkategori saat kategori berubah
                    setCreateForm({ ...createForm, kategori: value, subkategori: "" });
                  }}
                  placeholder="Pilih kategori"
                  searchPlaceholder="Cari kategori..."
                  className="text-xs flex-1"
                  defaultDisplay={createForm.kategori || undefined}
                />
                <Button type="button" size="sm" variant="outline" onClick={() => setKategoriModalOpen(true)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label>Subkategori</Label>
              <div className="flex items-center gap-2">
                <SearchableSelect
                  source="subkategori_sdki"
                  value={createForm.subkategori}
                  onChange={(value) => {
                    setCreateForm({ ...createForm, subkategori: value });
                  }}
                  placeholder="Pilih subkategori"
                  searchPlaceholder="Cari subkategori..."
                  className="text-xs flex-1"
                  defaultDisplay={createForm.subkategori || undefined}
                  sourceParams={{ kategori: createForm.kategori || "" }}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    // Set kategori dari createForm jika ada
                    if (createForm.kategori) {
                      // Cari kode kategori dari nama kategori
                      const kategoriRecord = kategoriRecords.find(k => 
                        (k?.nama ?? k?.nm_kategori ?? k?.label ?? "").toLowerCase() === createForm.kategori.toLowerCase()
                      );
                      setSubkategoriForm({ 
                        kode: "", 
                        nama: "", 
                        kategori: kategoriRecord?.kode ?? kategoriRecord?.kd_kategori ?? createForm.kategori 
                      });
                    } else {
                      setSubkategoriForm({ kode: "", nama: "", kategori: "" });
                    }
                    setSubkategoriModalOpen(true);
                  }}
                  className="h-9 w-9 p-0 flex-shrink-0"
                  title="Tambah Subkategori"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="md:col-span-5">
              <Label>Definisi</Label>
              <Input value={createForm.definisi} onChange={(e) => setCreateForm({ ...createForm, definisi: e.target.value })} placeholder="Definisi ringkas" className="text-xs" />
            </div>
            <div className="md:col-span-5 flex items-center gap-2">
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white"><Save className="w-4 h-4" /> Simpan</Button>
              <Button type="button" variant="outline" onClick={() => setCreateForm({ kode: "", nama: "", kategori: "", subkategori: "", definisi: "" })}>Reset</Button>
            </div>
          </form>
        </motion.div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible" className="p-4 rounded-2xl border bg-white/90 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-slate-800 font-semibold">Daftar SDKI</div>
            <div className="ml-auto flex items-center gap-2">
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari kode/nama/kategori..." className="text-xs" />
              <Button variant="outline"><Search className="w-4 h-4" /></Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-3 py-2">Kode</TableHead>
                  <TableHead className="px-3 py-2">Nama</TableHead>
                  <TableHead className="px-3 py-2">Kategori</TableHead>
                  <TableHead className="px-3 py-2">Subkategori</TableHead>
                  <TableHead className="px-3 py-2">Definisi</TableHead>
                  <TableHead className="px-3 py-2 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence initial={false}>
                  {loading ? (
                    <TableRow><TableCell className="px-3 py-3 text-xs">Memuat…</TableCell></TableRow>
                  ) : filtered.length ? (
                    filtered.map((item, idx) => <Row key={keyId(item) || idx} item={item} />)
                  ) : (
                    <TableRow><TableCell className="px-3 py-3 text-xs" colSpan={6}>Tidak ada data</TableCell></TableRow>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </motion.div>
        <Modal show={kategoriModalOpen} onClose={() => {
          setKategoriModalOpen(false);
          setKategoriForm({ kode: "", nama: "" });
          setKategoriEditId(null);
          kategoriCodeGeneratedRef.current = false; // Reset flag saat modal ditutup
        }} title="Kelola Kategori SDKI" size="lg">
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label>Kode</Label>
                <Input value={kategoriForm.kode} onChange={(e) => setKategoriForm({ ...kategoriForm, kode: e.target.value })} className="text-xs" />
              </div>
              <div className="md:col-span-2">
                <Label>Nama</Label>
                <Input value={kategoriForm.nama} onChange={(e) => setKategoriForm({ ...kategoriForm, nama: e.target.value })} className="text-xs" />
              </div>
              <div className="md:col-span-3 flex items-center gap-2">
                <Button
                  onClick={async () => {
                    try {
                      const csrfToken = getCsrfToken();
                      const headers = { 
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                      };
                      // Tambahkan CSRF token jika tersedia
                      if (csrfToken) {
                        headers["X-CSRF-TOKEN"] = csrfToken;
                        headers["X-XSRF-TOKEN"] = csrfToken;
                      }
                      const payload = {
                        kode: (kategoriForm.kode || "").trim(),
                        nama: (kategoriForm.nama || "").trim(),
                      };
                      if (!payload.kode && !payload.nama) {
                        toast.error("Isi minimal Kode atau Nama");
                        return;
                      }
                      
                      let res;
                      if (kategoriEditId) {
                        // Update mode
                        const url = kategoriUpdateUrl(kategoriEditId);
                        res = await fetch(url, { method: "PUT", headers, credentials: 'same-origin', body: JSON.stringify(payload) });
                      } else {
                        // Create mode
                        res = await fetch(kategoriCreateUrl, { method: "POST", headers, credentials: 'same-origin', body: JSON.stringify(payload) });
                      }
                      
                      if (res.ok) {
                        setKategoriForm({ kode: "", nama: "" });
                        setKategoriEditId(null);
                        kategoriCodeGeneratedRef.current = false; // Reset flag setelah simpan
                        await loadKategori();
                        toast.success(kategoriEditId ? "Kategori berhasil diupdate" : "Kategori berhasil disimpan");
                      } else if (res.status === 419) {
                        toast.error("Session expired. Silakan refresh halaman.");
                      } else {
                        const errorData = await res.json().catch(() => ({}));
                        toast.error(errorData.message || `Gagal ${kategoriEditId ? 'mengupdate' : 'menyimpan'} kategori (${res.status})`);
                      }
                    } catch (error) {
                      console.error("Error saving kategori:", error);
                      toast.error("Terjadi kesalahan saat menyimpan kategori");
                    }
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Save className="w-4 h-4" /> {kategoriEditId ? "Update" : "Simpan"}
                </Button>
                {kategoriEditId && (
                  <Button
                    onClick={() => {
                      setKategoriForm({ kode: "", nama: "" });
                      setKategoriEditId(null);
                      kategoriCodeGeneratedRef.current = false; // Reset flag saat batal edit
                    }}
                    variant="outline"
                  >
                    Batal
                  </Button>
                )}
                {!kategoriEditId && (
                  <Button
                    onClick={() => {
                      const nextKode = generateNextKodeKategori();
                      setKategoriForm(prev => ({ ...prev, kode: nextKode }));
                      kategoriCodeGeneratedRef.current = true;
                    }}
                    variant="outline"
                    title="Generate Kode Baru"
                  >
                    <Plus className="w-4 h-4" /> Generate
                  </Button>
                )}
                <Input value={kategoriQuery} onChange={(e) => setKategoriQuery(e.target.value)} placeholder="Cari kategori" className="text-xs ml-auto" />
                <Button variant="outline" onClick={() => loadKategori()}><Search className="w-4 h-4" /></Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-3 py-2">Kode</TableHead>
                    <TableHead className="px-3 py-2">Nama</TableHead>
                    <TableHead className="px-3 py-2 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence initial={false}>
                    {kategoriLoading ? (
                      <TableRow><TableCell className="px-3 py-3 text-xs">Memuat…</TableCell></TableRow>
                    ) : (kategoriRecords || []).length ? (
                      (kategoriRecords || []).map((row, idx) => {
                        const idOrKey = row?.id ?? row?.kode ?? row?.kd_kategori ?? row?.code ?? row?.kd ?? idx;
                        return (
                          <TableRow key={idOrKey}>
                            <TableCell className="px-3 py-2 text-xs font-mono">{String(row?.kode ?? row?.kd_kategori ?? row?.code ?? row?.kd ?? "-")}</TableCell>
                            <TableCell className="px-3 py-2">
                              <span className="text-xs">{String(row?.nama ?? row?.nm_kategori ?? row?.label ?? row?.kategori ?? "-")}</span>
                            </TableCell>
                            <TableCell className="px-3 py-2">
                              <div className="flex items-center gap-2 justify-end">
                                <Button size="sm" variant="outline" onClick={() => { 
                                  const kategoriKode = row?.kode ?? row?.kd_kategori ?? row?.code ?? row?.kd ?? "";
                                  setCreateForm({ ...createForm, kategori: kategoriKode, subkategori: "" }); 
                                  setKategoriModalOpen(false); 
                                }}>Pilih</Button>
                                <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white" onClick={() => {
                                  // Isi form dengan data yang akan diedit
                                  setKategoriForm({
                                    kode: row?.kode ?? row?.kd_kategori ?? row?.code ?? row?.kd ?? "",
                                    nama: row?.nama ?? row?.nm_kategori ?? row?.label ?? row?.kategori ?? "",
                                  });
                                  setKategoriEditId(idOrKey);
                                  kategoriCodeGeneratedRef.current = true; // Set flag saat edit
                                }}><Pencil className="w-3 h-3" /> Edit</Button>
                                <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white" onClick={async () => {
                                  try {
                                    const csrfToken = getCsrfToken();
                                    const url = kategoriDestroyUrl(idOrKey);
                                    const headers = {
                                      "Accept": "application/json",
                                      "X-Requested-With": "XMLHttpRequest",
                                    };
                                    if (csrfToken) {
                                      headers["X-CSRF-TOKEN"] = csrfToken;
                                      headers["X-XSRF-TOKEN"] = csrfToken;
                                    }
                                    
                                    const res = await fetch(url, { method: "DELETE", headers, credentials: 'same-origin' });
                                    if (res.ok) {
                                      await loadKategori();
                                    } else if (res.status === 419) {
                                      toast.error("Session expired. Silakan refresh halaman.");
                                    } else {
                                      const errorData = await res.json().catch(() => ({}));
                                      toast.error(errorData.message || `Gagal menghapus kategori (${res.status})`);
                                    }
                                  } catch (error) {
                                    console.error("Error deleting kategori:", error);
                                    toast.error("Terjadi kesalahan saat menghapus kategori");
                                  }
                                }}><Trash2 className="w-3 h-3" /> Hapus</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow><TableCell className="px-3 py-3 text-xs" colSpan={3}>Tidak ada data</TableCell></TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </div>
        </Modal>
        <Modal show={subkategoriModalOpen} onClose={() => {
          setSubkategoriModalOpen(false);
          setSubkategoriForm({ kode: "", nama: "", kategori: "" });
          setSubkategoriEditId(null);
          subkategoriCodeGeneratedRef.current = false; // Reset flag saat modal ditutup
        }} title="Kelola Sub Kategori SDKI" size="lg">
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <Label>Kode Subkategori</Label>
                <Input value={subkategoriForm.kode} onChange={(e) => setSubkategoriForm({ ...subkategoriForm, kode: e.target.value })} className="text-xs" />
              </div>
              <div className="md:col-span-2">
                <Label>Nama Subkategori</Label>
                <Input value={subkategoriForm.nama} onChange={(e) => setSubkategoriForm({ ...subkategoriForm, nama: e.target.value })} className="text-xs" />
              </div>
              <div>
                <Label>Kode Kategori</Label>
                <SearchableSelect
                  source="kategori_sdki"
                  value={subkategoriForm.kategori}
                  onChange={(value) => {
                    setSubkategoriForm({ ...subkategoriForm, kategori: value });
                  }}
                  placeholder="Pilih kategori"
                  searchPlaceholder="Cari kategori..."
                  className="text-xs"
                  defaultDisplay={createForm.kategori || undefined}
                />
              </div>
              <div className="md:col-span-4 flex items-center gap-2">
                <Button
                  onClick={async () => {
                    try {
                      const csrfToken = getCsrfToken();
                      const headers = { 
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                      };
                      if (csrfToken) {
                        headers["X-CSRF-TOKEN"] = csrfToken;
                        headers["X-XSRF-TOKEN"] = csrfToken;
                      }
                      const payload = {
                        kode: (subkategoriForm.kode || "").trim(),
                        nama: (subkategoriForm.nama || "").trim(),
                        kategori: (subkategoriForm.kategori || createForm.kategori || "").trim(),
                      };
                      if (!payload.kode || !payload.nama || !payload.kategori) {
                        toast.error("Kode, Nama, dan Kategori wajib diisi");
                        return;
                      }
                      
                      let res;
                      if (subkategoriEditId) {
                        const url = subkategoriUpdateUrl(subkategoriEditId);
                        res = await fetch(url, { method: "PUT", headers, credentials: 'same-origin', body: JSON.stringify(payload) });
                      } else {
                        res = await fetch(subkategoriCreateUrl, { method: "POST", headers, credentials: 'same-origin', body: JSON.stringify(payload) });
                      }
                      
                      if (res.ok) {
                        setSubkategoriForm({ kode: "", nama: "", kategori: "" });
                        setSubkategoriEditId(null);
                        subkategoriCodeGeneratedRef.current = false; // Reset flag setelah simpan
                        await loadSubkategori();
                        toast.success(subkategoriEditId ? "Subkategori berhasil diupdate" : "Subkategori berhasil disimpan");
                      } else if (res.status === 419) {
                        toast.error("Session expired. Silakan refresh halaman.");
                      } else {
                        const errorData = await res.json().catch(() => ({}));
                        toast.error(errorData.message || `Gagal ${subkategoriEditId ? 'mengupdate' : 'menyimpan'} subkategori (${res.status})`);
                      }
                    } catch (error) {
                      console.error("Error saving subkategori:", error);
                      toast.error("Terjadi kesalahan saat menyimpan subkategori");
                    }
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Save className="w-4 h-4" /> {subkategoriEditId ? "Update" : "Simpan"}
                </Button>
                {subkategoriEditId && (
                  <Button
                    onClick={() => {
                      setSubkategoriForm({ kode: "", nama: "", kategori: "" });
                      setSubkategoriEditId(null);
                      subkategoriCodeGeneratedRef.current = false; // Reset flag saat batal edit
                    }}
                    variant="outline"
                  >
                    Batal
                  </Button>
                )}
                {!subkategoriEditId && (
                  <Button
                    onClick={() => {
                      const nextKode = generateNextKodeSubkategori();
                      setSubkategoriForm(prev => ({ ...prev, kode: nextKode }));
                      subkategoriCodeGeneratedRef.current = true;
                    }}
                    variant="outline"
                    title="Generate Kode Baru"
                  >
                    <Plus className="w-4 h-4" /> Generate
                  </Button>
                )}
                <Input value={subkategoriQuery} onChange={(e) => setSubkategoriQuery(e.target.value)} placeholder="Cari subkategori" className="text-xs ml-auto" />
                <Button variant="outline" onClick={() => loadSubkategori()}><Search className="w-4 h-4" /></Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-3 py-2">Kode</TableHead>
                    <TableHead className="px-3 py-2">Nama</TableHead>
                    <TableHead className="px-3 py-2">Kategori</TableHead>
                    <TableHead className="px-3 py-2 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence initial={false}>
                    {subkategoriLoading ? (
                      <TableRow><TableCell className="px-3 py-3 text-xs">Memuat…</TableCell></TableRow>
                    ) : (subkategoriRecords || []).length ? (
                      (subkategoriRecords || []).map((row, idx) => {
                        const idOrKey = row?.id ?? row?.kode ?? row?.kd_subkategori ?? row?.code ?? row?.kd ?? idx;
                        return (
                          <TableRow key={idOrKey}>
                            <TableCell className="px-3 py-2 text-xs font-mono">{String(row?.kode ?? row?.kd_subkategori ?? row?.code ?? row?.kd ?? "-")}</TableCell>
                            <TableCell className="px-3 py-2">
                              <span className="text-xs">{String(row?.nama ?? row?.nm_subkategori ?? row?.label ?? "-")}</span>
                            </TableCell>
                            <TableCell className="px-3 py-2">
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-900 font-medium">{String(row?.kategori_nama ?? row?.kategori_nm ?? "-")}</span>
                                <span className="text-xs font-mono text-gray-500">{String(row?.kategori ?? row?.kd_kategori ?? row?.kategori_kode ?? "-")}</span>
                              </div>
                            </TableCell>
                            <TableCell className="px-3 py-2">
                              <div className="flex items-center gap-2 justify-end">
                                <Button size="sm" variant="outline" onClick={() => { 
                                  const subkategoriKode = row?.kode ?? row?.kd_subkategori ?? row?.code ?? row?.kd ?? "";
                                  setCreateForm({ ...createForm, subkategori: subkategoriKode }); 
                                  setSubkategoriModalOpen(false); 
                                }}>Pilih</Button>
                                <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white" onClick={() => {
                                  setSubkategoriForm({
                                    kode: row?.kode ?? row?.kd_subkategori ?? row?.code ?? row?.kd ?? "",
                                    nama: row?.nama ?? row?.nm_subkategori ?? row?.label ?? "",
                                    kategori: row?.kategori ?? row?.kd_kategori ?? "",
                                  });
                                  setSubkategoriEditId(idOrKey);
                                  subkategoriCodeGeneratedRef.current = true; // Set flag saat edit
                                }}><Pencil className="w-3 h-3" /> Edit</Button>
                                <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white" onClick={async () => {
                                  try {
                                    const csrfToken = getCsrfToken();
                                    const url = subkategoriDestroyUrl(idOrKey);
                                    const headers = {
                                      "Accept": "application/json",
                                      "X-Requested-With": "XMLHttpRequest",
                                    };
                                    if (csrfToken) {
                                      headers["X-CSRF-TOKEN"] = csrfToken;
                                      headers["X-XSRF-TOKEN"] = csrfToken;
                                    }
                                    
                                    const res = await fetch(url, { method: "DELETE", headers, credentials: 'same-origin' });
                                    if (res.ok) {
                                      await loadSubkategori();
                                    } else if (res.status === 419) {
                                      toast.error("Session expired. Silakan refresh halaman.");
                                    } else {
                                      const errorData = await res.json().catch(() => ({}));
                                      toast.error(errorData.message || `Gagal menghapus subkategori (${res.status})`);
                                    }
                                  } catch (error) {
                                    console.error("Error deleting subkategori:", error);
                                    toast.error("Terjadi kesalahan saat menghapus subkategori");
                                  }
                                }}><Trash2 className="w-3 h-3" /> Hapus</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow><TableCell className="px-3 py-3 text-xs" colSpan={4}>Tidak ada data</TableCell></TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </div>
        </Modal>

        {/* Modal Keluhan Subyektif */}
        <Modal
          show={keluhanSubyektifModalOpen}
          onClose={() => {
            setKeluhanSubyektifModalOpen(false);
            setSelectedSdki(null);
            setKeluhanSubyektifForm({ kode: "", keluhan: "" });
            setKeluhanSubyektifEditId(null);
            keluhanSubyektifCodeGeneratedRef.current = false; // Reset flag saat modal ditutup
          }}
          title={`Keluhan Subyektif - ${selectedSdki ? (selectedSdki?.kode ?? selectedSdki?.kd_sdki ?? "") + " - " + (selectedSdki?.nama ?? selectedSdki?.nm_sdki ?? "") : ""}`}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label>Kode</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    value={keluhanSubyektifForm.kode} 
                    onChange={(e) => {
                      const newKode = e.target.value;
                      setKeluhanSubyektifForm({ ...keluhanSubyektifForm, kode: newKode });
                      // Reset flag jika user menghapus kode secara manual
                      if (!newKode || newKode.trim() === "") {
                        keluhanSubyektifCodeGeneratedRef.current = false;
                      }
                    }} 
                    placeholder="Kode keluhan" 
                    className="text-xs flex-1" 
                  />
                  {!keluhanSubyektifEditId && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const nextKode = generateNextKodeKeluhanSubyektif();
                        setKeluhanSubyektifForm(prev => ({ ...prev, kode: nextKode }));
                        keluhanSubyektifCodeGeneratedRef.current = true;
                      }}
                      title="Generate Kode Baru"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <Label>Keluhan Subyektif</Label>
                <Input 
                  value={keluhanSubyektifForm.keluhan} 
                  onChange={(e) => setKeluhanSubyektifForm({ ...keluhanSubyektifForm, keluhan: e.target.value })} 
                  placeholder="Masukkan keluhan subyektif" 
                  className="text-xs" 
                />
              </div>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Button
                onClick={async () => {
                  if (!selectedSdki) return;
                  
                  try {
                    const csrfToken = getCsrfToken();
                    const headers = {
                      "Content-Type": "application/json",
                      "Accept": "application/json",
                      "X-Requested-With": "XMLHttpRequest",
                    };
                    if (csrfToken) {
                      headers["X-CSRF-TOKEN"] = csrfToken;
                      headers["X-XSRF-TOKEN"] = csrfToken;
                    }

                    const sdkiKode = selectedSdki?.kode ?? selectedSdki?.kd_sdki ?? "";
                    const kategoriKode = selectedSdki?.kategori ?? selectedSdki?.kd_kategori ?? "";
                    const subkategoriKode = selectedSdki?.subkategori ?? selectedSdki?.kd_subkategori ?? "";

                    const payload = {
                      kd_sdki: sdkiKode,
                      kd_kategori: kategoriKode,
                      kd_subkategori: subkategoriKode,
                      kode: keluhanSubyektifForm.kode.trim(),
                      keluhan: keluhanSubyektifForm.keluhan.trim(),
                    };

                    if (!payload.kode || !payload.keluhan) {
                      toast.error("Kode dan Keluhan wajib diisi");
                      return;
                    }

                    let res;
                    if (keluhanSubyektifEditId) {
                      const url = keluhanSubyektifUpdateUrl(keluhanSubyektifEditId);
                      res = await fetch(url, { method: "PUT", headers, credentials: 'same-origin', body: JSON.stringify(payload) });
                    } else {
                      res = await fetch(keluhanSubyektifCreateUrl, { method: "POST", headers, credentials: 'same-origin', body: JSON.stringify(payload) });
                    }

                    if (res.ok) {
                      await loadKeluhanSubyektif();
                      toast.success(keluhanSubyektifEditId ? "Keluhan subyektif berhasil diupdate" : "Keluhan subyektif berhasil disimpan");
                      setKeluhanSubyektifForm({ kode: "", keluhan: "" });
                      setKeluhanSubyektifEditId(null);
                      keluhanSubyektifCodeGeneratedRef.current = false; // Reset flag setelah submit berhasil
                    } else if (res.status === 419) {
                      toast.error("Session expired. Silakan refresh halaman.");
                    } else {
                      const errorData = await res.json().catch(() => ({}));
                      toast.error(errorData.message || `Gagal ${keluhanSubyektifEditId ? 'mengupdate' : 'menyimpan'} keluhan subyektif (${res.status})`);
                    }
                  } catch (error) {
                    if (process.env.NODE_ENV === 'development') {
                      console.error("Error saving keluhan subyektif:", error);
                    }
                    toast.error("Terjadi kesalahan saat menyimpan keluhan subyektif");
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Save className="w-4 h-4" /> {keluhanSubyektifEditId ? "Update" : "Simpan"}
              </Button>
              {keluhanSubyektifEditId && (
                <Button
                  onClick={() => {
                    setKeluhanSubyektifForm({ kode: "", keluhan: "" });
                    setKeluhanSubyektifEditId(null);
                  }}
                  variant="outline"
                >
                  Batal
                </Button>
              )}
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-3 py-2">Kode</TableHead>
                    <TableHead className="px-3 py-2">Keluhan Subyektif</TableHead>
                    <TableHead className="px-3 py-2 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence initial={false}>
                    {keluhanSubyektifLoading ? (
                      <TableRow><TableCell className="px-3 py-3 text-xs" colSpan={3}>Memuat…</TableCell></TableRow>
                    ) : (keluhanSubyektifRecords || []).length ? (
                      (keluhanSubyektifRecords || []).map((row, idx) => {
                        const idOrKey = row?.id ?? row?.kode ?? row?.kd_sub ?? idx;
                        return (
                          <TableRow key={idOrKey}>
                            <TableCell className="px-3 py-2 text-xs font-mono">{String(row?.kode ?? row?.kd_sub ?? "-")}</TableCell>
                            <TableCell className="px-3 py-2">
                              <span className="text-xs">{String(row?.keluhan ?? row?.kel_subyektif ?? "-")}</span>
                            </TableCell>
                            <TableCell className="px-3 py-2">
                              <div className="flex items-center gap-2 justify-end">
                                <Button 
                                  size="sm" 
                                  className="bg-sky-600 hover:bg-sky-700 text-white" 
                                  onClick={() => {
                                    setKeluhanSubyektifForm({
                                      kode: row?.kode ?? row?.kd_sub ?? "",
                                      keluhan: row?.keluhan ?? row?.kel_subyektif ?? "",
                                    });
                                    setKeluhanSubyektifEditId(idOrKey);
                                  }}
                                  title="Edit"
                                >
                                  <Pencil className="w-3 h-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="bg-rose-600 hover:bg-rose-700 text-white" 
                                  onClick={async () => {
                                    try {
                                      const csrfToken = getCsrfToken();
                                      const url = keluhanSubyektifDestroyUrl(idOrKey);
                                      const headers = {
                                        "Accept": "application/json",
                                        "X-Requested-With": "XMLHttpRequest",
                                      };
                                      if (csrfToken) {
                                        headers["X-CSRF-TOKEN"] = csrfToken;
                                        headers["X-XSRF-TOKEN"] = csrfToken;
                                      }
                                      
                                      const res = await fetch(url, { method: "DELETE", headers, credentials: 'same-origin' });
                                      if (res.ok) {
                                        await loadKeluhanSubyektif();
                                        toast.success("Keluhan subyektif berhasil dihapus");
                                      } else if (res.status === 419) {
                                        toast.error("Session expired. Silakan refresh halaman.");
                                      } else {
                                        const errorData = await res.json().catch(() => ({}));
                                        toast.error(errorData.message || `Gagal menghapus keluhan subyektif (${res.status})`);
                                      }
                                    } catch (error) {
                                      if (process.env.NODE_ENV === 'development') {
                                        console.error("Error deleting keluhan subyektif:", error);
                                      }
                                      toast.error("Terjadi kesalahan saat menghapus keluhan subyektif");
                                    }
                                  }}
                                  title="Hapus"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow><TableCell className="px-3 py-3 text-xs" colSpan={3}>Tidak ada data</TableCell></TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </div>
        </Modal>

        {/* Modal Data Obyektif */}
        <Modal
          show={dataObyektifModalOpen}
          onClose={() => {
            setDataObyektifModalOpen(false);
            setSelectedSdkiObyektif(null);
            setDataObyektifForm({ kode: "", keluhan: "" });
            setDataObyektifEditId(null);
            dataObyektifCodeGeneratedRef.current = false; // Reset flag saat modal ditutup
          }}
          title={`Data Obyektif - ${selectedSdkiObyektif ? (selectedSdkiObyektif?.kode ?? selectedSdkiObyektif?.kd_sdki ?? "") + " - " + (selectedSdkiObyektif?.nama ?? selectedSdkiObyektif?.nm_sdki ?? "") : ""}`}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label>Kode</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    value={dataObyektifForm.kode} 
                    onChange={(e) => {
                      const newKode = e.target.value;
                      setDataObyektifForm({ ...dataObyektifForm, kode: newKode });
                      // Reset flag jika user menghapus kode secara manual
                      if (!newKode || newKode.trim() === "") {
                        dataObyektifCodeGeneratedRef.current = false;
                      }
                    }} 
                    placeholder="Kode data obyektif" 
                    className="text-xs flex-1" 
                  />
                  {!dataObyektifEditId && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const nextKode = generateNextKodeDataObyektif();
                        setDataObyektifForm(prev => ({ ...prev, kode: nextKode }));
                        dataObyektifCodeGeneratedRef.current = true;
                      }}
                      title="Generate Kode Baru"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <Label>Data Obyektif</Label>
                <Input 
                  value={dataObyektifForm.keluhan} 
                  onChange={(e) => setDataObyektifForm({ ...dataObyektifForm, keluhan: e.target.value })} 
                  placeholder="Masukkan data obyektif" 
                  className="text-xs" 
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={async () => {
                  if (!selectedSdkiObyektif) {
                    toast.error("SDKI tidak dipilih");
                    return;
                  }
                  if (!dataObyektifForm.kode || !dataObyektifForm.keluhan) {
                    toast.error("Kode dan data obyektif wajib diisi");
                    return;
                  }
                  
                  try {
                    const csrfToken = getCsrfToken();
                    const sdkiKode = selectedSdkiObyektif?.kode ?? selectedSdkiObyektif?.kd_sdki ?? "";
                    const kategoriKode = selectedSdkiObyektif?.kategori ?? selectedSdkiObyektif?.kd_kategori ?? "";
                    const subkategoriKode = selectedSdkiObyektif?.subkategori ?? selectedSdkiObyektif?.kd_subkategori ?? "";
                    
                    const payload = {
                      kd_sdki: sdkiKode,
                      kd_kategori: kategoriKode,
                      kd_subkategori: subkategoriKode,
                      kode: dataObyektifForm.kode,
                      keluhan: dataObyektifForm.keluhan,
                    };
                    
                    const headers = {
                      "Content-Type": "application/json",
                      "Accept": "application/json",
                      "X-Requested-With": "XMLHttpRequest",
                    };
                    if (csrfToken) {
                      headers["X-CSRF-TOKEN"] = csrfToken;
                      headers["X-XSRF-TOKEN"] = csrfToken;
                    }
                    
                    let res;
                    if (dataObyektifEditId) {
                      // Update mode
                      const url = dataObyektifUpdateUrl(dataObyektifEditId);
                      res = await fetch(url, { method: "PUT", headers, credentials: 'same-origin', body: JSON.stringify(payload) });
                    } else {
                      // Create mode
                      res = await fetch(dataObyektifCreateUrl, { method: "POST", headers, credentials: 'same-origin', body: JSON.stringify(payload) });
                    }
                    
                    if (res.ok) {
                      setDataObyektifForm({ kode: "", keluhan: "" });
                      setDataObyektifEditId(null);
                      dataObyektifCodeGeneratedRef.current = false; // Reset flag setelah simpan
                      await loadDataObyektif();
                      toast.success(dataObyektifEditId ? "Data obyektif berhasil diupdate" : "Data obyektif berhasil disimpan");
                    } else if (res.status === 419) {
                      toast.error("Session expired. Silakan refresh halaman.");
                    } else {
                      const errorData = await res.json().catch(() => ({}));
                      toast.error(errorData.message || `Gagal ${dataObyektifEditId ? 'mengupdate' : 'menyimpan'} data obyektif (${res.status})`);
                    }
                  } catch (error) {
                    if (process.env.NODE_ENV === 'development') {
                      console.error("Error saving data obyektif:", error);
                    }
                    toast.error("Terjadi kesalahan saat menyimpan data obyektif");
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Save className="w-4 h-4" /> {dataObyektifEditId ? "Update" : "Simpan"}
              </Button>
              {dataObyektifEditId && (
                <Button
                  onClick={() => {
                    setDataObyektifForm({ kode: "", keluhan: "" });
                    setDataObyektifEditId(null);
                  }}
                  variant="outline"
                >
                  Batal
                </Button>
              )}
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-3 py-2">Kode</TableHead>
                    <TableHead className="px-3 py-2">Data Obyektif</TableHead>
                    <TableHead className="px-3 py-2 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence initial={false}>
                    {dataObyektifLoading ? (
                      <TableRow><TableCell className="px-3 py-3 text-xs" colSpan={3}>Memuat…</TableCell></TableRow>
                    ) : (dataObyektifRecords || []).length ? (
                      (dataObyektifRecords || []).map((row, idx) => {
                        const idOrKey = row?.kode ?? row?.kd_oby ?? row?.code ?? row?.kd ?? idx;
                        return (
                          <TableRow key={idOrKey}>
                            <TableCell className="px-3 py-2 text-xs font-mono">{String(row?.kode ?? row?.kd_oby ?? row?.code ?? row?.kd ?? "-")}</TableCell>
                            <TableCell className="px-3 py-2">
                              <span className="text-xs">{String(row?.keluhan ?? row?.kel_obyektif ?? row?.label ?? "-")}</span>
                            </TableCell>
                            <TableCell className="px-3 py-2 text-right">
                              <div className="flex items-center gap-2 justify-end">
                                <Button 
                                  size="sm" 
                                  className="bg-sky-600 hover:bg-sky-700 text-white" 
                                  onClick={() => {
                                    setDataObyektifForm({
                                      kode: row?.kode ?? row?.kd_oby ?? row?.code ?? row?.kd ?? "",
                                      keluhan: row?.keluhan ?? row?.kel_obyektif ?? row?.label ?? "",
                                    });
                                    setDataObyektifEditId(idOrKey);
                                    dataObyektifCodeGeneratedRef.current = true; // Set flag saat edit
                                  }}
                                  title="Edit"
                                >
                                  <Pencil className="w-3 h-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="bg-rose-600 hover:bg-rose-700 text-white" 
                                  onClick={async () => {
                                    try {
                                      const csrfToken = getCsrfToken();
                                      const url = dataObyektifDestroyUrl(idOrKey);
                                      const headers = {
                                        "Accept": "application/json",
                                        "X-Requested-With": "XMLHttpRequest",
                                      };
                                      if (csrfToken) {
                                        headers["X-CSRF-TOKEN"] = csrfToken;
                                        headers["X-XSRF-TOKEN"] = csrfToken;
                                      }
                                      
                                      const res = await fetch(url, { method: "DELETE", headers, credentials: 'same-origin' });
                                      if (res.ok) {
                                        await loadDataObyektif();
                                        toast.success("Data obyektif berhasil dihapus");
                                      } else if (res.status === 419) {
                                        toast.error("Session expired. Silakan refresh halaman.");
                                      } else {
                                        const errorData = await res.json().catch(() => ({}));
                                        toast.error(errorData.message || `Gagal menghapus data obyektif (${res.status})`);
                                      }
                                    } catch (error) {
                                      if (process.env.NODE_ENV === 'development') {
                                        console.error("Error deleting data obyektif:", error);
                                      }
                                      toast.error("Terjadi kesalahan saat menghapus data obyektif");
                                    }
                                  }}
                                  title="Hapus"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow><TableCell className="px-3 py-3 text-xs" colSpan={3}>Tidak ada data</TableCell></TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </div>
        </Modal>
      </div>
    </SidebarRalan>
  );
}
