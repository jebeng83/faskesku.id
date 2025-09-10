<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('poliklinik', function (Blueprint $table) {
            $table->char('kd_poli', 5)->primary();
            $table->string('nm_poli', 50);
            $table->string('lantai', 3);
            $table->enum('status', ['0', '1'])->default('1');
        });
    }

    public function down()
    {
        Schema::dropIfExists('poliklinik');
    }
};
