# Panduan Perbaikan UI/UX dengan React + Tailwind CSS + Framer Motion

## Ringkasan

Dokumen ini menjelaskan pola dan teknik yang digunakan untuk memperbaiki tampilan komponen SATUSEHAT menggunakan React, Tailwind CSS, dan Framer Motion. Panduan ini dapat digunakan sebagai referensi untuk memperbaiki menu lainnya agar memiliki konsistensi desain yang sama.

**File Referensi:** `resources/js/Pages/SatuSehat/Prerequisites/SatuSehatOrganization.jsx`

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

### 3.1 Header dengan Glassmorphism

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

### 3.2 Icon dengan Gradient Background

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

### 3.3 Gradient Text

**Pola:**
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

---

## 4. Card Components

### 4.1 Card dengan Top Border Gradient

**Pola:**
```jsx
<motion.div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
  {/* Top border gradient */}
  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
  
  {/* Card Header */}
  <CardHeader className="relative bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
    {/* Content */}
  </CardHeader>
  
  {/* Card Content */}
  <CardContent className="p-8">
    {/* Content */}
  </CardContent>
</motion.div>
```

**Penjelasan:**
- Top border gradient sebagai accent
- Header dengan gradient background
- Content dengan padding yang cukup

### 4.2 Card Header dengan Animated Icon

**Pola:**
```jsx
<CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100">
  <motion.div
    className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
    whileHover={{ rotate: 90, scale: 1.1 }}
    transition={{ duration: 0.3 }}
  >
    <Plus className="w-5 h-5 text-white" />
  </motion.div>
  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
    Card Title
  </span>
</CardTitle>
```

**Penjelasan:**
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

### 13.2 Konsistensi Border Radius

- Cards: `rounded-2xl`
- Buttons: `rounded-lg`
- Badges: `rounded-lg`
- Inputs: Default (biasanya `rounded-md`)

### 13.3 Konsistensi Typography

- Headers: `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`
- Body: `text-sm`, `text-base`
- Labels: `text-sm font-semibold`
- Helpers: `text-xs`

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
- [ ] Menambahkan loading states
- [ ] Menambahkan empty states
- [ ] Menggunakan toast notifications untuk feedback
- [ ] Responsive design (mobile-first)
- [ ] Menggunakan consistent color palette
- [ ] Menambahkan icon dari lucide-react
- [ ] Menggunakan motion variants untuk animations
- [ ] Menambahkan proper error handling UI

---

## 15. Contoh Implementasi Lengkap

Lihat file berikut sebagai referensi:
- `resources/js/Pages/SatuSehat/Prerequisites/SatuSehatOrganization.jsx`
- `resources/js/Pages/SatuSehat/Prerequisites/SatuSehatLocation.jsx`

Kedua file ini mengimplementasikan semua pola yang dijelaskan di atas.

---

## 16. Troubleshooting

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

## 17. Referensi

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [React Documentation](https://react.dev/)

---

**Terakhir Diupdate:** 2025-11-14
**Versi:** 1.0.0

