// components/show-list-modal.tsx
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react"
import { formatDate, formatTime } from "@/components/format-time-and-date"

interface ShowListModalProps {
    trigger: ReactNode;
    title?: string;
    description?: string;
    category?: Category; 
    unit?: Unit; 
    children?: ReactNode;
    open?: boolean
    onOpenChange?: (open: boolean) => void
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
    children
}: ShowListModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                
                {category && (
                    <div className="mt-4 space-y-3">
                        <div>
                            <label className="font-semibold text-sm text-gray-500 dark:text-white">ID</label>
                            <p className="text-gray-900 dark:text-white">#{category.id}</p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-500 dark:text-white">Category Name</label>
                            <p className="text-gray-900 dark:text-white">{category.category_name}</p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-500 dark:text-white">Description</label>
                            <p className="text-gray-900 dark:text-white">
                                {category.description || "No description available"}
                            </p>
                        </div>
                        <div>   
                            <label className="font-semibold text-sm text-gray-500 dark:text-white">Created At</label>
                            <p className="text-gray-900 dark:text-white">
                                {formatDate(category.created_at)} at {formatTime(category.created_at)}
                            </p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-500 dark:text-white">Last Updated</label>
                            <p className="text-gray-900 dark:text-white">
                                {formatDate(category.updated_at)} at {formatTime(category.updated_at)}
                            </p>
                        </div>
                    </div>
                )}

                {unit && (
                    <div className="mt-4 space-y-3">
                        <div>
                            <label className="font-semibold text-sm text-gray-500 dark:text-white">ID</label>
                            <p className="text-gray-900 dark:text-white">#{unit.id}</p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-500 dark:text-white">Unit Name</label>
                            <p className="text-gray-900 dark:text-white">{unit.unit_name}</p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-500 dark:text-white">Abbreviation</label>
                            <p className="text-gray-900 dark:text-white">
                                {unit.abbreviation || "No abbreviation available"}
                            </p>
                        </div>
                        <div>   
                            <label className="font-semibold text-sm text-gray-500 dark:text-white">Created At</label>
                            <p className="text-gray-900 dark:text-white">
                                {formatDate(unit.created_at)} at {formatTime(unit.created_at)}
                            </p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-500 dark:text-white">Last Updated</label>
                            <p className="text-gray-900 dark:text-white">
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