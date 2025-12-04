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
        if (Schema::hasTable('tokoreturjual')) {
            Schema::table('tokoreturjual', function (Blueprint $table) {
                $table->foreign(['no_member'], 'tokoreturjual_ibfk_1')->references(['no_member'])->on('tokomember')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'tokoreturjual_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tokoreturjual')) {
            Schema::table('tokoreturjual', function (Blueprint $table) {
                $table->dropForeign('tokoreturjual_ibfk_1');
                $table->dropForeign('tokoreturjual_ibfk_2');
            });
        }
    }
};
