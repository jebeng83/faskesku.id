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
        if (!Schema::hasTable('menus')) {
            Schema::create('menus', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('name');
                $table->string('slug')->unique();
                $table->string('icon')->nullable();
                $table->string('route')->nullable();
                $table->string('url')->nullable();
                $table->unsignedBigInteger('parent_id')->nullable();
                $table->integer('sort_order')->default(0);
                $table->boolean('is_active')->default(true)->index();
                $table->string('permission_name')->nullable()->index();
                $table->text('description')->nullable();
                $table->timestamps();

                $table->index(['parent_id', 'sort_order']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
