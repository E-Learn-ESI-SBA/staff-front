import { Toaster } from "../../@/components/ui/toaster";
import AuthUI from "../../components/auth/auth";
import LeftSection from "../../components/auth/left";


export default async function AuthPage() {
	// const { isAuth } = await getAuth();
	// if (isAuth) {
	// 	redirect(selectedRoutes.get('dashboard')?.path ?? '/dashboard');
	// }
	return (
		<div className="w-screen relative h-screen flex flex-col md:flex-row justify-center md:justify-between items-center">
			<LeftSection />
			<AuthUI />
		</div>
	);
}