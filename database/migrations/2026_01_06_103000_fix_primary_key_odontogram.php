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

        // Switch primary reference from no_rawat to no_rkm_medis + elemen_gigi

        // Drop PRIMARY KEY on no_rawat if present
        try {
            DB::statement('ALTER TABLE `odontogram` DROP PRIMARY KEY');
        } catch (\Throwable $e) {
            // ignore if not present
        }

        // Ensure index on no_rawat for FK performance
        try {
            DB::statement('CREATE INDEX `idx_odontogram_no_rawat` ON `odontogram` (`no_rawat`)');
        } catch (\Throwable $e) {
            // ignore if exists
        }

        // Set PRIMARY KEY to (no_rkm_medis, elemen_gigi)
        try {
            DB::statement('ALTER TABLE `odontogram` ADD PRIMARY KEY (`no_rkm_medis`,`elemen_gigi`)');
        } catch (\Throwable $e) {
            // ignore if already set
        }

        // Optional: Avoid duplicate entries per element per patient
        // Drop old unique per visit if exists, then add unique per patient
        try {
            DB::statement('ALTER TABLE `odontogram` DROP INDEX `uniq_odontogram_rawat_elemen`');
        } catch (\Throwable $e) {
            // ignore if not present
        }
        try {
            DB::statement('ALTER TABLE `odontogram` ADD UNIQUE KEY `uniq_odontogram_rm_elemen` (`no_rkm_medis`,`elemen_gigi`)');
        } catch (\Throwable $e) {
            // ignore
        }
    }

    public function down(): void
    {
        if (! Schema::hasTable('odontogram')) {
            return;
        }

        // Drop unique keys if exists
        try {
            DB::statement('ALTER TABLE `odontogram` DROP INDEX `uniq_odontogram_rawat_elemen`');
        } catch (\Throwable $e) {}
        try {
            DB::statement('ALTER TABLE `odontogram` DROP INDEX `uniq_odontogram_rm_elemen`');
        } catch (\Throwable $e) {}

        // Drop PRIMARY KEY on (no_rkm_medis, elemen_gigi)
        try {
            DB::statement('ALTER TABLE `odontogram` DROP PRIMARY KEY');
        } catch (\Throwable $e) {}


        // Restore PRIMARY KEY on no_rawat
        try {
            DB::statement('ALTER TABLE `odontogram` ADD PRIMARY KEY (`no_rawat`)');
        } catch (\Throwable $e) {}
    }
};
