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
        // Tabel untuk pemeriksaan laboratorium
        Schema::create('periksa_lab', function (Blueprint $table) {
            $table->string('no_rawat', 17)->primary();
            $table->string('nip', 20);
            $table->string('kd_jenis_prw', 15);
            $table->datetime('tgl_periksa');
            $table->time('jam');
            $table->text('dokter_perujuk')->nullable();
            $table->text('bagian_perujuk')->nullable();
            $table->text('kategori')->nullable();
            $table->enum('status', ['Menunggu', 'Proses', 'Selesai'])->default('Menunggu');
            $table->text('keterangan')->nullable();
            $table->timestamps();
            
            $table->foreign('no_rawat')->references('no_rawat')->on('reg_periksa')->onDelete('cascade');
            $table->foreign('nip')->references('nip')->on('employees')->onDelete('cascade');
            $table->foreign('kd_jenis_prw')->references('kd_jenis_prw')->on('jns_perawatan_lab')->onDelete('cascade');
        });

        // Tabel untuk detail hasil laboratorium
        Schema::create('detail_periksa_lab', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 17);
            $table->string('kd_jenis_prw', 15);
            $table->string('item_pemeriksaan');
            $table->text('nilai')->nullable();
            $table->string('nilai_rujukan')->nullable();
            $table->string('satuan')->nullable();
            $table->enum('keterangan', ['Normal', 'Tinggi', 'Rendah', 'Abnormal'])->nullable();
            $table->timestamps();
            
            $table->foreign('no_rawat')->references('no_rawat')->on('periksa_lab')->onDelete('cascade');
            $table->foreign('kd_jenis_prw')->references('kd_jenis_prw')->on('jns_perawatan_lab')->onDelete('cascade');
        });

        // Tabel untuk template pemeriksaan laboratorium
        Schema::create('template_laboratorium', function (Blueprint $table) {
            $table->id();
            $table->string('kd_jenis_prw', 15);
            $table->string('item_pemeriksaan');
            $table->string('nilai_rujukan_pria')->nullable();
            $table->string('nilai_rujukan_wanita')->nullable();
            $table->string('satuan')->nullable();
            $table->integer('urutan')->default(1);
            $table->enum('status', ['Aktif', 'Nonaktif'])->default('Aktif');
            $table->timestamps();
            
            $table->foreign('kd_jenis_prw')->references('kd_jenis_prw')->on('jns_perawatan_lab')->onDelete('cascade');
        });

        // Tabel untuk riwayat laboratorium
        Schema::create('riwayat_lab', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 17);
            $table->string('no_rkm_medis', 15);
            $table->string('kd_jenis_prw', 15);
            $table->datetime('tgl_periksa');
            $table->text('hasil_pemeriksaan');
            $table->string('dokter_pj')->nullable();
            $table->string('petugas_lab')->nullable();
            $table->timestamps();
            
            $table->foreign('no_rawat')->references('no_rawat')->on('reg_periksa')->onDelete('cascade');
            $table->foreign('no_rkm_medis')->references('no_rkm_medis')->on('patients')->onDelete('cascade');
            $table->foreign('kd_jenis_prw')->references('kd_jenis_prw')->on('jns_perawatan_lab')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_lab');
        Schema::dropIfExists('template_laboratorium');
        Schema::dropIfExists('detail_periksa_lab');
        Schema::dropIfExists('periksa_lab');
    }
};