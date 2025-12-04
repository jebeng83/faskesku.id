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
        if (!Schema::hasTable('satu_sehat_observationttvrespirasi')) {
            Schema::create('satu_sehat_observationttvrespirasi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->enum('status', ['Ralan', 'Ranap']);
                $table->string('id_observation', 40)->nullable();

                $table->primary(['no_rawat', 'tgl_perawatan', 'jam_rawat', 'status']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_observationttvrespirasi');
    }
};
