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
        if (! Schema::hasTable('set_otomatis_tindakan_ralan_petugas')) {
            Schema::create('set_otomatis_tindakan_ralan_petugas', function (Blueprint $table) {
                $table->string('kd_jenis_prw', 15);
                $table->char('kd_pj', 3)->index('kd_pj');

                $table->primary(['kd_jenis_prw', 'kd_pj']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_otomatis_tindakan_ralan_petugas');
    }
};
