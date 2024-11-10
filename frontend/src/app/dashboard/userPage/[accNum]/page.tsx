import { Invoice, invoices } from '@/app/utils/dummyTableData'; // Correct import statement

interface UserProfilePageProps {
    params: { accNum: string };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
    // Debugging code to check params and matching logic
    console.log("params.accNum:", params.accNum);
    const matchingUsers = invoices.filter(u => u.accountNum === params.accNum);
    console.log("Matching users found:", matchingUsers);
    if (matchingUsers.length === 0) {
        console.warn("No matching user found");
    }

    // Find the matching invoice based on accNum
    const user = invoices.find((u: Invoice) => u.accountNum === params.accNum);

    if (!user) {
        return <div>User not found</div>;
    }

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
