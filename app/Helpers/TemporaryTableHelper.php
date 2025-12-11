<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;

/**
 * Helper untuk mengelola tabel-tabel temporary/temporary_bayar_* secara konsisten.
 * Pola operasi: beginSession -> purge -> addRow/bulkInsert -> getRows -> purge.
 */
class TemporaryTableHelper
{
    /**
     * Konfigurasi tabel temporary yang diketahui dari schema_dump.
     * temp_count: jumlah kolom tempN yang tersedia.
     * pk: nama kolom kunci/logical key (umumnya 'no').
     */
    public const TABLE_CONFIGS = [
        'temporary' => ['pk' => 'no', 'temp_count' => 37],
        'temporary2' => ['pk' => 'no', 'temp_count' => 100],
        'temporary_bayar_ralan' => ['pk' => 'no', 'temp_count' => 17],
        'temporary_bayar_ranap' => ['pk' => 'no', 'temp_count' => 17],
        'temporary_payment' => ['pk' => 'no', 'temp_count' => 37],
        'temporary_resep' => ['pk' => 'no', 'temp_count' => 37],
        'temppanggilnorawat' => ['pk' => 'no_rawat', 'temp_count' => 0],
        'temppanggilrm' => ['pk' => 'no_rkm_medis', 'temp_count' => 0],
    ];

    /**
     * Menghasilkan session id integer (epoch millis) atau pakai yang diberikan.
     */
    public static function beginSession(string $table, ?int $sessionId = null): int
    {
        return $sessionId ?? (int) floor(microtime(true) * 1000);
    }

    /**
     * Hapus seluruh baris untuk session tertentu (berdasarkan kolom pk).
     */
    public static function purge(string $table, int|string $sessionKey): int
    {
        $cfg = self::config($table);

        return DB::table($table)->where($cfg['pk'], $sessionKey)->delete();
    }

    /**
     * Tambahkan satu baris ke tabel temporary.
     * $data dapat berupa:
     *  - indexed array: [val1, val2, ...] akan dipetakan ke temp1..tempN
     *  - associative array: ['temp3' => 'abc', 'temp10' => 'xyz']
     */
    public static function addRow(string $table, int|string $sessionKey, array $data): bool
    {
        $cfg = self::config($table);
        $row = self::normalizeRow($cfg, $sessionKey, $data);

        return DB::table($table)->insert($row);
    }

    /**
     * Tambahkan banyak baris sekaligus (lebih efisien).
     */
    public static function bulkInsert(string $table, int|string $sessionKey, array $rows): int
    {
        $cfg = self::config($table);
        $payload = [];
        foreach ($rows as $data) {
            $payload[] = self::normalizeRow($cfg, $sessionKey, $data);
        }
        if (empty($payload)) {
            return 0;
        }
        DB::table($table)->insert($payload);

        return count($payload);
    }

    /**
     * Ambil baris-baris untuk session tertentu.
     */
    public static function getRows(string $table, int|string $sessionKey): array
    {
        $cfg = self::config($table);

        return DB::table($table)->where($cfg['pk'], $sessionKey)->orderBy($cfg['pk'])->get()->toArray();
    }

    /**
     * Normalisasi data menjadi bentuk insertable: [pk => sessionKey, temp1 => ..., temp2 => ...].
     */
    protected static function normalizeRow(array $cfg, int|string $sessionKey, array $data): array
    {
        $row = [$cfg['pk'] => $sessionKey];
        $tempCols = self::tempColumns($cfg['temp_count']);
        if (self::isAssoc($data)) {
            // Hanya ambil key yang valid (temp1..tempN)
            foreach ($tempCols as $col) {
                if (array_key_exists($col, $data)) {
                    $row[$col] = $data[$col];
                }
            }
        } else {
            // Indexed mapping ke temp1..tempN
            foreach ($tempCols as $i => $col) {
                if (isset($data[$i])) {
                    $row[$col] = $data[$i];
                }
            }
        }

        return $row;
    }

    /**
     * Ambil konfigurasi tabel, atau fallback ke konfigurasi default seperti 'temporary'.
     */
    protected static function config(string $table): array
    {
        return self::TABLE_CONFIGS[$table] ?? ['pk' => 'no', 'temp_count' => 37];
    }

    /**
     * Daftar kolom temp1..tempN.
     */
    protected static function tempColumns(int $count): array
    {
        $cols = [];
        for ($i = 1; $i <= $count; $i++) {
            $cols[] = 'temp'.$i;
        }

        return $cols;
    }

    protected static function isAssoc(array $arr): bool
    {
        if ($arr === []) {
            return false;
        }

        return array_keys($arr) !== range(0, count($arr) - 1);
    }
}
