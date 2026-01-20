import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, RefreshCw, Search, Building, BadgePercent } from "lucide-react";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import Label from "@/Components/ui/Label";
import Modal from "@/Components/Modal";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/Components/ui/Table";
import toast from "@/tools/toast";
import { Head } from "@inertiajs/react";
import SidebarRawatInap from "@/Layouts/SidebarRawatInap";

const variants = {
  container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } },
  item: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
};

const kelasOptions = ["1", "2", "3", "VIP", "Utama"];

export default function Kamar() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [kdBangsal, setKdBangsal] = useState("all");
  const [status, setStatus] = useState("all");
  const [kelas, setKelas] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [bangsals, setBangsals] = useState([]);
  const [createForm, setCreateForm] = useState({ kd_kamar: "", kd_bangsal: "", trf_kamar: "", status: "KOSONG", kelas: "", statusdata: "1" });
  const [editForm, setEditForm] = useState({ kd_kamar: "", kd_bangsal: "", trf_kamar: "", status: "KOSONG", kelas: "", statusdata: "1" });

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

  const fetchKamar = async () => {
    setLoading(true);
    try {
      const params = {
        start: 0,
        limit: 100,
        q: search || undefined,
        kd_bangsal: kdBangsal !== "all" ? kdBangsal : undefined,
        status: status !== "all" ? status : undefined,
        kelas: kelas !== "all" ? kelas : undefined,
      };
      const res = await axios.get("/api/kamar", { params, headers, withCredentials: true });
      const list = Array.isArray(res?.data?.list) ? res.data.list : Array.isArray(res?.data?.data) ? res.data.data : [];
      setItems(list);
    } catch (_e) {
      try {
        const params = { start: 0, limit: 100, q: search || undefined, kd_bangsal: kdBangsal !== "all" ? kdBangsal : undefined };
        const res2 = await axios.get("/api/satusehat/ranap/kamar", { params, headers, withCredentials: true });
        const list2 = Array.isArray(res2?.data?.list) ? res2.data.list : [];
        const mapped = list2.map((x) => ({ kd_kamar: x.kd_kamar, kd_bangsal: x.kd_bangsal, nm_bangsal: x.nm_bangsal, trf_kamar: null, status: null, kelas: null, statusdata: null }));
        setItems(mapped);
      } catch (__e) {
        toast.error("Gagal memuat data kamar");
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!createForm.kd_kamar || !createForm.kd_bangsal || createForm.trf_kamar === "") {
      toast.error("Kode kamar, bangsal, dan tarif wajib diisi");
      return;
    }
    try {
      const payload = {
        kd_kamar: createForm.kd_kamar,
        kd_bangsal: createForm.kd_bangsal,
        trf_kamar: parseFloat(String(createForm.trf_kamar).replace(/,/g, "")) || 0,
        status: createForm.status,
        kelas: createForm.kelas || undefined,
        statusdata: createForm.statusdata || undefined,
      };
      await axios.post("/api/kamar", payload, { headers, withCredentials: true });
      setCreateOpen(false);
      setCreateForm({ kd_kamar: "", kd_bangsal: "", trf_kamar: "", status: "KOSONG", kelas: "", statusdata: "1" });
      toast.success("Kamar berhasil ditambahkan");
      fetchKamar();
    } catch (e) {
      const msg = e?.response?.data?.message || "Gagal menambahkan kamar";
      toast.error(msg);
    }
  };

  const openEdit = (item) => {
    setEditForm({
      kd_kamar: item.kd_kamar || "",
      kd_bangsal: item.kd_bangsal || "",
      trf_kamar: item.trf_kamar ?? "",
      status: item.status || "KOSONG",
      kelas: item.kelas || "",
      statusdata: item.statusdata ?? "1",
    });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    const id = encodeURIComponent(editForm.kd_kamar);

    const validStatuses = ["KOSONG", "ISI"];
    const tarif = Number(String(editForm.trf_kamar).trim());
    const bangsalValid = bangsals.some((b) => b.kd_bangsal === editForm.kd_bangsal);

    if (!editForm.kd_bangsal || !bangsalValid) {
      toast.error("Bangsal wajib dipilih dan harus valid");
      return;
    }

    if (String(editForm.trf_kamar).trim() === "" || !Number.isFinite(tarif) || tarif < 0) {
      toast.error("Tarif kamar harus angka dan ≥ 0");
      return;
    }

    if (!validStatuses.includes(editForm.status)) {
      toast.error("Status harus KOSONG atau ISI");
      return;
    }

    const kelasVal = editForm.kelas && kelasOptions.includes(editForm.kelas) ? editForm.kelas : null;
    const statusdataVal = ["0", "1"].includes(String(editForm.statusdata)) ? String(editForm.statusdata) : null;

    const payload = {
      kd_bangsal: editForm.kd_bangsal,
      trf_kamar: tarif,
      status: editForm.status,
      ...(kelasVal !== null ? { kelas: kelasVal } : {}),
      ...(statusdataVal !== null ? { statusdata: statusdataVal } : {}),
    };

    try {
      await axios.put(`/api/kamar/${id}`, payload, { headers, withCredentials: true });
      setEditOpen(false);
      toast.success("Kamar berhasil diperbarui");
      fetchKamar();
    } catch (e) {
      const errors = e?.response?.data?.errors;
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        const firstMsg = Array.isArray(errors[firstKey]) ? errors[firstKey][0] : String(errors[firstKey]);
        toast.error(firstMsg || "Gagal memperbarui kamar");
      } else {
        const msg = e?.response?.data?.message || "Gagal memperbarui kamar";
        toast.error(msg);
      }
    }
  };

  const handleDelete = async (kd) => {
    try {
      const id = encodeURIComponent(kd);
      await axios.delete(`/api/kamar/${id}`, { headers, withCredentials: true });
      toast.success("Kamar berhasil dihapus");
      fetchKamar();
    } catch (e) {
      const msg = e?.response?.data?.message || "Gagal menghapus kamar";
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchBangsals();
    fetchKamar();
  }, []);

  return (
    <SidebarRawatInap title="Kamar">
      <Head title="Kamar" />
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
                Manajemen Kamar
              </motion.h1>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setCreateOpen(true)} className="flex items-center gap-1">
                <Plus className="w-4 h-4" /> Tambah Kamar
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5" variants={variants.container} initial="hidden" animate="visible">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
              <div className="relative w-full">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari kode kamar atau nama bangsal"
                  className="pl-9 h-10 text-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm placeholder:text-gray-400"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-full">
                  <select
                    value={kdBangsal}
                    onChange={(e) => setKdBangsal(e.target.value)}
                    className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                  >
                    <option value="all">Semua Bangsal</option>
                    {bangsals.map((b) => (
                      <option key={b.kd_bangsal} value={b.kd_bangsal}>{b.nm_bangsal}</option>
                    ))}
                  </select>
                  <Building className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="all">Semua Status</option>
                  <option value="KOSONG">Kosong</option>
                  <option value="ISI">Isi</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="all">Semua Kelas</option>
                  {kelasOptions.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Button onClick={fetchKamar} variant="outline" className="flex items-center gap-1">
                <RefreshCw className="w-4 h-4" /> Muat Ulang
              </Button>
            </div>
          </div>

          <div className="relative p-4 md:p-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Bangsal</TableHead>
                  <TableHead>Tarif</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-10 text-center text-gray-500">Memuat...</TableCell>
                    </TableRow>
                  ) : items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-12">
                        <div className="text-center">
                          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-3">
                            <Search className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div className="text-gray-700 dark:text-gray-300 font-medium">Tidak ada data kamar</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Coba ubah filter atau tambah kamar baru</div>
                          <div className="mt-4">
                            <Button onClick={() => setCreateOpen(true)} className="flex items-center gap-1">
                              <Plus className="w-4 h-4" /> Tambah Kamar
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((it) => (
                      <motion.tr key={it.kd_kamar} variants={variants.item} className="border-b">
                        <TableCell className="font-mono">{it.kd_kamar}</TableCell>
                        <TableCell>{it.nm_bangsal || it.kd_bangsal}</TableCell>
                        <TableCell>
                          {typeof it.trf_kamar === "number" ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700">
                              <BadgePercent className="w-4 h-4" /> {currency.format(it.trf_kamar)}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {it.status ? (
                            it.status === "KOSONG" ? (
                              <span className="inline-flex items-center gap-1 text-blue-600">Kosong</span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-red-600">Isi</span>
                            )
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>{it.kelas || <span className="text-gray-400">-</span>}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="outline" onClick={() => openEdit(it)} className="px-2 py-1"><Pencil className="w-4 h-4" /></Button>
                            <Button variant="danger" onClick={() => handleDelete(it.kd_kamar)} className="px-2 py-1"><Trash2 className="w-4 h-4" /></Button>
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
          title="Tambah Kamar"
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
                <Input
                  value={createForm.kd_kamar}
                  onChange={(e) => setCreateForm((s) => ({ ...s, kd_kamar: e.target.value }))}
                  placeholder="Contoh: K001"
                  className="h-10 text-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label>Bangsal</Label>
                <select
                  value={createForm.kd_bangsal}
                  onChange={(e) => setCreateForm((s) => ({ ...s, kd_bangsal: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="">Pilih bangsal</option>
                  {bangsals.map((b) => (
                    <option key={b.kd_bangsal} value={b.kd_bangsal}>{b.nm_bangsal}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Tarif Kamar</Label>
                <Input
                  type="number"
                  value={createForm.trf_kamar}
                  onChange={(e) => setCreateForm((s) => ({ ...s, trf_kamar: e.target.value }))}
                  placeholder="0"
                  className="h-10 text-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label>Status</Label>
                <select
                  value={createForm.status}
                  onChange={(e) => setCreateForm((s) => ({ ...s, status: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="KOSONG">Kosong</option>
                  <option value="ISI">Isi</option>
                </select>
              </div>
              <div>
                <Label>Kelas</Label>
                <select
                  value={createForm.kelas}
                  onChange={(e) => setCreateForm((s) => ({ ...s, kelas: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="">-</option>
                  {kelasOptions.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Aktif</Label>
                <select
                  value={createForm.statusdata}
                  onChange={(e) => setCreateForm((s) => ({ ...s, statusdata: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="1">Ya</option>
                  <option value="0">Tidak</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateOpen(false)}>Batal</Button>
              <Button onClick={handleCreate}>Simpan</Button>
            </div>
          </div>
        </Modal>

        <Modal
          show={editOpen}
          onClose={() => setEditOpen(false)}
          title="Ubah Kamar"
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
                <Label>Bangsal</Label>
                <select
                  value={editForm.kd_bangsal}
                  onChange={(e) => setEditForm((s) => ({ ...s, kd_bangsal: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="">Pilih bangsal</option>
                  {bangsals.map((b) => (
                    <option key={b.kd_bangsal} value={b.kd_bangsal}>{b.nm_bangsal}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Tarif Kamar</Label>
                <Input
                  type="number"
                  value={editForm.trf_kamar}
                  onChange={(e) => setEditForm((s) => ({ ...s, trf_kamar: e.target.value }))}
                  className="h-10 text-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                />
              </div>
              <div>
                <Label>Status</Label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm((s) => ({ ...s, status: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="KOSONG">Kosong</option>
                  <option value="ISI">Isi</option>
                </select>
              </div>
              <div>
                <Label>Kelas</Label>
                <select
                  value={editForm.kelas}
                  onChange={(e) => setEditForm((s) => ({ ...s, kelas: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="">-</option>
                  {kelasOptions.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Aktif</Label>
                <select
                  value={editForm.statusdata}
                  onChange={(e) => setEditForm((s) => ({ ...s, statusdata: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <option value="1">Ya</option>
                  <option value="0">Tidak</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditOpen(false)}>Batal</Button>
              <Button onClick={handleUpdate}>Simpan</Button>
            </div>
          </div>
        </Modal>
      </div>
    </SidebarRawatInap>
  );
}
