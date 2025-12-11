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
        if (Schema::hasTable('maping_dokter_dpjpvclaim')) {
            Schema::table('maping_dokter_dpjpvclaim', function (Blueprint $table) {
                $table->foreign(['kd_dokter'], 'maping_dokter_dpjpvclaim_ibfk_1')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('maping_dokter_dpjpvclaim')) {
            Schema::table('maping_dokter_dpjpvclaim', function (Blueprint $table) {
                $table->dropForeign('maping_dokter_dpjpvclaim_ibfk_1');
            });
        }
    }
};
