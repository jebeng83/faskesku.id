<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('odontogram')) {
            return;
        }

        if (! Schema::hasColumn('odontogram', 'tanggal')) {
            DB::statement('ALTER TABLE `odontogram` ADD COLUMN `tanggal` DATE NULL AFTER `no_rkm_medis`');
        }

        try {
            DB::statement('ALTER TABLE `odontogram` ADD INDEX `idx_odontogram_tanggal` (`tanggal`)');
        } catch (\Throwable $e) {}
    }

    public function down(): void
    {
        if (! Schema::hasTable('odontogram')) {
            return;
        }

        try {
            DB::statement('ALTER TABLE `odontogram` DROP INDEX `idx_odontogram_tanggal`');
        } catch (\Throwable $e) {}

        if (Schema::hasColumn('odontogram', 'tanggal')) {
            try {
                DB::statement('ALTER TABLE `odontogram` DROP COLUMN `tanggal`');
            } catch (\Throwable $e) {}
        }
    }
};
