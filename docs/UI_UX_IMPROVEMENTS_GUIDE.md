# Panduan Perbaikan UI/UX dengan React + Tailwind CSS + Framer Motion

## Ringkasan

Dokumen ini menjelaskan pola dan teknik UI/UX modern berbasis React + Tailwind CSS + Framer Motion yang bersifat **global** untuk seluruh aplikasi (SATUSEHAT, RME, Farmasi, PCare, dll). Gunakan panduan ini sebagai acuan desain agar setiap modul memiliki bahasa visual yang sama—ringan, profesional, dan elegan.

**File Referensi:** `resources/js/Pages/SatuSehat/Prerequisites/SatuSehatOrganization.jsx`

---

## 21. Input Field — Border & Icon Alignment

### 21.1 Pola Border Halus dan Konsisten

**Pola:**

```jsx
<div className="relative">
  <input
    type="text"
    placeholder="Nama pasien / No Nota"
    className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors placeholder:text-gray-400 text-sm h-10 pl-10 pr-3"
  />
  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
}</div>
```

**Penjelasan:**
- Border lembut menggunakan `ring-1` dengan opacity agar batas terlihat jelas namun tidak keras.
- Glassmorphism ringan: `bg-white/90 dark:bg-gray-800/90` dan `backdrop-blur-sm` menjaga kesan modern.
- Fokus nyaman: `focus:ring-2 focus:ring-blue-500/50` menambah aksen biru saat fokus.
- Placeholder: gunakan `placeholder:text-gray-400` untuk kontras yang baik tanpa terlalu kuat.
- Ukuran dan ruang: `text-sm h-10` untuk tinggi konsisten; `pl-10 pr-3` memberi ruang placeholder agar sejajar dengan ikon.
- Ikon: posisikan dengan `absolute left-3 top-1/2 -translate-y-1/2` dan `pointer-events-none` agar tidak mengganggu interaksi input.
- Dark mode: gunakan varian `dark:ring-gray-600/60` dan `dark:bg-gray-800/90` untuk konsistensi.

### 21.2 Varian Input Tanpa Ikon

**Pola:**

```jsx
<input
  type="text"
  placeholder="Kode/Nama Petugas"
  className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-colors placeholder:text-gray-400 text-sm h-10 px-3"
/>
```

**Penjelasan:**
- Tanpa ikon: gunakan `px-3` (bukan `pl-10`) agar teks sejajar simetris di dalam field.
- Tetap gunakan pola border, focus ring, dan glassmorphism yang sama untuk konsistensi.

### 21.3 Pedoman Alignment Ikon & Placeholder

- Tinggi input: `h-10` agar ikon dan teks berada pada satu garis tengah secara visual.
- Ikon ukuran: `w-4 h-4` untuk skala yang proporsional terhadap `text-sm`.
- Jarak kiri ikon: `left-3`; padding kiri input: `pl-10` untuk memberi ruang cukup.
- Non-interaktif: `pointer-events-none` pada ikon agar tidak mengganggu klik/seleksi teks.
- Responsif warna: gunakan varian `dark:` dan `transition-colors` agar transisi halus saat focus/hover.

## 22. Cetak Dokumen — Letterhead & Layout

### 22.1 Prinsip Umum

- Gunakan HTML + CSS inline agar output cetak konsisten tanpa ketergantungan aset eksternal.
- Font keluarga sans-serif dengan skala kecil-menengah untuk keterbacaan: ui-sans-serif, system-ui, Segoe UI, Roboto.
- Warna netral dan kontras baik pada printer: abu-abu muda untuk header, teks gelap untuk konten.
- Tabel zebra untuk memudahkan pemindaian baris; border bawah tipis pada setiap baris.
- Tambahkan meta informasi filter (tanggal, shift, dsb.) di bawah judul.
- Sediakan bagian ringkasan (kartu kecil) untuk angka agregat: Modal Awal, Uang Masuk, Total.

### 22.2 Sumber Data Letterhead (tabel `setting`)

- Kolom yang dianjurkan: `nama_instansi`, `alamat_instansi`, `kabupaten`, `propinsi`, `kontak`, `email`.
- Jika ada kolom `aktifkan`, pilih baris dengan nilai `Yes`; jika tidak ada, gunakan baris pertama.
- Logo diambil via endpoint: `/setting/app/{nama_instansi}/logo`.
- Susun alamat sebagai gabungan: `alamat_instansi` + `kabupaten propinsi` bila tersedia.

