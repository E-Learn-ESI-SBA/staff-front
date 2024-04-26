'use client';
import { createSection, updateSection } from '@/app/actions';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SectionFormSchema, TSectionFormSchema } from '@/types/chapter/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
	onSubmit: (data: TSectionFormSchema) => void;
	defaultValues?: TSectionFormSchema;
	mode: 'CREATE' | 'UPDATE';
};
export function SectionForm({
	defaultValues,
	mode = 'CREATE',
	children,
}: Props) {
	const [state, formAction] = useFormState(
		mode === 'CREATE' ? createSection : updateSection,
		defaultValues
	);
	const form = useForm<TSectionFormSchema>({
		resolver: zodResolver(SectionFormSchema),
		mode: 'onSubmit',
		defaultValues: defaultValues,
	});
	console.log(state);
	if (state.status === 'success') {
		form.reset();
		toast.success(state.message, {
			style: {
				backgroundColor: 'green',
				color: 'white',
			},
		});
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(formAction)}
				className="space-y-8 flex flex-col gap-4    py-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Section Title</FormLabel>
							<FormControl>
								<Input placeholder="Enter The title here..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{children}
			</form>
		</Form>
	);
}
