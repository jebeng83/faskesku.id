import React, { useState, useEffect, useMemo } from "react";
import { Head } from "@inertiajs/react";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Plus, Edit2, Trash2, Search as SearchIcon, XCircle, ClipboardList } from "lucide-react";
import axios from "axios";
import Modal from "@/Components/Modal";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import Label from "@/Components/ui/Label";
import SearchableSelect from "@/Components/SearchableSelect";

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delayChildren: 0.02, staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28 } },
};

const toCurrency = (n) => Number(n || 0).toLocaleString("id-ID");

export default function PengeluaranHarian() {
  const today = new Date().toISOString().slice(0, 10);
  const nowTime = new Date().toTimeString().slice(0, 5);

  const [form, setForm] = useState({
    no_keluar: "",
    tanggal_date: today,
    tanggal_time: nowTime,
    kode_kategori: "",
    nama_kategori: "",
    nip: "",
    besar: "",
    keterangan: "",
    norek: "",
    atas_nama: "",
    kota_atas_nama: "",
    kode_metode: "",
    metode_pembayaran: "",
    biaya_transaksi: "",
    kode_bank: "",
    bank_tujuan: "",
  });
  const [errors, setErrors] = useState({});
  const [showKatModal, setShowKatModal] = useState(false);
  const [katList, setKatList] = useState([]);
  const [katSearch, setKatSearch] = useState("");
  const [katLoading, setKatLoading] = useState(false);
  const [katMode, setKatMode] = useState("create");
  const [katEditKode, setKatEditKode] = useState("");
  const [katForm, setKatForm] = useState({ kode_kategori: "", nama_kategori: "", kd_rek: "", kd_rek2: "" });
  const [katErrors, setKatErrors] = useState({});

  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [listFilters, setListFilters] = useState({ from: today, to: today, nama_kategori: '' });
  const [showCreate, setShowCreate] = useState(false);
  const [besarText, setBesarText] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [globalError, setGlobalError] = useState("");

  const totalNominal = useMemo(() => (items || []).reduce((acc, it) => acc + Number(it?.biaya || 0), 0), [items]);

  const setF = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const generateNo = async () => {
    try {
      const res = await fetch("/api/akutansi/pengeluaran-harian/generate-no");
      if (!res.ok) return;
      const json = await res.json();
      if (json && json.success && json.no_keluar) {
        setF("no_keluar", json.no_keluar);
      }
    } catch (_) {}
  };

  useEffect(() => {
    generateNo();
  }, []);

  useEffect(() => {
    if (!showKatModal) return;
    fetchKatList(katSearch);
  }, [showKatModal]);

  const fetchKatList = async (q = "") => {
    try {
      setKatLoading(true);
      const res = await axios.get("/api/akutansi/kategori-pengeluaran-harian", { params: { q } });
      const data = Array.isArray(res.data?.data) ? res.data.data : [];
      setKatList(data);
    } catch (_) {
    } finally {
      setKatLoading(false);
    }
  };

  const resetFilters = () => {
    setListFilters({ from: today, to: today, nama_kategori: '' });
    setPage(1);
    fetchList();
  };

  const nextKatCode = async () => {
    try {
      const res = await axios.get("/api/akutansi/kategori-pengeluaran-harian/next-code");
      const kode = res.data?.kode || "";
      if (kode) {
        setKatForm((f) => ({ ...f, kode_kategori: kode }));
      }
    } catch (_) {}
  };

  const openKatModal = () => {
    setKatMode("create");
    setKatEditKode("");
    setKatForm({ kode_kategori: "", nama_kategori: "", kd_rek: "", kd_rek2: "" });
    setKatErrors({});
    setShowKatModal(true);
    nextKatCode();
  };

  const createKat = async () => {
    try {
      setKatErrors({});
      const res = await axios.post("/api/akutansi/kategori-pengeluaran-harian", katForm);
      if (res.data?.success) {
        setF("kode_kategori", katForm.kode_kategori);
        setF("nama_kategori", katForm.nama_kategori || "");
        setShowKatModal(false);
      }
    } catch (e) {
      const errs = e?.response?.data?.errors || {};
      setKatErrors(errs);
    }
  };

  const handleKodeChange = (e) => {
    const v = String(e.target.value || "");
    setKatForm((f) => ({ ...f, kode_kategori: v }));
  };

  const startEditKat = (it) => {
    setKatMode("edit");
    setKatEditKode(String(it?.kode_kategori || ""));
    setKatForm({
      kode_kategori: String(it?.kode_kategori || ""),
      nama_kategori: String(it?.nama_kategori || ""),
      kd_rek: String(it?.kd_rek || ""),
      kd_rek2: String(it?.kd_rek2 || ""),
    });
    setKatErrors({});
  };

  const updateKat = async () => {
    if (!katEditKode) return;
    try {
      setKatErrors({});
      const payload = { nama_kategori: katForm.nama_kategori || "", kd_rek: katForm.kd_rek || "", kd_rek2: katForm.kd_rek2 || "" };
      const res = await axios.put(`/api/akutansi/kategori-pengeluaran-harian/${encodeURIComponent(katEditKode)}`, payload);
      if (res.data?.success) {
        await fetchKatList(katSearch);
        setKatMode("create");
        setKatEditKode("");
        setKatForm({ kode_kategori: "", nama_kategori: "", kd_rek: "", kd_rek2: "" });
      }
    } catch (e) {
      const errs = e?.response?.data?.errors || {};
      setKatErrors(errs);
    }
  };

  const deleteKat = async (kode) => {
    if (!kode) return;
    try {
      await axios.delete(`/api/akutansi/kategori-pengeluaran-harian/${encodeURIComponent(kode)}`);
      await fetchKatList(katSearch);
    } catch (_) {}
  };

  const validate = () => {
    const e = {};
    if (!form.keterangan) e.keterangan = "Wajib diisi";
    if (!form.nip) e.nip = "Wajib diisi";
    if (!form.kode_kategori) e.kode_kategori = "Wajib diisi";
    if (!form.no_keluar) e.no_keluar = "Wajib diisi";
    const num = Number(String(form.besar).replace(/[^0-9.]/g, ""));
    if (!num || num <= 0) e.besar = "Harus > 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setErrors({});
      const amount = Number(String(form.besar).replace(/[^0-9.]/g, ""));
      const payload = {
        no_keluar: String(form.no_keluar || "").trim(),
        tanggal_date: form.tanggal_date,
        tanggal_time: form.tanggal_time,
        kode_kategori: form.kode_kategori,
        nip: form.nip,
        besar: amount,
        keterangan: form.keterangan,
      };
      const res = await axios.post('/api/akutansi/pengeluaran-harian', payload);
      if ((res && res.status === 201) || (res && res.data && res.data.ok)) {
        setShowCreate(false);
        fetchList();
      }
    } catch (e) {
      const msg = e?.response?.data?.message || '';
      const errs = e?.response?.data?.errors || {};
      if (msg && msg.includes('no_keluar sudah ada')) {
        setErrors({ ...errs, no_keluar: msg });
      } else if (Object.keys(errs).length > 0) {
        setErrors(errs);
      } else {
        setErrors({ keterangan: 'Gagal menyimpan' });
      }
    }
  };

  const openEdit = (row) => {
    setSelected(row || null);
    const t = String(row?.tanggal || "");
    const d = t.slice(0, 10);
    const tm = t.slice(11, 16);
    const num = Number(row?.biaya || 0);
    setForm({
      no_keluar: String(row?.no_keluar || ""),
      tanggal_date: d || today,
      tanggal_time: tm || nowTime,
      kode_kategori: String(row?.kode_kategori || ""),
      nama_kategori: String(row?.nama_kategori || ""),
      nip: String(row?.nip || ""),
      besar: num,
      keterangan: String(row?.keterangan || ""),
      norek: "",
      atas_nama: "",
      kota_atas_nama: "",
      kode_metode: "",
      metode_pembayaran: "",
      biaya_transaksi: "",
      kode_bank: "",
      bank_tujuan: "",
    });
    setBesarText(num ? num.toLocaleString("id-ID") : "");
    setErrors({});
    setGlobalError("");
    setShowEdit(true);
  };

  const doDelete = async (row) => {
    const id = String(row?.no_keluar || "");
    if (!id) return;
    const ok = window.confirm("Hapus transaksi ini?");
    if (!ok) return;
    try {
      await axios.delete(`/api/akutansi/pengeluaran-harian/${encodeURIComponent(id)}`);
      fetchList();
    } catch (_) {}
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setGlobalError("");
    try {
      const id = String(selected?.no_keluar || form.no_keluar || "");
      if (!id) return;
      await axios.delete(`/api/akutansi/pengeluaran-harian/${encodeURIComponent(id)}`);
      const amount = Number(String(form.besar).replace(/[^0-9.]/g, ""));
      const payload = {
        no_keluar: String(form.no_keluar || "").trim(),
        tanggal_date: form.tanggal_date,
        tanggal_time: form.tanggal_time,
        kode_kategori: form.kode_kategori,
        nip: form.nip,
        besar: amount,
        keterangan: form.keterangan,
      };
      const res = await axios.post('/api/akutansi/pengeluaran-harian', payload);
      if ((res && res.status === 201) || (res && res.data && res.data.ok)) {
        setShowEdit(false);
        setSelected(null);
        fetchList();
      }
    } catch (e2) {
      const data = e2?.response?.data;
      if (data && typeof data === 'object') {
        setErrors(data.errors || {});
        setGlobalError(data.message || "Gagal menyimpan perubahan");
      } else {
        setGlobalError("Gagal menyimpan perubahan");
      }
    }
  };

  const fetchList = async () => {
    try {
      setItemsLoading(true);
      const params = { from: listFilters.from, to: listFilters.to, nama_kategori: listFilters.nama_kategori, page, per_page: perPage };
      const res = await axios.get('/api/akutansi/pengeluaran-harian', { params });
      const data = Array.isArray(res?.data?.data) ? res.data.data : [];
      const meta = res?.data?.meta || { total: 0, page: 1, per_page: perPage };
      setItems(data);
      setTotal(Number(meta.total || 0));
      setPage(Number(meta.page || 1));
      setPerPage(Number(meta.per_page || perPage));
    } catch (_) {
      setItems([]);
      setTotal(0);
    } finally {
      setItemsLoading(false);
    }
  };

  useEffect(() => { fetchList(); }, []);
  useEffect(() => { fetchList(); }, [page, perPage]);

  return (
    <SidebarKeuangan title="Keuangan">
      <Head title="Pengeluaran Harian" />
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative"
          layout
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-5 py-4 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-800/60 dark:via-gray-800/60 dark:to-gray-800/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Pengeluaran Harian</h1>
                </div>
                <motion.button
                  onClick={() => { setErrors({}); setShowCreate(true); setBesarText(""); generateNo(); }}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold px-3 py-2 rounded-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-4 h-4" /> Tambah
                </motion.button>
              </div>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-6 bg-white dark:bg-gray-900"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-4 overflow-x-auto pb-2">
                  <div className="min-w-[14rem] relative">
                    <Input
                      type="text"
                      value={listFilters.nama_kategori}
                      onChange={(e) => setListFilters((f) => ({ ...f, nama_kategori: e.target.value }))}
                      className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors placeholder:text-gray-400 text-sm h-10 pl-10 pr-3"
                      placeholder="Nama kategori"
                    />
                    <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="min-w-[11rem]">
                    <Label className="sr-only">Dari</Label>
                    <Input type="date" value={listFilters.from} onChange={(e) => setListFilters((f) => ({ ...f, from: e.target.value }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors text-sm h-10 px-3" />
                  </div>
                  <div className="min-w-[11rem]">
                    <Label className="sr-only">Sampai</Label>
                    <Input type="date" value={listFilters.to} onChange={(e) => setListFilters((f) => ({ ...f, to: e.target.value }))} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors text-sm h-10 px-3" />
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <motion.button onClick={() => { setPage(1); fetchList(); }} className="inline-flex items-center justify-center h-10 w-10 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} aria-label="Cari">
                      <SearchIcon className="w-4 h-4" />
                    </motion.button>
                    <motion.button onClick={resetFilters} className="inline-flex items-center justify-center h-10 w-10 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} aria-label="Reset">
                      <XCircle className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <motion.div variants={itemVariants} initial="rest" whileHover="hover" className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                  <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm flex items-center justify-between">
                    <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-indigo-600" /> Daftar Pengeluaran
                    </h2>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Total: Rp {toCurrency(totalNominal)}</div>
                  </div>
                  <div className="relative p-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-4 py-3 text-left font-medium">Tanggal</th>
                            <th className="px-4 py-3 text-left font-medium">No. Transaksi</th>
                            <th className="px-4 py-3 text-left font-medium">Kategori</th>
                            <th className="px-4 py-3 text-right font-medium">Pengeluaran</th>
                            <th className="px-4 py-3 text-left font-medium">Petugas</th>
                            <th className="px-4 py-3 text-left font-medium">Keterangan</th>
                            <th className="px-4 py-3 text-right font-medium">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {itemsLoading ? (
                            <tr><td colSpan={6} className="px-4 py-3 text-center text-gray-600 dark:text-gray-300">Memuat...</td></tr>
                          ) : items.length === 0 ? (
                            <tr><td colSpan={6} className="px-4 py-3 text-center text-gray-600 dark:text-gray-300">Tidak ada data</td></tr>
                          ) : (
                            items.map((r) => (
                              <tr key={String(r.no_keluar || Math.random())}>
                                <td className="px-4 py-2">{String(r.tanggal || '').replace('T', ' ').slice(0, 16)}</td>
                                <td className="px-4 py-2">{String(r.no_keluar || '')}</td>
                                <td className="px-4 py-2">{String(r.nama_kategori || '')}</td>
                                <td className="px-4 py-2 text-right">{toCurrency(r.biaya)}</td>
                                <td className="px-4 py-2">{String(r.nip || '')}</td>
                                <td className="px-4 py-2">{String(r.keterangan || '')}</td>
                                <td className="px-4 py-2 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <motion.button onClick={() => openEdit(r)} className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} aria-label="Edit">
                                      <Edit2 className="w-4 h-4" />
                                    </motion.button>
                                    <motion.button onClick={() => doDelete(r)} className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} aria-label="Hapus">
                                      <Trash2 className="w-4 h-4" />
                                    </motion.button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800">
                    <div className="text-xs">Hal {page} dari {Math.max(1, Math.ceil(total / perPage))}</div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={() => { if (page > 1) setPage(page - 1); }} disabled={page <= 1}>Prev</Button>
                      <Button variant="outline" onClick={() => { const maxPage = Math.max(1, Math.ceil(total / perPage)); if (page < maxPage) setPage(page + 1); }} disabled={page >= Math.max(1, Math.ceil(total / perPage))}>Next</Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            <AnimatePresence>
              {showCreate && (
                <Modal show={showCreate} onClose={() => setShowCreate(false)} title="Tambah Pengeluaran Harian" size="xxl">
                  <motion.form className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="mb-2 block">Nomor Transaksi</Label>
                        <Input type="text" value={form.no_keluar} onChange={(e) => setF("no_keluar", e.target.value)} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" placeholder="PHXXXXXXXXX" />
                        {errors.no_keluar && <p className="text-xs text-red-600 mt-1">{errors.no_keluar}</p>}
                      </div>
                      <div>
                        <Label className="mb-2 block">Tanggal</Label>
                        <Input type="date" value={form.tanggal_date} onChange={(e) => setF("tanggal_date", e.target.value)} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                      </div>
                      <div>
                        <Label className="mb-2 block">Waktu</Label>
                        <Input type="time" value={form.tanggal_time} onChange={(e) => setF("tanggal_time", e.target.value)} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                      </div>
                      <div>
                        <Label className="mb-2 block">Petugas</Label>
                        <SearchableSelect
                          source="petugas"
                          value={form.nip}
                          onChange={(val) => setF("nip", val)}
                          placeholder="Pilih petugas"
                          searchPlaceholder="Cari NIP atau nama petugas"
                          defaultDisplay={form.nip ? undefined : undefined}
                          className="w-full h-10 text-sm"
                        />
                        {errors.nip && <p className="text-xs text-red-600 mt-1">{errors.nip}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,20%)_minmax(40px,3%)_minmax(0,50%)_minmax(0,27%)] gap-4 items-start">
                      <div>
                        <Label className="mb-2 block">Kode Kategori</Label>
                        <SearchableSelect
                          source="akutansi_kategori_pengeluaran_harian"
                          value={form.kode_kategori}
                          onChange={(val) => setF("kode_kategori", val)}
                          onSelect={(opt) => {
                            const label = typeof opt === "string" ? opt : opt?.label || "";
                            const parts = label.split(" — ");
                            const nama = (typeof opt === "object" && (opt?.nama_kategori || opt?.nama)) || (parts.length > 1 ? parts[1] : "");
                            setF("nama_kategori", nama);
                          }}
                          placeholder="Pilih kategori"
                          searchPlaceholder="Cari kode/nama kategori"
                          defaultDisplay={form.kode_kategori || undefined}
                          className="w-full h-10 text-sm"
                          displayKey="kode_kategori"
                          optionDisplayKey="label"
                        />
                        {errors.kode_kategori && <p className="text-xs text-red-600 mt-1">{errors.kode_kategori}</p>}
                      </div>
                      <div>
                        <Label className="mb-2 block">&nbsp;</Label>
                        <button type="button" onClick={openKatModal} className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <Label className="mb-2 block">Nama Kategori</Label>
                        <Input type="text" value={form.nama_kategori} onChange={(e) => setF("nama_kategori", e.target.value)} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" placeholder="Nama kategori" />
                      </div>
                      <div>
                        <Label className="mb-2 block">Pengeluaran (Rp)</Label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          value={besarText}
                          onChange={(e) => {
                            const raw = e.target.value || "";
                            const digits = raw.replace(/[^0-9]/g, "");
                            const num = Number(digits || 0);
                            setF("besar", num);
                            setBesarText(digits === "" ? "" : num.toLocaleString("id-ID"));
                          }}
                          className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3 text-right"
                          placeholder="0"
                        />
                        {errors.besar && <p className="text-xs text-red-600 mt-1">{errors.besar}</p>}
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Keterangan</Label>
                      <textarea value={form.keterangan} onChange={(e) => setF("keterangan", e.target.value)} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm min-h-[96px] px-3 py-2" placeholder="Deskripsi transaksi" />
                      {errors.keterangan && <p className="text-xs text-red-600 mt-1">{errors.keterangan}</p>}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setShowCreate(false)} className="inline-flex items-center gap-1 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-3 py-1.5 rounded-md">Batal</button>
                      <button type="submit" className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold text-sm px-3 py-1.5 rounded-md">Simpan</button>
                    </div>
                  </motion.form>
                </Modal>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showEdit && (
                <Modal show={showEdit} onClose={() => setShowEdit(false)} title="Edit Pengeluaran Harian" size="xxl">
                  <motion.form className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} onSubmit={submitEdit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="mb-2 block">Nomor Transaksi</Label>
                        <Input type="text" value={form.no_keluar} onChange={(e) => setF("no_keluar", e.target.value)} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" placeholder="PHXXXXXXXXX" />
                        {errors.no_keluar && <p className="text-xs text-red-600 mt-1">{errors.no_keluar}</p>}
                      </div>
                      <div>
                        <Label className="mb-2 block">Tanggal</Label>
                        <Input type="date" value={form.tanggal_date} onChange={(e) => setF("tanggal_date", e.target.value)} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                      </div>
                      <div>
                        <Label className="mb-2 block">Waktu</Label>
                        <Input type="time" value={form.tanggal_time} onChange={(e) => setF("tanggal_time", e.target.value)} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" />
                      </div>
                      <div>
                        <Label className="mb-2 block">Petugas</Label>
                        <SearchableSelect
                          source="petugas"
                          value={form.nip}
                          onChange={(val) => setF("nip", val)}
                          placeholder="Pilih petugas"
                          searchPlaceholder="Cari NIP atau nama petugas"
                          defaultDisplay={form.nip ? undefined : undefined}
                          className="w-full h-10 text-sm"
                        />
                        {errors.nip && <p className="text-xs text-red-600 mt-1">{errors.nip}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,20%)_minmax(40px,3%)_minmax(0,50%)_minmax(0,27%)] gap-4 items-start">
                      <div>
                        <Label className="mb-2 block">Kode Kategori</Label>
                        <SearchableSelect
                          source="akutansi_kategori_pengeluaran_harian"
                          value={form.kode_kategori}
                          onChange={(val) => setF("kode_kategori", val)}
                          onSelect={(opt) => {
                            const label = typeof opt === "string" ? opt : opt?.label || "";
                            const parts = label.split(" — ");
                            const nama = (typeof opt === "object" && (opt?.nama_kategori || opt?.nama)) || (parts.length > 1 ? parts[1] : "");
                            setF("nama_kategori", nama);
                          }}
                          placeholder="Pilih kategori"
                          searchPlaceholder="Cari kode/nama kategori"
                          defaultDisplay={form.kode_kategori || undefined}
                          className="w-full h-10 text-sm"
                          displayKey="kode_kategori"
                          optionDisplayKey="label"
                        />
                        {errors.kode_kategori && <p className="text-xs text-red-600 mt-1">{errors.kode_kategori}</p>}
                      </div>
                      <div>
                        <Label className="mb-2 block">&nbsp;</Label>
                        <button type="button" onClick={openKatModal} className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <Label className="mb-2 block">Nama Kategori</Label>
                        <Input type="text" value={form.nama_kategori} onChange={(e) => setF("nama_kategori", e.target.value)} className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3" placeholder="Nama kategori" />
                      </div>
                      <div>
                        <Label className="mb-2 block">Pengeluaran (Rp)</Label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          value={besarText}
                          onChange={(e) => {
                            const raw = e.target.value || "";
                            const digits = raw.replace(/[^0-9]/g, "");
                            const num = Number(digits || 0);
                            setF("besar", num);
                            setBesarText(digits === "" ? "" : num.toLocaleString("id-ID"));
                          }}
                          className="mt-1 w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 text-sm h-10 px-3 text-right"
                          placeholder="0"
                        />
                        {errors.besar && <p className="text-xs text-red-600 mt-1">{errors.besar}</p>}
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Keterangan</Label>
                      <textarea value={form.keterangan} onChange={(e) => setF("keterangan", e.target.value)} className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm min-h-[96px] px-3 py-2" placeholder="Deskripsi transaksi" />
                      {errors.keterangan && <p className="text-xs text-red-600 mt-1">{errors.keterangan}</p>}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setShowEdit(false)} className="inline-flex items-center gap-1 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-3 py-1.5 rounded-md">Batal</button>
                      <button type="submit" className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold text-sm px-3 py-1.5 rounded-md">Simpan</button>
                    </div>
                    {globalError && <p className="text-xs text-red-600 mt-2">{globalError}</p>}
                  </motion.form>
                </Modal>
              )}
            </AnimatePresence>
            <Modal
              show={showKatModal}
              onClose={() => setShowKatModal(false)}
              title={katMode === "edit" ? "Edit Kategori Pengeluaran Harian" : "Tambah Kategori Pengeluaran Harian"}
              size="lg"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                  <Label required className="mb-2 block">Kode</Label>
                  <Input
                    type="text"
                    value={katForm.kode_kategori}
                    onChange={handleKodeChange}
                    className="h-10 focus:ring-2 focus:ring-blue-500/50"
                    placeholder="CT001"
                    disabled={katMode === "edit"}
                  />
                    {katErrors.kode_kategori && <p className="mt-1 text-xs text-red-600">{String(katErrors.kode_kategori)}</p>}
                  </div>
                  <div>
                    <Label className="mb-2 block">Nama</Label>
                    <Input
                      type="text"
                      value={katForm.nama_kategori}
                      onChange={(e) => setKatForm({ ...katForm, nama_kategori: e.target.value })}
                      className="h-10 focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Nama kategori"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                  <Label required className="mb-2 block">Akun Pengeluaran</Label>
                  <SearchableSelect
                    source="rekening_pengeluaran"
                    value={katForm.kd_rek}
                    onChange={(val) => setKatForm({ ...katForm, kd_rek: val })}
                    placeholder="Pilih akun pengeluaran"
                    searchPlaceholder="Cari kode atau nama rekening"
                    defaultDisplay={katForm.kd_rek || undefined}
                    className="w-full py-3 text-base"
                  />
                    {katErrors.kd_rek && <p className="mt-1 text-xs text-red-600">{String(katErrors.kd_rek)}</p>}
                  </div>
                  <div>
                  <Label required className="mb-2 block">kontra akun Pengeluaran</Label>
                  <SearchableSelect
                    source="rekening_kontra_pengeluaran"
                    value={katForm.kd_rek2}
                    onChange={(val) => setKatForm({ ...katForm, kd_rek2: val })}
                    placeholder="Pilih kontra akun pengeluaran"
                    searchPlaceholder="Cari kode atau nama rekening"
                    defaultDisplay={katForm.kd_rek2 || undefined}
                    className="w-full py-3 text-base"
                  />
                    {katErrors.kd_rek2 && <p className="mt-1 text-xs text-red-600">{String(katErrors.kd_rek2)}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {katMode === "edit" ? (
                    <Button variant="primary" onClick={updateKat}>Simpan Perubahan</Button>
                  ) : (
                    <Button variant="primary" onClick={createKat}>Simpan</Button>
                  )}
                  <Button variant="secondary" onClick={() => {
                    setKatMode("create");
                    setKatEditKode("");
                    setKatForm({ kode_kategori: "", nama_kategori: "", kd_rek: "", kd_rek2: "" });
                    setKatErrors({});
                  }}>Reset</Button>
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      type="text"
                      value={katSearch}
                      onChange={(e) => setKatSearch(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") fetchKatList(katSearch); }}
                      className="h-10 focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Cari kode/nama kategori"
                    />
                    <Button variant="outline" onClick={() => fetchKatList(katSearch)}>Cari</Button>
                  </div>
                  <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="max-h-64 overflow-y-auto">
                      {katLoading ? (
                        <div className="p-3 text-sm">Memuat...</div>
                      ) : katList.length === 0 ? (
                        <div className="p-3 text-sm">Tidak ada data</div>
                      ) : (
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                          {katList.map((it) => (
                            <li key={String(it.kode_kategori || Math.random())} className="p-2 flex items-center justify-between">
                              <div className="flex-1">
                                <div className="text-sm font-medium">{String(it.kode_kategori || "")}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">{String(it.nama_kategori || "")}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" onClick={() => startEditKat(it)}>
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" onClick={() => deleteKat(String(it.kode_kategori || ""))}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </motion.div>
      </div>
    </SidebarKeuangan>
  );
}
