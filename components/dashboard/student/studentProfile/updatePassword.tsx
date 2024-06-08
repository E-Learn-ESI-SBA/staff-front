'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { STAFF_BASE_URL } from "@/config/constants";
import { useUserStore } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type UpdatePassword = {
    old_password: string;
    new_password: string;
}



export function UpdatePassword() {
    const passwordSchemaValidator = z.object({
        old_password: z.string().min(10, { message: "password must be at least 10 characters long" }),
        new_password: z.string().min(10, { message: "password must be at least 10 characters long" })
    });

    const form = useForm<UpdatePassword>({
        resolver: zodResolver(passwordSchemaValidator),
        mode: "onChange",
    });

    const state = useUserStore()
    const updateHandler = async (data: UpdatePassword) => {
        try {
            const res = await fetch(`${STAFF_BASE_URL}/auth/update-password/`, {
                method: 'PATCH',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state?.user?.accessToken}`,
                },
                body: JSON.stringify(data)
            })
            const response = await res.json()
            if (!res.ok) {
                toast.error(response?.error || response?.message || response?.detail || "Something went wrong", {
                    style: {
                        background: "red",
                        color: "white"
                    }
                });
            } else {
                toast.success("Password updated successfully", {
                    style: {
                        background: "green",
                        color: "white"
                    }
                })
            }
        } catch (err: any) {
            toast.error(err?.error || err?.message || err?.detail || "Something went wrong", {
                style: {
                    background: "red",
                    color: "white"
                }
            });
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Update Password</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Password</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((data) => {
                            updateHandler(data)
                        })}
                        className="space-y-8 flex flex-col gap-4  w-full p-4"
                    >
                        <div className="flex gap-4 flex-col">
                            <FormField
                                control={form.control}
                                name="old_password"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Old Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Old password here..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="new_password"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="New password here..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <DialogFooter>
                            <Button type="submit" className="w-fit self-end">
                                Update password
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}


