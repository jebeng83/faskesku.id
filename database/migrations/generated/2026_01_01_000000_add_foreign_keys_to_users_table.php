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
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                try {
                    $table->foreign('nik', 'fk_users_pegawai_nik')->references('nik')->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
                } catch (\Throwable $e) {
                    // ignore if already exists
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                try {
                    $table->dropForeign('fk_users_pegawai_nik');
                } catch (\Throwable $e) {
                    try {
                        $table->dropForeign('users_nik_foreign');
                    } catch (\Throwable $e2) {
                        // ignore
                    }
                }
            });
        }
    }
};
