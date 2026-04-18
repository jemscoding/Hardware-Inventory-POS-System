// pages/categories/index.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { create, edit } from "@/routes/categories";
import { formatDate, formatTime } from "@/components/format-time-and-date";
import ShowListModal from "@/components/show-list-modal";
import type { Category } from "@/types/category";
import TableList from "@/components/table-list";
import { CategoryTable } from "@/tables/category";

interface CategoryProps {
    categories: Category[];
}

export default function Index({ categories }: CategoryProps) {
    // shows lists of categories
    const [showCategories, setShowCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards'); // Add view mode toggle

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowCategories(categories);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [categories]);

    const handleShowModal = (category: Category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleEdit = (id: number) => {
        console.log(`Edit category with ID: ${id}`);
        router.visit(`/categories/${id}/edit`);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            console.log(`Delete category with ID: ${id}`);
            router.delete(`/categories/${id}`, {
                onSuccess: () => {
                    console.log('Category deleted successfully');
                },
                onError: (errors) => {
                    console.error('Error deleting category:', errors);
                }
            });
        }
    };

    // Get table configuration (call the function)
    const tableConfig = CategoryTable();
    const { columns, actions } = tableConfig;

    if (loading) {
        return (
            <div className="container py-8">
                <div className="flex justify-between items-center mx-8">
                    <h1 className="text-3xl font-bold">Category List</h1>
                    <Link href={create()} className="inline-block">
                        <Button>Add Category</Button>
                    </Link>
                </div>
                <p className="mx-8 my-4">Loading categories...</p>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-6 mx-8">
                <h1 className="text-3xl font-bold">Category List</h1>
                <div className="flex gap-2">
                    {/* View mode toggle buttons */}
                    <Button
                        variant={viewMode === 'cards' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('cards')}
                    >
                        Card View
                    </Button>
                    <Button
                        variant={viewMode === 'table' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('table')}
                    >
                        Table View
                    </Button>
                    <Link href={create()} className="inline-block">
                        <Button>Add Category</Button>
                    </Link>
                </div>
            </div>

            {/* Card View */}
            {viewMode === 'cards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 mx-8">
                    {showCategories.length === 0 ? (
                        <p className="col-span-full text-center text-gray-500">No categories found.</p>
                    ) : (
                        showCategories.map((category) => (
                            <Card key={category.id} className="relative h-full flex flex-col">
                                <CardContent className="py-4 flex-1 flex flex-col">
                                    <div className="space-y-2 flex-1">
                                        <span className="text-sm text-gray-500">#{category.id}</span>
                                        <h2 className="text-xl font-semibold">Category Name: {category.category_name}</h2>
                                        {!category.description && <p className="text-gray-400 italic">No description available.</p>}
                                        {category.description && <p className="text-gray-600">Description: {category.description}</p>}
                                        <p className="text-sm text-gray-500">
                                            Created: {formatDate(category.created_at)} {formatTime(category.created_at)}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <ShowListModal
                                            trigger={
                                                <Button variant="outline" size="sm">
                                                    View Details
                                                </Button>
                                            }
                                            title="Category Details"
                                            description={`Information for category: ${category.category_name}`}
                                            category={category}
                                        />

                                        <Link href={edit(category.id)}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>

                                        <Button
                                            onClick={() => handleDelete(category.id)}
                                            variant="destructive"
                                            size="sm"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}

            {/* Table View */}
            {viewMode === 'table' && (
                <div className="mt-4 mx-8">
                    <TableList
                        columns={columns}
                        actions={actions}
                        data={showCategories}
                        onView={handleShowModal}
                        onEdit={(item) => handleEdit(item.id)}
                        onDelete={(item) => handleDelete(item.id)}
                    />
                </div>
            )}

            {/* Controlled modal for table view */}
            <ShowListModal
                trigger={<div style={{ display: 'none' }} />}
                title="Category Details"
                category={selectedCategory || undefined}
                description={selectedCategory ? `Information for category: ${selectedCategory.category_name}` : ''}
                open={isModalOpen}
                onOpenChange={(open) => {
                    console.log('Modal open state changed to:', open);
                    setIsModalOpen(open);
                }}
            />
        </div>
    );
}