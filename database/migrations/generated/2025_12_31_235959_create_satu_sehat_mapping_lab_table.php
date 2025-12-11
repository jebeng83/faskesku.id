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
        if (!Schema::hasTable('satu_sehat_mapping_lab')) {
            Schema::create('satu_sehat_mapping_lab', function (Blueprint $table) {
                $table->integer('id_template')->primary();
                $table->string('code', 15)->nullable();
                $table->string('system', 100);
                $table->string('display', 80)->nullable();
                $table->string('sampel_code', 15);
                $table->string('sampel_system', 100);
                $table->string('sampel_display', 80);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_mapping_lab');
    }
};
