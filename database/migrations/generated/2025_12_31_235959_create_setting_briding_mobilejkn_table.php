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
        if (!Schema::hasTable('setting_briding_mobilejkn')) {
            Schema::create('setting_briding_mobilejkn', function (Blueprint $table) {
                $table->string('user_mobilejkn', 20);
                $table->string('pass_mobilejkn', 20);
                $table->string('cons_id_mobilejkn', 20);
                $table->string('secretkey_mobilejkn', 200);
                $table->string('userkey_mobilejkn', 200);
                $table->string('base_url_mobilejkn', 200);
                $table->string('base_url_v1', 200);
                $table->string('base_url_v2', 200);
                $table->string('username_antrol', 50);
                $table->string('password_antrol', 50);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setting_briding_mobilejkn');
    }
};
