import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import Modal from "@/Components/Modal";
import { Calendar, Search, Printer, DollarSign, User, Clock } from "lucide-react";
import { todayDateString } from "@/tools/datetime";

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.01, y: -4, transition: { duration: 0.3, ease: "easeOut" } },
};

const SHIFTS = ["Semua", "Pagi", "Siang", "Sore", "Malam"];

export default function RekapUangPershiftPage() {
  const [filters, setFilters] = useState(() => ({ date: todayDateString(), shift: "Semua", q: "", user: "" }));
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState({ modal_awal: 0, uang_masuk: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAwal, setModalAwal] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addToast = (type = "info", title = "", message = "", duration = 4000) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    setTimeout(() => removeToast(id), duration);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const currency = useMemo(() => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }), []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/payment-point", { params: filters });
      const raw = res?.data ?? {};
      const list = Array.isArray(raw?.items)
        ? raw.items
        : Array.isArray(raw?.data?.items)
        ? raw.data.items
        : Array.isArray(raw?.data)
        ? raw.data
        : [];
      const sum = raw?.summary ?? raw?.data?.summary ?? { modal_awal: 0, uang_masuk: 0, total: 0 };
      setItems(list);
      setSummary({ modal_awal: Number(sum.modal_awal || 0), uang_masuk: Number(sum.uang_masuk || 0), total: Number(sum.total || 0) });
    } catch (e) {
      setError(e?.response?.data?.message || "Gagal memuat data Payment Point");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetFilters = () => {
    setFilters({ date: todayDateString(), shift: "Semua", q: "", user: "" });
  };

  const openModalAwal = () => {
    setModalAwal("");
    setShowModal(true);
  };
  const closeModalAwal = () => {
    setShowModal(false);
    setModalAwal("");
  };
  const saveModalAwal = async () => {
    setSubmitting(true);
    try {
      const payload = { modal_awal: Number(modalAwal || 0), effective_date: filters.date || undefined };
      await axios.post("/api/payment-point/modal-awal", payload);
      addToast("success", "Berhasil", "Modal awal diperbarui");
      closeModalAwal();
      fetchData();
    } catch (e) {
      addToast("error", "Error", e?.response?.data?.message || "Gagal menyimpan modal awal");
    } finally {
      setSubmitting(false);
    }
  };

  const doPrint = () => {
    const params = new URLSearchParams({ ...filters }).toString();
    const url = `/api/payment-point/report?${params}`;
    window.open(url, "_blank");
  };

  const pageHeader = (
    <motion.div variants={itemVariants} className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <motion.div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Calendar className="w-6 h-6 text-white" />
          </motion.div>
          <motion.h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            Rekap Uang per Shift
          </motion.h1>
        </div>
        <div className="flex items-center gap-2">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={doPrint} className="flex items-center gap-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-medium text-sm px-4 py-2 rounded-md">
            <Printer className="w-3 h-3" />
            Cetak
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const filterSection = (
    <motion.div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5" variants={cardHoverVariants} initial="rest" whileHover="hover">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      <div className="relative px-4 py-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
        <h2 className="text-base font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Filter</h2>
      </div>
      <div className="relative p-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <div className="min-w-[10rem]">
            <label className="sr-only">Tanggal Bayar</label>
            <input type="date" value={filters.date} onChange={(e) => setFilters((f) => ({ ...f, date: e.target.value }))} className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
          </div>
          <div className="min-w-[8rem]">
            <label className="sr-only">Shift</label>
            <select value={filters.shift} onChange={(e) => setFilters((f) => ({ ...f, shift: e.target.value }))} className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50">
              {SHIFTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="min-w-[16rem] flex-1">
            <label className="sr-only">Keyword</label>
            <div className="relative">
              <input type="text" value={filters.q} onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))} placeholder="Nama pasien / No Nota" className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors placeholder:text-gray-400 text-sm h-10 pl-10 pr-3" />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="min-w-[14rem] flex-1">
            <label className="sr-only">Petugas</label>
            <div className="relative">
              <input type="text" value={filters.user} onChange={(e) => setFilters((f) => ({ ...f, user: e.target.value }))} placeholder="Kode/Nama Petugas" className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors placeholder:text-gray-400 text-sm h-10 pl-10 pr-3" />
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={resetFilters} className="inline-flex items-center gap-1 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-3 py-1.5 rounded-md">
              Reset
            </button>
            <button onClick={fetchData} className="flex items-center gap-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-medium text-sm px-4 py-2 rounded-md">
              Cari
            </button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={openModalAwal} className="flex items-center gap-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-medium text-sm px-4 py-2 rounded-md">
              <DollarSign className="w-3 h-3" />
              Modal Awal
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const tableSection = (
    <motion.div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5" variants={cardHoverVariants} initial="rest" whileHover="hover">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      <div className="relative px-4 py-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50 flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Transaksi</h2>
      </div>
      <div className="relative p-6">
        {loading ? (
          <motion.div className="flex flex-col items-center justify-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Clock className="w-8 h-8 animate-spin text-blue-500" />
            <span className="text-sm">Memuat data...</span>
          </motion.div>
        ) : error ? (
          <motion.div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-red-50/60 to-pink-50/60 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200/50 dark:border-red-800/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                    <th className="px-4 py-3 text-left">No.</th>
                    <th className="px-4 py-3 text-left">Tanggal</th>
                    <th className="px-4 py-3 text-left">Shift</th>
                    <th className="px-4 py-3 text-left">No Nota</th>
                    <th className="px-4 py-3 text-left">Nama Pasien</th>
                    <th className="px-4 py-3 text-right">Pembayaran</th>
                    <th className="px-4 py-3 text-left">Petugas</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {items.map((it, idx) => (
                      <motion.tr key={String(it.no ?? it.no_nota ?? idx)} className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: idx * 0.02 }}>
                        <td className="px-4 py-3">{idx + 1}</td>
                        <td className="px-4 py-3">{String(it.tanggal || it.tgl_bayar || "").slice(0, 19)}</td>
                        <td className="px-4 py-3">{it.shift || ""}</td>
                        <td className="px-4 py-3">{it.no_nota || it.no_rawat || ""}</td>
                        <td className="px-4 py-3">{it.nama_pasien || ""}</td>
                        <td className="px-4 py-3 text-right">{currency.format(Number(it.pembayaran || it.jumlah_bayar || 0))}</td>
                        <td className="px-4 py-3">{it.petugas || ""}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative overflow-hidden rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-md p-4">
                <div className="text-xs text-gray-500">Modal Awal</div>
                <div className="text-lg font-semibold">{currency.format(summary.modal_awal || 0)}</div>
              </div>
              <div className="relative overflow-hidden rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-md p-4">
                <div className="text-xs text-gray-500">Uang Masuk</div>
                <div className="text-lg font-semibold">{currency.format(summary.uang_masuk || 0)}</div>
              </div>
              <div className="relative overflow-hidden rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-md p-4">
                <div className="text-xs text-gray-500">Total</div>
                <div className="text-lg font-semibold">{currency.format(summary.total || 0)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const modalForm = (
    <Modal show={showModal} onClose={closeModalAwal} title="Modal Awal" size="sm">
      <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Nominal</label>
          <input
            type="number"
            value={modalAwal}
            onChange={(e) => setModalAwal(e.target.value)}
            className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors text-sm h-10 px-3"
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <button onClick={closeModalAwal} className="inline-flex items-center gap-1 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-3 py-1.5 rounded-md">Batal</button>
          <button disabled={submitting} onClick={saveModalAwal} className="flex items-center gap-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-medium text-sm px-4 py-2 rounded-md">
            Simpan
          </button>
        </div>
      </motion.div>
    </Modal>
  );

  return (
    <SidebarKeuangan title="Keuangan">
      <Head title="Akutansi - Rekap Uang per Shift" />
      {pageHeader}
      {filterSection}
      {tableSection}
      {modalForm}
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
