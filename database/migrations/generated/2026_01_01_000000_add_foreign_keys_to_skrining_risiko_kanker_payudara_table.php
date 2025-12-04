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
        if (Schema::hasTable('skrining_risiko_kanker_payudara')) {
            Schema::table('skrining_risiko_kanker_payudara', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'skrining_risiko_kanker_payudara_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'skrining_risiko_kanker_payudara_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('skrining_risiko_kanker_payudara')) {
            Schema::table('skrining_risiko_kanker_payudara', function (Blueprint $table) {
                $table->dropForeign('skrining_risiko_kanker_payudara_ibfk_1');
                $table->dropForeign('skrining_risiko_kanker_payudara_ibfk_2');
            });
        }
    }
};
