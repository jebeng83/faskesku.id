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
        if (!Schema::hasTable('angsuran_koperasi')) {
            Schema::create('angsuran_koperasi', function (Blueprint $table) {
                $table->integer('id')->index('id');
                $table->date('tanggal_pinjam');
                $table->date('tanggal_angsur');
                $table->double('pokok')->index('pokok');
                $table->double('jasa')->index('jasa');

                $table->primary(['id', 'tanggal_pinjam', 'tanggal_angsur']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('angsuran_koperasi');
    }
};
