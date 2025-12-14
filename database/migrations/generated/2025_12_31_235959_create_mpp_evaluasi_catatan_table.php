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
        if (! Schema::hasTable('mpp_evaluasi_catatan')) {
            Schema::create('mpp_evaluasi_catatan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->dateTime('tgl_implementasi');
                $table->string('masalah', 500)->nullable();
                $table->string('tinjut', 500)->nullable();
                $table->string('evaluasi', 500)->nullable();
                $table->string('nip', 20)->index('nip');

                $table->primary(['no_rawat', 'tgl_implementasi']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mpp_evaluasi_catatan');
    }
};
