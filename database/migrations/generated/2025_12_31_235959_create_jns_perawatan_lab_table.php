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
        if (!Schema::hasTable('jns_perawatan_lab')) {
            Schema::create('jns_perawatan_lab', function (Blueprint $table) {
                $table->string('kd_jenis_prw', 15)->primary();
                $table->string('nm_perawatan', 80)->nullable()->index('nm_perawatan');
                $table->double('bagian_rs')->nullable()->index('bagian_rs');
                $table->double('bhp')->index('bhp');
                $table->double('tarif_perujuk')->index('tarif_perujuk');
                $table->double('tarif_tindakan_dokter')->index('tarif_tindakan_dokter');
                $table->double('tarif_tindakan_petugas')->nullable()->index('tarif_tindakan_petugas');
                $table->double('kso')->nullable()->index('kso');
                $table->double('menejemen')->nullable()->index('menejemen');
                $table->double('total_byr')->nullable()->index('total_byr');
                $table->char('kd_pj', 3)->index('kd_pj');
                $table->enum('status', ['0', '1'])->index('status');
                $table->enum('kelas', ['-', 'Rawat Jalan', 'Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas Utama', 'Kelas VIP', 'Kelas VVIP']);
                $table->enum('kategori', ['PK', 'PA', 'MB']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jns_perawatan_lab');
    }
};
