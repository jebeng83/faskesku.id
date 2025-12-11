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
        if (Schema::hasTable('utd_cekal_darah')) {
            Schema::table('utd_cekal_darah', function (Blueprint $table) {
                $table->foreign(['no_donor'], 'utd_cekal_darah_ibfk_1')->references(['no_donor'])->on('utd_donor')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['petugas_pemusnahan'], 'utd_cekal_darah_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('utd_cekal_darah')) {
            Schema::table('utd_cekal_darah', function (Blueprint $table) {
                $table->dropForeign('utd_cekal_darah_ibfk_1');
                $table->dropForeign('utd_cekal_darah_ibfk_2');
            });
        }
    }
};
