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
        if (!Schema::hasTable('penilaian_medis_ralan_geriatri')) {
            Schema::create('penilaian_medis_ralan_geriatri', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('hubungan', 30);
                $table->string('keluhan_utama', 2000)->default('');
                $table->string('rps', 2000);
                $table->string('rpd', 1000)->default('');
                $table->string('rpo', 1000);
                $table->string('alergi', 50)->default('');
                $table->enum('tulang_belakang', ['Tegap', 'Membungkuk', 'Kifosis', 'Skoliosis', 'Lordosis']);
                $table->string('td', 8)->default('');
                $table->string('nadi', 5)->default('');
                $table->string('suhu', 5);
                $table->string('rr', 5)->default('');
                $table->string('kondisi_umum', 1000);
                $table->enum('status_psikologis_gds', ['Skor 1-4 Tidak Ada Depresi', 'Skor Antara 5-9 Menunjukkan Kemungkinan Besar Depresi', 'Skor 10 Atau Lebih Menunjukkan Depresi']);
                $table->string('kondisi_sosial', 500);
                $table->enum('status_kognitif_mmse', ['24-30 : Tidak Ada Gangguan Kognitif', '18-23 : Gangguan Kognitif Sedang', '0-17 : Gangguan Kognitif Berat']);
                $table->enum('kepala', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_kepala', 100);
                $table->enum('thoraks', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_thoraks', 100);
                $table->enum('abdomen', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_abdomen', 100);
                $table->enum('ekstremitas', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_ekstremitas', 100);
                $table->enum('Integument_kebersihan', ['Normal', 'Abnormal']);
                $table->enum('Integument_warna', ['Normal', 'Pucat', 'Sianosis', 'Lain-lain']);
                $table->enum('Integument_kelembaban', ['Kering', 'Lembab']);
                $table->enum('Integument_gangguan_kulit', ['Normal', 'Rash', 'Luka', 'Memar', 'Ptekie', 'Bula']);
                $table->enum('status_fungsional', ['20 : Mandiri (A)', '12-19 : Ketergantungan Ringan (B)', '9-11 : Ketergantungan Sedang (B)', '5-8 : Ketergantungan Berat (C)', '0-4 : Ketergantungan Total (C)']);
                $table->enum('skrining_jatuh', ['Risiko Rendah Skor 0-5', 'Risiko Sedang Skor 6-16', 'Risiko Tinggi Skor 17-30']);
                $table->enum('status_nutrisi', ['Skor 12-14 : Status Gizi Normal', 'Skor 8-11 : Berisiko Malnutrisi', 'Skor 0-7 : Malnutrisi']);
                $table->string('lainnya', 1000);
                $table->string('lab', 500);
                $table->string('rad', 500);
                $table->string('pemeriksaan', 500);
                $table->string('diagnosis', 500);
                $table->string('diagnosis2', 500);
                $table->string('permasalahan', 500);
                $table->string('terapi', 500);
                $table->string('tindakan', 500);
                $table->string('edukasi', 500);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_medis_ralan_geriatri');
    }
};
