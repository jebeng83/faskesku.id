<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('setoran_bank')) {
            Schema::create('setoran_bank', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->date('tgl_setor');
                $table->string('no_bukti', 30)->nullable();
                $table->string('keterangan', 350)->nullable();
                $table->string('kd_rek_kas', 50);
                $table->string('kd_rek_bank', 50);
                $table->decimal('nominal', 15, 2);
                $table->string('no_jurnal', 50)->nullable();
                $table->timestamp('posted_at')->nullable();
                $table->timestamps();

                $table->index('kd_rek_kas');
                $table->index('kd_rek_bank');
                $table->index('no_jurnal');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('setoran_bank');
    }
};
