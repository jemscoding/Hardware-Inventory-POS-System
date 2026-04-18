import { Card, CardContent } from "@/components/ui/card";
import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { create, edit } from "@/routes/units";
import { formatDate, formatTime } from "@/components/format-time-and-date";
import  TableList  from "@/components/table-list";
import { ProductTable } from "@/tables/product";
import ShowListModal from "@/components/show-list-modal";

interface Product {
    id: number;
    product_name: string;
    description: string;
    wholesale_price: number;
    sale_price: number;
    stock_quantity: number;
    is_delivery: 'not-delivery' | 'delivery';
    category_id: number;  // Foreign key
    unit_id: number;      // Foreign key
    category?: {          // Optional relation
        id: number;
        category_name: string;
    };
    unit?: {              // Optional relation
        id: number;
        unit_name: string;
    };
    created_at: string;
    updated_at: string;
}

interface ProductProps {
    products: Product[];
}

export default function Index({ products }: ProductProps) {
    const [showProducts, setShowProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowProducts(products);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [products]);

    const handleShowModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleEdit = (id: number) => {
        console.log(`Edit product with ID: ${id}`);
        router.visit(`/products/${id}/edit`);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            console.log(`Delete product with ID: ${id}`);
            router.delete(`/products/${id}`, {
                onSuccess: () => {
                    console.log('Product deleted successfully');
                },
                onError: (errors) => {
                    console.error('Error deleting product:', errors);
                }
            });
        }
    };

    if (loading) {
        return (
            <div className="container py-8">
                <div className="flex justify-between items-center mx-8">
                    <h1 className="text-3xl font-bold">Product List</h1>
                    <Link href={create()} className="inline-block">
                        <Button>Add Product</Button>
                    </Link>
                </div>
                <p className="mx-8 my-4">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-6 mx-8">
                <h1 className="text-3xl font-bold">Product List</h1>
                <Link href={create()} className="inline-block">
                    <Button>Add Product</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 mx-8">
                {showProducts.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No products found.</p>
                ) : (
                    showProducts.map((product) => (
                        <Card key={product.id} className="relative">
                            <CardContent className="py-2">
                                <div className="space-y-2">
                                    <span className="text-sm text-gray-500">#{product.id}</span>
                                    <h2 className="text-xl font-semibold">Product Name: {product.product_name}</h2>
                                    <p className="text-gray-600">Description: {product.description}</p>
                                    <p className="text-lg font-bold">${product.wholesale_price}</p>
                                    <p className="text-lg font-bold">${product.sale_price}</p>
                                    <p className="text-sm text-gray-500">
                                        Created: {formatDate(product.created_at)} {formatTime(product.created_at)}
                                    </p>

                                    <div className="flex gap-2 mt-4 mb-auto">
                                        {/* Use modal instead of navigation */}
                                        {/* <ShowListModal
                                            trigger={
                                                <Button variant="outline" size="sm">
                                                    View Details
                                                </Button>
                                            }
                                            title="Unit Details"
                                            description={`Information for unit: ${unit.unit_name}`}
                                            unit={unit}
                                        /> */}

                                        <Link href={edit(product.id)}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>

                                        <Button
                                            onClick={() => handleDelete(product.id)}
                                            variant="destructive"
                                            size="sm"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <TableList
                columns={ProductTable.columns}
                actions={ProductTable.actions}
                data={products}
                onView={handleShowModal}
                onEdit={(item) => handleEdit(item.id)}
                onDelete={(item) => handleDelete(item.id)}
            />

            {/* Alternative: Controlled modal approach */}
            {/* <ShowListModal
                trigger={<div style={{ display: 'none' }} />}
                title="Category Details"
                product={selectedProduct || undefined}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            /> */}
        </div>
    );
}