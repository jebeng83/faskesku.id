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
        if (!Schema::hasTable('bridging_srb_bpjs')) {
            Schema::create('bridging_srb_bpjs', function (Blueprint $table) {
                $table->string('no_sep', 40);
                $table->string('no_srb', 10);
                $table->date('tgl_srb')->nullable();
                $table->string('alamat', 200)->nullable();
                $table->string('email', 40)->nullable();
                $table->string('kodeprogram', 3)->nullable();
                $table->string('namaprogram', 70)->nullable();
                $table->string('kodedpjp', 10)->nullable();
                $table->string('nmdpjp', 100)->nullable();
                $table->string('user', 25)->nullable();
                $table->string('keterangan', 100)->nullable();
                $table->string('saran', 100)->nullable();

                $table->primary(['no_sep', 'no_srb']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bridging_srb_bpjs');
    }
};
