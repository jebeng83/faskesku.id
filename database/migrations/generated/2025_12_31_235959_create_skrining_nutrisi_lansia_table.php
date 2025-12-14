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
        if (! Schema::hasTable('skrining_nutrisi_lansia')) {
            Schema::create('skrining_nutrisi_lansia', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('td', 8)->default('');
                $table->string('hr', 5)->default('');
                $table->string('rr', 5);
                $table->string('suhu', 5)->default('');
                $table->string('bb', 5)->default('');
                $table->string('tbpb', 5)->default('');
                $table->string('spo2', 5)->default('');
                $table->string('alergi', 100)->default('');
                $table->enum('sg1', ['Asupan Makan Sangat Berkurang', 'Asupan Makan Agak Berkurang', 'Asupan Makan Tidak Berkurang']);
                $table->enum('nilai1', ['0', '1', '2']);
                $table->enum('sg2', ['Penurunan Berat Badan Lebih Dari 3 Kg', 'Tidak Tahu', 'Penurunan Berat Badan Antara 1 Hingga 3 Kg', 'Tidak Ada Penurunan Berat Badan']);
                $table->enum('nilai2', ['0', '1', '2', '3']);
                $table->enum('sg3', ['Terbatas Dari Tempat Tidur Atau Kursi', 'Mampu Bangun Dari Tempat Tidur/Kursi Tetapi Tidak Bepergian Keluar Rumah', 'Dapat Bepergian Keluar Rumah']);
                $table->enum('nilai3', ['0', '1', '2']);
                $table->enum('sg4', ['Ya', 'Tidak']);
                $table->enum('nilai4', ['0', '1']);
                $table->enum('sg5', ['Depresi Berat Atau Kepikunan Berat', 'Kepikunan Ringan', 'Tidak Ada Gangguan Psikologis']);
                $table->enum('nilai5', ['0', '1', '2']);
                $table->enum('sg6', ['IMT < 19', '19 Hingga < 21', '21 Hingga < 23', 'IMT >= 23', 'Lingkar Betis < 31', 'Lingkar Betis >= 31']);
                $table->enum('nilai6', ['0', '1', '2', '3']);
                $table->tinyInteger('total_hasil');
                $table->enum('skor_nutrisi', ['Status Gizi Normal', 'Beresiko Malnutrisi', 'Malnutrisi'])->nullable();
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_nutrisi_lansia');
    }
};
