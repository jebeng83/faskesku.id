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
        if (!Schema::hasTable('penilaian_risiko_jatuh_neonatus')) {
            Schema::create('penilaian_risiko_jatuh_neonatus', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('intervensi1', ['Tidak', 'Ya'])->nullable();
                $table->enum('intervensi2', ['Tidak', 'Ya'])->nullable();
                $table->enum('intervensi3', ['Tidak', 'Ya'])->nullable();
                $table->enum('intervensi4', ['Tidak', 'Ya'])->nullable();
                $table->enum('intervensi5', ['Tidak', 'Ya'])->nullable();
                $table->enum('intervensi6', ['Tidak', 'Ya'])->nullable();
                $table->enum('intervensi7', ['Tidak', 'Ya'])->nullable();
                $table->enum('intervensi8', ['Tidak', 'Ya'])->nullable();
                $table->enum('intervensi9', ['Tidak', 'Ya'])->nullable();
                $table->enum('edukasi1', ['Tidak', 'Ya'])->nullable();
                $table->enum('edukasi2', ['Tidak', 'Ya'])->nullable();
                $table->enum('edukasi3', ['Tidak', 'Ya'])->nullable();
                $table->enum('edukasi4', ['Tidak', 'Ya'])->nullable();
                $table->enum('edukasi5', ['Tidak', 'Ya'])->nullable();
                $table->enum('sasaran1', ['Tidak', 'Ya'])->nullable();
                $table->enum('sasaran2', ['Tidak', 'Ya'])->nullable();
                $table->enum('sasaran3', ['Tidak', 'Ya'])->nullable();
                $table->enum('sasaran4', ['Tidak', 'Ya'])->nullable();
                $table->enum('evaluasi1', ['Tidak', 'Ya'])->nullable();
                $table->enum('evaluasi2', ['Tidak', 'Ya'])->nullable();
                $table->enum('evaluasi3', ['Tidak', 'Ya'])->nullable();
                $table->string('nip', 20)->index('nip');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_risiko_jatuh_neonatus');
    }
};
