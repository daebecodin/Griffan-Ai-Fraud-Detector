import { faker } from '@faker-js/faker';

export interface Invoice {
    name: string;
    accountNum: string;
    accountType: string;
    accountBalance: number;
    lastTransactionDate: string;
    accountStatus: string;
    activeStatus: string;
    dateOfBirth: string;
    dateOfDeath: string;
    causeOfDeath: string;
    homeState: string;
    stateOfLastTransaction: string;
}

const states = ["California", "Texas", "New York", "Florida", "Ohio", "Nevada", "Illinois", "Arizona", "Georgia", "New Jersey", "Colorado"];

export async function getInvoices(): Promise<Invoice[]> {
    const invoices: Invoice[] = [];

    for (let i = 0; i < 200; i++) {
        const name = faker.person.fullName();
        const accountNum = `ACC${faker.number.int({ min: 10000, max: 99999 })}`;
        const accountType = faker.helpers.arrayElement(["Checking", "Savings", "Credit", "Loan"]);
        const accountBalance = faker.number.float({ min: 0, max: 15000 });
        const lastTransactionDate = faker.date.past().toISOString().split('T')[0];
        const dateOfBirth = faker.date.past({ years: 60 }).toISOString().split('T')[0];
        const dateOfDeath = faker.datatype.boolean() ? faker.date.past({ years: 5 }).toISOString().split('T')[0] : "N/A";
        const causeOfDeath = dateOfDeath !== "N/A" ? faker.helpers.arrayElement(["Natural Causes", "Accident", "Illness"]) : "N/A";
        const homeState = faker.helpers.arrayElement(states);
        const stateOfLastTransaction = faker.helpers.arrayElement(states);

        // Determine account status
        let accountStatus = "Yes";
        if (homeState !== stateOfLastTransaction) {
            accountStatus = "Under Review";
        }
        if (dateOfDeath !== "N/A" && new Date(dateOfDeath) < new Date(lastTransactionDate)) {
            accountStatus = "Fraud";
        }

        const activeStatus = faker.helpers.arrayElement(["Yes", "No"]);

        invoices.push({
            name,
            accountNum,
            accountType,
            accountBalance,
            lastTransactionDate,
            accountStatus,
            activeStatus,
            dateOfBirth,
            dateOfDeath,
            causeOfDeath,
            homeState,
            stateOfLastTransaction,
        });
    }

    return invoices;
}
