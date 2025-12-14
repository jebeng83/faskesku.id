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
        if (! Schema::hasTable('satu_sehat_medication')) {
            Schema::create('satu_sehat_medication', function (Blueprint $table) {
                $table->string('kode_brng', 15)->primary();
                $table->string('id_medication', 40)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_medication');
    }
};
