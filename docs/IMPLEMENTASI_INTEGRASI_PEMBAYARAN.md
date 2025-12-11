# Implementasi Integrasi Pembayaran untuk Rawat Jalan

## Ringkasan

Implementasi integrasi pembayaran untuk modul Rawat Jalan telah selesai. Sistem ini mencakup:

1. **Model TagihanSadewa** - Pencatatan tagihan dan status pembayaran
2. **Model BayarPiutang** - Pencatatan cicilan piutang pasien
3. **Controller untuk CRUD** - Endpoint API lengkap untuk tagihan dan pembayaran
4. **Integrasi Otomatis** - Tagihan otomatis dibuat setelah snapshot billing dan pembuatan nota_jalan

## Model yang Dibuat

### 1. TagihanSadewa (`app/Models/Akutansi/TagihanSadewa.php`)

**Struktur Tabel:**
- `no_nota` (PK) - Nomor nota dari `nota_jalan`
- `no_rkm_medis` - Nomor rekam medis pasien
- `nama_pasien` - Nama pasien
- `alamat` - Alamat pasien
- `tgl_bayar` - Tanggal pembayaran
- `jenis_bayar` - Enum: 'Pelunasan', 'Deposit', 'Cicilan', 'Uang Muka'
- `jumlah_tagihan` - Total tagihan dari billing
- `jumlah_bayar` - Jumlah yang sudah dibayar
- `status` - Enum: 'Sudah', 'Belum'
- `petugas` - Nama petugas yang mencatat

**Relasi:**
- `belongsTo(Patient)` - Data pasien
- `belongsTo(NotaJalan)` - Nota jalan terkait

**Method Helper:**
- `isLunas()` - Cek apakah sudah lunas
- `isBelumBayar()` - Cek apakah belum bayar
- `getSisaTagihanAttribute()` - Hitung sisa tagihan

### 2. BayarPiutang (`app/Models/Akutansi/BayarPiutang.php`)

**Struktur Tabel (Composite Key):**
- `tgl_bayar` (PK)
- `no_rkm_medis` (PK)
- `no_rawat` (PK)
- `kd_rek` (PK) - Rekening debet
- `kd_rek_kontra` (PK) - Rekening kredit
- `besar_cicilan` - Nominal cicilan
- `catatan` - Catatan pembayaran
- `diskon_piutang` - Diskon yang diberikan
- `kd_rek_diskon_piutang` - Rekening untuk diskon
- `tidak_terbayar` - Nominal yang tidak terbayar
- `kd_rek_tidak_terbayar` - Rekening untuk tidak terbayar

**Relasi:**
- `belongsTo(Patient)` - Data pasien
- `belongsTo(RegPeriksa)` - Registrasi periksa
- `belongsTo(Rekening)` - Rekening debet
- `belongsTo(Rekening, kd_rek_kontra)` - Rekening kredit
- `belongsTo(Rekening, kd_rek_diskon_piutang)` - Rekening diskon
- `belongsTo(Rekening, kd_rek_tidak_terbayar)` - Rekening tidak terbayar

## Controller yang Dibuat

### 1. TagihanSadewaController (`app/Http/Controllers/Akutansi/TagihanSadewaController.php`)

**Endpoint:**

- `GET /api/akutansi/tagihan` - List tagihan dengan filter
  - Query params: `no_nota`, `no_rkm_medis`, `status`, `jenis_bayar`, `start_date`, `end_date`

- `GET /api/akutansi/tagihan/{no_nota}` - Detail tagihan

- `POST /api/akutansi/tagihan` - Buat tagihan baru
  - Body: `no_nota`, `no_rkm_medis?`, `jenis_bayar?`, `jumlah_bayar?`, `petugas?`

- `PUT /api/akutansi/tagihan/{no_nota}` - Update pembayaran tagihan
  - Body: `jumlah_bayar`, `jenis_bayar?`, `petugas?`

- `POST /api/akutansi/tagihan/{no_nota}/payment` - Tambah pembayaran (untuk cicilan)
  - Body: `tambahan_bayar`, `petugas?`

- `DELETE /api/akutansi/tagihan/{no_nota}` - Hapus tagihan (hanya jika belum ada pembayaran)

