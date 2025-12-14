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
        if (! Schema::hasTable('pengumuman_epasien')) {
            Schema::create('pengumuman_epasien', function (Blueprint $table) {
                $table->string('nik', 20);
                $table->dateTime('tanggal');
                $table->string('pengumuman', 150)->nullable();

                $table->primary(['nik', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengumuman_epasien');
    }
};
