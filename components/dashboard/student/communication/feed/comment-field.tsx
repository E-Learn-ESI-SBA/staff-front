import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { COMMUNICATION_BASE_URL } from "@/config/constants";
import { TPayload } from "@/types";
import { CommentProps } from "@/types/communication";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";




export default function CommentField({ postId, user, setComments }: { postId: string, user: TPayload | null, setComments: Dispatch<SetStateAction<CommentProps[]>> }) {
    const [formData, setFormData] = useState({
        text: "",
    });

    const commentSchemaValidator = z.object({
        text: z.string().min(1, { message: "must be at least 1 characters long" }),
      });
    
      type TCommentSchema = z.infer<typeof commentSchemaValidator>;
    
      const form = useForm<TCommentSchema>({
        resolver: zodResolver(commentSchemaValidator),
        defaultValues: {...formData},
      });


      const submit = async (data: TCommentSchema) => {
        try {
            const res = await fetch(`${COMMUNICATION_BASE_URL}/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.accessToken}`,
                },
                cache: 'no-store',
                body: JSON.stringify(data)
            })
            if (res.ok) {
                const data = await res.json()
                const newComment: CommentProps = {
                    ...data.raw[0],
                    text: form.getValues('text'),
                    user: {
                        id: user?.id,
                        username: user?.username,
                        email: user?.email,
                        avatar: user?.avatar
                    },
                    likes: []
                }
                setComments(prev => [...prev, newComment])
                toast.success("comment created successfully", {
                    style: {
                        backgroundColor: "green",
                        color: "white",
                    },
                })
                form.reset()
            } else {
                toast.error("Comment was not created", {
                    style: {
                        backgroundColor: "red",
                        color: "white",
                    },
                })
            }
        } catch (error) {
            toast.error('Something went wrong...', {
                style: {
                    backgroundColor: 'red',
                    color: 'white',
                }
            });
        }
      }


    return (
        <Form {...form} >
            <form
              onSubmit={form.handleSubmit(submit)}
              className="flex flex-row gap-4 w-full"
            >
              
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                        <Input type="text" placeholder="what are your thoughts..." {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button>
                Add
              </Button>
            </form>
          </Form>
    )
}