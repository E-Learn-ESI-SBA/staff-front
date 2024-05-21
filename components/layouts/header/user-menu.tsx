"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";
import {TPayload} from "@/types";
import {useEffect, useState} from "react";

export function UserNav() {

    const router = useRouter();
    const logOutHandler = () => {
        jsCookie.remove("accessToken");
        jsCookie.remove("payload");
        jsCookie.remove("refreshToken");
        router.replace("/");
    };
    const [payload, setPayload] = useState<TPayload|null>(null)
    useEffect(() => {
      if (!payload) {

    try {
    const payloadStr = jsCookie.get('payload') ?? '{}'
    console.log(payloadStr)
    console.log(payloadStr)
     const parsedPayload = JSON.parse('{"token_type":"access","exp":1718551400,"iat":1715959400,"jti":"b3d943f6e8f049129573303fcca3ece4","id":"f34c48ca-9404-4036-9026-917b4a1240e8","avatar":"default","username":"teacher","email":"teacher@host.com","role":"teacher","group":"None","year":"None"}')
        console.log(parsedPayload)
        setPayload(parsedPayload)
    }catch (e) {
        console.log(e)
    }
      }
      return

    })
    if (!payload) return <></>
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="focus:outline-none">
                <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={payload?.avatar ?? "/store/img.jpg"} alt="@user" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{payload?.username}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {payload?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link
                            href="/app/profile"
                            className="flex justify-between w-full items-center"
                        >
                            Profile
                            <DropdownMenuShortcut>
                                <AvatarIcon />
                            </DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link
                            href="/app/settings"
                            className="flex justify-between w-full items-center"
                        >
                            Settings
                        </Link>
                        <DropdownMenuShortcut>
                            <GearIcon />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOutHandler}>
                    Log out
                    <DropdownMenuShortcut>
                        <ExitIcon />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}