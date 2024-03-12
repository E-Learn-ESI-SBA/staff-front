'use client';
import { Toaster } from "../../@/components/ui/toaster";
import AuthUI from "../../components/auth/auth";
import LeftSection from "../../components/auth/left";
import { useUserStore } from "../../store/user";
import { redirect } from 'next/navigation';


export default function AuthPage() {
	const isAuth = useUserStore((state) => state.isAuth);
	
	if (isAuth) {
		redirect('/');
	}

	return (
		<div className="w-screen relative h-screen flex flex-col md:flex-row justify-center md:justify-between items-center">
			<LeftSection />
			<div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-6">
				<AuthUI />
				<Toaster />
			</div>
		</div>
	);
}