# Dokumentasi QR Code untuk Tanda Tangan Elektronik

## Overview

Dokumen ini menjelaskan implementasi QR Code untuk tanda tangan elektronik di aplikasi. QR Code digunakan untuk memverifikasi keaslian dokumen dengan menyimpan informasi tanda tangan elektronik yang dapat di-scan dan diverifikasi.

## Library yang Digunakan

### Frontend (React)
- **Library**: `qrcode` (npm package)
- **Install**: `npm install qrcode`
- **Import**: `import QRCode from "qrcode";`

### Backend (Laravel)
- **Library**: `simplesoftwareio/simple-qrcode`
- **Facade**: `SimpleSoftwareIO\QrCode\Facades\QrCode`

## Implementasi Saat Ini

### 1. Cetak Resep (Frontend)

**File**: `resources/js/Pages/farmasi/DaftarPermintaanResep.jsx`

**Fungsi**: `cetakResep()`

```javascript
import QRCode from "qrcode";

// Generate QR code di frontend
const qrText = `Dokumen ini ditandatangani secara elektronik oleh ${namaDokter} pada tanggal ${tglResep} Jam ${jamResep} di ${kop}`;

const qrCodeSvg = await QRCode.toString(qrText, {
    type: 'svg',
    width: 100,
    margin: 1,
    errorCorrectionLevel: 'H'
});
```

**Format Teks QR Code**:
```
Dokumen ini ditandatangani secara elektronik oleh {dokter} pada tanggal {tanggal} Jam {jam} di {nama_instansi}
```

**Contoh**:
```
Dokumen ini ditandatangani secara elektronik oleh dr. Ratna Candrasari pada tanggal 28/11/2025 Jam 00:38:06 di KLINIK KHANZA SAKTI
```

### 2. Cetak Laboratorium (Backend)

**File**: `app/Http/Controllers/PermintaanLabController.php`

**Method**: `generateQrCodePetugasData()` dan `generateQrCodeDokterData()`

```php
use SimpleSoftwareIO\QrCode\Facades\QrCode;

$qrCodeSvg = QrCode::size(100)
    ->errorCorrection('H')
    ->generate($qrText);
```

## Struktur Data QR Code

### Informasi yang Disimpan

1. **Nama Dokter/Petugas**: Nama lengkap yang menandatangani dokumen
2. **Tanggal**: Tanggal penandatanganan (format: DD/MM/YYYY)
3. **Jam**: Waktu penandatanganan (format: HH:MM:SS)
4. **Nama Instansi**: Nama institusi/klinik/rumah sakit

### Format Standar

```
Dokumen ini ditandatangani secara elektronik oleh {nama} pada tanggal {tanggal} Jam {jam} di {instansi}
```

## Posisi QR Code di Dokumen

### Cetak Resep
- **Posisi**: Pojok kanan bawah
- **Ukuran**: 60x60px (dalam HTML), 100px saat generate
- **Styling**: 
  - Position: absolute
  - Bottom: 10mm
  - Right: 10mm

### Cetak Laboratorium
- **Posisi**: Di bawah label "Petugas Lab" dan "Dokter Penanggung Jawab"
- **Ukuran**: 100px
- **Styling**: Border 1px solid #000, padding 5px

## Error Correction Level

Menggunakan **Level H (High)** untuk:
- Maksimal error correction (sekitar 30%)
- Memastikan QR code tetap bisa di-scan meskipun ada kerusakan kecil
- Cocok untuk dokumen yang mungkin terlipat atau terpotong saat print

## Cara Menggunakan

### Frontend (React)

```javascript
import QRCode from "qrcode";

// Generate sebagai SVG
const qrSvg = await QRCode.toString(text, {
    type: 'svg',
    width: 100,
    margin: 1,
    errorCorrectionLevel: 'H'
});

// Generate sebagai Data URL (base64 image)
const qrDataUrl = await QRCode.toDataURL(text, {
    width: 100,
    margin: 1,
    errorCorrectionLevel: 'H'
});

// Generate sebagai Canvas
const canvas = document.createElement('canvas');
await QRCode.toCanvas(canvas, text, {
    width: 100,
    margin: 1,
    errorCorrectionLevel: 'H'
});
```

### Backend (Laravel)

