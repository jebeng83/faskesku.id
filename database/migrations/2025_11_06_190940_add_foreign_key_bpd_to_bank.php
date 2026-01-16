<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

return new class extends Migration
{
    public function up(): void
    {
        if (DB::connection()->getDriverName() === 'sqlite') {
            return;
        }
        if (! Schema::hasTable('bank')) {
            Schema::create('bank', function (Blueprint $table) {
                $table->string('namabank', 50)->unique();
                $table->primary(['namabank']);
            });
        }
        $hasUnique = collect(DB::select("SHOW INDEX FROM bank WHERE Key_name = 'bank_namabank_unique'"))->isNotEmpty();
        if (! $hasUnique) {
            DB::statement('ALTER TABLE bank ADD UNIQUE KEY bank_namabank_unique (namabank)');
        }

        if (Schema::hasTable('pegawai')) {
            DB::statement('UPDATE pegawai p LEFT JOIN bank b ON b.namabank = p.bpd SET p.bpd = NULL WHERE p.bpd IS NOT NULL AND b.namabank IS NULL');
        }

        $fkExists = collect(DB::select(
            "SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE \n".
            "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'pegawai' AND COLUMN_NAME = 'bpd' \n".
            "AND REFERENCED_TABLE_NAME = 'bank' AND REFERENCED_COLUMN_NAME = 'namabank'"
        ))->isNotEmpty();

        if (! $fkExists && Schema::hasTable('pegawai')) {
            DB::statement('ALTER TABLE pegawai ADD CONSTRAINT pegawai_ibfk_8 FOREIGN KEY (bpd) REFERENCES bank (namabank) ON UPDATE CASCADE');
        }
    }

    public function down(): void
    {
        if (DB::connection()->getDriverName() === 'sqlite') {
            return;
        }
        // Hapus FK jika ada
        try {
            DB::statement('ALTER TABLE pegawai DROP FOREIGN KEY pegawai_ibfk_8');
        } catch (\Throwable $e) {
            // abaikan jika tidak ada
        }

        // Hapus indeks unik jika ada
        try {
            DB::statement('ALTER TABLE bank DROP INDEX bank_namabank_unique');
        } catch (\Throwable $e) {
            // abaikan jika tidak ada
        }
    }
};
