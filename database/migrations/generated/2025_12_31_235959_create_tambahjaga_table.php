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
        if (!Schema::hasTable('tambahjaga')) {
            Schema::create('tambahjaga', function (Blueprint $table) {
                $table->date('tgl');
                $table->integer('id')->index('id');
                $table->integer('jml');

                $table->primary(['tgl', 'id']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tambahjaga');
    }
};