### 22.3 Skeleton HTML Cetak

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>Judul Dokumen</title>
    <style>
      body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Noto Sans", sans-serif; line-height: 1.5; color: #111827; padding: 24px; }
      .letterhead { display: flex; align-items: center; gap: 16px; border-bottom: 2px solid #1f2937; padding-bottom: 12px; margin-bottom: 20px; }
      .logo { width: 72px; height: 72px; object-fit: contain; }
      .org { flex: 1; }
      .org h1 { font-size: 18px; font-weight: 700; margin: 0; color: #0f172a; }
      .org p { margin: 2px 0; font-size: 12px; color: #374151; }
      .title { text-align: center; font-size: 16px; font-weight: 600; margin: 8px 0 16px; color: #0f172a; }
      .meta { text-align: center; font-size: 12px; color: #6b7280; margin-bottom: 12px; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; }
      thead th { background: #f3f4f6; color: #111827; text-align: left; padding: 8px; border-bottom: 1px solid #e5e7eb; }
      tbody td { padding: 8px; border-bottom: 1px solid #f3f4f6; }
      tbody tr:nth-child(even) { background: #fafafa; }
      .summary { margin-top: 16px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
      .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
      .card .label { font-size: 11px; color: #6b7280; }
      .card .value { font-size: 14px; font-weight: 600; color: #111827; }
      @media print { thead th { background: #eee !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    </style>
  </head>
  <body>
    <div class="letterhead">
      <img class="logo" src="/setting/app/Nama%20Instansi/logo" alt="Logo" />
      <div class="org">
        <h1>Nama Instansi</h1>
        <p>Alamat • Kabupaten Propinsi</p>
        <p>Kontak • Email</p>
      </div>
    </div>

    <div class="title">Judul Laporan</div>
    <div class="meta">Tanggal: 2025-01-01 • Shift: Semua</div>

    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tanggal</th>
          <th>Shift</th>
          <th>No Nota</th>
          <th>Nama Pasien</th>
          <th>Pembayaran</th>
          <th>Petugas</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2025-01-01 08:00</td>
          <td>Pagi</td>
          <td>NT001</td>
          <td>Nama</td>
          <td>100.000,00</td>
          <td>Petugas</td>
        </tr>
      </tbody>
    </table>

    <div class="summary">
      <div class="card"><div class="label">Modal Awal</div><div class="value">0,00</div></div>
      <div class="card"><div class="label">Uang Masuk</div><div class="value">0,00</div></div>
      <div class="card"><div class="label">Total</div><div class="value">0,00</div></div>
    </div>
  </body>
</html>
```

### 22.4 Struktur Konten

- Letterhead: logo (opsional), nama instansi, alamat, kontak/email.
- Judul: gunakan kalimat singkat dan deskriptif.
- Meta: tampilkan nilai filter aktif seperti tanggal dan shift.
- Tabel: kolom relevan, zebra striping, border bawah tipis.
- Ringkasan: tiga kartu angka agregat dengan label dan nilai.

### 22.5 Praktik CSS untuk Cetak

- Gunakan `print-color-adjust: exact` pada header tabel agar background abu-abu tercetak.
- Hindari bayangan tebal; gunakan border tipis untuk pemisahan.
- Ukuran font 12–14px untuk konten; 16–18px untuk judul.
- Hindari lebar tetap; gunakan lebar 100% pada tabel.

### 22.6 Endpoint Contoh

- Payment Point: `GET /api/payment-point/report?date=YYYY-MM-DD&shift=Semua&q=&user=`.
- Buka di tab baru dari UI dengan `window.open(url, "_blank")` saat pengguna menekan tombol Cetak.

### 22.7 Checklist Kualitas Cetak

- Data letterhead terisi dan logo tampil bila tersedia.
- Judul, meta, tabel, dan ringkasan tersaji rapi tanpa potongan halaman aneh.
- Angka uang diformat sesuai Indonesia (IDR) dengan pemisah `,` dan `.`.
- Background header tabel tercetak pada printer umum.

## 0. Strategi UI/UX Global

### 0.1 Bahasa Desain
- **Identitas:** gunakan kombinasi glassmorphism + gradient lembut dengan aksen biru/indigo/purple untuk semua modul.
- **Komponen Reusable:** ekstrak pola utama (Card, SectionHeader, DataTable, Modal, Toast, Form Field) ke library internal agar konsisten.
- **Dark Mode:** tiap komponen wajib mendukung `dark:` utilitas Tailwind dan theme switcher global.

### 0.2 Grid & Layout
- **Grid 12 kolom** (container max-w-7xl) untuk desktop; `gap-6` antar section.
- **Responsive**: mobile-first, gunakan `sm/md/lg` breakpoint standar Tailwind. Tabel besar di-break menjadi card stack saat < md.
- **Spacing**: gunakan skala `space-4/6/8/12` agar konsisten antar modul.

### 0.3 Typography & Iconography
- Heading: `text-2xl/3xl/4xl` (font-bold). Body: `text-sm/ base`. Helper: `text-xs`.
- Gunakan `lucide-react` sebagai sumber icon tunggal. Set ukuran default 16px, gunakan gradient badge saat diperlukan.

### 0.4 Interaksi
- Gunakan **Framer Motion** untuk micro-interactions yang konsisten (stagger container, hover animate, modal transitions).
- Gunakan `prefers-reduced-motion` fallback untuk pengguna dengan sensitivitas animasi.

### 0.5 State Management UX
- **Loading**: skeleton loader atau pulse card.  
- **Empty**: icon state + call-to-action.  
- **Error**: format “Apa yang terjadi — Penyebab — Langkah berikut”.
- **Toast**: satu komponen global dengan varian success/info/warning/error.

### 0.6 Accessibility & Internationalization
- Pastikan kontras warna min. 4.5:1.  
- Tambahkan `aria-label` pada tombol ikon.  
- Siapkan struktur i18n (JSON) agar teks mudah dialihbahasakan jika diperlukan.

### 0.7 Performance
- Gunakan dynamic import / lazy load untuk modul berat.  
- Cache data dengan React Query / SWR untuk navigasi instan antar halaman.  
- Optimalkan gambar/icon (SVG inline).  
- Audit bundel dengan `npm run build --analyze` secara berkala.

---

## 1. Prinsip Desain

### 1.1 Glassmorphism Effect
Menggunakan efek kaca buram (frosted glass) untuk memberikan kedalaman visual modern.

**Pola CSS:**
```jsx
className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50"
```

**Penjelasan:**
- `bg-white/90` - Background putih dengan opacity 90%
- `backdrop-blur-xl` - Efek blur pada background di belakang elemen
- `border-white/20` - Border transparan untuk efek glassmorphism
- `dark:` - Variasi untuk dark mode

### 1.2 Gradient Backgrounds
Menggunakan gradient untuk memberikan kesan modern dan dinamis.

**Pola CSS:**
```jsx
className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"
```

**Penjelasan:**
- `bg-gradient-to-br` - Gradient dari atas kiri ke bawah kanan
- `from-slate-50 via-blue-50/30 to-indigo-50/50` - Warna gradient dengan opacity
- `dark:` - Variasi untuk dark mode

### 1.3 Shadow & Depth
Menggunakan shadow untuk memberikan efek kedalaman.

**Pola CSS:**
```jsx
className="shadow-xl shadow-blue-500/5"
```

**Penjelasan:**
- `shadow-xl` - Shadow besar
- `shadow-blue-500/5` - Shadow dengan warna biru dan opacity rendah

---

## 2. Struktur Komponen

### 2.1 Container dengan Animasi Stagger

**Pola:**
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,  // Delay antar child
      delayChildren: 0.1,     // Delay awal
    },
  },
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {/* Children dengan itemVariants */}
</motion.div>
```

**Penjelasan:**
- `staggerChildren` - Delay antar animasi child
- `delayChildren` - Delay sebelum animasi dimulai
- Membuat efek cascade saat komponen muncul

### 2.2 Item Variants untuk Animasi Individual

**Pola:**
```jsx
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // Custom easing curve
    },
  },
};

<motion.div variants={itemVariants}>
  {/* Content */}
</motion.div>
```

**Penjelasan:**
- `y: 30` - Mulai dari posisi 30px di bawah
- `scale: 0.95` - Mulai dari ukuran 95%
- `ease: [0.22, 1, 0.36, 1]` - Custom bezier curve untuk animasi halus

### 2.3 Hover Effects

**Pola:**
```jsx
const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.01,
    y: -4,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

<motion.div
  variants={cardHoverVariants}
  initial="rest"
  whileHover="hover"
>
  {/* Content */}
</motion.div>
```

**Penjelasan:**
- `scale: 1.01` - Sedikit membesar saat hover
- `y: -4` - Bergerak ke atas 4px saat hover
- Memberikan feedback visual yang halus

---

## 3. Komponen Header

### 3.1 Page Header Compact dengan Gradien (Standar Baru)

**Pola Lengkap untuk Page Header:**
```jsx
<motion.div
  variants={itemVariants}
  className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-6"
>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <div>
      <motion.h1
        className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Judul Halaman
      </motion.h1>
    </div>
  </div>
</motion.div>
```

**Elemen Penting:**
- **Padding**: `px-6 py-4` (compact, bukan `p-8`)
- **Background**: Gradien lembut `from-blue-50/80 via-indigo-50/80 to-purple-50/80` dengan opacity 80%
- **Dark Mode**: `dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80`
- **Backdrop Blur**: `backdrop-blur-sm` untuk efek glassmorphism
- **Border**: `border-b border-gray-200/50` dengan opacity 50%
- **Rounded**: `rounded-lg` untuk sudut membulat
- **Font Size**: `text-xl sm:text-2xl` (responsive)
- **Text Gradient**: `bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent`
- **Animation**: Fade in + slide dari kiri dengan delay 0.2s

**Referensi Implementasi:**
- `resources/js/Pages/Laboratorium/Index.jsx` (line 955-973)
- `resources/js/Pages/RawatJalan/Index.jsx` (line 209-222)

### 3.2 Header dengan Glassmorphism (Untuk Card Header)

**Pola Lengkap:**
```jsx
<motion.div
  variants={itemVariants}
  className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-8"
>
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
  
  {/* Content */}
  <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
    {/* Title & Description */}
  </div>
</motion.div>
```

**Elemen Penting:**
- `relative` - Untuk positioning overlay
- `absolute inset-0` - Overlay gradient menutupi seluruh area
- `relative` pada content - Agar content berada di atas overlay

### 3.3 Icon dengan Gradient Background

**Pola:**
```jsx
<motion.div
  className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  <Building2 className="w-6 h-6 text-white" />
</motion.div>
```

**Penjelasan:**
- Gradient background untuk icon
- Shadow dengan warna matching
- Animasi entrance terpisah

### 3.4 Gradient Text

**Pola untuk Page Header (Compact):**
```jsx
<motion.h1
  className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  Judul Halaman
</motion.h1>
```

**Pola untuk Section Header (Larger):**
```jsx
<motion.h1
  className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
>
  Judul Halaman
</motion.h1>
```

**Penjelasan:**
- `bg-gradient-to-r` - Gradient horizontal
- `bg-clip-text` - Clip gradient ke text
- `text-transparent` - Buat text transparan agar gradient terlihat
- **Page Header**: Gunakan `text-xl sm:text-2xl` untuk compact design
- **Section Header**: Gunakan `text-3xl sm:text-4xl` untuk emphasis lebih besar

---

## 4. Card Components

### 4.1 Card dengan Top Border Gradient

**Pola:**
```jsx
<motion.div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
  {/* Top border gradient */}
  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
  
  {/* Card Header - Compact Design */}
  <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
    {/* Header content */}
  </div>
  
  {/* Card Content */}
  <div className="relative p-8">
    {/* Content */}
  </div>
</motion.div>
```

**Penjelasan:**
- Top border gradient sebagai accent
- Header dengan gradient background dan padding compact (`px-4 py-2.5`)
- Content dengan padding yang cukup (`p-8`)

### 4.2 Card Header dengan Animated Icon

**Pola:**
```jsx
<div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
    <motion.div
      className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
      whileHover={{ rotate: 90, scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <Plus className="w-4 h-4 text-white" />
    </motion.div>
    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
      Card Title
    </span>
  </h3>
</div>
```

**Penjelasan:**
- Header dengan padding compact: `px-4 py-2.5` (bukan `p-8`)
- Font size: `text-lg` (bukan `text-xl`)
- Icon size: `w-4 h-4` (bukan `w-5 h-5`)
- Icon padding: `p-1.5` (bukan `p-2`)
- Gap antar elemen: `gap-2` (bukan `gap-3`)
- Icon dengan hover animation (rotate + scale)
- Title dengan gradient text

---

## 5. Form Elements

### 5.1 Input dengan Focus Ring

**Pola:**
```jsx
<Input
  className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
/>
```

**Penjelasan:**
- `focus:ring-2` - Ring saat focus
- `focus:ring-blue-500/50` - Warna ring dengan opacity

### 5.2 Label dengan Required Indicator

**Pola:**
```jsx
<Label required className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
  Field Name
</Label>
```

**Penjelasan:**
- `required` prop untuk menambahkan asterisk
- Styling konsisten dengan dark mode support

### 5.3 Info Text dengan Icon

**Pola:**
```jsx
<p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
  <Info className="w-3 h-3" />
  Informasi tambahan
</p>
```

**Penjelasan:**
- Icon kecil untuk visual cue
- Text kecil dan subtle

---

## 6. Table Components

### 6.1 Table dengan Glassmorphism

**Pola:**
```jsx
<div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
  <Table className="text-sm">
    <TableHeader>
      <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        {/* Headers */}
      </TableRow>
    </TableHeader>
    <TableBody>
      {/* Rows dengan AnimatePresence */}
    </TableBody>
  </Table>
</div>
```

**Penjelasan:**
- Container dengan glassmorphism
- Header dengan gradient background
- Body dengan animasi rows

### 6.2 Animated Table Rows

**Pola:**
```jsx
<AnimatePresence>
  {items.map((item, idx) => (
    <motion.tr
      key={item.id}
      className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 cursor-pointer group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: idx * 0.02 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Cells */}
    </motion.tr>
  ))}
</AnimatePresence>
```

**Penjelasan:**
- `AnimatePresence` - Untuk exit animations
- Stagger delay berdasarkan index
- Hover effect dengan gradient
- Scale pada hover

### 6.3 Badge/Pill dalam Table Cell

**Pola:**
```jsx
<motion.span
  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800 font-mono text-xs font-bold"
  whileHover={{ scale: 1.05 }}
>
  {value}
</motion.span>
```

**Penjelasan:**
- Gradient background
- Ring border
- Hover scale effect

---

## 7. Button Components

### 7.1 Primary Button dengan Gradient

**Pola:**
```jsx
<Button
  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold px-6 py-2.5"
>
  <CheckCircle2 className="w-4 h-4" />
  Button Text
</Button>
```

**Penjelasan:**
- Gradient background
- Hover dengan gradient lebih gelap
- Shadow dengan warna matching
- Icon dengan spacing

### 7.2 Secondary Button

**Pola:**
```jsx
<Button
  variant="secondary"
  className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700"
>
  Secondary Action
</Button>
```

**Penjelasan:**
- Glassmorphism effect
- Subtle hover effect

### 7.3 Icon Button dengan Hover Animation

**Pola:**
```jsx
<motion.button
  className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  <Check className="w-4 h-4" />
</motion.button>
```

**Penjelasan:**
- `whileHover` - Scale up saat hover
- `whileTap` - Scale down saat click
- Color transition

---

### 7.4 Standar Ukuran Tombol Compact (Small)

Gunakan varian compact untuk tombol aksi di header halaman dan card header agar UI tetap ringan serta hemat ruang.

**Primary (Gradient) – Small:**
```html
<button
  class="flex items-center gap-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-medium text-sm px-4 py-2 rounded-md"
>
  <svg class="w-3 h-3" aria-hidden="true"></svg>
  Tambah Jadwal
</button>
```

**Secondary (Neutral/Glass) – Small:**
```html
<button
  class="inline-flex items-center gap-1 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-3 py-1.5 rounded-md"
>
  <svg class="w-3 h-3" aria-hidden="true"></svg>
  Muat Ulang
</button>
```

**Pedoman Compact:**
- Font size: `text-sm`
- Padding: primary `px-4 py-2`, secondary `px-3 py-1.5`
- Icon size: `w-3 h-3`
- Spasi ikon-teks: `gap-1`
- Radius: `rounded-md`
- Warna dan shadow mengikuti varian (gradient untuk primary, glass + border untuk secondary)


## 8. Loading States

### 8.1 Loading Spinner

**Pola:**
```jsx
{subunitsLoading ? (
  <motion.div
    className="flex flex-col items-center justify-center gap-3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    <span className="text-sm">Memuat data...</span>
  </motion.div>
) : (
  // Content
)}
```

**Penjelasan:**
- Spinner dengan color matching
- Text loading
- Fade in animation

### 8.2 Empty State

**Pola:**
```jsx
<motion.div
  className="flex flex-col items-center justify-center gap-2"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
>
  <Globe className="w-12 h-12 text-gray-400" />
  <span>Tidak ada data.</span>
</motion.div>
```

**Penjelasan:**
- Icon besar
- Subtle animation
- Clear message

---

## 9. Modal Components

### 9.1 Modal dengan Glassmorphism

**Pola:**
```jsx
<Modal show={showModal} onClose={() => setShowModal(false)} title="Modal Title" size="md">
  <motion.div
    className="space-y-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {/* Content */}
  </motion.div>
</Modal>
```

**Penjelasan:**
- Entrance dan exit animations
- Smooth transitions

### 9.2 Info Box dalam Modal

**Pola:**
```jsx
<div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-800/50">
  <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
    Label
  </Label>
  <div className="mt-1 font-mono text-sm p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
    {value}
  </div>
</div>
```

**Penjelasan:**
- Gradient background
- Glassmorphism pada value display
- Monospace font untuk IDs/codes

---

## 10. Toast Notifications

### 10.1 Toast Component

**Pola:**
```jsx
<Toaster toasts={toasts} onRemove={removeToast} />
```

**Penjelasan:**
- Centralized toast management
- Auto-dismiss dengan duration

### 10.2 Toast Helper Function

**Pola:**
```jsx
const [toasts, setToasts] = useState([]);

const addToast = (type = "info", title = "", message = "", duration = 4000) => {
  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  setToasts((prev) => [...prev, { id, type, title, message, duration }]);
};

const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));
```

**Penjelasan:**
- Unique ID generation
- Type-based styling
- Configurable duration

---

## 11. Responsive Design

### 11.1 Grid Layout Responsif

**Pola:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

**Penjelasan:**
- Mobile-first approach
- Breakpoints: `md:` (768px), `lg:` (1024px)

### 11.2 Flex Responsif

**Pola:**
```jsx
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
  {/* Items */}
</div>
```

**Penjelasan:**
- Stack pada mobile
- Horizontal pada desktop

---

## 12. Dark Mode Support

### 12.1 Pola Dark Mode

**Pola:**
```jsx
className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
```

**Penjelasan:**
- Selalu sertakan dark mode variant
- Konsisten dengan color scheme

### 12.2 Dark Mode untuk Gradients

**Pola:**
```jsx
className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30"
```

**Penjelasan:**
- Opacity lebih rendah pada dark mode
- Tetap readable

---

## 13. Best Practices

### 13.1 Konsistensi Spacing

- Gunakan Tailwind spacing scale: `gap-2`, `gap-4`, `gap-6`, `gap-8`
- Padding konsisten: `p-4`, `p-6`, `p-8`
- **Card Header Padding**: `px-4 py-2.5` (compact design)

### 13.2 Konsistensi Border Radius

- Cards: `rounded-2xl`
- Buttons: `rounded-lg`
- Badges: `rounded-lg`
- Inputs: Default (biasanya `rounded-md`)

### 13.3 Konsistensi Typography

- **Page Headers**: `text-xl sm:text-2xl` (compact design dengan gradien text)
- Card Headers: `text-lg` (compact design)
- Section Headers: `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`
- Body: `text-sm`, `text-base`
- Labels: `text-sm font-semibold`
- Helpers: `text-xs`

### 13.3.0 Page Header Compact (Standar Baru)

Untuk semua Page Header (header utama di halaman), gunakan pola berikut agar konsisten dan compact:

- **Padding**: `px-6 py-4` (bukan `p-8`)
- **Background**: Gradien lembut `from-blue-50/80 via-indigo-50/80 to-purple-50/80`
- **Dark Mode**: `dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80`
- **Backdrop Blur**: `backdrop-blur-sm`
- **Border**: `border-b border-gray-200/50 dark:border-gray-700/50`
- **Rounded**: `rounded-lg`
- **Font Size**: `text-xl sm:text-2xl`
- **Text Gradient**: `bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent`
- **Animation**: Fade in + slide dari kiri dengan delay 0.2s

**Contoh Implementasi:**
```jsx
<motion.div
  variants={itemVariants}
  className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-6"
>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <div>
      <motion.h1
        className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Judul Halaman
      </motion.h1>
    </div>
  </div>
</motion.div>
```

**Referensi:**
- `resources/js/Pages/Laboratorium/Index.jsx` (line 955-973)
- `resources/js/Pages/RawatJalan/Index.jsx` (line 209-222)

### 13.3.1 Ukuran Card Header (Compact Design)

Untuk semua Card Header sections, gunakan ukuran berikut agar lebih compact dan profesional:

- **Padding Header**: `px-4 py-2.5` (bukan `p-8`)
- **Font Size**: `text-lg` (bukan `text-xl`)
- **Icon Size**: `w-4 h-4` (bukan `w-5 h-5`)
- **Icon Padding**: `p-1.5` (bukan `p-2`)
- **Gap antar elemen**: `gap-2` (bukan `gap-3`)

**Contoh:**
```jsx
<div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
    <motion.div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
      <Icon className="w-4 h-4 text-white" />
    </motion.div>
    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
      Section Title
    </span>
  </h3>
</div>
```

### 13.4 Animation Timing

- Fast: `duration: 0.2-0.3`
- Normal: `duration: 0.5`
- Slow: `duration: 0.6-0.8`

### 13.5 Color Palette

- Primary: Blue (`blue-500`, `blue-600`, `blue-700`)
- Secondary: Indigo (`indigo-500`, `indigo-600`, `indigo-700`)
- Accent: Purple (`purple-500`, `purple-600`, `purple-700`)
- Success: Green (`green-500`, `green-600`)
- Danger: Red (`red-500`, `red-600`)
- Warning: Yellow (`yellow-500`, `yellow-600`)

---

## 14. Checklist untuk Menu Baru

Saat membuat menu baru, pastikan:

- [ ] Menggunakan glassmorphism effect pada cards
- [ ] Menggunakan gradient backgrounds
- [ ] Mengimplementasikan dark mode support
- [ ] Menambahkan entrance animations dengan stagger
- [ ] Menambahkan hover effects pada interactive elements
- [ ] Menggunakan consistent spacing dan typography
- [ ] **Page Header menggunakan pola compact**: `px-6 py-4`, `text-xl sm:text-2xl`, gradien background `from-blue-50/80 via-indigo-50/80 to-purple-50/80`, gradien text `from-blue-600 via-indigo-600 to-purple-600`
- [ ] **Card Header menggunakan ukuran compact**: `px-4 py-2.5`, `text-lg`, icon `w-4 h-4`, `p-1.5`, `gap-2`
- [ ] Menambahkan loading states
- [ ] Menambahkan empty states
- [ ] Menggunakan toast notifications untuk feedback
- [ ] Responsive design (mobile-first)
- [ ] Menggunakan consistent color palette
- [ ] Menambahkan icon dari lucide-react
- [ ] Menggunakan motion variants untuk animations
- [ ] Menambahkan proper error handling UI

---

## 15. Rekomendasi UI/UX Terbaik

Gunakan rekomendasi berikut agar seluruh menu terasa ringan, profesional, dan elegan:

1. **Design System Konsisten**
   - Ekstrak pola pada panduan ini ke komponen reusable (Card, SectionHeader, Modal, DataTable).
   - Buat Storybook/Docs internal agar tim lain dapat reuse dengan cepat.

2. **Micro Interaction + Feedback**
   - Gunakan Framer Motion `layoutId` untuk transisi antar state (modal detail, card expand).
   - Berikan indikator status real-time (success/error/warning) pada aksi penting (POST FHIR, mapping).

3. **Observability UI**
   - Sertakan komponen “status pill” untuk menunjukkan koneksi SATUSEHAT (token TTL, last sync) pada header halaman.
   - Tambah “activity timeline” singkat untuk menunjukkan riwayat request.

4. **Mobile-First Enhancements**
   - Gunakan bottom sheet atau bottom navigation untuk menu penting di layar kecil.
   - Tabel besar di-break menjadi kartu stacked dengan summary + CTA jelas.

5. **Accessibility**
   - Terapkan `aria-label` pada tombol ikon, dan `prefers-reduced-motion` untuk mematikan animasi jika user memilih.
   - Pastikan kontras warna memenuhi WCAG (min 4.5:1).

6. **Form Experience**
   - Tambah inline validation + helper text. Gunakan skeleton/pulse saat loading untuk mengurangi perceived wait.
   - Simpan state sementara (autosave) untuk form panjang agar user tidak kehilangan data.

7. **Global Theming**
   - Tambah theme switcher (Light / Dark / System) yang mudah diakses.
   - Gunakan CSS custom properties untuk warna inti agar mudah diubah pada level root.

8. **Performance UX**
   - Implementasikan lazy loading + code splitting untuk halaman berat.
   - Gunakan React Query / SWR untuk caching data API sehingga navigasi ulang terasa instan.

9. **Error & Empty-State UX**
   - Gunakan format “What happened + Why + What to do next” pada error card.
   - Sediakan tombol ulangi (retry) atau link ke dokumentasi relevan.

10. **Documentation Hooks**
    - Cantumkan link cepat ke `SATUSEHAT_INTEGRATION_GUIDE.md` / `SATUSEHAT_INTEGRATION_NOTES.md` di modal error teknis agar tim ops/dev bisa langsung troubleshooting.

Checklist singkat sebelum rilis UI:
- [ ] Theme konsisten (color, spacing, typography)
- [ ] Responsif + mobile gestures nyaman
- [ ] Loading/empty/error states informatif
- [ ] Feedback cepat (toast, inline status, progress)
- [ ] Aksesibilitas minimal (keyboard + screen reader)
- [ ] Data berat menggunakan virtualized list atau pagination

---

## 16. Contoh Implementasi Lengkap

Lihat file berikut sebagai referensi:
- `resources/js/Pages/SatuSehat/Prerequisites/SatuSehatOrganization.jsx`
- `resources/js/Pages/SatuSehat/Prerequisites/SatuSehatLocation.jsx`
- `resources/js/Pages/Dashboard.jsx` (single-page welcome)

Ketiganya mengimplementasikan pola glassmorphism, animasi Framer Motion, dan dark mode sesuai panduan.

---

## 17. Troubleshooting

### 16.1 Animasi tidak smooth
- Pastikan menggunakan `ease` yang tepat
- Kurangi `duration` jika terlalu lambat
- Periksa apakah ada CSS conflicts

### 16.2 Dark mode tidak bekerja
- Pastikan menggunakan prefix `dark:`
- Periksa apakah dark mode enabled di aplikasi
- Pastikan warna kontras cukup

### 16.3 Glassmorphism tidak terlihat
- Pastikan ada background di belakang elemen
- Periksa `backdrop-blur-xl` sudah diterapkan
- Pastikan opacity background cukup rendah

---

## 18. Referensi

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [React Documentation](https://react.dev/)

---

**Terakhir Diupdate:** 2025-01-27
**Versi:** 1.2.0
## Poliklinik Monthly Chart – Styling Patterns

Tujuan: membuat grafik bar kunjungan poli per bulan yang elegan, modern, informatif, dan tetap ringan tanpa library eksternal.

Prinsip desain utama:
1) Kejelasan data: grid halus, label sumbu jelas, angka mudah dibaca.
2) Hierarki visual: warna/kontras terkontrol, gunakan gradient lembut dan bayangan tipis.
3) Interaksi bermakna: tooltip saat hover, label nilai yang tidak berlebihan.
4) Aksesibilitas: gunakan aria-label, kontras yang cukup, dukungan dark mode.

Komponen dan pola yang digunakan:
- Legend modern: bullet berwarna dengan gradient dan ring tipis; nama poli ditampilkan bersebelahan.
- Grid sumbu-Y: garis putus-putus (dashed) dengan 4 level + baseline, warna abu ringan untuk minim distraksi.
- Label sumbu-Y: angka pada sisi kiri dengan skala dinamis mengikuti nilai maksimum.
- Batang (bar):
  - Bentuk rounded kecil (rounded-md) untuk nuansa modern.
  - Gradient vertikal (bg-gradient-to-t) agar batang terlihat hidup namun tidak mencolok.
  - Ring tipis (ring-1) untuk memisahkan batang dari latar belakang.
  - Transisi halus (CSS transition height) saat grafis dirender pertama kali.
  - Label nilai kecil (font-mono 10px) muncul ketika tinggi batang memadai agar tidak menabrak layout.
- Tooltip saat hover: menampilkan bulan, nama poli, jumlah kunjungan, dan persentase kontribusi pada bulan tersebut.
- Panel ringkasan: total semua poli + daftar top poli dengan progress bar, menampilkan persentase kontribusi terhadap total tahunan.

Dark mode:
- Gunakan pasangan warna tailwind yang konsisten: teks abu diubah ke dark:text-gray-300/400, border ke dark:border-gray-800, latar panel ke dark:bg-gray-800/60.

Kode ringkas (pattern inti untuk batang):

```
<div
  className={`w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-md shadow-sm ring-1 border-blue-600/40`}
  style={{ height: mounted ? h : 0, transition: "height 600ms cubic-bezier(0.22, 1, 0.36, 1)" }}
  aria-label={`${namaPoli} ${bulan}: ${nilai}`}
/>
```

Tips performa:
- Hindari kalkulasi berat di render, precompute total per bulan dan nilai maksimum di luar map batang.
- Batasi jumlah bulan yang ditampilkan dengan parameter `limit` dari backend untuk menjaga keterbacaan.

Catatan pengembangan:
- Jika ingin animasi lebih kompleks, dapat mempertimbangkan framer-motion. Namun saat ini kita memakai CSS transition untuk menjaga footprint bundle tetap ringan.

---

## 19. Pola Form Input dengan Auto-Validation & Visual Feedback

### 19.1 Input dengan Conditional Styling Berdasarkan Status

**Pola:**
```jsx
<input
  type="text"
  value={value}
  onChange={(e) => handleChange(e.target.value)}
  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm transition-all duration-200 ${
    status === 'K'
      ? 'border-red-500 bg-red-50/80 dark:border-red-600 dark:bg-red-900/30'
      : status === 'H'
      ? 'border-orange-500 bg-orange-50/80 dark:border-orange-600 dark:bg-orange-900/30'
      : status === 'L'
      ? 'border-yellow-500 bg-yellow-50/80 dark:border-yellow-600 dark:bg-yellow-900/30'
      : 'border-gray-300/50 dark:border-gray-600/50'
  }`}
/>
```

**Penjelasan:**
- Conditional styling berdasarkan status/kondisi nilai
- Background dengan opacity (`/80`, `/30`) untuk efek subtle
- Border warna matching dengan background
- Dark mode support dengan opacity berbeda

### 19.2 Visual Feedback dengan Motion Animation

**Pola:**
```jsx
{status && (
  <motion.p
    className="mt-1 text-xs font-semibold"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    {status === 'K' && <span className="text-red-600 dark:text-red-400">⚠️ Kritis</span>}
    {status === 'H' && <span className="text-orange-600 dark:text-orange-400">↑ Tinggi</span>}
    {status === 'L' && <span className="text-yellow-600 dark:text-yellow-400">↓ Rendah</span>}
  </motion.p>
)}
```

**Penjelasan:**
- Fade-in animation untuk feedback visual
- Icon/emoji untuk quick visual cue
- Warna konsisten dengan status
- Dark mode support

### 19.3 Table Rows dengan Stagger Animation

**Pola:**
```jsx
<AnimatePresence>
  {items.map((item, index) => (
    <motion.tr
      key={item.id}
      className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Cells */}
    </motion.tr>
  ))}
</AnimatePresence>
```

**Penjelasan:**
- Stagger delay berdasarkan index untuk efek cascade
- Exit animation untuk smooth removal
- Hover dengan gradient background
- Scale effect pada hover untuk feedback

### 19.4 Badge dengan Gradient & Ring Border

**Pola:**
```jsx
<motion.span
  className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold ${
    status === "Sudah"
      ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 ring-1 ring-green-200 dark:ring-green-800"
      : "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-700 dark:text-yellow-300 ring-1 ring-yellow-200 dark:ring-yellow-800"
  }`}
  whileHover={{ scale: 1.05 }}
>
  {status || "Default"}
</motion.span>
```

**Penjelasan:**
- Gradient background untuk depth
- Ring border untuk emphasis
- Hover scale effect
- Dark mode dengan opacity berbeda

### 19.5 Container dengan Wider Horizontal Padding

**Pola:**
```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="mx-auto px-4 sm:px-6 lg:px-12 xl:px-16"
>
  {/* Content */}
</motion.div>
```

**Penjelasan:**
- Responsive padding yang lebih luas untuk desktop
- `lg:px-12 xl:px-16` memberikan lebih banyak ruang horizontal
- Mobile-first dengan padding minimal di mobile

---

## 20. Best Practices untuk Form dengan Dynamic Validation

### 20.1 Auto-populate Fields Berdasarkan Input

**Pola:**
```jsx
const updateField = (index, field, value) => {
  const newData = [...data];
  newData[index][field] = value;
  
  // Auto-populate berdasarkan field yang diubah
  if (field === 'hasil' || field === 'nilai_rujukan') {
    const currentHasil = field === 'hasil' ? value : newData[index].hasil;
    const currentNilaiRujukan = field === 'nilai_rujukan' ? value : newData[index].nilai_rujukan;
    
    if (currentHasil && currentNilaiRujukan) {
      const status = calculateStatus(currentHasil, currentNilaiRujukan);
      newData[index].status = status;
    }
  }
  
  setData(newData);
};
```

**Penjelasan:**
- Auto-calculate berdasarkan input user
- Validasi real-time
- Update state secara efisien

### 20.2 Conditional Rendering untuk Visual Feedback

**Pola:**
```jsx
{value && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="mt-2 p-3 rounded-lg bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-800/50"
  >
    {/* Feedback content */}
  </motion.div>
)}
```

**Penjelasan:**
- Conditional rendering dengan AnimatePresence
- Smooth entrance/exit animations
- Glassmorphism untuk feedback box

### 20.3 Form dengan Grouped Data dan Nested Mapping

**Pola:**
```jsx
{groupedData && Array.isArray(groupedData) && groupedData.length > 0 && (
  <motion.div
    variants={itemVariants}
    className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-8"
  >
    {/* Top border gradient */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />
    
    <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50/80 via-pink-50/80 to-rose-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <motion.div
          className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow-md"
          whileHover={{ rotate: 90, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <ClipboardList className="w-4 h-4 text-white" />
        </motion.div>
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Form Title
        </span>
      </h2>
    </div>
    <div className="relative p-8">
      {groupedData.map((group, groupIndex) => (
        <motion.div
          key={group.id}
          variants={itemVariants}
          className="mb-8 last:mb-0"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {group.name}
            </span>
          </h3>
          {/* Nested content - bisa table, form fields, dll */}
          {group.items && Array.isArray(group.items) && group.items.map((item, itemIndex) => (
            // Item content
          ))}
        </motion.div>
      ))}
    </div>
  </motion.div>
)}
```

**Penjelasan:**
- Conditional rendering dengan array check untuk keamanan
- Nested mapping untuk grouped data
- Setiap group memiliki card terpisah dengan spacing (`mb-8 last:mb-0`)
- Gradient header untuk setiap group section
- Variants animation untuk smooth entrance

---
