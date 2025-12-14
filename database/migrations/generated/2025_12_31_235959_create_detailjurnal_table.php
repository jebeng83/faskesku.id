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
        if (! Schema::hasTable('detailjurnal')) {
            Schema::create('detailjurnal', function (Blueprint $table) {
                $table->string('no_jurnal', 20)->nullable()->index('no_jurnal');
                $table->string('kd_rek', 15)->nullable()->index('kd_rek');
                $table->double('debet')->nullable()->index('debet');
                $table->double('kredit')->nullable()->index('kredit');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detailjurnal');
    }
};
