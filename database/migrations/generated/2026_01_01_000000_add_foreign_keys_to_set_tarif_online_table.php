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
        if (Schema::hasTable('set_tarif_online')) {
            Schema::table('set_tarif_online', function (Blueprint $table) {
                $table->foreign(['kd_jenis_prw'], 'set_tarif_online_ibfk_1')->references(['kd_jenis_prw'])->on('jns_perawatan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('set_tarif_online')) {
            Schema::table('set_tarif_online', function (Blueprint $table) {
                $table->dropForeign('set_tarif_online_ibfk_1');
            });
        }
    }
};
