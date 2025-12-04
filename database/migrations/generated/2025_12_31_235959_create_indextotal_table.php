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
        if (!Schema::hasTable('indextotal')) {
            Schema::create('indextotal', function (Blueprint $table) {
                $table->char('kdindex', 4)->index('kdindex');
                $table->double('ttl')->index('ttl');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('indextotal');
    }
};
