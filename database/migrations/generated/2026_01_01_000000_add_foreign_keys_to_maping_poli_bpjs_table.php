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
        if (Schema::hasTable('maping_poli_bpjs')) {
            Schema::table('maping_poli_bpjs', function (Blueprint $table) {
                $table->foreign(['kd_poli_rs'], 'maping_poli_bpjs_ibfk_1')->references(['kd_poli'])->on('poliklinik')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('maping_poli_bpjs')) {
            Schema::table('maping_poli_bpjs', function (Blueprint $table) {
                $table->dropForeign('maping_poli_bpjs_ibfk_1');
            });
        }
    }
};
