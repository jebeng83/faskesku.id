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
        if (! Schema::hasTable('inventaris_detail_titip_faktur')) {
            Schema::create('inventaris_detail_titip_faktur', function (Blueprint $table) {
                $table->string('no_tagihan', 20);
                $table->string('no_faktur', 20)->index('no_faktur');

                $table->primary(['no_tagihan', 'no_faktur']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_detail_titip_faktur');
    }
};
