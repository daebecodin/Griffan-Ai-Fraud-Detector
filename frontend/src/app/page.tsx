import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function Home() {
    return (
        <div className="grid grid-cols-2 min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background">
            {/* Left Side */}
            <div className="flex flex-col p-5 gap-3 h-full">
                <main className="flex flex-col gap-8 row-start-2 items-start font-poppins text-text text-h1 font-bold w-full">
                    <p>Griffin</p>
                </main>
                <footer className="row-start-3 flex gap-6 flex-wrap items-start justify-start w-full">
                    <p className={"text-text text-h5"}>
                        Real-time fraud detection to secure bank accounts and protect families,
                        using advanced analytics and diverse data sources.
                    </p>

                </footer>
            </div>

            {/* Right Side */}
            <div className="flex flex-col p-5 bg-blue-50 gap-3 h-full">
                <main className="flex flex-col gap-8 row-start-2 items-start font-poppins text-text text-h1 font-bold bg-secondary w-full">
                    <p>Right Side Content</p>
                </main>
                <footer className="row-start-3 flex gap-6 flex-wrap items-start justify-start w-full">
                    <p className={"text-text text-h5 bg-accent"}>
                        Additional content or similar information can be displayed here.
                    </p>
                    <Button asChild>
                        <Link href="/dashboard">Get started</Link>
                    </Button>

                </footer>
            </div>
        </div>
    );
}
