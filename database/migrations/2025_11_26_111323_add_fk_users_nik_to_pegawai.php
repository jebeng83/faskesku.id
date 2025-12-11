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
        if (! \Illuminate\Support\Facades\Schema::hasTable('pegawai')) {
            return;
        }
        if (\Illuminate\Support\Facades\DB::connection()->getDriverName() === 'sqlite') {
            return;
        }
        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'nik')) {
                $table->string('nik', 20)->nullable()->after('email');
            }
        });

        try {
            \Illuminate\Support\Facades\DB::statement('ALTER TABLE `users` DROP INDEX `users_nik_foreign`');
        } catch (\Throwable $e) {
            // ignore if index does not exist
        }

        try {
            Schema::table('users', function (Blueprint $table) {
                $table->foreign('nik', 'fk_users_pegawai_nik')
                    ->references('nik')
                    ->on('pegawai')
                    ->onUpdate('cascade')
                    ->onDelete('restrict');
            });
        } catch (\Throwable $e) {
            // fallback: ensure index exists to aid lookups, skip FK if incompatible
            try {
                Schema::table('users', function (Blueprint $table) {
                    $table->index('nik', 'users_nik_idx');
                });
            } catch (\Throwable $e2) {
                // ignore
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            try {
                $table->dropForeign('fk_users_pegawai_nik');
            } catch (\Throwable $e) {
                try {
                    $table->dropForeign(['nik']);
                } catch (\Throwable $e2) {
                    // ignore
                }
            }
        });
    }
};
