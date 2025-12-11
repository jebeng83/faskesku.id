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
        if (!Schema::hasTable('rawatjalan')) {
            Schema::create('rawatjalan', function (Blueprint $table) {
                $table->dateTime('tgl');
                $table->integer('id')->index('id');
                $table->integer('tnd')->index('tnd');
                $table->double('jm');
                $table->string('nm_pasien', 30);
                $table->string('kamar', 20);
                $table->string('diagnosa', 50);
                $table->integer('jmlh');

                $table->primary(['tgl', 'id', 'tnd']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rawatjalan');
    }
};
