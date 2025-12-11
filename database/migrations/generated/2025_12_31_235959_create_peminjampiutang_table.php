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
        if (!Schema::hasTable('peminjampiutang')) {
            Schema::create('peminjampiutang', function (Blueprint $table) {
                $table->string('kode_peminjam', 5)->primary();
                $table->string('nama_peminjam', 50)->nullable();
                $table->string('alamat', 150)->nullable();
                $table->string('no_telp', 13)->nullable();
                $table->string('kd_rek', 15)->nullable()->index('kd_rek');
                $table->enum('status', ['0', '1']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peminjampiutang');
    }
};
