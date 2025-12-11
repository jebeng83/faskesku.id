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
        if (Schema::hasTable('parkir')) {
            Schema::table('parkir', function (Blueprint $table) {
                $table->foreign(['nip'], 'parkir_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_parkir'], 'parkir_ibfk_2')->references(['kd_parkir'])->on('parkir_jenis')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('parkir')) {
            Schema::table('parkir', function (Blueprint $table) {
                $table->dropForeign('parkir_ibfk_1');
                $table->dropForeign('parkir_ibfk_2');
            });
        }
    }
};
