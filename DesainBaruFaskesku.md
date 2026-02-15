# Blueprint SIMRS Faskesku.id: Grand Design Implementation

## 1. Analisis Teknis Tabel `menus` Eksisting
Berdasarkan pengecekan pada migrasi dan skema sistem, tabel `menus` saat ini memiliki struktur dasar sebagai berikut:
- **Identitas**: `name`, `slug`, `icon`, `route`, `url`.
- **Hierarki**: `parent_id` (Relasi Self-referential).
- **Kontrol**: `sort_order`, `is_active`, `permission_name`.

### Kebutuhan Transformasi (Grand Design):
Untuk mencapai standar **Modern, Elegant, & Profesional**, tabel `menus` perlu diperkaya dengan metadata visual:
- `category_group`: Pengelompokan pilar (Front Office, Clinical, dll).
- `color_theme`: Kelas Tailwind atau Hex Code untuk aksen visual unik per pilar.
- `icon_provider`: Penentu apakah menggunakan *Heroicons*, *Lucide*, atau *FontAwesome*.

---

## 2. Strategi Implementasi 7 Pilar Terpadu

Kami akan merestrukturisasi seluruh navigasi aplikasi menjadi 7 Departemen Utama (Pilar) untuk efisiensi workflow:

| No | Pilar Utama | Modul Unggulan | Icon (Heroicons) | Aksen Warna |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Gugus Depan** | Antrean, Anjungan Mandiri, Registrasi, Pasien | `UsersIcon` | Blue-600 |
| 2 | **Layanan Klinis** | Rawat Jalan (Soap/EMR), IGD, Rawat Inap, SDKI | `HeartIcon` | Rose-500 |
| 3 | **Penunjang Medis** | Lab, Radiologi, Bedah, Hemodialisa, Gizi | `BeakerIcon` | Amber-500 |
| 4 | **Farmasi & Logistik** | POS Kasir Farmasi, Gudang, Stok Opname | `AcademicCapIcon` | Emerald-600 |
| 5 | **Bisnis & Keuangan** | Billing, Kasir Umum, Akuntansi, Piutang | `CreditCardIcon` | Indigo-600 |
| 6 | **Koneksi Digital** | SatuSehat, BPJS (VClaim/PCare), WA Gateway | `GlobeAltIcon` | Sky-500 |
| 7 | **Pusat Kontrol** | Manajemen User, Pegawai (HR), SIP, Setting | `Cog6ToothIcon` | Slate-600 |

---

## 3. Grand Design UI/UX (Experience Overhaul)

### 💎 Desain Antarmuka Modern
- **Glassmorphism Sidebar**: Latar belakang sidebar menggunakan efek *frosted glass* (`backdrop-blur`) dengan gradasi biru-deep yang elegan.
- **Bento Dashboard**: Penampilan statistik menggunakan layout *Bento Box* yang bersih, memberikan ringkasan cepat tentang jumlah pasien, okupansi bed, dan status stok obat.
- **Soft Palette Standards**: Menggunakan palet warna yang tenang dan profesional (Zinc, Slate, dan Pastel accents) untuk mengurangi kelelahan mata tenaga medis.

### 🚀 Optimasi Workflow
- **Patient Journey View**: Transisi otomatis dari pendaftaran langsung ke dokter yang dituju.
- **Unified EMR Interface**: Pengisian data klinis yang ringkas dengan fitur *auto-complete* berbasis database SDKI/ICD-10.
- **Quick Action Bar**: Optimalisasi pencarian pintar (⌘+K) untuk melompat antar pilar tanpa harus mencari di sidebar.

---

## 4. Roadmap Teknis Implementasi

### Minggu 1: Database & Metadata Refactor
- Menambahkan kolom visual pada tabel `menus`.
- Menyiapkan `GrandMenuSeeder` yang memetakan ulang seluruh modul lama ke dalam 7 pilar baru.

### Minggu 2: Sidebar & Navigation Overhaul
- Update `SidebarMenu.jsx` untuk mendukung rendering grup pilar dan transisi *smooth* menggunakan *Framer Motion*.
- Implementasi ikonografi berbasis React Component (Heroicons).

### Minggu 3: Dashboard & Bento Grid
- Desain ulang halaman `Dashboard.jsx` menggunakan sistem *Bento Grid*.
- Integrasi ChartJS untuk visualisasi laporan real-time.

### Minggu 4: Final Refinement & Testing
- Penyelarasan Dark Mode di seluruh modul.
- Optimasi performa loading menu berbasis Inertia.js.

---
*Dibuat untuk merevolusi ekosistem kesehatan digital di Indonesia.*  
*Oleh: Antigravity AI Assistant & Engineering Team*  
*Versi: 2.0 (Full Grand Design Implementation)*
