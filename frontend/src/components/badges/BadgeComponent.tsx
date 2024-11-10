import React from 'react';
import { Badge } from '@/components/ui/badge';

interface BadgeComponentProps {
    status: string;
}

export function BadgeComponent({ status }: BadgeComponentProps) {
    const getBadgeVariant = (status: string) => {
        switch (status) {
            case 'suspicion':
                return 'secondary'; // Replace 'warning' with a valid variant
            case 'clear':
                return 'secondary'; // Replace 'success' with a valid variant
            case 'closed':
                return 'destructive';
            case 'fraud':
                return 'destructive';
            case 'Yes':
                return 'secondary'; // Replace 'success' with a valid variant
            case 'No':
                return 'destructive';
            default:
                return 'default';
        }
    };


    return <Badge variant={getBadgeVariant(status)}>{status === 'Yes' ? 'Active' : 'Inactive'}</Badge>;
}
