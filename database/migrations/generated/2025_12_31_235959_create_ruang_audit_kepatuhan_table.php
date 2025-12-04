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
        if (!Schema::hasTable('ruang_audit_kepatuhan')) {
            Schema::create('ruang_audit_kepatuhan', function (Blueprint $table) {
                $table->string('id_ruang', 5)->primary();
                $table->string('nama_ruang', 40)->index('nama_ruang');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ruang_audit_kepatuhan');
    }
};
