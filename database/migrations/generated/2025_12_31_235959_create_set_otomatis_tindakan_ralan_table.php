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
        if (! Schema::hasTable('set_otomatis_tindakan_ralan')) {
            Schema::create('set_otomatis_tindakan_ralan', function (Blueprint $table) {
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('kd_jenis_prw', 15)->index('kd_jenis_prw');
                $table->char('kd_pj', 3)->default('')->index('kd_pj');

                $table->primary(['kd_dokter', 'kd_jenis_prw', 'kd_pj']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_otomatis_tindakan_ralan');
    }
};
