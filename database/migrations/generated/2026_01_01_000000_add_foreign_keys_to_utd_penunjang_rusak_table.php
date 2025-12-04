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
        if (Schema::hasTable('utd_penunjang_rusak')) {
            Schema::table('utd_penunjang_rusak', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'utd_penunjang_rusak_ibfk_1')->references(['kode_brng'])->on('ipsrsbarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'utd_penunjang_rusak_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('utd_penunjang_rusak')) {
            Schema::table('utd_penunjang_rusak', function (Blueprint $table) {
                $table->dropForeign('utd_penunjang_rusak_ibfk_1');
                $table->dropForeign('utd_penunjang_rusak_ibfk_2');
            });
        }
    }
};
