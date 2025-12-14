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
        if (! Schema::hasTable('antrilayanankedokteranfisikrehabilitasi')) {
            Schema::create('antrilayanankedokteranfisikrehabilitasi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antrilayanankedokteranfisikrehabilitasi');
    }
};