**Method Static:**
- `createFromNota(string $noNota, ?string $petugas)` - Buat tagihan otomatis dari nota_jalan

### 2. BayarPiutangController (`app/Http/Controllers/Akutansi/BayarPiutangController.php`)

**Endpoint:**

- `GET /api/akutansi/bayar-piutang` - List pembayaran piutang dengan filter
  - Query params: `no_rkm_medis`, `no_rawat`, `start_date`, `end_date`

- `GET /api/akutansi/bayar-piutang/show` - Detail pembayaran piutang
  - Query params: `tgl_bayar`, `no_rkm_medis`, `no_rawat`, `kd_rek`, `kd_rek_kontra`

- `POST /api/akutansi/bayar-piutang` - Simpan pembayaran piutang (cicilan)
  - Body: `tgl_bayar`, `no_rkm_medis`, `no_rawat`, `besar_cicilan`, `kd_rek`, `kd_rek_kontra`, `catatan?`, `diskon_piutang?`, `kd_rek_diskon_piutang?`, `tidak_terbayar?`, `kd_rek_tidak_terbayar?`

- `PUT /api/akutansi/bayar-piutang` - Update pembayaran piutang
  - Query params: `tgl_bayar`, `no_rkm_medis`, `no_rawat`, `kd_rek`, `kd_rek_kontra`
  - Body: `besar_cicilan`, `catatan?`, `diskon_piutang?`, `kd_rek_diskon_piutang?`, `tidak_terbayar?`, `kd_rek_tidak_terbayar?`

- `DELETE /api/akutansi/bayar-piutang` - Hapus pembayaran piutang
  - Query params: `tgl_bayar`, `no_rkm_medis`, `no_rawat`, `kd_rek`, `kd_rek_kontra`

- `GET /api/akutansi/bayar-piutang/total` - Get total piutang pasien
  - Query params: `no_rkm_medis`

## Integrasi Otomatis

### Alur Pembayaran End-to-End

1. **Snapshot Billing** (`POST /api/akutansi/nota-jalan/snapshot`)
   - Membuat snapshot billing ke tabel `billing`

2. **Buat Nota Jalan** (`POST /api/akutansi/nota-jalan`)
   - Membuat nomor nota ralan
   - **Otomatis membuat tagihan_sadewa** via `TagihanSadewaController::createFromNota()`
   - Tagihan dibuat dengan status 'Belum' dan jumlah_bayar = 0

3. **Stage & Posting Jurnal** (`POST /api/akutansi/jurnal/stage-from-billing` → `POST /api/akutansi/jurnal/post-staging`)
   - Stage jurnal dari billing
   - Posting jurnal dengan `no_nota` sebagai `no_bukti`

4. **Pembayaran Tagihan** (`PUT /api/akutansi/tagihan/{no_nota}` atau `POST /api/akutansi/tagihan/{no_nota}/payment`)
   - Update `jumlah_bayar` dan `status` tagihan
   - Jika `jumlah_bayar >= jumlah_tagihan`, status otomatis menjadi 'Sudah'

5. **Cicilan Piutang** (`POST /api/akutansi/bayar-piutang`)
   - Mencatat cicilan piutang pasien
   - Otomatis update tagihan_sadewa terkait jika ada

## Contoh Penggunaan

### 1. Buat Tagihan Otomatis (Sudah Terintegrasi)

Tagihan otomatis dibuat setelah pembuatan `nota_jalan`. Tidak perlu dipanggil manual.

```php
// Otomatis di NotaJalanController::store()
TagihanSadewaController::createFromNota($noNota, $petugas);
```

### 2. Update Pembayaran Tagihan

```javascript
// Frontend: Update pembayaran penuh
await axios.put(`/api/akutansi/tagihan/${noNota}`, {
    jumlah_bayar: 500000,
    jenis_bayar: 'Pelunasan',
    petugas: 'Kasir 1'
});

// Frontend: Tambah pembayaran (cicilan)
await axios.post(`/api/akutansi/tagihan/${noNota}/payment`, {
    tambahan_bayar: 100000,
    petugas: 'Kasir 1'
});
```

### 3. Catat Cicilan Piutang

