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
        if (Schema::hasTable('hibah_obat_bhp')) {
            Schema::table('hibah_obat_bhp', function (Blueprint $table) {
                $table->foreign(['kode_pemberi'], 'hibah_obat_bhp_ibfk_1')->references(['kode_pemberi'])->on('pemberihibah')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'hibah_obat_bhp_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_bangsal'], 'hibah_obat_bhp_ibfk_3')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('hibah_obat_bhp')) {
            Schema::table('hibah_obat_bhp', function (Blueprint $table) {
                $table->dropForeign('hibah_obat_bhp_ibfk_1');
                $table->dropForeign('hibah_obat_bhp_ibfk_2');
                $table->dropForeign('hibah_obat_bhp_ibfk_3');
            });
        }
    }
};
