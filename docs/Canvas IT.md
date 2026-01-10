# Canvas IT

Catatan desain, warna, dan transisi untuk komponen Canvas Rawat Jalan. Dokumen ini bertujuan mempermudah penyesuaian pada form lain agar konsisten, elegan, dan berkinerja baik.

## Tujuan
- Menstandarkan gaya visual (warna, tipografi, layout) dan pola animasi.
- Menyediakan parameter yang mudah diubah untuk kebutuhan tiap form.
- Mendorong reuse pola transisi Framer Motion yang direction-aware.

## Struktur Layout
- Overlay layar penuh dengan backdrop blur dan transisi fade.
- Kontainer utama grid 10 kolom: 1 tombol sebelumnya, 8 konten halaman, 1 tombol berikutnya.
- Header panel berisi judul halaman aktif dan tanggal saat ini.
- Blok identitas pasien di bawah header (No. Rawat, No. RM, Poli).
- Area konten dengan tinggi maksimum dan overflow-y untuk scroll.

## Palet Warna (OKLCH)
- Overlay: oklch(14.5% 0 0 / 0.5)
- Panel surface: oklch(14.5% 0 0 / 0.95)
- Border/Accent: oklch(84.1% 0.238 128.85)
- Teks utama: oklch(98.5% 0 0)
- Shadow aksen: menggunakan warna accent dengan alpha (contoh 0.25–0.45)

Catatan:
- OKLCH memberikan konsistensi kontras di tema gelap. Sesuaikan persentase lightness untuk kebutuhan aksesibilitas.
- Untuk tema terang, naikkan lightness surface dan turunkan kontras border.

## Tipografi
- Font utama panel: monospace (font-mono) untuk nuansa teknis.
- Ukuran:
  - Judul panel: text-sm font-semibold
  - Meta tanggal: text-xs
  - Identitas pasien: text-[11px] label, konten text-[12px]

## Halaman dan Navigasi
- Halaman tersedia: CPPT SOAP, New CPPT SOAP, Tarif/Tindakan, Resep Obat, Permintaan Lab.
- Navigasi mouse: tombol kiri/kanan di sisi kontainer.
- Navigasi keyboard:
  - ArrowLeft: halaman sebelumnya
  - ArrowRight: halaman berikutnya
  - Escape: tutup canvas dan kembali ke Rawat Jalan
- Aksi “Buka Resep” mengalihkan ke halaman Resep dengan arah transisi yang sesuai.

## Transisi Framer Motion
- AnimatePresence mode "wait" untuk antrian keluar/masuk yang rapi.
- Variants direction-aware (enter/center/exit) dengan parameter custom `dir`.
- Efek 3D ringan (rotateY) dan blur untuk modern look.

Parameter default:
- Translasi masuk/keluar: ±46px
- Scale: 0.98 (masuk), 1 (center), 0.985 (keluar)
- RotateY: ±6°
- Transform perspective: 900
- Blur: 2px saat enter/exit; 0px saat center
- Transition konten: spring { stiffness: 260, damping: 28, mass: 0.9 }
- Transition overlay/kontainer: duration 0.32, ease [0.22, 1, 0.36, 1]

Contoh pola penggunaan:

