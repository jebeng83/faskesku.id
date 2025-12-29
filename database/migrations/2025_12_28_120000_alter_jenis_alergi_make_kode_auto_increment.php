<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('jenis_alergi')) {
            DB::statement('ALTER TABLE jenis_alergi MODIFY COLUMN kode_jenis INT UNSIGNED NOT NULL AUTO_INCREMENT');
            $hasPk = collect(DB::select("SELECT COUNT(1) AS cnt FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'jenis_alergi' AND CONSTRAINT_NAME = 'PRIMARY' AND COLUMN_NAME = 'kode_jenis'"))->first();
            $cnt = (int) (($hasPk->cnt ?? 0));
            if ($cnt === 0) {
                DB::statement('ALTER TABLE jenis_alergi ADD PRIMARY KEY (kode_jenis)');
            }
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('jenis_alergi')) {
            DB::statement('ALTER TABLE jenis_alergi MODIFY COLUMN kode_jenis INT UNSIGNED NOT NULL');
        }
    }
};
