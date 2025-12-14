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
        if (! Schema::hasTable('ketidakhadiran')) {
            Schema::create('ketidakhadiran', function (Blueprint $table) {
                $table->date('tgl');
                $table->integer('id')->index('id');
                $table->enum('jns', ['A', 'S', 'C', 'I']);
                $table->string('ktg', 40)->index('ktg');
                $table->integer('jml')->nullable()->index('jml');

                $table->primary(['tgl', 'id', 'jns']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ketidakhadiran');
    }
};
