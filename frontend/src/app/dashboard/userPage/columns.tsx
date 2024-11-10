"use client"

import { ColumnDef } from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Account = {
    name: string
    accNum: number
    status: "open" | "closed" | "pending" | "fraud"
    type: "checking" | "saving" | "credit"
}

export const columns: ColumnDef<Account>[] = [
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
        accessorKey: "accNum",
        header: "Account Number",
    },
    {
        accessorKey: "type",
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
            const payment = row.original

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
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.status)}
                        >
                            Send Message
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View User</DropdownMenuItem>
                        {/*<DropdownMenuItem>View payment details</DropdownMenuItem>*/}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
