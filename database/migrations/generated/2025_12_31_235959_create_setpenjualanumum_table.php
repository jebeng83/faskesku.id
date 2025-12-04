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
        if (!Schema::hasTable('setpenjualanumum')) {
            Schema::create('setpenjualanumum', function (Blueprint $table) {
                $table->double('ralan')->nullable();
                $table->double('kelas1')->nullable();
                $table->double('kelas2')->nullable();
                $table->double('kelas3')->nullable();
                $table->double('utama')->nullable();
                $table->double('vip')->nullable();
                $table->double('vvip')->nullable();
                $table->double('beliluar')->nullable();
                $table->double('jualbebas')->nullable();
                $table->double('karyawan')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setpenjualanumum');
    }
};
