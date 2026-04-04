import { Card, CardContent } from "@/components/ui/card";
import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { create } from "@/routes/categories";
import { formatDate, formatTime } from "@/components/format-time-and-date";

// Define the Category interface
interface Category {
    id: number;
    category_name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

// Define the props for the Category Index component
interface CategoryProps {
    categories: Category[];
}

export default function Index({ categories }: CategoryProps) {
    const [showCategories, setShowCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    // Simulate loading delay for categories
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowCategories(categories);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [categories]);

    // Handle show action - navigate to show page
    const handleShow = (id: number) => {
        console.log(`View category with ID: ${id}`);
        router.visit(`/categories/${id}`);
    };

    // Handle edit action - navigate to edit page
    const handleEdit = (id: number) => {
        console.log(`Edit category with ID: ${id}`);
        router.visit(`/categories/${id}/edit`);
    };

    // Handle delete action
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            console.log(`Delete category with ID: ${id}`);
            router.delete(`/categories/${id}`, {
                onSuccess: () => {
                    // Optionally show success message or refresh
                    console.log('Category deleted successfully');
                },
                onError: (errors) => {
                    console.error('Error deleting category:', errors);
                }
            });
        }
    };

    if (loading) {
        return (
            <div className="container mx-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Category List</h1>
                    <Link href={create()} className="inline-block">
                        <Button>Add Category</Button>
                    </Link>
                </div>
                <p>Loading categories...</p>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-6 mx-8">
                <h1 className="text-3xl font-bold">Category List</h1>
                <Link href={create()} className="inline-block">
                    <Button>Add Category</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 mx-8">
                {showCategories.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No categories found.</p>
                ) : (
                    showCategories.map((category) => (
                        <Card key={category.id} className="relative">
                            <CardContent className="py-2">
                                <div className="space-y-2">
                                    <span className="text-sm text-gray-500">#{category.id}</span>
                                    <h2 className="text-xl font-semibold">Category Name: {category.category_name}</h2>
                                    {!category.description && <p className="text-gray-400 italic">No description available.</p>}
                                    {category.description && <p className="text-gray-600">Description: {category.description}</p>}
                                    <p className="text-sm text-gray-500">
                                        Created: {formatDate(category.created_at)} {formatTime(category.created_at)}
                                    </p>

                                    <div className="flex gap-2 mt-4">
                                        <Button
                                            onClick={() => handleShow(category.id)}
                                            variant="secondary"
                                            size="sm"
                                        >
                                            View
                                        </Button>
                                        <Button
                                            onClick={() => handleEdit(category.id)}
                                            variant="outline"
                                            size="sm"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(category.id)}
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
        </div>
    );
}