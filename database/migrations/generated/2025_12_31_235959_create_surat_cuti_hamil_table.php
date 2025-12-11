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
        if (!Schema::hasTable('surat_cuti_hamil')) {
            Schema::create('surat_cuti_hamil', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->string('keterangan_hamil', 25)->nullable();
                $table->date('terhitung_mulai')->nullable();
                $table->date('perkiraan_lahir')->nullable();
                $table->string('no_surat', 20)->nullable()->unique('no_surat');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_cuti_hamil');
    }
};
