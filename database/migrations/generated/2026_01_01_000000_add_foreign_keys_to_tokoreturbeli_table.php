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
        if (Schema::hasTable('tokoreturbeli')) {
            Schema::table('tokoreturbeli', function (Blueprint $table) {
                $table->foreign(['kode_suplier'], 'tokoreturbeli_ibfk_1')->references(['kode_suplier'])->on('tokosuplier')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'tokoreturbeli_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tokoreturbeli')) {
            Schema::table('tokoreturbeli', function (Blueprint $table) {
                $table->dropForeign('tokoreturbeli_ibfk_1');
                $table->dropForeign('tokoreturbeli_ibfk_2');
            });
        }
    }
};
