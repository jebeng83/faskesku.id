<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('data_alergi')) {
            Schema::create('data_alergi', function (Blueprint $table) {
                $table->string('kd_alergi', 5);
                $table->string('nm_alergi', 100);
                $table->unsignedInteger('kode_jenis');

                $table->primary('kd_alergi');
                $table->index('kode_jenis');
            });
            try {
                $fkOk = collect(DB::select(
                    "SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'jenis_alergi' AND COLUMN_NAME = 'kode_jenis'"
                ))->isNotEmpty();
                if ($fkOk) {
                    DB::statement(
                        'ALTER TABLE data_alergi ADD CONSTRAINT data_alergi_kode_jenis_foreign FOREIGN KEY (kode_jenis) REFERENCES jenis_alergi (kode_jenis)'
                    );
                }
            } catch (\Throwable $e) {
                // fallback: biarkan hanya index
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('data_alergi');
    }
};
