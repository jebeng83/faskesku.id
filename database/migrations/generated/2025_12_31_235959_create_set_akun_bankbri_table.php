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
        if (! Schema::hasTable('set_akun_bankbri')) {
            Schema::create('set_akun_bankbri', function (Blueprint $table) {
                $table->string('kd_rek', 15)->primary();
                $table->string('consumer_key', 700)->nullable();
                $table->string('consumer_secret', 700)->nullable();
                $table->string('institution_code', 700)->nullable();
                $table->string('briva_no', 700)->nullable();
                $table->string('urlapi', 700);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_akun_bankbri');
    }
};
