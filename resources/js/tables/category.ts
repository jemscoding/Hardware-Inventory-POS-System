// tables/category.tsx
import { formatDate, formatTime } from "@/components/format-time-and-date";

export function CategoryTable() {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'category_name', label: 'Category Name' },
        { 
            key: 'description', 
            label: 'Description',
            render: (value: string) => value || 'No description'
        },
        { 
            key: 'created_at', 
            label: 'Created Date',
            render: (value: string) => formatDate(value)
        },
        { 
            key: 'update_at', 
            label: 'Updated Time',
            render: (value: string) => formatTime(value)
        }
    ];

    const actions = ['view', 'edit', 'delete'];

    return { columns, actions };
}