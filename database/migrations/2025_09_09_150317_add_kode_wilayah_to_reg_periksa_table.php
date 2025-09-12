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
        Schema::table('reg_periksa', function (Blueprint $table) {
            $table->string('kode_wilayah', 13)->after('kd_poli')->nullable();
            $table->foreign('kode_wilayah')->references('kode')->on('wilayah');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reg_periksa', function (Blueprint $table) {
            $table->dropForeign(['kode_wilayah']);
            $table->dropColumn('kode_wilayah');
        });
    }
};
