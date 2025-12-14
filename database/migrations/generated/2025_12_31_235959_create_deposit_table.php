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
        if (! Schema::hasTable('deposit')) {
            Schema::create('deposit', function (Blueprint $table) {
                $table->string('no_deposit', 17)->primary();
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->dateTime('tgl_deposit');
                $table->string('nama_bayar', 50)->index('nama_bayar');
                $table->double('besarppn');
                $table->double('besar_deposit')->nullable()->index('besar_deposit');
                $table->string('nip', 20)->index('nip');
                $table->string('keterangan', 70);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deposit');
    }
};
