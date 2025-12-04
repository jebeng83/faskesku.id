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
        if (Schema::hasTable('template_utd')) {
            Schema::table('template_utd', function (Blueprint $table) {
                $table->foreign(['kd_jenis_prw'], 'template_utd_ibfk_1')->references(['kd_jenis_prw'])->on('jns_perawatan_utd')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('template_utd')) {
            Schema::table('template_utd', function (Blueprint $table) {
                $table->dropForeign('template_utd_ibfk_1');
            });
        }
    }
};
