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
        if (Schema::hasTable('temporary_surveilens_penyakit')) {
            Schema::table('temporary_surveilens_penyakit', function (Blueprint $table) {
                $table->foreign(['kd_penyakit'], 'temporary_surveilens_penyakit_ibfk_1')->references(['kd_penyakit'])->on('penyakit')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_penyakit2'], 'temporary_surveilens_penyakit_ibfk_2')->references(['kd_penyakit'])->on('penyakit')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('temporary_surveilens_penyakit')) {
            Schema::table('temporary_surveilens_penyakit', function (Blueprint $table) {
                $table->dropForeign('temporary_surveilens_penyakit_ibfk_1');
                $table->dropForeign('temporary_surveilens_penyakit_ibfk_2');
            });
        }
    }
};
