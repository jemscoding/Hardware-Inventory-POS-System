<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Unit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Clear existing products
        Product::truncate();
        
        // Debug: Check what's in the database
        $this->command->info('Current categories: ' . Category::count());
        $this->command->info('Current units: ' . Unit::count());
        $this->command->info('Current products before seeding: ' . Product::count());

        // Get or create category
        $category = Category::first();
        if (!$category) {
            $this->command->info('No categories found. Creating default category...');
            $category = Category::create([
                'category_name' => 'General',
                'description' => 'General category for products'
            ]);
        }

        // Get or create unit
        $unit = Unit::first();
        if (!$unit) {
            $this->command->info('No units found. Creating default unit...');
            $unit = Unit::create([
                'unit_name' => 'Piece',
                'abbreviation' => 'pc'
            ]);
        }

        $this->command->info("Using Category: {$category->id} - {$category->category_name}");
        $this->command->info("Using Unit: {$unit->id} - {$unit->unit_name}");

        // Define products
        $products = [
            [
                'product_name' => 'iPhone 14 Pro',
                'description' => 'Latest smartphone with A16 Bionic chip',
                'wholesale_price' => 899.99,
                'sale_price' => 999.99,
                'stock_quantity' => 25,
                'is_delivery' => 'delivery',
            ],
            [
                'product_name' => 'Samsung Galaxy S23',
                'description' => 'Premium Android smartphone',
                'wholesale_price' => 799.99,
                'sale_price' => 899.99,
                'stock_quantity' => 30,
                'is_delivery' => 'delivery',
            ],
            [
                'product_name' => 'Sony WH-1000XM5',
                'description' => 'Wireless noise-canceling headphones',
                'wholesale_price' => 299.99,
                'sale_price' => 349.99,
                'stock_quantity' => 50,
                'is_delivery' => 'delivery',
            ],
            [
                'product_name' => 'Cotton T-Shirt',
                'description' => 'Comfortable 100% cotton t-shirt',
                'wholesale_price' => 8.00,
                'sale_price' => 15.99,
                'stock_quantity' => 200,
                'is_delivery' => 'delivery',
            ],
            [
                'product_name' => 'Levi\'s Jeans',
                'description' => 'Classic blue denim jeans',
                'wholesale_price' => 35.00,
                'sale_price' => 59.99,
                'stock_quantity' => 75,
                'is_delivery' => 'delivery',
            ],
            [
                'product_name' => 'The Great Gatsby',
                'description' => 'Classic novel by F. Scott Fitzgerald',
                'wholesale_price' => 8.00,
                'sale_price' => 12.99,
                'stock_quantity' => 100,
                'is_delivery' => 'delivery',
            ],
            [
                'product_name' => 'Cooking Pan Set',
                'description' => 'Non-stick cooking pan set, 5 pieces',
                'wholesale_price' => 45.00,
                'sale_price' => 69.99,
                'stock_quantity' => 40,
                'is_delivery' => 'delivery',
            ],
            [
                'product_name' => 'Basketball',
                'description' => 'Official size basketball',
                'wholesale_price' => 18.00,
                'sale_price' => 29.99,
                'stock_quantity' => 60,
                'is_delivery' => 'delivery',
            ],
            [
                'product_name' => 'Motor Oil 5W-30',
                'description' => 'Synthetic motor oil, 1 liter',
                'wholesale_price' => 8.00,
                'sale_price' => 12.99,
                'stock_quantity' => 150,
                'is_delivery' => 'not-delivery',
            ],
            [
                'product_name' => 'Vitamin C Supplement',
                'description' => 'Immune support supplement, 100 tablets',
                'wholesale_price' => 12.00,
                'sale_price' => 19.99,
                'stock_quantity' => 120,
                'is_delivery' => 'delivery',
            ],
        ];

        // Insert products
        $createdCount = 0;
        foreach ($products as $productData) {
            try {
                $product = Product::create([
                    'product_name' => $productData['product_name'],
                    'description' => $productData['description'],
                    'wholesale_price' => $productData['wholesale_price'],
                    'sale_price' => $productData['sale_price'],
                    'stock_quantity' => $productData['stock_quantity'],
                    'is_delivery' => $productData['is_delivery'],
                    'category_id' => $category->id,
                    'unit_id' => $unit->id,
                ]);
                
                $createdCount++;
                $this->command->info("✅ Created: {$product->product_name}");
                
            } catch (\Exception $e) {
                $this->command->error("❌ Failed to create {$productData['product_name']}: " . $e->getMessage());
            }
        }

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        $this->command->newLine();
        $this->command->info("✅ Successfully created {$createdCount} products!");
        $this->command->info("📊 Final product count: " . Product::count());
    }
}