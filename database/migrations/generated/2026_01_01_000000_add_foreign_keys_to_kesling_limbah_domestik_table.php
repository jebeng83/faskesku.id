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
        if (Schema::hasTable('kesling_limbah_domestik')) {
            Schema::table('kesling_limbah_domestik', function (Blueprint $table) {
                $table->foreign(['nip'], 'kesling_limbah_domestik_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('kesling_limbah_domestik')) {
            Schema::table('kesling_limbah_domestik', function (Blueprint $table) {
                $table->dropForeign('kesling_limbah_domestik_ibfk_1');
            });
        }
    }
};
