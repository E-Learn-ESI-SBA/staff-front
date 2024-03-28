import { AuthOption } from '@/components/auth/auth';
import useAxios from '../axios/useAxios';
import { toast } from 'sonner';

const useResetPassword = () => {
	const axiosInstance = useAxios();
	const resetPassword = async (
		email: string,
		setSelectedAuth: (value: AuthOption) => void
	) => {
		try {
			const response = await axiosInstance.post('api/send-otp/', {
				email,
			});

			const data = await response.data;

			if (response.status == 202) {
				toast('Success', {
					style: {
						backgroundColor: 'green',
						color: 'white',
					},
				});
				setSelectedAuth('SUBMIT_NEW_PASSWORD');
			} else {
				toast('An error occurred. Please try again.', {
					style: {
						backgroundColor: 'red',
						color: 'white',
					},
				});
			}
		} catch (error) {
			console.log({ error });
			toast('An error occurred. Please try again.', {
				style: {
					backgroundColor: 'red',
					color: 'white',
				},
			});
		}
	};

	const submitOTP = async (email: string, code: string, password: string) => {
		try {
			const response = await axiosInstance.post('api/reset-password/', {
				email,
				code,
				password,
			});

			const data = await response.data;

			if (response.status == 202) {
				console.log({ message: data.message });
				return {
					success: true,
				};
			} else {
				console.log({ error: data.error });
				return {
					success: false,
				};
			}
		} catch (error) {
			console.log({ error });
			return {
				success: false,
			};
		}
	};

	return {
		resetPassword,
		submitOTP,
	};
};

export default useResetPassword;
