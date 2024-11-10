import { invoices } from '@/app/utils/dummyTableData'; // Adjust the import path as necessary

interface UserProfilePageProps {
    params: { accNum: string };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
    // Find the matching invoice based on accNum
    const user = invoices.find((u) => u.accNum === params.accNum);

    if (!user) {
        return <div>User not found</div>;
    }

    // Determine the background color based on fraudStatus
    let textBgColor = '';
    if (user.overdraftStatus === 'Yes') textBgColor = 'bg-red-500 text-white';
    else if (user.overdraftStatus === 'No') textBgColor = 'bg-green-500 text-white';
    else if (user.overdraftStatus === 'Suspected') textBgColor = 'bg-yellow-500 text-black';

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p><strong>Account Number</strong> {user.accNum}</p>
            <p><strong>Account Type</strong> {user.accountType}</p>
            <p><strong>Balance</strong> {user.accountBalance}</p>
            <p>
                <strong>Account Status:</strong>{' '}
                <span className={`px-2 py-1 rounded ${textBgColor}`}>
                    {user.activeStatus}
                </span>
            </p>
        </div>
    );
}
