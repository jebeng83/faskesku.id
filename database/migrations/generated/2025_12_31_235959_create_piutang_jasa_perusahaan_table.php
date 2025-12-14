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
        if (! Schema::hasTable('piutang_jasa_perusahaan')) {
            Schema::create('piutang_jasa_perusahaan', function (Blueprint $table) {
                $table->string('no_piutang', 20)->primary();
                $table->date('tgl_piutang')->nullable();
                $table->date('jatuh_tempo')->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
                $table->string('kode_perusahaan', 8)->nullable()->index('kode_perusahaan');
                $table->string('keterangan', 100)->nullable();
                $table->double('grand_total');
                $table->double('persen_jasa_menejemen');
                $table->double('jasa_menejemen');
                $table->double('dpp_lain');
                $table->double('persen_ppn')->nullable();
                $table->double('ppn')->nullable();
                $table->double('persen_pph')->nullable();
                $table->double('pph')->nullable();
                $table->double('totalpiutang')->nullable();
                $table->double('sisapiutang');
                $table->enum('status', ['Sudah Lunas', 'Belum Lunas'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('piutang_jasa_perusahaan');
    }
};
