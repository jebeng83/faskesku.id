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
        if (!Schema::hasTable('jurnal')) {
            Schema::create('jurnal', function (Blueprint $table) {
                $table->string('no_jurnal', 20)->index('no_jurnal');
                $table->string('no_bukti', 30)->nullable()->index('no_bukti');
                $table->date('tgl_jurnal')->nullable()->index('tgl_jurnal');
                $table->time('jam_jurnal');
                $table->enum('jenis', ['U', 'P'])->nullable()->index('jenis');
                $table->string('keterangan', 350)->nullable()->index('keterangan');

                $table->primary(['no_jurnal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jurnal');
    }
};
