import ContactForm from "@/components/alert-form";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function ReportDropdownButton() {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        Send Report
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Send a Report</DialogTitle> {/* Added DialogTitle */}
                    </DialogHeader>
                    <ContactForm />
                </DialogContent>
            </Dialog>
        </div>
    );
}
