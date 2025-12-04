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
        if (Schema::hasTable('inacbg_data_terkirim2')) {
            Schema::table('inacbg_data_terkirim2', function (Blueprint $table) {
                $table->foreign(['no_sep'], 'inacbg_data_terkirim2_ibfk_1')->references(['no_sep'])->on('inacbg_klaim_baru2')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inacbg_data_terkirim2')) {
            Schema::table('inacbg_data_terkirim2', function (Blueprint $table) {
                $table->dropForeign('inacbg_data_terkirim2_ibfk_1');
            });
        }
    }
};
