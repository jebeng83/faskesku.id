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
        if (Schema::hasTable('returbeli')) {
            Schema::table('returbeli', function (Blueprint $table) {
                $table->foreign(['kode_suplier'], 'returbeli_ibfk_2')->references(['kode_suplier'])->on('datasuplier')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'returbeli_ibfk_3')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_bangsal'], 'returbeli_ibfk_4')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('returbeli')) {
            Schema::table('returbeli', function (Blueprint $table) {
                $table->dropForeign('returbeli_ibfk_2');
                $table->dropForeign('returbeli_ibfk_3');
                $table->dropForeign('returbeli_ibfk_4');
            });
        }
    }
};
