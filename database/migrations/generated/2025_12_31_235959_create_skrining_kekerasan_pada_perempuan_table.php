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
        if (! Schema::hasTable('skrining_kekerasan_pada_perempuan')) {
            Schema::create('skrining_kekerasan_pada_perempuan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('menggambarkan_hubungan', ['Tidak Ada Ketegangan', 'Beberapa Ketegangan', 'Banyak Ketegangan'])->nullable();
                $table->enum('skor_menggambarkan_hubungan', ['1', '2', '3']);
                $table->enum('berdebat_dengan_pasangan', ['Tidak Ada Kesulitan', 'Beberapa Kesulitan', 'Kesulitan Besar'])->nullable();
                $table->enum('skor_berdebat_dengan_pasangan', ['1', '2', '3']);
                $table->enum('pertengkaran_membuat_sedih', ['Tidak Pernah', 'Kadang-kadang', 'Sering'])->nullable();
                $table->enum('skor_pertengkaran_membuat_sedih', ['1', '2', '3']);
                $table->enum('pertengkaran_menghasilkan_pukulan', ['Tidak Pernah', 'Kadang-kadang', 'Sering'])->nullable();
                $table->enum('skor_pertengkaran_menghasilkan_pukulan', ['1', '2', '3']);
                $table->enum('pernah_merasa_takut_dengan_pasangan', ['Tidak Pernah', 'Kadang-kadang', 'Sering'])->nullable();
                $table->enum('skor_pernah_merasa_takut_dengan_pasangan', ['1', '2', '3']);
                $table->enum('pasangan_melecehkan_secara_fisik', ['Tidak Pernah', 'Kadang-kadang', 'Sering'])->nullable();
                $table->enum('skor_pasangan_melecehkan_secara_fisik', ['1', '2', '3']);
                $table->enum('pasangan_melecehkan_secara_imosional', ['Tidak Pernah', 'Kadang-kadang', 'Sering'])->nullable();
                $table->enum('skor_pasangan_melecehkan_secara_imosional', ['1', '2', '3']);
                $table->enum('pasangan_melecehkan_secara_seksual', ['Tidak Pernah', 'Kadang-kadang', 'Sering'])->nullable();
                $table->enum('skor_pasangan_melecehkan_secara_seksual', ['1', '2', '3']);
                $table->string('totalskor', 3);
                $table->enum('hasil_skrining', ['Pasien Tidak Terindikasi Mengalami Kekerasan', 'Pasien Terindikasi Mengalami Kekerasan']);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_kekerasan_pada_perempuan');
    }
};
