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
        if (! Schema::hasTable('jumpasien')) {
            Schema::create('jumpasien', function (Blueprint $table) {
                $table->year('thn');
                $table->integer('bln');
                $table->integer('id')->index('id');
                $table->integer('jml')->index('jml');

                $table->primary(['thn', 'bln', 'id']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jumpasien');
    }
};
