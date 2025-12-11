import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import SearchableSelect from "@/Components/SearchableSelect";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/Card";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import Label from "@/Components/ui/Label";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/Components/ui/Table";
import Modal from "@/Components/Modal";
import Toaster from "@/Components/ui/Toaster";
import {
  Building2,
  Search,
  Plus,
  Edit2,
  Trash2,
  Copy,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Link2,
  Sparkles,
  X,
  Info,
  Globe,
  Users,
  ArrowRight,
  Check,
  ExternalLink,
} from "lucide-react";

export default function SatuSehatOrganization() {
  const [toasts, setToasts] = useState([]);
  const addToast = (type = "info", title = "", message = "", duration = 4000) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  // Form state (Card 1)
  const [depValue, setDepValue] = useState(null);
  const [depLabel, setDepLabel] = useState("");
  const [orgId, setOrgId] = useState("");
  const [orgName, setOrgName] = useState("");
  const [createIfMissing, setCreateIfMissing] = useState(true);
  const [saving, setSaving] = useState(false);

  // Data state (Card 2)
  const [subunits, setSubunits] = useState([]);
  const [subunitsLoading, setSubunitsLoading] = useState(false);
  const [mappings, setMappings] = useState([]);
  const [mappingsLoading, setMappingsLoading] = useState(false);

  // Update modal state
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateSubunit, setUpdateSubunit] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [updateActive, setUpdateActive] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadSubunits();
    loadMappings();
  }, []);

  async function loadSubunits() {
    setSubunitsLoading(true);
    try {
      const res = await fetch(`/api/satusehat/organization/subunits?limit=200&map=1`, {
        headers: { Accept: "application/json" },
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        addToast("danger", "Gagal memuat subunit", json?.message || `Status: ${res.status}. Periksa konfigurasi SATUSEHAT_ORG_ID.`);
        setSubunits([]);
        return;
      }
      setSubunits(Array.isArray(json.subunits) ? json.subunits : []);
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Tidak dapat memuat subunit SATUSEHAT");
      setSubunits([]);
    } finally {
      setSubunitsLoading(false);
    }
  }

  async function loadMappings() {
    setMappingsLoading(true);
    try {
      const res = await fetch(`/api/satusehat/mapping/departemen?limit=200`, {
        headers: { Accept: "application/json" },
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        addToast("danger", "Gagal memuat mapping", json?.message || `Status: ${res.status}`);
        setMappings([]);
        return;
      }
      setMappings(Array.isArray(json.list) ? json.list : []);
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Tidak dapat memuat mapping departemen");
      setMappings([]);
    } finally {
      setMappingsLoading(false);
    }
  }

  async function handleSave(e) {
    e?.preventDefault?.();
    if (!depValue) {
      addToast("warning", "Departemen belum dipilih", "Silakan pilih departemen terlebih dahulu.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        dep_id: depValue,
        create_if_missing: !!createIfMissing,
      };
      if (orgId.trim() !== "") payload.organization_id = orgId.trim();
      if (orgName.trim() !== "") payload.name = orgName.trim();

      const res = await fetch(`/api/satusehat/mapping/departemen`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        addToast("danger", "Gagal menyimpan mapping", json?.message || `Status: ${res.status}`);
        return;
      }
      addToast(
        "success",
        "Mapping tersimpan",
        json?.id_organisasi_satusehat
          ? `Departemen ${depValue} → Organization/${json.id_organisasi_satusehat}`
          : `Departemen ${depValue} tersimpan.`
      );
      // Reset form ringan
      setDepValue(null);
      setDepLabel("");
      setOrgId("");
      setOrgName("");
      // Refresh data di Card 2
      loadMappings();
      loadSubunits();
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Tidak dapat menyimpan mapping");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(dep_id) {
    if (!dep_id) return;
    const ok = window.confirm(`Hapus mapping untuk departemen ${dep_id}?`);
    if (!ok) return;
    try {
      const res = await fetch(`/api/satusehat/mapping/departemen/${encodeURIComponent(dep_id)}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        addToast("danger", "Gagal menghapus mapping", json?.message || `Status: ${res.status}`);
        return;
      }
      addToast("success", "Mapping dihapus", `Departemen ${dep_id} tidak lagi memiliki mapping.`);
      loadMappings();
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Tidak dapat menghapus mapping");
    }
  }

  const useSubunitId = (id) => {
    if (!id) return;
    setOrgId(id);
    addToast("info", "ID subunit dipilih", `Organization/${id} siap disimpan ke mapping.`);
  };

  // UX: salin ke clipboard untuk kemudahan
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text ?? "");
      addToast("success", "Disalin ke clipboard", text || "(kosong)");
    } catch (e) {
      addToast("warning", "Gagal menyalin", e?.message || "Clipboard tidak tersedia");
    }
  };

  const autofillMapping = (s) => {
    if (!s) return;
    setOrgId(s.id || "");
    if (s.name) setOrgName(s.name);
    addToast("info", "Form terisi otomatis", `Menggunakan Organization/${s.id} (${s.name || s.code || "-"})`);
  };

  const openUpdate = (s) => {
    setUpdateSubunit(s);
    setUpdateName(s?.name || "");
    setUpdateActive(true);
    setShowUpdate(true);
    // sekaligus isi form pemetaan
    autofillMapping(s);
  };

  async function submitUpdate() {
    if (!updateSubunit?.id) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/satusehat/organization/${encodeURIComponent(updateSubunit.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: updateName, active: !!updateActive }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        addToast("danger", "Gagal update Organization", json?.message || `Status: ${res.status}`);
        return;
      }
      addToast("success", "Organization diperbarui", `Nama: ${json?.resource?.name || updateName || "(tidak ada)"}`);
      setShowUpdate(false);
      // refresh subunits agar nama terbaru muncul
      loadSubunits();
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Tidak dapat memperbarui Organization");
    } finally {
      setUpdating(false);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.01,
      y: -4,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <SidebarPengaturan title="Pengaturan">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <motion.div
          className="px-4 sm:px-6 lg:px-8 py-8 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section dengan Glassmorphism */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1 space-y-3">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <motion.h1
                      className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      Pemetaan Organization Subunit
                    </motion.h1>
                    <motion.p
                      className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      Kelola pemetaan Departemen internal ke subunit Organization milik SATUSEHAT untuk interoperabilitas yang rapi.
                    </motion.p>
                  </div>
                </motion.div>
              </div>
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <Button
                  variant="secondary"
                  onClick={() => {
                    loadSubunits();
                    loadMappings();
                  }}
                  className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50"
                >
                  <RefreshCw className={`w-4 h-4 ${subunitsLoading || mappingsLoading ? "animate-spin" : ""}`} />
                  <span className="hidden sm:inline">Reload Semua</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Card 1: Mapping form dengan Glassmorphism */}
          <motion.div variants={itemVariants}>
            <motion.div
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              <CardHeader className="relative bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    SATUSEHAT Organization
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label required className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                      Departemen
                    </Label>
                    <div className="mt-1.5">
                      <SearchableSelect
                        source="departemen"
                        value={depValue}
                        onChange={setDepValue}
                        onSelect={(opt) => setDepLabel(opt?.label || "")}
                        placeholder="Pilih departemen (cari berdasarkan kode/nama)"
                        defaultDisplay={depLabel || undefined}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      Data diambil dari tabel departemen (endpoint: /api/departemen)
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                      ID Subunit SATUSEHAT <span className="text-gray-400 font-normal">(opsional)</span>
                    </Label>
                    <Input
                      placeholder="Contoh: 123e4567-e89b-12d3-a456-426614174000"
                      value={orgId}
                      onChange={(e) => setOrgId(e.target.value)}
                      className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      Biarkan kosong untuk menemukan/atau membuat subunit berdasarkan kode departemen.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-2"
                  >
                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                      Nama Subunit SATUSEHAT <span className="text-gray-400 font-normal">(opsional)</span>
                    </Label>
                    <Input
                      placeholder="Jika membuat otomatis, override nama di sini (default: nama departemen)"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                    />
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 md:col-span-2 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <input
                      id="createIfMissing"
                      type="checkbox"
                      checked={createIfMissing}
                      onChange={(e) => setCreateIfMissing(e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <Label htmlFor="createIfMissing" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      Buat subunit otomatis jika belum ada
                    </Label>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-8 flex items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold px-6 py-2.5"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Menyimpan…
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Simpan Mapping
                      </>
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setDepValue(null);
                      setDepLabel("");
                      setOrgId("");
                      setOrgName("");
                    }}
                    className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Reset
                  </Button>
                </motion.div>
              </CardContent>
            </motion.div>
          </motion.div>

          {/* Card 2: Subunits & current mapping */}
          <motion.div variants={itemVariants}>
            <motion.div
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-indigo-500/5"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              <CardHeader className="relative bg-gradient-to-r from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Subunit SATUSEHAT & Mapping Departemen Saat Ini
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Subunits table */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        Subunit di bawah Organization Induk
                      </h4>
                      <Button
                        variant="secondary"
                        onClick={loadSubunits}
                        disabled={subunitsLoading}
                        size="sm"
                        className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50"
                      >
                        {subunitsLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Memuat…
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-4 h-4" />
                            Reload
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                      <Table className="text-sm">
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                            {["Kode", "Nama", "ID", "Aksi"].map((head, idx) => (
                              <TableHead
                                key={idx}
                                className="font-bold text-gray-700 dark:text-gray-300 py-4 px-4 text-xs uppercase tracking-wider"
                              >
                                {head}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <AnimatePresence>
                            {subunits.map((s, idx) => (
                              <motion.tr
                                key={`${s.id}-${s.code}`}
                                className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 cursor-pointer group"
                                onClick={() => autofillMapping(s)}
                                title="Klik baris untuk mengisi form pemetaan di atas"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: idx * 0.02 }}
                                whileHover={{ scale: 1.01 }}
                              >
                                <TableCell className="py-4 px-4">
                                  <motion.span
                                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800 font-mono text-xs font-bold"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    {s.code || "-"}
                                  </motion.span>
                                </TableCell>
                                <TableCell className="py-4 px-4">
                                  <span className="font-semibold text-gray-900 dark:text-gray-100">{s.name || "-"}</span>
                                </TableCell>
                                <TableCell className="py-4 px-4 font-mono text-gray-700 dark:text-gray-300 text-xs">
                                  <div className="flex items-center gap-2">
                                    <span className="truncate max-w-[120px]">{s.id || "-"}</span>
                                    {s.id && (
                                      <motion.button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          copyToClipboard(s.id);
                                        }}
                                        className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex-shrink-0"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                      </motion.button>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="py-4 px-4">
                                  <div className="flex items-center gap-2">
                                    <motion.button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        useSubunitId(s.id);
                                      }}
                                      className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      title="Pakai ID"
                                    >
                                      <Check className="w-4 h-4" />
                                    </motion.button>
                                    <motion.button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openUpdate(s);
                                      }}
                                      className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      title="Update"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </motion.button>
                                  </div>
                                </TableCell>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                          {subunits.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center text-gray-500 dark:text-gray-400 py-12">
                                {subunitsLoading ? (
                                  <motion.div
                                    className="flex flex-col items-center justify-center gap-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                  >
                                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                                    <span className="text-sm">Memuat data...</span>
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    className="flex flex-col items-center justify-center gap-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                  >
                                    <Globe className="w-12 h-12 text-gray-400" />
                                    <span>Tidak ada data subunit.</span>
                                  </motion.div>
                                )}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    <motion.p
                      className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Info className="w-3 h-3 flex-shrink-0" />
                      <span>
                        Tip: klik "Pakai ID" untuk menggunakan subunit ini pada formulir pemetaan di atas, atau klik "Salin ID" untuk menempelkan secara manual.
                      </span>
                    </motion.p>
                  </motion.div>

                  {/* Mappings table */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        Mapping Departemen ↔ Organization Subunit
                      </h4>
                      <Button
                        variant="secondary"
                        onClick={loadMappings}
                        disabled={mappingsLoading}
                        size="sm"
                        className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50"
                      >
                        {mappingsLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Memuat…
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-4 h-4" />
                            Reload
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                      <Table className="text-sm">
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                            {["Departemen", "Nama", "ID Organization", "Aksi"].map((head, idx) => (
                              <TableHead
                                key={idx}
                                className="font-bold text-gray-700 dark:text-gray-300 py-4 px-4 text-xs uppercase tracking-wider"
                              >
                                {head}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <AnimatePresence>
                            {mappings.map((m, idx) => (
                              <motion.tr
                                key={m.dep_id}
                                className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ delay: idx * 0.02 }}
                              >
                                <TableCell className="py-4 px-4 font-mono">
                                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 ring-1 ring-purple-200 dark:ring-purple-800 font-bold text-xs">
                                    {m.dep_id}
                                  </span>
                                </TableCell>
                                <TableCell className="py-4 px-4">
                                  <span className="font-semibold text-gray-900 dark:text-gray-100">{m.nama || "-"}</span>
                                </TableCell>
                                <TableCell className="py-4 px-4 font-mono text-gray-700 dark:text-gray-300 text-xs">
                                  {m.id_organisasi_satusehat || (
                                    <span className="text-gray-400 italic">Belum ada mapping</span>
                                  )}
                                </TableCell>
                                <TableCell className="py-4 px-4">
                                  {m.id_organisasi_satusehat ? (
                                    <motion.button
                                      onClick={() => handleDelete(m.dep_id)}
                                      className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </motion.button>
                                  ) : (
                                    <span className="text-xs text-gray-500 dark:text-gray-400 italic">Belum ada mapping</span>
                                  )}
                                </TableCell>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                          {mappings.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center text-gray-500 dark:text-gray-400 py-12">
                                {mappingsLoading ? (
                                  <motion.div
                                    className="flex flex-col items-center justify-center gap-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                  >
                                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                                    <span className="text-sm">Memuat data...</span>
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    className="flex flex-col items-center justify-center gap-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                  >
                                    <Link2 className="w-12 h-12 text-gray-400" />
                                    <span>Tidak ada data mapping.</span>
                                  </motion.div>
                                )}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </motion.div>
          </motion.div>

          {/* Modal Update Organization */}
          <AnimatePresence>
            {showUpdate && (
              <Modal show={showUpdate} onClose={() => setShowUpdate(false)} title="Update Organization (SATUSEHAT)" size="md">
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-800/50">
                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Organization ID</Label>
                    <div className="mt-1 font-mono text-sm p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                      {updateSubunit?.id || "-"}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Nama</Label>
                    <Input
                      value={updateName}
                      onChange={(e) => setUpdateName(e.target.value)}
                      placeholder="Nama Organization"
                      className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/50">
                    <input
                      id="updateActive"
                      type="checkbox"
                      checked={updateActive}
                      onChange={(e) => setUpdateActive(e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <Label htmlFor="updateActive" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                      Active
                    </Label>
                  </div>
                  <div className="pt-2 flex items-center gap-3 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      onClick={submitUpdate}
                      disabled={updating}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-300 text-white font-semibold px-6 py-2.5"
                    >
                      {updating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Menyimpan…
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Simpan Perubahan
                        </>
                      )}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setShowUpdate(false)}
                      className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50"
                    >
                      Batal
                    </Button>
                  </div>
                  <motion.p
                    className="text-xs text-gray-500 dark:text-gray-400 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Update menggunakan HTTP PUT ke endpoint FHIR: Organization/:id. Hanya field yang diubah (nama, active) yang akan diterapkan, sisanya mengikuti representasi saat ini.
                  </motion.p>
                </motion.div>
              </Modal>
            )}
          </AnimatePresence>

          <Toaster toasts={toasts} onRemove={removeToast} />
        </motion.div>
      </div>
    </SidebarPengaturan>
  );
}
