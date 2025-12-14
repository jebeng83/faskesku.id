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
        if (! Schema::hasTable('set_validasi_catatan')) {
            Schema::create('set_validasi_catatan', function (Blueprint $table) {
                $table->enum('tampilkan_catatan', ['Yes', 'No'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_validasi_catatan');
    }
};
