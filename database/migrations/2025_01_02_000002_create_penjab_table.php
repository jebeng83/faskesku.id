<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if (! Schema::hasTable('penjab')) {
            Schema::create('penjab', function (Blueprint $table) {
                $table->char('kd_pj', 3)->primary();
                $table->string('png_jawab', 50);
                $table->string('nama_perusahaan', 100);
                $table->string('alamat_perusahaan', 200);
                $table->string('no_telp', 40);
                $table->string('attn', 50);
                $table->enum('status', ['0', '1'])->default('1');
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('penjab');
    }
};
