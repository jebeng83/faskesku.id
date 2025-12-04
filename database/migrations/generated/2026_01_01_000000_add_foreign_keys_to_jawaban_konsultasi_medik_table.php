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
        if (Schema::hasTable('jawaban_konsultasi_medik')) {
            Schema::table('jawaban_konsultasi_medik', function (Blueprint $table) {
                $table->foreign(['no_permintaan'], 'jawaban_konsultasi_medik_ibfk_1')->references(['no_permintaan'])->on('konsultasi_medik')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('jawaban_konsultasi_medik')) {
            Schema::table('jawaban_konsultasi_medik', function (Blueprint $table) {
                $table->dropForeign('jawaban_konsultasi_medik_ibfk_1');
            });
        }
    }
};
