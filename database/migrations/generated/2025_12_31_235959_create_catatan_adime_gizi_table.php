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
        if (!Schema::hasTable('catatan_adime_gizi')) {
            Schema::create('catatan_adime_gizi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('asesmen', 1000)->nullable();
                $table->string('diagnosis', 1000)->nullable();
                $table->string('intervensi', 1000)->nullable();
                $table->string('monitoring', 1000)->nullable();
                $table->string('evaluasi', 1000)->nullable();
                $table->string('instruksi', 1000)->nullable();
                $table->string('nip', 20)->nullable()->index('nip');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_adime_gizi');
    }
};
