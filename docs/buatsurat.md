# Dokumentasi Sistem Pembuatan Surat (CanvasSurat - Modernized)

Dokumen ini menjelaskan arsitektur, implementasi teknis terkini, dan panduan pengembang untuk sistem pembuatan surat digital di modul Rawat Jalan.

---

## 1. Analisa Implementasi Terkini (Optimized)

Sistem saat ini telah ditingkatkan untuk performa tinggi dan pengalaman pengguna yang halus (*premium experience*).

### Arsitektur Utama:
- **Memoized Renderer (`Body`)**: Komponen `Body` didefinisikan di luar komponen utama dan dibungkus dengan `React.memo`. Ini mencegah render ulang yang tidak perlu dan menghilangkan gejala *jitter* (tersendat) saat user mengetik di form.
- **Modular Physical Form (`PhysicalExamForm.jsx`)**: Form pemeriksaan fisik dipisahkan menjadi komponen mandiri.
    - **Debounced Update**: Perubahan input tidak langsung dikirim ke state utama, melainkan didelay selama 500ms untuk memastikan UI tetap responsif.
- **Hybrid Printing Utility**:
    - **Browser-Side Print**: Menggunakan `useRef` (printRef) dan `useCallback` (handlePrint) untuk mencetak area preview secara langsung via browser. Hal ini memberikan hasil instan tanpa menunggu request server.
    - **Print-Specific Styling**: Menggunakan container khusus yang memastikan layout tetap rapi (A5/A4) saat dicetak ke printer fisik.
- **Centralized Letter Meta**: Semua jenis surat dikelola lewat konstanta `LETTER_TYPES` untuk mempermudah penambahan fitur di masa depan.

### Fitur Keamanan & Validasi:
- **Base64 Token Signature**: Membuat token unik Base64 URL-Safe yang berisi payload data medis.
- **Dynamic QRCode**: QR Code diupdate secara otomatis:
    - *Mode Verify*: Sebelum divalidasi, QR mengarah ke link verifikasi token.
    - *Mode Info*: Setelah divalidasi, QR mengarah ke link informasi surat yang sah.

---

## 2. Cara Menambah Jenis Surat Baru

Ikuti langkah-langkah terstruktur berikut untuk menambahkan template surat baru:

### Langkah 1: Daftarkan Tipe Surat
Tambahkan entri baru di konstanta `LETTER_TYPES` di bagian atas file `CanvasSurat.jsx`.
```javascript
const LETTER_TYPES = [
  // ... existing
  { value: "SK_KERJA", label: "Surat Keterangan Kerja" },
];
```

### Langkah 2: Implementasikan Template di Komponen `Body`
Cari komponen `Body` (di luar fungsi `CanvasSurat`) dan tambahkan blok kondisi baru:
```jsx
if (type === "SK_KERJA") {
  return (
    <div className="space-y-4">
      {/* Gunakan semantic HTML dan Tailwind untuk layout */}
      <h2 className="text-center font-bold underline">SURAT KETERANGAN KERJA</h2>
      <p>Menerangkan bahwa pasien {info.nama} ...</p>
      {/* Footer surat (Tgl & TTD) mengikuti pola yang ada */}
    </div>
  );
}
```

### Langkah 3: Tambahkan Input Khusus (Opsional)
Jika surat baru memerlukan field unik (seperti "Jabatan" atau "Lama Bekerja"), tambahkan input tersebut di dalam return utama `CanvasSurat.jsx`, biasanya di bawah komponen `PhysicalExamForm`.
```jsx
{selectedType === "SK_KERJA" && (
  <div className="p-3 bg-gray-50 rounded-lg">
    <Label>Jabatan Terakhir</Label>
    <Input value={jabatan} onChange={(e) => setJabatan(e.target.value)} />
  </div>
)}
```

---

## 3. Komponen Pendukung

### `PhysicalExamForm.jsx`
Digunakan untuk mengumpulkan data Pemeriksaan Fisik (BB, TB, Tensi, Suhu, dsb).
- **Properti**: `data` (object), `onChange` (function).
- **Penting**: Pastikan state `physicalData` di `CanvasSurat` memiliki key yang sesuai dengan input di form ini.

### `Body` Props
Komponen `Body` menerima props lengkap untuk render preview:
- `info`: Data identitas pasien (memoized).
- `kop`: Data instansi kesehatan (Logo, Alamat, Telp).
- `physicalData`: Hasil pemeriksaan fisik dari form.
- `qrSrc`: Source image QR Code hasil generate.
- `nomorFinal`: Nomor surat resmi atau otomatis.

---

## 4. Keunggulan Implementasi Saat Ini

1. **Zero Input Jitter**: User bisa mengetik dengan sangat cepat tanpa ada delay visual pada form maupun preview.
2. **Instant Preview**: Apa yang dilihat user di layar (WYSIWYG) adalah apa yang akan keluar saat dicetak.
3. **Efficient Re-rendering**: Hanya bagian kecil dari UI yang berubah saat input diberikan, menjaga penggunaan RAM dan CPU tetap rendah.
4. **Modern UI/UX**: Menggunakan prinsip *Glassmorphism* dan *Framer Motion* untuk transisi yang premium namun tetap fungsional.

---
*Terakhir Diperbarui: 21 Februari 2026*
