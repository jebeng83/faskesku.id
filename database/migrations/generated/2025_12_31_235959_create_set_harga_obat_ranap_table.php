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
        if (!Schema::hasTable('set_harga_obat_ranap')) {
            Schema::create('set_harga_obat_ranap', function (Blueprint $table) {
                $table->char('kd_pj', 3);
                $table->enum('kelas', ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas Utama', 'Kelas VIP', 'Kelas VVIP'])->default('Kelas 1');
                $table->double('hargajual');

                $table->primary(['kd_pj', 'kelas']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_harga_obat_ranap');
    }
};
