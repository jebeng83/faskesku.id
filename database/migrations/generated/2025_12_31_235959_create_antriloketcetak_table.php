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
        if (! Schema::hasTable('antriloketcetak')) {
            Schema::create('antriloketcetak', function (Blueprint $table) {
                $table->date('tanggal');
                $table->time('jam')->nullable();
                $table->string('nomor', 4);

                $table->primary(['tanggal', 'nomor']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antriloketcetak');
    }
};
