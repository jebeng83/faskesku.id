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
        if (!Schema::hasTable('utd_penyerahan_darah_detail')) {
            Schema::create('utd_penyerahan_darah_detail', function (Blueprint $table) {
                $table->string('no_penyerahan', 17)->default('');
                $table->string('no_kantong', 20)->default('')->index('no_kantong');
                $table->double('jasa_sarana')->nullable();
                $table->double('paket_bhp')->nullable();
                $table->double('kso')->nullable();
                $table->double('manajemen')->nullable();
                $table->double('total')->nullable();

                $table->primary(['no_penyerahan', 'no_kantong']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utd_penyerahan_darah_detail');
    }
};
