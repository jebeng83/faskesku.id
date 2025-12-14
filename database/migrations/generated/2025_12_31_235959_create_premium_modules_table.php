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
        if (! Schema::hasTable('premium_modules')) {
            Schema::create('premium_modules', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('module_key')->unique();
                $table->string('name');
                $table->text('description')->nullable();
                $table->decimal('price', 10);
                $table->string('version', 20)->default('1.0.0');
                $table->boolean('is_active')->default(false);
                $table->text('license_key')->nullable();
                $table->text('activation_hash')->nullable();
                $table->timestamp('purchased_at')->nullable()->index();
                $table->timestamp('activated_at')->nullable();
                $table->timestamp('expires_at')->nullable();
                $table->json('features')->nullable();
                $table->json('permissions')->nullable();
                $table->string('checksum', 64)->nullable();
                $table->text('encrypted_data')->nullable();
                $table->timestamps();

                $table->index(['module_key', 'is_active']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('premium_modules');
    }
};
