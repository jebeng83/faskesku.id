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
  MapPin,
  Search,
  Plus,
  Edit2,
  Trash2,
  Copy,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  Navigation,
  Link2,
  Globe,
  Sparkles,
  X,
  Info,
} from "lucide-react";

export default function SatuSehatLocation() {
  // Toasts
  const [toasts, setToasts] = useState([]);
  const addToast = (type = "info", title = "", message = "", duration = 4000) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  // Form state (Card 1)
  const [poliValue, setPoliValue] = useState(null);
  const [poliLabel, setPoliLabel] = useState("");
  const [orgSubunitId, setOrgSubunitId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [altittude, setAltittude] = useState("");
  const [createIfMissing, setCreateIfMissing] = useState(true);
  const [saving, setSaving] = useState(false);

  // Data state (Card 2)
  const [mappings, setMappings] = useState([]);
  const [mappingsLoading, setMappingsLoading] = useState(false);

  // Location search (GET /api/satusehat/location)
  const [locName, setLocName] = useState("");
  const [locIdentifier, setLocIdentifier] = useState("");
  const [locOrganization, setLocOrganization] = useState("");
  const [locUseCoords, setLocUseCoords] = useState(true);
  const [locLoading, setLocLoading] = useState(false);
  const [locResult, setLocResult] = useState({ total: 0, list: [], bundle: null });
  const [locError, setLocError] = useState("");
  const [showSearchDetails, setShowSearchDetails] = useState(false);

  // Update modal
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [updateActive, setUpdateActive] = useState(true);
  const [updateLongitude, setUpdateLongitude] = useState("");
  const [updateLatitude, setUpdateLatitude] = useState("");
  const [updateAltittude, setUpdateAltittude] = useState("");
  const [updateOrgId, setUpdateOrgId] = useState("");
  const [updateLocId, setUpdateLocId] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Ambil koordinat default dari .env
    (async () => {
      try {
        const res = await fetch(`/api/satusehat/config/coordinates`, { headers: { Accept: "application/json" } });
        const json = await res.json();
        if (json?.ok) {
          setLongitude(json.longitude || "");
          setLatitude(json.latitude || "");
          setAltittude(json.altitude || "");
        }
      } catch (_) {}
    })();
    loadMappings();
  }, []);

  async function loadMappings() {
    setMappingsLoading(true);
    try {
      const res = await fetch(`/api/satusehat/mapping/lokasi?limit=200`, { headers: { Accept: "application/json" } });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        addToast("danger", "Gagal memuat mapping lokasi", json?.message || `Status: ${res.status}`);
        setMappings([]);
        return;
      }
      setMappings(Array.isArray(json.list) ? json.list : []);
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Tidak dapat memuat mapping lokasi");
      setMappings([]);
    } finally {
      setMappingsLoading(false);
    }
  }

  async function searchLocations() {
    setLocLoading(true);
    setLocError("");
    try {
      const params = new URLSearchParams();
      
      // Parameter sesuai dokumentasi SATUSEHAT: identifier, name, organization
      const qName = (locName || "").trim();
      const qIdentifier = (locIdentifier || "").trim();
      const qOrganization = (locOrganization || "").trim();
      
      if (qName) {
        params.set("name", qName);
      }
      if (qIdentifier) {
        params.set("identifier", qIdentifier);
      }
      if (qOrganization) {
        params.set("organization", qOrganization);
      }

      // Koordinat (opsional)
      if (locUseCoords && latitude && longitude) {
        params.set("lat", String(latitude));
        params.set("lon", String(longitude));
        params.set("radius", "5");
      }

      // Validasi: minimal satu parameter harus diisi
      if (!qName && !qIdentifier && !qOrganization && (!locUseCoords || !latitude || !longitude)) {
        setLocError("Minimal salah satu parameter pencarian (name, identifier, organization, atau koordinat) harus diisi.");
        setLocLoading(false);
        return;
      }

      const res = await fetch(`/api/satusehat/location?${params.toString()}`, { headers: { Accept: "application/json" } });
      const json = await res.json();
      if (!res.ok || json?.ok === false) {
        setLocError(json?.message || json?.error || `Gagal memuat hasil Location (status: ${res.status})`);
        setLocResult({ total: 0, list: [], bundle: null });
        return;
      }
      setLocResult({ 
        total: json?.total ?? 0, 
        list: Array.isArray(json?.list) ? json.list : [], 
        bundle: json?.bundle ?? null,
        query: json?.query ?? {}
      });
      setLocError(""); // Clear error jika berhasil
    } catch (e) {
      setLocError(e?.message || "Kesalahan jaringan saat memuat Location");
      setLocResult({ total: 0, list: [], bundle: null });
    } finally {
      setLocLoading(false);
    }
  }

  async function handleSave(e) {
    e?.preventDefault?.();
    if (!poliValue) {
      addToast("warning", "Poliklinik belum dipilih", "Silakan pilih poliklinik terlebih dahulu.");
      return;
    }
    if (!orgSubunitId) {
      addToast("warning", "Subunit Organization belum dipilih", "Silakan pilih subunit Organization.");
      return;
    }

    // Validasi koordinat jika diisi - harus berupa angka yang valid
    if (longitude && isNaN(parseFloat(longitude))) {
      addToast("warning", "Longitude tidak valid", "Longitude harus berupa angka.");
      return;
    }
    if (latitude && isNaN(parseFloat(latitude))) {
      addToast("warning", "Latitude tidak valid", "Latitude harus berupa angka.");
      return;
    }
    if (altittude && isNaN(parseFloat(altittude))) {
      addToast("warning", "Altitude tidak valid", "Altitude harus berupa angka.");
      return;
    }

    setSaving(true);
    try {
      // Pastikan koordinat dikirim sebagai string (akan dikonversi ke float di backend)
      // Backend akan mengkonversi ke float sebelum dikirim ke SATUSEHAT
      const payload = {
        kd_poli: poliValue,
        id_organisasi_satusehat: orgSubunitId,
        longitude: longitude.trim() || undefined,
        latitude: latitude.trim() || undefined,
        altittude: altittude.trim() || undefined,
        create_if_missing: !!createIfMissing,
      };
      if (locationId.trim() !== "") payload.id_lokasi_satusehat = locationId.trim();

      const res = await fetch(`/api/satusehat/mapping/lokasi`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        // Parse error detail dari OperationOutcome jika ada
        let errorMsg = json?.message || json?.error || `Status: ${res.status}`;
        
        // Parse details dari OperationOutcome format
        if (json?.details && Array.isArray(json.details)) {
          const details = json.details
            .map((d) => {
              const expr = Array.isArray(d?.expression) ? d.expression[0] : d?.expression || "";
              const diag = d?.diagnostics || "";
              return expr ? `${expr}: ${diag}` : diag;
            })
            .filter(Boolean);
          if (details.length > 0) {
            errorMsg += ". " + details.join("; ");
          }
        }
        
        addToast("danger", "Gagal menyimpan mapping lokasi", errorMsg);
        return;
      }
      addToast("success", "Mapping lokasi tersimpan", json?.id_lokasi_satusehat ? `Poli ${poliValue} → Location/${json.id_lokasi_satusehat}` : `Poli ${poliValue} tersimpan.`);
      // Reset ringan
      setPoliValue(null);
      setPoliLabel("");
      setOrgSubunitId("");
      setLocationId("");
      // Koordinat tetap
      loadMappings();
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Tidak dapat menyimpan mapping lokasi");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(kd_poli) {
    if (!kd_poli) return;
    const ok = window.confirm(`Hapus mapping lokasi untuk poli ${kd_poli}?`);
    if (!ok) return;
    try {
      const res = await fetch(`/api/satusehat/mapping/lokasi/${encodeURIComponent(kd_poli)}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        addToast("danger", "Gagal menghapus mapping", json?.message || `Status: ${res.status}`);
        return;
      }
      addToast("success", "Mapping dihapus", `Poli ${kd_poli} tidak lagi memiliki mapping lokasi.`);
      loadMappings();
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Tidak dapat menghapus mapping lokasi");
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text ?? "");
      addToast("success", "Disalin ke clipboard", text || "(kosong)");
    } catch (e) {
      addToast("warning", "Gagal menyalin", e?.message || "Clipboard tidak tersedia");
    }
  };

  const autofillOrg = (opt) => {
    if (!opt) return;
    setOrgSubunitId(opt.value || "");
    addToast("info", "Subunit dipilih", `Organization/${opt.value} siap disimpan.`);
  };

  const openUpdate = (item) => {
    setUpdateItem(item);
    setUpdateName("");
    setUpdateActive(true);
    setUpdateLongitude(item?.longitude || "");
    setUpdateLatitude(item?.latitude || "");
    setUpdateAltittude(item?.altittude || "");
    setUpdateOrgId(item?.id_organisasi_satusehat || "");
    setUpdateLocId(item?.id_lokasi_satusehat || "");
    setShowUpdate(true);
  };

  async function submitUpdate() {
    if (!updateItem?.kd_poli) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/satusehat/mapping/lokasi/${encodeURIComponent(updateItem.kd_poli)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          id_organisasi_satusehat: updateOrgId,
          id_lokasi_satusehat: updateLocId,
          longitude: updateLongitude,
          latitude: updateLatitude,
          altittude: updateAltittude,
          name: updateName,
          active: !!updateActive,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        addToast("danger", "Gagal memperbarui lokasi", json?.message || `Status: ${res.status}`);
        return;
      }
      addToast("success", "Lokasi & mapping diperbarui", json?.resource?.name ? `Nama: ${json.resource.name}` : "Berhasil");
      setShowUpdate(false);
      loadMappings();
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Tidak dapat memperbarui lokasi");
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
                    <Link2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <motion.h1
                      className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      Pemetaan Poliklinik ↔ SATUSEHAT Location
                    </motion.h1>
                    <motion.p
                      className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      Kelola pemetaan poliklinik internal ke resource Location milik SATUSEHAT, termasuk koordinat dan organisasi pengelola.
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
                    loadMappings();
                  }}
                  className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50"
                >
                  <RefreshCw className={`w-4 h-4 ${mappingsLoading ? "animate-spin" : ""}`} />
                  <span className="hidden sm:inline">Reload</span>
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
                    Pemetaan Poliklinik → SATUSEHAT Location
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
                  {[
                    {
                      label: "Poliklinik",
                      required: true,
                      component: (
                        <SearchableSelect
                          source="poliklinik"
                          value={poliValue}
                          onChange={setPoliValue}
                          onSelect={(opt) => setPoliLabel(opt?.label || "")}
                          placeholder="Pilih poliklinik (cari berdasarkan kode/nama)"
                          defaultDisplay={poliLabel || undefined}
                        />
                      ),
                      hint: "Data diambil dari endpoint lokal: /api/poliklinik",
                      delay: 0.3,
                    },
                    {
                      label: "Subunit Organization",
                      required: true,
                      component: (
                        <SearchableSelect
                          source="satusehat_org_subunit"
                          value={orgSubunitId}
                          onChange={setOrgSubunitId}
                          onSelect={autofillOrg}
                          placeholder="Pilih subunit organisasi (muat dari SATUSEHAT)"
                          defaultDisplay={orgSubunitId ? `Organization/${orgSubunitId}` : undefined}
                        />
                      ),
                      hint: "Subunit dimuat dari SATUSEHAT berdasarkan Organization induk pada .env",
                      delay: 0.35,
                    },
                  ].map((field, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: field.delay }}
                    >
                      <Label required={field.required} className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                        {field.label}
                      </Label>
                      <div className="mt-1.5">{field.component}</div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        {field.hint}
                      </p>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-2"
                  >
                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                      ID SATUSEHAT Location <span className="text-gray-400 font-normal">(opsional)</span>
                    </Label>
                    <Input
                      placeholder="Jika sudah ada, isi di sini. Jika kosong, akan dicari/dibuat otomatis"
                      value={locationId}
                      onChange={(e) => setLocationId(e.target.value)}
                      className="w-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                    />
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-3 gap-4 md:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    {[
                      { icon: Navigation, label: "Longitude", value: longitude, setValue: setLongitude },
                      { icon: Navigation, label: "Latitude", value: latitude, setValue: setLatitude, rotate: true },
                      { icon: MapPin, label: "Altitude", value: altittude, setValue: setAltittude },
                    ].map((coord, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.45 + idx * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                          <coord.icon className={`w-4 h-4 ${coord.rotate ? "rotate-90" : ""}`} />
                          {coord.label}
                        </Label>
                        <Input
                          type="number"
                          step="any"
                          value={coord.value}
                          onChange={(e) => coord.setValue(e.target.value)}
                          placeholder={coord.label === "Longitude" ? "cth: 111.058279" : coord.label === "Latitude" ? "cth: -7.535561" : "cth: 500"}
                          className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                        />
                      </motion.div>
                    ))}
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
                      Buat Location otomatis jika belum ada
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
                      setPoliValue(null);
                      setPoliLabel("");
                      setOrgSubunitId("");
                      setLocationId("");
                    }}
                    className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Reset
                  </Button>
                </motion.div>
              </CardContent>
            </motion.div>
          </motion.div>

          {/* Card 2: Mappings list */}
          <motion.div variants={itemVariants}>
            <motion.div
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-indigo-500/5"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              <CardHeader className="relative bg-gradient-to-r from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                    <motion.div
                      className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Building2 className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Mapping Lokasi Saat Ini
                    </span>
                  </CardTitle>
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
              </CardHeader>
              <CardContent className="p-8">
                {/* Hasil GET Location (SATUSEHAT) */}
                <motion.div
                  className="mb-8 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-gray-50/80 via-blue-50/50 to-indigo-50/50 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-base font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-1">
                        <div className="p-1.5 rounded-lg bg-blue-500/10">
                          <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        Uji Coba GET Location (SATUSEHAT)
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 ml-8">
                        Sesuai dokumentasi: GET /fhir-r4/v1/Location dengan parameter identifier, name, organization
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setShowSearchDetails(!showSearchDetails)}
                        className="flex items-center gap-2 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 shadow-md hover:shadow-lg transition-all"
                      >
                        <Info className="w-4 h-4" />
                        {showSearchDetails ? "Sembunyikan" : "Detail"}
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={searchLocations}
                        disabled={locLoading}
                        className="flex items-center gap-2 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 shadow-md hover:shadow-lg transition-all"
                      >
                        {locLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Mencari…
                          </>
                        ) : (
                          <>
                            <Search className="w-4 h-4" />
                            Cari
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Parameter pencarian sesuai dokumentasi SATUSEHAT */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                        Name <span className="text-gray-400 font-normal">(opsional)</span>
                      </Label>
                      <Input
                        value={locName}
                        onChange={(e) => setLocName(e.target.value)}
                        placeholder="cth: Poliklinik, IGD, Rawat Jalan"
                        className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                        onKeyDown={(e) => e.key === "Enter" && searchLocations()}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                        Identifier <span className="text-gray-400 font-normal">(opsional)</span>
                      </Label>
                      <Input
                        value={locIdentifier}
                        onChange={(e) => setLocIdentifier(e.target.value)}
                        placeholder="Format: system|value atau value saja"
                        className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                        onKeyDown={(e) => e.key === "Enter" && searchLocations()}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                        Organization <span className="text-gray-400 font-normal">(opsional)</span>
                      </Label>
                      <Input
                        value={locOrganization}
                        onChange={(e) => setLocOrganization(e.target.value)}
                        placeholder="ID Organization atau Organization/ID"
                        className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                        onKeyDown={(e) => e.key === "Enter" && searchLocations()}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-6 md:mt-0">
                      <input
                        id="locUseCoords"
                        type="checkbox"
                        checked={locUseCoords}
                        onChange={(e) => setLocUseCoords(e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <Label htmlFor="locUseCoords" className="text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                        Gunakan Koordinat ({longitude || "?"}, {latitude || "?"})
                      </Label>
                    </div>
                  </div>

                  {/* Detail query dan response */}
                  {showSearchDetails && (
                    <motion.div
                      className="mb-4 p-4 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/50"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Detail Query & Response:</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 font-mono">
                        <div>
                          <span className="font-semibold">Endpoint:</span> GET /fhir-r4/v1/Location
                        </div>
                        {locResult.query && Object.keys(locResult.query).length > 0 && (
                          <div>
                            <span className="font-semibold">Query Parameters:</span> {JSON.stringify(locResult.query, null, 2)}
                          </div>
                        )}
                        {locResult.bundle && (
                          <div className="mt-2">
                            <span className="font-semibold">Bundle Type:</span> {locResult.bundle.resourceType || "N/A"}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                  {locError && (
                    <motion.div
                      className="mb-4 p-4 rounded-lg bg-red-50/80 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50 flex items-center gap-2 text-sm text-red-700 dark:text-red-400 backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {locError}
                    </motion.div>
                  )}
                  <div className="mt-4">
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <span>Total hasil:</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">{locResult.total}</span>
                      {locResult.list && locResult.list.length > 0 && (
                        <span className="text-xs text-gray-500">
                          (Menampilkan {Math.min(locResult.list.length, 10)} dari {locResult.total})
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <AnimatePresence>
                        {(locResult.list || []).slice(0, 10).map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="group rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 hover:shadow-lg hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300 cursor-pointer"
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            onClick={() => {
                              if (item?.id) {
                                copyToClipboard(item.id);
                                addToast("info", "Location ID disalin", `ID: ${item.id}`);
                              }
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {item?.name || item?.id || "(tanpa nama)"}
                              </div>
                              {item?.id && (
                                <motion.span
                                  className="px-2.5 py-1 text-[10px] rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-200 dark:ring-indigo-800 font-mono font-medium"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  {item.id.substring(0, 8)}...
                                </motion.span>
                              )}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                              {item?.status && (
                                <div className="flex items-center gap-1">
                                  <span className="font-semibold">Status:</span>
                                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                                    item.status === "active" 
                                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" 
                                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                  }`}>
                                    {item.status}
                                  </span>
                                </div>
                              )}
                              {item?.managingOrganization && (
                                <div className="flex items-center gap-1 truncate">
                                  <span className="font-semibold">Org:</span>
                                  <span className="truncate">{item.managingOrganization}</span>
                                </div>
                              )}
                              {item?.address && (
                                <div className="truncate">{item.address}</div>
                              )}
                              {item?.position && (
                                <div className="text-[10px] text-gray-500">
                                  Pos: {item.position.longitude || "?"}, {item.position.latitude || "?"}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {(!locResult.list || locResult.list.length === 0) && !locLoading && (
                        <motion.div
                          className="rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 text-xs text-gray-500 dark:text-gray-400 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Tidak ada hasil ditampilkan. Coba parameter pencarian lain.
                        </motion.div>
                      )}
                    </div>
                    {locResult.list && locResult.list.length > 10 && (
                      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                        Menampilkan 10 hasil pertama. Total: {locResult.total} hasil.
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Table dengan design modern */}
                <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <Table className="text-sm">
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                        {["Kode Poli", "Nama Poli", "Organization", "Location", "Koordinat", "Aksi"].map((head, idx) => (
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
                            key={`${m.kd_poli}`}
                            className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 group"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: idx * 0.02 }}
                          >
                            <TableCell className="py-4 px-4">
                              <motion.span
                                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800 font-mono text-xs font-bold"
                                whileHover={{ scale: 1.05 }}
                              >
                                {m.kd_poli}
                              </motion.span>
                            </TableCell>
                            <TableCell className="py-4 px-4">
                              <span className="font-semibold text-gray-900 dark:text-gray-100">{m.nm_poli || "-"}</span>
                            </TableCell>
                            <TableCell className="py-4 px-4 font-mono text-gray-700 dark:text-gray-300 text-xs">
                              {m.id_organisasi_satusehat || "-"}
                            </TableCell>
                            <TableCell className="py-4 px-4 font-mono text-gray-700 dark:text-gray-300">
                              <div className="flex items-center gap-2">
                                <span className="text-xs">{m.id_lokasi_satusehat || "-"}</span>
                                {m.id_lokasi_satusehat && (
                                  <motion.button
                                    onClick={() => copyToClipboard(m.id_lokasi_satusehat)}
                                    className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                  </motion.button>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="py-4 px-4">
                              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                <div className="flex items-center gap-1">
                                  <Navigation className="w-3 h-3" />
                                  {m.longitude || "-"}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Navigation className="w-3 h-3 rotate-90" />
                                  {m.latitude || "-"}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {m.altittude || "-"}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <motion.button
                                  onClick={() => openUpdate(m)}
                                  className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Edit2 className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  onClick={() => handleDelete(m.kd_poli)}
                                  className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                      {mappings.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-gray-500 dark:text-gray-400 py-12">
                            {mappingsLoading ? (
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
                                <span>Tidak ada data mapping lokasi.</span>
                              </motion.div>
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </motion.div>
          </motion.div>

          {/* Update Modal dengan design modern */}
          <AnimatePresence>
            {showUpdate && (
              <Modal title="Perbarui SATUSEHAT Location" show={showUpdate} maxWidth="lg" onClose={() => setShowUpdate(false)}>
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                        Organization Subunit
                      </Label>
                      <SearchableSelect
                        source="satusehat_org_subunit"
                        value={updateOrgId}
                        onChange={setUpdateOrgId}
                        placeholder="Pilih subunit organisasi"
                        defaultDisplay={updateOrgId ? `Organization/${updateOrgId}` : undefined}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">ID Location</Label>
                      <Input value={updateLocId} onChange={(e) => setUpdateLocId(e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                        Nama <span className="text-gray-400 font-normal">(opsional)</span>
                      </Label>
                      <Input value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
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
                        Aktif
                      </Label>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Longitude", value: updateLongitude, setValue: setUpdateLongitude, placeholder: "cth: 111.058279" },
                      { label: "Latitude", value: updateLatitude, setValue: setUpdateLatitude, placeholder: "cth: -7.535561" },
                      { label: "Altitude", value: updateAltittude, setValue: setUpdateAltittude, placeholder: "cth: 500" },
                    ].map((coord, idx) => (
                      <div key={idx}>
                        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">{coord.label}</Label>
                        <Input
                          type="number"
                          step="any"
                          value={coord.value}
                          onChange={(e) => coord.setValue(e.target.value)}
                          placeholder={coord.placeholder}
                          className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
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
                </motion.div>
              </Modal>
            )}
          </AnimatePresence>

          {/* Toaster */}
          <Toaster toasts={toasts} onRemove={removeToast} />
        </motion.div>
      </div>
    </SidebarPengaturan>
  );
}