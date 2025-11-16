import React, { useEffect, useMemo, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Activity, ClipboardList, Bell, CheckCircle2, Clock4, UserPlus, Search, FlaskConical, Radiation, Ambulance, Pill, Stethoscope, Bed, LogOut } from "lucide-react";
import { route } from "ziggy-js";

// Stats akan dibuat dinamis di dalam komponen menggunakan data dari endpoint

const quickLinks = [
  { title: "Pendaftaran Pasien", description: "Registrasi cepat atau tambah pasien baru", href: "/registration/lanjutan" },
  { title: "Monitoring Satusehat", description: "Pantau status FHIR & Encounter", href: "/satusehat/monitoring" },
  { title: "PCare & Rujukan", description: "Sinkron data PCare dan status rujukan", href: "/pcare" },
  { title: "Rawat Jalan", description: "Kelola pemeriksaan & SOAP RME", href: "/rawat-jalan" },
];

const timeline = [
  { title: "Kunjungan diterima SATUSEHAT", meta: "09:42 WIB • Dr. Sita Anindya", status: "success" },
  { title: "Bundle Rajal diproses", meta: "09:10 WIB • IGD 01", status: "info" },
  { title: "Token SATUSEHAT diperbarui", meta: "08:55 WIB • Otomatis", status: "neutral" },
];

const updates = [
  { label: "IGD", text: "Flow triase baru mulai 08:00 - pastikan form SOAP terisi lengkap." },
  { label: "Farmasi", text: "Resep favorit & stok kritikal kini tersedia di panel farmasi." },
  { label: "Keuangan", text: "Laporan tarif baru dapat di-export di Pengaturan > Tarif." },
];

const heroVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export default function Dashboard() {
  const { props } = usePage();
  // Ambil nama instansi dari props yang tersedia
  const namaInstansi = props?.settings?.nama_instansi || props?.setting?.nama_instansi || props?.nama_instansi;
  // Gunakan wallpaper dari tabel setting via route streaming; fallback ke file default
  const wallpaperUrl = namaInstansi ? route("setting.app.wallpaper", namaInstansi) : "/img/wallpaper.jpg";
  // Nama faskes akan diambil langsung saat render, tanpa variabel terpisah

  // State untuk jumlah registrasi/pasien hari ini
  const [pasienHariIniCount, setPasienHariIniCount] = useState(null);
  // State untuk jumlah registrasi/pasien kemarin
  const [pasienKemarinCount, setPasienKemarinCount] = useState(null);

  // Helper format tanggal lokal ke YYYY-MM-DD
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // Ambil jumlah registrasi hari ini dari endpoint JSON (RegistrationController@getRegistrations)
  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        // Endpoint ini secara default memfilter tgl_registrasi = hari ini jika parameter 'date' tidak dikirim
        const url = route("registration.get-registrations", { per_page: 1 }, false);
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        const json = await res.json();
        // Struktur paginate Laravel: json.data.total berisi total item untuk filter saat ini
        const total = json?.data?.total ?? null;
        if (mounted) setPasienHariIniCount(total);
      } catch (e) {
        if (mounted) setPasienHariIniCount(null);
      }
    };
    run();
    return () => { mounted = false; };
  }, []);

  // Ambil jumlah registrasi kemarin untuk menghitung tren
  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = formatDate(yesterday);
        const url = route("registration.get-registrations", { per_page: 1, date: yStr }, false);
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        const json = await res.json();
        const total = json?.data?.total ?? null;
        if (mounted) setPasienKemarinCount(total);
      } catch (e) {
        if (mounted) setPasienKemarinCount(null);
      }
    };
    run();
    return () => { mounted = false; };
  }, []);

  // ===== Grafik batang: kunjungan poli per bulan =====
  const [poliMonthly, setPoliMonthly] = useState(null);
  useEffect(() => {
    let active = true;
    const run = async () => {
      try {
        const year = new Date().getFullYear();
        const url = route("registration.poli-monthly-stats", { year, limit: 6 }, false);
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        const json = await res.json();
        if (active) setPoliMonthly(json?.data || null);
      } catch (e) {
        if (active) setPoliMonthly(null);
      }
    };
    run();
    return () => { active = false; };
  }, []);

  // Pencarian menu (mengadopsi logic dari Landing.jsx)
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const fetchMenus = async () => {
      setLoading(true);
      try {
        const url = query?.trim()
          ? route("api.menu.search", { q: query })
          : route("api.menu.popular", { limit: 8 });
        const res = await fetch(url, { signal: controller.signal });
        const json = await res.json();
        if (active) setResults(json.data || []);
      } catch (e) {
        if (active) setResults([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    const t = setTimeout(fetchMenus, 250);
    return () => {
      active = false;
      controller.abort();
      clearTimeout(t);
    };
  }, [query]);

  // Helper seperti di Landing.jsx
  const safeRoute = (name, params = {}) => {
    try {
      return route(name, params, false);
    } catch (e) {
      return "#";
    }
  };

  const aliasRoute = (raw) => {
    const slug = String(raw || "").trim().toLowerCase();
    const map = {
      "rawat-jalan": "rawat-jalan.index",
      "rawat inap": "rawat-inap.index",
      "rawat-inap": "rawat-inap.index",
      laboratorium: "laboratorium.index",
      radiologi: "radiologi.index",
      igd: "igd.index",
      farmasi: "farmasi.index",
      registration: "registration.index",
      "reg-periksa": "reg-periksa.index",
      dashboard: "dashboard",
    };
    return map[slug] || raw;
  };

  const getMenuHref = (item) => {
    if (item?.url) {
      try {
        const currentOrigin = window.location?.origin || "";
        const u = new URL(item.url, currentOrigin);
        return u.pathname + u.search + u.hash;
      } catch (_) {
        if (String(item.url).startsWith("/")) return item.url;
        return "/" + String(item.url).replace(/^https?:\/\/[^/]+/, "");
      }
    }
    if (item?.route) {
      const normalized = aliasRoute(item.route);
      return safeRoute(normalized);
    }
    return "#";
  };

  const shortcuts = useMemo(
    () => [
      { key: "register", label: "Register", href: safeRoute("registration.lanjutan"), icon: <UserPlus className="w-5 h-5" /> },
      { key: "ugd", label: "UGD", href: safeRoute("igd.index"), icon: <Ambulance className="w-5 h-5" /> },
      { key: "lab", label: "Laboratorium", href: safeRoute("laboratorium.index"), icon: <FlaskConical className="w-5 h-5" /> },
      { key: "rad", label: "Radiologi", href: safeRoute("radiologi.index"), icon: <Radiation className="w-5 h-5" /> },
      { key: "farmasi", label: "Farmasi", href: safeRoute("farmasi.index"), icon: <Pill className="w-5 h-5" /> },
      { key: "rajal", label: "Rawat Jalan", href: safeRoute("rawat-jalan.index"), icon: <Stethoscope className="w-5 h-5" /> },
      { key: "ranap", label: "Rawat Inap", href: safeRoute("rawat-inap.index"), icon: <Bed className="w-5 h-5" /> },
    ], []
  );

  // Stats dinamis yang menggunakan hasil dari endpoint
  const trendReady = pasienHariIniCount != null && pasienKemarinCount != null;
  const displayTrend = (() => {
    if (!trendReady) return "Memuat…";
    if (pasienKemarinCount === 0) {
      if (pasienHariIniCount === 0) return "0%";
      return "+∞%"; // tidak terdefinisi (kenaikan dari 0)
    }
    const diff = pasienHariIniCount - pasienKemarinCount;
    const pct = (diff / pasienKemarinCount) * 100;
    const sign = pct > 0 ? "+" : "";
    return `${sign}${pct.toFixed(1)}%`;
  })();

  const stats = [
    { label: "Pasien Hari Ini", value: pasienHariIniCount ?? "—", change: displayTrend, accent: "from-blue-500 to-indigo-500", icon: Activity },
    { label: "Kunjungan Terjadwal", value: "342", change: "+12%", accent: "from-indigo-500 to-purple-500", icon: ClipboardList },
    { label: "Integrasi SATUSEHAT", value: "Aktif", change: "98% sukses", accent: "from-emerald-500 to-teal-500", icon: ShieldCheck },
    { label: "Notifikasi Penting", value: "6", change: "Perlu tindakan", accent: "from-amber-500 to-orange-500", icon: Bell },
  ];
  return (
    <>
      <Head title="Faskesku · Selamat Datang" />
      {/* Fullscreen container tanpa sidebar/layout bawaan */}
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 p-6 space-y-8 relative z-0">
        {/* Panel statistik diletakkan di atas hero section */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {stats.map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl p-6 text-white shadow-xl shadow-blue-500/15 bg-gradient-to-br ${item.accent}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/70">
                    {item.label}
                  </p>
                  <p className="text-4xl font-extrabold mt-2">{item.value}</p>
                  <p className="text-sm text-white/85 mt-1">{item.change}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/20">
                  <item.icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </section>
        {/* Hero dengan gaya frosted glass yang lebih modern, elegan, dan profesional */}
        <motion.section
          className="relative"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            className="relative z-20 overflow-hidden rounded-2xl text-white shadow-xl shadow-indigo-800/20 ring-1 ring-white/10 bg-center bg-cover px-8 sm:px-10 py-12 sm:py-14 flex flex-col items-center justify-center gap-6"
            style={{ backgroundImage: `url('${wallpaperUrl}')` }}
          >
            {/* Tombol Keluar di pojok kanan atas */}
            <div className="absolute top-4 right-4 z-30">
              <Link
                href={route('logout')}
                method="post"
                as="button"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white ring-1 ring-white/30 backdrop-blur transition"
                preserveScroll
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-semibold">Keluar</span>
              </Link>
            </div>
            {/* Overlay halus untuk efek kilau seperti contoh kartu pada gambar */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none z-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
            {/* Top accent line tipis agar terlihat premium */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/40 via-white/20 to-transparent opacity-50" />
            {/* Konten tengah: pencarian & navigasi cepat di-center */}
            <div className="relative z-20 space-y-5 w-full max-w-3xl mx-auto text-center">
             
              {/* Nama Faskes di bawah chip "Selamat Datang" (hanya tampil jika tersedia) */}
              {(props?.settings?.nama_instansi || props?.setting?.nama_instansi || props?.nama_instansi) && (
                <p className="text-base sm:text-xl font-bold tracking-tight bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  {props?.settings?.nama_instansi || props?.setting?.nama_instansi || props?.nama_instansi}
                </p>
              )}

              {/* Search box di tengah seperti Landing */}
              <div className="mt-4">
                <div className="relative max-w-3xl mx-auto">
                  <div className="flex items-center gap-3 bg-white/95 dark:bg-gray-900/85 rounded-full shadow-xl px-5 py-3.5 border border-gray-200/70 dark:border-gray-800 ring-0 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                    <Search className="w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Cari menu… (mis. Rawat Jalan, Farmasi)"
                      className="w-full bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  {query.trim().length > 0 && results.length > 0 && (
                    <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-white/95 backdrop-blur border border-slate-200 shadow-2xl overflow-hidden z-50 pointer-events-auto">
                      <ul className="divide-y divide-slate-100">
                        {results.map((item) => {
                          const href = getMenuHref(item);
                          return (
                            <li key={item.id} className="hover:bg-slate-50">
                              <Link href={href} className="flex items-center gap-3 px-4 py-3 text-slate-800">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100">
                                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 12h16M4 6h16M4 18h16" />
                                  </svg>
                                </span>
                                <div className="flex-1">
                                  <div className="font-medium">{item.name}</div>
                                  {item.breadcrumb && (
                                    <div className="text-xs text-slate-500">{item.breadcrumb}</div>
                                  )}
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      {loading && (
                        <div className="px-4 py-3 text-xs text-slate-500">Memuat…</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Navigasi cepat di bawahnya—ukuran tombol diperkecil agar jarak antar tombol lebih terlihat */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-5 justify-items-center">
                {shortcuts.map((s) => (
                  <Link
                    key={s.key}
                    href={s.href}
                    className="group flex flex-col items-center justify-center rounded-2xl bg-white/20 hover:bg-white/30 transition text-center w-20 h-20 sm:w-24 sm:h-24"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-blue-800 shadow group-hover:scale-105 transition-transform">
                      {s.icon}
                    </div>
                    <div className="mt-2 text-xs font-semibold text-white/95 group-hover:text-white">
                      {s.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Panel grafik batang kunjungan poli per bulan + panel informasi (3/4 : 1/4) */}
        <section className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Panel kiri: 3/4 lebar untuk grafik batang */}
          <div className="xl:col-span-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-6 shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kunjungan Poli per Bulan</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tahun {poliMonthly?.year ?? new Date().getFullYear()}</p>
            </div>
            {/* Chart area */}
            <div className="mt-4">
              {!poliMonthly ? (
                <div className="text-sm text-gray-500 dark:text-gray-400">Memuat data grafik…</div>
              ) : (
                <ChartPoliMonthly data={poliMonthly} />
              )}
            </div>
          </div>
          {/* Panel kanan: 1/4 lebar untuk informasi tambahan */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Informasi</h3>
            {!poliMonthly ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Memuat ringkasan…</p>
            ) : (
              <MonthlyInfoPanel data={poliMonthly} />
            )}
          </div>
        </section>

        

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-5 shadow hover:shadow-lg transition-all flex flex-col gap-3"
                >
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex-1">
                    {item.description}
                  </p>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 inline-flex items-center gap-1">
                    Buka modul <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/85 backdrop-blur-sm p-6 shadow">
              <div className="flex items-center gap-2 mb-4">
                <Clock4 className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Aktivitas terkini
                </h3>
              </div>
              <div className="space-y-4">
                {timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span
                      className={`mt-1 w-2 h-2 rounded-full ${
                        item.status === "success"
                          ? "bg-emerald-500"
                          : item.status === "info"
                            ? "bg-blue-500"
                            : "bg-gray-400"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.meta}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white p-6 shadow-lg shadow-emerald-900/30">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-5 h-5" />
                <p className="text-sm font-medium">
                  Integrasi berjalan mulus
                </p>
              </div>
              <p className="text-sm text-white/85 mb-3">
                29 bundle RME rawat jalan berhasil dikirim dalam 24 jam terakhir tanpa error validasi.
              </p>
              <Link
                href="/satusehat/monitoring"
                className="inline-flex items-center gap-1 text-sm font-semibold"
              >
                Lihat detail
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Highlight Tim
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Update cepat dari unit operasional
            </p>
            <div className="space-y-4">
              {updates.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-slate-50/90 dark:bg-gray-800/80 text-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                    {item.label}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Tindakan prioritas
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Hal yang perlu perhatian hari ini
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1" />
                <span>Review 6 mapping lokasi baru sebelum dikirim ke SATUSEHAT.</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-blue-500 mt-1" />
                <span>Verifikasi 2 Encounter yang pending validasi.</span>
              </li>
              <li className="flex items-start gap-3">
                <UserPlus className="w-4 h-4 text-purple-500 mt-1" />
                <span>Tambahkan NIK untuk 4 dokter baru.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}

// Komponen ChartPoliMonthly: grafik batang (grouped bars) tanpa library eksternal
function ChartPoliMonthly({ data }) {
  const months = data?.months ?? [];
  const series = data?.series ?? [];
  const maxVal = Math.max(1, data?.max ?? 1);
  const totalPerMonth = months.map((_, mi) =>
    series.reduce((acc, s) => acc + (s.data?.[mi] ?? 0), 0)
  );

  // Warna untuk masing-masing seri poli (kelas Tailwind)
  const palette = [
    "from-blue-500 to-blue-600",
    "from-indigo-500 to-indigo-600",
    "from-purple-500 to-purple-600",
    "from-emerald-500 to-emerald-600",
    "from-amber-500 to-amber-600",
    "from-rose-500 to-rose-600",
    "from-cyan-500 to-cyan-600",
  ];
  const borderPalette = [
    "border-blue-600/40",
    "border-indigo-600/40",
    "border-purple-600/40",
    "border-emerald-600/40",
    "border-amber-600/40",
    "border-rose-600/40",
    "border-cyan-600/40",
  ];
  const colors = series.map((_, idx) => palette[idx % palette.length]);
  const borders = series.map((_, idx) => borderPalette[idx % borderPalette.length]);

  // Ukuran chart
  const chartHeight = 240; // px
  const groupWidth = 54; // px untuk tiap bulan
  const barWidth = Math.max(7, Math.min(12, Math.floor(30 / Math.max(1, series.length))));
  const barGap = 4; // px antar bar dalam grup

  // Axis labels (4 garis + 0)
  const axisSteps = [0, 0.25, 0.5, 0.75, 1];

  const [hover, setHover] = React.useState(null); // { mi, si, val }
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-300">
        {series.length === 0 ? (
          <span className="text-gray-500 dark:text-gray-400">Tidak ada data poli</span>
        ) : (
          series.map((s, idx) => (
            <div key={s.kd_poli} className="inline-flex items-center gap-2">
              <span className={`inline-block w-3 h-3 rounded bg-gradient-to-br ${colors[idx]} ring-1 ${borders[idx]}`} />
              <span className="font-medium">{s.nm_poli}</span>
            </div>
          ))
        )}
      </div>

      {/* Tooltip */}
      {hover && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-10">
          <div className="px-3 py-2 rounded-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-gray-200 dark:border-gray-800 shadow text-xs text-gray-700 dark:text-gray-200">
            <div className="font-semibold text-gray-900 dark:text-white">{months[hover.mi]}</div>
            <div className="mt-0.5">{series[hover.si]?.nm_poli}</div>
            <div className="mt-0.5 font-mono">
              {hover.val} kunjungan
              {totalPerMonth[hover.mi] > 0 && (
                <span className="text-gray-500 dark:text-gray-400"> · {(hover.val / totalPerMonth[hover.mi] * 100).toFixed(1)}%</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chart grid + bars */}
      <div className="mt-4">
        <div className="relative">
          {/* Axis labels (left) */}
          {axisSteps.map((step, i) => (
            <div key={i} className="absolute -left-12 text-[10px] text-gray-500 dark:text-gray-400" style={{ top: (1 - step) * chartHeight - 6 }}>
              {Math.round(maxVal * step)}
            </div>
          ))}
          {/* Y-grid dashed */}
          {axisSteps.map((step, i) => (
            <div key={`g-${i}`} className="absolute left-0 right-0" style={{ top: (1 - step) * chartHeight }}>
              <div className="border-t border-dashed border-gray-200 dark:border-gray-800" />
            </div>
          ))}

          {/* Bars container */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="flex items-end gap-4" style={{ height: chartHeight }}>
                {months.map((m, mi) => (
                  <div key={m + mi} className="flex items-end" style={{ width: groupWidth }}>
                    {/* Bars per poli */}
                    <div className="flex items-end" style={{ gap: barGap }}>
                      {series.map((s, si) => {
                        const val = s.data?.[mi] ?? 0;
                        const h = Math.round((val / maxVal) * chartHeight);
                        return (
                          <div key={s.kd_poli + mi} className="flex flex-col items-center" style={{ width: barWidth }}>
                            <div
                              className={`w-full bg-gradient-to-t ${colors[si]} rounded-md shadow-sm ring-1 ${borders[si]}`}
                              style={{
                                height: mounted ? h : 0,
                                transition: "height 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                              }}
                              onMouseEnter={() => setHover({ mi, si, val })}
                              onMouseLeave={() => setHover(null)}
                              aria-label={`${s.nm_poli} ${m}: ${val}`}
                            />
                            {h > 22 && (
                              <div className="mt-1 text-[10px] text-gray-600 dark:text-gray-300 font-mono">{val}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {months.map((m) => (
              <div key={m + "lbl"} style={{ width: groupWidth }} className="text-center">
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Panel informasi: ringkasan top poli & total setahun
function MonthlyInfoPanel({ data }) {
  const series = data?.series ?? [];
  const year = data?.year ?? new Date().getFullYear();

  const ranked = [...series].sort((a, b) => (b.total ?? 0) - (a.total ?? 0));
  const totalAll = ranked.reduce((acc, s) => acc + (s.total ?? 0), 0);

  return (
    <div className="space-y-4 text-sm">
      <p className="text-gray-600 dark:text-gray-300">Ringkasan kunjungan tahun {year}</p>
      <div className="rounded-xl bg-gradient-to-br from-slate-50/80 to-slate-100/60 dark:from-gray-800/60 dark:to-gray-800/40 border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-200 font-medium">Total semua poli</span>
          <span className="text-gray-900 dark:text-white font-semibold">{totalAll}</span>
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Top poli (berdasarkan total setahun)</p>
        <ul className="space-y-2">
          {ranked.map((s) => (
            <li key={s.kd_poli}>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-200">{s.nm_poli}</span>
                <span className="text-gray-900 dark:text-white font-semibold">{s.total}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

