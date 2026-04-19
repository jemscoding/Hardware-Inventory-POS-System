import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PhilippinePeso } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import React, { FormEvent, useState } from 'react';
import products from '@/routes/products';
import AppLayout from '@/layouts/app-layout';
import categories from '@/routes/categories';
import type { Unit } from '@/types/unit';
import type { Category } from '@/types/category';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';


export default function Create({categories, units}:{categories: Category[], units: Unit[]}) {
    const { data, setData, post, processing, errors } = useForm({
        product_name: '',
        description: '',
        wholesale_price: '',
        sale_price: '',
        stock_quantity: '',
        category_id: '',
        unit_id: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post('/products', {
            onSuccess: () => {
                setSuccessMessage('Product created successfully! Redirecting...');
            },
        });
    }

    return (
        <div className="flex justify-center w-full">
            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    {successMessage}
                </div>
            )}

            <div className="border-2 rounded-lg m-8 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-8">
                        <div className="space-y-2">
                            <Label htmlFor="product_name">Product Name</Label>
                            <Input
                                id="product_name"
                                value={data.product_name}
                                onChange={e => setData('product_name', e.target.value)}
                                placeholder="Enter product name"
                                required
                            />
                            {errors.product_name && (
                                <p className="text-sm text-red-500">{errors.product_name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stock_quantity">Stock Quantity</Label>
                            <Input
                                id="stock_quantity"
                                value={data.stock_quantity}
                                onChange={e => setData('stock_quantity', e.target.value)}
                                placeholder="Enter stock quantity"
                                type="number"
                                step="1"
                                min="0"
                                max="9999"
                                required
                            />
                            {errors.stock_quantity && (
                                <p className="text-sm text-red-500">{errors.stock_quantity}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="wholesale_price">Wholesale Price</Label>
                            <div className="relative">
                                <PhilippinePeso className="absolute h-4 w-4 text-gray-500 top-1/2 -translate-y-1/2 left-3" />
                                <Input
                                    id="wholesale_price"
                                    value={data.wholesale_price}
                                    onChange={e => setData('wholesale_price', e.target.value)}
                                    placeholder="Enter wholesale price"
                                    type="number"
                                    step="1"
                                    min="0"
                                    max="9999"
                                    required
                                    className="pl-8"
                                />
                            </div>
                            {errors.wholesale_price && (
                                <p className="text-sm text-red-500">{errors.wholesale_price}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sale_price">Sale Price</Label>
                            <div className="relative">
                                <PhilippinePeso className="absolute h-4 w-4 text-gray-500 top-1/2 -translate-y-1/2 left-3" />
                                <Input
                                    id="sale_price"
                                    value={data.sale_price}
                                    onChange={e => setData('sale_price', e.target.value)}
                                    placeholder="Enter sale price"
                                    type="number"
                                    step="1"
                                    min="0"
                                    max="9999"
                                    required
                                    className="pl-8"
                                />
                            </div>
                            {errors.sale_price && (
                                <p className="text-sm text-red-500">{errors.sale_price}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category_id">Category</Label>
                        <Select
                            value={data.category_id}
                            onValueChange={(value) => setData('category_id', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.category_name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.category_id && (
                            <p className="text-sm text-red-500">{errors.category_id}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="unit_id">Unit</Label>
                        <Select
                            value={data.unit_id}
                            onValueChange={(value) => setData('unit_id', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Units</SelectLabel>
                                    {units.map((unit) => (
                                        <SelectItem key={unit.id} value={unit.id.toString()}>
                                            {unit.unit_name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.unit_id && (
                            <p className="text-sm text-red-500">{errors.unit_id}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            placeholder="Enter product description"
                            rows={4}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description}</p>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Product'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit('/products')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}