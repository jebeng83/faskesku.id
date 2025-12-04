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
        if (!Schema::hasTable('bridging_rujukan_bpjs_khusus')) {
            Schema::create('bridging_rujukan_bpjs_khusus', function (Blueprint $table) {
                $table->string('no_rujukan', 40)->primary();
                $table->string('nokapst', 25)->nullable();
                $table->string('nmpst', 100)->nullable();
                $table->date('tglrujukan_awal')->nullable();
                $table->date('tglrujukan_berakhir')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bridging_rujukan_bpjs_khusus');
    }
};
