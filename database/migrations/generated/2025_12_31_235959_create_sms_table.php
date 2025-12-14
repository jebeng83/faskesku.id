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
        if (! Schema::hasTable('sms')) {
            Schema::create('sms', function (Blueprint $table) {
                $table->increments('id_pesan');
                $table->string('sms_masuk')->nullable();
                $table->string('no_hp', 15)->nullable();
                $table->string('pdu_pesan')->nullable();
                $table->string('encoding', 20)->nullable();
                $table->string('id_gateway', 20)->nullable();
                $table->dateTime('tgl_sms')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sms');
    }
};
