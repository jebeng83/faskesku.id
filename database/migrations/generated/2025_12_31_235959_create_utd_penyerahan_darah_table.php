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
        if (! Schema::hasTable('utd_penyerahan_darah')) {
            Schema::create('utd_penyerahan_darah', function (Blueprint $table) {
                $table->string('no_penyerahan', 17)->default('')->primary();
                $table->date('tanggal')->nullable();
                $table->enum('dinas', ['Pagi', 'Siang', 'Sore', 'Malam'])->nullable();
                $table->string('nip_cross', 20)->nullable()->index('nip');
                $table->string('keterangan', 40)->nullable();
                $table->enum('status', ['Belum Dibayar', 'Sudah Dibayar'])->nullable();
                $table->string('kd_rek', 15)->nullable()->index('kd_rek');
                $table->string('pengambil_darah', 70)->nullable();
                $table->string('alamat_pengambil_darah', 120)->nullable();
                $table->string('nip_pj', 20)->nullable();
                $table->double('besarppn')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utd_penyerahan_darah');
    }
};
