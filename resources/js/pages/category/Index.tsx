import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { create } from "@/routes/categories";

interface Category {
    id: number;
    category_name: string;
    description: string;
    created_at: string;
    updated_at: string;
}
// convert the date format of created_at to a more readable format
function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Format time only
function formatTime(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
}

interface CategoryProps {
    categories: Category[];
}

export default function Index({ categories }: CategoryProps) {
    const [showCategories, setShowCategories] = useState<Category[]>([]);

    // Simulate loading delay for categories
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowCategories(categories);
        }, 1000); // Simulate loading delay of 1 second

        return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
    }, []);

    const handleDelete = (id: number) => {
        // Implement delete functionality here
        console.log(`Delete category with ID: ${id}`);
    }

    const handleEdit = (id: number) => {
        // Implement edit functionality here
        console.log(`Edit category with ID: ${id}`);
    }

    return (
        <div>
            <h1>Category List</h1>
            <Link href={create()} className="inline-block mt-4">
                <Button>Add Category</Button>
            </Link>

            <div className="space-x-4 mt-4 grid grid-cols-4">
                {showCategories.length === 0 ? <p>Loading...</p> : showCategories.map((category) => (
                    <Card key={category.id}>
                        <CardContent>
                            <span>#{category.id}</span>
                            <h2> Category Name: {category.category_name}</h2>
                            {!category.description && <p>No description available.</p>}
                            {category.description && <p> Description: {category.description}</p>}
                            <p>Created: {formatDate(category.created_at)} {formatTime(category.created_at)}</p>

                            <Link>
                                <Button onClick={() => handleEdit(category.id)} variant="outline">
                                    Edit
                                </Button>
                            </Link>

                            <Link>
                                <Button onClick={() => handleDelete(category.id)} variant="destructive">
                                    Delete
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>

        </div>
    );
}