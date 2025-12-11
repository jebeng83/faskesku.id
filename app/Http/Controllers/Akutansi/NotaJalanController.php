<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Models\Akutansi\Billing;
use App\Models\RawatJlDr;
use App\Models\RawatJlDrpr;
use App\Models\RawatJlPr;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class NotaJalanController extends Controller
{
    /**
     * Render halaman Inertia untuk cetakan Nota Jalan
     */
    public function page(Request $request)
    {
        return Inertia::render('Akutansi/NotaJalan', [
            'no_rawat' => $request->query('no_rawat'),
        ]);
    }

    /**
     * Cek apakah nota_jalan sudah ada untuk no_rawat tertentu.
     * Response: { count: number }
     */
    public function exists(Request $request)
    {
        $noRawat = $request->query('no_rawat');
        if (! $noRawat) {
            return response()->json(['message' => 'no_rawat wajib diisi'], 422);
        }

        $count = DB::table('nota_jalan')->where('no_rawat', $noRawat)->count();

        return response()->json(['count' => $count]);
    }

    /**
     * Buat nomor nota_jalan dan simpan record.
     * Body: { no_rawat, tanggal (YYYY-MM-DD), jam (HH:MM:SS) }
     * Nomor format: YYYY/MM/DD/RJ/NNNN (urut harian)
     */
    public function store(Request $request)
    {
        $noRawat = $request->input('no_rawat');
        $tanggal = $request->input('tanggal');
        $jam = $request->input('jam');

        if (! $noRawat) {
            return response()->json(['message' => 'no_rawat wajib diisi'], 422);
        }

        $date = $tanggal ? Carbon::parse($tanggal) : Carbon::now();
        $time = $jam ?: Carbon::now()->format('H:i:s');

        // Format no_nota: YYYY/MM/DD/RJNNNN (contoh: 2025/06/20/RJ0002)
        // Tanpa slash setelah RJ, langsung angka 4 digit
        $prefix = $date->format('Y/m/d').'/RJ';

        return DB::transaction(function () use ($noRawat, $date, $time, $prefix) {
            // Cek apakah sudah ada nota_jalan untuk no_rawat ini
            $existingNota = DB::table('nota_jalan')
                ->where('no_rawat', $noRawat)
                ->first();

            if ($existingNota) {
                // Jika sudah ada, return yang sudah ada
                return response()->json(['no_nota' => $existingNota->no_nota], 200);
            }

            // Ambil semua no_nota yang ada untuk tanggal ini dengan lock untuk menghindari race condition
            // Format no_nota: YYYY/MM/DD/RJNNNN (contoh: 2025/06/20/RJ0002)
            $existingNotas = DB::table('nota_jalan')
                ->whereDate('tanggal', $date->toDateString())
                ->where('no_nota', 'like', $prefix.'%')
                ->lockForUpdate()
                ->pluck('no_nota')
                ->toArray();

            \Log::info("NotaJalanController: Existing notas untuk tanggal {$date->toDateString()}", [
                'prefix' => $prefix,
                'existing_notas' => $existingNotas,
                'count' => count($existingNotas),
            ]);

            // Parse semua suffix yang ada
            // Format bisa: YYYY/MM/DD/RJNNNN atau YYYY/MM/DD/RJ/NNNN (backward compatibility)
            $existingSuffixes = [];
            foreach ($existingNotas as $nota) {
                // Ambil bagian setelah prefix (setelah /RJ)
                $suffixPart = substr($nota, strlen($prefix));
                // Jika ada slash di awal, hapus (untuk format lama)
                $suffixPart = ltrim($suffixPart, '/');
                // Hapus leading zeros untuk mendapatkan angka sebenarnya
                $suffixPart = ltrim($suffixPart, '0');
                if ($suffixPart === '') {
                    $suffixPart = '0'; // Jika semua adalah 0, maka nilainya 0
                }
                if (is_numeric($suffixPart)) {
                    $existingSuffixes[] = (int) $suffixPart;
                }
            }

            // Cari nomor berikutnya yang belum digunakan
            // PASTIKAN: Ambil nomor terakhir + 1
            $newSuffix = 1;
            if (! empty($existingSuffixes)) {
                $maxSuffix = max($existingSuffixes);
                $newSuffix = $maxSuffix + 1;
                \Log::info("NotaJalanController: Max suffix ditemukan: {$maxSuffix}, next suffix: {$newSuffix}");
            } else {
                \Log::info("NotaJalanController: Tidak ada nota sebelumnya, mulai dari suffix: {$newSuffix}");
            }

            // Pastikan nomor belum digunakan (untuk menghindari race condition)
            // Format no_nota: YYYY/MM/DD/RJNNNN (contoh: 2025/06/20/RJ0002)
            // Panjang: 4+1+2+1+2+1+2+4 = 17 karakter (sesuai varchar(17))
            $suffix = str_pad((string) $newSuffix, 4, '0', STR_PAD_LEFT);
            $noNota = $prefix.$suffix;

            // Validasi panjang: pastikan tidak melebihi 17 karakter
            if (strlen($noNota) > 17) {
                \Log::error("NotaJalanController: no_nota terlalu panjang: {$noNota} (length: ".strlen($noNota).')');
                throw new \Exception("no_nota terlalu panjang: {$noNota}. Maksimal 17 karakter.");
            }

            // Cek apakah no_nota sudah ada dan cari nomor berikutnya jika perlu
            $maxAttempts = 100;
            $attempt = 0;
            while (in_array($noNota, $existingNotas) && $attempt < $maxAttempts) {
                $newSuffix += 1;
                $suffix = str_pad((string) $newSuffix, 3, '0', STR_PAD_LEFT);
                $noNota = $prefix.$suffix;
                // Validasi panjang
                if (strlen($noNota) > 17) {
                    throw new \Exception("no_nota terlalu panjang setelah increment: {$noNota}");
                }
                $attempt++;
                \Log::warning("NotaJalanController: no_nota {$noNota} sudah ada, coba suffix berikutnya: {$newSuffix}");
            }

            if ($attempt >= $maxAttempts) {
                throw new \Exception('Gagal generate nomor nota: terlalu banyak percobaan');
            }

            // PASTIKAN: Cek lagi apakah no_nota sudah ada di database sebelum insert
            $finalCheck = DB::table('nota_jalan')
                ->where('no_nota', $noNota)
                ->exists();

            if ($finalCheck) {
                \Log::warning("NotaJalanController: no_nota {$noNota} masih ada di database setelah generate, akan increment");
                // Increment lagi jika masih ada
                $newSuffix += 1;
                $suffix = str_pad((string) $newSuffix, 4, '0', STR_PAD_LEFT);
                $noNota = $prefix.$suffix;

                // Validasi panjang
                if (strlen($noNota) > 17) {
                    throw new \Exception("no_nota terlalu panjang setelah final check increment: {$noNota}");
                }

                // Cek lagi sampai benar-benar tidak ada
                $attempt = 0;
                while (DB::table('nota_jalan')->where('no_nota', $noNota)->exists() && $attempt < 100) {
                    $newSuffix += 1;
                    $suffix = str_pad((string) $newSuffix, 4, '0', STR_PAD_LEFT);
                    $noNota = $prefix.$suffix;
                    // Validasi panjang
                    if (strlen($noNota) > 17) {
                        throw new \Exception("no_nota terlalu panjang setelah loop increment: {$noNota}");
                    }
                    $attempt++;
                }

                if ($attempt >= 100) {
                    throw new \Exception('Gagal menemukan nomor nota yang belum digunakan setelah final check');
                }
            }

            \Log::info("NotaJalanController: Final no_nota yang akan digunakan: {$noNota} (suffix: {$newSuffix})");

            // Insert nota_jalan dengan retry mechanism untuk menghindari duplicate
            $maxRetries = 5;
            $retryCount = 0;
            $inserted = false;
            $currentSuffix = $newSuffix;

            while ($retryCount < $maxRetries && ! $inserted) {
                // Pastikan nomor belum ada sebelum insert (double check)
                $existsCheck = DB::table('nota_jalan')
                    ->where('no_nota', $noNota)
                    ->exists();

                if ($existsCheck) {
                    \Log::warning("no_nota sudah ada sebelum insert: {$noNota}, akan generate nomor baru");
                    $retryCount++;
                    if ($retryCount < $maxRetries) {
                        // Ambil ulang semua no_nota yang ada dengan logika yang sama
                        $existingNotasRetry = DB::table('nota_jalan')
                            ->whereDate('tanggal', $date->toDateString())
                            ->where('no_nota', 'like', $prefix.'%')
                            ->lockForUpdate()
                            ->pluck('no_nota')
                            ->toArray();

                        // Parse semua suffix yang ada (dengan menghapus leading zeros)
                        // Format bisa: YYYY/MM/DD/RJNNNN atau YYYY/MM/DD/RJ/NNNN (backward compatibility)
                        $existingSuffixesRetry = [];
                        foreach ($existingNotasRetry as $nota) {
                            $suffixPart = substr($nota, strlen($prefix));
                            // Jika ada slash di awal, hapus (untuk format lama)
                            $suffixPart = ltrim($suffixPart, '/');
                            $suffixPart = ltrim($suffixPart, '0');
                            if ($suffixPart === '') {
                                $suffixPart = '0';
                            }
                            if (is_numeric($suffixPart)) {
                                $existingSuffixesRetry[] = (int) $suffixPart;
                            }
                        }

                        // PASTIKAN: Ambil nomor terakhir + 1
                        $currentSuffix = 1;
                        if (! empty($existingSuffixesRetry)) {
                            $maxSuffixRetry = max($existingSuffixesRetry);
                            $currentSuffix = $maxSuffixRetry + 1;
                        }

                        $suffix = str_pad((string) $currentSuffix, 4, '0', STR_PAD_LEFT);
                        $noNota = $prefix.$suffix;

                        // Validasi panjang
                        if (strlen($noNota) > 17) {
                            throw new \Exception("no_nota terlalu panjang di retry: {$noNota}");
                        }

                        // Pastikan nomor belum digunakan
                        $attempt = 0;
                        while (in_array($noNota, $existingNotasRetry) && $attempt < 100) {
                            $currentSuffix += 1;
                            $suffix = str_pad((string) $currentSuffix, 4, '0', STR_PAD_LEFT);
                            $noNota = $prefix.$suffix;
                            // Validasi panjang
                            if (strlen($noNota) > 17) {
                                throw new \Exception("no_nota terlalu panjang di retry loop: {$noNota}");
                            }
                            $attempt++;
                        }

                        if ($attempt >= 100) {
                            throw new \Exception('Gagal menemukan nomor nota yang belum digunakan setelah 100 percobaan');
                        }

                        // Final check sebelum menggunakan nomor
                        if (DB::table('nota_jalan')->where('no_nota', $noNota)->exists()) {
                            $currentSuffix += 1;
                            $suffix = str_pad((string) $currentSuffix, 4, '0', STR_PAD_LEFT);
                            $noNota = $prefix.$suffix;
                            // Validasi panjang
                            if (strlen($noNota) > 17) {
                                throw new \Exception("no_nota terlalu panjang di retry final check: {$noNota}");
                            }
                        }

                        \Log::info("Retry generate no_nota baru: {$noNota} (suffix: {$currentSuffix})");

                        continue; // Lanjut ke iterasi berikutnya
                    } else {
                        throw new \Exception('Gagal menemukan nomor nota yang belum digunakan setelah beberapa kali retry');
                    }
                }

                try {
                    DB::table('nota_jalan')->insert([
                        'no_rawat' => $noRawat,
                        'no_nota' => $noNota,
                        'tanggal' => $date->toDateString(),
                        'jam' => $time,
                    ]);
                    $inserted = true;
                    \Log::info("Berhasil insert nota_jalan: {$noNota} untuk no_rawat: {$noRawat}");
                } catch (\Illuminate\Database\QueryException $e) {
                    // Jika error duplicate entry, coba generate nomor baru
                    if ($e->getCode() == 23000 && strpos($e->getMessage(), 'Duplicate entry') !== false) {
                        $retryCount++;
                        \Log::warning("Duplicate entry untuk no_nota: {$noNota}, retry ke-{$retryCount}");

                        if ($retryCount < $maxRetries) {
                            // Ambil ulang semua no_nota yang ada dengan lock untuk mendapatkan nomor yang benar-benar belum digunakan
                            $existingNotasRetry = DB::table('nota_jalan')
                                ->whereDate('tanggal', $date->toDateString())
                                ->where('no_nota', 'like', $prefix.'%')
                                ->lockForUpdate()
                                ->pluck('no_nota')
                                ->toArray();

                            // Parse semua suffix yang ada (dengan menghapus leading zeros)
                            // Format bisa: YYYY/MM/DD/RJNNNN atau YYYY/MM/DD/RJ/NNNN (backward compatibility)
                            $existingSuffixesRetry = [];
                            foreach ($existingNotasRetry as $nota) {
                                $suffixPart = substr($nota, strlen($prefix));
                                // Jika ada slash di awal, hapus (untuk format lama)
                                $suffixPart = ltrim($suffixPart, '/');
                                $suffixPart = ltrim($suffixPart, '0');
                                if ($suffixPart === '') {
                                    $suffixPart = '0';
                                }
                                if (is_numeric($suffixPart)) {
                                    $existingSuffixesRetry[] = (int) $suffixPart;
                                }
                            }

                            // PASTIKAN: Ambil nomor terakhir + 1
                            $currentSuffix = 1;
                            if (! empty($existingSuffixesRetry)) {
                                $maxSuffixRetry = max($existingSuffixesRetry);
                                $currentSuffix = $maxSuffixRetry + 1;
                            }

                            $suffix = str_pad((string) $currentSuffix, 4, '0', STR_PAD_LEFT);
                            $noNota = $prefix.$suffix;

                            // Validasi panjang
                            if (strlen($noNota) > 17) {
                                throw new \Exception("no_nota terlalu panjang di exception retry: {$noNota}");
                            }

                            // Pastikan nomor belum digunakan
                            $attempt = 0;
                            while (in_array($noNota, $existingNotasRetry) && $attempt < 100) {
                                $currentSuffix += 1;
                                $suffix = str_pad((string) $currentSuffix, 4, '0', STR_PAD_LEFT);
                                $noNota = $prefix.$suffix;
                                // Validasi panjang
                                if (strlen($noNota) > 17) {
                                    throw new \Exception("no_nota terlalu panjang di exception retry loop: {$noNota}");
                                }
                                $attempt++;
                            }

                            if ($attempt >= 100) {
                                throw new \Exception('Gagal menemukan nomor nota yang belum digunakan setelah 100 percobaan');
                            }

                            // Final check sebelum menggunakan nomor
                            if (DB::table('nota_jalan')->where('no_nota', $noNota)->exists()) {
                                $currentSuffix += 1;
                                $suffix = str_pad((string) $currentSuffix, 4, '0', STR_PAD_LEFT);
                                $noNota = $prefix.$suffix;
                                // Validasi panjang
                                if (strlen($noNota) > 17) {
                                    throw new \Exception("no_nota terlalu panjang di exception retry final check: {$noNota}");
                                }
                            }

                            \Log::info("Exception retry generate no_nota: {$noNota} (suffix: {$currentSuffix})");
                        } else {
                            \Log::error("Gagal insert nota_jalan setelah {$maxRetries} kali retry", [
                                'no_rawat' => $noRawat,
                                'last_no_nota' => $noNota,
                                'error' => $e->getMessage(),
                            ]);
                            throw new \Exception('Gagal insert nota_jalan setelah beberapa kali retry: '.$e->getMessage());
                        }
                    } else {
                        // Error lain, throw langsung
                        throw $e;
                    }
                }
            }

            if (! $inserted) {
                throw new \Exception('Gagal insert nota_jalan setelah retry');
            }

            // Update status dan status_bayar di reg_periksa setelah nota_jalan dibuat
            // Ketika nota_jalan dibuat, berarti pembayaran sudah dilakukan
            try {
                $regPeriksa = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first();
                if ($regPeriksa) {
                    $updateData = [];

                    // Update status_bayar menjadi 'Sudah Bayar'
                    if (($regPeriksa->status_bayar ?? 'Belum Bayar') !== 'Sudah Bayar') {
                        $updateData['status_bayar'] = 'Sudah Bayar';
                    }

                    // Update status (stts) menjadi 'Sudah' jika masih 'Belum'
                    if (($regPeriksa->stts ?? 'Belum') === 'Belum') {
                        $updateData['stts'] = 'Sudah';
                    }

                    if (! empty($updateData)) {
                        DB::table('reg_periksa')
                            ->where('no_rawat', $noRawat)
                            ->update($updateData);

                        \Log::info("NotaJalanController: Updated reg_periksa untuk no_rawat {$noRawat}", [
                            'updates' => $updateData,
                            'no_nota' => $noNota,
                        ]);
                    }
                }
            } catch (\Throwable $e) {
                // Log error tapi jangan gagalkan pembuatan nota
                \Log::warning('Gagal update reg_periksa setelah nota_jalan dibuat: '.$e->getMessage(), [
                    'no_rawat' => $noRawat,
                    'no_nota' => $noNota,
                ]);
            }

            // Otomatis buat tagihan_sadewa setelah nota_jalan dibuat
            try {
                \App\Http\Controllers\Akutansi\TagihanSadewaController::createFromNota(
                    $noNota,
                    auth()->user()?->name ?? 'System'
                );
            } catch (\Throwable $e) {
                // Log error tapi jangan gagalkan pembuatan nota
                \Log::warning('Gagal membuat tagihan_sadewa otomatis: '.$e->getMessage());
            }

            return response()->json(['no_nota' => $noNota], 201);
        });
    }

    /**
     * Endpoint stub untuk membangun snapshot billing dari sumber operasional (isRawat2) berdasarkan toggle.
     * Body: { no_rawat, toggles: { laborat, radiologi, obat, administrasi, sarpras, tarifDokter, tarifPerawat, tambahan, potongan } }
     * Saat ini mengembalikan sukses (placeholder). Implementasi agregasi penuh dapat ditambahkan menyusul.
     */
    public function snapshot(Request $request)
    {
        $noRawat = $request->input('no_rawat');
        if (! $noRawat) {
            return response()->json(['message' => 'no_rawat wajib diisi'], 422);
        }

        // Blokir snapshot jika nota_jalan sudah ada (mengikuti perilaku Java)
        try {
            $notaExists = DB::table('nota_jalan')->where('no_rawat', $noRawat)->count();
            if ($notaExists > 0) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Tagihan sudah pernah disimpan (nota_jalan sudah ada). Snapshot tidak diizinkan.',
                ], 409);
            }
        } catch (\Throwable $e) {
            // Lanjutkan, tetapi catat error
            \Log::warning('Gagal cek nota_jalan exists: '.$e->getMessage());
        }

        $items = $request->input('items', []);
        $toggles = $request->input('toggles', []); // optional: { label_bool }
        $selectedStatuses = $request->input('selected_statuses', []); // optional: ["Laborat","Ralan Dokter",...]

        // Prioritas: Gunakan items yang dikirim dari frontend jika ada (sudah difilter di frontend)
        // Hanya fallback ke query database jika items benar-benar kosong
        if (! is_array($items) || count($items) === 0) {
            $ralanDr = RawatJlDr::where('no_rawat', $noRawat)
                ->with('jenisPerawatan')
                ->orderBy('tgl_perawatan')
                ->orderBy('jam_rawat')
                ->get()
                ->map(function ($r) {
                    $biaya = (float) ($r->biaya_rawat ?? 0);

                    return [
                        'no_rawat' => $r->no_rawat,
                        'tgl_byr' => $r->tgl_perawatan,
                        'no' => $r->kd_jenis_prw,
                        'nm_perawatan' => optional($r->jenisPerawatan)->nm_perawatan ?? $r->kd_jenis_prw,
                        'pemisah' => '-',
                        'biaya' => $biaya,
                        'jumlah' => 1,
                        'tambahan' => 0,
                        'status' => 'Ralan Dokter',
                    ];
                });

            $ralanPr = RawatJlPr::where('no_rawat', $noRawat)
                ->with('jenisPerawatan')
                ->orderBy('tgl_perawatan')
                ->orderBy('jam_rawat')
                ->get()
                ->map(function ($r) {
                    $biaya = (float) ($r->biaya_rawat ?? 0);

                    return [
                        'no_rawat' => $r->no_rawat,
                        'tgl_byr' => $r->tgl_perawatan,
                        'no' => $r->kd_jenis_prw,
                        'nm_perawatan' => optional($r->jenisPerawatan)->nm_perawatan ?? $r->kd_jenis_prw,
                        'pemisah' => '-',
                        'biaya' => $biaya,
                        'jumlah' => 1,
                        'tambahan' => 0,
                        'status' => 'Ralan Paramedis',
                    ];
                });

            $ralanDrpr = RawatJlDrpr::where('no_rawat', $noRawat)
                ->with('jenisPerawatan')
                ->orderBy('tgl_perawatan')
                ->orderBy('jam_rawat')
                ->get()
                ->map(function ($r) {
                    $biaya = (float) ($r->biaya_rawat ?? 0);

                    return [
                        'no_rawat' => $r->no_rawat,
                        'tgl_byr' => $r->tgl_perawatan,
                        'no' => $r->kd_jenis_prw,
                        'nm_perawatan' => optional($r->jenisPerawatan)->nm_perawatan ?? $r->kd_jenis_prw,
                        'pemisah' => '-',
                        'biaya' => $biaya,
                        'jumlah' => 1,
                        'tambahan' => 0,
                        'status' => 'Ralan Dokter Paramedis',
                    ];
                });

            $items = $ralanDr->concat($ralanDrpr)->concat($ralanPr)->values()->all();
        }

        // Terapkan filter berdasarkan selected_statuses (jika tersedia) atau berdasarkan toggles
        // Hanya filter jika items berasal dari fallback query database, bukan dari frontend
        // Frontend sudah mengirim items yang sudah difilter, jadi tidak perlu filter lagi
        $itemsFromFrontend = $request->has('items') && is_array($request->input('items')) && count($request->input('items')) > 0;

        if (! $itemsFromFrontend) {
            // Hanya filter jika items berasal dari fallback query database
            if (is_array($selectedStatuses) && count($selectedStatuses) > 0) {
                $items = array_values(array_filter($items, function ($it) use ($selectedStatuses) {
                    return in_array($it['status'] ?? '-', $selectedStatuses, true);
                }));
            } elseif (is_array($toggles) && count($toggles) > 0) {
                $map = [
                    'Laboratorium' => ['Laborat', 'TtlLaborat'],
                    'Radiologi' => ['Radiologi', 'TtlRadiologi'],
                    'Tarif Dokter' => ['Ralan Dokter', 'Ranap Dokter', 'TtlRalan Dokter', 'TtlRanap Dokter', 'Dokter', 'Ralan Dokter Paramedis'],
                    'Tarif Paramedis' => ['Ralan Paramedis', 'Ranap Paramedis', 'TtlRalan Paramedis', 'Perawat', 'Ralan Dokter Paramedis'],
                    'Obat' => ['Obat', 'Resep Pulang', 'TtlObat', 'TtlResep Pulang', 'Retur Obat', 'TtlRetur Obat'],
                    'Tambahan' => ['Tambahan', 'TtlTambahan'],
                    'Potongan' => ['Potongan', 'TtlPotongan'],
                    'Administrasi' => ['Administrasi', 'Registrasi', 'Service'],
                    'Sarpras' => ['Kamar', 'TtlKamar', 'Harian'],
                ];
                $allowed = [];
                foreach ($map as $label => $statuses) {
                    $val = $toggles[$label] ?? false;
                    if ($val) {
                        foreach ($statuses as $st) {
                            $allowed[$st] = true;
                        }
                    }
                }
                if (! empty($allowed)) {
                    $items = array_values(array_filter($items, function ($it) use ($allowed) {
                        return isset($allowed[$it['status'] ?? '-']);
                    }));
                }
            }
        }

        if (! is_array($items) || count($items) === 0) {
            return response()->json([
                'status' => 'ok',
                'message' => 'Tidak ada item yang disimpan berdasarkan toggle/seleksi',
                'inserted' => 0,
                'grand_total' => 0,
            ]);
        }

        // Siapkan rows untuk insert massal dengan deduplikasi
        $nowDate = Carbon::now()->toDateString();
        $nextIndex = (int) DB::table('billing')->max('noindex') + 1;
        $rows = [];
        $grandTotal = 0.0;
        $seenKeys = []; // Untuk deduplikasi berdasarkan kombinasi no + status

        // PERBAIKAN: Jika items berasal dari frontend (sudah dideduplikasi di frontend),
        // kita tetap melakukan deduplikasi di backend untuk safety, tapi log lebih detail
        $itemsFromFrontend = $request->has('items') && is_array($request->input('items')) && count($request->input('items')) > 0;

        foreach ($items as $it) {
            $uniqueKey = implode('_', [
                trim((string) ($it['no'] ?? '')),
                trim((string) ($it['status'] ?? '-')),
                trim((string) ($it['tgl_byr'] ?? '')),
                trim((string) ($it['nm_perawatan'] ?? '')),
                number_format((float) ($it['biaya'] ?? 0), 2, '.', ''),
                number_format((float) ($it['jumlah'] ?? 1), 2, '.', ''),
                number_format((float) ($it['tambahan'] ?? 0), 2, '.', ''),
            ]);

            // Skip jika sudah ada item dengan kombinasi no + status yang sama
            if (isset($seenKeys[$uniqueKey])) {
                // Log lebih detail untuk debugging perbedaan total
                \Log::warning('Item duplikat diabaikan di snapshot billing', [
                    'no' => $it['no'] ?? null,
                    'status' => $it['status'] ?? null,
                    'no_rawat' => $noRawat,
                    'items_from_frontend' => $itemsFromFrontend,
                    'biaya' => $it['biaya'] ?? 0,
                    'jumlah' => $it['jumlah'] ?? 0,
                    'tambahan' => $it['tambahan'] ?? 0,
                    'calculated_total' => (($it['biaya'] ?? 0) * ($it['jumlah'] ?? 1)) + ($it['tambahan'] ?? 0),
                ]);

                continue;
            }

            $seenKeys[$uniqueKey] = true;

            $biaya = (float) ($it['biaya'] ?? 0);
            $jumlah = (float) ($it['jumlah'] ?? 1);
            $tambahan = (float) ($it['tambahan'] ?? 0);
            $total = round(($biaya * $jumlah) + $tambahan, 2);
            $grandTotal += $total;
            $rows[] = [
                'noindex' => $nextIndex++,
                'no_rawat' => $noRawat,
                'tgl_byr' => $it['tgl_byr'] ?? $nowDate,
                'no' => $it['no'] ?? null,
                'nm_perawatan' => $it['nm_perawatan'] ?? ($it['no'] ?? 'Item'),
                'pemisah' => $it['pemisah'] ?? '-',
                'biaya' => $biaya,
                'jumlah' => $jumlah,
                'tambahan' => $tambahan,
                'totalbiaya' => $total,
                'status' => $it['status'] ?? '-',
            ];
        }

        DB::transaction(function () use ($rows) {
            DB::table('billing')->insert($rows);
        });

        return response()->json([
            'status' => 'ok',
            'message' => 'Snapshot billing tersimpan',
            'inserted' => count($rows),
            'grand_total' => round($grandTotal, 2),
        ], 201);
    }

    /**
     * Ambil data lengkap nota_jalan untuk cetakan
     * Response: { nota_jalan, reg_periksa, pasien, dokter, poliklinik, penjab, billing_items, detail_pembayaran }
     */
    public function show(string $no_rawat)
    {
        // Decode no_rawat jika ada encoding
        $noRawat = urldecode($no_rawat);

        // Ambil data nota_jalan
        $notaJalan = DB::table('nota_jalan')
            ->where('no_rawat', $noRawat)
            ->first();

        if (! $notaJalan) {
            return response()->json([
                'message' => 'Nota jalan tidak ditemukan',
            ], 404);
        }

        // Ambil data reg_periksa dengan relasi
        $regPeriksa = DB::table('reg_periksa')
            ->where('no_rawat', $noRawat)
            ->first();

        if (! $regPeriksa) {
            return response()->json([
                'message' => 'Data registrasi tidak ditemukan',
            ], 404);
        }

        // Ambil data pasien
        $pasien = DB::table('pasien')
            ->where('no_rkm_medis', $regPeriksa->no_rkm_medis)
            ->first();

        // Ambil data dokter
        $dokter = DB::table('dokter')
            ->where('kd_dokter', $regPeriksa->kd_dokter)
            ->first();

        // Ambil data poliklinik
        $poliklinik = DB::table('poliklinik')
            ->where('kd_poli', $regPeriksa->kd_poli)
            ->first();

        // Ambil data penjab
        $penjab = DB::table('penjab')
            ->where('kd_pj', $regPeriksa->kd_pj)
            ->first();

        // Ambil data billing items
        $billingItems = DB::table('billing')
            ->where('no_rawat', $noRawat)
            ->orderBy('noindex')
            ->get();

        // Hitung summary per status
        $summary = [];
        $grandTotal = 0;
        foreach ($billingItems as $item) {
            $status = $item->status ?? '-';
            if (! isset($summary[$status])) {
                $summary[$status] = ['count' => 0, 'total' => 0];
            }
            $summary[$status]['count']++;
            $summary[$status]['total'] += (float) ($item->totalbiaya ?? 0);
            $grandTotal += (float) ($item->totalbiaya ?? 0);
        }

        // Ambil data detail pembayaran
        $detailPembayaran = DB::table('detail_nota_jalan')
            ->leftJoin('akun_bayar', 'akun_bayar.nama_bayar', '=', 'detail_nota_jalan.nama_bayar')
            ->where('detail_nota_jalan.no_rawat', $noRawat)
            ->select([
                'detail_nota_jalan.*',
                'akun_bayar.kd_rek',
                'akun_bayar.ppn as ppn_percent',
            ])
            ->orderBy('detail_nota_jalan.nama_bayar')
            ->get();

        $totalBayar = (float) $detailPembayaran->sum('besar_bayar');
        $totalPPN = (float) $detailPembayaran->sum('besarppn');

        // Ambil data setting untuk kop surat dan logo
        $setting = null;
        $logoBase64 = null;
        if (DB::getSchemaBuilder()->hasTable('setting')) {
            // Ambil setting yang aktif (aktifkan = 'Yes') atau yang pertama jika tidak ada yang aktif
            $setting = DB::table('setting')
                ->where('aktifkan', 'Yes')
                ->first();

            // Jika tidak ada yang aktif, ambil yang pertama
            if (! $setting) {
                $setting = DB::table('setting')->first();
            }

            // Konversi logo ke base64 jika ada
            if ($setting && isset($setting->logo) && ! empty($setting->logo)) {
                $logoBlob = $setting->logo;
                // Deteksi MIME type dari blob
                $mimeType = 'image/png'; // default

                // Deteksi dari magic bytes
                $firstBytes = substr($logoBlob, 0, 12);
                if (substr($firstBytes, 0, 2) === "\xFF\xD8") {
                    $mimeType = 'image/jpeg';
                } elseif (substr($firstBytes, 0, 4) === "\x89PNG") {
                    $mimeType = 'image/png';
                } elseif (substr($firstBytes, 0, 6) === 'GIF87a' || substr($firstBytes, 0, 6) === 'GIF89a') {
                    $mimeType = 'image/gif';
                } elseif (substr($firstBytes, 0, 4) === 'RIFF' && substr($firstBytes, 8, 4) === 'WEBP') {
                    $mimeType = 'image/webp';
                } elseif (function_exists('finfo_open')) {
                    // Gunakan finfo jika tersedia
                    $finfo = finfo_open(FILEINFO_MIME_TYPE);
                    $detectedMime = finfo_buffer($finfo, $logoBlob);
                    finfo_close($finfo);
                    if ($detectedMime && strpos($detectedMime, 'image/') === 0) {
                        $mimeType = $detectedMime;
                    }
                }

                $logoBase64 = 'data:'.$mimeType.';base64,'.base64_encode($logoBlob);
            }
        }

        return response()->json([
            'nota_jalan' => $notaJalan,
            'reg_periksa' => $regPeriksa,
            'pasien' => $pasien,
            'dokter' => $dokter,
            'poliklinik' => $poliklinik,
            'penjab' => $penjab,
            'billing_items' => $billingItems,
            'billing_summary' => $summary,
            'billing_grand_total' => round($grandTotal, 2),
            'detail_pembayaran' => $detailPembayaran,
            'pembayaran_total' => [
                'besar_bayar' => round($totalBayar, 2),
                'besarppn' => round($totalPPN, 2),
                'grand_total' => round($totalBayar + $totalPPN, 2),
            ],
            'setting' => $setting ? [
                'nama_instansi' => $setting->nama_instansi ?? null,
                'alamat_instansi' => $setting->alamat_instansi ?? null,
                'kabupaten' => $setting->kabupaten ?? null,
                'propinsi' => $setting->propinsi ?? null,
                'kontak' => $setting->kontak ?? null,
                'email' => $setting->email ?? null,
            ] : null,
            'logo_base64' => $logoBase64,
        ]);
    }

    /**
     * Generate PDF nota jalan menggunakan dompdf
     */
    public function pdf(string $no_rawat)
    {
        \Log::info('NotaJalanController::pdf called', [
            'no_rawat_param' => $no_rawat,
        ]);

        // Decode no_rawat jika ada encoding
        $noRawat = urldecode($no_rawat);

        \Log::info('NotaJalanController::pdf decoded', [
            'no_rawat_decoded' => $noRawat,
        ]);

        // Ambil data nota_jalan
        $notaJalan = DB::table('nota_jalan')
            ->where('no_rawat', $noRawat)
            ->first();

        if (! $notaJalan) {
            abort(404, 'Nota jalan tidak ditemukan');
        }

        // Ambil data reg_periksa dengan relasi
        $regPeriksa = DB::table('reg_periksa')
            ->where('no_rawat', $noRawat)
            ->first();

        if (! $regPeriksa) {
            abort(404, 'Data registrasi tidak ditemukan');
        }

        // Ambil data pasien
        $pasien = DB::table('pasien')
            ->where('no_rkm_medis', $regPeriksa->no_rkm_medis)
            ->first();

        // Ambil data dokter
        $dokter = DB::table('dokter')
            ->where('kd_dokter', $regPeriksa->kd_dokter)
            ->first();

        // Ambil data poliklinik
        $poliklinik = DB::table('poliklinik')
            ->where('kd_poli', $regPeriksa->kd_poli)
            ->first();

        // Ambil data penjab
        $penjab = DB::table('penjab')
            ->where('kd_pj', $regPeriksa->kd_pj)
            ->first();

        // Ambil data billing items dengan deduplikasi
        $billingItemsRaw = DB::table('billing')
            ->where('no_rawat', $noRawat)
            ->orderBy('noindex')
            ->get();

        // Deduplikasi billing items
        $seenItems = [];
        $billingItems = [];
        foreach ($billingItemsRaw as $item) {
            $tglByr = trim($item->tgl_byr ?? '');
            $no = trim($item->no ?? '');
            $status = trim($item->status ?? '');
            $nmPerawatan = trim($item->nm_perawatan ?? '');
            $biaya = trim($item->biaya ?? '0');
            $jumlah = trim($item->jumlah ?? '1');
            $tambahan = trim($item->tambahan ?? '0');

            $uniqueKey = "{$no}_{$status}_{$tglByr}_{$nmPerawatan}_{$biaya}_{$jumlah}_{$tambahan}";

            if (! isset($seenItems[$uniqueKey])) {
                $seenItems[$uniqueKey] = true;
                $billingItems[] = $item;
            }
        }

        // Hitung summary per status
        $summary = [];
        $grandTotal = 0;
        foreach ($billingItems as $item) {
            $status = $item->status ?? '-';
            if (! isset($summary[$status])) {
                $summary[$status] = ['count' => 0, 'total' => 0];
            }
            $summary[$status]['count']++;
            $summary[$status]['total'] += (float) ($item->totalbiaya ?? 0);
            $grandTotal += (float) ($item->totalbiaya ?? 0);
        }

        // Ambil data detail pembayaran
        $detailPembayaran = DB::table('detail_nota_jalan')
            ->leftJoin('akun_bayar', 'akun_bayar.nama_bayar', '=', 'detail_nota_jalan.nama_bayar')
            ->where('detail_nota_jalan.no_rawat', $noRawat)
            ->select([
                'detail_nota_jalan.*',
                'akun_bayar.kd_rek',
                'akun_bayar.ppn as ppn_percent',
            ])
            ->orderBy('detail_nota_jalan.nama_bayar')
            ->get();

        $totalBayar = (float) $detailPembayaran->sum('besar_bayar');
        $totalPPN = (float) $detailPembayaran->sum('besarppn');
        $totalTambahan = array_sum(array_map(function ($item) {
            return (float) ($item->tambahan ?? 0);
        }, $billingItems));

        // Ambil data setting untuk kop surat dan logo
        $setting = null;
        $logoBase64 = null;
        if (DB::getSchemaBuilder()->hasTable('setting')) {
            $setting = DB::table('setting')
                ->where('aktifkan', 'Yes')
                ->first();

            if (! $setting) {
                $setting = DB::table('setting')->first();
            }

            if ($setting && isset($setting->logo) && ! empty($setting->logo)) {
                $logoBlob = $setting->logo;
                $mimeType = 'image/png';

                $firstBytes = substr($logoBlob, 0, 12);
                if (substr($firstBytes, 0, 2) === "\xFF\xD8") {
                    $mimeType = 'image/jpeg';
                } elseif (substr($firstBytes, 0, 4) === "\x89PNG") {
                    $mimeType = 'image/png';
                } elseif (substr($firstBytes, 0, 6) === 'GIF87a' || substr($firstBytes, 0, 6) === 'GIF89a') {
                    $mimeType = 'image/gif';
                } elseif (substr($firstBytes, 0, 4) === 'RIFF' && substr($firstBytes, 8, 4) === 'WEBP') {
                    $mimeType = 'image/webp';
                } elseif (function_exists('finfo_open')) {
                    $finfo = finfo_open(FILEINFO_MIME_TYPE);
                    $detectedMime = finfo_buffer($finfo, $logoBlob);
                    finfo_close($finfo);
                    if ($detectedMime && strpos($detectedMime, 'image/') === 0) {
                        $mimeType = $detectedMime;
                    }
                }

                $logoBase64 = 'data:'.$mimeType.';base64,'.base64_encode($logoBlob);
            }
        }

        // Format tanggal dan waktu
        $formatDate = function ($dateString) {
            if (! $dateString) {
                return '-';
            }
            try {
                $date = \Carbon\Carbon::parse($dateString);

                return $date->locale('id_ID')->isoFormat('D MMMM YYYY');
            } catch (\Exception $e) {
                return $dateString;
            }
        };

        $formatTime = function ($timeString) {
            if (! $timeString) {
                return '-';
            }

            return substr($timeString, 0, 5);
        };

        $formatCurrency = function ($amount) {
            return 'Rp '.number_format($amount, 0, ',', '.');
        };

        // Kelompokkan billing items berdasarkan kategori
        $groupedByCategory = [];
        $itemNumber = 1;
        foreach ($billingItems as $item) {
            $category = $item->status ?? '-';
            if (! isset($groupedByCategory[$category])) {
                $groupedByCategory[$category] = [];
            }
            $groupedByCategory[$category][] = [
                'item' => $item,
                'number' => $itemNumber++,
            ];
        }

        // Generate PDF menggunakan dompdf
        $pdf = Pdf::loadView('akutansi.nota-jalan-pdf', [
            'nota_jalan' => $notaJalan,
            'reg_periksa' => $regPeriksa,
            'pasien' => $pasien,
            'dokter' => $dokter,
            'poliklinik' => $poliklinik,
            'penjab' => $penjab,
            'billing_items' => $billingItems,
            'grouped_by_category' => $groupedByCategory,
            'billing_grand_total' => round($grandTotal, 2),
            'detail_pembayaran' => $detailPembayaran,
            'pembayaran_total' => [
                'besar_bayar' => round($totalBayar, 2),
                'besarppn' => round($totalPPN, 2),
                'grand_total' => round($totalBayar + $totalPPN, 2),
            ],
            'total_tambahan' => round($totalTambahan, 2),
            'setting' => $setting,
            'logo_base64' => $logoBase64,
            'formatDate' => $formatDate,
            'formatTime' => $formatTime,
            'formatCurrency' => $formatCurrency,
        ]);

        // Set ukuran kertas Folio (8.5 x 13 inci)
        // 8.5in = 612 points, 13in = 936 points (72 DPI)
        // Margin 0.25in = 18 points di setiap sisi
        $pdf->setPaper([0, 0, 612, 936], 'portrait');
        $pdf->setOption('enable-local-file-access', true);
        $pdf->setOption('isHtml5ParserEnabled', true);
        $pdf->setOption('isRemoteEnabled', true);
        $pdf->setOption('defaultFont', 'Arial');
        $pdf->setOption('isPhpEnabled', true);

        // Download PDF dengan nama file yang sesuai
        // Ganti karakter "/" dengan "-" untuk menghindari error filename
        $safeNoNota = str_replace('/', '-', $notaJalan->no_nota);
        $filename = 'Nota_Jalan_'.$safeNoNota.'_'.date('YmdHis').'.pdf';

        return $pdf->download($filename);
    }
}
