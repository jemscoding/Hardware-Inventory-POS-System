// tables/category.tsx
import { formatDate, formatTime } from "@/components/format-time-and-date";

export const ProductTable = {
    columns: [
        { key: 'id', label: 'ID' },
        { key: 'product_name', label: 'Product Name' },
        {
            key: 'description',
            label: 'Description',
            render: (value: string) => value || 'No description'
        },
        {
            key: 'wholesale_price',
            label: 'Wholesale Price',
            render: (value: number) => `₱${value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        },
        {
            key: 'sale_price',
            label: 'Sale Price',
            render: (value: number) => `₱${value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        },
        {
            key: 'stock_quantity',
            label: 'Stock Quantity',
            render: (value: number) => {
                const quantity = value || 0;
                const unit = quantity === 1 ? 'pc' : 'pcs';
                return `${quantity.toLocaleString('en-PH')} ${unit}`;
            }
        },
        {
            key: 'category',  // ← Simple key, no dot notation
            label: 'Category',
            render: (value: any, row: any) => row.category?.category_name || 'No Category'
        },
        {
            key: 'unit',  // ← Simple key, no dot notation
            label: 'Unit',
            render: (value: any, row: any) => row.unit?.unit_name || 'No Unit'
        },
        {
            key: 'created_at',
            label: 'Created Date',
            render: (value: string) => formatDate(value)
        },
        {
            key: 'updated_at',  // Fixed: changed from 'update_at' to 'updated_at'
            label: 'Updated Time',
            render: (value: string) => formatTime(value)
        }
    ],

    actions: ['view', 'edit', 'delete'],  // Fixed: changed from 'action' to 'actions'
};