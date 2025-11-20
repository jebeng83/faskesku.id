import React, { useMemo, useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import LanjutanRegistrasiLayout from "@/Layouts/LanjutanRegistrasiLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Plus, Search as SearchIcon, Edit2, Globe } from "lucide-react";
import { Toaster } from "@/Components/ui";

// Notion Variants (UI/UX Improvements Guide)
// Ref: docs/UI_UX_IMPROVEMENTS_GUIDE.md
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.01, y: -4, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function PoliklinikIndex() {
    const { polikliniks, filters, errors } = usePage().props;
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [search, setSearch] = useState(filters?.search || "");
    const [editing, setEditing] = useState(null);
    const [tableLoading, setTableLoading] = useState(false);
    const [toasts, setToasts] = useState([]);

    const addToast = (type = "info", title = "", message = "", duration = 4000) => {
        const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    };
    const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

	const tableItems = useMemo(() => polikliniks?.data || [], [polikliniks]);

	const openCreate = () => setIsCreateOpen(true);
	const closeCreate = () => setIsCreateOpen(false);
	const openEdit = (item) => {
		setEditing(item);
		setIsEditOpen(true);
	};
	const closeEdit = () => {
		setEditing(null);
		setIsEditOpen(false);
	};

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("poliklinik.index"), { search }, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            onStart: () => setTableLoading(true),
            onFinish: () => setTableLoading(false),
        });
    };

    const toggleStatus = (item) => {
        const newStatus = item.status === "1" ? "0" : "1";
        router.patch(route("poliklinik.toggle-status", item.kd_poli), { status: newStatus }, {
            onSuccess: () => {
                addToast("success", "Status diperbarui", `Poliklinik ${item.nm_poli} ${newStatus === "1" ? "diaktifkan" : "dinonaktifkan"}.`);
                router.reload();
            },
            onError: () => {
                addToast("error", "Gagal memperbarui status", "Silakan coba lagi.");
            },
        });
    };

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(amount);
	};

  return (
    <LanjutanRegistrasiLayout title="Registrasi Pasien" menuConfig={{ activeTab: "poliklinik" }}>
      <Head title="Manajemen Poliklinik" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Global Toaster */}
        <Toaster toasts={toasts} onRemove={removeToast} />
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div
                className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Building2 className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <motion.h1
                  className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Poliklinik
                </motion.h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Kelola data poliklinik dan tarif registrasi
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto flex items-center gap-3">
              <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
                <div className="relative">
                  <SearchIcon className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 w-64 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                    placeholder="Cari kode/nama poliklinik"
                    aria-label="Cari Poliklinik"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 text-sm rounded-md bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all"
                >
                  Cari
                </button>
              </form>
              <motion.button
                onClick={openCreate}
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 text-sm"
              >
                <Plus className="w-4 h-4" />
                Tambah
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300">
                  <th className="text-left px-4 py-3">Kode</th>
                  <th className="text-left px-4 py-3">Nama Poliklinik</th>
                  <th className="text-left px-4 py-3">Tarif Registrasi</th>
                  <th className="text-left px-4 py-3">Tarif Reg. Lama</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-right px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/60 dark:divide-gray-800/60 text-gray-800 dark:text-gray-200">
                {/* Loading skeleton */}
                {tableLoading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6">
                      <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-10 w-full rounded-md bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
                        ))}
                      </div>
                    </td>
                  </tr>
                )}

                {/* Empty state */}
                {!tableLoading && tableItems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12">
                      <motion.div
                        className="flex flex-col items-center justify-center gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Globe className="w-12 h-12 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Tidak ada data poliklinik.</span>
                        <button
                          onClick={openCreate}
                          className="mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 text-sm"
                        >
                          <Plus className="w-4 h-4" /> Tambah Poliklinik Pertama
                        </button>
                      </motion.div>
                    </td>
                  </tr>
                )}

                {!tableLoading && tableItems.length > 0 && (
                <AnimatePresence>
                  {tableItems.map((item, idx) => (
                    <motion.tr
                      key={item.kd_poli}
                      className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 cursor-pointer"
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ delay: idx * 0.02 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <td className="px-4 py-3 font-semibold tracking-wide">{item.kd_poli}</td>
                      <td className="px-4 py-3">{item.nm_poli}</td>
                      <td className="px-4 py-3">{formatCurrency(item.registrasi)}</td>
                      <td className="px-4 py-3">{formatCurrency(item.registrasilama)}</td>
                      <td className="px-4 py-3">
                        <motion.span
                          className={`inline-flex items-center px-3 py-1.5 rounded-lg font-mono text-xs font-bold ring-1 ${
                            item.status === "1"
                              ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 ring-green-200 dark:ring-green-800"
                              : "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 text-red-700 dark:text-red-300 ring-red-200 dark:ring-red-800"
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {item.status === "1" ? "Aktif" : "Nonaktif"}
                        </motion.span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => toggleStatus(item)}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ring-1 ${
                              item.status === "1"
                                ? "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-300 ring-red-200 dark:ring-red-800 hover:shadow-md"
                                : "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300 ring-green-200 dark:ring-green-800 hover:shadow-md"
                            }`}
                          >
                            {item.status === "1" ? "Nonaktifkan" : "Aktifkan"}
                          </button>
                          <button
                            onClick={() => openEdit(item)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!tableLoading && polikliniks?.links && (
            <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300">
              <div>
                Menampilkan {polikliniks.from || 0} - {polikliniks.to || 0} dari {polikliniks.total || 0}
              </div>
              <div className="flex gap-1">
                {polikliniks.links.map((link, idx) => {
                  if (idx === 0 || idx === polikliniks.links.length - 1) return null;
                  const isActive = link.active;
                  return (
                    <button
                      key={idx}
                      onClick={() => router.get(link.url, {}, { preserveState: true, preserveScroll: true, onStart: () => setTableLoading(true), onFinish: () => setTableLoading(false) })}
                      className={`px-3 py-1.5 rounded-md transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md"
                          : "border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        <CreateModal isOpen={isCreateOpen} onClose={closeCreate} addToast={addToast} />
        <EditModal isOpen={isEditOpen} onClose={closeEdit} item={editing} addToast={addToast} />
      </motion.div>
    </LanjutanRegistrasiLayout>
  );
}

function CreateModal({ isOpen, onClose, addToast }) {
	const { errors } = usePage().props;
	const [form, setForm] = useState({
		kd_poli: "",
		nm_poli: "",
		registrasi: "",
		registrasilama: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const [formErrors, setFormErrors] = useState({});

	const handleClose = () => {
		setForm({
			kd_poli: "",
			nm_poli: "",
			registrasi: "",
			registrasilama: "",
		});
		setFormErrors({});
		onClose();
	};

	const submit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		setFormErrors({});

    router.post(route("poliklinik.store"), form, {
            onSuccess: () => {
                handleClose();
                addToast && addToast("success", "Berhasil", "Poliklinik berhasil ditambahkan.");
            },
            onError: (errors) => {
                setFormErrors(errors);
                addToast && addToast("error", "Gagal menyimpan", "Periksa input dan coba lagi.");
            },
            onFinish: () => setSubmitting(false),
        });
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 w-full max-w-lg"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                Tambah Poliklinik
                            </h3>
                            <button
                                onClick={handleClose}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={submit} className="p-5 space-y-4">
                            <div className="space-y-4">
                                <Input
                                    label="Kode Poliklinik"
                                    required
                                    value={form.kd_poli}
                                    onChange={(e) =>
                                        setForm({ ...form, kd_poli: e.target.value })
                                    }
                                    error={formErrors.kd_poli}
                                    placeholder="Contoh: U001"
                                    maxLength={5}
                                />
                                <Input
                                    label="Nama Poliklinik"
                                    required
                                    value={form.nm_poli}
                                    onChange={(e) =>
                                        setForm({ ...form, nm_poli: e.target.value })
                                    }
                                    error={formErrors.nm_poli}
                                    placeholder="Contoh: Poli Umum"
                                />
                                <Input
                                    label="Tarif Registrasi"
                                    required
                                    type="number"
                                    value={form.registrasi}
                                    onChange={(e) =>
                                        setForm({ ...form, registrasi: e.target.value })
                                    }
                                    error={formErrors.registrasi}
                                    placeholder="0"
                                    min="0"
                                    step="1000"
                                />
                                <Input
                                    label="Tarif Registrasi Lama"
                                    required
                                    type="number"
                                    value={form.registrasilama}
                                    onChange={(e) =>
                                        setForm({ ...form, registrasilama: e.target.value })
                                    }
                                    error={formErrors.registrasilama}
                                    placeholder="0"
                                    min="0"
                                    step="1000"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700"
                                >
                                    Batal
                                </button>
                                <button
                                    disabled={submitting}
                                    className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:opacity-50"
                                >
                                    {submitting ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function EditModal({ isOpen, onClose, item, addToast }) {
	const { errors } = usePage().props;
	const [form, setForm] = useState(() => ({
		nm_poli: item?.nm_poli || "",
		registrasi: item?.registrasi || "",
		registrasilama: item?.registrasilama || "",
	}));
	const [submitting, setSubmitting] = useState(false);
	const [formErrors, setFormErrors] = useState({});

	React.useEffect(() => {
		setForm({
			nm_poli: item?.nm_poli || "",
			registrasi: item?.registrasi || "",
			registrasilama: item?.registrasilama || "",
		});
	}, [item]);

	const handleClose = () => {
		setForm({
			nm_poli: "",
			registrasi: "",
			registrasilama: "",
		});
		setFormErrors({});
		onClose();
	};

	const submit = async (e) => {
		e.preventDefault();
		if (!item) return;
		setSubmitting(true);
		setFormErrors({});

    router.post(route("poliklinik.update", item.kd_poli), { ...form, _method: 'PUT' }, {
            forceFormData: true,
            onSuccess: () => {
                handleClose();
                addToast && addToast("success", "Berhasil", "Perubahan poliklinik disimpan.");
            },
            onError: (errors) => {
                setFormErrors(errors);
                addToast && addToast("error", "Gagal menyimpan", "Periksa input dan coba lagi.");
            },
            onFinish: () => setSubmitting(false),
        });
	};

	return (
		<AnimatePresence>
			{isOpen && item && (
				<motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 w-full max-w-lg"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                Edit Poliklinik
                            </h3>
                            <button
                                onClick={handleClose}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={submit} className="p-5 space-y-4">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Kode Poliklinik
                                    </label>
                                    <input
                                        disabled
                                        value={item.kd_poli}
                                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                    />
                                </div>
                                <Input
                                    label="Nama Poliklinik"
                                    required
                                    value={form.nm_poli}
                                    onChange={(e) =>
                                        setForm({ ...form, nm_poli: e.target.value })
                                    }
                                    error={formErrors.nm_poli}
                                />
                                <Input
                                    label="Tarif Registrasi"
                                    required
                                    type="number"
                                    value={form.registrasi}
                                    onChange={(e) =>
                                        setForm({ ...form, registrasi: e.target.value })
                                    }
                                    error={formErrors.registrasi}
                                    min="0"
                                    step="1000"
                                />
                                <Input
                                    label="Tarif Registrasi Lama"
                                    required
                                    type="number"
                                    value={form.registrasilama}
                                    onChange={(e) =>
                                        setForm({ ...form, registrasilama: e.target.value })
                                    }
                                    error={formErrors.registrasilama}
                                    min="0"
                                    step="1000"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700"
                                >
                                    Batal
                                </button>
                                <button
                                    disabled={submitting}
                                    className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:opacity-50"
                                >
                                    {submitting ? "Menyimpan..." : "Simpan Perubahan"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function Input({
    label,
    required,
    value,
    onChange,
    error,
    type = "text",
    placeholder,
    maxLength,
    min,
    step,
}) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                maxLength={maxLength}
                min={min}
                step={step}
                className={`w-full px-3 py-2 text-sm rounded-md border ${
                    error
                        ? "border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-700 focus:ring-blue-500/50 focus:border-transparent"
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2`}
            />
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
}
