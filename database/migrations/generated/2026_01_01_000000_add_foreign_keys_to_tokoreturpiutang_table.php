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
        if (Schema::hasTable('tokoreturpiutang')) {
            Schema::table('tokoreturpiutang', function (Blueprint $table) {
                $table->foreign(['no_member'], 'tokoreturpiutang_ibfk_1')->references(['no_member'])->on('tokomember')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'tokoreturpiutang_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tokoreturpiutang')) {
            Schema::table('tokoreturpiutang', function (Blueprint $table) {
                $table->dropForeign('tokoreturpiutang_ibfk_1');
                $table->dropForeign('tokoreturpiutang_ibfk_2');
            });
        }
    }
};
