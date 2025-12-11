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
        if (!Schema::hasTable('pangkat_polri')) {
            Schema::create('pangkat_polri', function (Blueprint $table) {
                $table->integer('id', true);
                $table->string('nama_pangkat', 30)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pangkat_polri');
    }
};
