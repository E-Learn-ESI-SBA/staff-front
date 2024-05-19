import {TVideoSchema,VideoSchema} from "@/types/chapter/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormField, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {PropsWithChildren} from "react";

type Props = PropsWithChildren &  {
    defaultValues:TVideoSchema
    sectionId: string;
}
export default function VideoForm ({defaultValues,sectionId,children}:Props ) {
    const form = useForm<TVideoSchema>({
        resolver: zodResolver(VideoSchema),
        defaultValues: defaultValues,
        mode: "onSubmit",
    });
    return (
        <Form {...form}>
        <form className="">
            <FormField name="name" control={form.control}   />
            <FormField name="url" control={form.control} render={({field}) => {
                return <input {...field} className="hidden" />
            }}  />
            <FormField name="id" control={form.control} render={({field}) => {
                return <input type="hidden" {...field} />
            }}  />
            {
                children
            }
        </form>
        </Form>
    )
}