# Dokumentasi Tabel Kamar

## Deskripsi
Tabel `kamar` menyimpan informasi tentang kamar rawat inap di rumah sakit. Setiap kamar memiliki kode unik, terkait dengan bangsal tertentu, memiliki tarif, status ketersediaan, kelas, dan status data.

## Struktur Tabel

### Nama Tabel
`kamar`

### Primary Key
- `kd_kamar` (VARCHAR)

### Kolom-Kolom

| Kolom | Tipe Data | Panjang | Nullable | Default | Deskripsi |
|-------|-----------|---------|----------|---------|-----------|
| `kd_kamar` | VARCHAR | - | NO | - | Kode kamar (Primary Key) |
| `kd_bangsal` | CHAR | - | NO | - | Kode bangsal (Foreign Key ke tabel `bangsal`) |
| `trf_kamar` | DOUBLE | - | YES | NULL | Tarif kamar per hari |
| `status` | ENUM | - | YES | NULL | Status kamar: `'KOSONG'` atau `'ISI'` |
| `kelas` | ENUM | - | YES | NULL | Kelas kamar: `'1'`, `'2'`, `'3'`, `'VIP'`, `'Utama'` |
| `statusdata` | ENUM | - | YES | NULL | Status data: `'0'` (non-aktif) atau `'1'` (aktif) |

### Indexes

1. **Primary Key**
   - Kolom: `kd_kamar`
   - Tipe: BTREE
   - Unique: Yes

2. **Foreign Key Index**
   - Kolom: `kd_bangsal`
   - Tipe: BTREE
   - Unique: No

3. **Status Index**
   - Kolom: `status`
   - Tipe: BTREE
   - Unique: No

4. **Kelas Index**
   - Kolom: `kelas`
   - Tipe: BTREE
   - Unique: No

5. **Statusdata Index**
   - Kolom: `statusdata`
   - Tipe: BTREE
   - Unique: No

6. **Tarif Index**
   - Kolom: `trf_kamar`
   - Tipe: BTREE
   - Unique: No

### Foreign Keys

1. **kamar_ibfk_1**
   - Kolom: `kd_bangsal`
   - Referensi: `bangsal.kd_bangsal`
   - On Update: CASCADE
   - On Delete: CASCADE

## Relasi dengan Tabel Lain

### 1. Bangsal (Many-to-One)
- **Relasi**: Setiap kamar dimiliki oleh satu bangsal
- **Foreign Key**: `kd_bangsal` → `bangsal.kd_bangsal`
- **Cascade**: Update dan Delete akan cascade ke kamar

### 2. Kamar Inap (One-to-Many)
- **Relasi**: Satu kamar dapat digunakan oleh banyak pasien rawat inap (dalam waktu berbeda)
- **Tabel**: `kamar_inap`
- **Foreign Key**: `kamar_inap.kd_kamar` → `kamar.kd_kamar`

### 3. Set Harga Kamar (One-to-Many)
- **Relasi**: Satu kamar dapat memiliki banyak setting harga berdasarkan jenis pembayaran
- **Tabel**: `set_harga_kamar`
- **Foreign Key**: `set_harga_kamar.kd_kamar` → `kamar.kd_kamar`

## Status Kamar

### Status Ketersediaan (`status`)
- **`KOSONG`**: Kamar tersedia dan dapat digunakan untuk pasien baru
- **`ISI`**: Kamar sedang digunakan oleh pasien rawat inap

### Status Data (`statusdata`)
- **`0`**: Data kamar tidak aktif (tidak digunakan)
- **`1`**: Data kamar aktif (digunakan)

### Kelas Kamar (`kelas`)
- **`1`**: Kelas 1
- **`2`**: Kelas 2
- **`3`**: Kelas 3
- **`VIP`**: Kelas VIP
- **`Utama`**: Kelas Utama

## Aturan Bisnis

