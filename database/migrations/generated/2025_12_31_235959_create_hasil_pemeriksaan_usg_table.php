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
        if (! Schema::hasTable('hasil_pemeriksaan_usg')) {
            Schema::create('hasil_pemeriksaan_usg', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('diagnosa_klinis', 50)->nullable();
                $table->string('kiriman_dari', 50)->nullable();
                $table->string('hta', 40)->nullable();
                $table->string('kantong_gestasi', 6)->nullable();
                $table->string('ukuran_bokongkepala', 6)->nullable();
                $table->string('jenis_prestasi', 30)->nullable();
                $table->string('diameter_biparietal', 6)->nullable();
                $table->string('panjang_femur', 6)->nullable();
                $table->string('lingkar_abdomen', 6)->nullable();
                $table->string('tafsiran_berat_janin', 6)->nullable();
                $table->string('usia_kehamilan', 15)->nullable();
                $table->string('plasenta_berimplatansi', 50)->nullable();
                $table->enum('derajat_maturitas', ['0', '1', '2', '3'])->nullable();
                $table->enum('jumlah_air_ketuban', ['Cukup', 'Berkurang'])->nullable();
                $table->string('indek_cairan_ketuban', 40)->nullable();
                $table->string('kelainan_kongenital', 60)->nullable();
                $table->enum('peluang_sex', ['Laki-laki', 'Perempuan', '-'])->nullable();
                $table->string('kesimpulan', 200)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_pemeriksaan_usg');
    }
};
