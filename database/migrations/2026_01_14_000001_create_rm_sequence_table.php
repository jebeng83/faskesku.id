<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('rm_sequence')) {
            Schema::create('rm_sequence', function (Blueprint $table) {
                $table->string('key', 32)->primary();
                $table->unsignedInteger('last_number');
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('rm_sequence');
    }
};

