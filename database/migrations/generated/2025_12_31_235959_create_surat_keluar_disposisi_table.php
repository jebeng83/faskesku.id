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
        if (!Schema::hasTable('surat_keluar_disposisi')) {
            Schema::create('surat_keluar_disposisi', function (Blueprint $table) {
                $table->string('no_disposisi', 15)->primary();
                $table->string('kd_indeks', 5)->index('kd_indeks');
                $table->string('no_urut', 15)->index('no_urut');
                $table->date('tgl_selesai');
                $table->string('isi', 300);
                $table->string('diteruskan', 300);
                $table->date('tgl_kembali');
                $table->string('kepada', 100);
                $table->enum('pengesahan', ['true', 'false']);
                $table->string('harap', 300);
                $table->string('catatan', 300);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_keluar_disposisi');
    }
};
