import { toast } from "../../@/components/ui/use-toast";
import { AuthOption } from "../../components/auth/auth";



const useResetPassword = () => {
    const resetPassword = async (email: string, setSelectedAuth: (value: AuthOption) => void) => {
        try {
            const response = await fetch("http://localhost:8080/api/send-otp/", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email
                }),
            });

            const data = await response.json();

            console.log({data})

            if (response.status == 202) {
                toast({
                    color: "success",
                    description: data.message,
                });
                setSelectedAuth('SUBMIT_NEW_PASSWORD');
            } else {
                toast({
                    color: "error",
                    description: data.error,
                });
            }
        } catch (error) {
            console.log({error})
            toast({
                color: "error",
                description: "An error occurred. Please try again.",
            });
        }
    };

    const submitOTP = async (email: string, code: string, password: string) => {
        try {
            const response = await fetch("http://localhost:8080/api/reset-password/", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, code, password }),
            });

            const data = await response.json();

            if (response.status == 202) {
                toast({
                    color: "success",
                    description: data.message,
                });
            } else {
                toast({
                    color: "error",
                    description: data.error,
                });
            }
        } catch (error) {
            toast({
                color: "error",
                description: "An error occurred. Please try again.",
            });
        }
    }

    return {
        resetPassword,
        submitOTP
    };
}
 
export default useResetPassword;