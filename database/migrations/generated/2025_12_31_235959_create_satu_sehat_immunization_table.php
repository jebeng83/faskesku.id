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
        if (!Schema::hasTable('satu_sehat_immunization')) {
            Schema::create('satu_sehat_immunization', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->date('tgl_perawatan');
                $table->time('jam');
                $table->string('kode_brng', 15)->index('kode_brng');
                $table->string('no_batch', 20);
                $table->string('no_faktur', 20);
                $table->string('id_immunization', 40)->nullable();

                $table->primary(['no_rawat', 'tgl_perawatan', 'jam', 'kode_brng', 'no_batch', 'no_faktur']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_immunization');
    }
};
