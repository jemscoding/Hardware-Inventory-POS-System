import { Card, CardContent } from "@/components/ui/card";
import { index } from '@/routes/categories'
import { formatDate, formatTime } from "@/components/format-time-and-date";
import { Link} from "@inertiajs/react";
import { Button } from "@/components/ui/button";

interface Category {
    id: number;
    category_name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface CategoryProps {
    category: Category;
}

export default function Show({ category }: CategoryProps) {

    return (
        <div className="container mx-auto py-8 max-w-2xl">
            <Card>
                <CardContent>
                    <span>#{category.id}</span>
                    <h2> Category Name: {category.category_name}</h2>
                    {!category.description && <p>No description available.</p>}
                    {category.description && <p> Description: {category.description}</p>}
                    <p>Created: {formatDate(category.created_at)} {formatTime(category.created_at)}</p>

                    <Link href = {index()}>
                        <Button variant="outline" size="sm" className="mt-4">
                            Back to Categories
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}