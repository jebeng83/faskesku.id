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
        if (!Schema::hasTable('detail_permintaan_stok_obat_pasien')) {
            Schema::create('detail_permintaan_stok_obat_pasien', function (Blueprint $table) {
                $table->string('no_permintaan', 14)->nullable()->index('no_permintaan');
                $table->string('kode_brng', 15)->nullable()->index('kode_brng');
                $table->double('jml')->nullable();
                $table->string('aturan_pakai', 150)->nullable();
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
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_permintaan_stok_obat_pasien');
    }
};
