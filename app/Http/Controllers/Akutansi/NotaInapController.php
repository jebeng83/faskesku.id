<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class NotaInapController extends Controller
{
    public function page(Request $request)
    {
        return Inertia::render('Akutansi/NotaInap', [
            'no_rawat' => $request->query('no_rawat'),
        ]);
    }

    public function exists(Request $request)
    {
        $noRawat = $request->query('no_rawat');
        if (! $noRawat) {
            return response()->json(['message' => 'no_rawat wajib diisi'], 422);
        }

        $count = DB::table('nota_inap')->where('no_rawat', $noRawat)->count();

        return response()->json(['count' => $count]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'no_rawat' => ['required', 'string'],
            'tanggal' => ['nullable', 'date'],
            'jam' => ['nullable', 'string'],
            'nama_bayar' => ['nullable', 'string', 'required_with:besar_bayar', 'exists:akun_bayar,nama_bayar'],
            'besar_bayar' => ['nullable', 'numeric', 'min:0', 'required_with:nama_bayar'],
        ]);

        $noRawat = urldecode((string) $data['no_rawat']);
        $tanggal = $data['tanggal'] ?? null;
        $jam = $data['jam'] ?? null;
        $namaBayar = $data['nama_bayar'] ?? null;
        $besarBayar = isset($data['besar_bayar']) ? (float) $data['besar_bayar'] : null;

        $date = $tanggal ? Carbon::parse($tanggal) : Carbon::now();
        $time = $jam ?: Carbon::now()->format('H:i:s');

        $prefix = $date->format('Y/m/d').'/RI';

        return DB::transaction(function () use ($noRawat, $date, $time, $prefix, $namaBayar, $besarBayar) {
            $existingNota = DB::table('nota_inap')->where('no_rawat', $noRawat)->first();
            if ($existingNota) {
                if ($namaBayar && $besarBayar !== null) {
                    $akun = DB::table('akun_bayar')->where('nama_bayar', $namaBayar)->first();
                    $ppnPercent = $akun ? (float) ($akun->ppn ?? 0) : 0.0;
                    $besarppn = round($besarBayar * $ppnPercent / 100.0, 2);
                    DB::table('detail_nota_inap')->updateOrInsert(
                        ['no_rawat' => $noRawat, 'nama_bayar' => $namaBayar],
                        ['besar_bayar' => $besarBayar, 'besarppn' => $besarppn]
                    );
                }

                return response()->json(['no_nota' => $existingNota->no_nota], 200);
            }

            $existingNotas = DB::table('nota_inap')
                ->whereDate('tanggal', $date->toDateString())
                ->where('no_nota', 'like', $prefix.'%')
                ->lockForUpdate()
                ->pluck('no_nota')
                ->toArray();

            $existingSuffixes = [];
            foreach ($existingNotas as $nota) {
                $suffixPart = substr($nota, strlen($prefix));
                $suffixPart = ltrim($suffixPart, '/');
                $suffixPart = ltrim($suffixPart, '0');
                if ($suffixPart === '') {
                    $suffixPart = '0';
                }
                if (is_numeric($suffixPart)) {
                    $existingSuffixes[] = (int) $suffixPart;
                }
            }

            $newSuffix = 1;
            if (! empty($existingSuffixes)) {
                $newSuffix = max($existingSuffixes) + 1;
            }

            $suffix = str_pad((string) $newSuffix, 4, '0', STR_PAD_LEFT);
            $noNota = $prefix.$suffix;

            if (strlen($noNota) > 17) {
                throw new \Exception("no_nota terlalu panjang: {$noNota}. Maksimal 17 karakter.");
            }

            $attempt = 0;
            while (DB::table('nota_inap')->where('no_nota', $noNota)->exists() && $attempt < 100) {
                $newSuffix += 1;
                $suffix = str_pad((string) $newSuffix, 4, '0', STR_PAD_LEFT);
                $noNota = $prefix.$suffix;
                if (strlen($noNota) > 17) {
                    throw new \Exception("no_nota terlalu panjang setelah increment: {$noNota}");
                }
                $attempt++;
            }

            if ($attempt >= 100) {
                throw new \Exception('Gagal generate nomor nota: terlalu banyak percobaan');
            }

            DB::table('nota_inap')->insert([
                'no_rawat' => $noRawat,
                'no_nota' => $noNota,
                'tanggal' => $date->toDateString(),
                'jam' => $time,
                'Uang_Muka' => 0,
            ]);

            if ($namaBayar && $besarBayar !== null) {
                $akun = DB::table('akun_bayar')->where('nama_bayar', $namaBayar)->first();
                $ppnPercent = $akun ? (float) ($akun->ppn ?? 0) : 0.0;
                $besarppn = round($besarBayar * $ppnPercent / 100.0, 2);
                DB::table('detail_nota_inap')->updateOrInsert(
                    ['no_rawat' => $noRawat, 'nama_bayar' => $namaBayar],
                    ['besar_bayar' => $besarBayar, 'besarppn' => $besarppn]
                );
            }

            try {
                $regPeriksa = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first();
                if ($regPeriksa) {
                    $updateData = [];
                    if (($regPeriksa->status_bayar ?? 'Belum Bayar') !== 'Sudah Bayar') {
                        $updateData['status_bayar'] = 'Sudah Bayar';
                    }
                    if (($regPeriksa->stts ?? 'Belum') === 'Belum') {
                        $updateData['stts'] = 'Sudah';
                    }
                    if (! empty($updateData)) {
                        DB::table('reg_periksa')->where('no_rawat', $noRawat)->update($updateData);
                    }
                }
            } catch (\Throwable $e) {
                Log::warning('Gagal update reg_periksa setelah nota_inap dibuat: '.$e->getMessage(), [
                    'no_rawat' => $noRawat,
                    'no_nota' => $noNota,
                ]);
            }

            try {
                \App\Http\Controllers\Akutansi\TagihanSadewaController::createFromNota(
                    $noNota,
                    Auth::user()?->name ?? 'System'
                );
            } catch (\Throwable $e) {
                Log::warning('Gagal membuat tagihan_sadewa otomatis: '.$e->getMessage());
            }

            return response()->json(['no_nota' => $noNota], 201);
        });
    }

    public function snapshot(Request $request)
    {
        $noRawat = $request->input('no_rawat');
        if (! $noRawat) {
            return response()->json(['message' => 'no_rawat wajib diisi'], 422);
        }

        try {
            $notaExists = DB::table('nota_inap')->where('no_rawat', $noRawat)->count();
            if ($notaExists > 0) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Tagihan sudah pernah disimpan (nota_inap sudah ada). Snapshot tidak diizinkan.',
                ], 409);
            }
        } catch (\Throwable $e) {
            Log::warning('Gagal cek nota_inap exists: '.$e->getMessage());
        }

        $items = $request->input('items', []);
        if (! is_array($items) || count($items) === 0) {
            return response()->json([
                'status' => 'ok',
                'message' => 'Tidak ada item yang disimpan berdasarkan toggle/seleksi',
                'inserted' => 0,
                'grand_total' => 0,
            ]);
        }

        $nowDate = Carbon::now()->toDateString();
        $nextIndex = (int) DB::table('billing')->max('noindex') + 1;
        $rows = [];
        $grandTotal = 0.0;
        $seenKeys = [];

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

            if (isset($seenKeys[$uniqueKey])) {
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

    public function show(string $no_rawat)
    {
        $noRawat = urldecode($no_rawat);

        $notaInap = DB::table('nota_inap')
            ->where('no_rawat', $noRawat)
            ->first();

        if (! $notaInap) {
            return response()->json([
                'message' => 'Nota inap tidak ditemukan',
            ], 404);
        }

        $regPeriksa = DB::table('reg_periksa')
            ->where('no_rawat', $noRawat)
            ->first();

        if (! $regPeriksa) {
            return response()->json([
                'message' => 'Data registrasi tidak ditemukan',
            ], 404);
        }

        $pasien = DB::table('pasien')
            ->where('no_rkm_medis', $regPeriksa->no_rkm_medis)
            ->first();

        $dokter = DB::table('dokter')
            ->where('kd_dokter', $regPeriksa->kd_dokter)
            ->first();

        $poliklinik = DB::table('poliklinik')
            ->where('kd_poli', $regPeriksa->kd_poli)
            ->first();

        $penjab = DB::table('penjab')
            ->where('kd_pj', $regPeriksa->kd_pj)
            ->first();

        $billingItems = DB::table('billing')
            ->where('no_rawat', $noRawat)
            ->orderBy('noindex')
            ->get();

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

        $detailPembayaran = DB::table('detail_nota_inap')
            ->leftJoin('akun_bayar', 'akun_bayar.nama_bayar', '=', 'detail_nota_inap.nama_bayar')
            ->where('detail_nota_inap.no_rawat', $noRawat)
            ->select([
                'detail_nota_inap.*',
                'akun_bayar.kd_rek',
                'akun_bayar.ppn as ppn_percent',
            ])
            ->orderBy('detail_nota_inap.nama_bayar')
            ->get();

        $totalBayar = (float) $detailPembayaran->sum('besar_bayar');
        $totalPPN = (float) $detailPembayaran->sum('besarppn');

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
                } elseif (function_exists('getimagesizefromstring')) {
                    $info = @getimagesizefromstring($logoBlob);
                    if (is_array($info) && isset($info['mime']) && is_string($info['mime']) && $info['mime'] !== '' && strpos($info['mime'], 'image/') === 0) {
                        $mimeType = $info['mime'];
                    }
                } elseif (class_exists(\finfo::class)) {
                    $finfo = new \finfo(FILEINFO_MIME_TYPE);
                    $detectedMime = $finfo->buffer($logoBlob);
                    if (is_string($detectedMime) && $detectedMime !== '' && strpos($detectedMime, 'image/') === 0) {
                        $mimeType = $detectedMime;
                    }
                }

                $logoBase64 = 'data:'.$mimeType.';base64,'.base64_encode($logoBlob);
            }
        }

        return response()->json([
            'nota_inap' => $notaInap,
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
}
