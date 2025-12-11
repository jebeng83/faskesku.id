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
        if (Schema::hasTable('pemantauan_pews_anak')) {
            Schema::table('pemantauan_pews_anak', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'pemantauan_pews_anak_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'pemantauan_pews_anak_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pemantauan_pews_anak')) {
            Schema::table('pemantauan_pews_anak', function (Blueprint $table) {
                $table->dropForeign('pemantauan_pews_anak_ibfk_1');
                $table->dropForeign('pemantauan_pews_anak_ibfk_2');
            });
        }
    }
};
