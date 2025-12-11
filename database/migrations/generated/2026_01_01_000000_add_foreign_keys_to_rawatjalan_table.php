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
        if (Schema::hasTable('rawatjalan')) {
            Schema::table('rawatjalan', function (Blueprint $table) {
                $table->foreign(['id'], 'rawatjalan_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['tnd'], 'rawatjalan_ibfk_2')->references(['id'])->on('master_tindakan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('rawatjalan')) {
            Schema::table('rawatjalan', function (Blueprint $table) {
                $table->dropForeign('rawatjalan_ibfk_1');
                $table->dropForeign('rawatjalan_ibfk_2');
            });
        }
    }
};
