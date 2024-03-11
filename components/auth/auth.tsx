'use client';

import Link from "next/link";
import { Card, CardFooter } from "../../@/components/ui/card";
import { Label } from "../../@/components/ui/label";
import { useState } from "react";
import { SignInAccount } from "./login";
import { ResetPassword } from "./reset"; 


type AuthOption = 'LOGIN' | 'RESET_PASSWORD';
export default function AuthUI() {
	const [selectedAuth, setSelectedAuth] = useState<AuthOption>('LOGIN');

	return (
		<div className="w-full md:w-1/2 flex justify-center items-center">
		<Card className="max-w-[380px] md:max-w-[50%] px-8 flex flex-col justify-center items-center">
			{selectedAuth === 'LOGIN' ? <SignInAccount /> : <ResetPassword />}
			<CardFooter className="flex flex-col gap-6">
				<Label
					className="opacity-70 text-xs italic underline w-fit self-start cursor-pointer mt-2"
					onClick={() =>
						setSelectedAuth((prev) =>
							prev === 'LOGIN' ? 'RESET_PASSWORD' : 'LOGIN'
						)
					}>
					{selectedAuth === 'LOGIN' ? 'Forgot password?' : 'Back to login'}
				</Label>
				<div className="relative w-full">
					<div className="absolute inset-0 flex  items-center">
						<span className="w-full border-t  border-brand  " />
					</div>
				</div>
				<p className="px-8 text-xs text-muted-foreground">
					By clicking continue, you agree to our terms of service and privacy.
				</p>
			</CardFooter>
		</Card>
		</div>
	);
}
