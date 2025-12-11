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
        if (!Schema::hasTable('dapurdetailbeli')) {
            Schema::create('dapurdetailbeli', function (Blueprint $table) {
                $table->string('no_faktur', 15)->index('no_faktur');
                $table->string('kode_brng', 15)->index('kode_brng');
                $table->char('kode_sat', 4)->index('kode_sat');
                $table->double('jumlah')->index('jumlah');
                $table->double('harga')->index('harga');
                $table->double('subtotal')->index('subtotal');
                $table->double('dis')->index('dis');
                $table->double('besardis')->index('besardis');
                $table->double('total')->index('total');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dapurdetailbeli');
    }
};
