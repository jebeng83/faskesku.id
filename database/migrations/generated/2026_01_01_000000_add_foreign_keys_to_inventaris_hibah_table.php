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
        if (Schema::hasTable('inventaris_hibah')) {
            Schema::table('inventaris_hibah', function (Blueprint $table) {
                $table->foreign(['kode_pemberi'], 'inventaris_hibah_ibfk_1')->references(['kode_pemberi'])->on('pemberihibah')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'inventaris_hibah_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek_aset'], 'inventaris_hibah_ibfk_3')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inventaris_hibah')) {
            Schema::table('inventaris_hibah', function (Blueprint $table) {
                $table->dropForeign('inventaris_hibah_ibfk_1');
                $table->dropForeign('inventaris_hibah_ibfk_2');
                $table->dropForeign('inventaris_hibah_ibfk_3');
            });
        }
    }
};
