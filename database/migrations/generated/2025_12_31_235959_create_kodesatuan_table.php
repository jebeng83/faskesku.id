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
        if (!Schema::hasTable('kodesatuan')) {
            Schema::create('kodesatuan', function (Blueprint $table) {
                $table->char('kode_sat', 4)->primary();
                $table->string('satuan', 30)->nullable()->index('satuan');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kodesatuan');
    }
};
