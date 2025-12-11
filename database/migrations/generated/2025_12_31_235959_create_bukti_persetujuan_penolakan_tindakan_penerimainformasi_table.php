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
        if (!Schema::hasTable('bukti_persetujuan_penolakan_tindakan_penerimainformasi')) {
            Schema::create('bukti_persetujuan_penolakan_tindakan_penerimainformasi', function (Blueprint $table) {
                $table->string('no_pernyataan', 20)->primary();
                $table->string('photo', 500)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bukti_persetujuan_penolakan_tindakan_penerimainformasi');
    }
};
