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
import { MapPin, Edit2, Trash2, Building2, Navigation, RefreshCw, Loader2, CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function SatuSehatLocationRanap() {
  // Toast state
  const [toasts, setToasts] = useState([]);
  const addToast = (type = "info", title = "", message = "", duration = 4000) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  // Form state
  const [kamarValue, setKamarValue] = useState(null);
  const [kamarLabel, setKamarLabel] = useState("");
  const [orgSubunitId, setOrgSubunitId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [altittude, setAltittude] = useState("");
  const [createIfMissing, setCreateIfMissing] = useState(true);
  const [saving, setSaving] = useState(false);

  // Data list state
  const [mappings, setMappings] = useState([]);
  const [mappingsLoading, setMappingsLoading] = useState(false);

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
      const res = await fetch(`/api/satusehat/mapping/lokasi-ranap?limit=200`, { headers: { Accept: "application/json" } });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        addToast("danger", "Gagal memuat mapping ranap", json?.message || `Status: ${res.status}`);
        setMappings([]);
        return;
      }
      setMappings(Array.isArray(json.list) ? json.list : []);
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Tidak dapat memuat mapping ranap");
      setMappings([]);
    } finally {
      setMappingsLoading(false);
    }
  }

  async function handleSave() {
    if (!kamarValue) {
      addToast("danger", "Validasi", "Pilih kamar terlebih dahulu.");
      return;
    }
    if (!orgSubunitId) {
      addToast("danger", "Validasi", "Isi ID Organization SATUSEHAT dulu.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/satusehat/mapping/lokasi-ranap`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          kd_kamar: String(kamarValue),
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
      addToast("success", "Berhasil", "Mapping ranap tersimpan.");
      setLocationId("");
      await loadMappings();
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Gagal menyimpan mapping");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(kd_kamar) {
    if (!kd_kamar) return;
    if (!confirm(`Hapus mapping untuk kamar ${kd_kamar}?`)) return;
    try {
      const res = await fetch(`/api/satusehat/mapping/lokasi-ranap/${encodeURIComponent(kd_kamar)}`, { method: "DELETE", headers: { Accept: "application/json" } });
      const json = await res.json();
      if (!res.ok || json?.ok === false) {
        addToast("danger", "Gagal hapus", json?.message || json?.error || `Status: ${res.status}`);
        return;
      }
      addToast("success", "Terhapus", `Mapping kamar ${kd_kamar} dihapus`);
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
    // Nama default untuk update bisa diisi manual oleh user; kalau tidak ada nm_kamar di DB, gunakan format Bangsal + kd_kamar
    const defaultName = `${item?.nm_bangsal ? item.nm_bangsal + ' ' : ''}${item?.kd_kamar ?? ''}`.trim();
    setUpdateName(defaultName);
    setUpdateActive(true);
    setShowUpdate(true);
  }

  async function submitUpdate() {
    if (!updateItem) return;
    const kd_kamar = updateItem.kd_kamar;
    if (!updateOrgId || !updateLocId) {
      addToast("danger", "Validasi", "ID Organization dan ID Location wajib diisi.");
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch(`/api/satusehat/mapping/lokasi-ranap/${encodeURIComponent(kd_kamar)}`, {
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
      addToast("success", "Diperbarui", "Location & mapping ranap diperbarui");
      setShowUpdate(false);
      await loadMappings();
    } catch (e) {
      addToast("danger", "Kesalahan jaringan", e?.message || "Gagal memperbarui mapping");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <AppLayout title="SATUSEHAT • Prerequisites • Location (Ranap)">
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 text-sky-600" />
          <h1 className="text-2xl font-bold tracking-tight">Mapping Kamar ↔ SATUSEHAT Location</h1>
        </div>

        <Card className="shadow-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-600" /> Map Kamar ke SATUSEHAT Location
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kamar</Label>
              <SearchableSelect
                placeholder="Pilih kamar"
                source="kamar"
                value={kamarValue}
                onChange={setKamarValue}
                onSelect={(opt) => setKamarLabel(opt?.label || "")}
                defaultDisplay={kamarLabel || undefined}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Organization Subunit (SATUSEHAT Organization ID)</Label>
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
              <Label>ID Location (opsional)</Label>
              <Input value={locationId} onChange={(e) => setLocationId(e.target.value)} placeholder="Contoh: a1b2c3..." />
              <p className="text-xs text-slate-500">Kosongkan untuk mencoba mencari otomatis berdasarkan nama kamar atau membuat baru.</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Longitude</Label>
                <Input value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="106.8" />
              </div>
              <div>
                <Label>Latitude</Label>
                <Input value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="-6.2" />
              </div>
              <div>
                <Label>Altitude</Label>
                <Input value={altittude} onChange={(e) => setAltittude(e.target.value)} placeholder="50" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input id="createIfMissing" type="checkbox" checked={createIfMissing} onChange={(e) => setCreateIfMissing(e.target.checked)} />
              <Label htmlFor="createIfMissing">Buat Location baru bila tidak ditemukan</Label>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button onClick={handleSave} disabled={saving} variant="primary" className="flex items-center gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Simpan Mapping
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-sky-600" /> Daftar Mapping Kamar
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mappingsLoading ? (
              <div className="flex items-center gap-2 text-slate-600"><Loader2 className="w-4 h-4 animate-spin" /> Memuat...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
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
                          <div className="text-center text-slate-500">Belum ada mapping</div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      mappings.map((m) => (
                        <TableRow key={m.kd_kamar}>
                          <TableCell className="font-mono text-xs">{m.kd_kamar}</TableCell>
                          <TableCell>{m.nm_bangsal || "-"}</TableCell>
                          <TableCell className="font-mono text-xs">{m.id_organisasi_satusehat || "-"}</TableCell>
                          <TableCell className="font-mono text-xs">{m.id_lokasi_satusehat || "-"}</TableCell>
                          <TableCell className="text-xs">{m.longitude || "-"}, {m.latitude || "-"}{m.altittude ? ", alt: " + m.altittude : ""}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="secondary" onClick={() => openUpdate(m)} className="flex items-center gap-1"><Edit2 className="w-4 h-4" /> Edit</Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDelete(m.kd_kamar)} className="flex items-center gap-1"><Trash2 className="w-4 h-4" /> Hapus</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <AnimatePresence>
          {showUpdate && (
            <Modal show={showUpdate} onClose={() => setShowUpdate(false)}>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Edit2 className="w-5 h-5 text-sky-600" />
                  <h2 className="text-lg font-semibold">Update Location SATUSEHAT</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Organization ID</Label>
                    <Input value={updateOrgId} onChange={(e) => setUpdateOrgId(e.target.value)} placeholder="Organization/xxxxx" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location ID</Label>
                    <Input value={updateLocId} onChange={(e) => setUpdateLocId(e.target.value)} placeholder="Lokasi ID" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Nama</Label>
                    <Input value={updateName} onChange={(e) => setUpdateName(e.target.value)} placeholder="Nama bangsal di SATUSEHAT" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 md:col-span-2">
                    <div>
                      <Label>Longitude</Label>
                      <Input value={updateLongitude} onChange={(e) => setUpdateLongitude(e.target.value)} />
                    </div>
                    <div>
                      <Label>Latitude</Label>
                      <Input value={updateLatitude} onChange={(e) => setUpdateLatitude(e.target.value)} />
                    </div>
                    <div>
                      <Label>Altitude</Label>
                      <Input value={updateAltittude} onChange={(e) => setUpdateAltittude(e.target.value)} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                    <input id="updateActive" type="checkbox" checked={updateActive} onChange={(e) => setUpdateActive(e.target.checked)} />
                    <Label htmlFor="updateActive">Aktif</Label>
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setShowUpdate(false)} className="flex items-center gap-2"><X className="w-4 h-4" /> Tutup</Button>
                    <Button variant="primary" onClick={submitUpdate} disabled={updating} className="flex items-center gap-2">
                      {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      Simpan Perubahan
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </AnimatePresence>

        <Toaster toasts={toasts} onDismiss={removeToast} />
      </div>
    </AppLayout>
  );
}