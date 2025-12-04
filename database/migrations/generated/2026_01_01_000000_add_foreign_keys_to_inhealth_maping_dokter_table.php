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
        if (Schema::hasTable('inhealth_maping_dokter')) {
            Schema::table('inhealth_maping_dokter', function (Blueprint $table) {
                $table->foreign(['kd_dokter'], 'inhealth_maping_dokter_ibfk_1')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inhealth_maping_dokter')) {
            Schema::table('inhealth_maping_dokter', function (Blueprint $table) {
                $table->dropForeign('inhealth_maping_dokter_ibfk_1');
            });
        }
    }
};
