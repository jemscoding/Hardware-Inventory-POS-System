// components/show-list-modal.tsx
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useState } from "react"
import { formatDate, formatTime } from "@/components/format-time-and-date"

interface ShowListModalProps {
    trigger: ReactNode;
    title?: string;
    description?: string;
    category?: Category; 
    unit?: Unit; 
    children?: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

interface Category {
    id: number;
    category_name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface Unit {
    id: number;
    unit_name: string;
    abbreviation: string;
    created_at: string;
    updated_at: string;
}

export default function ShowListModal({ 
    trigger, 
    title = "Details",
    description,
    category,
    unit,
    children,
    open: controlledOpen,
    onOpenChange
}: ShowListModalProps) {
    // Internal state for uncontrolled mode
    const [internalOpen, setInternalOpen] = useState(false);
    
    // Determine if we're in controlled or uncontrolled mode
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;
    const setIsOpen = isControlled ? onOpenChange! : setInternalOpen;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                
                {category && (
                    <div className="mt-4 space-y-3">
                        <div className="border-b pb-2">
                            <label className="font-semibold text-sm text-gray-500 dark:text-gray-400 block">ID</label>
                            <p className="text-gray-900 dark:text-white mt-1">#{category.id}</p>
                        </div>
                        <div className="border-b pb-2">
                            <label className="font-semibold text-sm text-gray-500 dark:text-gray-400 block">Category Name</label>
                            <p className="text-gray-900 dark:text-white mt-1 font-medium">{category.category_name}</p>
                        </div>
                        <div className="border-b pb-2">
                            <label className="font-semibold text-sm text-gray-500 dark:text-gray-400 block">Description</label>
                            <p className="text-gray-900 dark:text-white mt-1">
                                {category.description || "No description available"}
                            </p>
                        </div>
                        <div className="border-b pb-2">
                            <label className="font-semibold text-sm text-gray-500 dark:text-gray-400 block">Created At</label>
                            <p className="text-gray-900 dark:text-white mt-1">
                                {formatDate(category.created_at)} at {formatTime(category.created_at)}
                            </p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-500 dark:text-gray-400 block">Last Updated</label>
                            <p className="text-gray-900 dark:text-white mt-1">
                                {formatDate(category.updated_at)} at {formatTime(category.updated_at)}
                            </p>
                        </div>
                    </div>
                )}

                {unit && (
                    <div className="mt-4 space-y-3">
                        <div className="border-b pb-2">
                            <label className="font-semibold text-sm text-gray-500 dark:text-gray-400 block">ID</label>
                            <p className="text-gray-900 dark:text-white mt-1">#{unit.id}</p>
                        </div>
                        <div className="border-b pb-2">
                            <label className="font-semibold text-sm text-gray-500 dark:text-gray-400 block">Unit Name</label>
                            <p className="text-gray-900 dark:text-white mt-1 font-medium">{unit.unit_name}</p>
                        </div>
                        <div className="border-b pb-2">
                            <label className="font-semibold text-sm text-gray-500 dark:text-gray-400 block">Abbreviation</label>
                            <p className="text-gray-900 dark:text-white mt-1">
                                {unit.abbreviation || "No abbreviation available"}
                            </p>
                        </div>
                        <div className="border-b pb-2">
                            <label className="font-semibold text-sm text-gray-500 dark:text-gray-400 block">Created At</label>
                            <p className="text-gray-900 dark:text-white mt-1">
                                {formatDate(unit.created_at)} at {formatTime(unit.created_at)}
                            </p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-500 dark:text-gray-400 block">Last Updated</label>
                            <p className="text-gray-900 dark:text-white mt-1">
                                {formatDate(unit.updated_at)} at {formatTime(unit.updated_at)}
                            </p>
                        </div>
                    </div>
                )}
                
                {children}
            </DialogContent>
        </Dialog>
    );
}