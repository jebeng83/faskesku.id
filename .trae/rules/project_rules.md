# Aturan Proyek: Quality Checks

Tujuan: setiap selesai perubahan kode, jalankan pemeriksaan kualitas agar kode konsisten dan bebas error tipe.

Quality checks yang wajib dijalankan setelah setiap perubahan:

- Perintah lint: `npm run lint`
- Perintah typecheck: `npm run typecheck`

Catatan lingkungan:

- Jalankan di direktori root proyek: `/Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id`
- Gunakan shell zsh (default terminal)
- Tidak perlu output interaktif; hentikan pada keberhasilan atau laporkan error

Opsional (untuk sesi pengembangan berkelanjutan):

- Mode watch gabungan: `npm run dev:quality`
  - Menjalankan dev server, lint watch, dan typecheck watch secara paralel
  - Gunakan saat ingin inspeksi berkelanjutan, bukan sebagai hook pasca-edit

Kebijakan eksekusi:

- Jalankan lint dan typecheck setiap kali ada perubahan kode (apply patch)
- Jika salah satu perintah gagal, laporkan hasil lengkap dan jangan lanjutkan commit
- Tidak menjalankan perintah pada perubahan non-kode (misal file .md) kecuali diminta
