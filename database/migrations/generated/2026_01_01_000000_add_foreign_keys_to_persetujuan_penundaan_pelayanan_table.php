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
        if (Schema::hasTable('persetujuan_penundaan_pelayanan')) {
            Schema::table('persetujuan_penundaan_pelayanan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'persetujuan_penundaan_pelayanan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'persetujuan_penundaan_pelayanan_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'persetujuan_penundaan_pelayanan_ibfk_3')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('persetujuan_penundaan_pelayanan')) {
            Schema::table('persetujuan_penundaan_pelayanan', function (Blueprint $table) {
                $table->dropForeign('persetujuan_penundaan_pelayanan_ibfk_1');
                $table->dropForeign('persetujuan_penundaan_pelayanan_ibfk_2');
                $table->dropForeign('persetujuan_penundaan_pelayanan_ibfk_3');
            });
        }
    }
};
