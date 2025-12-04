# Cara Membuat Dokumentasi User

Panduan singkat menyusun halaman dokumentasi pengguna agar otomatis muncul di menu Dokumentasi dan mempermudah pengembangan lanjutan.

## Lokasi & Penamaan
- Simpan file di `docs/DokumentasiUser/`.
- Gunakan nama file deskriptif, misalnya: `MasterData.md`, `Cara_Membuat_Dokumentasi_user.md`, `Fitur_Pembayaran.md`.
- Nama file akan otomatis diubah menjadi judul menu: karakter `_` atau `-` diubah menjadi spasi, dan huruf besar/kecil dirapikan.
- Menu "Install Aplikasi" selalu ditempatkan paling atas (berdasarkan `InstallAplikasi.md`).

## Struktur Konten Minimal
- Judul utama: `# Nama Topik`
- Ringkasan singkat tujuan halaman
- Prasyarat (opsional)
- Langkah-langkah penggunaan/konfigurasi
- Troubleshooting (opsional)
- Tautan terkait (opsional)

Contoh kerangka:

```md
# Nama Topik

Ringkasan singkat tentang topik ini.

## Prasyarat
- Item 1
- Item 2

## Langkah-langkah
1) Langkah pertama
2) Langkah kedua

## Troubleshooting
- Masalah umum dan solusinya.

## Tautan
- [Dokumen Terkait](https://contoh.link)
```

## Gaya Penulisan
- Gunakan poin `-` untuk daftar, dan `1)`/`1.` untuk langkah berurutan.
- Tampilkan perintah/kode dengan blok tiga backticks:

```bash
php artisan optimize:clear
npm ci --include=dev
npm run build
```

- Sorot inline dengan backticks: `@vite`, `route('docs')`, `public/build`.

## Menyisipkan Gambar
- Simpan aset gambar di `public/img/` agar bisa diakses publik.
- Sisipkan dengan path absolut: `![Tangkapan Layar](/img/contoh.png)`.

## Cara Menampilkan di Aplikasi
- Buka halaman dokumentasi: `/docs` atau menu "DOC".
- Semua file `.md` di `docs/DokumentasiUser/` otomatis muncul di panel kiri.
- Klik nama menu untuk melihat ringkasan; tekan tombol "Tampilkan detail lengkap" bila ada.
- Bisa mem-fokuskan menu tertentu lewat URL parameter: `/docs/<nama menu>`, contoh: `/docs/install aplikasi`.

## Tips Penyusunan
- Fokus ke tindakan pengguna (apa yang harus dilakukan, urutan jelas).
- Hindari paragraf panjang; lebihkan daftar terstruktur.
- Tambahkan Troubleshooting bila ada kendala yang sering muncul.
- Jaga konsistensi istilah sesuai aplikasi (mis. "Rawat Jalan", "Laboratorium").

## Checklist Sebelum Publish
- [ ] Nama file deskriptif dan berada di `docs/DokumentasiUser/`
- [ ] Konten memiliki judul dan langkah-langkah jelas
- [ ] Link dan gambar berfungsi (`/img/...`)
- [ ] Aset dibangun (`npm run build`) di server production
- [ ] Cek halaman `/docs` untuk memastikan menu muncul

