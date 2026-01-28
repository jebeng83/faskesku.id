import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, RefreshCw, Search, CheckCircle, XCircle } from "lucide-react";
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

export default function Bangsal() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [createForm, setCreateForm] = useState({ kd_bangsal: "", nm_bangsal: "" });
  const [editForm, setEditForm] = useState({ kd_bangsal: "", nm_bangsal: "", status: "1" });

  const headers = useMemo(() => ({ Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }), []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = { start: 0, limit: 100, q: search || undefined, status: status === "all" ? undefined : status };
      const res = await axios.get("/api/bangsal", { params, headers, withCredentials: true });
      const list = Array.isArray(res?.data?.list) ? res.data.list : [];
      setItems(list);
    } catch (_e) {
      toast.error("Gagal memuat data bangsal");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!createForm.kd_bangsal || !createForm.nm_bangsal) {
      toast.error("Kode dan nama bangsal wajib diisi");
      return;
    }
    try {
      await axios.post("/api/bangsal", { ...createForm }, { headers, withCredentials: true });
      setCreateOpen(false);
      setCreateForm({ kd_bangsal: "", nm_bangsal: "" });
      toast.success("Bangsal berhasil ditambahkan");
      fetchData();
    } catch (e) {
      const msg = e?.response?.data?.message || "Gagal menambahkan bangsal";
      toast.error(msg);
    }
  };

  const openEdit = (item) => {
    setEditForm({ kd_bangsal: item.kd_bangsal, nm_bangsal: item.nm_bangsal, status: item.status });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!editForm.nm_bangsal) {
      toast.error("Nama bangsal wajib diisi");
      return;
    }
    try {
      const id = encodeURIComponent(editForm.kd_bangsal);
      await axios.put(`/api/bangsal/${id}`, { nm_bangsal: editForm.nm_bangsal, status: editForm.status }, { headers, withCredentials: true });
      setEditOpen(false);
      toast.success("Bangsal berhasil diperbarui");
      fetchData();
    } catch (e) {
      const msg = e?.response?.data?.message || "Gagal memperbarui bangsal";
      toast.error(msg);
    }
  };

  const handleDelete = async (kd) => {
    try {
      const id = encodeURIComponent(kd);
      await axios.delete(`/api/bangsal/${id}`, { headers, withCredentials: true });
      toast.success("Bangsal dinonaktifkan");
      fetchData();
    } catch (_e) {
      toast.error("Gagal menonaktifkan bangsal");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SidebarRawatInap title="Bangsal">
      <Head title="Bangsal" />
      <div className="space-y-4">
      <motion.div
        variants={variants.item}
        className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <motion.h1
              className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Manajemen Bangsal
            </motion.h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setCreateOpen(true)} className="flex items-center gap-1">
              <Plus className="w-4 h-4" /> Tambah Bangsal
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5" variants={variants.container} initial="hidden" animate="visible">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-72">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari kode atau nama bangsal"
                  className="pl-9 h-10 ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setStatus('all')}
                  className={`px-3 py-1.5 text-sm ${status === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                  Semua
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('1')}
                  className={`px-3 py-1.5 text-sm ${status === '1' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                  Aktif
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('0')}
                  className={`px-3 py-1.5 text-sm ${status === '0' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                  Nonaktif
                </button>
              </div>
              <Button onClick={fetchData} variant="outline" className="flex items-center gap-1">
                <RefreshCw className="w-4 h-4" /> Muat Ulang
              </Button>
            </div>
          </div>
        </div>

        <div className="relative p-4 md:p-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Nama Bangsal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center text-gray-500">Memuat...</TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-12">
                    <div className="text-center">
                      <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-3">
                        <Search className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="text-gray-700 dark:text-gray-300 font-medium">Tidak ada data bangsal</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Coba ubah filter atau tambah bangsal baru</div>
                      <div className="mt-4">
                        <Button onClick={() => setCreateOpen(true)} className="flex items-center gap-1">
                          <Plus className="w-4 h-4" /> Tambah Bangsal
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                items.map((it) => (
                  <motion.tr key={it.kd_bangsal} variants={variants.item} className="border-b">
                    <TableCell className="font-mono">{it.kd_bangsal}</TableCell>
                    <TableCell>{it.nm_bangsal}</TableCell>
                    <TableCell>
                      {it.status === "1" ? (
                        <span className="inline-flex items-center gap-1 text-green-600"><CheckCircle className="w-4 h-4" /> Aktif</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600"><XCircle className="w-4 h-4" /> Nonaktif</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" onClick={() => openEdit(it)} className="px-2 py-1"><Pencil className="w-4 h-4" /></Button>
                        <Button variant="danger" onClick={() => handleDelete(it.kd_bangsal)} className="px-2 py-1"><Trash2 className="w-4 h-4" /></Button>
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
        title="Tambah Bangsal"
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
              <Label>Kode Bangsal</Label>
              <Input
                value={createForm.kd_bangsal}
                onChange={(e) => setCreateForm((s) => ({ ...s, kd_bangsal: e.target.value }))}
                placeholder="Contoh: IGDK"
                className="h-10 text-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm placeholder:text-gray-400"
              />
            </div>
            <div>
              <Label>Nama Bangsal</Label>
              <Input
                value={createForm.nm_bangsal}
                onChange={(e) => setCreateForm((s) => ({ ...s, nm_bangsal: e.target.value }))}
                placeholder="Nama"
                className="h-10 text-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm placeholder:text-gray-400"
              />
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
        title="Ubah Bangsal"
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
              <Label>Kode Bangsal</Label>
              <Input
                value={editForm.kd_bangsal}
                disabled
                className="h-10 text-sm bg-gray-50 dark:bg-gray-800/90 ring-1 ring-gray-300/70 dark:ring-gray-600/60"
              />
            </div>
            <div>
              <Label>Nama Bangsal</Label>
              <Input
                value={editForm.nm_bangsal}
                onChange={(e) => setEditForm((s) => ({ ...s, nm_bangsal: e.target.value }))}
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
                <option value="1">Aktif</option>
                <option value="0">Nonaktif</option>
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
