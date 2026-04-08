<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitSeeder extends Seeder
{

    public function run(): void
    {

    
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $units = [
            ['unit_name' => 'Piece', 'abbreviation' => 'pc'],
            ['unit_name' => 'Kilogram', 'abbreviation' => 'kg'],
            ['unit_name' => 'Liter', 'abbreviation' => 'L'],
            ['unit_name' => 'Meter', 'abbreviation' => 'm'],
            ['unit_name' => 'Box', 'abbreviation' => 'box'],
            ['unit_name' => 'Pack', 'abbreviation' => 'pk'],
            ['unit_name' => 'Set', 'abbreviation' => 'set'],
        ];

        foreach ($units as $unit) {
            Unit::create($unit);
        }
        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        $this->command->info('Units seeded: ' . Unit::count());
    }
}
