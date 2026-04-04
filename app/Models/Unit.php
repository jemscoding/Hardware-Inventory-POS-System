<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['unit_name', 'abbreviation'])]
class Unit extends Model
{
    
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
