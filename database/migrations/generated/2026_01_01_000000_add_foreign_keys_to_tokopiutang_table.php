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
        if (Schema::hasTable('tokopiutang')) {
            Schema::table('tokopiutang', function (Blueprint $table) {
                $table->foreign(['no_member'], 'tokopiutang_ibfk_2')->references(['no_member'])->on('tokomember')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'tokopiutang_ibfk_3')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tokopiutang')) {
            Schema::table('tokopiutang', function (Blueprint $table) {
                $table->dropForeign('tokopiutang_ibfk_2');
                $table->dropForeign('tokopiutang_ibfk_3');
            });
        }
    }
};
