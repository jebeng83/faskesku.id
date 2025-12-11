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
        if (Schema::hasTable('pembagian_tuslah')) {
            Schema::table('pembagian_tuslah', function (Blueprint $table) {
                $table->foreign(['id'], 'pembagian_tuslah_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pembagian_tuslah')) {
            Schema::table('pembagian_tuslah', function (Blueprint $table) {
                $table->dropForeign('pembagian_tuslah_ibfk_1');
            });
        }
    }
};
