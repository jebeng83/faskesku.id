<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Ubah kolom ms_kerja menjadi ENUM('<1','PT','FT')
        if (Schema::hasTable('pegawai')) {
            Schema::table('pegawai', function (Blueprint $table) {
                $table->enum('ms_kerja', ['<1', 'PT', 'FT'])->nullable()->change();
            });
        }
    }

    public function down(): void
    {
        // Kembalikan ms_kerja ke string(3) nullable jika rollback
        if (Schema::hasTable('pegawai')) {
            Schema::table('pegawai', function (Blueprint $table) {
                $table->string('ms_kerja', 3)->nullable()->change();
            });
        }
    }
};