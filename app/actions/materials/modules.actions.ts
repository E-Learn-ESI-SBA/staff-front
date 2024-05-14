import { cookies } from 'next/headers';
import { GET_TEACHER_MODULES_URL } from '@/config/urls/material/queries';
import { Module } from '@/types/chapter/courses';
import { IResponse } from '@/types/http';

export const useGetTeacherModules = async (): Promise<IResponse<Module[]>> => {
	try {
		const response = await fetch(GET_TEACHER_MODULES_URL, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${cookies().get('token').value}`,
			},
		});

		const { data, error } = (await response.json()) as {
			data: Module[];
			error: string;
		};
		if (error) {
			return {
				status: response.status,
				data: [],
				error: new Error(error),
			};
		}
		4;
		return {
			status: response.status,
			data: data,
			error: null,
		};
	} catch (e) {
		return {
			status: 500,
			error: e.message,
			data: [],
		};
	}
};