```jsx
const [dir, setDir] = useState(1);

const pageVariants = {
  enter: (d) => ({ x: d > 0 ? 46 : -46, opacity: 0, scale: 0.98, rotateY: d > 0 ? -6 : 6, transformPerspective: 900, filter: 'blur(2px)' }),
  center: { x: 0, opacity: 1, scale: 1, rotateY: 0, transformPerspective: 900, filter: 'blur(0px)' },
  exit: (d) => ({ x: d > 0 ? -46 : 46, opacity: 0, scale: 0.985, rotateY: d > 0 ? 6 : -6, transformPerspective: 900, filter: 'blur(2px)' }),
};

<AnimatePresence initial={false} mode="wait">
  <motion.div
    key={pageKey}
    variants={pageVariants}
    custom={dir}
    initial="enter"
    animate="center"
    exit="exit"
    className="transform-gpu will-change-transform will-change-opacity"
    transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.9 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

## Pola Arah Transisi
- `dir` bernilai 1 jika pindah ke indeks lebih tinggi, -1 jika ke lebih rendah.
- Saat mengubah indeks via tombol atau aksi programatik, set juga `dir` agar animasi sesuai arah.

Contoh mengubah indeks:

```jsx
const prev = () => setIndex((i) => { const ni = i > 0 ? i - 1 : pages.length - 1; setDir(ni > i ? 1 : -1); return ni; });
const next = () => setIndex((i) => { const ni = i < pages.length - 1 ? i + 1 : 0; setDir(ni > i ? 1 : -1); return ni; });
```

## Praktik Performa
- Aktifkan GPU: gunakan `transform-gpu` dan `will-change` pada elemen bergerak.
- Batasi tinggi konten dan gunakan `overflow-y-auto` untuk scroll.
- Gunakan spring untuk transisi konten; untuk overlay, gunakan easing cubic modern.

## Checklist Penyesuaian Cepat
- Jarak translasi (px): 46
- Sudut 3D (derajat): 6
- Skala masuk/keluar: 0.98 / 0.985
- Blur masuk/keluar (px): 2
- Durasi overlay/kontainer (s): 0.32
- Easing overlay/kontainer: [0.22, 1, 0.36, 1]
- Spring konten: stiffness 260, damping 28, mass 0.9
- Warna OKLCH: overlay, surface, border, text, shadow

## Rekomendasi Reuse di Form Lain
- Reuse `pageVariants` dan pola `custom={dir}` untuk transisi antar tab/step.
- Standarkan token warna OKLCH per peran (overlay/surface/border/text) agar konsisten.
- Simpan utilitas navigasi (prev/next, setDir) di komponen induk yang mengelola halaman.
- Terapkan aksesibilitas: aria-label pada tombol, dukungan Escape untuk keluar.

## Catatan Implementasi
- File referensi: resources/js/Pages/RawatJalan/CanvasRajal.jsx
- Libraries: framer-motion, @inertiajs/react, ziggy-js, TailwindCSS
- Tidak ada dependency tambahan yang diperlukan untuk menerapkan pola ini ke form lain.

## Ringkasan Pola Framer Motion Lanjutan
- Propagasi varian: varian dari parent mengalir ke semua motion child selama child tidak memiliki prop `animate`. Parent mendefinisikan `initial`/`whileHover`/`animate`; child hanya mendefinisikan `variants` dengan key yang sama (mis. `hover`).
- Lapisan interaksi: gunakan lapisan motion tak terlihat yang memegang `whileHover="hover"` di atas area yang ingin diberi efek. Semua child yang memiliki `variants.hover` akan ikut berperilaku (contoh efek “glow”).
- Dampak `animate` di child: jika child memiliki `animate`, ia tidak lagi mengonsumsi varian dari parent saat hover; animasi child menjadi otonom.
- Rekomendasi orkestrasi: gunakan satu sumber kebenaran di parent untuk micro-interactions; anak mendefinisikan respons melalui `variants` agar konsisten dan mudah dirawat.

Contoh pola propagasi:

```jsx
const glowVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1 }
};

<motion.div initial="initial" whileHover="hover">
  <motion.div variants={glowVariants} className="glow" />
  <div>Konten kartu</div>
  {/* Child lain yang memiliki variants.hover akan ikut bereaksi */}
  <motion.span variants={{ initial: { y: 0 }, hover: { y: -2 } }}>Label</motion.span>
 </motion.div>
```

Checklist integrasi ke Canvas/Form:
- Bungkus elemen yang ingin bereaksi dengan satu parent motion dan set `whileHover="hover"` atau state varian lain.
- Pindahkan `animate` dari child ke parent jika ingin propagasi bekerja menyeluruh.
- Gunakan key varian konsisten di seluruh child (`hover`, `pressed`, `focus`) agar bisa diorkestrasikan.
- Hindari menaruh `animate` di child bila ingin memanfaatkan propagasi dari parent.

Penyempurnaan Form yang Direkomendasikan:
- Tombol navigasi: tambah efek hover halus (glow/angkat 2–4px) via propagasi, child tombol hanya mendefinisikan `variants.hover`.
- Header panel: ikon kecil atau badge dapat “menghela” sedikit saat hover untuk memberi affordance interaksi.
- Field input: bungkus field dengan parent motion; gunakan event (onFocus/onBlur) untuk mengubah varian state di parent, child (ikon/underline) merespons via `variants.focus`/`variants.blur`.
- Kartu list/data: efek hover terstandar (opacity/translate/scale ringan) tanpa perlu menambahkan `animate` di tiap child.
