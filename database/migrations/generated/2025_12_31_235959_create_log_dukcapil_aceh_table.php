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
        if (!Schema::hasTable('log_dukcapil_aceh')) {
            Schema::create('log_dukcapil_aceh', function (Blueprint $table) {
                $table->string('no_ktp', 20);
                $table->dateTime('tanggal');
                $table->string('user', 30);

                $table->primary(['no_ktp', 'tanggal', 'user']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_dukcapil_aceh');
    }
};
