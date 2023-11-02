"use client";

import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Course>[] = [
    {
        accessorKey: "title",
        // header: "Title",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center justify-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </button>
            );
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center justify-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </button>
            );
        },
        cell: ({ row }) => {
            const { price } = row.original;
            if (!price) return "Free";
            return formatPrice(price);
        },
    },
    {
        accessorKey: "isPublished",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center justify-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Published
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </button>
            );
        },
        cell: ({ row }) => {
            const { isPublished } = row.original;
            return (
                <Badge className={cn("bg-slate-500", isPublished && "bg-sky-700")}>{isPublished ? "Yes" : "No"}</Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button>
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/teacher/courses/${id}`}>
                            <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
