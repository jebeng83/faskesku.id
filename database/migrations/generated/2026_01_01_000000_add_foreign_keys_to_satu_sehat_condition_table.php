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
        if (Schema::hasTable('satu_sehat_condition')) {
            Schema::table('satu_sehat_condition', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'satu_sehat_condition_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_penyakit'], 'satu_sehat_condition_ibfk_2')->references(['kd_penyakit'])->on('penyakit')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('satu_sehat_condition')) {
            Schema::table('satu_sehat_condition', function (Blueprint $table) {
                $table->dropForeign('satu_sehat_condition_ibfk_1');
                $table->dropForeign('satu_sehat_condition_ibfk_2');
            });
        }
    }
};
