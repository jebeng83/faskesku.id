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
        if (! Schema::hasTable('beri_bhp_radiologi')) {
            Schema::create('beri_bhp_radiologi', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_periksa')->index('tgl_periksa');
                $table->time('jam')->index('jam');
                $table->string('kode_brng', 15)->index('kode_brng');
                $table->char('kode_sat', 4)->index('kode_sat');
                $table->double('jumlah')->index('jumlah');
                $table->double('harga')->nullable();
                $table->double('total')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beri_bhp_radiologi');
    }
};
