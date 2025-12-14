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
        if (! Schema::hasTable('set_akun_bankjabar')) {
            Schema::create('set_akun_bankjabar', function (Blueprint $table) {
                $table->string('kd_rek', 15)->index('kd_rek');
                $table->string('kode_bank', 3)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_akun_bankjabar');
    }
};
