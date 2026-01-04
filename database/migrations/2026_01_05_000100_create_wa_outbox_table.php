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
        if (! Schema::hasTable('wa_outbox')) {
            Schema::create('wa_outbox', function (Blueprint $table) {
                $table->bigIncrements('nomor');
                $table->string('nowa', 50)->default('');
                $table->text('pesan');
                $table->dateTime('tanggal_jam')->nullable();
                $table->string('status', 20)->default('ANTRIAN');
                $table->string('source', 50)->nullable();
                $table->string('sender', 10)->default('NODEJS')->comment('ANY, NODEJS, QISCUS');
                $table->string('success', 1)->nullable();
                $table->longText('response')->nullable();
                $table->string('sender_name', 50)->nullable();
                $table->text('request')->nullable();
                $table->string('type', 10)->default('TEXT')->comment('TEXT, IMAGE, VIDEO');
                $table->string('file', 100)->nullable();
                $table->dateTime('sent_datetime')->nullable();

                $table->index('nowa', 'NOWA');
                $table->index('status', 'STATUS');
                $table->index('sender', 'SENDER');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wa_outbox');
    }
};

