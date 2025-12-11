<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop duplicate FK if exists: users_ibfk_1
            // Laravel dropForeign by name may not work across all drivers, use raw SQL
            try {
                \Illuminate\Support\Facades\DB::statement('ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`');
            } catch (\Throwable $e) {
                // Ignore if not exists
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Re-create FK users_ibfk_1 if needed (same as users_nik_foreign)
            try {
                \Illuminate\Support\Facades\DB::statement('ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`nik`) REFERENCES `pegawai`(`nik`) ON UPDATE CASCADE ON DELETE RESTRICT');
            } catch (\Throwable $e) {
                // Ignore if already exists or fails
            }
        });
    }
};
