"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import usePost from "@/hooks/usePost";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { BookMarkedIcon } from "lucide-react";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";
import { z } from "zod";

interface Props {
  children: React.ReactNode;
  chapterNumber: number;
  bookId: string;
}

function CreateChapterModal({ children, chapterNumber, bookId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { postData, loading } = usePost();

  const formSchema = z.object({
    title: z.string().min(1, { message: "Chapter name is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const chapter = { title: values.title, chapterNumber };

    postData({
      url: `/books/${bookId}/chapters`,
      data: chapter,
      onSuccess: () => {
        toast.success("New chapter created successfully");
        setIsOpen(false);
        form.reset();
        mutate(`/books/${bookId}`, undefined, { revalidate: true });
      },
      onError: (errMessage) => {
        toast.error(errMessage);
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip delayDuration={1000}>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>{children}</DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-700 text-slate-100 rounded px-2 py-1 text-xs">
            <p>Create a new chapter</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="w-sm">
        <div className="mb-2 flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle className="sm:text-center">Create a new Chapter</DialogTitle>
            <DialogDescription className="sm:text-center">Enter chapter name</DialogDescription>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input className="peer ps-9" placeholder="Chapter name" type="text" {...field} />
                      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                        <BookMarkedIcon size={16} aria-hidden="true" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button loading={loading} variant="primary" type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateChapterModal;
