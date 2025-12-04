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
        if (!Schema::hasTable('cacat_fisik')) {
            Schema::create('cacat_fisik', function (Blueprint $table) {
                $table->integer('id', true);
                $table->string('nama_cacat', 30)->unique('nama_cacat');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cacat_fisik');
    }
};
