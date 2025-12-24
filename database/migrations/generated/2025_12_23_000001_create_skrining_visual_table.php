<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('skrining_visual')) {
            Schema::create('skrining_visual', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15);
                $table->date('tanggal');
                $table->time('jam');
                $table->enum('hasil_skrining', ['Merah', 'Oranye', 'Kuning', 'Hijau']);
                $table->string('skrining_resiko_jatuh', 200);
                $table->char('skor_resiko_jatuh', 2);
                $table->enum('keputusan', ['Sesuai Antrian', 'Prioritas', 'UGD']);

                $table->primary(['no_rkm_medis', 'tanggal']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('skrining_visual');
    }
};
