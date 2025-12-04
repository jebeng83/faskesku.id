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
        if (!Schema::hasTable('dapuropname')) {
            Schema::create('dapuropname', function (Blueprint $table) {
                $table->string('kode_brng', 15)->index('kode_brng');
                $table->double('h_beli')->nullable();
                $table->date('tanggal');
                $table->integer('stok')->index('stok');
                $table->integer('real')->index('real');
                $table->integer('selisih')->index('selisih');
                $table->double('nomihilang')->index('nomihilang');
                $table->integer('lebih');
                $table->double('nomilebih');
                $table->string('keterangan', 60)->index('keterangan');

                $table->primary(['kode_brng', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dapuropname');
    }
};
