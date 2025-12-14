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
        if (! Schema::hasTable('tokoopname')) {
            Schema::create('tokoopname', function (Blueprint $table) {
                $table->string('kode_brng', 40)->index('kode_brng');
                $table->double('dasar')->nullable();
                $table->date('tanggal');
                $table->integer('stok')->index('stok');
                $table->integer('real')->index('real');
                $table->integer('selisih')->index('selisih');
                $table->double('nomihilang')->index('nomihilang');
                $table->string('keterangan', 60)->index('keterangan');

                $table->primary(['kode_brng', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tokoopname');
    }
};
