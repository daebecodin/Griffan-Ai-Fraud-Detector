"use client"

import { ColumnDef } from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal} from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import {Checkbox} from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import ContactForm from "@/components/alert-form";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Invoice} from "@/app/utils/dummyTableData";
import Link from "next/link";



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



export const columns: ColumnDef<Invoice>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        )
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "accountNum",
        header: "Account Number",
    },
    {
        accessorKey: "accountType",
        header: "Account Type",
    },
    {
        accessorKey: "accountStatus",
        header: () => <div className="text-right">Status</div>,
        cell: ({ row }) => {
            const status:string = row.getValue("accountStatus")

            return <div className="text-right font-medium">{status}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const accNum = row.original.accountNum

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="ghost">Send Report</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Send a Report</DialogTitle>
                                    </DialogHeader>
                                    <ContactForm />
                                </DialogContent>
                            </Dialog>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <Link href={`/dashboard/userPage/${accNum}`}>
                            <DropdownMenuItem>View User</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>


            )
        },
    },
]
