export type Invoice = {
    name: string;
    accountNum: string;
    accountType: string;
    accountBalance: number;
    accountStatus: "suspicion" | "clear" | "closed" | "fraud";
    activeStatus: string;
}