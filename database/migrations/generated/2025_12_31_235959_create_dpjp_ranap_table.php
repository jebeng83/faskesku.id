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
        if (! Schema::hasTable('dpjp_ranap')) {
            Schema::create('dpjp_ranap', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->string('kd_dokter', 20)->index('dpjp_ranap_ibfk_2');

                $table->primary(['no_rawat', 'kd_dokter']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dpjp_ranap');
    }
};
