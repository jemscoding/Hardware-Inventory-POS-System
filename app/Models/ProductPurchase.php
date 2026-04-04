<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['purchase_id', 'product_id', 'quantity', 'unit_price', 'subtotal'])]
class ProductPurchase extends Model
{
    protected $table = 'product_purchase_items';

    public function purchase()
    {
        return $this->belongsTo(Purchase::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
