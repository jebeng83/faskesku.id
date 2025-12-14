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
        if (! Schema::hasTable('closing_kasir')) {
            Schema::create('closing_kasir', function (Blueprint $table) {
                $table->enum('shift', ['Pagi', 'Siang', 'Sore', 'Malam'])->primary();
                $table->time('jam_masuk')->index('jam_masuk');
                $table->time('jam_pulang')->index('jam_pulang');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('closing_kasir');
    }
};
