// import React from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableFooter,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from '@/components/ui/table';
// import Link from 'next/link';
// import { invoices } from '@/app/utils/dummyTableData';
// import { Invoice } from '@/app/utils/dummyTableData'; // Assuming Invoice type is exported
//
// export default function UserPage() {
//     return (
//         <Table className="bg-accent h-full">
//             <TableHeader>
//                 <TableRow>
//                     <TableHead className="w-[100px] text-secondary">Name</TableHead>
//                     <TableHead className="text-secondary">Acc #</TableHead>
//                     <TableHead className="text-secondary">Acc Status</TableHead>
//                     <TableHead className="text-right text-secondary">Fraud Status</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {invoices.map((invoice: Invoice) => {
//                     // Determine the background color based on the active status
//                     let textBgColor = '';
//                     if (invoice.activeStatus === 'No') textBgColor = 'bg-red-500 text-white';
//                     else if (invoice.activeStatus === 'Yes') textBgColor = 'bg-green-500 text-white';
//
//                     return (
//                         <TableRow key={invoice.accountNum} className="border-b rounded-lg shadow-md">
//                             <TableCell className="font-medium">
//                                 <Link
//                                     href={`/dashboard/userPage/${invoice.accountNum}`}
//                                     className="text-primary text-h5 font-bold"
//                                 >
//                                     {invoice.name}
//                                 </Link>
//                             </TableCell>
//                             <TableCell>{invoice.accountNum}</TableCell>
//                             <TableCell>{invoice.accountStatus}</TableCell>
//                             <TableCell className="text-right">
//                 <span className={`px-2 py-1 rounded ${textBgColor}`}>
//                   {invoice.activeStatus}
//                 </span>
//                             </TableCell>
//                         </TableRow>
//                     );
//                 })}
//             </TableBody>
//             <TableFooter>
//                 <TableRow>
//                     <TableCell colSpan={3}>IDKKK</TableCell>
//                     <TableCell className="text-right">IDKKKK</TableCell>
//                 </TableRow>
//             </TableFooter>
//         </Table>
//     );
// }

import { columns } from "@/app/dashboard/userPage/columns"
import { DataTable } from "./data-table"
import {getInvoices} from "@/app/utils/dummyTableData";

// async function getData(): Promise<Account[]> {
//     // Fetch data from your API here.
//     return [
//         {
//             name: "Bob",
//             accNum: 124532,
//             status: "open",
//             type: "checking",
//         },
//         // ...
//     ]
// }

export default async function DemoPage() {
    const data = await getInvoices()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
