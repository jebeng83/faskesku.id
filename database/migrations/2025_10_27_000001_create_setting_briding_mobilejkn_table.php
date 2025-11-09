<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Create table for BPJS Mobile JKN bridging settings.
     * Note: This table is designed to store a single configuration row.
     */
    public function up(): void
    {
        // Avoid error on environments where the table already exists
        if (Schema::hasTable('setting_briding_mobilejkn')) {
            return;
        }

        Schema::create('setting_briding_mobilejkn', function (Blueprint $table) {
            // Single-row config table (no primary key intentionally)
            $table->string('user_mobilejkn', 20);
            $table->string('pass_mobilejkn', 20);
            $table->string('cons_id_mobilejkn', 20);
            $table->string('secretkey_mobilejkn', 200);
            $table->string('userkey_mobilejkn', 200);
        });
    }

    /**
     * Drop the settings table.
     */
    public function down(): void
    {
        Schema::dropIfExists('setting_briding_mobilejkn');
    }
};