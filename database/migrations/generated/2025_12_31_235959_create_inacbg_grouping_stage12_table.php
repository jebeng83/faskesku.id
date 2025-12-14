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
        if (! Schema::hasTable('inacbg_grouping_stage12')) {
            Schema::create('inacbg_grouping_stage12', function (Blueprint $table) {
                $table->string('no_sep', 40)->primary();
                $table->string('code_cbg', 10)->nullable();
                $table->string('deskripsi', 200)->nullable();
                $table->double('tarif')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inacbg_grouping_stage12');
    }
};
