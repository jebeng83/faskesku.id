import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import Modal from "@/Components/Modal";
import { Plus, Search as SearchIcon, User, ClipboardList, Wallet, Pencil, Trash2, XCircle } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

 

const fmtDate = (v) => {
  if (!v) return "";
  try { return new Date(v).toISOString().slice(0, 10); } catch { return v; }
};

const fmtTime = (v) => {
  if (!v) return "";
  try { return typeof v === "string" && v.length >= 8 ? v.slice(0, 8) : new Date(v).toTimeString().slice(0, 8); } catch { return v; }
};

const toCurrency = (n) => Number(n || 0).toLocaleString("id-ID");

export default function PemasukanLainPage() {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const nowTime = useMemo(() => new Date().toTimeString().slice(0, 8), []);

  const [filters, setFilters] = useState({ start: today, end: today, q: "", kode_kategori: "", nip: "" });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [petugasOptions, setPetugasOptions] = useState([]);
  const [showKategoriModal, setShowKategoriModal] = useState(false);
  const [kategoriForm, setKategoriForm] = useState({ kode_kategori: "", nama_kategori: "" });
  const [kategoriErrors, setKategoriErrors] = useState({});
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    no_masuk: "",
    tanggal_date: today,
    tanggal_time: nowTime,
    kode_kategori: "",
    nip: "",
    besar: 0,
    keterangan: "",
    keperluan: "",
  });

  const [besarText, setBesarText] = useState("");

  const total = useMemo(() => (items || []).reduce((acc, it) => acc + Number(it?.besar || 0), 0), [items]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/akutansi/kategori-pemasukan-lain", { params: { per_page: 1000 } });
      const data = res?.data?.data || res?.data?.items || [];
      setCategories(data.map((it) => ({ kode_kategori: it?.kode_kategori || it?.kode || "", nama_kategori: it?.nama_kategori || it?.nama || "" })));
    } catch (_e) {
      setCategories([]);
    }
  };

  const fetchPetugas = async () => {
    try {
      const res = await axios.get("/api/pembelian/petugas", { params: { q: "" } });
      const list = res?.data?.data || res?.data?.list || [];
      setPetugasOptions(list.map((it) => ({ nip: it?.nip || "", nama: it?.nama || "" })));
    } catch (_e) {
      setPetugasOptions([]);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/akutansi/pemasukan-lain", {
        params: {
          start: filters.start,
          end: filters.end,
          q: filters.q || "",
          kode_kategori: filters.kode_kategori || "",
          nip: filters.nip || "",
        },
      });
      const data = res?.data?.data || [];
      setItems(data);
    } catch (_e) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); fetchPetugas(); }, []);
  useEffect(() => { fetchItems(); }, []);

  const resetFilters = () => setFilters({ start: today, end: today, q: "", kode_kategori: "", nip: "" });

  const openCreate = async () => {
    setForm({ no_masuk: "", tanggal_date: today, tanggal_time: nowTime, kode_kategori: "", nip: "", besar: 0, keterangan: "", keperluan: "" });
    setErrors({});
    setShowCreate(true);
    setBesarText("");
    try {
      const res = await axios.get("/api/akutansi/pemasukan-lain/generate-no", { headers: { Accept: "application/json" } });
      const no = res?.data?.no_masuk || "";
      setForm((f) => ({ ...f, no_masuk: no || f.no_masuk }));
    } catch (_e) {}
  };

  const openKategori = async () => {
    setKategoriForm({ kode_kategori: "", nama_kategori: "" });
    setKategoriErrors({});
    setShowKategoriModal(true);
    try {
      const res = await axios.get("/api/akutansi/kategori-pemasukan-lain/generate-kode", { headers: { Accept: "application/json" } });
      const kode = res?.data?.kode || "";
      setKategoriForm((s) => ({ ...s, kode_kategori: kode || s.kode_kategori }));
    } catch (_e) {}
  };

  const openEdit = (row) => {
    setSelected(row);
    const dt = row?.tanggal || "";
    const d = fmtDate(dt);
    const t = fmtTime(dt);
    setForm({
      no_masuk: row?.no_masuk || "",
      tanggal_date: d || today,
      tanggal_time: t || nowTime,
      kode_kategori: row?.kode_kategori || "",
      nip: row?.nip || "",
      besar: Number(row?.besar || 0),
      keterangan: row?.keterangan || "",
      keperluan: row?.keperluan || "",
    });
    setErrors({});
    setBesarText(Number(row?.besar || 0) > 0 ? Number(row?.besar || 0).toLocaleString("id-ID") : "");
    setShowEdit(true);
  };

  const validate = () => {
    const errs = {};
    if (!form.keterangan) errs.keterangan = "Keterangan wajib";
    if (!form.keperluan) errs.keperluan = "Keperluan wajib";
    if (!form.kode_kategori) errs.kode_kategori = "Kategori wajib";
    if (!form.nip) errs.nip = "Petugas wajib";
    if (!form.tanggal_date) errs.tanggal_date = "Tanggal wajib";
    if (!form.tanggal_time) errs.tanggal_time = "Waktu wajib";
    if (!form.besar || Number(form.besar) <= 0) errs.besar = "Nilai harus > 0";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildPayload = () => ({
    no_masuk: form.no_masuk || undefined,
    tanggal: `${form.tanggal_date} ${form.tanggal_time}`,
    kode_kategori: form.kode_kategori,
    nip: form.nip,
    besar: Number(form.besar || 0),
    keterangan: form.keterangan,
    keperluan: form.keperluan,
  });

  const submitCreate = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await axios.post("/api/akutansi/pemasukan-lain", buildPayload());
      if (res?.status === 201 || res?.status === 200) {
        setShowCreate(false);
        fetchItems();
      }
    } catch (e) {
      const data = e?.response?.data;
      if (data && typeof data === "object") setErrors(data.errors || { _global: data.message || "Gagal menyimpan" });
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const id = selected?.no_masuk || form.no_masuk;
      const res = await axios.put(`/api/akutansi/pemasukan-lain/${encodeURIComponent(id)}`, buildPayload());
      if (res?.status === 200) {
        setShowEdit(false);
        setSelected(null);
        fetchItems();
      }
    } catch (e) {
      const data = e?.response?.data;
      if (data && typeof data === "object") setErrors(data.errors || { _global: data.message || "Gagal menyimpan perubahan" });
    }
  };

  const doDelete = async (row) => {
    if (!row?.no_masuk) return;
    try {
      const res = await axios.delete(`/api/akutansi/pemasukan-lain/${encodeURIComponent(row.no_masuk)}`);
      if (res?.status === 200) fetchItems();
    } catch (_e) {}
  };

  return (
    <SidebarKeuangan>
      <Head title="Keuangan - Pemasukan Lain" />
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="px-4 md:px-6 lg:px-12 xl:px-16 py-6 space-y-6">
        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          <div className="relative px-6 py-4 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <Wallet className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Pemasukan Lain</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button onClick={openCreate} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold px-3 py-2 rounded-md" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Plus className="w-4 h-4" /> Tambah
              </motion.button>
            </div>
          </div>
          <div className="relative p-6">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <div className="min-w-[14rem] relative">
                <input type="text" placeholder="Keterangan / Keperluan / No" value={filters.q} onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors placeholder:text-gray-400 text-sm h-10 pl-10 pr-3" />
                <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="min-w-[11rem]">
                <label className="sr-only">Dari</label>
                <input type="date" value={filters.start} onChange={(e) => setFilters((f) => ({ ...f, start: e.target.value }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors text-sm h-10 px-3" />
              </div>
              <div className="min-w-[11rem]">
                <label className="sr-only">Sampai</label>
                <input type="date" value={filters.end} onChange={(e) => setFilters((f) => ({ ...f, end: e.target.value }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors text-sm h-10 px-3" />
              </div>
              <div className="min-w-[14rem]">
                <div className="flex items-center gap-2">
                  <select value={filters.kode_kategori} onChange={(e) => setFilters((f) => ({ ...f, kode_kategori: e.target.value }))} className="w-[16rem] flex-none rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors text-sm h-10 px-3">
                    <option value="">Kategori</option>
                    {categories.map((c) => (
                      <option key={c.kode_kategori} value={c.kode_kategori}>{c.kode_kategori} - {c.nama_kategori}</option>
                    ))}
                  </select>
                  <button type="button" onClick={openKategori} className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                </div>
              <div className="min-w-[14rem]">
                <select value={filters.nip} onChange={(e) => setFilters((f) => ({ ...f, nip: e.target.value }))} className="w-[16rem] rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors text-sm h-10 px-3">
                  <option value="">Petugas</option>
                  {petugasOptions.map((p) => (
                    <option key={p.nip} value={p.nip}>{p.nip} - {p.nama}</option>
                  ))}
                </select>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <motion.button onClick={fetchItems} className="inline-flex items-center justify-center h-10 w-10 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} aria-label="Cari">
                  <SearchIcon className="w-4 h-4" />
                </motion.button>
                <motion.button onClick={resetFilters} className="inline-flex items-center justify-center h-10 w-10 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} aria-label="Reset">
                  <XCircle className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <motion.div variants={itemVariants} initial="rest" whileHover="hover" className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mt-4">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm flex items-center justify-between">
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-indigo-600" /> Daftar Pemasukan
                </h2>
                <div className="text-xs text-gray-600 dark:text-gray-300">Total: Rp {toCurrency(total)}</div>
              </div>
              <div className="relative p-4">
                {loading ? (
                  <div className="py-10 text-center text-sm text-gray-600 dark:text-gray-300">Memuat...</div>
                ) : items.length === 0 ? (
                  <motion.div className="flex flex-col items-center justify-center gap-2 py-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <User className="w-12 h-12 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Tidak ada data.</span>
                  </motion.div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-left bg-gray-50 dark:bg-gray-800">
                          <th className="px-3 py-2">No Transaksi</th>
                          <th className="px-3 py-2">Tanggal</th>
                          <th className="px-3 py-2">Kategori</th>
                          <th className="px-3 py-2">Petugas</th>
                          <th className="px-3 py-2 text-right">Pemasukan (Rp)</th>
                          <th className="px-3 py-2">Keterangan</th>
                          <th className="px-3 py-2">Keperluan</th>
                          <th className="px-3 py-2 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((row) => (
                          <tr key={row.no_masuk} className="border-t border-gray-200 dark:border-gray-700">
                            <td className="px-3 py-2">{row.no_masuk}</td>
                            <td className="px-3 py-2">{row.tanggal}</td>
                            <td className="px-3 py-2">{row.kode_kategori} {row.nama_kategori ? `- ${row.nama_kategori}` : ""}</td>
                            <td className="px-3 py-2">{row.nip} {row.nama_petugas ? `- ${row.nama_petugas}` : ""}</td>
                            <td className="px-3 py-2 text-right">{toCurrency(row.besar)}</td>
                            <td className="px-3 py-2">{row.keterangan}</td>
                            <td className="px-3 py-2">{row.keperluan}</td>
                            <td className="px-3 py-2 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <motion.button onClick={() => openEdit(row)} className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} aria-label="Edit">
                                  <Pencil className="w-4 h-4" />
                                </motion.button>
                                <motion.button onClick={() => doDelete(row)} className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} aria-label="Hapus">
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {total > 0 && (
                          <tr className="border-t border-gray-200 dark:border-gray-700">
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2">&gt;&gt; Total Pemasukan</td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2 text-right font-semibold">{toCurrency(total)}</td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2"></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showCreate && (
            <Modal show={showCreate} onClose={() => setShowCreate(false)} title="Tambah Pemasukan Lain" size="xxl">
              <motion.form className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} onSubmit={submitCreate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Nomor Transaksi</label>
                    <input type="text" value={form.no_masuk} onChange={(e) => setForm((f) => ({ ...f, no_masuk: e.target.value }))} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Tanggal</label>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <input type="date" value={form.tanggal_date} onChange={(e) => setForm((f) => ({ ...f, tanggal_date: e.target.value }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                      <input type="time" value={form.tanggal_time} onChange={(e) => setForm((f) => ({ ...f, tanggal_time: e.target.value }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                    </div>
                    {(errors.tanggal_date || errors.tanggal_time) && <p className="text-xs text-red-600 mt-1">{errors.tanggal_date || errors.tanggal_time}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 items-center">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Kategori</label>
                        <div className="mt-1 flex items-center gap-2">
                          <select value={form.kode_kategori} onChange={(e) => setForm((f) => ({ ...f, kode_kategori: e.target.value }))} className="w-[14rem] flex-none rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3">
                            <option value="">Pilih Kategori</option>
                            {categories.map((c) => (
                              <option key={c.kode_kategori} value={c.kode_kategori}>{c.kode_kategori} - {c.nama_kategori}</option>
                            ))}
                          </select>
                          <button type="button" onClick={openKategori} className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        {errors.kode_kategori && <p className="text-xs text-red-600 mt-1">{errors.kode_kategori}</p>}
                      </div>
                      <div className="md:col-start-3">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Petugas</label>
                        <select value={form.nip} onChange={(e) => setForm((f) => ({ ...f, nip: e.target.value }))} className="mt-1 w-[14rem] rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3">
                          <option value="">Pilih Petugas</option>
                          {petugasOptions.map((p) => (
                            <option key={p.nip} value={p.nip}>{p.nip} - {p.nama}</option>
                          ))}
                        </select>
                        {errors.nip && <p className="text-xs text-red-600 mt-1">{errors.nip}</p>}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Pemasukan (Rp)</label>
                    <input type="text" inputMode="numeric" value={besarText} onChange={(e) => { const raw = e.target.value || ""; const digits = raw.replace(/[^0-9]/g, ""); const num = Number(digits || 0); setForm((f) => ({ ...f, besar: num })); setBesarText(digits === "" ? "" : num.toLocaleString("id-ID")); }} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3 text-right" />
                    {errors.besar && <p className="text-xs text-red-600 mt-1">{errors.besar}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Keterangan</label>
                    <input type="text" value={form.keterangan} onChange={(e) => setForm((f) => ({ ...f, keterangan: e.target.value }))} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                    {errors.keterangan && <p className="text-xs text-red-600 mt-1">{errors.keterangan}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Keperluan</label>
                    <input type="text" value={form.keperluan} onChange={(e) => setForm((f) => ({ ...f, keperluan: e.target.value }))} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                    {errors.keperluan && <p className="text-xs text-red-600 mt-1">{errors.keperluan}</p>}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button type="button" onClick={() => setShowCreate(false)} className="inline-flex items-center gap-1 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-3 py-1.5 rounded-md">
                    Batal
                  </button>
                  <button type="submit" className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold text-sm px-3 py-1.5 rounded-md">
                    Simpan
                  </button>
                </div>
                {errors._global && <p className="text-xs text-red-600 mt-2">{errors._global}</p>}
              </motion.form>
            </Modal>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showEdit && (
            <Modal show={showEdit} onClose={() => setShowEdit(false)} title="Edit Pemasukan Lain" size="xxl">
              <motion.form className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} onSubmit={submitEdit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Nomor Transaksi</label>
                    <input type="text" value={form.no_masuk} onChange={(e) => setForm((f) => ({ ...f, no_masuk: e.target.value }))} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Tanggal</label>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <input type="date" value={form.tanggal_date} onChange={(e) => setForm((f) => ({ ...f, tanggal_date: e.target.value }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                      <input type="time" value={form.tanggal_time} onChange={(e) => setForm((f) => ({ ...f, tanggal_time: e.target.value }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                    </div>
                    {(errors.tanggal_date || errors.tanggal_time) && <p className="text-xs text-red-600 mt-1">{errors.tanggal_date || errors.tanggal_time}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 items-center">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Kategori</label>
                        <div className="mt-1 flex items-center gap-2">
                          <select value={form.kode_kategori} onChange={(e) => setForm((f) => ({ ...f, kode_kategori: e.target.value }))} className="w-[14rem] flex-none rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3">
                            <option value="">Pilih Kategori</option>
                            {categories.map((c) => (
                              <option key={c.kode_kategori} value={c.kode_kategori}>{c.kode_kategori} - {c.nama_kategori}</option>
                            ))}
                          </select>
                          <button type="button" onClick={openKategori} className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        {errors.kode_kategori && <p className="text-xs text-red-600 mt-1">{errors.kode_kategori}</p>}
                      </div>
                      <div className="md:col-start-3">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Petugas</label>
                        <select value={form.nip} onChange={(e) => setForm((f) => ({ ...f, nip: e.target.value }))} className="mt-1 w-[14rem] rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3">
                          <option value="">Pilih Petugas</option>
                          {petugasOptions.map((p) => (
                            <option key={p.nip} value={p.nip}>{p.nip} - {p.nama}</option>
                          ))}
                        </select>
                        {errors.nip && <p className="text-xs text-red-600 mt-1">{errors.nip}</p>}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Pemasukan (Rp)</label>
                    <input type="text" inputMode="numeric" value={besarText} onChange={(e) => { const raw = e.target.value || ""; const digits = raw.replace(/[^0-9]/g, ""); const num = Number(digits || 0); setForm((f) => ({ ...f, besar: num })); setBesarText(digits === "" ? "" : num.toLocaleString("id-ID")); }} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3 text-right" />
                    {errors.besar && <p className="text-xs text-red-600 mt-1">{errors.besar}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Keterangan</label>
                    <input type="text" value={form.keterangan} onChange={(e) => setForm((f) => ({ ...f, keterangan: e.target.value }))} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                    {errors.keterangan && <p className="text-xs text-red-600 mt-1">{errors.keterangan}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Keperluan</label>
                    <input type="text" value={form.keperluan} onChange={(e) => setForm((f) => ({ ...f, keperluan: e.target.value }))} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                    {errors.keperluan && <p className="text-xs text-red-600 mt-1">{errors.keperluan}</p>}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button type="button" onClick={() => setShowEdit(false)} className="inline-flex items-center gap-1 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-3 py-1.5 rounded-md">
                    Batal
                  </button>
                  <button type="submit" className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold text-sm px-3 py-1.5 rounded-md">
                    Simpan
                  </button>
                </div>
                {errors._global && <p className="text-xs text-red-600 mt-2">{errors._global}</p>}
              </motion.form>
            </Modal>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showKategoriModal && (
            <Modal show={showKategoriModal} onClose={() => setShowKategoriModal(false)} title="Tambah Kategori Pemasukan Lain" size="sm">
              <motion.form className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} onSubmit={async (e) => {
                e.preventDefault();
                setKategoriErrors({});
                const payload = { kode_kategori: String(kategoriForm.kode_kategori || '').trim(), nama_kategori: String(kategoriForm.nama_kategori || '').trim() };
                if (!payload.kode_kategori || !payload.nama_kategori) {
                  setKategoriErrors({ _global: 'Lengkapi kode dan nama kategori' });
                  return;
                }
                try {
                  const res = await axios.post('/api/akutansi/kategori-pemasukan-lain', payload, { headers: { Accept: 'application/json' } });
                  const data = res?.data?.data || payload;
                  setShowKategoriModal(false);
                  await fetchCategories();
                  setForm((f) => ({ ...f, kode_kategori: data?.kode_kategori || payload.kode_kategori }));
                  setFilters((fl) => ({ ...fl, kode_kategori: data?.kode_kategori || payload.kode_kategori }));
                } catch (e) {
                  const d = e?.response?.data;
                  if (d && typeof d === 'object') setKategoriErrors(d.errors || { _global: d.message || 'Gagal menyimpan kategori' });
                }
              }}>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Kode Kategori</label>
                  <input type="text" value={kategoriForm.kode_kategori} onChange={(e) => setKategoriForm((s) => ({ ...s, kode_kategori: e.target.value }))} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Nama Kategori</label>
                  <input type="text" value={kategoriForm.nama_kategori} onChange={(e) => setKategoriForm((s) => ({ ...s, nama_kategori: e.target.value }))} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                </div>
                {kategoriErrors._global && <p className="text-xs text-red-600">{kategoriErrors._global}</p>}
                <div className="flex items-center justify-end gap-2">
                  <button type="button" onClick={() => setShowKategoriModal(false)} className="inline-flex items-center gap-1 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-3 py-1.5 rounded-md">
                    Batal
                  </button>
                  <button type="submit" className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold text-sm px-3 py-1.5 rounded-md">
                    Simpan
                  </button>
                </div>
              </motion.form>
            </Modal>
          )}
        </AnimatePresence>
      </motion.div>
    </SidebarKeuangan>
  );
}
