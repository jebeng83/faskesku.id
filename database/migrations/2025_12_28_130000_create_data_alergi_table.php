<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('data_alergi')) {
            Schema::create('data_alergi', function (Blueprint $table) {
                $table->string('kd_alergi', 5);
                $table->string('nm_alergi', 100);
                $table->unsignedInteger('kode_jenis');

                $table->primary('kd_alergi');
                $table->index('kode_jenis');
                $table->foreign('kode_jenis')->references('kode_jenis')->on('jenis_alergi');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('data_alergi');
    }
};
