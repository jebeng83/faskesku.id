import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/Layouts/AppLayout";
import SearchableSelect from "@/Components/SearchableSelect";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/Card";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import Label from "@/Components/ui/Label";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/Components/ui/Table";
import Modal from "@/Components/Modal";
import Toaster from "@/Components/ui/Toaster";
import { MapPin, Edit2, Trash2, Building2, RefreshCw, Loader2, CheckCircle2, Info, X, Globe } from "lucide-react";

export default function SatuSehatLocationFarmasi() {
  const [toasts, setToasts] = useState([]);
  const addToast = (type = "info", title = "", message = "", duration = 4000) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const [bangsalValue, setBangsalValue] = useState(null);
  const [bangsalLabel, setBangsalLabel] = useState("");
  const [orgSubunitId, setOrgSubunitId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [altittude, setAltittude] = useState("");
  const [createIfMissing, setCreateIfMissing] = useState(true);
  const [saving, setSaving] = useState(false);

  const [mappings, setMappings] = useState([]);
  const [mappingsLoading, setMappingsLoading] = useState(false);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  useEffect(() => {
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
      const res = await fetch(`/api/satusehat/mapping/lokasi-farmasi?limit=200`, { headers: { Accept: "application/json" } });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        addToast("danger", "Gagal memuat mapping farmasi", json?.message || `Status: ${res.status}`);
        setMappings([]);
        return;
      }
      setMappings(Array.isArray(json.list) ? json.list : []);
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Tidak dapat memuat mapping farmasi");
      setMappings([]);
    } finally {
      setMappingsLoading(false);
    }
  }

  async function handleSave() {
    if (!bangsalValue) {
      addToast("danger", "Validasi", "Pilih bangsal terlebih dahulu.");
      return;
    }
    if (!orgSubunitId) {
      addToast("danger", "Validasi", "Isi ID Organization SATUSEHAT dulu.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/satusehat/mapping/lokasi-farmasi`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          kd_bangsal: String(bangsalValue),
          id_organisasi_satusehat: String(orgSubunitId),
          id_lokasi_satusehat: locationId ? String(locationId) : undefined,
          longitude: longitude || undefined,
          latitude: latitude || undefined,
          altittude: altittude || undefined,
          create_if_missing: !!createIfMissing,
        }),
      });
      const json = await res.json();
      if (!res.ok || json?.ok === false) {
        addToast("danger", "Gagal menyimpan", json?.message || json?.error || `Status: ${res.status}`);
        return;
      }
      addToast("success", "Berhasil", "Mapping farmasi tersimpan.");
      setLocationId("");
      await loadMappings();
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Gagal menyimpan mapping");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(kd_bangsal) {
    if (!kd_bangsal) return;
    if (!confirm(`Hapus mapping untuk bangsal ${kd_bangsal}?`)) return;
    try {
      const res = await fetch(`/api/satusehat/mapping/lokasi-farmasi/${encodeURIComponent(kd_bangsal)}`, { method: "DELETE", headers: { Accept: "application/json" } });
      const json = await res.json();
      if (!res.ok || json?.ok === false) {
        addToast("danger", "Gagal hapus", json?.message || json?.error || `Status: ${res.status}`);
        return;
      }
      addToast("success", "Terhapus", `Mapping bangsal ${kd_bangsal} dihapus`);
      await loadMappings();
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Gagal menghapus mapping");
    }
  }

  function openUpdate(item) {
    setUpdateItem(item);
    setUpdateOrgId(item?.id_organisasi_satusehat || "");
    setUpdateLocId(item?.id_lokasi_satusehat || "");
    setUpdateLongitude(item?.longitude || "");
    setUpdateLatitude(item?.latitude || "");
    setUpdateAltittude(item?.altittude || "");
    const defaultName = `${item?.nm_bangsal ? item.nm_bangsal + ' ' : ''}${item?.kd_bangsal ?? ''}`.trim();
    setUpdateName(defaultName);
    setUpdateActive(true);
    setShowUpdate(true);
  }

  async function submitUpdate() {
    if (!updateItem) return;
    const kd_bangsal = updateItem.kd_bangsal;
    if (!updateOrgId || !updateLocId) {
      addToast("danger", "Validasi", "ID Organization dan ID Location wajib diisi.");
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch(`/api/satusehat/mapping/lokasi-farmasi/${encodeURIComponent(kd_bangsal)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          id_organisasi_satusehat: String(updateOrgId),
          id_lokasi_satusehat: String(updateLocId),
          longitude: updateLongitude || undefined,
          latitude: updateLatitude || undefined,
          altittude: updateAltittude || undefined,
          name: updateName || undefined,
          active: !!updateActive,
        }),
      });
      const json = await res.json();
      if (!res.ok || json?.ok === false) {
        addToast("danger", "Gagal memperbarui", json?.message || json?.error || `Status: ${res.status}`);
        return;
      }
      addToast("success", "Diperbarui", "Location & mapping farmasi diperbarui");
      setShowUpdate(false);
      await loadMappings();
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Gagal memperbarui mapping");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <AppLayout title="SATUSEHAT • Prerequisites • Location (Farmasi)">
      <motion.div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <motion.div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <Building2 className="w-6 h-6 text-white" />
              </motion.div>
              <motion.h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Mapping Bangsal ↔ SATUSEHAT Location</motion.h1>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <CardHeader className="relative bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                <motion.div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md" whileHover={{ rotate: 90, scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <MapPin className="w-5 h-5 text-white" />
                </motion.div>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Map Bangsal ke SATUSEHAT Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
              <div className="space-y-2">
                <Label required className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Bangsal</Label>
                <SearchableSelect
                  placeholder="Pilih bangsal"
                  source="bangsal"
                  value={bangsalValue}
                  onChange={setBangsalValue}
                  onSelect={(opt) => setBangsalLabel(opt?.label || "")}
                  defaultDisplay={bangsalLabel || undefined}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label required className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Organization Subunit (SATUSEHAT Organization ID)</Label>
                <SearchableSelect
                  placeholder="Cari subunit organisasi"
                  source="satusehat_org_subunit"
                  value={orgSubunitId}
                  onChange={(val) => setOrgSubunitId(val)}
                  defaultDisplay={orgSubunitId ? `Organization/${orgSubunitId}` : undefined}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">ID Location (opsional)</Label>
                <Input value={locationId} onChange={(e) => setLocationId(e.target.value)} placeholder="Contoh: a1b2c3..." className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Info className="w-3 h-3" /> Kosongkan untuk mencoba mencari otomatis berdasarkan nama bangsal atau membuat baru.</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Longitude</Label>
                  <Input value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="106.8" className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Latitude</Label>
                  <Input value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="-6.2" className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Altitude</Label>
                  <Input value={altittude} onChange={(e) => setAltittude(e.target.value)} placeholder="50" className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input id="createIfMissing" type="checkbox" checked={createIfMissing} onChange={(e) => setCreateIfMissing(e.target.checked)} />
                <Label htmlFor="createIfMissing">Buat Location baru bila tidak ditemukan</Label>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button onClick={handleSave} disabled={saving} variant="primary" className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold px-6 py-2.5">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Simpan Mapping
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <CardHeader className="relative bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                <motion.div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md" whileHover={{ rotate: 90, scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <RefreshCw className="w-5 h-5 text-white" />
                </motion.div>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Daftar Mapping Bangsal</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mappingsLoading ? (
                <motion.div className="flex flex-col items-center justify-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  <span className="text-sm">Memuat data...</span>
                </motion.div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <Table className="text-sm">
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                        <TableHead>Kode</TableHead>
                        <TableHead>Bangsal</TableHead>
                        <TableHead>Org ID</TableHead>
                        <TableHead>Location ID</TableHead>
                        <TableHead>Koordinat</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mappings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <motion.div className="flex flex-col items-center justify-center gap-2 py-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                              <Globe className="w-12 h-12 text-gray-400" />
                              <span>Belum ada data.</span>
                            </motion.div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        <AnimatePresence>
                          {mappings.map((m, idx) => (
                            <motion.tr
                              key={m.kd_bangsal}
                              className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 cursor-pointer group"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ delay: idx * 0.02 }}
                              whileHover={{ scale: 1.01 }}
                            >
                              <TableCell className="font-mono text-xs">{m.kd_bangsal}</TableCell>
                              <TableCell>{m.nm_bangsal || "-"}</TableCell>
                              <TableCell className="font-mono text-xs">{m.id_organisasi_satusehat || "-"}</TableCell>
                              <TableCell className="font-mono text-xs">{m.id_lokasi_satusehat || "-"}</TableCell>
                              <TableCell className="text-xs">{m.longitude || "-"}, {m.latitude || "-"}{m.altittude ? ", alt: " + m.altittude : ""}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button size="sm" variant="secondary" onClick={() => openUpdate(m)} className="flex items-center gap-1">
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                  </Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleDelete(m.kd_bangsal)} className="flex items-center gap-1">
                                    <Trash2 className="w-4 h-4" />
                                    Hapus
                                  </Button>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {showUpdate && (
            <Modal show={showUpdate} onClose={() => setShowUpdate(false)}>
              <motion.div className="p-4 sm:p-6 space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-2">
                  <Edit2 className="w-5 h-5 text-sky-600" />
                  <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Update Location SATUSEHAT</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Organization ID</Label>
                    <Input value={updateOrgId} onChange={(e) => setUpdateOrgId(e.target.value)} placeholder="Organization/xxxxx" className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Location ID</Label>
                    <Input value={updateLocId} onChange={(e) => setUpdateLocId(e.target.value)} placeholder="Lokasi ID" className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Nama</Label>
                    <Input value={updateName} onChange={(e) => setUpdateName(e.target.value)} placeholder="Nama bangsal di SATUSEHAT" className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 md:col-span-2">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Longitude</Label>
                      <Input value={updateLongitude} onChange={(e) => setUpdateLongitude(e.target.value)} className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Latitude</Label>
                      <Input value={updateLatitude} onChange={(e) => setUpdateLatitude(e.target.value)} className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Altitude</Label>
                      <Input value={updateAltittude} onChange={(e) => setUpdateAltittude(e.target.value)} className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                    <input id="updateActive" type="checkbox" checked={updateActive} onChange={(e) => setUpdateActive(e.target.checked)} />
                    <Label htmlFor="updateActive">Aktif</Label>
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setShowUpdate(false)} className="flex items-center gap-2 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700"><X className="w-4 h-4" /> Tutup</Button>
                    <Button variant="primary" onClick={submitUpdate} disabled={updating} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold px-6 py-2.5">
                      {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      Simpan Perubahan
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>

        <Toaster toasts={toasts} onRemove={removeToast} />
      </motion.div>
    </AppLayout>
  );
}