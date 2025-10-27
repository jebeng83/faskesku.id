import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';

// Halaman Menu Utama Profil Aplikasi
// Menyajikan 3 tab: Setting Aplikasi, Setting Hak Akses, Briding BPJS

const tabs = [
  { key: 'app', label: 'Setting Aplikasi' },
  { key: 'access', label: 'Setting Hak Akses' },
  { key: 'bpjs', label: 'Briding BPJS' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.045 } },
};

const cardsByTab = {
  app: [
    { key: 'pref', title: 'Preferensi Sistem', desc: 'Pengaturan dasar aplikasi', href: '#' },
    { key: 'tema', title: 'Tema & Tampilan', desc: 'Mode gelap, warna, layout', href: '#' },
    { key: 'integrasi', title: 'Integrasi & API', desc: 'Konfigurasi layanan eksternal', href: '#' },
    { key: 'info', title: 'Informasi Sistem', desc: 'Versi dan status modul', href: '#' },
  ],
  access: [
    { key: 'roles', title: 'Roles & Permissions', desc: 'Kelola hak akses', href: '/permissions' },
    { key: 'users', title: 'Manajemen Pengguna', desc: 'Kelola akun & akses', href: '/users' },
    { key: 'menus', title: 'Manajemen Menu', desc: 'Struktur dan izin menu', href: '/menus' },
  ],
  bpjs: [
    { key: 'pcare', title: 'Bridging PCare', desc: 'Menu modul PCare', href: '/pcare/setting' },
    { key: 'vclaim', title: 'Bridging VClaim', desc: 'Konten akan hadir', href: '#' },
  ],
};

export default function ProfileIndex() {
  const [activeTab, setActiveTab] = useState('app');
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Profil Aplikasi</h1>
          <p className="text-xs text-slate-500">Menu utama untuk pengaturan aplikasi, akses, dan bridging BPJS.</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">v1.0</span>
      </div>

      {/* Tabs */}
      <div className="mb-3 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActiveTab(t.key)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
              activeTab === t.key
                ? 'bg-slate-100 text-slate-800 border-slate-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {cardsByTab[activeTab].map((item) => (
          <motion.a
            href={item.href}
            key={item.key}
            variants={cardVariants}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-colors hover:border-slate-300 hover:bg-white hover:shadow-md min-h-[110px]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-sky-600 text-white shadow">
              {/* Simple icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h16M4 12h10M4 18h7" />
              </svg>
            </div>
            <div className="mt-2">
              <div className="text-slate-800 font-semibold leading-tight">
                {item.title} <span className="text-slate-400">›</span>
              </div>
              <div className="text-slate-500 text-xs">{item.desc}</div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Footer Note */}
      <div className="mt-4 text-[10px] text-slate-400">Tip: Gunakan tab di atas untuk berpindah kategori pengaturan.</div>
    </div>
  );
}

// Layout: render di dalam AppLayout global
ProfileIndex.layout = (page) => <AppLayout title="Profil Aplikasi" children={page} />;