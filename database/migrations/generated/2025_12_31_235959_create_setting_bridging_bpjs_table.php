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
        if (!Schema::hasTable('setting_bridging_bpjs')) {
            Schema::create('setting_bridging_bpjs', function (Blueprint $table) {
                $table->string('user_pcare', 20);
                $table->string('pass_pcare', 20);
                $table->string('cons_id_pcare', 20);
                $table->string('secretkey_pcare', 50);
                $table->string('userkey_pcare', 200);
                $table->string('userkey_mjkn', 200);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setting_bridging_bpjs');
    }
};
