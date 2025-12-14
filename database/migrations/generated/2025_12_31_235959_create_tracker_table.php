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
        if (! Schema::hasTable('tracker')) {
            Schema::create('tracker', function (Blueprint $table) {
                $table->string('nip', 20);
                $table->date('tgl_login');
                $table->time('jam_login');

                $table->primary(['nip', 'tgl_login', 'jam_login']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tracker');
    }
};
