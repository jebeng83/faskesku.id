import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import Modal from "@/Components/Modal";
import { Calendar, Clock, Plus, Pencil, Trash2, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.01, y: -4, transition: { duration: 0.3, ease: "easeOut" } },
};

const SHIFT_OPTIONS = ["Pagi", "Siang", "Sore", "Malam"];

export default function ClosingKasirPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [form, setForm] = useState({ shift: "", jam_masuk: "", jam_pulang: "" });
  const [toasts, setToasts] = useState([]);

  const addToast = (type = "info", title = "", message = "", duration = 4000) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    setTimeout(() => removeToast(id), duration);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/akutansi/closing-kasir", { params: { per_page: 100 } });
      const raw = res?.data;
      const list = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data?.data)
        ? raw.data.data
        : Array.isArray(raw?.data)
        ? raw.data
        : Array.isArray(raw?.items)
        ? raw.items
        : [];
      setItems(list.map((r) => ({ id: r.id ?? r.ID ?? r.shift, shift: r.shift, jam_masuk: r.jam_masuk, jam_pulang: r.jam_pulang })));
    } catch (e) {
      setError(e?.response?.data?.message || "Gagal memuat data Closing Kasir");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ shift: "", jam_masuk: "", jam_pulang: "" });
    setShowModal(true);
  };
  const openEdit = (row) => {
    setEditing(row);
    setForm({ shift: row.shift || "", jam_masuk: formatTimeInput(row.jam_masuk), jam_pulang: formatTimeInput(row.jam_pulang) });
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setForm({ shift: "", jam_masuk: "", jam_pulang: "" });
  };

  const formatTimeInput = (v) => {
    if (!v) return "";
    const s = String(v);
    if (/^\d{2}:\d{2}:\d{2}$/.test(s)) return s;
    if (/^\d{2}:\d{2}$/.test(s)) return `${s}:00`;
    try {
      const d = new Date(v);
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      return `${hh}:${mm}:${ss}`;
    } catch {
      return s.slice(0, 8);
    }
  };
  const toTimeString = (v) => {
    if (!v) return "";
    const s = String(v);
    if (/^\d{2}:\d{2}$/.test(s)) return `${s}:00`;
    if (/^\d{2}:\d{2}:\d{2}$/.test(s)) return s;
    return s;
  };

  const validate = () => {
    const f = form;
    if (!f.shift) return "Shift wajib dipilih";
    if (!SHIFT_OPTIONS.includes(f.shift)) return "Shift tidak valid";
    if (!f.jam_masuk) return "Jam masuk wajib diisi";
    if (!f.jam_pulang) return "Jam pulang wajib diisi";
    return null;
  };

  const submitForm = async () => {
    const err = validate();
    if (err) {
      addToast("error", "Validasi Gagal", err);
      return;
    }
    setSubmitting(true);
    try {
      const payload = { shift: form.shift, jam_masuk: toTimeString(form.jam_masuk), jam_pulang: toTimeString(form.jam_pulang) };
      if (editing && editing.id != null) {
        await axios.put(`/api/akutansi/closing-kasir/${editing.id}`, payload);
        addToast("success", "Berhasil", "Data berhasil diperbarui");
      } else {
        await axios.post("/api/akutansi/closing-kasir", payload);
        addToast("success", "Berhasil", "Data berhasil ditambahkan");
      }
      closeModal();
      fetchItems();
    } catch (e) {
      const msg = e?.response?.data?.message || "Gagal menyimpan data";
      addToast("error", "Error", msg);
    } finally {
      setSubmitting(false);
    }
  };

  const requestDelete = (row) => setConfirmDelete(row);
  const cancelDelete = () => setConfirmDelete(null);
  const confirmDeleteAction = async () => {
    if (!confirmDelete) return;
    try {
      await axios.delete(`/api/akutansi/closing-kasir/${confirmDelete.id}`);
      addToast("success", "Berhasil", "Data berhasil dihapus");
      setConfirmDelete(null);
      fetchItems();
    } catch (e) {
      addToast("error", "Error", e?.response?.data?.message || "Gagal menghapus data");
    }
  };

  const pageHeader = (
    <motion.div
      variants={itemVariants}
      className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <motion.div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Calendar className="w-6 h-6 text-white" />
          </motion.div>
          <motion.h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            Closing Kasir
          </motion.h1>
        </div>
        <div className="flex items-center gap-2">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={fetchItems} className="inline-flex items-center gap-1 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-3 py-1.5 rounded-md">
            <RefreshCw className="w-3 h-3" />
            Muat Ulang
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={openCreate} className="flex items-center gap-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-medium text-sm px-4 py-2 rounded-md">
            <Plus className="w-3 h-3" />
            Tambah Jadwal
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const tableSection = (
    <motion.div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5" variants={cardHoverVariants} initial="rest" whileHover="hover">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      <div className="relative px-4 py-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50 flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Jadwal Shift</h2>
      </div>
      <div className="relative p-6">
        {loading ? (
          <motion.div className="flex flex-col items-center justify-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Clock className="w-8 h-8 animate-spin text-blue-500" />
            <span className="text-sm">Memuat data...</span>
          </motion.div>
        ) : error ? (
          <motion.div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-red-50/60 to-pink-50/60 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200/50 dark:border-red-800/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
          </motion.div>
        ) : items.length === 0 ? (
          <motion.div className="flex flex-col items-center justify-center gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Clock className="w-12 h-12 text-gray-400" />
            <span>Tidak ada data.</span>
          </motion.div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                  <th className="px-4 py-3 text-left">Shift</th>
                  <th className="px-4 py-3 text-left">Jam Masuk</th>
                  <th className="px-4 py-3 text-left">Jam Pulang</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {items.map((it, idx) => (
                    <motion.tr key={String(it.id ?? idx)} className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: idx * 0.02 }}>
                      <td className="px-4 py-3">
                        <motion.span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800 font-mono text-xs font-bold" whileHover={{ scale: 1.05 }}>
                          {it.shift}
                        </motion.span>
                      </td>
                      <td className="px-4 py-3">{String(it.jam_masuk || "").slice(0, 8)}</td>
                      <td className="px-4 py-3">{String(it.jam_pulang || "").slice(0, 8)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => openEdit(it)} aria-label="Edit">
                            <Pencil className="w-4 h-4" />
                          </motion.button>
                          <motion.button className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => requestDelete(it)} aria-label="Hapus">
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );

  const modalForm = (
    <Modal show={showModal} onClose={closeModal} title={editing ? "Edit Jadwal" : "Tambah Jadwal"} size="md">
      <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Shift</label>
          <select value={form.shift} onChange={(e) => setForm((f) => ({ ...f, shift: e.target.value }))} className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50">
            <option value="">Pilih Shift</option>
            {SHIFT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Jam Masuk</label>
            <input type="time" step="1" value={formatTimeInput(form.jam_masuk)} onChange={(e) => setForm((f) => ({ ...f, jam_masuk: e.target.value }))} className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Jam Pulang</label>
            <input type="time" step="1" value={formatTimeInput(form.jam_pulang)} onChange={(e) => setForm((f) => ({ ...f, jam_pulang: e.target.value }))} className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button onClick={closeModal} className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold px-4 py-2 rounded-lg">Batal</button>
          <button disabled={submitting} onClick={submitForm} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold px-6 py-2.5 rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
            {submitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </motion.div>
    </Modal>
  );

  const deleteModal = (
    <Modal show={!!confirmDelete} onClose={cancelDelete} title="Konfirmasi Hapus" size="sm">
      <div className="space-y-4">
        <p className="text-sm text-gray-700 dark:text-gray-300">Anda yakin ingin menghapus jadwal shift {confirmDelete?.shift}? Tindakan ini tidak dapat dibatalkan.</p>
        <div className="flex items-center justify-end gap-2">
          <button onClick={cancelDelete} className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold px-4 py-2 rounded-lg">Batal</button>
          <button onClick={confirmDeleteAction} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-lg">
            <Trash2 className="w-4 h-4" />
            Hapus
          </button>
        </div>
      </div>
    </Modal>
  );

  return (
    <SidebarKeuangan title="Keuangan">
      <Head title="Akutansi - Closing Kasir" />
      {pageHeader}
      {tableSection}
      {modalForm}
      {deleteModal}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`px-4 py-2 rounded-lg shadow-lg ${t.type === "success" ? "bg-green-600 text-white" : t.type === "error" ? "bg-red-600 text-white" : "bg-blue-600 text-white"}`}>
            <div className="text-sm font-semibold">{t.title}</div>
            {t.message && <div className="text-xs">{t.message}</div>}
          </motion.div>
        ))}
      </div>
    </SidebarKeuangan>
  );
}
