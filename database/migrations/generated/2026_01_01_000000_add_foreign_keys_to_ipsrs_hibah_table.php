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
        if (Schema::hasTable('ipsrs_hibah')) {
            Schema::table('ipsrs_hibah', function (Blueprint $table) {
                $table->foreign(['kode_pemberi'], 'ipsrs_hibah_ibfk_1')->references(['kode_pemberi'])->on('pemberihibah')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'ipsrs_hibah_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ipsrs_hibah')) {
            Schema::table('ipsrs_hibah', function (Blueprint $table) {
                $table->dropForeign('ipsrs_hibah_ibfk_1');
                $table->dropForeign('ipsrs_hibah_ibfk_2');
            });
        }
    }
};
