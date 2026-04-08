// tables/category.ts
import { formatDate, formatTime } from "@/components/format-time-and-date";

export const CategoryTable = () => {
    return {
        columns: [
            {
                label: 'ID',
                key: 'id',
            },
            {
                label: 'Category Name',
                key: 'category_name',
            },
            {
                label: 'Description',
                key: 'description',
                render: (value: string) => value || 'No description available'
            },
            {
                label: 'Created At',
                key: 'created_at',
                render: (value: string) => `${formatDate(value)} ${formatTime(value)}`
            },
            {
                label: 'Updated At',
                key: 'updated_at',
                render: (value: string) => `${formatDate(value)} ${formatTime(value)}`
            },
        ],
        actions: [
            {
                label: 'View',
                icon: 'Eye',
            },
            {
                label: 'Edit',
                icon: 'Pencil',
            }, 
            {
                label: 'Delete',
                icon: 'Trash',
            },
        ],
    };
};