```javascript
// Frontend: Catat cicilan piutang
await axios.post('/api/akutansi/bayar-piutang', {
    tgl_bayar: '2025-01-15',
    no_rkm_medis: '000001',
    no_rawat: '2025/01/15/000001',
    besar_cicilan: 200000,
    kd_rek: '110101', // Kas
    kd_rek_kontra: '112001', // Piutang Pasien
    catatan: 'Cicilan pertama',
    petugas: 'Kasir 1'
});
```

### 4. Get Total Piutang Pasien

```javascript
// Frontend: Cek total piutang pasien
const response = await axios.get('/api/akutansi/bayar-piutang/total', {
    params: { no_rkm_medis: '000001' }
});

// Response:
// {
//   success: true,
//   data: {
//     total_piutang: 1000000,
//     total_cicilan: 300000,
//     sisa_piutang: 700000
//   }
// }
```

## Integrasi dengan Gateway Pembayaran (Placeholder)

Untuk integrasi dengan gateway pembayaran eksternal (misalnya: Midtrans, Doku, dll), dapat ditambahkan:

1. **Service Class** untuk gateway pembayaran
2. **Webhook Handler** untuk callback dari gateway
3. **Update TagihanSadewa** setelah pembayaran berhasil

Contoh struktur:

```php
// app/Services/Payment/PaymentGatewayService.php
class PaymentGatewayService
{
    public function createPayment(TagihanSadewa $tagihan, array $options = [])
    {
        // Implementasi create payment di gateway
        // Return payment URL atau payment token
    }

    public function verifyPayment(string $paymentId)
    {
        // Implementasi verify payment dari gateway
        // Update TagihanSadewa jika berhasil
    }
}
```

## Catatan Penting

1. **Tagihan Otomatis**: Tagihan otomatis dibuat setelah `nota_jalan` dibuat. Pastikan billing sudah di-snapshot terlebih dahulu.

2. **Status Tagihan**: Status otomatis diupdate menjadi 'Sudah' jika `jumlah_bayar >= jumlah_tagihan`.

3. **Cicilan Piutang**: Setiap cicilan yang dicatat akan otomatis update tagihan_sadewa terkait jika ada.

4. **Validasi**: Tagihan tidak dapat dihapus jika sudah ada pembayaran (`jumlah_bayar > 0`).

5. **Composite Key**: `BayarPiutang` menggunakan composite key, sehingga update/delete memerlukan semua key fields.

## Testing

Untuk testing, pastikan:

1. ✅ Snapshot billing berhasil
2. ✅ Nota jalan dibuat dan tagihan otomatis terbuat
3. ✅ Pembayaran tagihan berhasil update status
4. ✅ Cicilan piutang berhasil dicatat dan update tagihan
5. ✅ Total piutang pasien terhitung dengan benar

## File yang Dibuat/Dimodifikasi

**Model:**
- ✅ `app/Models/Akutansi/TagihanSadewa.php` (BARU)
- ✅ `app/Models/Akutansi/BayarPiutang.php` (BARU)

**Controller:**
- ✅ `app/Http/Controllers/Akutansi/TagihanSadewaController.php` (BARU)
- ✅ `app/Http/Controllers/Akutansi/BayarPiutangController.php` (BARU)
- ✅ `app/Http/Controllers/Akutansi/NotaJalanController.php` (DIMODIFIKASI - tambah integrasi otomatis)

**Routes:**
- ✅ `routes/api.php` (DIMODIFIKASI - tambah route tagihan dan bayar-piutang)

## Status Implementasi

✅ **SELESAI** - Integrasi pembayaran untuk Rawat Jalan sudah lengkap dan siap digunakan.

**Fitur yang Tersedia:**
- ✅ Pencatatan tagihan otomatis setelah snapshot billing
- ✅ Update pembayaran tagihan
- ✅ Pencatatan cicilan piutang
- ✅ Tracking status pembayaran (Sudah/Belum)
- ✅ Perhitungan total piutang pasien
- ✅ API endpoint lengkap untuk CRUD

**Fitur yang Dapat Ditambahkan:**
- ⏳ Integrasi gateway pembayaran eksternal
- ⏳ Notifikasi pembayaran
- ⏳ Laporan pembayaran
- ⏳ Dashboard piutang pasien
