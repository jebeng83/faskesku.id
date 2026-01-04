<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class QueueController extends Controller
{
    /**
     * Helper method untuk mengecek kolom dengan error handling
     * Mengembalikan false jika terjadi error (timeout, permission, dll)
     */
    protected function safeHasColumn(string $table, string $column): bool
    {
        try {
            return Schema::hasColumn($table, $column);
        } catch (\Throwable $e) {
            Log::warning('[QueueController] Schema::hasColumn failed', [
                'table' => $table,
                'column' => $column,
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return false;
        }
    }

    public function create(Request $request)
    {
        try {
            $channel = $request->query('channel', 'kiosk');
            if (! in_array($channel, ['kiosk', 'loket'])) {
                $channel = 'kiosk';
            }
            $prefix = $request->query('prefix');
            $today = now()->toDateString();
            $attempts = 0;
            $hasNomor = $this->safeHasColumn('antriloket', 'nomor');
            $hasAntrian = $this->safeHasColumn('antriloket', 'antrian');
            $colNumber = $hasNomor ? 'nomor' : ($hasAntrian ? 'antrian' : null);
            $hasTanggal = $this->safeHasColumn('antriloket', 'tanggal');
            $hasPrefix = $this->safeHasColumn('antriloket', 'prefix');
            $hasStatus = $this->safeHasColumn('antriloket', 'status');
            $hasAsal = $this->safeHasColumn('antriloket', 'asal');
            $hasLoket = $this->safeHasColumn('antriloket', 'loket');
            $hasKodeTiket = $this->safeHasColumn('antriloket', 'kode_tiket');
            $hasCreatedAt = $this->safeHasColumn('antriloket', 'created_at');
            $hasUpdatedAt = $this->safeHasColumn('antriloket', 'updated_at');

            if (! $colNumber) {
                return response()->json(['ok' => false, 'message' => 'Tabel antriloket tidak memiliki kolom nomor/antrian'], 500);
            }

            while ($attempts < 5) {
                $attempts++;
                try {
                    $q = DB::table('antriloket');
                    if ($hasTanggal) {
                        $q = $q->where('tanggal', $today);
                    }
                    if ($hasPrefix) {
                        $q = $q->when($prefix, function ($qq) use ($prefix) {
                            $qq->where('prefix', $prefix);
                        }, function ($qq) {
                            $qq->whereNull('prefix');
                        });
                    }
                    $max = $q->max($colNumber);
                    $next = (int) ($max ?? 0) + 1;
                    if ($next > 999) {
                        $next = 1;
                    }
                    $now = now();
                    $kode = strtoupper(Str::random(8));
                    $payload = [$colNumber => $next];
                    if ($hasPrefix) {
                        $payload['prefix'] = $prefix;
                    }
                    if ($hasTanggal) {
                        $payload['tanggal'] = $today;
                    }
                    if ($hasStatus) {
                        $payload['status'] = 'baru';
                    }
                    if ($hasAsal) {
                        $payload['asal'] = $channel;
                    }
                    if ($hasLoket) {
                        $payload['loket'] = 0;
                    }
                    if ($hasKodeTiket) {
                        $payload['kode_tiket'] = $kode;
                    }
                    if ($this->safeHasColumn('antriloket', 'dibuat_oleh')) {
                        $payload['dibuat_oleh'] = Auth::check() ? (string) Auth::id() : null;
                    }
                    if ($hasCreatedAt) {
                        $payload['created_at'] = $now;
                    }
                    if ($hasUpdatedAt) {
                        $payload['updated_at'] = $now;
                    }
                    DB::table('antriloket')->insert($payload);

                    return response()->json([
                        'ok' => true,
                        'number' => $next,
                        'nomor' => $next,
                        'prefix' => $hasPrefix ? $prefix : null,
                        'tanggal' => $today,
                        'created_at' => $now->format('Y-m-d H:i:s'),
                        'kode_tiket' => $hasKodeTiket ? $kode : null,
                    ], 201);
                } catch (\Illuminate\Database\QueryException $e) {
                    Log::warning('[QueueController::create] Retry attempt '.$attempts, [
                        'error' => $e->getMessage(),
                        'sql' => $e->getSql() ?? null,
                    ]);
                    if ($attempts >= 5) {
                        Log::error('[QueueController::create] Max retries reached', [
                            'error' => $e->getMessage(),
                        ]);

                        return response()->json(['ok' => false, 'message' => 'Nomor antrian sedang dibuat, coba lagi.'], 409);
                    }
                    usleep(100000);
                } catch (\Throwable $e) {
                    Log::error('[QueueController::create] Unexpected error in retry loop', [
                        'error' => $e->getMessage(),
                        'attempt' => $attempts,
                    ]);
                    if ($attempts >= 5) {
                        return response()->json(['ok' => false, 'message' => 'Nomor antrian sedang dibuat, coba lagi.'], 409);
                    }
                    usleep(100000);
                }
            }

            return response()->json(['ok' => false, 'message' => 'Nomor antrian sedang dibuat, coba lagi.'], 409);
        } catch (\Throwable $e) {
            Log::error('[QueueController::create] Outer catch - Critical error', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'ok' => false,
                'message' => 'Terjadi kesalahan pada server',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
            ], 500);
        }
    }

    public function current(Request $request)
    {
        try {
            $today = now()->toDateString();
            $hasNomor = $this->safeHasColumn('antriloket', 'nomor');
            $hasAntrian = $this->safeHasColumn('antriloket', 'antrian');
            $colNumber = $hasNomor ? 'nomor' : ($hasAntrian ? 'antrian' : null);
            $hasTanggal = $this->safeHasColumn('antriloket', 'tanggal');
            $hasPrefix = $this->safeHasColumn('antriloket', 'prefix');
            $hasStatus = $this->safeHasColumn('antriloket', 'status');
            $hasId = $this->safeHasColumn('antriloket', 'id');
            $hasKodeTiket = $this->safeHasColumn('antriloket', 'kode_tiket');

            if (! $colNumber) {
                return response()->json(['ok' => true, 'number' => null]);
            }

            try {
                $q = DB::table('antriloket');
                if ($hasTanggal) {
                    $q = $q->where('tanggal', $today);
                }
                if ($hasId) {
                    $q = $q->orderByDesc('id');
                } else {
                    $q = $q->orderByDesc($colNumber);
                }
                $row = $q->first();
                if (! $row) {
                    return response()->json(['ok' => true, 'number' => null]);
                }

                return response()->json([
                    'ok' => true,
                    'number' => $row->{$colNumber} ?? null,
                    'nomor' => $row->{$colNumber} ?? null,
                    'prefix' => $hasPrefix ? ($row->prefix ?? null) : null,
                    'tanggal' => $hasTanggal ? ($row->tanggal ?? null) : null,
                    'created_at' => property_exists($row, 'created_at') ? $row->created_at : null,
                    'kode_tiket' => $hasKodeTiket ? ($row->kode_tiket ?? null) : null,
                    'status' => $hasStatus ? ($row->status ?? null) : null,
                ]);
            } catch (\Illuminate\Database\QueryException $e) {
                Log::error('[QueueController::current] Database query error', [
                    'error' => $e->getMessage(),
                    'sql' => $e->getSql() ?? null,
                    'bindings' => $e->getBindings() ?? null,
                ]);

                return response()->json([
                    'ok' => false,
                    'message' => 'Terjadi kesalahan saat mengambil data antrian saat ini',
                    'error' => config('app.debug') ? $e->getMessage() : 'Database query error',
                ], 500);
            }
        } catch (\Throwable $e) {
            Log::error('[QueueController::current] Unexpected error', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'ok' => false,
                'message' => 'Terjadi kesalahan pada server',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
            ], 500);
        }
    }

    public function today(Request $request)
    {
        try {
            $today = now()->toDateString();

            // Gunakan safeHasColumn untuk menghindari exception dari Schema::hasColumn
            $hasNomor = $this->safeHasColumn('antriloket', 'nomor');
            $hasAntrian = $this->safeHasColumn('antriloket', 'antrian');
            $colNumber = $hasNomor ? 'nomor' : ($hasAntrian ? 'antrian' : null);
            $hasTanggal = $this->safeHasColumn('antriloket', 'tanggal');
            $hasPrefix = $this->safeHasColumn('antriloket', 'prefix');
            $hasStatus = $this->safeHasColumn('antriloket', 'status');
            $hasLoket = $this->safeHasColumn('antriloket', 'loket');
            $hasId = $this->safeHasColumn('antriloket', 'id');

            if (! $colNumber) {
                return response()->json(['ok' => true, 'data' => []]);
            }

            try {
                $q = DB::table('antriloket');
                if ($hasTanggal) {
                    $q = $q->where('tanggal', $today);
                }
                $q = $q->select([$colNumber.' as nomor']);
                if ($hasPrefix) {
                    $q = $q->addSelect('prefix');
                }
                if ($hasStatus) {
                    $q = $q->addSelect('status');
                }
                if ($hasTanggal) {
                    $q = $q->addSelect('tanggal');
                }
                if ($hasLoket) {
                    $q = $q->addSelect('loket');
                }
                if ($hasId) {
                    $q = $q->orderBy($colNumber)->orderBy('id');
                } else {
                    $q = $q->orderBy($colNumber);
                }

                $rows = $q->get();

                return response()->json([
                    'ok' => true,
                    'data' => $rows,
                ]);
            } catch (\Illuminate\Database\QueryException $e) {
                Log::error('[QueueController::today] Database query error', [
                    'error' => $e->getMessage(),
                    'sql' => $e->getSql() ?? null,
                    'bindings' => $e->getBindings() ?? null,
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'hasNomor' => $hasNomor,
                    'hasAntrian' => $hasAntrian,
                    'colNumber' => $colNumber,
                    'hasTanggal' => $hasTanggal,
                    'hasPrefix' => $hasPrefix,
                    'hasStatus' => $hasStatus,
                    'hasLoket' => $hasLoket,
                    'hasId' => $hasId,
                ]);

                return response()->json([
                    'ok' => false,
                    'message' => 'Terjadi kesalahan saat mengambil data antrian',
                    'error' => config('app.debug') ? $e->getMessage() : 'Database query error',
                ], 500);
            } catch (\Throwable $e) {
                Log::error('[QueueController::today] Unexpected error', [
                    'error' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                ]);

                return response()->json([
                    'ok' => false,
                    'message' => 'Terjadi kesalahan pada server',
                    'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
                ], 500);
            }
        } catch (\Throwable $e) {
            Log::error('[QueueController::today] Outer catch - Critical error', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'ok' => false,
                'message' => 'Terjadi kesalahan pada server',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
            ], 500);
        }
    }

    public function call(Request $request)
    {
        try {
            $today = now()->toDateString();
            $hasId = $this->safeHasColumn('antriloket', 'id');
            $hasNomor = $this->safeHasColumn('antriloket', 'nomor');
            $hasAntrian = $this->safeHasColumn('antriloket', 'antrian');
            $colNumber = $hasNomor ? 'nomor' : ($hasAntrian ? 'antrian' : null);
            $hasTanggal = $this->safeHasColumn('antriloket', 'tanggal');
            $hasStatus = $this->safeHasColumn('antriloket', 'status');
            $hasLoket = $this->safeHasColumn('antriloket', 'loket');
            $hasDipanggilPada = $this->safeHasColumn('antriloket', 'dipanggil_pada');
            $hasUpdatedAt = $this->safeHasColumn('antriloket', 'updated_at');
            $hasKodeTiket = $this->safeHasColumn('antriloket', 'kode_tiket');

            if (! $colNumber) {
                return response()->json(['ok' => false, 'message' => 'Kolom nomor/antrian tidak tersedia'], 500);
            }

            try {
                $loket = (int) $request->input('loket', 0);
                $id = $request->input('id');
                $nomor = $request->input('nomor');
                $kode = $request->input('kode_tiket');
                $q = DB::table('antriloket');
                if ($hasTanggal) {
                    $q = $q->where('tanggal', $today);
                }
                if ($id && $hasId) {
                    $q = $q->where('id', $id);
                } elseif ($kode && $hasKodeTiket) {
                    $q = $q->where('kode_tiket', $kode);
                } elseif ($nomor) {
                    $q = $q->where($colNumber, (int) $nomor);
                } else {
                    $q = $q->orderByDesc($hasId ? 'id' : $colNumber);
                }

                $row = $q->first();
                if (! $row) {
                    return response()->json(['ok' => false, 'message' => 'Nomor antrian tidak ditemukan'], 404);
                }

                $now = now();
                $payload = [];
                if ($hasStatus) {
                    $payload['status'] = 'dipanggil';
                }
                if ($hasLoket) {
                    $payload['loket'] = $loket;
                }
                if ($hasDipanggilPada) {
                    $payload['dipanggil_pada'] = $now;
                }
                if ($hasUpdatedAt) {
                    $payload['updated_at'] = $now;
                }

                DB::table('antriloket')->where($hasId ? 'id' : $colNumber, $hasId ? $row->id : $row->{$colNumber})->update($payload);

                return response()->json([
                    'ok' => true,
                    'id' => $hasId ? $row->id : null,
                    'nomor' => $row->{$colNumber} ?? null,
                    'tanggal' => $hasTanggal ? ($row->tanggal ?? $today) : $today,
                    'status' => $hasStatus ? 'dipanggil' : null,
                    'loket' => $hasLoket ? $loket : null,
                    'dipanggil_pada' => $hasDipanggilPada ? $now->format('Y-m-d H:i:s') : null,
                ], 200);
            } catch (\Illuminate\Database\QueryException $e) {
                Log::error('[QueueController::call] Database query error', [
                    'error' => $e->getMessage(),
                    'sql' => $e->getSql() ?? null,
                    'bindings' => $e->getBindings() ?? null,
                ]);

                return response()->json([
                    'ok' => false,
                    'message' => 'Terjadi kesalahan saat memanggil antrian',
                    'error' => config('app.debug') ? $e->getMessage() : 'Database query error',
                ], 500);
            }
        } catch (\Throwable $e) {
            Log::error('[QueueController::call] Unexpected error', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'ok' => false,
                'message' => 'Terjadi kesalahan pada server',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
            ], 500);
        }
    }

    public function finish(Request $request)
    {
        try {
            $today = now()->toDateString();
            $hasId = $this->safeHasColumn('antriloket', 'id');
            $hasNomor = $this->safeHasColumn('antriloket', 'nomor');
            $hasAntrian = $this->safeHasColumn('antriloket', 'antrian');
            $colNumber = $hasNomor ? 'nomor' : ($hasAntrian ? 'antrian' : null);
            $hasTanggal = $this->safeHasColumn('antriloket', 'tanggal');
            $hasStatus = $this->safeHasColumn('antriloket', 'status');
            $hasDicetakPada = $this->safeHasColumn('antriloket', 'dicetak_pada');
            $hasUpdatedAt = $this->safeHasColumn('antriloket', 'updated_at');
            $hasKodeTiket = $this->safeHasColumn('antriloket', 'kode_tiket');

            if (! $colNumber) {
                return response()->json(['ok' => false, 'message' => 'Kolom nomor/antrian tidak tersedia'], 500);
            }

            try {
                $id = $request->input('id');
                $nomor = $request->input('nomor');
                $kode = $request->input('kode_tiket');
                $q = DB::table('antriloket');
                if ($hasTanggal) {
                    $q = $q->where('tanggal', $today);
                }
                if ($id && $hasId) {
                    $q = $q->where('id', $id);
                } elseif ($kode && $hasKodeTiket) {
                    $q = $q->where('kode_tiket', $kode);
                } elseif ($nomor) {
                    $q = $q->where($colNumber, (int) $nomor);
                } else {
                    $q = $q->orderByDesc($hasId ? 'id' : $colNumber);
                }

                $row = $q->first();
                if (! $row) {
                    return response()->json(['ok' => false, 'message' => 'Nomor antrian tidak ditemukan'], 404);
                }

                $now = now();
                $payload = [];
                if ($hasStatus) {
                    $payload['status'] = 'dicetak';
                }
                if ($hasDicetakPada) {
                    $payload['dicetak_pada'] = $now;
                }
                if ($hasUpdatedAt) {
                    $payload['updated_at'] = $now;
                }

                DB::table('antriloket')->where($hasId ? 'id' : $colNumber, $hasId ? $row->id : $row->{$colNumber})->update($payload);

                return response()->json([
                    'ok' => true,
                    'id' => $hasId ? $row->id : null,
                    'nomor' => $row->{$colNumber} ?? null,
                    'tanggal' => $hasTanggal ? ($row->tanggal ?? $today) : $today,
                    'status' => $hasStatus ? 'dicetak' : null,
                    'dicetak_pada' => $hasDicetakPada ? $now->format('Y-m-d H:i:s') : null,
                ], 200);
            } catch (\Illuminate\Database\QueryException $e) {
                Log::error('[QueueController::finish] Database query error', [
                    'error' => $e->getMessage(),
                    'sql' => $e->getSql() ?? null,
                    'bindings' => $e->getBindings() ?? null,
                ]);

                return response()->json([
                    'ok' => false,
                    'message' => 'Terjadi kesalahan saat menyelesaikan antrian',
                    'error' => config('app.debug') ? $e->getMessage() : 'Database query error',
                ], 500);
            }
        } catch (\Throwable $e) {
            Log::error('[QueueController::finish] Unexpected error', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'ok' => false,
                'message' => 'Terjadi kesalahan pada server',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
            ], 500);
        }
    }

    public function cancel(Request $request)
    {
        try {
            $today = now()->toDateString();
            $hasId = $this->safeHasColumn('antriloket', 'id');
            $hasNomor = $this->safeHasColumn('antriloket', 'nomor');
            $hasAntrian = $this->safeHasColumn('antriloket', 'antrian');
            $colNumber = $hasNomor ? 'nomor' : ($hasAntrian ? 'antrian' : null);
            $hasTanggal = $this->safeHasColumn('antriloket', 'tanggal');
            $hasStatus = $this->safeHasColumn('antriloket', 'status');
            $hasDibatalkanPada = $this->safeHasColumn('antriloket', 'dibatalkan_pada');
            $hasUpdatedAt = $this->safeHasColumn('antriloket', 'updated_at');
            $hasKodeTiket = $this->safeHasColumn('antriloket', 'kode_tiket');

            if (! $colNumber) {
                return response()->json(['ok' => false, 'message' => 'Kolom nomor/antrian tidak tersedia'], 500);
            }

            try {
                $id = $request->input('id');
                $nomor = $request->input('nomor');
                $kode = $request->input('kode_tiket');
                $q = DB::table('antriloket');
                if ($hasTanggal) {
                    $q = $q->where('tanggal', $today);
                }
                if ($id && $hasId) {
                    $q = $q->where('id', $id);
                } elseif ($kode && $hasKodeTiket) {
                    $q = $q->where('kode_tiket', $kode);
                } elseif ($nomor) {
                    $q = $q->where($colNumber, (int) $nomor);
                } else {
                    $q = $q->orderByDesc($hasId ? 'id' : $colNumber);
                }

                $row = $q->first();
                if (! $row) {
                    return response()->json(['ok' => false, 'message' => 'Nomor antrian tidak ditemukan'], 404);
                }

                $now = now();
                $payload = [];
                if ($hasStatus) {
                    $payload['status'] = 'batal';
                }
                if ($hasDibatalkanPada) {
                    $payload['dibatalkan_pada'] = $now;
                }
                if ($hasUpdatedAt) {
                    $payload['updated_at'] = $now;
                }

                DB::table('antriloket')->where($hasId ? 'id' : $colNumber, $hasId ? $row->id : $row->{$colNumber})->update($payload);

                return response()->json([
                    'ok' => true,
                    'id' => $hasId ? $row->id : null,
                    'nomor' => $row->{$colNumber} ?? null,
                    'tanggal' => $hasTanggal ? ($row->tanggal ?? $today) : $today,
                    'status' => $hasStatus ? 'batal' : null,
                    'dibatalkan_pada' => $hasDibatalkanPada ? $now->format('Y-m-d H:i:s') : null,
                ], 200);
            } catch (\Illuminate\Database\QueryException $e) {
                Log::error('[QueueController::cancel] Database query error', [
                    'error' => $e->getMessage(),
                    'sql' => $e->getSql() ?? null,
                    'bindings' => $e->getBindings() ?? null,
                ]);

                return response()->json([
                    'ok' => false,
                    'message' => 'Terjadi kesalahan saat membatalkan antrian',
                    'error' => config('app.debug') ? $e->getMessage() : 'Database query error',
                ], 500);
            }
        } catch (\Throwable $e) {
            Log::error('[QueueController::cancel] Unexpected error', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'ok' => false,
                'message' => 'Terjadi kesalahan pada server',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
            ], 500);
        }
    }
}
