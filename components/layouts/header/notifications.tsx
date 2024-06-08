import { BellIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {ScrollArea} from "@/components/ui/scroll-area";
const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
];

type CardProps = React.ComponentProps<typeof Card>;

export function Notifications({ className, ...props }: CardProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <BellIcon  className="cursor-pointer w-6 h-6 text-blue-origin" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[340px] bg-white p-2"
                align="end"
                forceMount
            >
                <Card className={cn("w-full", className)} {...props}>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>You have 3 unread messages.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex w-full flex-col items-center h-72 gap-4">
                        <ScrollArea>
                        {notifications.map((notification, index) => (
                            <div
                                key={index}
                                className="mb-4 w-full  flex gap-4 hover:bg-accent p-2 rounded-lg cursor-pointer  items-start "
                            >
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-origin" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {notification.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {notification.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                        </ScrollArea>
                    </CardContent>

                </Card>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
