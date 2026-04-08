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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            
            // ✅ CORRECT - Specify the column name as string
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->foreignId('unit_id')->constrained('units')->cascadeOnDelete();

            // other product table fields
            $table->string('product_name');
            $table->text('description')->nullable(); // Changed to text for longer descriptions
            $table->decimal('wholesale_price', 10, 2);
            $table->decimal('sale_price', 10, 2);
            $table->integer('stock_quantity')->default(0);

            // delivery option: not-delivery or delivery
            $table->enum('is_delivery', ['not-delivery', 'delivery'])->default('not-delivery');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};