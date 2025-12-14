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
        if (! Schema::hasTable('catatan_keperawatan_ranap')) {
            Schema::create('catatan_keperawatan_ranap', function (Blueprint $table) {
                $table->date('tanggal');
                $table->time('jam');
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('uraian', 1000)->nullable();
                $table->string('nip', 20)->index('nip');

                $table->primary(['tanggal', 'jam', 'no_rawat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_keperawatan_ranap');
    }
};
