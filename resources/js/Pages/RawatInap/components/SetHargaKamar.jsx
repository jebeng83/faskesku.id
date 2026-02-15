import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, RefreshCw, Search, Building, BadgePercent } from "lucide-react";
import { Head } from "@inertiajs/react";
import LayoutUtama from "@/Pages/LayoutUtama";
import SidebarRawatInapMenu from "@/Components/SidebarRawatInapMenu";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import Label from "@/Components/ui/Label";
import Modal from "@/Components/Modal";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/Components/ui/Table";
import toast from "@/tools/toast";

const variants = {
  container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } },
  item: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
};

export default function SetHargaKamar() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [kdBangsal, setKdBangsal] = useState("all");
  const [kdPj, setKdPj] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [bangsals, setBangsals] = useState([]);
  const [penjabs, setPenjabs] = useState([]);
  const [kamars, setKamars] = useState([]);
  const [createForm, setCreateForm] = useState({ kd_kamar: "", kd_pj: "", tarif: "" });
  const [editForm, setEditForm] = useState({ kd_kamar: "", kd_pj: "", tarif: "" });

  const headers = useMemo(() => ({ Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }), []);
  const currency = useMemo(() => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }), []);

  const fetchBangsals = async () => {
    try {
      const params = { start: 0, limit: 200, status: "1" };
      const res = await axios.get("/api/bangsal", { params, headers, withCredentials: true });
      const list = Array.isArray(res?.data?.list) ? res.data.list : [];
      setBangsals(list);
    } catch (_e) {
      setBangsals([]);
    }
  };

  const fetchPenjabs = async () => {
    try {
      const res = await axios.get("/api/penjab", { headers, withCredentials: true });
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      setPenjabs(list);
    } catch (_e) {
      setPenjabs([]);
    }
  };

  const fetchKamars = async () => {
    try {
      const params = {
        start: 0,
        limit: 500,
        kd_bangsal: kdBangsal !== "all" ? kdBangsal : undefined,
      };
      const res = await axios.get("/api/kamar", { params, headers, withCredentials: true });
      const list = Array.isArray(res?.data?.list) ? res.data.list : Array.isArray(res?.data?.data) ? res.data.data : [];
      setKamars(list);
    } catch (_e) {
      setKamars([]);
    }
  };

  const fetchSetHarga = async () => {
    setLoading(true);
    try {
      const params = {
        start: 0,
        limit: 200,
        q: search || undefined,
        kd_bangsal: kdBangsal !== "all" ? kdBangsal : undefined,
        kd_pj: kdPj !== "all" ? kdPj : undefined,
      };
      const res = await axios.get("/api/set-harga-kamar", { params, headers, withCredentials: true });
      const list = Array.isArray(res?.data?.list) ? res.data.list : [];
      setItems(list);
    } catch (_e) {
      toast.error("Gagal memuat set harga kamar");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    const tarif = Number(String(createForm.tarif).trim());
    if (!createForm.kd_kamar || !createForm.kd_pj) {
      toast.error("Kamar dan penjamin wajib diisi");
      return;
    }
    if (String(createForm.tarif).trim() === "" || !Number.isFinite(tarif) || tarif < 0) {
      toast.error("Tarif harus angka dan ≥ 0");
      return;
    }

    try {
      await axios.post(
        "/api/set-harga-kamar",
        {
          kd_kamar: createForm.kd_kamar,
          kd_pj: createForm.kd_pj,
          tarif,
        },
        { headers, withCredentials: true }
      );
      setCreateOpen(false);
      setCreateForm({ kd_kamar: "", kd_pj: "", tarif: "" });
      toast.success("Set harga kamar tersimpan");
      fetchSetHarga();
    } catch (e) {
      const errors = e?.response?.data?.errors;
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        const firstMsg = Array.isArray(errors[firstKey]) ? errors[firstKey][0] : String(errors[firstKey]);
        toast.error(firstMsg || "Gagal menyimpan set harga kamar");
      } else {
        const msg = e?.response?.data?.message || "Gagal menyimpan set harga kamar";
        toast.error(msg);
      }
    }
  };

  const openEdit = (item) => {
    setEditForm({
      kd_kamar: item.kd_kamar || "",
      kd_pj: item.kd_pj || "",
      tarif: item.tarif ?? "",
    });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    const tarif = Number(String(editForm.tarif).trim());
    if (String(editForm.tarif).trim() === "" || !Number.isFinite(tarif) || tarif < 0) {
      toast.error("Tarif harus angka dan ≥ 0");
      return;
    }

    try {
      const kdKamar = encodeURIComponent(editForm.kd_kamar);
      const kdPjEnc = encodeURIComponent(editForm.kd_pj);
      await axios.put(`/api/set-harga-kamar/${kdKamar}/${kdPjEnc}`, { tarif }, { headers, withCredentials: true });
      setEditOpen(false);
      toast.success("Set harga kamar berhasil diperbarui");
      fetchSetHarga();
    } catch (e) {
      const errors = e?.response?.data?.errors;
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        const firstMsg = Array.isArray(errors[firstKey]) ? errors[firstKey][0] : String(errors[firstKey]);
        toast.error(firstMsg || "Gagal memperbarui set harga kamar");
      } else {
        const msg = e?.response?.data?.message || "Gagal memperbarui set harga kamar";
        toast.error(msg);
      }
    }
  };

  const handleDelete = async (item) => {
    try {
      const kdKamar = encodeURIComponent(item.kd_kamar);
      const kdPjEnc = encodeURIComponent(item.kd_pj);
      await axios.delete(`/api/set-harga-kamar/${kdKamar}/${kdPjEnc}`, { headers, withCredentials: true });
      toast.success("Set harga kamar berhasil dihapus");
      fetchSetHarga();
    } catch (e) {
      const msg = e?.response?.data?.message || "Gagal menghapus set harga kamar";
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchBangsals();
    fetchPenjabs();
    fetchKamars();
    fetchSetHarga();
  }, []);

  useEffect(() => {
    fetchKamars();
  }, [kdBangsal]);

  return (
    <LayoutUtama title="Set Harga Kamar" left={<SidebarRawatInapMenu title="Rawat Inap" />}>
      <Head title="Set Harga Kamar" />
      <div className="space-y-4">
        <motion.div
          variants={variants.item}
          className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <motion.h1
                className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Set Harga Kamar
              </motion.h1>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setCreateOpen(true)} className="flex items-center gap-1">
                <Plus className="w-4 h-4" /> Tambah
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5" variants={variants.container} initial="hidden" animate="visible">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="relative w-full">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari kamar, bangsal, penjamin"
                  className="pl-9 h-10 text-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm placeholder:text-gray-400"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative w-full">
                <select
                  value={kdBangsal}
                  onChange={(e) => setKdBangsal(e.target.value)}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="all">Semua Bangsal</option>
                  {bangsals.map((b) => (
                    <option key={b.kd_bangsal} value={b.kd_bangsal}>
                      {b.nm_bangsal}
                    </option>
                  ))}
                </select>
                <Building className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative w-full">
                <select
                  value={kdPj}
                  onChange={(e) => setKdPj(e.target.value)}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="all">Semua Penjamin</option>
                  {penjabs.map((p) => (
                    <option key={p.kd_pj} value={p.kd_pj}>
                      {p.png_jawab}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Button onClick={fetchSetHarga} variant="outline" className="flex items-center gap-1">
                <RefreshCw className="w-4 h-4" /> Muat Ulang
              </Button>
            </div>
          </div>

          <div className="relative p-4 md:p-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode Kamar</TableHead>
                  <TableHead>Bangsal</TableHead>
                  <TableHead>Penjamin</TableHead>
                  <TableHead>Tarif</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-10 text-center text-gray-500">
                        Memuat...
                      </TableCell>
                    </TableRow>
                  ) : items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-12">
                        <div className="text-center">
                          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-3">
                            <Search className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div className="text-gray-700 dark:text-gray-300 font-medium">Tidak ada data set harga kamar</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Coba ubah filter atau tambah data baru</div>
                          <div className="mt-4">
                            <Button onClick={() => setCreateOpen(true)} className="flex items-center gap-1">
                              <Plus className="w-4 h-4" /> Tambah
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((it) => (
                      <motion.tr key={`${it.kd_kamar}__${it.kd_pj}`} variants={variants.item} className="border-b">
                        <TableCell className="font-mono">{it.kd_kamar}</TableCell>
                        <TableCell>{it.nm_bangsal || it.kd_bangsal || <span className="text-gray-400">-</span>}</TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-900 dark:text-white">{it.nm_penjamin || <span className="text-gray-400">-</span>}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">{it.kd_pj}</div>
                        </TableCell>
                        <TableCell>
                          {typeof it.tarif === "number" ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700">
                              <BadgePercent className="w-4 h-4" /> {currency.format(it.tarif)}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="outline" onClick={() => openEdit(it)} className="px-2 py-1">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(it)} className="px-2 py-1">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </motion.div>

        <Modal
          show={createOpen}
          onClose={() => setCreateOpen(false)}
          title="Tambah Set Harga Kamar"
          size="md"
          zIndex={10050}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
          headerClassName="bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50"
          titleClassName="font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
          showTopGradient
          backdropClassName="bg-black/30 backdrop-blur-sm"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>Kamar</Label>
                <select
                  value={createForm.kd_kamar}
                  onChange={(e) => setCreateForm((s) => ({ ...s, kd_kamar: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="">Pilih kamar</option>
                  {kamars.map((k) => (
                    <option key={k.kd_kamar} value={k.kd_kamar}>
                      {k.kd_kamar}{k.nm_bangsal ? ` - ${k.nm_bangsal}` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Penjamin</Label>
                <select
                  value={createForm.kd_pj}
                  onChange={(e) => setCreateForm((s) => ({ ...s, kd_pj: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="">Pilih penjamin</option>
                  {penjabs.map((p) => (
                    <option key={p.kd_pj} value={p.kd_pj}>
                      {p.png_jawab}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Tarif</Label>
                <Input
                  type="number"
                  value={createForm.tarif}
                  onChange={(e) => setCreateForm((s) => ({ ...s, tarif: e.target.value }))}
                  placeholder="0"
                  className="h-10 text-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleCreate}>Simpan</Button>
            </div>
          </div>
        </Modal>

        <Modal
          show={editOpen}
          onClose={() => setEditOpen(false)}
          title="Ubah Tarif Set Harga Kamar"
          size="md"
          zIndex={10050}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
          headerClassName="bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50"
          titleClassName="font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
          showTopGradient
          backdropClassName="bg-black/30 backdrop-blur-sm"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Kode Kamar</Label>
                <Input value={editForm.kd_kamar} disabled className="h-10 text-sm bg-gray-50 dark:bg-gray-800/90 ring-1 ring-gray-300/70 dark:ring-gray-600/60" />
              </div>
              <div>
                <Label>Penjamin</Label>
                <Input value={editForm.kd_pj} disabled className="h-10 text-sm bg-gray-50 dark:bg-gray-800/90 ring-1 ring-gray-300/70 dark:ring-gray-600/60" />
              </div>
              <div className="md:col-span-2">
                <Label>Tarif</Label>
                <Input
                  type="number"
                  value={editForm.tarif}
                  onChange={(e) => setEditForm((s) => ({ ...s, tarif: e.target.value }))}
                  className="h-10 text-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleUpdate}>Simpan</Button>
            </div>
          </div>
        </Modal>
      </div>
    </LayoutUtama>
  );
}

