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
        if (Schema::hasTable('returjual')) {
            Schema::table('returjual', function (Blueprint $table) {
                $table->foreign(['nip'], 'returjual_ibfk_6')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rkm_medis'], 'returjual_ibfk_7')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_bangsal'], 'returjual_ibfk_8')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('returjual')) {
            Schema::table('returjual', function (Blueprint $table) {
                $table->dropForeign('returjual_ibfk_6');
                $table->dropForeign('returjual_ibfk_7');
                $table->dropForeign('returjual_ibfk_8');
            });
        }
    }
};
