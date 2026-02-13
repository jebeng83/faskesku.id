<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('satusehat_dispatch_batches', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->nullable();
            $table->string('scope', 30)->default('rajal');
            $table->date('tgl_from');
            $table->date('tgl_to');
            $table->unsignedInteger('limit_rows')->default(200);
            $table->unsignedInteger('interval_seconds')->default(3);
            $table->string('status', 20)->default('pending');
            $table->unsignedInteger('total_items')->default(0);
            $table->unsignedInteger('done_items')->default(0);
            $table->unsignedInteger('failed_items')->default(0);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('finished_at')->nullable();
            $table->text('last_error')->nullable();
            $table->timestamps();

            $table->index('status');
            $table->index(['scope', 'status']);
            $table->index(['tgl_from', 'tgl_to']);
        });

        Schema::create('satusehat_dispatch_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('batch_id');
            $table->string('no_rawat', 17);
            $table->string('step', 50);
            $table->unsignedSmallInteger('step_order')->default(1);
            $table->string('status', 20)->default('pending');
            $table->unsignedSmallInteger('attempts')->default(0);
            $table->timestamp('next_run_at')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('finished_at')->nullable();
            $table->text('last_error')->nullable();
            $table->longText('response_json')->nullable();
            $table->timestamps();

            $table->unique(['batch_id', 'no_rawat', 'step']);
            $table->index(['batch_id', 'status', 'step_order']);
            $table->index(['batch_id', 'no_rawat']);

            $table->foreign('batch_id')->references('id')->on('satusehat_dispatch_batches')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('satusehat_dispatch_items');
        Schema::dropIfExists('satusehat_dispatch_batches');
    }
};
