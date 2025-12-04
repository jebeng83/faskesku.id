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
        if (Schema::hasTable('dapur_hibah')) {
            Schema::table('dapur_hibah', function (Blueprint $table) {
                $table->foreign(['kode_pemberi'], 'dapur_hibah_ibfk_1')->references(['kode_pemberi'])->on('pemberihibah')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'dapur_hibah_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('dapur_hibah')) {
            Schema::table('dapur_hibah', function (Blueprint $table) {
                $table->dropForeign('dapur_hibah_ibfk_1');
                $table->dropForeign('dapur_hibah_ibfk_2');
            });
        }
    }
};
