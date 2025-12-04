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
        if (Schema::hasTable('pemantauan_ews_neonatus')) {
            Schema::table('pemantauan_ews_neonatus', function (Blueprint $table) {
                $table->foreign(['nip'], 'pemantauan_ews_neonatus_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rawat'], 'pemantauan_ews_neonatus_ibfk_2')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pemantauan_ews_neonatus')) {
            Schema::table('pemantauan_ews_neonatus', function (Blueprint $table) {
                $table->dropForeign('pemantauan_ews_neonatus_ibfk_1');
                $table->dropForeign('pemantauan_ews_neonatus_ibfk_2');
            });
        }
    }
};
