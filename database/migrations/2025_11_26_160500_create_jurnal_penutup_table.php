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
        if (Schema::hasTable('jurnal_penutup')) {
            return;
        }
        Schema::create('jurnal_penutup', function (Blueprint $table) {
            $table->string('no_jurnal', 30)->primary();
            $table->enum('period', ['year', 'month', 'day']);
            $table->integer('year');
            $table->unsignedTinyInteger('month')->nullable();
            $table->date('cutoff_date')->nullable();
            $table->string('ikhtisar_kd_rek', 20);
            $table->string('modal_kd_rek', 20);
            $table->decimal('net', 20, 2)->default(0);
            $table->timestamps();

            // Index untuk performa query, tanpa foreign key karena migrasi dijalankan hanya untuk tabel tertentu
            $table->index('no_jurnal');
            $table->index('ikhtisar_kd_rek');
            $table->index('modal_kd_rek');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jurnal_penutup');
    }
};
