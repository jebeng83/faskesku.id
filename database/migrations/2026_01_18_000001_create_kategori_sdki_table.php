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
        if (! Schema::hasTable('kategori_sdki')) {
            Schema::create('kategori_sdki', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('kode', 30)->nullable();
                $table->string('nama', 255)->nullable();
                $table->string('label', 255)->nullable();
                $table->string('slug', 255)->nullable();
                $table->string('kategori', 100)->nullable();
                $table->timestamps();

                $table->unique('kode');
                $table->unique('slug');
                $table->index('nama');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('kategori_sdki')) {
            Schema::dropIfExists('kategori_sdki');
        }
    }
};

