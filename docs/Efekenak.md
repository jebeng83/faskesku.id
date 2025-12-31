# Efek Enak: Pola Klik & Tampilan Detail di Manajemen Dokter

Dokumen ini merangkum pengaturan, efek, dan tools yang digunakan di halaman Manajemen Dokter untuk menghadirkan pengalaman klik dan tampilan detail yang lembut dan nyaman. Referensi utama: [Index.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Doctor/Index.jsx).

## Tools & Library
- React (state & lifecycle): useState, useEffect, useMemo
- Framer Motion: motion, AnimatePresence, variants untuk animasi halus
- Inertia React: router untuk aksi CRUD dan navigasi
- Tailwind CSS: layout responsif, warna lembut, backdrop blur
- Lucide Icons: ikon ringan dan konsisten

## State & Alur Data
- State utama:
  - selectedDoctor: data dokter yang sedang dipilih
  - searchTerm, filterSpesialis, filterStatus: kontrol filter list
  - filteredDoctors: hasil filter dari daftar dokter
- Default pemilihan: saat daftar terfilter berubah, otomatis memilih item pertama.
  - Lihat: [Index.jsx:L79-L83](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Doctor/Index.jsx#L79-L83)

## Pola Interaksi Klik
- List dokter dirender sebagai kartu; setiap kartu memiliki onClick yang menetapkan selectedDoctor.
  - Klik kartu: [Index.jsx:L258-L264](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Doctor/Index.jsx#L258-L264)
  - Handler pemilihan: [Index.jsx:L118-L120](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Doctor/Index.jsx#L118-L120)

## Tampilan Detail di Panel Kanan
- Panel kanan merender komponen detail berdasarkan selectedDoctor.
  - Render: [Index.jsx:L332-L336](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Doctor/Index.jsx#L332-L336)
- Header panel kanan dihilangkan untuk kesederhanaan visual; fokus pada konten detail.

## Efek Animasi & Rasa Halus
- Variants terkoordinasi:
  - containerVariants: staggerChildren untuk animasi beruntun
  - itemVariants: fade-in + translate + scale halus (ease cubic bezier)
  - cardVariants: hover scale kecil + offset Y
  - Lihat definisi: [Index.jsx:L10-L43](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Doctor/Index.jsx#L10-L43)
- AnimatePresence mengelola transisi saat daftar kosong/terisi.
  - Penggunaan: [Index.jsx:L231-L246](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Doctor/Index.jsx#L231-L246)
- Preferensi reduce motion:
  - Menghormati prefers-reduced-motion dan mematikan animasi jika perlu.
  - Lihat: [Index.jsx:L54-L56](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Doctor/Index.jsx#L54-L56)

## Pola Styling yang Nyaman
- Kartu dengan border tipis + shadow ringan; hover terasa halus.
- Gradien lembut + backdrop-blur untuk lapisan visual tanpa mengganggu.
- Badge in-line di satu baris dengan teks kode; warna pastel dan border tipis.
  - Badge baris: [Index.jsx:L269-L288](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Doctor/Index.jsx#L269-L288)

## Template Replikasi untuk Form Lain
1. Siapkan state selectedItem dan daftar terfilter.
2. Pada daftar, terapkan motion.div dengan variants dan whileHover untuk kartu.
3. onClick kartu: setSelectedItem(item) agar panel detail merender item aktif.
4. Gunakan AnimatePresence untuk transisi kosong/terisi dan perubahan isi.
5. Hormati prefers-reduced-motion via useMemo dan toggling animasi.
6. Terapkan Tailwind dengan warna pastel, border tipis, dan backdrop-blur jika perlu.
7. Pertahankan layout dua kolom: kiri (list), kanan (detail) untuk fokus.

## Cuplikan Minimal (Tanpa Komentar)

```jsx
const [selectedItem, setSelectedItem] = useState(null);

<motion.div variants={containerVariants}>
  {items.map((it) => (
    <motion.div
      key={it.id}
      variants={cardVariants}
      whileHover="hover"
      onClick={() => setSelectedItem(it)}
    >
      {it.title}
    </motion.div>
  ))}
</motion.div>

<AnimatePresence>
  <motion.div variants={itemVariants}>
    <Detail data={selectedItem} />
  </motion.div>
</AnimatePresence>
```

