import { AppSidebar } from "@/components/app-sidebar"
import { NavActions } from "@/components/nav-actions"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export default function MainDashboardPage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2 bg-accent">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger className={"text-text"} />
                        <Separator orientation="vertical" className="mr-2 h-4 text-pretty" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1 text-text">
                                        Real Time Fraud Detection
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto px-3">
                        <NavActions />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 px-4 py-10 bg-accent">
                    <div className="mx-auto h-24 w-full max-w-3xl  bg-accent text-text" >
                        <p className={"text-h1"}>Content</p>
                    </div>
                    <div className="mx-auto h-full w-full max-w-3xl  bg-accent" >
                        <p className={"text-h1 text-text"}>Content</p>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
