import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { GradesSchema, TGradesForm } from '@/types/zod'; 
import { zodResolver } from '@hookform/resolvers/zod';
import {TrashIcon } from '@radix-ui/react-icons';
import { useFieldArray, useForm } from 'react-hook-form';
import { useQuestionFormStore } from '@/store/forms/questions/question.store';
import { TypographyP } from '@/components/ui/typography';

const  defaultValues = {
    grade_items :  [
        {minInterval : 80,maxInterval : 100,grade : 'A',note : 'excellent',passed: true},
        {minInterval : 50,maxInterval : 80,grade : 'B',note : 'well done',passed: true},
        {minInterval : 0,maxInterval : 50,grade : 'F',note : 'focus',passed: false},
        ]
}

export default function GradesForm() {
    const {
		nextStep,
        setSecondStepContent,
        second_step_content,
        prevStep,
	} = useQuestionFormStore((state) => ({
		nextStep: state.nextStep,
        prevStep: state.prevStep,
		setSecondStepContent: state.setSecondStepContent,
		second_step_content: state.second_step_content ?? defaultValues,
	}));
    const form = useForm<TGradesForm>({
        resolver: zodResolver(GradesSchema),
        defaultValues: second_step_content,
        mode: 'onChange',
    });
    const { fields, append, remove } = useFieldArray({
        name: 'grade_items',
        control: form.control,
    });
    const submitHandler = (data: TGradesForm) => {
        console.log('Submitted form');
        console.log(data);
        setSecondStepContent(data)
        nextStep()
    };

    return (
        <Form {...form}>
            <form className="space-y-8 py-4" onSubmit={form.handleSubmit(submitHandler)}>
                <div className="flex justify-between items-center font-medium">
                    <div className="flex gap-4 w-1/4">
                        <p>Minimum Marks</p>
                    </div>
                    <div className="flex gap-4 w-1/4">
                        <p>Grade</p>
                    </div>
                    <div className="flex gap-4 w-1/4">
                        <p>Note</p>
                    </div>
                    <div className="flex gap-4 w-1/4">
                        <p>Result</p>
                    </div>
                </div>

                {fields.map((field, index) => (
                    <div className="flex justify-between items-start gap-2" key={field.id}>
 <div className="flex gap-4 w-1/4">
                               <FormField
                                control={form.control}
                                name={`grade_items.${index}.minInterval`}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                    <FormControl>
            <Input      
            className='bg-[#F1F1F1]'                     
            type="number"
            {...field}
            placeholder="Min mark"
           
        />
        </FormControl>
        <FormMessage />
       </FormItem>
                                )}
                            />

 

<FormField
                                control={form.control}
                                name={`grade_items.${index}.maxInterval`}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                    <FormControl>
                                           <Input
                                           className='bg-[#F1F1F1] '
            type="number"
            {...field}
            placeholder="Max mark"
       
        />
                                    </FormControl>
                                    <FormMessage />
              </FormItem>
                                    
                                )}
                            />
</div>
                        <div className="flex gap-4 w-1/4">
                            <FormField
                                control={form.control}
                                name={`grade_items.${index}.grade`}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                    <FormControl>
                                        <Input className='bg-[#F1F1F1] ' type="text" {...field} placeholder="Grade Value" />
                                    </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex gap-4 w-1/4">
                            <FormField
                                control={form.control}
                                name={`grade_items.${index}.note`}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                    <FormControl>
                                        <Input type="text" {...field} placeholder="Add Any Extra Note" />
                                    </FormControl>
                                    <FormMessage />
              </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center gap-4 w-1/4">
                            <FormField
                                control={form.control}
                                name={`grade_items.${index}.passed`}
                                render={({ field }) => (
                                    <FormItem >
                                    <FormControl>
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                               defaultChecked={field.value}
                                               onCheckedChange={field.onChange}
                                            />
                                            <p>Pass</p> 
                                        </div>
                                    </FormControl>
                                    <FormMessage />
              </FormItem>
                                )}
                            />
                            <Button
                                disabled={fields.length === 0}
                                variant="outline"
                                size="sm"
                                className="w-fit p-2"
                                onClick={() => {
                                    remove(index);
                                }}>
                                <TrashIcon className="text-red-700" />
                            </Button>
                        </div>
                    </div>
                ))}
                <Button
                    disabled={fields.length > 5}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 rounded-xl border border-[#0066FF] text-[#0066FF] px-8 py-2 "
                    onClick={() => {
                        if (fields.length <= 5) append({ minInterval : null ,maxInterval: null , grade: '', note: '', passed: false });
                    }}>
                        Add  more grade
                </Button>

                {form.formState?.errors && (
					<TypographyP className=" indent-6 text-red-600 my-5 text-sm">
						{form.formState.errors.grade_items?.root?.message}
					</TypographyP>
				)}

                <div className="flex justify-between items-center gap-8">
                <Button
					className="w-fit py-2 px-6"
					onClick={() => {
						prevStep();
					}}>
					Previous
				</Button>
                    <Button
                        className="w-fit py-2 px-6"
                        type="submit"
                        onClick={() => {
                            console.log(form.formState.errors);
                        }}
                    >
                        Next
                    </Button>
                </div>
            </form>
        </Form>
    );
}
