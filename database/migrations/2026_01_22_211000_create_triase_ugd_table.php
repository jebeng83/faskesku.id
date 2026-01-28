<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('triase_ugd')) {
            Schema::create('triase_ugd', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15);
                $table->string('no_rawat', 17);
                $table->date('tanggal');
                $table->time('jam');
                $table->string('kategori', 8);
                $table->text('indikator')->nullable();
                $table->string('keputusan', 20);
                $table->string('catatan', 200)->nullable();
                $table->unique('no_rawat');
                $table->primary(['no_rkm_medis', 'tanggal']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('triase_ugd');
    }
};
