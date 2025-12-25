<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('poli_voice_mappings', function (Blueprint $table) {
            $table->id();
            $table->string('kd_poli', 5)->unique();
            $table->string('nm_poli', 100)->nullable();
            $table->string('file_path', 255);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('poli_voice_mappings');
    }
};

