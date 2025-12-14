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
        if (! Schema::hasTable('utd_penggunaan_penunjang_pemisahan_komponen')) {
            Schema::create('utd_penggunaan_penunjang_pemisahan_komponen', function (Blueprint $table) {
                $table->string('no_donor', 15)->default('');
                $table->string('kode_brng', 15)->default('')->index('kode_brng');
                $table->double('jml')->nullable();
                $table->double('harga')->nullable();
                $table->double('total')->nullable();

                $table->primary(['no_donor', 'kode_brng']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utd_penggunaan_penunjang_pemisahan_komponen');
    }
};
