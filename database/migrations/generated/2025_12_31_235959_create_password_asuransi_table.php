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
        if (!Schema::hasTable('password_asuransi')) {
            Schema::create('password_asuransi', function (Blueprint $table) {
                $table->char('kd_pj', 3)->primary();
                $table->string('usere', 700)->nullable();
                $table->string('passworde', 700)->nullable();

                $table->unique(['usere', 'passworde'], 'usere');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('password_asuransi');
    }
};
