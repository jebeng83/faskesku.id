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
        if (! Schema::hasTable('penilaian_medis_ralan_psikiatrik')) {
            Schema::create('penilaian_medis_ralan_psikiatrik', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('hubungan', 30);
                $table->string('keluhan_utama', 2000)->default('');
                $table->string('rps', 2000);
                $table->string('rpd', 1000)->default('');
                $table->string('rpk', 1000);
                $table->string('rpo', 1000);
                $table->string('alergi', 50);
                $table->string('penampilan', 200);
                $table->string('pembicaraan', 200);
                $table->string('psikomotor', 200);
                $table->string('sikap', 200);
                $table->string('mood', 200);
                $table->string('fungsi_kognitif', 200);
                $table->string('gangguan_persepsi', 200);
                $table->string('proses_pikir', 200);
                $table->string('pengendalian_impuls', 200);
                $table->string('tilikan', 200);
                $table->string('rta', 200);
                $table->enum('keadaan', ['Sehat', 'Sakit Ringan', 'Sakit Sedang', 'Sakit Berat']);
                $table->string('gcs', 10);
                $table->enum('kesadaran', ['Compos Mentis', 'Apatis', 'Somnolen', 'Sopor', 'Koma']);
                $table->string('td', 8)->default('');
                $table->string('nadi', 5)->default('');
                $table->string('rr', 5);
                $table->string('suhu', 5)->default('');
                $table->string('spo', 5);
                $table->string('bb', 5)->default('');
                $table->string('tb', 5)->default('');
                $table->enum('kepala', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('gigi', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('tht', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('thoraks', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('abdomen', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('genital', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('ekstremitas', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('kulit', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('ket_fisik', 1000);
                $table->string('penunjang', 1000);
                $table->string('diagnosis', 300);
                $table->string('tata', 1000);
                $table->string('konsulrujuk', 500);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_medis_ralan_psikiatrik');
    }
};
