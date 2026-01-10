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
        if (! Schema::hasTable('wa_libur')) {
            Schema::create('wa_libur', function (Blueprint $table) {
                $table->increments('libur_id');
                $table->date('libur_tanggal')->nullable();
                $table->string('libur_keterangan', 100)->nullable();
                $table->string('libur_active', 1)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wa_libur');
    }
};

