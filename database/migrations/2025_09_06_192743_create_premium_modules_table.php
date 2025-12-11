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
                $table->id();
                $table->string('module_key')->unique(); // Unique identifier for module
                $table->string('name'); // Module name
                $table->text('description')->nullable(); // Module description
                $table->decimal('price', 10, 2); // Price in IDR
                $table->string('version', 20)->default('1.0.0'); // Module version
                $table->boolean('is_active')->default(false); // Is module purchased and active
                $table->text('license_key')->nullable(); // Encrypted license key
                $table->text('activation_hash')->nullable(); // Hash for activation validation
                $table->timestamp('purchased_at')->nullable(); // When module was purchased
                $table->timestamp('activated_at')->nullable(); // When module was activated
                $table->timestamp('expires_at')->nullable(); // License expiration (if applicable)
                $table->json('features')->nullable(); // Module features list
                $table->json('permissions')->nullable(); // Required permissions
                $table->string('checksum', 64)->nullable(); // File integrity checksum
                $table->text('encrypted_data')->nullable(); // Additional encrypted data
                $table->timestamps();

                $table->index(['module_key', 'is_active']);
                $table->index('purchased_at');
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
