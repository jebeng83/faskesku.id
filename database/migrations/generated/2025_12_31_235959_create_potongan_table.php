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
        if (! Schema::hasTable('potongan')) {
            Schema::create('potongan', function (Blueprint $table) {
                $table->year('tahun');
                $table->tinyInteger('bulan');
                $table->integer('id')->index('id');
                $table->double('bpjs');
                $table->double('jamsostek');
                $table->double('dansos');
                $table->double('simwajib');
                $table->double('angkop');
                $table->double('angla');
                $table->double('telpri');
                $table->double('pajak');
                $table->double('pribadi');
                $table->double('lain');
                $table->string('ktg', 50);

                $table->primary(['tahun', 'bulan', 'id']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('potongan');
    }
};
