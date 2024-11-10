"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Invoice, invoices } from '@/app/utils/dummyTableData';

interface UserProfilePageProps {
    params: Promise<{
        accNum: string;
    }>;
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
    const router = useRouter();
    const [resolvedParams, setResolvedParams] = useState<{ accNum: string } | null>(null);
    const [user, setUser] = useState<Invoice | null>(null);

    // Use useEffect to resolve the async params
    useEffect(() => {
        async function fetchParams() {
            const resolved = await params;
            setResolvedParams(resolved);

            // Find the user based on the provided account number
            const foundUser = invoices.find((u: Invoice) => u.accountNum === resolved.accNum) || null;
            setUser(foundUser);
        }

        fetchParams();
    }, [params]);

    if (!resolvedParams) {
        // While waiting for params to resolve
        return <div className="p-4">Loading...</div>;
    }

    if (!resolvedParams.accNum) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold">Invalid Request</h1>
                <p>Account number is missing. Please try again.</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => router.push('/')} // Redirect to home or any other page
                >
                    Go Home
                </button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold">User not found</h1>
                <p>No user found with the provided account number.</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => router.push('/')} // Redirect to home or any other page
                >
                    Go Home
                </button>
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
            {user.dateOfBirth && <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>}
            {user.dateOfDeath && <p><strong>Date of Death:</strong> {user.dateOfDeath}</p>}
            {user.causeOfDeath && <p><strong>Cause of Death:</strong> {user.causeOfDeath}</p>}
            <p><strong>Home State:</strong> {user.homeState}</p>
            <p><strong>State of Last Transaction:</strong> {user.stateOfLastTransaction}</p>
        </div>
    );
}
