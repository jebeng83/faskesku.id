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
        if (! Schema::hasTable('bridging_rujukan_bpjs_khusus_prosedur')) {
            Schema::create('bridging_rujukan_bpjs_khusus_prosedur', function (Blueprint $table) {
                $table->string('no_rujukan', 40);
                $table->string('kode_prosedur', 10);
                $table->string('nama_prosedur', 400)->nullable();

                $table->primary(['no_rujukan', 'kode_prosedur']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bridging_rujukan_bpjs_khusus_prosedur');
    }
};
