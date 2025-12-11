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
        if (!Schema::hasTable('master_triase_macam_kasus')) {
            Schema::create('master_triase_macam_kasus', function (Blueprint $table) {
                $table->string('kode_kasus', 3)->primary();
                $table->string('macam_kasus', 150);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_triase_macam_kasus');
    }
};
