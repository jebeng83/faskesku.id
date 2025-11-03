import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';

// Pcare Menu Page
// - 3 Tabs: Referensi Pcare, Mapping Pcare, Layanan Pcare
// - TailwindCSS + Framer Motion
// - Contoh berdasarkan public/index.jsx

const tabs = [
  { key: 'referensi', label: 'Referensi Pcare' },
  { key: 'mapping', label: 'Mapping Pcare' },
  { key: 'layanan', label: 'Layanan Pcare' },
  { key: 'kelompok', label: 'Kegiatan Kelompok' },
  { key: 'setting', label: 'Setting & Tools' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.04 } },
};

const cardsByTab = {
  referensi: [
    {
      key: 'refPoli',
      title: 'Referensi Poli',
      desc: 'Daftar poli FKTP',
      href: '/pcare/referensi/poli',
      gradient: 'from-amber-500 to-orange-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 12h18" />
          <path d="M12 3v18" />
        </svg>
      )
    },
    {
      key: 'refDokter',
      title: 'Referensi Dokter',
      desc: 'Daftar dokter FKTP',
      href: '/pcare/referensi/dokter',
      gradient: 'from-rose-500 to-red-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
          <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        </svg>
      )
    },
    {
      key: 'refPoliMobileJkn',
      title: 'Referensi Poli Mobile Jkn',
      desc: 'Daftar poli dari Mobile JKN',
      href: '/pcare/referensi-mobilejkn/poli',
      gradient: 'from-emerald-500 to-teal-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 6h16M4 12h10M4 18h7" />
        </svg>
      )
    },
    {
      key: 'refDokterMobileJkn',
      title: 'Referensi Dokter Mobile Jkn',
      desc: 'Daftar dokter dari Mobile JKN',
      href: '/pcare/referensi-mobilejkn/dokter',
      gradient: 'from-teal-500 to-emerald-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
          <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        </svg>
      )
    },
    {
      key: 'refDiagnosa',
      title: 'Referensi Diagnosa',
      desc: 'Daftar referensi diagnosa PCare',
      href: '/pcare/referensi/diagnosa',
      gradient: 'from-violet-500 to-purple-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 7v6" />
          <path d="M12 16h.01" />
        </svg>
      )
    },
    {
      key: 'refKesadaran',
      title: 'Referensi Kesadaran',
      desc: 'Daftar tingkat kesadaran',
      href: '/pcare/referensi/kesadaran',
      gradient: 'from-yellow-500 to-amber-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
          <path d="M8 10h8M7 14h10" />
        </svg>
      )
    },
    {
      key: 'refSpesialis',
      title: 'Referensi Spesialis Pcare',
      desc: 'Daftar spesialis PCare',
      href: '/pcare/referensi/spesialis',
      gradient: 'from-purple-500 to-violet-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v6" />
          <path d="M9 9h6" />
          <circle cx="12" cy="15" r="5" />
        </svg>
      )
    },
    {
      key: 'refSubSpesialis',
      title: 'Referensi Sub Spesialis Pcare',
      desc: 'Daftar sub-spesialis berdasarkan spesialis',
      href: '/pcare/referensi/subspesialis',
      gradient: 'from-cyan-500 to-sky-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 6v6" />
          <path d="M9 12h6" />
          <circle cx="12" cy="17" r="4" />
        </svg>
      )
    },
    {
      key: 'refDpho',
      title: 'Referensi DPHO',
      desc: 'Daftar obat DPHO (PCare)',
      href: '/pcare/referensi/dpho',
      gradient: 'from-teal-500 to-emerald-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="12" rx="2" />
          <path d="M8 10h8M8 14h8" />
        </svg>
      )
    },
    {
      key: 'refTindakan',
      title: 'Referensi Tindakan',
      desc: 'Daftar tindakan PCare',
      href: '/pcare/referensi/tindakan',
      gradient: 'from-lime-500 to-green-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12h6" />
          <path d="M12 9v6" />
          <rect x="4" y="4" width="16" height="16" rx="3" />
        </svg>
      )
    },
    {
      key: 'refProvider',
      title: 'Referensi Provider PCare',
      desc: 'Daftar provider rayonisasi',
      href: '/pcare/referensi/provider',
      gradient: 'from-cyan-500 to-sky-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 11h18" />
          <path d="M6 11V7h3v4M15 11V5h3v6" />
          <path d="M5 18h14" />
        </svg>
      )
    },
    {
      key: 'refSarana',
      title: 'Referensi Sarana Pcare',
      desc: 'Daftar sarana PCare',
      href: '/pcare/referensi/sarana',
      gradient: 'from-sky-500 to-indigo-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="12" rx="2" />
          <path d="M8 10h8M8 14h5" />
        </svg>
      )
    },
    {
      key: 'refPrognosa',
      title: 'Referensi Prognosa Pcare',
      desc: 'Daftar prognosa PCare',
      href: '/pcare/referensi/prognosa',
      gradient: 'from-violet-500 to-purple-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="12" rx="2" />
          <path d="M8 10h8M8 14h5" />
        </svg>
      )
    },
    {
      key: 'refKhusus',
      title: 'Referensi Khusus Pcare',
      desc: 'Daftar referensi khusus PCare',
      href: '/pcare/referensi/khusus',
      gradient: 'from-fuchsia-500 to-pink-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v6" />
          <path d="M9 9h6" />
          <circle cx="12" cy="15" r="5" />
        </svg>
      )
    },
    {
      key: 'refStatusPulang',
      title: 'Referensi Status Pulang Pcare',
      desc: 'Daftar status pulang (RI/RJ)',
      href: '/pcare/referensi/statuspulang',
      gradient: 'from-orange-500 to-amber-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 7h10v10H4z" />
          <path d="M14 12h6" />
          <path d="M18 9l3 3-3 3" />
        </svg>
      )
    },
    {
      key: 'refAlergi',
      title: 'Referensi Alergi Pcare',
      desc: 'Daftar alergi (Makanan/Udara/Obat)',
      href: '/pcare/referensi/alergi',
      gradient: 'from-rose-500 to-red-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
          <path d="M8 12l4-4 4 4" />
          <path d="M8 16h8" />
        </svg>
      )
    },
    {
      key: 'refFaskesRujukan',
      title: 'Referensi Faskes Rujukan Pcare',
      desc: 'Daftar faskes rujukan subspesialis',
      href: '/pcare/referensi/faskes-rujukan',
      gradient: 'from-indigo-500 to-sky-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 4h18" />
          <path d="M6 8h12" />
          <path d="M6 12h12" />
          <path d="M6 16h12" />
        </svg>
      )
    },
  ],
  mapping: [
    {
      key: 'mapPoli',
      title: 'Mapping Poli PCare',
      desc: 'Map kode poli RS → PCare',
      href: '/pcare/mapping/poli',
      gradient: 'from-cyan-500 to-sky-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 6h16M4 12h10M4 18h7" />
        </svg>
      )
    },
    {
      key: 'mapDokter',
      title: 'Mapping Dokter PCare',
      desc: 'Map dokter RS → PCare',
      href: '#',
      gradient: 'from-fuchsia-500 to-pink-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      )
    },
  ],
  kelompok: [
    {
      key: 'clubProlanis',
      title: 'Club Prolanis',
      desc: 'Daftar Club Prolanis (DM/Hipertensi)',
      href: '/pcare/kelompok/club-prolanis',
      gradient: 'from-indigo-500 to-purple-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 6h16M4 12h10M4 18h7" />
        </svg>
      )
    },
    {
      key: 'entriKegiatan',
      title: 'Entri Kegiatan',
      desc: 'Form entri + daftar hadir',
      href: '/pcare/kelompok/entri',
      gradient: 'from-emerald-500 to-teal-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 6h16M4 12h10M4 18h7" />
        </svg>
      )
    },
    {
      key: 'kegiatanKelompok',
      title: 'Kegiatan Kelompok',
      desc: 'Form & data kegiatan per bulan',
      href: '/pcare/kelompok/kegiatan',
      gradient: 'from-sky-500 to-blue-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      )
    },
    {
      key: 'pesertaKegiatan',
      title: 'Peserta Kegiatan',
      desc: 'Data peserta per eduId',
      href: '/pcare/kelompok/peserta-kegiatan',
      gradient: 'from-amber-500 to-orange-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <path d="M3 20c0-3.866 3.582-7 8-7s8 3.134 8 7" />
        </svg>
      )
    },
  ],
  layanan: [
    {
      key: 'formPendaftaran',
      title: 'Form Pendaftaran',
      desc: 'Daftarkan peserta ke PCare',
      href: '/pcare/form-pendaftaran',
      gradient: 'from-blue-500 to-indigo-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 6h16M4 12h10M4 18h7" />
        </svg>
      )
    },
    {
      key: 'statusPendaftaran',
      title: 'Status Pendaftaran',
      desc: 'Lihat status terkini',
      href: '/pcare/status-pendaftaran',
      gradient: 'from-sky-500 to-blue-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 16l4-4 3 3 5-7" />
        </svg>
      )
    },
    {
      key: 'dataPendaftaran',
      title: 'Data Pendaftaran',
      desc: 'Daftar & detail pendaftaran',
      href: '/pcare/data-pendaftaran',
      gradient: 'from-emerald-500 to-teal-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 6h16M4 12h10M4 18h7" />
        </svg>
      )
    },
    {
      key: 'cekPesertaNik',
      title: 'Cek Peserta by NIK',
      desc: 'Cari data peserta BPJS',
      href: '/pcare/data-peserta-by-nik',
      gradient: 'from-indigo-500 to-purple-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="12" rx="2" />
          <path d="M8 20h8" />
        </svg>
      )
    },
    {
      key: 'dataKunjungan',
      title: 'Data Kunjungan',
      desc: 'Kunjungan pasien PCare',
      href: '/pcare/data-kunjungan',
      gradient: 'from-lime-500 to-green-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      )
    },
  ],
  setting: [
    {
      key: 'settingPcare',
      title: 'Setting Bridging PCare',
      desc: 'Konfigurasi kredensial PCare',
      href: '/pcare/setting',
      gradient: 'from-indigo-500 to-sky-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3l8 4-8 4-8-4 8-4z" />
          <path d="M4 7v6l8 4 8-4V7" />
        </svg>
      )
    },
    {
      key: 'settingMobileJkn',
      title: 'Setting Bridging Mobile JKN',
      desc: 'Konfigurasi kredensial Mobile JKN',
      href: '/pcare/setting-mobilejkn',
      gradient: 'from-emerald-500 to-teal-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 6h16M4 12h10M4 18h7" />
        </svg>
      )
    },
  ],
};

export default function PcareMenu() {
  const [activeTab, setActiveTab] = useState('layanan');
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Menu PCare</h1>
          <p className="text-xs text-slate-500">Akses cepat ke fitur utama PCare BPJS</p>
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
        animate="visible"
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
            <div className={`flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br ${item.gradient} text-white shadow`}>
              {item.icon}
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
      <div className="mt-4 text-[10px] text-slate-400">Tip: Pilih tab untuk melihat kartu terkait.</div>
    </div>
  );
}

// Attach the application layout so this page renders inside the global sidebar/header
PcareMenu.layout = (page) => <AppLayout title="Bridging Pcare" children={page} />;