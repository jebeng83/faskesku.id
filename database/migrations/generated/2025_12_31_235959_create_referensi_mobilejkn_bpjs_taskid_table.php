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
        if (!Schema::hasTable('referensi_mobilejkn_bpjs_taskid')) {
            Schema::create('referensi_mobilejkn_bpjs_taskid', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->enum('taskid', ['1', '2', '3', '4', '5', '6', '7', '99']);
                $table->dateTime('waktu')->nullable();

                $table->primary(['no_rawat', 'taskid']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referensi_mobilejkn_bpjs_taskid');
    }
};
