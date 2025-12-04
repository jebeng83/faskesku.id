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
        if (Schema::hasTable('ambil_dankes')) {
            Schema::table('ambil_dankes', function (Blueprint $table) {
                $table->foreign(['id'], 'ambil_dankes_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ambil_dankes')) {
            Schema::table('ambil_dankes', function (Blueprint $table) {
                $table->dropForeign('ambil_dankes_ibfk_1');
            });
        }
    }
};
