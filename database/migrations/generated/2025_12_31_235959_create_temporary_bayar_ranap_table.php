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
        if (!Schema::hasTable('temporary_bayar_ranap')) {
            Schema::create('temporary_bayar_ranap', function (Blueprint $table) {
                $table->integer('no')->index('no');
                $table->string('temp1', 100);
                $table->string('temp2', 200);
                $table->string('temp3', 100);
                $table->string('temp4', 100);
                $table->string('temp5', 100);
                $table->string('temp6', 100);
                $table->string('temp7', 100);
                $table->string('temp8', 100);
                $table->string('temp9', 100);
                $table->string('temp10', 100);
                $table->string('temp11', 100);
                $table->string('temp12', 100);
                $table->string('temp13', 100);
                $table->string('temp14', 100);
                $table->string('temp15', 100);
                $table->string('temp16', 100);
                $table->string('temp17', 100);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('temporary_bayar_ranap');
    }
};
