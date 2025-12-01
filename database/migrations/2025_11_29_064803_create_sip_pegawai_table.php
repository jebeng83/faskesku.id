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
        // Pastikan tabel pegawai sudah ada sebelum membuat foreign key
        if (! Schema::hasTable('pegawai')) {
            throw new \Exception('Tabel pegawai harus ada sebelum membuat tabel sip_pegawai');
        }

        // Cek apakah tabel sudah ada (untuk development yang sudah berjalan)
        if (! Schema::hasTable('sip_pegawai')) {
            Schema::create('sip_pegawai', function (Blueprint $table) {
                $table->string('nik', 20)->primary();
                $table->string('jnj_jabatan', 10);
                $table->string('no_sip', 100);
                $table->date('masa_berlaku');
                $table->enum('status', ['0', '1']);

                // Foreign key constraint ke tabel pegawai
                $table->foreign('nik')
                    ->references('nik')
                    ->on('pegawai')
                    ->onDelete('restrict')
                    ->onUpdate('cascade');

                // Index untuk performa query
                $table->index('masa_berlaku');
                $table->index('status');
            });

            // Set engine dan charset untuk konsistensi dengan tabel lain
            DB::statement('ALTER TABLE sip_pegawai ENGINE = InnoDB');
            DB::statement('ALTER TABLE sip_pegawai DEFAULT CHARSET = latin1 COLLATE = latin1_swedish_ci');
        } else {
            // Jika tabel sudah ada, pastikan foreign key constraint sudah ada
            $fkExists = collect(DB::select(
                'SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE '.
                "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'sip_pegawai' AND COLUMN_NAME = 'nik' ".
                "AND REFERENCED_TABLE_NAME = 'pegawai' AND REFERENCED_COLUMN_NAME = 'nik'"
            ))->isNotEmpty();

            if (! $fkExists) {
                // Tambahkan foreign key constraint jika belum ada
                DB::statement(
                    'ALTER TABLE sip_pegawai ADD CONSTRAINT sip_pegawai_ibfk_1 '.
                    'FOREIGN KEY (nik) REFERENCES pegawai (nik) ON DELETE RESTRICT ON UPDATE CASCADE'
                );
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Hapus foreign key constraint terlebih dahulu jika ada
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
            // Abaikan jika constraint tidak ada
        }

        Schema::dropIfExists('sip_pegawai');
    }
};
