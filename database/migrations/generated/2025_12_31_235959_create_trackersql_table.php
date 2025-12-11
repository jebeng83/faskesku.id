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
        if (!Schema::hasTable('trackersql')) {
            Schema::create('trackersql', function (Blueprint $table) {
                $table->dateTime('tanggal');
                $table->text('sqle');
                $table->string('usere', 20);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trackersql');
    }
};
