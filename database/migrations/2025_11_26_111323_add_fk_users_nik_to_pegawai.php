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
        Schema::table('users', function (Blueprint $table) {
            // Ensure column exists and add foreign key: users.nik -> pegawai.nik
            // users.nik is nullable; FK allows NULLs
            $table->foreign('nik')
                ->references('nik')
                ->on('pegawai')
                ->onUpdate('cascade')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop FK on users.nik
            $table->dropForeign(['nik']);
        });
    }
};
