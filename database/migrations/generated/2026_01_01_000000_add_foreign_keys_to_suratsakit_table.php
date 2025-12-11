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
        if (Schema::hasTable('suratsakit')) {
            Schema::table('suratsakit', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'suratsakit_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('suratsakit')) {
            Schema::table('suratsakit', function (Blueprint $table) {
                $table->dropForeign('suratsakit_ibfk_1');
            });
        }
    }
};
