import { Invoice, invoices } from '@/app/utils/dummyTableData';

export default async function UserProfilePage({ params }: { params: { accNum: string } }) {
    // If params is a Promise, await it
    // const resolvedParams = await params;

    // Logging for debugging
    console.log("params.accNum:", params.accNum);

    // Filter and find matching users based on account number
    const matchingUsers = invoices.filter((u: Invoice) => u.accountNum === params.accNum);
    console.log("Matching users found:", matchingUsers);

    // Warning if no matching user found
    if (matchingUsers.length === 0) {
        console.warn("No matching user found");
    }

    // Find the first matching user based on accNum
    const user = invoices.find((u: Invoice) => u.accountNum === params.accNum);

    // Handle case where no user is found
    if (!user) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold">User not found</h1>
                <p>Please check the account number and try again.</p>
            </div>
        );
    }

    // Render user details
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p><strong>Account Number:</strong> {user.accountNum}</p>
            <p><strong>Account Type:</strong> {user.accountType}</p>
            <p><strong>Account Balance:</strong> {user.accountBalance}</p>
            <p><strong>Last Transaction Date:</strong> {user.lastTransactionDate}</p>
            <p><strong>Account Status:</strong> {user.accountStatus}</p>
            <p><strong>Active Status:</strong> {user.activeStatus}</p>
            <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
            <p><strong>Date of Death:</strong> {user.dateOfDeath}</p>
            <p><strong>Cause of Death:</strong> {user.causeOfDeath}</p>
            <p><strong>Home State:</strong> {user.homeState}</p>
            <p><strong>State of Last Transaction:</strong> {user.stateOfLastTransaction}</p>
        </div>
    );
}
