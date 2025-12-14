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
        if (! Schema::hasTable('ambil_dankes')) {
            Schema::create('ambil_dankes', function (Blueprint $table) {
                $table->integer('id');
                $table->date('tanggal');
                $table->string('ktg', 50)->index('ktg');
                $table->double('dankes')->index('dankes');

                $table->primary(['id', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ambil_dankes');
    }
};
