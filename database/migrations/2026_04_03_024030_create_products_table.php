<?php

use App\Models\Category;
use App\Models\Unit;
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
            // foreign keys for category and unit
            $table->foreignId(Category::class)->constrained('categories')->cascadeOnDelete();
            $table->foreignId(Unit::class)->constrained('units')->cascadeOnDelete();

            // other product table fields
            $table->string('product_name');
            $table->string('description')->nullable();
            $table->decimal('wholesale_price', 10, 2);
            $table->decimal('sale_price', 10, 2);
            $table->integer('stock_quantity');

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