1. **Kode Kamar Unik**: Setiap kamar harus memiliki kode yang unik
2. **Bangsal Wajib**: Setiap kamar harus terkait dengan bangsal yang valid
3. **Status Ketersediaan**: Status kamar harus diupdate saat:
   - Pasien masuk kamar inap: `status` = `'ISI'`
   - Pasien keluar kamar inap: `status` = `'KOSONG'`
4. **Tarif Kamar**: Tarif dapat berbeda per jenis pembayaran melalui tabel `set_harga_kamar`
5. **Cascade Delete**: Jika bangsal dihapus, semua kamar di bangsal tersebut akan ikut terhapus

## Query Contoh

### 1. Menampilkan Semua Kamar Kosong
```sql
SELECT * FROM kamar 
WHERE status = 'KOSONG' 
AND statusdata = '1'
ORDER BY kd_bangsal, kd_kamar;
```

### 2. Menampilkan Kamar Berdasarkan Bangsal
```sql
SELECT k.*, b.nm_bangsal 
FROM kamar k
INNER JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
WHERE k.kd_bangsal = 'B001'
AND k.statusdata = '1';
```

### 3. Menampilkan Kamar dengan Informasi Lengkap
```sql
SELECT 
    k.kd_kamar,
    k.kd_bangsal,
    b.nm_bangsal,
    k.trf_kamar,
    k.status,
    k.kelas,
    COUNT(ki.no_rawat) as jumlah_penggunaan
FROM kamar k
INNER JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
LEFT JOIN kamar_inap ki ON k.kd_kamar = ki.kd_kamar 
    AND ki.stts_pulang = '-'
WHERE k.statusdata = '1'
GROUP BY k.kd_kamar, k.kd_bangsal, b.nm_bangsal, k.trf_kamar, k.status, k.kelas;
```

### 4. Update Status Kamar Menjadi Terisi
```sql
UPDATE kamar 
SET status = 'ISI' 
WHERE kd_kamar = 'K001';
```

### 5. Update Status Kamar Menjadi Kosong
```sql
UPDATE kamar 
SET status = 'KOSONG' 
WHERE kd_kamar = 'K001';
```

## Model Eloquent

### Model: `App\Models\Kamar`

```php
use App\Models\Kamar;

// Get semua kamar kosong
$kamarKosong = Kamar::kosong()->aktif()->get();

// Get kamar by bangsal
$kamar = Kamar::byBangsal('B001')->get();

// Get kamar dengan relasi bangsal
$kamar = Kamar::with('bangsal')->find('K001');

// Update status kamar
$kamar = Kamar::find('K001');
$kamar->update(['status' => 'ISI']);
```

## Controller API

### Endpoints yang Tersedia

1. **GET** `/api/kamar` - List semua kamar (dengan filter)
2. **GET** `/api/kamar/{kd_kamar}` - Detail kamar
3. **POST** `/api/kamar` - Tambah kamar baru
4. **PUT** `/api/kamar/{kd_kamar}` - Update kamar
5. **DELETE** `/api/kamar/{kd_kamar}` - Hapus kamar
6. **GET** `/api/kamar/bangsal/{kd_bangsal}` - Kamar berdasarkan bangsal
7. **GET** `/api/kamar/kosong` - Kamar yang kosong
8. **PUT** `/api/kamar/{kd_kamar}/status` - Update status kamar

## Catatan Penting

1. **Integritas Data**: Pastikan `kd_bangsal` selalu valid sebelum insert/update
2. **Status Update**: Status kamar harus selalu sinkron dengan data di `kamar_inap`
3. **Tarif Dinamis**: Gunakan tabel `set_harga_kamar` untuk tarif berbeda per jenis pembayaran
4. **Soft Delete**: Pertimbangkan menggunakan soft delete untuk menjaga riwayat data
5. **Audit Trail**: Pertimbangkan membuat tabel audit untuk tracking perubahan status kamar
