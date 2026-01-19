import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarRalan from "@/Layouts/SidebarRalan";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input, Label, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Toaster } from "@/Components/ui";
import { Save, Pencil, Trash2, Search, Plus } from "lucide-react";
import Modal from "@/Components/Modal";
import toast from "@/tools/toast";

export default function SDKIIndex() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [toasts, setToasts] = useState([]);
  const pushToast = (t) => setToasts((arr) => [...arr, { id: Date.now() + Math.random(), ...t }]);
  const removeToast = (id) => setToasts((arr) => arr.filter((x) => x.id !== id));

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  const [createForm, setCreateForm] = useState({
    kode: "",
    nama: "",
    kategori: "",
    subkategori: "",
    definisi: "",
  });

  const [kategoriModalOpen, setKategoriModalOpen] = useState(false);
  const [kategoriRecords, setKategoriRecords] = useState([]);
  const [kategoriLoading, setKategoriLoading] = useState(false);
  const [kategoriQuery, setKategoriQuery] = useState("");
  const [kategoriForm, setKategoriForm] = useState({ kode: "", nama: "", slug: "" });

  const routeSafe = (name, params = [], absolute = false) => {
    try { return route(name, params, absolute); } catch { return null; }
  };

  const getCsrfToken = () => {
    if (typeof document === "undefined") return null;
    const el = document.querySelector('meta[name="csrf-token"]');
    return el ? el.getAttribute("content") : null;
  };

  const listUrl = routeSafe("api.sdki.index", [], false) || "/api/sdki";
  const createUrl = routeSafe("api.sdki.store", [], false) || "/api/sdki";
  const updateUrl = (idOrKode) => routeSafe("api.sdki.update", idOrKode, false) || `/api/sdki/${encodeURIComponent(idOrKode)}`;
  const destroyUrl = (idOrKode) => routeSafe("api.sdki.destroy", idOrKode, false) || `/api/sdki/${encodeURIComponent(idOrKode)}`;

  const kategoriListUrl = routeSafe('api.kategori-sdki.index') || routeSafe('rawat-jalan.kategori-sdki.index') || "/api/kategori-sdki";
  const kategoriCreateUrl = routeSafe('api.kategori-sdki.store') || routeSafe('rawat-jalan.kategori-sdki.store') || "/api/kategori-sdki";
  const kategoriUpdateUrl = (idOrKey) => routeSafe('api.kategori-sdki.update', idOrKey, false) || routeSafe('rawat-jalan.kategori-sdki.update', idOrKey, false) || `/api/kategori-sdki/${encodeURIComponent(idOrKey)}`;
  const kategoriDestroyUrl = (idOrKey) => routeSafe('api.kategori-sdki.destroy', idOrKey, false) || routeSafe('rawat-jalan.kategori-sdki.destroy', idOrKey, false) || `/api/kategori-sdki/${encodeURIComponent(idOrKey)}`;

  const getVal = (obj, keys, fallback = "") => {
    for (const k of keys) {
      const v = obj?.[k];
      if (v !== undefined && v !== null) return v;
    }
    return fallback;
  };

  const keyId = (item) => {
    return (
      item?.id ?? item?.kode ?? item?.code ?? item?.kd ?? item?.kd_sdki ?? ""
    );
  };

  const loadRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch(listUrl);
      if (res.ok) {
        const json = await res.json();
        const list = Array.isArray(json) ? json : (json?.data || json?.list || []);
        setRecords(list);
      } else {
        pushToast({ type: "error", title: "Gagal memuat SDKI", message: `Status ${res.status}` });
      }
    } catch (_) {
      pushToast({ type: "error", title: "Koneksi gagal", message: "Tidak bisa memuat data SDKI" });
      toast.error("Tidak bisa memuat data SDKI");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRecords(); }, []);

  const loadKategori = async () => {
    setKategoriLoading(true);
    try {
      const res = await fetch(kategoriListUrl + (kategoriQuery ? `?q=${encodeURIComponent(kategoriQuery)}` : ""));
      if (res.ok) {
        const json = await res.json();
        const list = Array.isArray(json) ? json : (json?.data || json?.list || []);
        setKategoriRecords(list);
      }
    } catch (_) {
      toast.error("Tidak bisa memuat kategori");
    } finally {
      setKategoriLoading(false);
    }
  };
  useEffect(() => { if (kategoriModalOpen) loadKategori(); }, [kategoriModalOpen]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return records;
    return records.filter((r) => {
      const fields = [
        getVal(r, ["kode", "code", "kd", "kd_sdki", "id"], "").toString(),
        getVal(r, ["nama", "label", "judul"], ""),
        getVal(r, ["kategori", "category"], ""),
        getVal(r, ["subkategori", "subcategory"], ""),
        getVal(r, ["definisi", "definition"], ""),
      ].map((v) => (v || "").toString().toLowerCase());
      return fields.some((v) => v.includes(q));
    });
  }, [records, query]);

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(createUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      if (res.ok) {
        pushToast({ type: "success", title: "Berhasil", message: "SDKI ditambahkan" });
        setCreateForm({ kode: "", nama: "", kategori: "", subkategori: "", definisi: "" });
        await loadRecords();
      } else {
        pushToast({ type: "error", title: "Gagal", message: `Status ${res.status}` });
      }
    } catch {
      pushToast({ type: "error", title: "Gagal", message: "Tidak bisa menyimpan" });
    }
  };

  const Row = ({ item }) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
      kode: getVal(item, ["kode", "code", "kd", "kd_sdki", "id"], ""),
      nama: getVal(item, ["nama", "label", "judul"], ""),
      kategori: getVal(item, ["kategori", "category"], ""),
      subkategori: getVal(item, ["subkategori", "subcategory"], ""),
      definisi: getVal(item, ["definisi", "definition"], ""),
    });

    const onSave = async (e) => {
      e.preventDefault();
      const idOrKode = keyId(item);
      if (!idOrKode) return;
      try {
      const res = await fetch(updateUrl(idOrKode), {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setEditing(false);
          pushToast({ type: "success", title: "Berhasil", message: "SDKI diperbarui" });
          await loadRecords();
        } else {
          pushToast({ type: "error", title: "Gagal", message: `Status ${res.status}` });
        }
      } catch {
        pushToast({ type: "error", title: "Gagal", message: "Tidak bisa memperbarui" });
      }
    };

    const onDelete = async () => {
      const idOrKode = keyId(item);
      if (!idOrKode) return;
      if (!confirm("Hapus SDKI ini?")) return;
      try {
      const res = await fetch(destroyUrl(idOrKode), { method: "DELETE" });
        if (res.ok) {
          pushToast({ type: "success", title: "Berhasil", message: "SDKI dihapus" });
          await loadRecords();
        } else {
          pushToast({ type: "error", title: "Gagal", message: `Status ${res.status}` });
        }
      } catch {
        pushToast({ type: "error", title: "Gagal", message: "Tidak bisa menghapus" });
      }
    };

    return (
      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-t">
        <TableCell className="px-3 py-2 text-xs font-mono">
          {getVal(item, ["kode", "code", "kd", "kd_sdki", "id"], "-")}
        </TableCell>
        <TableCell className="px-3 py-2">
          {editing ? (
            <Input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="text-xs" />
          ) : (
            <span className="text-xs">{getVal(item, ["nama", "label", "judul"], "-")}</span>
          )}
        </TableCell>
        <TableCell className="px-3 py-2">
          {editing ? (
            <Input value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className="text-xs" />
          ) : (
            <span className="text-xs">{getVal(item, ["kategori", "category"], "-")}</span>
          )}
        </TableCell>
        <TableCell className="px-3 py-2">
          {editing ? (
            <Input value={form.subkategori} onChange={(e) => setForm({ ...form, subkategori: e.target.value })} className="text-xs" />
          ) : (
            <span className="text-xs">{getVal(item, ["subkategori", "subcategory"], "-")}</span>
          )}
        </TableCell>
        <TableCell className="px-3 py-2">
          {editing ? (
            <Input value={form.definisi} onChange={(e) => setForm({ ...form, definisi: e.target.value })} className="text-xs" />
          ) : (
            <span className="text-xs">{getVal(item, ["definisi", "definition"], "-")}</span>
          )}
        </TableCell>
        <TableCell className="px-3 py-2 text-right">
          {editing ? (
            <div className="flex items-center gap-2 justify-end">
              <Button size="sm" onClick={onSave} className="bg-emerald-600 hover:bg-emerald-700 text-white"><Save className="w-3 h-3" /> Simpan</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Batal</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 justify-end">
              <Button size="sm" onClick={() => setEditing(true)} className="bg-sky-600 hover:bg-sky-700 text-white"><Pencil className="w-3 h-3" /> Edit</Button>
              <Button size="sm" onClick={onDelete} className="bg-rose-600 hover:bg-rose-700 text-white"><Trash2 className="w-3 h-3" /> Hapus</Button>
            </div>
          )}
        </TableCell>
      </motion.tr>
    );
  };

  return (
    <SidebarRalan title="Asuhan Keperawatan Ralan">
      <Head title="CRUD SDKI" />
      <Toaster toasts={toasts} onRemove={removeToast} />
      <div className="px-4 py-4">
        <motion.div variants={cardVariants} initial="hidden" animate="visible" className="mb-4 p-4 rounded-2xl border bg-white/90 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-600 text-white">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <div className="text-slate-800 font-semibold">Tambah SDKI</div>
                <p className="text-[11px] text-slate-500">Input data diagnosis SDKI</p>
              </div>
            </div>
          </div>
          <form onSubmit={onCreate} className="mt-3 grid grid-cols-1 md:grid-cols-5 gap-3">
            <div>
              <Label>Kode</Label>
              <Input value={createForm.kode} onChange={(e) => setCreateForm({ ...createForm, kode: e.target.value })} placeholder="D.0001" className="text-xs" required />
            </div>
            <div className="md:col-span-2">
              <Label>Nama</Label>
              <Input value={createForm.nama} onChange={(e) => setCreateForm({ ...createForm, nama: e.target.value })} placeholder="Label diagnosis" className="text-xs" required />
            </div>
            <div>
              <Label>Kategori</Label>
              <div className="flex items-center gap-2">
                <Input value={createForm.kategori} onChange={(e) => setCreateForm({ ...createForm, kategori: e.target.value })} placeholder="Fisiologis/Psikologis/..." className="text-xs flex-1" />
                <Button type="button" size="sm" variant="outline" onClick={() => setKategoriModalOpen(true)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label>Subkategori</Label>
              <Input value={createForm.subkategori} onChange={(e) => setCreateForm({ ...createForm, subkategori: e.target.value })} placeholder="Respirasi/Sirkulasi/..." className="text-xs" />
            </div>
            <div className="md:col-span-5">
              <Label>Definisi</Label>
              <Input value={createForm.definisi} onChange={(e) => setCreateForm({ ...createForm, definisi: e.target.value })} placeholder="Definisi ringkas" className="text-xs" />
            </div>
            <div className="md:col-span-5 flex items-center gap-2">
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white"><Save className="w-4 h-4" /> Simpan</Button>
              <Button type="button" variant="outline" onClick={() => setCreateForm({ kode: "", nama: "", kategori: "", subkategori: "", definisi: "" })}>Reset</Button>
            </div>
          </form>
        </motion.div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible" className="p-4 rounded-2xl border bg-white/90 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-slate-800 font-semibold">Daftar SDKI</div>
            <div className="ml-auto flex items-center gap-2">
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari kode/nama/kategori..." className="text-xs" />
              <Button variant="outline"><Search className="w-4 h-4" /></Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-3 py-2">Kode</TableHead>
                  <TableHead className="px-3 py-2">Nama</TableHead>
                  <TableHead className="px-3 py-2">Kategori</TableHead>
                  <TableHead className="px-3 py-2">Subkategori</TableHead>
                  <TableHead className="px-3 py-2">Definisi</TableHead>
                  <TableHead className="px-3 py-2 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence initial={false}>
                  {loading ? (
                    <TableRow><TableCell className="px-3 py-3 text-xs">Memuat…</TableCell></TableRow>
                  ) : filtered.length ? (
                    filtered.map((item, idx) => <Row key={keyId(item) || idx} item={item} />)
                  ) : (
                    <TableRow><TableCell className="px-3 py-3 text-xs" colSpan={6}>Tidak ada data</TableCell></TableRow>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </motion.div>
        <Modal show={kategoriModalOpen} onClose={() => setKategoriModalOpen(false)} title="Kelola Kategori SDKI" size="lg">
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <Label>Kode</Label>
                <Input value={kategoriForm.kode} onChange={(e) => setKategoriForm({ ...kategoriForm, kode: e.target.value })} className="text-xs" />
              </div>
              <div className="md:col-span-2">
                <Label>Nama</Label>
                <Input value={kategoriForm.nama} onChange={(e) => setKategoriForm({ ...kategoriForm, nama: e.target.value })} className="text-xs" />
              </div>
              <div>
                <Label>Slug</Label>
                <Input value={kategoriForm.slug} onChange={(e) => setKategoriForm({ ...kategoriForm, slug: e.target.value })} className="text-xs" />
              </div>
              <div className="md:col-span-4 flex items-center gap-2">
                <Button
                  onClick={async () => {
                    try {
                      const useWeb = typeof kategoriCreateUrl === 'string' && kategoriCreateUrl.startsWith('/rawat-jalan/');
                      const headers = { "Content-Type": "application/json" };
                      if (useWeb) {
                        const csrf = getCsrfToken();
                        if (csrf) headers["X-CSRF-TOKEN"] = csrf;
                      }
                      const res = await fetch(kategoriCreateUrl, { method: "POST", headers, body: JSON.stringify(kategoriForm) });
                      if (res.ok) {
                        setKategoriForm({ kode: "", nama: "", slug: "" });
                        await loadKategori();
                      }
                    } catch (_) {}
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Save className="w-4 h-4" /> Simpan
                </Button>
                <Input value={kategoriQuery} onChange={(e) => setKategoriQuery(e.target.value)} placeholder="Cari kategori" className="text-xs ml-auto" />
                <Button variant="outline" onClick={() => loadKategori()}><Search className="w-4 h-4" /></Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-3 py-2">Kode</TableHead>
                    <TableHead className="px-3 py-2">Nama</TableHead>
                    <TableHead className="px-3 py-2">Slug</TableHead>
                    <TableHead className="px-3 py-2 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence initial={false}>
                    {kategoriLoading ? (
                      <TableRow><TableCell className="px-3 py-3 text-xs">Memuat…</TableCell></TableRow>
                    ) : (kategoriRecords || []).length ? (
                      (kategoriRecords || []).map((row, idx) => {
                        const idOrKey = row?.id ?? row?.kode ?? row?.code ?? row?.kd ?? row?.slug ?? idx;
                        return (
                          <TableRow key={idOrKey}>
                            <TableCell className="px-3 py-2 text-xs font-mono">{String(row?.kode ?? row?.code ?? row?.kd ?? "-")}</TableCell>
                            <TableCell className="px-3 py-2">
                              <span className="text-xs">{String(row?.nama ?? row?.label ?? row?.kategori ?? "-")}</span>
                            </TableCell>
                            <TableCell className="px-3 py-2">
                              <span className="text-xs">{String(row?.slug ?? "-")}</span>
                            </TableCell>
                            <TableCell className="px-3 py-2">
                              <div className="flex items-center gap-2 justify-end">
                                <Button size="sm" variant="outline" onClick={() => { setCreateForm({ ...createForm, kategori: String(row?.nama ?? row?.label ?? row?.kategori ?? "") }); setKategoriModalOpen(false); }}>Pilih</Button>
                                <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white" onClick={async () => {
                                  const payload = { kode: row?.kode ?? row?.code ?? row?.kd ?? undefined, nama: row?.nama ?? row?.label ?? row?.kategori ?? undefined, slug: row?.slug ?? undefined };
                                  try {
                                    const url = kategoriUpdateUrl(idOrKey);
                                    const useWeb = typeof url === 'string' && url.startsWith('/rawat-jalan/');
                                    const headers = { "Content-Type": "application/json" };
                                    if (useWeb) {
                                      const csrf = getCsrfToken();
                                      if (csrf) headers["X-CSRF-TOKEN"] = csrf;
                                    }
                                    await fetch(url, { method: "PUT", headers, body: JSON.stringify(payload) });
                                    await loadKategori();
                                  } catch (_) {}
                                }}><Pencil className="w-3 h-3" /> Edit</Button>
                                <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white" onClick={async () => {
                                  try {
                                    const url = kategoriDestroyUrl(idOrKey);
                                    const useWeb = typeof url === 'string' && url.startsWith('/rawat-jalan/');
                                    const headers = {};
                                    if (useWeb) {
                                      const csrf = getCsrfToken();
                                      if (csrf) headers["X-CSRF-TOKEN"] = csrf;
                                    }
                                    await fetch(url, { method: "DELETE", headers });
                                    await loadKategori();
                                  } catch (_) {}
                                }}><Trash2 className="w-3 h-3" /> Hapus</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow><TableCell className="px-3 py-3 text-xs" colSpan={4}>Tidak ada data</TableCell></TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </div>
        </Modal>
      </div>
    </SidebarRalan>
  );
}
