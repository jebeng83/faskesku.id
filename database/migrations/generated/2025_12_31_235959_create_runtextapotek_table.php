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
        if (!Schema::hasTable('runtextapotek')) {
            Schema::create('runtextapotek', function (Blueprint $table) {
                $table->text('teks');
                $table->enum('aktifkan', ['Yes', 'No']);
                $table->binary('gambar');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('runtextapotek');
    }
};
