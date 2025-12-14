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
        if (! Schema::hasTable('satu_sehat_mapping_obat')) {
            Schema::create('satu_sehat_mapping_obat', function (Blueprint $table) {
                $table->string('kode_brng', 15)->primary();
                $table->string('obat_code', 15)->nullable();
                $table->string('obat_system', 100);
                $table->string('obat_display', 80)->nullable();
                $table->string('form_code', 30)->nullable();
                $table->string('form_system', 100)->nullable();
                $table->string('form_display', 80)->nullable();
                $table->string('numerator_code', 15)->nullable();
                $table->string('numerator_system', 80)->nullable();
                $table->string('denominator_code', 15)->nullable();
                $table->string('denominator_system', 80)->nullable();
                $table->string('route_code', 30)->nullable();
                $table->string('route_system', 100)->nullable();
                $table->string('route_display', 80)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_mapping_obat');
    }
};
