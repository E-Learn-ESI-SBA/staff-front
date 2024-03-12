import { redirect } from "next/navigation";
import { Button } from "../../@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../@/components/ui/form";
import { Input } from "../../@/components/ui/input";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from "../../hooks/auth/useAuth";

export const authSchema = z.object({
	email: z.string().email().min(2, 'Email is required'),
	password: z.string().min(4, 'Invalid password'),
});


export type TAuthSchema = z.infer<typeof authSchema>;


export function SignInAccount() {
	const form = useForm<TAuthSchema>({
		mode: 'onChange',
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const { loginHandler } = useAuth(redirect);
	async function submitHandler(values: TAuthSchema) {
		await loginHandler(values.email, values.password);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col gap-6 max-w-[380px]">
				<CardHeader className=" my-8">
					<CardTitle className="text-4xl my-6 text-center font-bold">Hello! Welcome Back</CardTitle>
					<CardDescription className="text-center text-gray-500 text-sm">use your email/password combination to login</CardDescription>
				</CardHeader>
				{}
				<CardContent className="grid gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className=" flex flex-col gap-2">
								<FormLabel>Email</FormLabel>
								<FormControl
									className=" border-gray-500 border-2 px-3 rounded-md py-2"
									placeholder="joe@example.com"
									>
									<Input type="email" {...field} />
								</FormControl>
								<FormMessage className=" text-red-800 text-right font-light" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className=" flex flex-col gap-2">
								<FormLabel>Password</FormLabel>
								<FormControl
								className="border-gray-500 border-2 px-3 rounded-md py-2"
									placeholder="YTg1NjVmMzQ="
								>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage className=" text-red-800 text-right font-light"/>
							</FormItem>
						)}
					/>
				</CardContent>
				<CardFooter className="flex  justify-center">
					<Button
                    className="w-full bg-blue-600 text-white"
                    // disabled={loading}
                    type="submit"
					>
                        {/* { "..." } */}
						{/* {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />} */}
						Sign in
					</Button>
				</CardFooter>
			</form>
		</Form>
	);
}
