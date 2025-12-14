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
        if (! Schema::hasTable('jurnal_penutup')) {
            Schema::create('jurnal_penutup', function (Blueprint $table) {
                $table->string('no_jurnal', 30)->primary();
                $table->enum('period', ['year', 'month', 'day']);
                $table->integer('year');
                $table->unsignedTinyInteger('month')->nullable();
                $table->date('cutoff_date')->nullable();
                $table->string('ikhtisar_kd_rek', 20);
                $table->string('modal_kd_rek', 20);
                $table->decimal('net', 20)->default(0);
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jurnal_penutup');
    }
};
