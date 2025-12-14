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
        if (! Schema::hasTable('satu_sehat_mapping_vaksin')) {
            Schema::create('satu_sehat_mapping_vaksin', function (Blueprint $table) {
                $table->string('kode_brng', 15)->primary();
                $table->string('vaksin_code', 15)->nullable();
                $table->string('vaksin_system', 100);
                $table->string('vaksin_display', 80)->nullable();
                $table->string('route_code', 30)->nullable();
                $table->string('route_system', 100)->nullable();
                $table->string('route_display', 80)->nullable();
                $table->string('dose_quantity_code', 15)->nullable();
                $table->string('dose_quantity_system', 80)->nullable();
                $table->string('dose_quantity_unit', 15)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_mapping_vaksin');
    }
};
