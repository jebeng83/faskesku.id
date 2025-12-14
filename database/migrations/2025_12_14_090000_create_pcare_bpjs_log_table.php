<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pcare_bpjs_log', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 17);
            $table->string('endpoint', 50);
            $table->enum('status', ['success', 'failed']);
            $table->integer('http_status')->nullable();
            $table->integer('meta_code')->nullable();
            $table->string('meta_message', 255)->nullable();
            $table->integer('duration_ms')->nullable();
            $table->json('request_payload');
            $table->longText('response_body_raw')->nullable();
            $table->json('response_body_json')->nullable();
            $table->string('triggered_by', 50)->nullable();
            $table->string('correlation_id', 64)->nullable();
            $table->timestamps();

            $table->index('no_rawat');
            $table->index('endpoint');
            $table->index(['status', 'created_at']);
            $table->index('meta_code');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pcare_bpjs_log');
    }
};

