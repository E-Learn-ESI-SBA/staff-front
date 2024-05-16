import Image from "next/image";
import {useForm} from "react-hook-form";
import {moduleSchemaValidator, TModuleSchema} from "@/types/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {toast} from "sonner";
import {IError} from "@/types/errors";
import {Input} from "@/components/ui/input";


type Props = {
    data : {
        title: string;
        description: string;
        points: string[];
    }
}
export function EditModule({data}:Props) {
    const form = useForm<TModuleSchema>({
        mode: "onSubmit",
        resolver: zodResolver(moduleSchemaValidator),
        defaultValues:data
    })
    const submitHandler = (data:TModuleSchema) => {
        try {

        console.log(data)
        }catch (e) {
            const err = new IError(e)
            console.log(err.message)
            toast.error(err.message)
        }
    }
    const d = Array
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="w-full flex flex-col justify-center">
            <div className="flex justify-between flex-wrap">
                    <FormField render={({field}) => {
                            return (
                                <FormItem>
                                    <FormLabel htmlFor="title" className="text-black text-lg xl:text-2xl lg:text-xl font-medium p-4">Title</FormLabel>
                                    <FormControl>
                                    <Input {...field} type="text" placeholder="Distributed Transactions" id="title" className="text-black text-lg xl:text-2xl lg:text-xl font-medium p-4" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )

                    }} name="title" control={form.control} />
            </div>

            </form>

        </Form>
    )
    return (
        <div className="w-full flex flex-col justify-center">


            <div className="text-text-GRAY rounded-3xl p-4">
                <h5 className="text-secondary text-lg xl:text-3xl lg:text-xl font-medium my-4">
                    Description
                </h5>
                <p
                    className="min-h-96 p-8 text-xs sm:text-sm text-black rounded-3xl"
                    dangerouslySetInnerHTML={{__html: description}}
                />
            </div>
            <div className="p-8 lg:p-12">
                <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
                    <h5 className="text-secondary text-lg xl:text-3xl lg:text-xl font-medium">
                        What you will learn in this course :
                    </h5>
                    <div className="grid grid-cols-2  gap-4">
                        {points.map((p, i) => (
                            <div className="flex items-center w-full   gap-1" key={i}>
                                <Image
                                    src="/assets/icons/courses/check.svg"
                                    width={30}
                                    height={30}
                                    alt="overview"
                                />
                                <p className=" text-sm md:text-base ">{p}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}