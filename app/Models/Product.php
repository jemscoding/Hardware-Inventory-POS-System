<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['product_name', 'description', 'wholesale_price', 'sale_price', 'stock_quantity', 'is_delivery', 'category_id', 'unit_id'])]
class Product extends Model
{

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class, 'product_purchase')
            ->withPivot('unit_price', 'quantity', 'subtotal')
            ->withTimestamps();
    }

    public function productPurchases()
    {
        return $this->hasMany(ProductPurchase::class);
    }
}
