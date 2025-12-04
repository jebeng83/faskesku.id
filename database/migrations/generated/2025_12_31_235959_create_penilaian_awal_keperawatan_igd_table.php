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
        if (!Schema::hasTable('penilaian_awal_keperawatan_igd')) {
            Schema::create('penilaian_awal_keperawatan_igd', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('informasi', ['Autoanamnesis', 'Alloanamnesis']);
                $table->text('keluhan_utama');
                $table->text('rpd');
                $table->text('rpo');
                $table->enum('status_kehamilan', ['Tidak Hamil', 'Hamil']);
                $table->string('gravida', 20)->nullable();
                $table->string('para', 20)->nullable();
                $table->string('abortus', 20)->nullable();
                $table->string('hpht', 20)->nullable();
                $table->enum('tekanan', ['TAK', 'Sakit Kepala', 'Muntah', 'Pusing', 'Bingung']);
                $table->enum('pupil', ['Normal', 'Miosis', 'Isokor', 'Anisokor']);
                $table->enum('neurosensorik', ['TAK', 'Spasme Otot', 'Perubahan Sensorik', 'Perubahan Motorik', 'Perubahan Bentuk Ekstremitas', 'Penurunan Tingkat Kesadaran', 'Fraktur/Dislokasi', 'Luksasio', 'Kerusakan Jaringan/Luka']);
                $table->enum('integumen', ['TAK', 'Luka Bakar', 'Luka Robek', 'Lecet', 'Luka Decubitus', 'Luka Gangren']);
                $table->enum('turgor', ['Baik', 'Menurun']);
                $table->enum('edema', ['Tidak Ada', 'Ekstremitas', 'Seluruh Tubuh', 'Asites', 'Palpebrae']);
                $table->enum('mukosa', ['Lembab', 'Kering']);
                $table->enum('perdarahan', ['Tidak Ada', 'Ada']);
                $table->char('jumlah_perdarahan', 5)->nullable();
                $table->string('warna_perdarahan', 40)->nullable()->default('');
                $table->enum('intoksikasi', ['Tidak Ada', 'Ada', 'Gigitan Binatang', 'Zat Kimia', 'Gas', 'Obat']);
                $table->char('bab', 2)->nullable();
                $table->string('xbab', 10)->nullable();
                $table->string('kbab', 40)->nullable();
                $table->string('wbab', 40)->nullable();
                $table->char('bak', 2)->nullable();
                $table->string('xbak', 10)->nullable();
                $table->string('wbak', 40)->nullable()->default('');
                $table->string('lbak', 40)->nullable()->default('');
                $table->enum('psikologis', ['Tidak Ada Masalah', 'Marah', 'Takut', 'Depresi', 'Cepat Lelah', 'Cemas', 'Gelisah', 'Lain-lain']);
                $table->enum('jiwa', ['Ya', 'Tidak']);
                $table->enum('perilaku', ['Perilaku Kekerasan', 'Gangguan Efek', 'Gangguan Memori', 'Halusinasi', 'Kecenderungan Percobaan Bunuh Diri', 'Lainnya', '-']);
                $table->string('dilaporkan', 50)->nullable();
                $table->string('sebutkan', 50)->nullable();
                $table->enum('hubungan', ['Harmonis', 'Kurang Harmonis', 'Tidak Harmonis', 'Konflik Besar']);
                $table->enum('tinggal_dengan', ['Sendiri', 'Orang Tua', 'Suami / Istri', 'Lainnya']);
                $table->string('ket_tinggal', 50)->nullable()->default('');
                $table->enum('budaya', ['Tidak Ada', 'Ada']);
                $table->string('ket_budaya', 50);
                $table->enum('pendidikan_pj', ['-', 'TS', 'TK', 'SD', 'SMP', 'SMA', 'SLTA/SEDERAJAT', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3']);
                $table->string('ket_pendidikan_pj', 50)->nullable();
                $table->enum('edukasi', ['Pasien', 'Keluarga']);
                $table->string('ket_edukasi', 50);
                $table->enum('kemampuan', ['Mandiri', 'Bantuan Minimal', 'Bantuan Sebagian', 'Ketergantungan Total']);
                $table->enum('aktifitas', ['Tirah Baring', 'Duduk', 'Berjalan']);
                $table->enum('alat_bantu', ['Tidak', 'Ya']);
                $table->string('ket_bantu', 50)->nullable()->default('');
                $table->enum('nyeri', ['Tidak Ada Nyeri', 'Nyeri Akut', 'Nyeri Kronis']);
                $table->enum('provokes', ['Proses Penyakit', 'Benturan', 'Lain-lain']);
                $table->string('ket_provokes', 40);
                $table->enum('quality', ['Seperti Tertusuk', 'Berdenyut', 'Teriris', 'Tertindih', 'Tertiban', 'Lain-lain']);
                $table->string('ket_quality', 50);
                $table->string('lokasi', 50);
                $table->enum('menyebar', ['Tidak', 'Ya']);
                $table->enum('skala_nyeri', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
                $table->string('durasi', 25);
                $table->enum('nyeri_hilang', ['Istirahat', 'Medengar Musik', 'Minum Obat']);
                $table->string('ket_nyeri', 40)->nullable();
                $table->enum('pada_dokter', ['Tidak', 'Ya']);
                $table->string('ket_dokter', 15)->nullable();
                $table->enum('berjalan_a', ['Ya', 'Tidak']);
                $table->enum('berjalan_b', ['Ya', 'Tidak']);
                $table->enum('berjalan_c', ['Ya', 'Tidak']);
                $table->enum('hasil', ['Tidak beresiko (tidak ditemukan a dan b)', 'Resiko rendah (ditemukan a/b)', 'Resiko tinggi (ditemukan a dan b)']);
                $table->enum('lapor', ['Ya', 'Tidak']);
                $table->string('ket_lapor', 15)->nullable();
                $table->text('rencana');
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_awal_keperawatan_igd');
    }
};
