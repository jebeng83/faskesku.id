<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $driver = DB::connection()->getDriverName();
        if (! Schema::hasTable('pegawai')) {
            return;
        }

        // Cek apakah tabel sudah ada (untuk development yang sudah berjalan)
        if (! Schema::hasTable('sip_pegawai')) {
            Schema::create('sip_pegawai', function (Blueprint $table) {
                $table->string('nik', 20)->primary();
                $table->string('jnj_jabatan', 10);
                $table->string('no_sip', 100);
                $table->date('masa_berlaku');
                $table->enum('status', ['0', '1']);

                // Index untuk performa query
                $table->index('masa_berlaku');
                $table->index('status');
            });

            // Tambahkan FK secara terpisah dengan pengecekan kolasi agar tidak gagal
            try {
                $collPegawaiRow = collect(DB::select(
                    "SELECT TABLE_COLLATION FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'pegawai'"
                ))->first();
                $collSipRow = collect(DB::select(
                    "SELECT TABLE_COLLATION FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'sip_pegawai'"
                ))->first();

                $collPegawai = $collPegawaiRow->TABLE_COLLATION ?? null;
                $collSip = $collSipRow->TABLE_COLLATION ?? null;

                if ($collPegawai && $collSip && $collPegawai === $collSip) {
                    DB::statement(
                        'ALTER TABLE sip_pegawai ADD CONSTRAINT sip_pegawai_nik_foreign '
                        .'FOREIGN KEY (nik) REFERENCES pegawai (nik) ON DELETE RESTRICT ON UPDATE CASCADE'
                    );
                } else {
                    Schema::table('sip_pegawai', function (Blueprint $table) {
                        $table->index('nik', 'sip_pegawai_nik_idx');
                    });
                }
            } catch (\Throwable $e) {
                try {
                    Schema::table('sip_pegawai', function (Blueprint $table) {
                        $table->index('nik', 'sip_pegawai_nik_idx');
                    });
                } catch (\Throwable $e2) {
                }
            }

            if ($driver !== 'sqlite') {
                DB::statement('ALTER TABLE sip_pegawai ENGINE = InnoDB');
                try {
                    $charset = DB::connection()->getConfig('charset') ?: 'utf8mb4';
                    $collation = DB::connection()->getConfig('collation') ?: 'utf8mb4_unicode_ci';
                    DB::statement("ALTER TABLE sip_pegawai DEFAULT CHARSET = {$charset} COLLATE = {$collation}");
                } catch (\Throwable $e) {
                    // ignore
                }
            }
        } else {
            if ($driver !== 'sqlite') {
                try {
                    $charset = DB::connection()->getConfig('charset') ?: 'utf8mb4';
                    $collation = DB::connection()->getConfig('collation') ?: 'utf8mb4_unicode_ci';
                    DB::statement("ALTER TABLE sip_pegawai CONVERT TO CHARACTER SET {$charset} COLLATE {$collation}");
                } catch (\Throwable $e) {
                    // ignore conversion errors
                }

                $fkExists = collect(DB::select(
                    'SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE '.
                    "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'sip_pegawai' AND COLUMN_NAME = 'nik' ".
                    "AND REFERENCED_TABLE_NAME = 'pegawai' AND REFERENCED_COLUMN_NAME = 'nik'"
                ))->isNotEmpty();

                if (! $fkExists) {
                    try {
                        DB::statement(
                            'ALTER TABLE sip_pegawai ADD CONSTRAINT fk_sip_pegawai_pegawai_nik '.
                            'FOREIGN KEY (nik) REFERENCES pegawai (nik) ON DELETE RESTRICT ON UPDATE CASCADE'
                        );
                    } catch (\Throwable $e) {
                        try {
                            Schema::table('sip_pegawai', function (Blueprint $table) {
                                $table->index('nik', 'sip_pegawai_nik_idx');
                            });
                        } catch (\Throwable $e2) {
                            // ignore
                        }
                    }
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $driver = DB::connection()->getDriverName();
        if ($driver !== 'sqlite') {
            try {
                $fkExists = collect(DB::select(
                    'SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE '.
                    "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'sip_pegawai' AND COLUMN_NAME = 'nik' ".
                    "AND REFERENCED_TABLE_NAME = 'pegawai' AND REFERENCED_COLUMN_NAME = 'nik'"
                ))->isNotEmpty();

                if ($fkExists) {
                    DB::statement('ALTER TABLE sip_pegawai DROP FOREIGN KEY sip_pegawai_ibfk_1');
                }
            } catch (\Throwable $e) {
            }
        }

        Schema::dropIfExists('sip_pegawai');
    }
};
