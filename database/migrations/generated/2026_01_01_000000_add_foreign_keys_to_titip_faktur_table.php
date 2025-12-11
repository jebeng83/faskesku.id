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
        if (Schema::hasTable('titip_faktur')) {
            Schema::table('titip_faktur', function (Blueprint $table) {
                $table->foreign(['nip'], 'titip_faktur_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('titip_faktur')) {
            Schema::table('titip_faktur', function (Blueprint $table) {
                $table->dropForeign('titip_faktur_ibfk_1');
            });
        }
    }
};
