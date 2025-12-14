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
        if (! Schema::hasTable('master_kesimpulan_anjuran_mcu')) {
            Schema::create('master_kesimpulan_anjuran_mcu', function (Blueprint $table) {
                $table->string('kesimpulan', 150);
                $table->string('anjuran', 150);

                $table->primary(['kesimpulan', 'anjuran']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_kesimpulan_anjuran_mcu');
    }
};
