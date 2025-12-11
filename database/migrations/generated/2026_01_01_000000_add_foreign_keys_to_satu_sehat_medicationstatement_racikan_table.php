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
        if (Schema::hasTable('satu_sehat_medicationstatement_racikan')) {
            Schema::table('satu_sehat_medicationstatement_racikan', function (Blueprint $table) {
                $table->foreign(['no_resep'], 'satu_sehat_medicationstatement_racikan_ibfk_1')->references(['no_resep'])->on('resep_obat')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'satu_sehat_medicationstatement_racikan_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('satu_sehat_medicationstatement_racikan')) {
            Schema::table('satu_sehat_medicationstatement_racikan', function (Blueprint $table) {
                $table->dropForeign('satu_sehat_medicationstatement_racikan_ibfk_1');
                $table->dropForeign('satu_sehat_medicationstatement_racikan_ibfk_2');
            });
        }
    }
};
