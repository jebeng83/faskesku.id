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
        if (Schema::hasTable('ipsrsreturbeli')) {
            Schema::table('ipsrsreturbeli', function (Blueprint $table) {
                $table->foreign(['kode_suplier'], 'ipsrsreturbeli_ibfk_1')->references(['kode_suplier'])->on('ipsrssuplier')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'ipsrsreturbeli_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ipsrsreturbeli')) {
            Schema::table('ipsrsreturbeli', function (Blueprint $table) {
                $table->dropForeign('ipsrsreturbeli_ibfk_1');
                $table->dropForeign('ipsrsreturbeli_ibfk_2');
            });
        }
    }
};
