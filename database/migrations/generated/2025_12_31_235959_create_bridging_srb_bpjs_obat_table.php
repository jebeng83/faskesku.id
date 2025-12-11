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
        if (!Schema::hasTable('bridging_srb_bpjs_obat')) {
            Schema::create('bridging_srb_bpjs_obat', function (Blueprint $table) {
                $table->string('no_sep', 40)->nullable()->index('no_sep');
                $table->string('no_srb', 10)->nullable();
                $table->string('kd_obat', 15)->nullable();
                $table->string('nm_obat', 80)->nullable();
                $table->double('jumlah')->nullable();
                $table->string('signa1', 30)->nullable();
                $table->string('signa2', 30)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bridging_srb_bpjs_obat');
    }
};
