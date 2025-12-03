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
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                // Add nik column if it doesn't exist
                if (! Schema::hasColumn('users', 'nik')) {
                    $table->string('nik', 20)->nullable()->after('email');
                }

                // Add foreign key constraint
                // $table->foreign('nik')->references('nik')->on('pegawai')->onDelete('set null')->onUpdate('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                // Drop foreign key constraint
                if (Schema::hasColumn('users', 'nik')) {
                    // $table->dropForeign(['nik']);
                    $table->dropColumn('nik');
                }
            });
        }
    }
};
