import React, { useEffect, useMemo, useState } from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Building2, Phone, Mail, MapPin, Hash, Image as ImageIcon, CheckCircle } from "lucide-react";

// Halaman CRUD Setting Aplikasi
// - Sumber data: tabel `setting` (fallback ke `settings` jika ada)
// - Fitur: list, tambah, edit inline, hapus, dan describe struktur tabel

export default function SettingIndex({ settings = [], table, flash }) {
  // Animasi Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };
  const rowVariants = {
    hidden: { opacity: 0, y: 4 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
  };
  const MotionCard = ({ children, className = "" }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`rounded-2xl border bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </motion.div>
  );
  const formatBytes = (bytes) => {
    if (!bytes || bytes <= 0) return "-";
    const units = ["B", "KB", "MB", "GB"]; let i = 0; let val = bytes;
    while (val >= 1024 && i < units.length - 1) { val /= 1024; i++; }
    return `${val.toFixed(val >= 10 ? 0 : 1)} ${units[i]}`;
  };
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  // Data untuk card "Setting Aplikasi" (legacy table `setting`)
  const [appRecords, setAppRecords] = useState([]);
  const [appLoading, setAppLoading] = useState(false);
  const [editingNama, setEditingNama] = useState(null);
  const appForm = useForm({
    nama_instansi: "",
    alamat_instansi: "",
    kabupaten: "",
    propinsi: "",
    kontak: "",
    email: "",
    aktifkan: "Yes",
    kode_ppk: "",
    kode_ppkinkhealth: "",
    kode_ppkkemenkes: "",
    wallpaper: null,
    logo: null,
  });

  const groups = useMemo(() => {
    const set = new Set((settings || []).map((s) => s.group || ""));
    return Array.from(set).filter(Boolean);
  }, [settings]);

  // Hapus card Struktur Tabel: tidak perlu describe tabel legacy di UI

  useEffect(() => {
    // Ambil data dari tabel legacy `setting`
    const loadApp = async () => {
      setAppLoading(true);
      try {
        const res = await fetch(route("setting.app.index"));
        if (res.ok) {
          const json = await res.json();
          setAppRecords(json.data || []);
        }
      } catch (e) {
        console.warn("Gagal memuat data Setting Aplikasi", e);
      } finally {
        setAppLoading(false);
      }
    };
    loadApp();
  }, []);

  // Form tambah setting baru
  const { data, setData, post, processing, errors, reset } = useForm({
    group: "app",
    key: "",
    type: "string",
    value: "",
    description: "",
  });

  const onCreate = (e) => {
    e.preventDefault();
    post(route("setting.store"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        router.get(route("setting.index"));
      },
    });
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return (settings || []).filter((s) => {
      const matchesQ =
        !q ||
        (s.key || "").toLowerCase().includes(q) ||
        (s.value || "").toString().toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q);
      const matchesGroup = !groupFilter || (s.group || "") === groupFilter;
      return matchesQ && matchesGroup;
    });
  }, [settings, query, groupFilter]);

  const handleDelete = (id) => {
    if (!confirm("Hapus setting ini?")) return;
    router.delete(route("setting.destroy", id), {
      preserveScroll: true,
      onSuccess: () => router.get(route("setting.index")),
    });
  };

  const Row = ({ item }) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
      key: item.key || "",
      value: item.value ?? "",
      type: item.type || "string",
      group: item.group || "app",
      description: item.description || "",
    });

    const onSave = (e) => {
      e.preventDefault();
      // Perbaikan 405 PUT: gunakan method spoofing (POST + _method=PUT) jika ID tersedia,
      // dan fallback ke store (POST) bila record dari tabel legacy `setting` tidak memiliki kolom id.
      const hasId = item?.id !== undefined && item?.id !== null;
      if (hasId) {
        const updateUrl = route("setting.update", item.id);
        router.post(updateUrl, { ...form, _method: "PUT" }, {
          preserveScroll: true,
          forceFormData: true,
          onSuccess: () => {
            setEditing(false);
            router.get(route("setting.index"));
          },
        });
      } else {
        // Tabel `setting` (legacy) tidak memiliki kolom id. Lakukan upsert via store (POST) berdasarkan key.
        router.post(route("setting.store"), { ...form }, {
          preserveScroll: true,
          onSuccess: () => {
            setEditing(false);
            router.get(route("setting.index"));
          },
        });
      }
    };

    return (
      <motion.tr className="border-t border-slate-200" variants={rowVariants} initial="hidden" animate="visible" exit="exit">
        <td className="px-3 py-2 text-[11px] text-slate-500">{item.id}</td>
        <td className="px-3 py-2">
          {editing ? (
            <input
              value={form.group}
              onChange={(e) => setForm({ ...form, group: e.target.value })}
              className="w-full rounded-md border-slate-300 text-xs"
            />
          ) : (
            <span className="text-xs text-slate-700">{item.group}</span>
          )}
        </td>
        <td className="px-3 py-2">
          {editing ? (
            <input
              value={form.key}
              onChange={(e) => setForm({ ...form, key: e.target.value })}
              className="w-full rounded-md border-slate-300 text-xs"
            />
          ) : (
            <code className="text-[11px] bg-slate-50 px-1 py-0.5 rounded border border-slate-200 text-slate-800">
              {item.key}
            </code>
          )}
        </td>
        <td className="px-3 py-2">
          {editing ? (
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full rounded-md border-slate-300 text-xs"
            >
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
              <option value="json">json</option>
            </select>
          ) : (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">
              {item.type}
            </span>
          )}
        </td>
        <td className="px-3 py-2">
          {editing ? (
            <input
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              className="w-full rounded-md border-slate-300 text-xs"
            />
          ) : (
            <span className="text-xs text-slate-700 break-all">{String(item.value ?? '')}</span>
          )}
        </td>
        <td className="px-3 py-2">
          {editing ? (
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-md border-slate-300 text-xs"
            />
          ) : (
            <span className="text-[11px] text-slate-500">{item.description || "-"}</span>
          )}
        </td>
        <td className="px-3 py-2 text-right">
          {editing ? (
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={onSave}
                className="rounded-md bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700"
              >
                Simpan
              </button>
              <button
                onClick={() => setEditing(false)}
                className="rounded-md bg-slate-200 px-2 py-1 text-xs text-slate-700 hover:bg-slate-300"
              >
                Batal
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={() => setEditing(true)}
                className="rounded-md bg-sky-600 px-2 py-1 text-xs text-white hover:bg-sky-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="rounded-md bg-rose-600 px-2 py-1 text-xs text-white hover:bg-rose-700"
              >
                Hapus
              </button>
            </div>
          )}
        </td>
      </motion.tr>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Head title="Setting Aplikasi" />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <MotionCard className="mb-6 p-4 border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-600 text-white shadow">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 6h16M4 12h10M4 18h7" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Setting Aplikasi</h1>
                <p className="text-xs text-slate-500">CRUD sederhana untuk tabel {table || 'setting'}</p>
              </div>
            </div>
            <Link
              href={route("profile.menu")}
              className="text-xs inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              ← Kembali ke Profil
            </Link>
          </div>
        </MotionCard>

        {/* Flash success */}
        {flash?.success && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-700 shadow-sm">
            {flash.success}
          </div>
        )}

        {/* Form tambah */}
        <div className="mb-5">
          <MotionCard className="p-4 border-slate-200">
            <form onSubmit={onCreate} className="space-y-3">
              <div className="text-slate-800 font-medium">Tambah Setting</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs text-slate-600">Group</label>
                  <input
                    type="text"
                    value={data.group}
                    onChange={(e) => setData("group", e.target.value)}
                    className="mt-1 w-full rounded-md border-slate-300 text-xs"
                    placeholder="app/ui/integrasi"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-600">Key</label>
                  <input
                    type="text"
                    value={data.key}
                    onChange={(e) => setData("key", e.target.value)}
                    className="mt-1 w-full rounded-md border-slate-300 text-xs"
                    placeholder="app.name, ui.theme"
                    required
                  />
                  {errors.key && <p className="mt-1 text-[11px] text-red-600">{errors.key}</p>}
                </div>
                <div>
                  <label className="block text-xs text-slate-600">Tipe</label>
                  <select
                    value={data.type}
                    onChange={(e) => setData("type", e.target.value)}
                    className="mt-1 w-full rounded-md border-slate-300 text-xs"
                  >
                    <option value="string">string</option>
                    <option value="number">number</option>
                    <option value="boolean">boolean</option>
                    <option value="json">json</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-600">Value</label>
                  <input
                    type="text"
                    value={data.value}
                    onChange={(e) => setData("value", e.target.value)}
                    className="mt-1 w-full rounded-md border-slate-300 text-xs"
                    placeholder="Isi nilai setting"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600">Deskripsi</label>
                  <input
                    type="text"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className="mt-1 w-full rounded-md border-slate-300 text-xs"
                    placeholder="Keterangan singkat"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={processing}
                  className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  Simpan Setting
                </button>
                <button
                  type="button"
                  onClick={() => reset()}
                  className="rounded-md bg-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-300"
                >
                  Reset
                </button>
              </div>
            </form>
          </MotionCard>
        </div>

        {/* Filter & Tabel */}
        <MotionCard className="p-4 border-slate-200">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="text-slate-800 font-medium">Daftar Setting</div>
            <div className="ml-auto flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari key/desc/value..."
                className="rounded-md border-slate-300 text-xs"
              />
              <select
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
                className="rounded-md border-slate-300 text-xs"
              >
                <option value="">Semua Group</option>
                {groups.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-[11px] text-slate-500">
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Group</th>
                  <th className="px-3 py-2">Key</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Value</th>
                  <th className="px-3 py-2">Deskripsi</th>
                  <th className="px-3 py-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {filtered.length ? (
                    filtered.map((item) => <Row key={item.id} item={item} />)
                  ) : (
                    <tr key="empty">
                      <td className="px-3 py-4 text-[12px] text-slate-500" colSpan={7}>Tidak ada data</td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </MotionCard>
      </div>

      {/* Card: Setting Aplikasi (CRUD tabel legacy `setting`) */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-10">
        <MotionCard className="p-6 border-slate-200 mt-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-600 text-white shadow">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-slate-800 font-semibold">Setting Aplikasi</div>
                <p className="text-[11px] text-slate-500">Kelola identitas instansi, integrasi, dan branding</p>
              </div>
            </div>
            {editingNama && (
              <span className="text-[11px] text-slate-600">Mode edit: {editingNama}</span>
            )}
          </div>

          {/* Form create/update */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (editingNama) {
                // Perbaikan 405 PUT: spoofing method via POST + _method=PUT agar kompatibel dengan server/proxy
                const updateUrl = route("setting.app.update", editingNama);
                router.post(updateUrl, { ...appForm.data, _method: "PUT" }, {
                  preserveScroll: true,
                  forceFormData: true,
                  onSuccess: () => {
                    setEditingNama(null);
                    appForm.reset();
                    fetch(route("setting.app.index")).then((r) => r.json()).then((j) => setAppRecords(j.data || []));
                  },
                });
              } else {
                appForm.post(route("setting.app.store"), {
                  preserveScroll: true,
                  forceFormData: true,
                  onSuccess: () => {
                    appForm.reset();
                    fetch(route("setting.app.index")).then((r) => r.json()).then((j) => setAppRecords(j.data || []));
                  },
                });
              }
            }}
            className="space-y-5"
          >
            {/* Section: Identitas Instansi */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Building2 className="w-4 h-4 text-indigo-600" /> Identitas Instansi
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600"><Building2 className="w-3.5 h-3.5 text-indigo-600" /> Nama Instansi</label>
                  <input
                    type="text"
                    value={appForm.data.nama_instansi}
                    onChange={(e) => appForm.setData("nama_instansi", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300/70 bg-white text-xs focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                    placeholder="Nama instansi (PK)"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600"><Phone className="w-3.5 h-3.5 text-indigo-600" /> Kontak</label>
                  <input
                    type="text"
                    value={appForm.data.kontak}
                    onChange={(e) => appForm.setData("kontak", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300/70 bg-white text-xs focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                    placeholder="Nomor telepon"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600"><Mail className="w-3.5 h-3.5 text-indigo-600" /> Email</label>
                  <input
                    type="email"
                    value={appForm.data.email}
                    onChange={(e) => appForm.setData("email", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300/70 bg-white text-xs focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                    placeholder="email@instansi.id"
                  />
                </div>
              </div>
            </div>

            {/* Section: Alamat & Status */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <MapPin className="w-4 h-4 text-indigo-600" /> Alamat & Status
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="flex items-center gap-1.5 text-xs text-slate-600"><MapPin className="w-3.5 h-3.5 text-indigo-600" /> Alamat Instansi</label>
                  <input
                    type="text"
                    value={appForm.data.alamat_instansi}
                    onChange={(e) => appForm.setData("alamat_instansi", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300/70 bg-white text-xs focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                    placeholder="Alamat lengkap"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600"><CheckCircle className="w-3.5 h-3.5 text-indigo-600" /> Aktifkan</label>
                  <select
                    value={appForm.data.aktifkan}
                    onChange={(e) => appForm.setData("aktifkan", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300/70 bg-white text-xs focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section: Wilayah & Kode */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Hash className="w-4 h-4 text-indigo-600" /> Wilayah & Kode
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-600">Kabupaten</label>
                  <input
                    type="text"
                    value={appForm.data.kabupaten}
                    onChange={(e) => appForm.setData("kabupaten", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300/70 bg-white text-xs focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600">Propinsi</label>
                  <input
                    type="text"
                    value={appForm.data.propinsi}
                    onChange={(e) => appForm.setData("propinsi", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300/70 bg-white text-xs focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600"><Hash className="w-3.5 h-3.5 text-indigo-600" /> Kode PPK</label>
                  <input
                    type="text"
                    value={appForm.data.kode_ppk}
                    onChange={(e) => appForm.setData("kode_ppk", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300/70 bg-white text-xs focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Section: Integrasi & Branding */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Hash className="w-4 h-4 text-indigo-600" /> Integrasi & Branding
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600"><Hash className="w-3.5 h-3.5 text-indigo-600" /> Kode PPK InKHealth</label>
                  <input
                    type="text"
                    value={appForm.data.kode_ppkinkhealth}
                    onChange={(e) => appForm.setData("kode_ppkinkhealth", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300/70 bg-white text-xs focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600"><Hash className="w-3.5 h-3.5 text-indigo-600" /> Kode PPK Kemenkes</label>
                  <input
                    type="text"
                    value={appForm.data.kode_ppkkemenkes}
                    onChange={(e) => appForm.setData("kode_ppkkemenkes", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300/70 bg-white text-xs focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600"><ImageIcon className="w-3.5 h-3.5 text-indigo-600" /> Wallpaper</label>
                  <input
                    type="file"
                    onChange={(e) => appForm.setData("wallpaper", e.target.files?.[0] ?? null)}
                    className="mt-1 w-full rounded-lg border border-slate-300/70 bg-white text-xs file:mr-2 file:px-2 file:py-1 file:text-xs file:bg-slate-100 file:border-0 file:rounded-md"
                    accept="image/*"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">Format: JPG/PNG • Disarankan ≤ 2MB</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600"><ImageIcon className="w-3.5 h-3.5 text-indigo-600" /> Logo</label>
                  <input
                    type="file"
                    onChange={(e) => appForm.setData("logo", e.target.files?.[0] ?? null)}
                    className="mt-1 w-full rounded-lg border border-slate-300/70 bg-white text-xs file:mr-2 file:px-2 file:py-1 file:text-xs file:bg-slate-100 file:border-0 file:rounded-md"
                    accept="image/*"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">Format: SVG/PNG • Disarankan ≤ 1MB</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={appForm.processing}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> {editingNama ? "Simpan Perubahan" : "Tambah Setting"}
              </button>
              <button
                type="button"
                className="rounded-lg bg-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-300"
                onClick={() => { appForm.reset(); setEditingNama(null); }}
              >
                Reset
              </button>
            </div>
          </form>

          {/* Tabel existing records */}
          <div className="mt-6">
            <div className="text-slate-800 font-medium mb-2">Data Tersimpan</div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-[11px] text-slate-500">
                    <th className="px-3 py-2">Nama Instansi</th>
                    <th className="px-3 py-2">Alamat</th>
                    <th className="px-3 py-2">Kabupaten</th>
                    <th className="px-3 py-2">Propinsi</th>
                    <th className="px-3 py-2">Kontak</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Aktifkan</th>
                    <th className="px-3 py-2">Kode PPK</th>
                    <th className="px-3 py-2">Wallpaper</th>
                    <th className="px-3 py-2">Logo</th>
                    <th className="px-3 py-2 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {appLoading ? (
                    <tr><td className="px-3 py-4 text-[12px] text-slate-500" colSpan={11}>Memuat...</td></tr>
                  ) : appRecords?.length ? (
                    appRecords.map((r, idx) => (
                      <motion.tr key={r.nama_instansi} className="border-t border-slate-200" variants={rowVariants} initial="hidden" animate="visible" transition={{ delay: idx * 0.02 }}>
                        <td className="px-3 py-2 text-xs text-slate-800">{r.nama_instansi}</td>
                        <td className="px-3 py-2 text-xs">{r.alamat_instansi || '-'}</td>
                        <td className="px-3 py-2 text-xs">{r.kabupaten || '-'}</td>
                        <td className="px-3 py-2 text-xs">{r.propinsi || '-'}</td>
                        <td className="px-3 py-2 text-xs">{r.kontak || '-'}</td>
                        <td className="px-3 py-2 text-xs">{r.email || '-'}</td>
                        <td className="px-3 py-2 text-[11px]"><span className={`inline-flex items-center rounded-full px-2 py-0.5 ${r.aktifkan==='Yes'?'bg-emerald-100 text-emerald-700':'bg-rose-100 text-rose-700'}`}>{r.aktifkan}</span></td>
                        <td className="px-3 py-2 text-xs">{r.kode_ppk || '-'}</td>
                        <td className="px-3 py-2 text-xs">
                          {r.wallpaper_size > 0 ? (
                            <a
                              href={route('setting.app.wallpaper', r.nama_instansi)}
                              target="_blank" rel="noopener noreferrer"
                              className="text-sky-700 hover:underline"
                            >{formatBytes(r.wallpaper_size)} • Lihat</a>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-xs">
                          {r.logo_size > 0 ? (
                            <a
                              href={route('setting.app.logo', r.nama_instansi)}
                              target="_blank" rel="noopener noreferrer"
                              className="text-sky-700 hover:underline"
                            >{formatBytes(r.logo_size)} • Lihat</a>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              className="rounded-md bg-sky-600 px-2 py-1 text-xs text-white hover:bg-sky-700"
                              onClick={() => {
                                setEditingNama(r.nama_instansi);
                              appForm.setData({
                                  nama_instansi: r.nama_instansi || '',
                                  alamat_instansi: r.alamat_instansi || '',
                                  kabupaten: r.kabupaten || '',
                                  propinsi: r.propinsi || '',
                                  kontak: r.kontak || '',
                                  email: r.email || '',
                                  aktifkan: r.aktifkan || 'Yes',
                                  kode_ppk: r.kode_ppk || '',
                                  // Fallback untuk perbedaan nama kolom: kode_ppkinkhealth vs kode_ppkinhealth
                                  kode_ppkinkhealth: (r.kode_ppkinkhealth ?? r.kode_ppkinhealth) || '',
                                  kode_ppkkemenkes: r.kode_ppkkemenkes || '',
                                  wallpaper: null,
                                  logo: null,
                              });
                              }}
                            >Edit</button>
                            <button
                              className="rounded-md bg-rose-600 px-2 py-1 text-xs text-white hover:bg-rose-700"
                              onClick={() => {
                                if (!confirm(`Hapus data ${r.nama_instansi}?`)) return;
                                router.delete(route("setting.app.destroy", r.nama_instansi), {
                                  preserveScroll: true,
                                  onSuccess: () => {
                                    fetch(route("setting.app.index")).then((rr) => rr.json()).then((j) => setAppRecords(j.data || []));
                                  },
                                });
                              }}
                            >Hapus</button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-3 py-4 text-[12px] text-slate-500" colSpan={11}>Belum ada data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </MotionCard>
      </div>
    </div>
  );
}

// Render dalam AppLayout global
SettingIndex.layout = (page) => <AppLayout title="Setting Aplikasi" children={page} />;