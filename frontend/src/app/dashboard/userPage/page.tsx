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
        <Table className={" bg-accent"}>
            <TableCaption>Something Else</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-secondary">Name</TableHead>
                    <TableHead className={"text-secondary "}>Acc #</TableHead>
                    <TableHead className={"text-secondary"}>Acc Status</TableHead>
                    <TableHead className="text-right text-secondary">Fraud Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => {
                    // Determine the background color based on fraudStatus
                    let textBgColor = '';
                    if (invoice.activeStatus === 'No') textBgColor = 'bg-red-500 text-white';
                    else if (invoice.overdraftStatus === 'No') textBgColor = 'bg-green-500 text-white';
                    // else if (invoice.fraudStatus === 'Suspected') textBgColor = 'bg-yellow-500 text-black';

                    return (
                        <TableRow key={invoice.accNum} className="">
                            <TableCell className="font-medium gap-3">
                                <Link href={`/dashboard/userPage/${invoice.accNum}`} className="text-primary text-h5 font-bold">
                                    {invoice.name}
                                </Link>
                            </TableCell>
                            <TableCell>{invoice.accNum}</TableCell>
                            <TableCell>{invoice.overdraftStatus}</TableCell>
                            <TableCell className="text-right">
                                <span className={`px-2 py-1 rounded ${textBgColor}`}>
                                    {invoice.activeStatus}
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
