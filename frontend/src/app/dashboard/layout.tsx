import { ReactNode } from 'react';
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarProvider,
} from "@/components/ui/sidebar"

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-background">
            <SidebarProvider className="w-64  h-screen "> {/* Static sidebar */}
                <AppSidebar/>
            </SidebarProvider>
            <main className="flex-1 p-4 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
