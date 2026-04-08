// components/table-list.tsx
import { useState, useEffect, ReactNode } from "react";
import Table from "./table";

interface Column {
    label: string;
    key: string;
    render?: (value: any, item: any) => ReactNode;
}

interface Action {
    label: string;
    icon: string;
}

interface TableListProps {
    columns: Column[];
    data: any[];
    actions?: Action[];  // Add actions prop
    loadingDelay?: number;
    emptyMessage?: string;
    loadingMessage?: string;
    onView?: (item: any) => void;
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
}

export default function TableList({ 
    columns, 
    data: initialData, 
    actions,  // Add actions parameter
    loadingDelay = 1000,
    emptyMessage = "No data found.",
    loadingMessage = "Loading data...",
    onView,
    onEdit,
    onDelete
}: TableListProps) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setData(initialData);
            setLoading(false);
        }, loadingDelay);

        return () => clearTimeout(timeoutId);
    }, [initialData, loadingDelay]);

    if (loading) {
        return (
            <div className="overflow-x-auto border-2 border-gray-200 rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {col.label}
                                </th>
                            ))}
                            {actions && actions.length > 0 && (
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-4 text-center">
                                <p className="text-gray-500">{loadingMessage}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <Table 
            columns={columns} 
            data={data}
            actions={actions}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    );
}