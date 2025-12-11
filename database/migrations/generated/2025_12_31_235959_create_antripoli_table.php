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
        if (!Schema::hasTable('antripoli')) {
            Schema::create('antripoli', function (Blueprint $table) {
                $table->string('kd_dokter', 20)->nullable();
                $table->char('kd_poli', 5)->nullable();
                $table->enum('status', ['0', '1'])->nullable();
                $table->string('no_rawat', 17);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antripoli');
    }
};
