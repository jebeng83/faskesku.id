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
        if (! Schema::hasTable('detail_penagihan_piutang')) {
            Schema::create('detail_penagihan_piutang', function (Blueprint $table) {
                $table->string('no_tagihan', 17);
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->double('sisapiutang');

                $table->primary(['no_tagihan', 'no_rawat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_penagihan_piutang');
    }
};
