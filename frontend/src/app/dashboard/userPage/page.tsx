import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import Link from 'next/link';
import { invoices } from "@/app/utils/dummyTableData";

export default function UserPage() {
    return (
        <Table>
            <TableCaption>Something Else</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Acc #</TableHead>
                    <TableHead>Acc Status</TableHead>
                    <TableHead className="text-right">Fraud Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => {
                    // Determine the background color based on fraudStatus
                    let textBgColor = '';
                    if (invoice.fraudStatus === 'Fraud') textBgColor = 'bg-red-500 text-white';
                    else if (invoice.fraudStatus === 'Safe') textBgColor = 'bg-green-500 text-white';
                    else if (invoice.fraudStatus === 'Suspected') textBgColor = 'bg-yellow-500 text-black';

                    return (
                        <TableRow key={invoice.accNum} className="hover:bg-gray-100">
                            <TableCell className="font-medium">
                                <Link href={`/dashboard/userPage/${invoice.accNum}`} className="text-blue-600 hover:underline">
                                    {invoice.name}
                                </Link>
                            </TableCell>
                            <TableCell>{invoice.accNum}</TableCell>
                            <TableCell>{invoice.accountStatus}</TableCell>
                            <TableCell className="text-right">
                                <span className={`px-2 py-1 rounded ${textBgColor}`}>
                                    {invoice.fraudStatus}
                                </span>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>IDKKK</TableCell>
                    <TableCell className="text-right">IDKKKK</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
