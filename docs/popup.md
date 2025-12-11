# Dokumentasi Pembuatan Popup Form

Dokumentasi ini menjelaskan cara membuat popup form untuk menambahkan data baru langsung dari form utama, seperti popup tambah Jenjang Jabatan di form Create Employee.

## Daftar Isi

1. [Konsep Dasar](#konsep-dasar)
2. [Struktur File](#struktur-file)
3. [Step-by-Step Implementation](#step-by-step-implementation)
4. [Contoh Lengkap](#contoh-lengkap)
5. [Styling Modal](#styling-modal)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

## Konsep Dasar

Popup form memungkinkan user untuk menambahkan data baru tanpa meninggalkan halaman form utama. Alur kerja:

1. User klik tombol "+" di field dropdown
2. Modal popup muncul dengan form
3. User mengisi form dan submit
4. Data baru tersimpan dan otomatis terpilih di dropdown
5. Modal tertutup dan form utama tetap utuh

## Struktur File

### Backend

```
app/
├── Http/
│   └── Controllers/
│       └── Kepegawaian/
│           └── [Nama]Controller.php  (misal: JenjangJabatanController.php)
└── Models/
    └── Kepegawaian/
        └── [Nama].php  (misal: JenjangJabatan.php)
```

### Frontend

```
resources/js/Pages/
└── [Folder]/
    └── Create.jsx  (atau Edit.jsx, Index.jsx)
```

### Routes

```php
// routes/web.php
Route::prefix('[nama-route]')->name('[nama-route].')->group(function () {
    Route::post('/', [[Nama]Controller::class, 'store'])->name('store');
    // ... routes lainnya
});
```

## Step-by-Step Implementation

### 1. Backend: Controller Setup

#### a. Buat Controller dengan method `store()` dan `generateKode()` (opsional)

**Catatan:** Jika popup memerlukan kode otomatis (seperti KP001, U0001, dll), tambahkan method `generateKode()` untuk generate kode baru berdasarkan nomor terakhir di tabel.

```php
<?php

namespace App\Http\Controllers\Kepegawaian;

use App\Http\Controllers\Controller;
use App\Models\Kepegawaian\JenjangJabatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class JenjangJabatanController extends Controller
{
    public function store(Request $request)
    {
        // Validasi
        $validator = Validator::make($request->all(), [
            'kode' => 'required|string|max:10|unique:jnj_jabatan,kode',
            'nama' => 'required|string|max:50',
            'tnj' => 'required|numeric',
            'indek' => 'nullable|integer',
        ], [
            'kode.required' => 'Kode harus diisi',
            'kode.unique' => 'Kode sudah digunakan',
            // ... pesan error lainnya
        ]);

        // Handle error validasi
        if ($validator->fails()) {
            // Untuk request dari Inertia, return redirect back dengan errors
            if ($request->header('X-Inertia')) {
                return redirect()->back()
                    ->withErrors($validator)
                    ->withInput();
            }
            // Untuk request JSON biasa (non-Inertia)
            if ($request->expectsJson() || $request->wantsJson()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Simpan data
        $data = $validator->validated();
        $jenjangJabatan = JenjangJabatan::create($data);

        // Return response untuk Inertia
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data berhasil ditambahkan.')
                ->with('[nama]Created', [
                    'kode' => $jenjangJabatan->kode,
                    'nama' => $jenjangJabatan->nama,
                ]);
        }

        // Return response untuk JSON biasa
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data berhasil ditambahkan.',
                'data' => $jenjangJabatan,
            ], 201);
        }

        // Default redirect
        return redirect()->route('[nama-route].index')
            ->with('success', 'Data berhasil ditambahkan.');
    }

    /**
     * Generate auto code dengan format tertentu (opsional)
     * Contoh: KP001, U0001, dll
     */
    public function generateKode()
    {
        try {
            // Get the last record dengan format tertentu
            // PENTING: Gunakan orderByRaw dengan CAST untuk sorting numerik, bukan string
            $lastRecord = [Model]::where('[field_kode]', 'like', '[PREFIX]%')
                ->orderByRaw('CAST(SUBSTRING([field_kode], [START_POSITION]) AS UNSIGNED) DESC')
                ->first();
            
            if (!$lastRecord) {
                $newCode = '[PREFIX]001'; // atau format default lainnya
            } else {
                // Extract number from last code
                $lastNumber = (int) substr($lastRecord->[field_kode], [START_POSITION]);
                $newNumber = $lastNumber + 1;
                $newCode = '[PREFIX]' . str_pad($newNumber, [PADDING_LENGTH], '0', STR_PAD_LEFT);
            }

            return response()->json([
                'success' => true,
                'kode' => $newCode
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal generate kode'
            ], 500);
        }
    }
}
```

**Contoh Implementasi Generate Kode:**

**1. Format KPXXX (3 digit, contoh: KP001, KP036):**
```php
public function generateKode()
{
    $lastRecord = KategoriPerawatan::where('kd_kategori', 'like', 'KP%')
        ->orderByRaw('CAST(SUBSTRING(kd_kategori, 3) AS UNSIGNED) DESC')
        ->first();
    
    if (!$lastRecord) {
        $newCode = 'KP001';
    } else {
        $lastNumber = (int) substr($lastRecord->kd_kategori, 2); // Ambil setelah "KP" (posisi 2)
        $newNumber = $lastNumber + 1;
        $newCode = 'KP' . str_pad($newNumber, 3, '0', STR_PAD_LEFT);
    }
    
    return response()->json(['success' => true, 'kode' => $newCode]);
}
```

**2. Format UXXXX (4 digit, contoh: U0001, U0099):**
```php
public function generateKode()
{
    $lastRecord = Poliklinik::where('kd_poli', 'like', 'U%')
        ->orderByRaw('CAST(SUBSTRING(kd_poli, 2) AS UNSIGNED) DESC')
        ->first();
    
    if (!$lastRecord) {
        $newCode = 'U0001';
    } else {
        $lastNumber = (int) substr($lastRecord->kd_poli, 1); // Ambil setelah "U" (posisi 1)
        $newNumber = $lastNumber + 1;
        $newCode = 'U' . str_pad($newNumber, 4, '0', STR_PAD_LEFT);
    }
    
    return response()->json(['success' => true, 'kode' => $newCode]);
}
```

**3. Format AXX (2 digit, contoh: A01, A60):**
```php
public function generateKode()
{
    $lastRecord = Penjab::where('kd_pj', 'like', 'A%')
        ->whereRaw('LENGTH(kd_pj) = 3') // Pastikan panjangnya 3 karakter (AXX)
        ->orderByRaw('CAST(SUBSTRING(kd_pj, 2) AS UNSIGNED) DESC')
        ->first();
    
    if (!$lastRecord) {
        $newCode = 'A01';
    } else {
        $lastNumber = (int) substr($lastRecord->kd_pj, 1); // Ambil setelah "A" (posisi 1)
        $newNumber = $lastNumber + 1;
        // Pastikan tidak melebihi 99
        if ($newNumber > 99) {
            return response()->json([
                'success' => false,
                'message' => 'Kode sudah mencapai batas maksimal (A99)'
            ], 400);
        }
        $newCode = 'A' . str_pad($newNumber, 2, '0', STR_PAD_LEFT);
    }
    
    return response()->json(['success' => true, 'kode' => $newCode]);
}
```

**Poin Penting:**
- ✅ Gunakan `orderByRaw('CAST(SUBSTRING(...) AS UNSIGNED) DESC')` untuk sorting numerik yang benar
- ✅ Jangan gunakan `orderBy('[field]', 'desc')` karena akan sorting secara string (KP002 > KP036)
- ✅ `SUBSTRING(field, N)` mengambil substring mulai dari karakter ke-N (1-based index)
- ✅ `str_pad($number, $length, '0', STR_PAD_LEFT)` untuk padding dengan leading zeros
- ✅ Tambahkan route: `Route::get('/[nama-route]/generate-kode', [[Controller]::class, 'generateKode'])->name('[nama-route].generate-kode');`

**Poin Penting untuk Method store():**
- ✅ Selalu cek `$request->header('X-Inertia')` untuk request dari Inertia
- ✅ Return `redirect()->back()->withErrors()` untuk error validasi
- ✅ Return `redirect()->back()->with('[nama]Created')` untuk success dengan data baru
- ✅ Jangan return JSON response untuk Inertia request (akan menyebabkan error)

### 2. Frontend: Setup State dan Form

#### a. Import dependencies

```jsx
import React, { useMemo, useState, useEffect } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { route } from "ziggy-js";
```

#### b. Setup state untuk modal dan options

**Catatan:** Jika popup memerlukan generate kode otomatis, tambahkan fungsi untuk memanggil API generate kode saat modal dibuka.

```jsx
export default function Create({ refs = {} }) {
    // State untuk modal
    const [show[Nama]Modal, setShow[Nama]Modal] = useState(false);
    
    // State untuk options dropdown (untuk update setelah create)
    const [[nama]Options, set[Nama]Options] = useState(
        (refs.[namaRef] || []).map((r) => ({ 
            value: r.kode, 
            label: `${r.kode} - ${r.nama}` 
        }))
    );

    // Sinkronisasi options ketika refs berubah
    useEffect(() => {
        const newOptions = (refs.[namaRef] || []).map((r) => ({ 
            value: r.kode, 
            label: `${r.kode} - ${r.nama}` 
        }));
        set[Nama]Options(newOptions);
    }, [refs.[namaRef]]);
```

#### c. Setup form untuk popup

```jsx
    // Form untuk popup
    const [nama]Form = useForm({
        kode: "",
        nama: "",
        // ... field lainnya
    });

    // Generate kode otomatis saat modal dibuka (opsional)
    const generateKode[Nama] = async () => {
        try {
            const response = await fetch(route('[nama-route].generate-kode'));
            const result = await response.json();
            if (result.success && result.kode) {
                [nama]Form.setData('kode', result.kode);
            }
        } catch (error) {
            console.error('Error generating code:', error);
        }
    };

    // Generate kode otomatis saat modal dibuka
    useEffect(() => {
        if (show[Nama]Modal) {
            generateKode[Nama]();
        }
    }, [show[Nama]Modal]);
```

#### d. Handler untuk submit popup

```jsx
    const handleTambah[Nama] = (e) => {
        e.preventDefault();
        [nama]Form.post(route("[nama-route].store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                // Cek apakah ada data yang baru dibuat dari flash message
                const createdData = page.props.flash?.[[nama]Created];
                if (createdData) {
                    const newKode = createdData.kode;
                    const newNama = createdData.nama;
                    if (newKode) {
                        // Set value ke form utama
                        setData("[field_name]", newKode);
                        
                        // Tambahkan ke options dropdown
                        const newOption = {
                            value: newKode,
                            label: `${newKode} - ${newNama}`,
                        };
                        set[Nama]Options((prev) => {
                            // Cek apakah sudah ada, jika belum tambahkan
                            const exists = prev.find((opt) => opt.value === newKode);
                            if (!exists) {
                                return [...prev, newOption];
                            }
                            return prev;
                        });
                    }
                } else {
                    // Fallback: gunakan data dari form
                    const newKode = [nama]Form.data.kode;
                    if (newKode) {
                        setData("[field_name]", newKode);
                        const newOption = {
                            value: newKode,
                            label: `${newKode} - ${[nama]Form.data.nama}`,
                        };
                        set[Nama]Options((prev) => {
                            const exists = prev.find((opt) => opt.value === newKode);
                            if (!exists) {
                                return [...prev, newOption];
                            }
                            return prev;
                        });
                    }
                }
                
                // Tutup modal dan reset form
                setShow[Nama]Modal(false);
                [nama]Form.reset();
                
                // Reload refs untuk sinkronisasi dengan server
                router.reload({ 
                    only: ["refs"], 
                    preserveScroll: true, 
                    preserveState: true 
                });
            },
            onError: () => {
                // Tetap buka modal jika ada error agar user bisa melihat error
                // Error akan otomatis ditampilkan oleh Inertia form
            },
        });
    };
```

### 3. Frontend: Update Options di useMemo

```jsx
    // Opsi referensi untuk SearchableSelect
    const options = useMemo(() => {
        // Gunakan state options, bukan langsung dari refs
        const [nama] = [nama]Options;
        // ... options lainnya
        
        return { [nama], /* ... */ };
    }, [refs, [nama]Options]);
```

### 4. Frontend: Tambahkan Tombol "+" di Field

```jsx
<div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        [Label Field]
    </label>
    <div className="flex gap-2">
        <div className="flex-1">
            <SearchableSelect
                options={options.[nama]}
                value={data.[field_name]}
                onChange={(v) => setData("[field_name]", v)}
                placeholder="Pilih [nama]"
                searchPlaceholder="Cari kode/nama [nama]"
                error={!!errors.[field_name]}
            />
        </div>
        <button
            type="button"
            onClick={() => setShow[Nama]Modal(true)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
            title="Tambah [Nama] Baru"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
            >
                <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                />
            </svg>
        </button>
    </div>
    {errors.[field_name] && (
        <p className="mt-1 text-sm text-red-600">{errors.[field_name]}</p>
    )}
</div>
```

### 5. Frontend: Buat Modal Component

```jsx
{/* Modal Tambah [Nama] */}
{show[Nama]Modal && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Tambah [Nama] Baru
                    </h3>
                    <button
                        type="button"
                        onClick={() => {
                            setShow[Nama]Modal(false);
                            [nama]Form.reset();
                            [nama]Form.setData('kode', ''); // Reset kode saat modal ditutup
                        }}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleTambah[Nama]} className="space-y-4">
                    {/* Field 1: Kode (dengan generate otomatis) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Kode *
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={[nama]Form.data.kode}
                                onChange={(e) => [nama]Form.setData("kode", e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                placeholder="Kode akan dibuat otomatis"
                                maxLength="10"
                                required
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={generateKode[Nama]}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                title="Generate Kode Baru"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5"
                                >
                                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2" />
                                </svg>
                            </button>
                        </div>
                        {[nama]Form.errors.kode && (
                            <p className="mt-1 text-sm text-red-600">
                                {[nama]Form.errors.kode}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Kode akan dibuat otomatis dengan format [FORMAT] (contoh: [CONTOH])
                        </p>
                    </div>

                    {/* Field 2 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nama *
                        </label>
                        <input
                            type="text"
                            value={[nama]Form.data.nama}
                            onChange={(e) => [nama]Form.setData("nama", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="Masukkan nama"
                            maxLength="50"
                            required
                        />
                        {[nama]Form.errors.nama && (
                            <p className="mt-1 text-sm text-red-600">
                                {[nama]Form.errors.nama}
                            </p>
                        )}
                    </div>

                    {/* Field lainnya... */}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setShow[Nama]Modal(false);
                                [nama]Form.reset();
                            }}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={[nama]Form.processing}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                        >
                            {[nama]Form.processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}
```

## Contoh Lengkap

Lihat implementasi lengkap di:
- **Backend**: 
  - `app/Http/Controllers/Kepegawaian/JenjangJabatanController.php` (popup Jenjang Jabatan)
  - `app/Http/Controllers/Kepegawaian/DepartemenController.php` (popup Departemen)
  - `app/Http/Controllers/Kepegawaian/BidangController.php` (popup Bidang)
  - `app/Http/Controllers/Kepegawaian/PendidikanController.php` (popup Pendidikan)
  - `app/Http/Controllers/Kepegawaian/ResikoKerjaController.php` (popup Resiko Kerja)
  - `app/Http/Controllers/Kepegawaian/KelompokJabatanController.php` (popup Kelompok Jabatan)
  - `app/Http/Controllers/Kepegawaian/EmergencyIndexController.php` (popup Emergency Index)
  - `app/Http/Controllers/Kepegawaian/BankController.php` (popup Bank)
  - `app/Http/Controllers/Kepegawaian/SttsWpController.php` (popup Status WP)
  - `app/Http/Controllers/Kepegawaian/SttsKerjaController.php` (popup Status Kerja)
- **Frontend**: `resources/js/Pages/Employees/Create.jsx`
  - Popup Jenjang Jabatan: baris 104-185 dan 1088-1211
  - Popup Departemen: baris 111-185 dan 1213-1300
  - Popup Bidang: baris 117-185 dan 1477-1558
  - Popup Pendidikan: baris 121-185 dan 1577-1718
  - Popup Resiko Kerja: baris 139-201 dan 1752-1861
  - Popup Kelompok Jabatan: baris 155-217 dan 2023-2132
  - Popup Emergency Index: baris 171-233 dan 2230-2339
  - Popup Bank: baris 182-242 dan 2430-2505
  - Popup Status WP: baris 191-252 dan 2597-2689
  - Popup Status Kerja: baris 216-279 dan 2798-2922

### Contoh Sederhana: Popup Departemen

Departemen hanya memiliki 2 field (dep_id dan nama), lebih sederhana dibanding Jenjang Jabatan:

**Backend Controller:**
```php
public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'dep_id' => 'required|string|max:4|unique:departemen,dep_id',
        'nama' => 'required|string|max:25',
    ], [
        'dep_id.required' => 'Kode Departemen harus diisi',
        'dep_id.unique' => 'Kode Departemen sudah digunakan',
        'dep_id.max' => 'Kode Departemen maksimal 4 karakter',
        'nama.required' => 'Nama Departemen harus diisi',
        'nama.max' => 'Nama Departemen maksimal 25 karakter',
    ]);

    // ... (sama seperti contoh Jenjang Jabatan)
}
```

**Frontend:**
```jsx
// State
const [showDepartemenModal, setShowDepartemenModal] = useState(false);
const [departemenOptions, setDepartemenOptions] = useState(
    (refs.departemen || []).map((r) => ({ 
        value: r.dep_id, 
        label: `${r.dep_id} - ${r.nama}` 
    }))
);

// Form
const departemenForm = useForm({
    dep_id: "",
    nama: "",
});

// Handler
const handleTambahDepartemen = (e) => {
    e.preventDefault();
    departemenForm.post(route("departemen.store"), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
            const createdData = page.props.flash?.departemenCreated;
            if (createdData) {
                setData("departemen", createdData.dep_id);
                // Update options...
            }
            setShowDepartemenModal(false);
            departemenForm.reset();
            router.reload({ only: ["refs"], preserveScroll: true, preserveState: true });
        },
    });
};
```

### Contoh Paling Sederhana: Popup Bidang

Bidang hanya memiliki 1 field (nama sebagai primary key), paling sederhana:

**Backend Controller:**
```php
public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'nama' => 'required|string|max:15|unique:bidang,nama',
    ], [
        'nama.required' => 'Nama Bidang harus diisi',
        'nama.unique' => 'Nama Bidang sudah digunakan',
        'nama.max' => 'Nama Bidang maksimal 15 karakter',
    ]);

    // ... (sama seperti contoh lainnya)
    
    // Flash message hanya berisi nama
    if ($request->header('X-Inertia')) {
        return redirect()->back()
            ->with('success', 'Data Bidang berhasil ditambahkan.')
            ->with('bidangCreated', [
                'nama' => $bidang->nama,
            ]);
    }
}
```

**Frontend:**
```jsx
// State
const [showBidangModal, setShowBidangModal] = useState(false);
const [bidangOptions, setBidangOptions] = useState(
    (refs.bidang || []).map((r) => ({ 
        value: r.nama, 
        label: r.nama 
    }))
);

// Form (hanya 1 field)
const bidangForm = useForm({
    nama: "",
});

// Handler
const handleTambahBidang = (e) => {
    e.preventDefault();
    bidangForm.post(route("bidang.store"), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
            const createdData = page.props.flash?.bidangCreated;
            if (createdData) {
                setData("bidang", createdData.nama);
                // Update options...
            }
            setShowBidangModal(false);
            bidangForm.reset();
            router.reload({ only: ["refs"], preserveScroll: true, preserveState: true });
        },
    });
};
```

**Modal Component (hanya 1 input field):**
```jsx
<form onSubmit={handleTambahBidang} className="space-y-4">
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nama Bidang *
        </label>
        <input
            type="text"
            value={bidangForm.data.nama}
            onChange={(e) => bidangForm.setData("nama", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Masukkan nama bidang"
            maxLength="15"
            required
        />
        {bidangForm.errors.nama && (
            <p className="mt-1 text-sm text-red-600">{bidangForm.errors.nama}</p>
        )}
    </div>
    {/* Actions buttons... */}
</form>
```

### Contoh dengan Multiple Optional Fields: Popup Pendidikan

Pendidikan memiliki 1 field required (tingkat) dan beberapa field optional (indek, gapok1, kenaikan, maksimal):

**Backend Controller:**
```php
public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'tingkat' => 'required|string|max:80|unique:pendidikan,tingkat',
        'indek' => 'nullable|integer',
        'gapok1' => 'nullable|numeric',
        'kenaikan' => 'nullable|numeric',
        'maksimal' => 'nullable|integer',
    ], [
        'tingkat.required' => 'Tingkat Pendidikan harus diisi',
        'tingkat.unique' => 'Tingkat Pendidikan sudah digunakan',
        'tingkat.max' => 'Tingkat Pendidikan maksimal 80 karakter',
        // ... pesan error lainnya
    ]);

    // ... (sama seperti contoh lainnya)
    
    // Flash message hanya berisi tingkat (yang diperlukan untuk dropdown)
    if ($request->header('X-Inertia')) {
        return redirect()->back()
            ->with('success', 'Data Pendidikan berhasil ditambahkan.')
            ->with('pendidikanCreated', [
                'tingkat' => $pendidikan->tingkat,
            ]);
    }
}
```

**Frontend Form:**
```jsx
// Form dengan multiple fields (1 required, beberapa optional)
const pendidikanForm = useForm({
    tingkat: "",
    indek: "",
    gapok1: "",
    kenaikan: "",
    maksimal: "",
});

// Handler sama seperti contoh lainnya
// Hanya tingkat yang digunakan untuk update dropdown
```

**Modal Component dengan Multiple Fields:**
```jsx
<form onSubmit={handleTambahPendidikan} className="space-y-4">
    {/* Field required */}
    <div>
        <label>Tingkat Pendidikan *</label>
        <input
            type="text"
            value={pendidikanForm.data.tingkat}
            onChange={(e) => pendidikanForm.setData("tingkat", e.target.value)}
            maxLength="80"
            required
        />
    </div>

    {/* Field optional */}
    <div>
        <label>Indek</label>
        <input
            type="number"
            value={pendidikanForm.data.indek}
            onChange={(e) => pendidikanForm.setData("indek", e.target.value)}
        />
    </div>

    {/* Field optional lainnya... */}
</form>
```

**Catatan:** Meskipun form memiliki banyak field, hanya field yang digunakan untuk dropdown (tingkat) yang perlu di-update di options setelah create berhasil.

### Contoh dengan 2 Required Fields: Popup Resiko Kerja

Resiko Kerja memiliki 2 field required (kode_resiko, nama_resiko) dan 1 field optional (indek):

**Backend Controller:**
```php
public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'kode_resiko' => 'required|string|max:3|unique:resiko_kerja,kode_resiko',
        'nama_resiko' => 'required|string|max:100',
        'indek' => 'nullable|integer',
    ], [
        'kode_resiko.required' => 'Kode Resiko harus diisi',
        'kode_resiko.unique' => 'Kode Resiko sudah digunakan',
        'kode_resiko.max' => 'Kode Resiko maksimal 3 karakter',
        'nama_resiko.required' => 'Nama Resiko harus diisi',
        'nama_resiko.max' => 'Nama Resiko maksimal 100 karakter',
        'indek.integer' => 'Indek harus berupa angka',
    ]);

    // ... (sama seperti contoh lainnya)
    
    // Flash message hanya berisi kode_resiko (yang diperlukan untuk dropdown)
    if ($request->header('X-Inertia')) {
        return redirect()->back()
            ->with('success', 'Data Resiko Kerja berhasil ditambahkan.')
            ->with('resikoKerjaCreated', [
                'kode_resiko' => $resikoKerja->kode_resiko,
            ]);
    }
}
```

**Frontend Form:**
```jsx
// Form dengan 2 required fields dan 1 optional
const resikoKerjaForm = useForm({
    kode_resiko: "",
    nama_resiko: "",
    indek: "",
});

// Handler menggunakan kode_resiko untuk update dropdown
// Label menggunakan format: `${kode_resiko} - ${nama_resiko}`
```

**Modal Component dengan 2 Required Fields:**
```jsx
<form onSubmit={handleTambahResikoKerja} className="space-y-4">
    {/* Field required 1 */}
    <div>
        <label>Kode Resiko *</label>
        <input
            type="text"
            value={resikoKerjaForm.data.kode_resiko}
            onChange={(e) => resikoKerjaForm.setData("kode_resiko", e.target.value)}
            maxLength="3"
            required
        />
    </div>

    {/* Field required 2 */}
    <div>
        <label>Nama Resiko *</label>
        <input
            type="text"
            value={resikoKerjaForm.data.nama_resiko}
            onChange={(e) => resikoKerjaForm.setData("nama_resiko", e.target.value)}
            maxLength="100"
            required
        />
    </div>

    {/* Field optional */}
    <div>
        <label>Indek</label>
        <input
            type="number"
            value={resikoKerjaForm.data.indek}
            onChange={(e) => resikoKerjaForm.setData("indek", e.target.value)}
        />
    </div>
</form>
```

**Catatan:** 
- Dropdown menggunakan format label: `${kode_resiko} - ${nama_resiko}` untuk menampilkan kedua informasi penting
- Hanya `kode_resiko` yang digunakan sebagai value untuk dropdown
- Setelah create berhasil, label dibuat dari `kode_resiko` dan `nama_resiko` yang sudah diisi di form

### Contoh Serupa: Popup Kelompok Jabatan

Kelompok Jabatan memiliki struktur yang sama dengan Resiko Kerja (2 required fields + 1 optional):

**Struktur:**
- `kode_kelompok` (required, max 3 karakter) - primary key
- `nama_kelompok` (required, max 100 karakter)
- `indek` (optional, integer)

**Implementasi:**
- Mengikuti pola yang sama dengan Resiko Kerja
- Dropdown menggunakan format: `${kode_kelompok} - ${nama_kelompok}`
- Flash message: `kelompokJabatanCreated` dengan `kode_kelompok`
- Route: `POST /kelompok-jabatan` → `kelompok-jabatan.store`

**Catatan:** Popup Kelompok Jabatan mengikuti pola yang sama dengan Resiko Kerja karena memiliki struktur field yang identik (2 required + 1 optional).

### Contoh Serupa Lainnya: Popup Emergency Index

Emergency Index juga memiliki struktur yang sama dengan Resiko Kerja dan Kelompok Jabatan:

**Struktur:**
- `kode_emergency` (required, max 3 karakter) - primary key
- `nama_emergency` (required, max 100 karakter)
- `indek` (optional, integer)

**Implementasi:**
- Mengikuti pola yang sama dengan Resiko Kerja dan Kelompok Jabatan
- Dropdown menggunakan format: `${kode_emergency} - ${nama_emergency}`
- Flash message: `emergencyIndexCreated` dengan `kode_emergency`
- Route: `POST /emergency-index` → `emergency-index.store`

**Catatan:** Popup Emergency Index mengikuti pola yang sama dengan Resiko Kerja dan Kelompok Jabatan karena memiliki struktur field yang identik (2 required + 1 optional). Semua popup dengan struktur ini dapat menggunakan pola implementasi yang sama.

### Contoh Paling Sederhana: Popup Bank

Bank hanya memiliki 1 field (`namabank`), sama seperti Bidang:

**Struktur:**
- `namabank` (required, max 50 karakter) - primary key

**Implementasi:**
- Mengikuti pola yang sama dengan Bidang
- Dropdown menggunakan format: `namabank` (tanpa format gabungan karena hanya 1 field)
- Flash message: `bankCreated` dengan `namabank`
- Route: `POST /bank` → `bank.store`
- Field di form utama: `bpd` (menggunakan nama field yang berbeda dari tabel)

**Catatan:** Popup Bank mengikuti pola yang sama dengan Bidang karena hanya memiliki 1 field. Perhatikan bahwa field di form utama menggunakan nama `bpd` sedangkan di tabel menggunakan `namabank`, jadi handler perlu mengupdate field `bpd` setelah create berhasil.

### Contoh Serupa: Popup Status WP

Status WP memiliki struktur yang sama dengan Resiko Kerja, Kelompok Jabatan, dan Emergency Index (2 required fields + 1 optional):

**Struktur:**
- `stts` (required, max 5 karakter) - primary key
- `ktg` (optional, max 50 karakter) - kategori

**Implementasi:**
- Mengikuti pola yang sama dengan Resiko Kerja, Kelompok Jabatan, dan Emergency Index
- Dropdown menggunakan format: `${stts}${ktg ? ` - ${ktg}` : ""}` (kategori ditampilkan jika ada)
- Flash message: `sttsWpCreated` dengan `stts`
- Route: `POST /stts-wp` → `stts-wp.store`

**Catatan:** Popup Status WP mengikuti pola yang sama dengan Resiko Kerja, Kelompok Jabatan, dan Emergency Index karena memiliki struktur field yang identik (1 required + 1 optional). Format label menggunakan conditional untuk menampilkan kategori hanya jika ada.

### Contoh dengan Multiple Optional Fields: Popup Status Kerja

Status Kerja memiliki 1 field required (`stts`) dan 3 field optional (`ktg`, `indek`, `hakcuti`):

**Struktur:**
- `stts` (required, max 3 karakter) - primary key
- `ktg` (optional, max 20 karakter) - kategori
- `indek` (optional, integer) - indek
- `hakcuti` (optional, integer) - hak cuti

**Implementasi:**
- Mengikuti pola yang sama dengan popup lainnya
- Dropdown menggunakan format: `${stts}${ktg ? ` - ${ktg}` : ""}` (kategori ditampilkan jika ada)
- Flash message: `sttsKerjaCreated` dengan `stts`
- Route: `POST /stts-kerja` → `stts-kerja.store`
- Form memiliki 4 field: 1 required + 3 optional

**Catatan:** Popup Status Kerja memiliki lebih banyak optional fields dibanding Status WP. Meskipun memiliki banyak field, hanya field yang digunakan untuk dropdown (`stts` dan `ktg` untuk label) yang perlu dipertimbangkan saat membuat options setelah create berhasil.

## Styling Modal

### Backdrop (Background Overlay)

Gunakan backdrop yang transparan agar form utama tetap terlihat:

```jsx
// ✅ BENAR - Backdrop transparan dengan blur effect
<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
    {/* Modal content */}
</div>

// ❌ SALAH - Backdrop terlalu gelap, menutupi form utama
<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
    {/* Modal content */}
</div>
```

**Penjelasan:**
- `bg-black/30`: Background hitam dengan opacity 30% (lebih transparan)
- `backdrop-blur-sm`: Efek blur ringan pada background untuk fokus ke modal
- Form utama tetap terlihat di belakang modal

### Modal Container

```jsx
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
    {/* Modal content */}
</div>
```

**Penjelasan:**
- `shadow-2xl`: Shadow yang lebih kuat untuk efek depth
- `border`: Border untuk definisi yang lebih jelas
- `max-w-md`: Maksimal width medium untuk ukuran yang proporsional

## Best Practices

### 1. Naming Convention

- **State modal**: `show[Nama]Modal` (camelCase)
- **State options**: `[nama]Options` (camelCase)
- **Form instance**: `[nama]Form` (camelCase)
- **Handler function**: `handleTambah[Nama]` (camelCase)
- **Flash message**: `[nama]Created` (camelCase)
- **Route name**: `[nama-route]` (kebab-case)

### 2. Error Handling

✅ **DO:**
- Biarkan modal terbuka saat ada error
- Tampilkan error di form modal
- Gunakan `preserveState: true` untuk menjaga state form utama

❌ **DON'T:**
- Jangan tutup modal saat ada error
- Jangan return JSON response untuk Inertia request
- Jangan reload seluruh halaman

### 3. State Management

✅ **DO:**
- Gunakan state terpisah untuk options dropdown
- Sinkronisasi dengan `useEffect` ketika refs berubah
- Cek duplikasi sebelum menambahkan ke options

❌ **DON'T:**
- Jangan langsung mutate refs
- Jangan lupa sinkronisasi setelah create

### 4. User Experience

✅ **DO:**
- Set value otomatis setelah create berhasil
- Tutup modal setelah success
- Reset form setelah success
- Tampilkan loading state saat processing

❌ **DON'T:**
- Jangan biarkan form kosong setelah success
- Jangan tutup modal sebelum data tersimpan

## Troubleshooting

### Error: "All Inertia requests must receive a valid Inertia response"

**Penyebab:** Controller mengembalikan JSON response untuk Inertia request.

**Solusi:**
```php
// ❌ SALAH
if ($request->header('X-Inertia')) {
    return response()->json([...]); // Jangan lakukan ini!
}

// ✅ BENAR
if ($request->header('X-Inertia')) {
    return redirect()->back()
        ->with('success', 'Data berhasil ditambahkan.')
        ->with('[nama]Created', [...]);
}
```

### Error: "Page not found: [Path]"

**Penyebab:** Halaman Inertia belum dibuat atau route belum terdaftar.

**Solusi:**
1. Pastikan route sudah terdaftar di `routes/web.php`
2. Buat halaman Inertia jika diperlukan (untuk route `index`, `create`, dll)
3. Atau ubah controller untuk tidak redirect ke halaman yang belum ada

### Dropdown tidak ter-update setelah create

**Penyebab:** Options tidak di-update setelah create berhasil.

**Solusi:**
1. Pastikan `set[Nama]Options` dipanggil di `onSuccess`
2. Pastikan `useMemo` menggunakan state options, bukan langsung dari refs
3. Pastikan `useEffect` sinkronisasi options dengan refs

### Modal tidak muncul

**Penyebab:** State modal tidak ter-update atau z-index terlalu rendah.

**Solusi:**
1. Pastikan `setShow[Nama]Modal(true)` dipanggil saat tombol diklik
2. Pastikan z-index modal cukup tinggi: `z-[9999]`
3. Pastikan kondisi render modal benar: `{show[Nama]Modal && (...)}`

### Backdrop terlalu gelap / Form utama tidak terlihat

**Penyebab:** Backdrop menggunakan opacity terlalu tinggi atau tidak ada blur effect.

**Solusi:**
```jsx
// ❌ SALAH - Terlalu gelap
<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">

// ✅ BENAR - Transparan dengan blur
<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
```

**Penjelasan:**
- Gunakan `bg-black/30` (opacity 30%) bukan `bg-black bg-opacity-50` (opacity 50%)
- Tambahkan `backdrop-blur-sm` untuk efek blur ringan
- Form utama akan tetap terlihat di belakang modal

### Error validasi tidak muncul di modal

**Penyebab:** Error tidak di-pass ke form modal.

**Solusi:**
1. Pastikan controller return `withErrors($validator)`
2. Pastikan form menggunakan `[nama]Form.errors.[field]`
3. Pastikan modal tetap terbuka saat ada error (`onError` handler)

### Error: "ReferenceError: [nama]Form is not defined"

**Penyebab:** Form instance tidak didefinisikan sebelum digunakan di modal atau handler.

**Contoh Error:**
```
Create.jsx:881 Uncaught ReferenceError: kategoriForm is not defined
    at Create (Create.jsx:881:48)
```

**Solusi:**
1. Pastikan form instance didefinisikan dengan `useForm` sebelum digunakan:
```jsx
// ✅ BENAR - Form didefinisikan sebelum digunakan
const [nama]Form = useForm({
    field1: "",
    field2: "",
});

// Handler yang menggunakan form
const handleTambah[Nama] = (e) => {
    e.preventDefault();
    [nama]Form.post(route("[nama-route].store"), {
        // ...
    });
};

// Modal yang menggunakan form
{[nama]Form.data.field1}
```

2. Pastikan form didefinisikan di level yang sama dengan handler dan modal (tidak di dalam conditional atau function lain)

3. Cek urutan definisi:
   - State modal: `const [show[Nama]Modal, setShow[Nama]Modal] = useState(false);`
   - Form instance: `const [nama]Form = useForm({ ... });`
   - Handler: `const handleTambah[Nama] = (e) => { ... };`
   - Modal component: `{show[Nama]Modal && ( ... )}`

4. Jika menggunakan TypeScript, pastikan import `useForm` dari `@inertiajs/react`:
```jsx
import { useForm } from '@inertiajs/react';
```

**Checklist:**
- [ ] Form instance didefinisikan dengan `const [nama]Form = useForm({ ... });`
- [ ] Form didefinisikan sebelum handler yang menggunakannya
- [ ] Form didefinisikan sebelum modal component yang menggunakannya
- [ ] Import `useForm` sudah ada di bagian import
- [ ] Tidak ada typo pada nama form (misal: `kategoriForm` vs `kategoriFormm`)

### Error: Kode otomatis tidak ter-generate atau salah

**Penyebab:** Query untuk mendapatkan kode terakhir menggunakan sorting string bukan numerik, atau format kode tidak sesuai.

**Contoh Error:**
- Kode terakhir di database: KP036, tapi generate menghasilkan KP002
- Kode terakhir di database: U0099, tapi generate menghasilkan U0002

**Solusi:**

1. **Pastikan query menggunakan sorting numerik:**
```php
// ❌ SALAH - Sorting string (KP002 > KP036)
$lastRecord = Model::where('field', 'like', 'PREFIX%')
    ->orderBy('field', 'desc')
    ->first();

// ✅ BENAR - Sorting numerik (KP036 > KP002)
$lastRecord = Model::where('field', 'like', 'PREFIX%')
    ->orderByRaw('CAST(SUBSTRING(field, START_POS) AS UNSIGNED) DESC')
    ->first();
```

2. **Pastikan START_POSITION benar:**
   - Format KPXXX: `SUBSTRING(field, 3)` (karakter ke-3, setelah "KP")
   - Format UXXXX: `SUBSTRING(field, 2)` (karakter ke-2, setelah "U")
   - Format AXX: `SUBSTRING(field, 2)` (karakter ke-2, setelah "A")
   - Format ABC123: `SUBSTRING(field, 4)` (karakter ke-4, setelah "ABC")

3. **Pastikan PADDING_LENGTH sesuai format:**
   - Format KPXXX (3 digit): `str_pad($number, 3, '0', STR_PAD_LEFT)`
   - Format UXXXX (4 digit): `str_pad($number, 4, '0', STR_PAD_LEFT)`
   - Format AXX (2 digit): `str_pad($number, 2, '0', STR_PAD_LEFT)`

4. **Untuk format dengan panjang tetap, tambahkan filter panjang:**
   - Format AXX (harus 3 karakter): `->whereRaw('LENGTH(kd_pj) = 3')` untuk memastikan hanya mengambil kode dengan panjang yang benar

5. **Test query langsung di database:**
```sql
-- Test untuk format KPXXX
SELECT kd_kategori, CAST(SUBSTRING(kd_kategori, 3) AS UNSIGNED) as num_value 
FROM kategori_perawatan 
WHERE kd_kategori LIKE 'KP%' 
ORDER BY CAST(SUBSTRING(kd_kategori, 3) AS UNSIGNED) DESC 
LIMIT 1;

-- Test untuk format UXXXX
SELECT kd_poli, CAST(SUBSTRING(kd_poli, 2) AS UNSIGNED) as num_value 
FROM poliklinik 
WHERE kd_poli LIKE 'U%' 
ORDER BY CAST(SUBSTRING(kd_poli, 2) AS UNSIGNED) DESC 
LIMIT 1;

-- Test untuk format AXX
SELECT kd_pj, CAST(SUBSTRING(kd_pj, 2) AS UNSIGNED) as num_value 
FROM penjab 
WHERE kd_pj LIKE 'A%' AND LENGTH(kd_pj) = 3
ORDER BY CAST(SUBSTRING(kd_pj, 2) AS UNSIGNED) DESC 
LIMIT 1;
```

**Checklist:**
- [ ] Query menggunakan `orderByRaw` dengan `CAST(SUBSTRING(...) AS UNSIGNED)`
- [ ] START_POSITION di SUBSTRING sesuai dengan posisi angka dalam format
- [ ] PADDING_LENGTH di str_pad sesuai dengan jumlah digit yang diinginkan
- [ ] Format default (jika tidak ada data) sesuai dengan format yang diinginkan
- [ ] Route generate-kode sudah terdaftar
- [ ] Frontend memanggil generate kode saat modal dibuka

## Checklist Implementasi

- [ ] Controller `store()` method dibuat
- [ ] Controller `generateKode()` method dibuat (jika diperlukan kode otomatis)
- [ ] Route terdaftar di `routes/web.php` (termasuk route generate-kode jika diperlukan)
- [ ] State modal dan options dibuat
- [ ] Form instance dibuat dengan `useForm`
- [ ] Fungsi `generateKode[Nama]()` dibuat (jika diperlukan kode otomatis)
- [ ] `useEffect` untuk generate kode otomatis saat modal dibuka (jika diperlukan)
- [ ] Handler submit dibuat dengan `onSuccess` dan `onError`
- [ ] Tombol "+" ditambahkan di field dropdown
- [ ] Modal component dibuat dengan form
- [ ] Input kode dibuat `readOnly` dengan tombol refresh (jika kode otomatis)
- [ ] Options di-update di `useMemo`
- [ ] `useEffect` untuk sinkronisasi options
- [ ] Error handling di controller (return redirect back untuk Inertia)
- [ ] Success handling di controller (return redirect back dengan flash message)
- [ ] Value otomatis ter-set setelah create berhasil
- [ ] Modal tertutup setelah success
- [ ] Form di-reset setelah success (termasuk reset kode jika kode otomatis)

## Referensi

- [Inertia.js Forms](https://inertiajs.com/forms)
- [Laravel Validation](https://laravel.com/docs/validation)
- Contoh implementasi: `resources/js/Pages/Employees/Create.jsx`

---

**Catatan:** Ganti `[Nama]`, `[nama]`, `[nama-route]`, `[field_name]`, `[namaRef]` dengan nama yang sesuai dengan konteks Anda.
