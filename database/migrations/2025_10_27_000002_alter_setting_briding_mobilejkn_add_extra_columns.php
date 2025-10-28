<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Add additional Mobile JKN configuration columns to existing table.
     */
    public function up(): void
    {
        if (Schema::hasTable('setting_briding_mobilejkn')) {
            Schema::table('setting_briding_mobilejkn', function (Blueprint $table) {
                if (!Schema::hasColumn('setting_briding_mobilejkn', 'base_url_mobilejkn')) {
                    $table->string('base_url_mobilejkn', 200)->nullable();
                }
                if (!Schema::hasColumn('setting_briding_mobilejkn', 'base_url_v1')) {
                    $table->string('base_url_v1', 200)->nullable();
                }
                if (!Schema::hasColumn('setting_briding_mobilejkn', 'base_url_v2')) {
                    $table->string('base_url_v2', 200)->nullable();
                }
                if (!Schema::hasColumn('setting_briding_mobilejkn', 'username_antrol')) {
                    $table->string('username_antrol', 50)->nullable();
                }
                if (!Schema::hasColumn('setting_briding_mobilejkn', 'password_antrol')) {
                    $table->string('password_antrol', 50)->nullable();
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('setting_briding_mobilejkn')) {
            Schema::table('setting_briding_mobilejkn', function (Blueprint $table) {
                if (Schema::hasColumn('setting_briding_mobilejkn', 'base_url_mobilejkn')) {
                    $table->dropColumn('base_url_mobilejkn');
                }
                if (Schema::hasColumn('setting_briding_mobilejkn', 'base_url_v1')) {
                    $table->dropColumn('base_url_v1');
                }
                if (Schema::hasColumn('setting_briding_mobilejkn', 'base_url_v2')) {
                    $table->dropColumn('base_url_v2');
                }
                if (Schema::hasColumn('setting_briding_mobilejkn', 'username_antrol')) {
                    $table->dropColumn('username_antrol');
                }
                if (Schema::hasColumn('setting_briding_mobilejkn', 'password_antrol')) {
                    $table->dropColumn('password_antrol');
                }
            });
        }
    }
};