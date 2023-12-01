"use client"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import  {zodResolver } from '@hookform/resolvers/zod' 
import { Button } from '../ui/button'; 
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form" 
  import { usePathname, useRouter } from 'next/navigation';  
import { CommentValidation } from "@/lib/validations/thread";  
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";
interface Params {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}
export default function Comment({
    threadId, currentUserImg, currentUserId
}: Params) {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({ 
        resolver: zodResolver(CommentValidation),
        defaultValues:{
            thread: "", 
        } })

    const onSubmit = async (values: z.infer<typeof CommentValidation>) =>{
        await addCommentToThread(
          threadId, 
          values.thread, 
          JSON.parse(currentUserId), 
          pathname);

          form.reset();

        router.push('/')
    }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} 
      className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (

            <FormItem className='flex  w-full items-center gap-4'>
              <FormLabel>
                 <Image src={currentUserImg} alt="Profile Image" width={48} height={48} 
                 className="rounded-full object-cover"/>
              </FormLabel>

              <FormControl className='border-none bg-transparent'>
                <Input type="text" placeholder="Leave a comment" {...field}
                className="no-focus text-light-1 outline-none"/>
              </FormControl> 
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
            Reply
        </Button>
    </form>
    </Form>
  )
}
