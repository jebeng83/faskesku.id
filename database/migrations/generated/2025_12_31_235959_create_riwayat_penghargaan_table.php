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
        if (!Schema::hasTable('riwayat_penghargaan')) {
            Schema::create('riwayat_penghargaan', function (Blueprint $table) {
                $table->integer('id');
                $table->string('jenis', 30);
                $table->string('nama_penghargaan', 60);
                $table->date('tanggal');
                $table->string('instansi', 40);
                $table->string('pejabat_pemberi', 40);
                $table->string('berkas', 500)->nullable();

                $table->primary(['id', 'nama_penghargaan', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_penghargaan');
    }
};
