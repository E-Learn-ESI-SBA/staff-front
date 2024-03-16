'use client';
import { useEffect } from "react";
import { Toaster } from "@/@/components/ui/toaster";
import AuthUI from "@/components/auth/auth";
import LeftSection from "@/components/auth/left";
import { useUserStore } from "@/store/user";
import {  useRouter } from 'next/navigation';


export default function AuthPage() {
	const isAuth = useUserStore((state) => state.isAuth);
	const router = useRouter();

	if (isAuth) {
		router.replace('/');
	}
	

	return (
		<div className="w-screen relative h-screen flex flex-col lg:flex-row justify-center md:justify-between items-center">
			<LeftSection />
			<div className="w-full lg:w-1/2 flex justify-center items-center relative gap-6">
				<AuthUI />
				<div className=" absolute"><Toaster /></div>
			</div>
		</div>
	);
}