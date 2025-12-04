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
        if (!Schema::hasTable('skrining_adiksi_nikotin')) {
            Schema::create('skrining_adiksi_nikotin', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('rokok_dihisap', ['1-10', '11-20', '21-30', '>=31'])->nullable();
                $table->tinyInteger('nilai_rokok_dihisap')->nullable();
                $table->enum('menyalakan_rokok', ['Dalam 5 Menit', '6 Hingga 30 Menit', '31 Hingga 60 Menit', 'Setelah 60 Menit'])->nullable();
                $table->tinyInteger('nilai_menyalakan_rokok')->nullable();
                $table->enum('tidak_rela', ['Lainnya', 'Rokok Pertama Pada Pagi Hari'])->nullable();
                $table->tinyInteger('nilai_tidak_rela')->nullable();
                $table->enum('jam_pertama', ['Ya', 'Tidak'])->nullable();
                $table->tinyInteger('nilai_jam_pertama')->nullable();
                $table->enum('rasa_ingin', ['Ya', 'Tidak'])->nullable();
                $table->tinyInteger('nilai_rasa_ingin')->nullable();
                $table->enum('sakit_berat', ['Ya', 'Tidak'])->nullable();
                $table->tinyInteger('nilai_sakit_berat')->nullable();
                $table->tinyInteger('nilai_total')->nullable();
                $table->enum('keterangan_hasil_skrining', ['Ketergantungan Berat', 'Ketergantungan Sedang', 'Ketergantungan Rendah'])->nullable();
                $table->enum('skala_motivasi', ['1. Saya SUDAH memutuskan TIDAK akan berhenti merokok seumur hidup Saya', '2. Saya TIDAK PERNAH berpikir untuk berhenti merokok. Saya TIDAK PUNYA rencana untuk berhenti', '3. Saya PERNAH berpikir untuk berhentl merokok, tetapi Saya TIDAK PUNYA rencana', '4. TERKADANG Saya berpikir untuk berhenti merokok, tetapi Saya tidak punya rencana', '5. Saya SERING berpikir untuk berhentl merokok, tetapi Saya tidak punya rencana', '6. Saya BERENCANA untuk berhenti merokok dalam 6 bulan ke depan', '7. Saya berencana untuk berhenti merokok dalam 30 hari ke depan', '8. Saya masih merokok, tetapi Saya mau berubah. Saya siap untuk berhenti merokok', '9. Saya sudah berhenti merokok, tetapi Saya khawatir akan merokok kembali, Saya butuh lingkungan tanpa asap rokok', '10. Saya sudah berhenti merokok'])->nullable();
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_adiksi_nikotin');
    }
};
