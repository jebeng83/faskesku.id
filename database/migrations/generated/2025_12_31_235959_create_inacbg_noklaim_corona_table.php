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
        if (! Schema::hasTable('inacbg_noklaim_corona')) {
            Schema::create('inacbg_noklaim_corona', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->string('no_klaim', 40)->nullable()->unique('no_klaim');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inacbg_noklaim_corona');
    }
};
