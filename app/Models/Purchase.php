<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['product_id', 'user_id', 'customer_name', 'total_amount'])]
class Purchase extends Model
{
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_purchase')
            ->withPivot('quantity', 'unit_price', 'subtotal')
            ->withTimestamps();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
