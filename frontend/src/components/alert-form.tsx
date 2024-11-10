import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Fill out the form below to get in touch with us.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="firstname">First Name</Label>
                            <Input id="firstname" placeholder="Enter your first name" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input id="lastname" placeholder="Enter your last name" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="Enter the subject" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Type your message here" rows={4} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Submit</Button>
            </CardFooter>
        </Card>
    )
}