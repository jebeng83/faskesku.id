<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('odontogram')) {
            Schema::create('odontogram', function (Blueprint $table) {
                $table->integer('id', true);
                $table->string('no_rawat', 17);
                $table->string('no_rkm_medis', 15);
                $table->integer('elemen_gigi');
                $table->integer('id_kondisi_gigi');
                $table->string('kd_penyakit', 15);
                $table->string('kd_jns_prw', 15);
                $table->enum('status', ['0', '1']);
                $table->unique(['no_rkm_medis', 'elemen_gigi'], 'uniq_odontogram_rm_elemen');
                $table->index('no_rawat', 'idx_odontogram_no_rawat');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('odontogram');
    }
};
