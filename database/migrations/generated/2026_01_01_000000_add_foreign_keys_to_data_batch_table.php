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
        if (Schema::hasTable('data_batch')) {
            Schema::table('data_batch', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'data_batch_ibfk_1')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('data_batch')) {
            Schema::table('data_batch', function (Blueprint $table) {
                $table->dropForeign('data_batch_ibfk_1');
            });
        }
    }
};
