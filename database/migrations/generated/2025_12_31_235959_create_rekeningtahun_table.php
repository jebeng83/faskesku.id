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
        if (!Schema::hasTable('rekeningtahun')) {
            Schema::create('rekeningtahun', function (Blueprint $table) {
                $table->year('thn');
                $table->string('kd_rek', 15)->default('')->index('kd_rek');
                $table->double('saldo_awal')->index('saldo_awal');

                $table->primary(['thn', 'kd_rek']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekeningtahun');
    }
};
