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
        if (! Schema::hasTable('suratsakitpihak2')) {
            Schema::create('suratsakitpihak2', function (Blueprint $table) {
                $table->string('no_surat', 20);
                $table->string('no_rawat', 17)->nullable()->index('no_rawat');
                $table->date('tanggalawal')->nullable();
                $table->date('tanggalakhir')->nullable();
                $table->string('lamasakit', 20)->nullable();
                $table->string('nama2', 50);
                $table->date('tgl_lahir');
                $table->string('umur', 20);
                $table->enum('jk', ['Laki-laki', 'Perempuan']);
                $table->string('alamat', 200);
                $table->enum('hubungan', ['Suami', 'Istri', 'Anak', 'Ayah', 'Saudara', 'Keponakan']);
                $table->enum('pekerjaan', ['Karyawan Swasta', 'PNS', 'Wiraswasta', 'Pelajar', 'Mahasiswa', 'Buruh', 'Lain-lain']);
                $table->string('instansi', 50);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suratsakitpihak2');
    }
};
