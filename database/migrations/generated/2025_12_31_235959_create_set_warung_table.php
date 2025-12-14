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
        if (! Schema::hasTable('set_warung')) {
            Schema::create('set_warung', function (Blueprint $table) {
                $table->year('tahun');
                $table->tinyInteger('bulan');
                $table->double('pendapatan_warung');
                $table->double('persen_rs');
                $table->double('bagian_rs');
                $table->double('persen_kry');
                $table->double('bagian_kry');

                $table->primary(['tahun', 'bulan']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_warung');
    }
};
