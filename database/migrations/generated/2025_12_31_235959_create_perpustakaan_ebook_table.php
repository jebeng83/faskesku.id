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
        if (!Schema::hasTable('perpustakaan_ebook')) {
            Schema::create('perpustakaan_ebook', function (Blueprint $table) {
                $table->string('kode_ebook', 10)->default('')->primary();
                $table->string('judul_ebook', 200)->nullable();
                $table->char('jml_halaman', 5)->nullable();
                $table->string('kode_penerbit', 10)->nullable()->index('kode_penerbit');
                $table->string('kode_pengarang', 7)->nullable()->index('kode_pengarang');
                $table->year('thn_terbit')->nullable();
                $table->char('id_kategori', 5)->nullable()->index('id_kategori');
                $table->char('id_jenis', 5)->nullable()->index('id_jenis');
                $table->string('berkas', 1000);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perpustakaan_ebook');
    }
};
