"use client"
import { ColumnDef } from "@tanstack/react-table"


export type Invoice = {
    name: string;
    accountNum: string;
    accountType: string;
    accountBalance: number;
    lastTransactionDate: string;
    accountStatus: string;
    activeStatus: string;
}
export const invoices: Invoice[] = [
    {
        name: "Ashley Wilson",
        accountNum: "ACC10000",
        accountType: "Checking",
        accountBalance: 9187.06,
        lastTransactionDate: "2023-08-17",
        accountStatus: "Yes",
        activeStatus: "Yes",
    },
    {
        name: "Teresa Young",
        accountNum: "ACC10001",
        accountType: "Savings",
        accountBalance: 8478.26,
        lastTransactionDate: "2018-05-13",
        accountStatus: "No",
        activeStatus: "No",
    },
    {
        name: "Vincent Ward",
        accountNum: "ACC10002",
        accountType: "Credit",
        accountBalance: 8343.97,
        lastTransactionDate: "2017-05-10",
        accountStatus: "No",
        activeStatus: "Yes",
    },
    {
        name: "Elizabeth Lopez",
        accountNum: "ACC10003",
        accountType: "Checking",
        accountBalance: 4360.14,
        lastTransactionDate: "2018-03-02",
        accountStatus: "Yes",
        activeStatus: "Yes",
    },
    {
        name: "Louis Rivera",
        accountNum: "ACC10004",
        accountType: "Savings",
        accountBalance: 978.34,
        lastTransactionDate: "2021-05-19",
        accountStatus: "No",
        activeStatus: "No",
    },
    {
        name: "Grace Alexander",
        accountNum: "ACC10005",
        accountType: "Loan",
        accountBalance: 6903.18,
        lastTransactionDate: "2018-12-09",
        accountStatus: "Yes",
        activeStatus: "Yes",
    },
    {
        name: "Jeremy Walker",
        accountNum: "ACC10006",
        accountType: "Checking",
        accountBalance: 3284.44,
        lastTransactionDate: "2023-04-29",
        accountStatus: "No",
        activeStatus: "No",
    },
    {
        name: "Brian Anderson",
        accountNum: "ACC10007",
        accountType: "Savings",
        accountBalance: 724.13,
        lastTransactionDate: "2021-01-19",
        accountStatus: "Yes",
        activeStatus: "No",
    },
    {
        name: "Jeremy Walker",
        accountNum: "ACC10008",
        accountType: "Savings",
        accountBalance: 5417.91,
        lastTransactionDate: "2019-03-08",
        accountStatus: "No",
        activeStatus: "Yes",
    },
    {
        name: "Michael Williams",
        accountNum: "ACC10009",
        accountType: "Loan",
        accountBalance: 1387.39,
        lastTransactionDate: "2020-05-07",
        accountStatus: "No",
        activeStatus: "No",
    },
];
