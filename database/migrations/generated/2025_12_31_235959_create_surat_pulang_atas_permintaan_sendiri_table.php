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
        if (!Schema::hasTable('surat_pulang_atas_permintaan_sendiri')) {
            Schema::create('surat_pulang_atas_permintaan_sendiri', function (Blueprint $table) {
                $table->string('no_surat', 20)->primary();
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_pulang');
                $table->string('rs_pilihan', 50);
                $table->string('nama_pj', 50);
                $table->date('lahir');
                $table->string('umur', 3);
                $table->enum('jkpj', ['L', 'P']);
                $table->string('alamat', 100);
                $table->enum('hubungan', ['Suami', 'Istri', 'Anak', 'Ayah', 'Ibu', 'Saudara', 'Keponakan']);
                $table->string('saksi_keluarga', 50);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_pulang_atas_permintaan_sendiri');
    }
};
