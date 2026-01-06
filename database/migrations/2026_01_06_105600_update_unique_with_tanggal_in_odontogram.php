<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('odontogram')) {
            return;
        }

        try {
            DB::statement('ALTER TABLE `odontogram` DROP INDEX `uniq_odontogram_rm_elemen`');
        } catch (\Throwable $e) {}

        try {
            DB::statement('ALTER TABLE `odontogram` ADD UNIQUE KEY `uniq_odontogram_rm_elemen_tanggal` (`no_rkm_medis`,`elemen_gigi`,`tanggal`)');
        } catch (\Throwable $e) {}
    }

    public function down(): void
    {
        if (! Schema::hasTable('odontogram')) {
            return;
        }

        try {
            DB::statement('ALTER TABLE `odontogram` DROP INDEX `uniq_odontogram_rm_elemen_tanggal`');
        } catch (\Throwable $e) {}

        try {
            DB::statement('ALTER TABLE `odontogram` ADD UNIQUE KEY `uniq_odontogram_rm_elemen` (`no_rkm_medis`,`elemen_gigi`)');
        } catch (\Throwable $e) {}
    }
};
