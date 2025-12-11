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
        if (!Schema::hasTable('surat_keterangan_sehat')) {
            Schema::create('surat_keterangan_sehat', function (Blueprint $table) {
                $table->string('no_surat', 17)->primary();
                $table->string('no_rawat', 17)->nullable()->index('no_rawat');
                $table->date('tanggalsurat');
                $table->string('berat', 3);
                $table->string('tinggi', 3);
                $table->string('tensi', 8);
                $table->string('suhu', 4);
                $table->enum('butawarna', ['Ya', 'Tidak']);
                $table->string('keperluan', 100);
                $table->enum('kesimpulan', ['Sehat', 'Tidak Sehat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_keterangan_sehat');
    }
};