```php
use SimpleSoftwareIO\QrCode\Facades\QrCode;

// Generate sebagai SVG
$svg = QrCode::size(100)
    ->errorCorrection('H')
    ->format('svg')
    ->generate($text);

// Generate sebagai PNG (base64)
$png = QrCode::size(100)
    ->errorCorrection('H')
    ->format('png')
    ->generate($text);

// Generate sebagai PNG dan encode base64
$base64 = base64_encode(QrCode::size(100)
    ->errorCorrection('H')
    ->format('png')
    ->generate($text));
```

## Endpoint API (Opsional)

Jika ingin menggunakan backend untuk generate QR code:

**Route**: `GET /api/resep/qrcode`

**Parameters**:
- `dokter` (required): Nama dokter
- `tanggal` (required): Tanggal peresepan
- `instansi` (required): Nama instansi

**Response**:
```json
{
    "success": true,
    "svg": "<svg>...</svg>"
}
```

**Contoh Penggunaan**:
```javascript
const response = await fetch(`/api/resep/qrcode?dokter=${dokter}&tanggal=${tanggal}&instansi=${instansi}`);
const data = await response.json();
const qrSvg = data.svg;
```

## Verifikasi QR Code

### Cara Verifikasi Manual

1. Scan QR code menggunakan aplikasi scanner QR code di smartphone
2. Hasil scan akan menampilkan teks informasi tanda tangan elektronik
3. Bandingkan informasi yang di-scan dengan informasi di dokumen:
   - Nama dokter/petugas
   - Tanggal dan jam
   - Nama instansi

### Implementasi Verifikasi Otomatis (Future)

Untuk pengembangan lanjutan, bisa dibuat sistem verifikasi otomatis dengan:

1. **Database Tanda Tangan Elektronik**
   - Simpan hash dari QR code text
   - Simpan metadata (dokter, tanggal, jam, instansi)
   - Simpan timestamp dan IP address

2. **API Verifikasi**
   - Endpoint untuk verifikasi QR code
   - Compare dengan data di database
   - Return status valid/invalid

3. **Web Interface Verifikasi**
   - Halaman khusus untuk scan dan verifikasi QR code
   - Tampilkan informasi dokumen yang terverifikasi
   - Log history verifikasi

## Best Practices

### 1. Ukuran QR Code
- **Minimum**: 60x60px untuk tampilan di layar
- **Recommended**: 100x100px untuk print
- **Print**: Minimal 20mm x 20mm (sekitar 75px pada 96 DPI)

### 2. Margin
- Gunakan margin minimal 1-2 untuk memastikan QR code tidak terpotong
- Margin membantu scanner mengenali QR code dengan lebih baik

### 3. Error Correction Level
- **L (Low)**: ~7% error correction - untuk QR code kecil
- **M (Medium)**: ~15% error correction - untuk penggunaan umum
- **Q (Quartile)**: ~25% error correction - untuk print yang mungkin rusak
- **H (High)**: ~30% error correction - **Recommended untuk dokumen medis**

### 4. Format Output
- **SVG**: Recommended untuk web dan print (scalable, tidak blur)
- **PNG**: Untuk kebutuhan khusus atau kompatibilitas
- **Canvas**: Untuk manipulasi lebih lanjut di JavaScript

### 5. Keamanan
- Jangan simpan informasi sensitif (password, token) di QR code
- Gunakan hash atau signature digital untuk verifikasi keaslian
- Simpan log verifikasi untuk audit trail

## Contoh Implementasi Lengkap

### Frontend - Generate dan Tampilkan QR Code

```javascript
import QRCode from "qrcode";

const generateQrCode = async (dokter, tanggal, jam, instansi) => {
    const qrText = `Dokumen ini ditandatangani secara elektronik oleh ${dokter} pada tanggal ${tanggal} Jam ${jam} di ${instansi}`;
    
    try {
        // Generate sebagai SVG
        const qrSvg = await QRCode.toString(qrText, {
            type: 'svg',
            width: 100,
            margin: 1,
            errorCorrectionLevel: 'H'
        });
        
        return qrSvg;
    } catch (error) {
        console.error("Error generating QR code:", error);
        return null;
    }
};

// Penggunaan dalam komponen
const MyComponent = () => {
    const [qrSvg, setQrSvg] = useState("");
    
    useEffect(() => {
        const loadQrCode = async () => {
            const svg = await generateQrCode(
                "dr. Ratna Candrasari",
                "28/11/2025",
                "00:38:06",
                "KLINIK KHANZA SAKTI"
            );
            setQrSvg(svg);
        };
        
        loadQrCode();
    }, []);
    
    return (
        <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
    );
};
```

### Backend - Generate QR Code untuk API

