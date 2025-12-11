<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Create table for BPJS PCare bridging settings.
     * Note: This table is designed to store a single configuration row.
     */
    public function up(): void
    {
        // Avoid error on environments where the table already exists
        if (Schema::hasTable('setting_bridging_bpjs')) {
            return;
        }

        Schema::create('setting_bridging_bpjs', function (Blueprint $table) {
            // Single-row config table (no primary key intentionally)
            $table->string('user_pcare', 20);
            $table->string('pass_pcare', 20);
            $table->string('cons_id_pcare', 20);
            $table->string('secretkey_pcare', 50);
            $table->string('userkey_pcare', 200);
            $table->string('userkey_mjkn', 200);
        });
    }

    /**
     * Drop the settings table.
     */
    public function down(): void
    {
        Schema::dropIfExists('setting_bridging_bpjs');
    }
};
