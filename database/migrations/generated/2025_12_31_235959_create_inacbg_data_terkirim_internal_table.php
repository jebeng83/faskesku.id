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
        if (!Schema::hasTable('inacbg_data_terkirim_internal')) {
            Schema::create('inacbg_data_terkirim_internal', function (Blueprint $table) {
                $table->string('no_sep', 40)->primary();
                $table->string('nik', 30)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inacbg_data_terkirim_internal');
    }
};
