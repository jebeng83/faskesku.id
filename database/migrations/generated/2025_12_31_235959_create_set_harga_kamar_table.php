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
        if (! Schema::hasTable('set_harga_kamar')) {
            Schema::create('set_harga_kamar', function (Blueprint $table) {
                $table->string('kd_kamar', 15);
                $table->char('kd_pj', 3)->index('kd_pj');
                $table->double('tarif')->index('tarif');

                $table->primary(['kd_kamar', 'kd_pj']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_harga_kamar');
    }
};
