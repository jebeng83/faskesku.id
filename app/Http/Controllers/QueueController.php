<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class QueueController extends Controller
{
    public function create(Request $request)
    {
        $channel = $request->query('channel', 'kiosk');
        if (! in_array($channel, ['kiosk','loket'])) {
            $channel = 'kiosk';
        }
        $prefix = $request->query('prefix');
        $today = now()->toDateString();
        $attempts = 0;
        $hasNomor = Schema::hasColumn('antriloket', 'nomor');
        $hasAntrian = Schema::hasColumn('antriloket', 'antrian');
        $colNumber = $hasNomor ? 'nomor' : ($hasAntrian ? 'antrian' : null);
        $hasTanggal = Schema::hasColumn('antriloket', 'tanggal');
        $hasPrefix = Schema::hasColumn('antriloket', 'prefix');
        $hasStatus = Schema::hasColumn('antriloket', 'status');
        $hasAsal = Schema::hasColumn('antriloket', 'asal');
        $hasLoket = Schema::hasColumn('antriloket', 'loket');
        $hasKodeTiket = Schema::hasColumn('antriloket', 'kode_tiket');
        $hasCreatedAt = Schema::hasColumn('antriloket', 'created_at');
        $hasUpdatedAt = Schema::hasColumn('antriloket', 'updated_at');

        if (! $colNumber) {
            return response()->json(['ok' => false, 'message' => 'Tabel antriloket tidak memiliki kolom nomor/antrian'], 500);
        }
        while ($attempts < 5) {
            $attempts++;
            $q = DB::table('antriloket');
            if ($hasTanggal) {
                $q = $q->where('tanggal', $today);
            }
            if ($hasPrefix) {
                $q = $q->when($prefix, function ($qq) use ($prefix) { $qq->where('prefix', $prefix); }, function ($qq) { $qq->whereNull('prefix'); });
            }
            $max = $q->max($colNumber);
            $next = (int) ($max ?? 0) + 1;
            if ($next > 999) { $next = 1; }
            $now = now();
            $kode = strtoupper(Str::random(8));
            try {
                $payload = [ $colNumber => $next ];
                if ($hasPrefix) { $payload['prefix'] = $prefix; }
                if ($hasTanggal) { $payload['tanggal'] = $today; }
                if ($hasStatus) { $payload['status'] = 'baru'; }
                if ($hasAsal) { $payload['asal'] = $channel; }
                if ($hasLoket) { $payload['loket'] = 0; }
                if ($hasKodeTiket) { $payload['kode_tiket'] = $kode; }
                if (Schema::hasColumn('antriloket', 'dibuat_oleh')) { $payload['dibuat_oleh'] = Auth::check() ? (string) Auth::id() : null; }
                if ($hasCreatedAt) { $payload['created_at'] = $now; }
                if ($hasUpdatedAt) { $payload['updated_at'] = $now; }
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
            } catch (\Throwable $e) {
                usleep(100000);
            }
        }
        return response()->json(['ok' => false, 'message' => 'Nomor antrian sedang dibuat, coba lagi.'], 409);
    }

    public function current(Request $request)
    {
        $today = now()->toDateString();
        $hasNomor = Schema::hasColumn('antriloket', 'nomor');
        $hasAntrian = Schema::hasColumn('antriloket', 'antrian');
        $colNumber = $hasNomor ? 'nomor' : ($hasAntrian ? 'antrian' : null);
        $hasTanggal = Schema::hasColumn('antriloket', 'tanggal');
        $hasPrefix = Schema::hasColumn('antriloket', 'prefix');
        $hasStatus = Schema::hasColumn('antriloket', 'status');
        $hasId = Schema::hasColumn('antriloket', 'id');
        $hasKodeTiket = Schema::hasColumn('antriloket', 'kode_tiket');

        if (! $colNumber) {
            return response()->json(['ok' => true, 'number' => null]);
        }

        $q = DB::table('antriloket');
        if ($hasTanggal) { $q = $q->where('tanggal', $today); }
        if ($hasId) { $q = $q->orderByDesc('id'); } else { $q = $q->orderByDesc($colNumber); }
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
    }

    public function today(Request $request)
    {
        $today = now()->toDateString();
        $hasNomor = Schema::hasColumn('antriloket', 'nomor');
        $hasAntrian = Schema::hasColumn('antriloket', 'antrian');
        $colNumber = $hasNomor ? 'nomor' : ($hasAntrian ? 'antrian' : null);
        $hasTanggal = Schema::hasColumn('antriloket', 'tanggal');
        $hasPrefix = Schema::hasColumn('antriloket', 'prefix');
        $hasStatus = Schema::hasColumn('antriloket', 'status');
        $hasLoket = Schema::hasColumn('antriloket', 'loket');
        $hasId = Schema::hasColumn('antriloket', 'id');

        if (! $colNumber) {
            return response()->json(['ok' => true, 'data' => []]);
        }

        $q = DB::table('antriloket');
        if ($hasTanggal) { $q = $q->where('tanggal', $today); }
        $q = $q->select([$colNumber.' as nomor']);
        if ($hasPrefix) { $q = $q->addSelect('prefix'); }
        if ($hasStatus) { $q = $q->addSelect('status'); }
        if ($hasTanggal) { $q = $q->addSelect('tanggal'); }
        if ($hasLoket) { $q = $q->addSelect('loket'); }
        if ($hasId) { $q = $q->orderBy($colNumber)->orderBy('id'); } else { $q = $q->orderBy($colNumber); }

        $rows = $q->get();
        return response()->json([
            'ok' => true,
            'data' => $rows,
        ]);
    }

    public function call(Request $request)
    {
        $today = now()->toDateString();
        $hasId = Schema::hasColumn('antriloket', 'id');
        $hasNomor = Schema::hasColumn('antriloket', 'nomor');
        $hasAntrian = Schema::hasColumn('antriloket', 'antrian');
        $colNumber = $hasNomor ? 'nomor' : ($hasAntrian ? 'antrian' : null);
        $hasTanggal = Schema::hasColumn('antriloket', 'tanggal');
        $hasStatus = Schema::hasColumn('antriloket', 'status');
        $hasLoket = Schema::hasColumn('antriloket', 'loket');
        $hasDipanggilPada = Schema::hasColumn('antriloket', 'dipanggil_pada');
        $hasUpdatedAt = Schema::hasColumn('antriloket', 'updated_at');
        $hasKodeTiket = Schema::hasColumn('antriloket', 'kode_tiket');

        if (! $colNumber) {
            return response()->json(['ok' => false, 'message' => 'Kolom nomor/antrian tidak tersedia'], 500);
        }

        $loket = (int) $request->input('loket', 0);
        $id = $request->input('id');
        $nomor = $request->input('nomor');
        $kode = $request->input('kode_tiket');
        $q = DB::table('antriloket');
        if ($hasTanggal) { $q = $q->where('tanggal', $today); }
        if ($id && $hasId) { $q = $q->where('id', $id); }
        elseif ($kode && $hasKodeTiket) { $q = $q->where('kode_tiket', $kode); }
        elseif ($nomor) { $q = $q->where($colNumber, (int) $nomor); }
        else { $q = $q->orderByDesc($hasId ? 'id' : $colNumber); }

        $row = $q->first();
        if (! $row) {
            return response()->json(['ok' => false, 'message' => 'Nomor antrian tidak ditemukan'], 404);
        }

        $now = now();
        $payload = [];
        if ($hasStatus) { $payload['status'] = 'dipanggil'; }
        if ($hasLoket) { $payload['loket'] = $loket; }
        if ($hasDipanggilPada) { $payload['dipanggil_pada'] = $now; }
        if ($hasUpdatedAt) { $payload['updated_at'] = $now; }

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
    }

    public function finish(Request $request)
    {
        $today = now()->toDateString();
        $hasId = Schema::hasColumn('antriloket', 'id');
        $hasNomor = Schema::hasColumn('antriloket', 'nomor');
        $hasAntrian = Schema::hasColumn('antriloket', 'antrian');
        $colNumber = $hasNomor ? 'nomor' : ($hasAntrian ? 'antrian' : null);
        $hasTanggal = Schema::hasColumn('antriloket', 'tanggal');
        $hasStatus = Schema::hasColumn('antriloket', 'status');
        $hasDicetakPada = Schema::hasColumn('antriloket', 'dicetak_pada');
        $hasUpdatedAt = Schema::hasColumn('antriloket', 'updated_at');
        $hasKodeTiket = Schema::hasColumn('antriloket', 'kode_tiket');

        if (! $colNumber) {
            return response()->json(['ok' => false, 'message' => 'Kolom nomor/antrian tidak tersedia'], 500);
        }

        $id = $request->input('id');
        $nomor = $request->input('nomor');
        $kode = $request->input('kode_tiket');
        $q = DB::table('antriloket');
        if ($hasTanggal) { $q = $q->where('tanggal', $today); }
        if ($id && $hasId) { $q = $q->where('id', $id); }
        elseif ($kode && $hasKodeTiket) { $q = $q->where('kode_tiket', $kode); }
        elseif ($nomor) { $q = $q->where($colNumber, (int) $nomor); }
        else { $q = $q->orderByDesc($hasId ? 'id' : $colNumber); }

        $row = $q->first();
        if (! $row) {
            return response()->json(['ok' => false, 'message' => 'Nomor antrian tidak ditemukan'], 404);
        }

        $now = now();
        $payload = [];
        if ($hasStatus) { $payload['status'] = 'dicetak'; }
        if ($hasDicetakPada) { $payload['dicetak_pada'] = $now; }
        if ($hasUpdatedAt) { $payload['updated_at'] = $now; }

        DB::table('antriloket')->where($hasId ? 'id' : $colNumber, $hasId ? $row->id : $row->{$colNumber})->update($payload);

        return response()->json([
            'ok' => true,
            'id' => $hasId ? $row->id : null,
            'nomor' => $row->{$colNumber} ?? null,
            'tanggal' => $hasTanggal ? ($row->tanggal ?? $today) : $today,
            'status' => $hasStatus ? 'dicetak' : null,
            'dicetak_pada' => $hasDicetakPada ? $now->format('Y-m-d H:i:s') : null,
        ], 200);
    }

    public function cancel(Request $request)
    {
        $today = now()->toDateString();
        $hasId = Schema::hasColumn('antriloket', 'id');
        $hasNomor = Schema::hasColumn('antriloket', 'nomor');
        $hasAntrian = Schema::hasColumn('antriloket', 'antrian');
        $colNumber = $hasNomor ? 'nomor' : ($hasAntrian ? 'antrian' : null);
        $hasTanggal = Schema::hasColumn('antriloket', 'tanggal');
        $hasStatus = Schema::hasColumn('antriloket', 'status');
        $hasDibatalkanPada = Schema::hasColumn('antriloket', 'dibatalkan_pada');
        $hasUpdatedAt = Schema::hasColumn('antriloket', 'updated_at');
        $hasKodeTiket = Schema::hasColumn('antriloket', 'kode_tiket');

        if (! $colNumber) {
            return response()->json(['ok' => false, 'message' => 'Kolom nomor/antrian tidak tersedia'], 500);
        }

        $id = $request->input('id');
        $nomor = $request->input('nomor');
        $kode = $request->input('kode_tiket');
        $q = DB::table('antriloket');
        if ($hasTanggal) { $q = $q->where('tanggal', $today); }
        if ($id && $hasId) { $q = $q->where('id', $id); }
        elseif ($kode && $hasKodeTiket) { $q = $q->where('kode_tiket', $kode); }
        elseif ($nomor) { $q = $q->where($colNumber, (int) $nomor); }
        else { $q = $q->orderByDesc($hasId ? 'id' : $colNumber); }

        $row = $q->first();
        if (! $row) {
            return response()->json(['ok' => false, 'message' => 'Nomor antrian tidak ditemukan'], 404);
        }

        $now = now();
        $payload = [];
        if ($hasStatus) { $payload['status'] = 'batal'; }
        if ($hasDibatalkanPada) { $payload['dibatalkan_pada'] = $now; }
        if ($hasUpdatedAt) { $payload['updated_at'] = $now; }

        DB::table('antriloket')->where($hasId ? 'id' : $colNumber, $hasId ? $row->id : $row->{$colNumber})->update($payload);

        return response()->json([
            'ok' => true,
            'id' => $hasId ? $row->id : null,
            'nomor' => $row->{$colNumber} ?? null,
            'tanggal' => $hasTanggal ? ($row->tanggal ?? $today) : $today,
            'status' => $hasStatus ? 'batal' : null,
            'dibatalkan_pada' => $hasDibatalkanPada ? $now->format('Y-m-d H:i:s') : null,
        ], 200);
    }
}
