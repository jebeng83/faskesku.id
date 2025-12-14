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
        if (! Schema::hasTable('setoran_bank')) {
            Schema::create('setoran_bank', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->date('tgl_setor');
                $table->string('no_bukti', 30)->nullable();
                $table->string('keterangan', 350)->nullable();
                $table->string('kd_rek_kas', 50)->index();
                $table->string('kd_rek_bank', 50)->index();
                $table->decimal('nominal', 15);
                $table->string('no_jurnal', 50)->nullable()->index();
                $table->timestamp('posted_at')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setoran_bank');
    }
};
