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
        if (! Schema::hasTable('whatsapp_credentials')) {
            Schema::create('whatsapp_credentials', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('name', 100)->nullable();
                $table->string('phone_number_id', 100)->unique();
                $table->text('token_cipher')->comment('encrypted access token');
                $table->text('app_secret_cipher')->nullable()->comment('encrypted app secret');
                $table->string('verify_token', 150)->nullable();
                $table->string('graph_version', 20)->default('v19.0');
                $table->string('graph_base', 150)->default('https://graph.facebook.com');
                $table->boolean('active')->default(true)->index();
                $table->dateTime('last_rotated_at')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('whatsapp_credentials');
    }
};

