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
        if (!Schema::hasTable('skrining_nutrisi_anak')) {
            Schema::create('skrining_nutrisi_anak', function (Blueprint $table) {
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
                $table->enum('sg1', ['Tidak', 'Ya']);
                $table->enum('nilai1', ['0', '1']);
                $table->enum('sg2', ['Tidak', 'Ya']);
                $table->enum('nilai2', ['0', '1']);
                $table->enum('sg3', ['Tidak', 'Ya']);
                $table->enum('nilai3', ['0', '1']);
                $table->enum('sg4', ['Tidak', 'Ya']);
                $table->enum('nilai4', ['0', '1']);
                $table->tinyInteger('total_hasil');
                $table->enum('skor_nutrisi', ['Risikio Berat', 'Risiko Sedang', 'Risiko Rendah'])->nullable();
                $table->enum('diketahui_dietisien', ['Tidak', 'Ya']);
                $table->string('keterangan_diketahui_dietisien', 10);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_nutrisi_anak');
    }
};
