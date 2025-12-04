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
        if (Schema::hasTable('piutang_jasa_perusahaan')) {
            Schema::table('piutang_jasa_perusahaan', function (Blueprint $table) {
                $table->foreign(['kode_perusahaan'], 'piutang_jasa_perusahaan_ibfk_1')->references(['kode_perusahaan'])->on('perusahaan_pasien')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'piutang_jasa_perusahaan_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('piutang_jasa_perusahaan')) {
            Schema::table('piutang_jasa_perusahaan', function (Blueprint $table) {
                $table->dropForeign('piutang_jasa_perusahaan_ibfk_1');
                $table->dropForeign('piutang_jasa_perusahaan_ibfk_2');
            });
        }
    }
};
