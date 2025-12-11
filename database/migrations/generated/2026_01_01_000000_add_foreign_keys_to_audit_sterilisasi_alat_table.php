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
        if (Schema::hasTable('audit_sterilisasi_alat')) {
            Schema::table('audit_sterilisasi_alat', function (Blueprint $table) {
                $table->foreign(['id_ruang'], 'audit_sterilisasi_alat_ibfk_1')->references(['id_ruang'])->on('ruang_audit_kepatuhan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('audit_sterilisasi_alat')) {
            Schema::table('audit_sterilisasi_alat', function (Blueprint $table) {
                $table->dropForeign('audit_sterilisasi_alat_ibfk_1');
            });
        }
    }
};
