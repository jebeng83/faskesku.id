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
        Schema::create('sys_actions', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique()->comment('Unique identifier for the action (e.g., "approve_claim")');
            $table->string('name')->comment('Human readable name');
            $table->text('description')->nullable();
            $table->enum('logic_operator', ['AND', 'OR'])->default('AND')->comment('How to combine conditions: AND (all must pass), OR (at least one must pass)');
            $table->timestamps();
        });

        Schema::create('sys_action_conditions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('action_id')->constrained('sys_actions')->onDelete('cascade');
            $table->string('handler_class')->comment('Fully qualified class name of the condition handler');
            $table->json('parameters')->nullable()->comment('JSON parameters for the condition');
            $table->integer('priority')->default(0)->comment('Higher number = runs first');
            $table->boolean('is_active')->default(true);
            $table->string('failure_message')->nullable()->comment('Custom error message when this condition fails');
            $table->timestamps();
            
            // Index for faster lookups
            $table->index(['action_id', 'is_active', 'priority']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sys_action_conditions');
        Schema::dropIfExists('sys_actions');
    }
};
