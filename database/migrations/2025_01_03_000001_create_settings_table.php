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
        Schema::create('setting', function (Blueprint $table) {
            $table->string('nama_instansi', 60)->primary();
            $table->string('alamat_instansi', 150)->nullable();
            $table->string('kabupaten', 30)->nullable();
            $table->string('propinsi', 30)->nullable();
            $table->string('kontak', 50);
            $table->string('email', 50);
            $table->enum('aktifkan', ['Yes', 'No'])->default('No');
            $table->string('kode_ppk', 15)->nullable();
            $table->string('kode_ppkinhealth', 15)->nullable();
            $table->string('kode_ppkkemenkes', 15)->nullable();
            $table->mediumText('wallpaper')->nullable();
            $table->mediumText('logo')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setting');
    }
};