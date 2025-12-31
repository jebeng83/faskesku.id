<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('antriloket')) {
            Schema::create('antriloket', function (Blueprint $table) {
                $table->id();
                $table->unsignedInteger('nomor');
                $table->string('prefix', 2)->nullable();
                $table->date('tanggal');
                $table->enum('status', ['baru', 'dicetak', 'dipanggil', 'batal'])->default('baru');
                $table->enum('asal', ['kiosk', 'loket'])->default('kiosk');
                $table->unsignedInteger('loket')->nullable();
                $table->char('kode_tiket', 8)->nullable()->unique();
                $table->string('dibuat_oleh', 20)->nullable();
                $table->timestamp('dicetak_pada')->nullable();
                $table->timestamp('dipanggil_pada')->nullable();
                $table->timestamp('dibatalkan_pada')->nullable();
                $table->timestamps();

                $table->unique(['tanggal', 'prefix', 'nomor'], 'uq_harian');
                $table->index('status');
                $table->index('asal');
                $table->index('loket');
                $table->index('created_at');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('antriloket');
    }
};
