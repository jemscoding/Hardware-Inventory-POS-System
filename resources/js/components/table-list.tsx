// components/table-list.tsx
import { Eye, Pencil, Trash } from "lucide-react";

interface Column {
    label: string;
    key: string;
    render?: (value: any, item: any) => React.ReactNode;
}

interface TableListProps {
    columns: Column[];
    data: any[];
    actions?: string[];
    onView?: (item: any) => void;
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
}

export default function TableList({ 
    columns, 
    data, 
    actions = ['view', 'edit', 'delete'], 
    onView, 
    onEdit, 
    onDelete 
}: TableListProps) {
    return (
        <div className="overflow-x-auto border-2 border-gray-200 rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.label}
                            </th>
                        ))}
                        {actions.length > 0 && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr key={item.id || index} className="hover:bg-gray-50">
                            {columns.map((column) => (
                                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {column.render 
                                        ? column.render(item[column.key], item)
                                        : item[column.key] || '-'}
                                </td>
                            ))}
                            {actions.length > 0 && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex gap-2">
                                        {actions.includes('view') && onView && (
                                            <button
                                                onClick={() => onView(item)}
                                                className="text-blue-600 hover:text-blue-900 transition-colors cursor-pointer"
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        )}
                                        {actions.includes('edit') && onEdit && (
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="text-green-600 hover:text-green-900 transition-colors cursor-pointer"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        )}
                                        {actions.includes('delete') && onDelete && (
                                            <button
                                                onClick={() => onDelete(item)}
                                                className="text-red-600 hover:text-red-900 transition-colors cursor-pointer"
                                                title="Delete"
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}