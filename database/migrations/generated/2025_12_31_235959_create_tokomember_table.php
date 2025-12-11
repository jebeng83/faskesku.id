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
        if (!Schema::hasTable('tokomember')) {
            Schema::create('tokomember', function (Blueprint $table) {
                $table->string('no_member', 10)->primary();
                $table->string('nama', 50)->nullable();
                $table->enum('jk', ['L', 'P'])->nullable();
                $table->string('tmp_lahir', 20)->nullable();
                $table->date('tgl_lahir')->nullable();
                $table->string('alamat', 60)->nullable();
                $table->string('no_telp', 40)->nullable();
                $table->string('email', 60)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tokomember');
    }
};
