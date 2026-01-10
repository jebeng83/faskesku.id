# Status SRK

Panduan lengkap membuat pemeriksaan Status SRK (Skrining Kesehatan) melalui endpoint backend dan menampilkan hasil "Sudah SRK" / "Belum SRK" di frontend.

## Tujuan
- Backend melakukan panggilan terautentikasi ke layanan Mobile JKN untuk memeriksa apakah peserta sudah melakukan SRK.
- Frontend menampilkan status secara jelas dan real-time di halaman pendaftaran/reg_periksa.

## Ringkas Mekanisme
- Pemeriksaan SRK dilakukan dengan melakukan request simulasi pendaftaran antrean ke endpoint Mobile JKN `antreanfktp/antrean/add` menggunakan data minimal peserta.
- Jika layanan mengembalikan pesan yang mengindikasikan peserta belum skrining kesehatan, tampilkan "Belum SRK". Jika tidak ada indikasi tersebut atau berhasil, tampilkan "Sudah SRK".
- Endpoint harus diakses dengan metode POST. Pemakaian metode selain POST akan menghasilkan "Method Not Allowed" dari server.

## Desain Endpoint Backend
- **Route:** `POST /api/mobilejkn/srk/check`
- **Request Body (JSON):**
  - `no_rkm_medis` (string, wajib)
  - `kd_poli` (string, wajib)
  - `kd_dokter` (string, wajib)
  - `tanggalperiksa` (string, format `YYYY-MM-DD`, wajib)
- **Response (JSON):**
  - `status`: `SUDAH_SRK` | `BELUM_SRK` | `UNKNOWN`
  - `message`: penjelasan singkat yang aman ditampilkan ke pengguna
  - `metadata`: objek ringkas hasil dari layanan (boleh dihilangkan pada mode produksi)

### Header Autentikasi ke Mobile JKN
- `X-cons-id`: ID konsumen
- `X-timestamp`: epoch detik (UTC)
- `X-signature`: HMAC SHA256 dari `consId & timestamp` menggunakan secret key, hasil Base64
- `X-authorization`: skema otorisasi (mis. `Basic <token>` jika diwajibkan)
- `user_key`: kunci pengguna yang diberikan BPJS

Kredensial berada di tabel `setting_briding_mobilejkn`.

### Payload Simulasi Pendaftaran Antrean
Gunakan payload minimal untuk memicu verifikasi SRK tanpa benar-benar menambah antrean produksi:

```json
{
  "nomorkartu": "0001441909697",
  "nik": "3313161201830001",
  "nohp": "085229977208",
  "kodepoli": "INT",
  "namapoli": "Poli Internal",
  "norm": "000542.5",
  "tanggalperiksa": "2025-12-30",
  "kodedokter": 999999,
  "namadokter": "Dokter SRK Check",
  "jampraktek": "00:01-00:02",
  "nomorantrean": "000",
  "angkaantrean": 0,
  "keterangan": "SRK check only"
}
```

### Catatan Implementasi Controller
- Validasi input: `no_rkm_medis`, `kd_poli`, `kd_dokter`, `tanggalperiksa`.
- Bangun payload `antrean/add` dari data lokal pasien, mapping poli/dokter, dan jadwal.
- Kirim `POST antrean/add` dan parse respons; jika `metadata.message` mengandung "skrining kesehatan/skrining" tetapkan `BELUM_SRK`, jika `metadata.code` 200 tanpa indikasi tersebut tetapkan `SUDAH_SRK`, selain itu `UNKNOWN`.

> Catatan: Endpoint harus menggunakan POST. Pemanggilan langsung tanpa autentikasi atau dengan metode selain POST akan berujung pada `Method Not Allowed` dari server Mobile JKN.

## Integrasi Frontend


### Alur
1. Setelah input `kd_poli`, `kd_dokter`, dan `tanggalperiksa` valid, panggil `POST /api/mobilejkn/srk/check`.
2. Tampilkan badge: hijau untuk "Sudah SRK", merah untuk "Belum SRK", kuning/abu untuk "Unknown".

### Contoh Kode (React)
```jsx
async function cekSRK({ no_rkm_medis, kd_poli, kd_dokter, tanggalperiksa }) {
  const res = await fetch('/api/mobilejkn/srk/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ no_rkm_medis, kd_poli, kd_dokter, tanggalperiksa })
  });
  return res.json();
}

function StatusSRKBadge({ status, message }) {
  const map = {
    SUDAH_SRK: { text: 'Sudah SRK', className: 'badge badge-success' },
    BELUM_SRK: { text: 'Belum SRK', className: 'badge badge-danger' },
    UNKNOWN: { text: 'Tidak Dapat Memeriksa', className: 'badge badge-secondary' }
  };
  const { text, className } = map[status] || map.UNKNOWN;
  return (
    <div>
      <span className={className} style={{ fontSize: 14 }}>{text}</span>
      {message ? <div className="text-muted" style={{ fontSize: 12 }}>{message}</div> : null}
    </div>
  );
}

const [srkStatus, setSrkStatus] = React.useState({ status: 'UNKNOWN', message: '' });

async function onCekSRKClick() {
  const payload = { no_rkm_medis, kd_poli, kd_dokter, tanggalperiksa };
  try {
    const result = await cekSRK(payload);
    setSrkStatus({ status: result.status, message: result.message });
  } catch (e) {
    setSrkStatus({ status: 'UNKNOWN', message: 'Gagal menghubungi server' });
  }
}

<button className="btn btn-sm btn-outline-info" onClick={onCekSRKClick}>Cek SRK</button>
<StatusSRKBadge status={srkStatus.status} message={srkStatus.message} />
```

## Logging & Observabilitas
- Log setiap request POST ke backend dengan informasi waktu, URL, panjang respons dan status code.
- Contoh log:
```
local.INFO: BPJS MOBILEJKN Request POST Details {"url":"https://apijkn.bpjs-kesehatan.go.id/antreanfktp/antrean/add","timestamp":"1767048656","utc_time":"2025-12-29 22:50:56","data":{...}}
local.INFO: BPJS MOBILEJKN Request POST Headers {"headers":{...}}
local.INFO: BPJS MOBILEJKN Response POST Details {"status_code":200,"response_length":58}
```

## Penanganan Error
- `Method Not Allowed`: pastikan metode adalah POST dan path benar.
- Timeout/koneksi: tampilkan status `UNKNOWN` di frontend dan beri opsi coba lagi.
- Pesan berisi "skrining kesehatan": dianggap `BELUM_SRK`.

## Keamanan
- Jangan expose `X-cons-id`, `X-signature`, `user_key` di frontend.
- Simpan kredensial di `.env` dan akses via `config/services.php`.

## Uji Coba
1. Gunakan data uji pada payload untuk mencoba skenario.
2. Pastikan badge di frontend berubah sesuai respons.
3. Simulasikan gangguan jaringan untuk memverifikasi status `UNKNOWN`.
