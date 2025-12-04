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
        if (Schema::hasTable('pemeliharaan_gedung')) {
            Schema::table('pemeliharaan_gedung', function (Blueprint $table) {
                $table->foreign(['nip'], 'pemeliharaan_gedung_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pemeliharaan_gedung')) {
            Schema::table('pemeliharaan_gedung', function (Blueprint $table) {
                $table->dropForeign('pemeliharaan_gedung_ibfk_1');
            });
        }
    }
};
