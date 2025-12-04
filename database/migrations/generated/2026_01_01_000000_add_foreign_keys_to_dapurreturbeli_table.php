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
        if (Schema::hasTable('dapurreturbeli')) {
            Schema::table('dapurreturbeli', function (Blueprint $table) {
                $table->foreign(['kode_suplier'], 'dapurreturbeli_ibfk_1')->references(['kode_suplier'])->on('dapursuplier')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'dapurreturbeli_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('dapurreturbeli')) {
            Schema::table('dapurreturbeli', function (Blueprint $table) {
                $table->dropForeign('dapurreturbeli_ibfk_1');
                $table->dropForeign('dapurreturbeli_ibfk_2');
            });
        }
    }
};
