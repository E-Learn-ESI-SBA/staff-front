'use server';
import { CREATE_SECTION_URL, UPDATE_SECTION_URL } from '@/config/constants';
import { TSectionFormSchema } from '@/types/chapter/zod';
import { cookies } from 'next/headers';

type Props = {
	data: TSectionFormSchema;
	mode: 'UPDATE' | 'CREATE';
};
type ReturnType = {
	success: boolean;
	message: string;
};
export const createSection = async (
	data: TSectionFormSchema
): Promise<ReturnType> => {
	try {
		const response = await fetch(CREATE_SECTION_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${cookies().get('token')}`,
			},
			body: JSON.stringify(data),
		});
		const res = await response.json();
		return res;
	} catch (e) {
		console.log(e);
		return {
			success: false,
			message: e.message,
		};
	}
};

export const updateSection = async (data: TSectionFormSchema) => {
	try {
		const response = await fetch(UPDATE_SECTION_URL, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${cookies().get('token')}`,
			},
			body: JSON.stringify(data),
		});

		const res = await response.json();
		return res;
	} catch (e) {
		console.log(e);
		return {
			success: false,
			message: e.message,
		};
	}
};