```php
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

public function generateQrCode(Request $request): JsonResponse
{
    $request->validate([
        'dokter' => 'required|string',
        'tanggal' => 'required|string',
        'jam' => 'required|string',
        'instansi' => 'required|string',
    ]);

    $dokter = $request->input('dokter');
    $tanggal = $request->input('tanggal');
    $jam = $request->input('jam');
    $instansi = $request->input('instansi');

    $qrText = "Dokumen ini ditandatangani secara elektronik oleh {$dokter} pada tanggal {$tanggal} Jam {$jam} di {$instansi}";

    $qrCodeSvg = QrCode::size(100)
        ->errorCorrection('H')
        ->format('svg')
        ->generate($qrText);

    return response()->json([
        'success' => true,
        'svg' => $qrCodeSvg
    ], 200, [], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}
```

## Troubleshooting

### QR Code Tidak Tampil

1. **Cek Console Browser**
   - Pastikan tidak ada error JavaScript
   - Cek apakah library qrcode ter-load dengan benar

2. **Cek SVG Output**
   - Pastikan SVG string valid
   - Cek apakah SVG di-inject dengan benar ke HTML

3. **Cek Ukuran**
   - Pastikan container memiliki ukuran yang cukup
   - Cek CSS untuk overflow atau hidden

### QR Code Tidak Bisa Di-scan

1. **Ukuran Terlalu Kecil**
   - Increase size QR code (minimal 100px)
   - Pastikan ukuran saat print cukup besar

2. **Error Correction Level Terlalu Rendah**
   - Gunakan level H (High) untuk print
   - Pastikan margin cukup

3. **Kualitas Print Buruk**
   - Gunakan printer dengan resolusi tinggi
   - Pastikan kertas tidak terlipat atau rusak

## Pengembangan Lanjutan

### 1. Digital Signature dengan Hash

Tambahkan hash atau digital signature untuk keamanan lebih:

```javascript
import crypto from 'crypto';

const generateSignedQrCode = async (data) => {
    // Generate hash dari data
    const hash = crypto.createHash('sha256')
        .update(JSON.stringify(data))
        .digest('hex');
    
    // Tambahkan hash ke QR code text
    const qrText = `${data.text}\nHash: ${hash}`;
    
    return await QRCode.toString(qrText, {
        type: 'svg',
        width: 100,
        margin: 1,
        errorCorrectionLevel: 'H'
    });
};
```

### 2. Database Tanda Tangan Elektronik

Buat tabel untuk menyimpan tanda tangan elektronik:

```php
Schema::create('digital_signatures', function (Blueprint $table) {
    $table->id();
    $table->string('document_type'); // resep, lab, dll
    $table->string('document_id'); // no_resep, noorder, dll
    $table->string('signer_name'); // nama dokter/petugas
    $table->string('signer_id'); // kd_dokter, nik, dll
    $table->dateTime('signed_at');
    $table->string('qr_hash'); // hash dari QR code text
    $table->text('qr_text'); // full text QR code
    $table->timestamps();
    
    $table->index(['document_type', 'document_id']);
    $table->index('qr_hash');
});
```

### 3. API Verifikasi

Buat endpoint untuk verifikasi QR code:

```php
public function verifyQrCode(Request $request): JsonResponse
{
    $request->validate([
        'qr_text' => 'required|string',
    ]);

    $qrText = $request->input('qr_text');
    $hash = hash('sha256', $qrText);

    $signature = DigitalSignature::where('qr_hash', $hash)->first();

    if (!$signature) {
        return response()->json([
            'success' => false,
            'message' => 'QR code tidak ditemukan di database'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'verified' => true,
        'data' => [
            'document_type' => $signature->document_type,
            'document_id' => $signature->document_id,
            'signer_name' => $signature->signer_name,
            'signed_at' => $signature->signed_at,
        ]
    ]);
}
```

## Referensi

- [QRCode.js Documentation](https://github.com/soldair/node-qrcode)
- [SimpleSoftwareIO QRCode Laravel](https://www.simplesoftware.io/docs/simple-qrcode)
- [QR Code Error Correction Levels](https://www.qrcode.com/en/about/error_correction.html)

## Changelog

### 2025-11-28
- Implementasi QR code untuk cetak resep menggunakan library `qrcode` (npm)
- Format: "Dokumen ini ditandatangani secara elektronik oleh {dokter} pada tanggal {tanggal} Jam {jam} di {instansi}"
- Posisi: Pojok kanan bawah dokumen resep
- Ukuran: 60x60px di HTML, 100px saat generate
