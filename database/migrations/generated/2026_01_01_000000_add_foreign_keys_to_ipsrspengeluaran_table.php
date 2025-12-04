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
        if (Schema::hasTable('ipsrspengeluaran')) {
            Schema::table('ipsrspengeluaran', function (Blueprint $table) {
                $table->foreign(['nip'], 'ipsrspengeluaran_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ipsrspengeluaran')) {
            Schema::table('ipsrspengeluaran', function (Blueprint $table) {
                $table->dropForeign('ipsrspengeluaran_ibfk_1');
            });
        }
    }
};
