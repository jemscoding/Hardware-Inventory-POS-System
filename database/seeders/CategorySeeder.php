<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Clear existing records
        Category::truncate();
        
        // Insert categories
        $categories = [
            ['category_name' => 'Electronics', 'description' => 'Electronic devices and gadgets'],
            ['category_name' => 'Clothing', 'description' => 'Apparel and fashion items'],
            ['category_name' => 'Books', 'description' => 'Books, magazines, and publications'],
            ['category_name' => 'Home & Garden', 'description' => 'Home decor, furniture, and garden supplies'],
            ['category_name' => 'Sports', 'description' => 'Sports equipment and accessories'],
            ['category_name' => 'Toys', 'description' => 'Toys and games for all ages'],
            ['category_name' => 'Automotive', 'description' => 'Car parts and accessories'],
            ['category_name' => 'Health & Beauty', 'description' => 'Health and beauty products'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
        
        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        $this->command->info('✓ Categories seeded: ' . Category::count());
    }
}