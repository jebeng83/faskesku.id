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
        if (! Schema::hasTable('stok_obat_pasien')) {
            Schema::create('stok_obat_pasien', function (Blueprint $table) {
                $table->date('tanggal');
                $table->time('jam');
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('kode_brng', 15)->index('kode_brng');
                $table->double('jumlah');
                $table->char('kd_bangsal', 5)->index('kd_bangsal');
                $table->string('no_batch', 20);
                $table->string('no_faktur', 20);
                $table->string('aturan_pakai', 150);
                $table->enum('jam00', ['true', 'false']);
                $table->enum('jam01', ['true', 'false']);
                $table->enum('jam02', ['true', 'false']);
                $table->enum('jam03', ['true', 'false']);
                $table->enum('jam04', ['true', 'false']);
                $table->enum('jam05', ['true', 'false']);
                $table->enum('jam06', ['true', 'false']);
                $table->enum('jam07', ['true', 'false']);
                $table->enum('jam08', ['true', 'false']);
                $table->enum('jam09', ['true', 'false']);
                $table->enum('jam10', ['true', 'false']);
                $table->enum('jam11', ['true', 'false']);
                $table->enum('jam12', ['true', 'false']);
                $table->enum('jam13', ['true', 'false']);
                $table->enum('jam14', ['true', 'false']);
                $table->enum('jam15', ['true', 'false']);
                $table->enum('jam16', ['true', 'false']);
                $table->enum('jam17', ['true', 'false']);
                $table->enum('jam18', ['true', 'false']);
                $table->enum('jam19', ['true', 'false']);
                $table->enum('jam20', ['true', 'false']);
                $table->enum('jam21', ['true', 'false']);
                $table->enum('jam22', ['true', 'false']);
                $table->enum('jam23', ['true', 'false']);

                $table->primary(['tanggal', 'jam', 'no_rawat', 'kode_brng', 'no_batch', 'no_faktur']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stok_obat_pasien');
    }
};
