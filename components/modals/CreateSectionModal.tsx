"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import usePost from "@/hooks/usePost";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { BookMarkedIcon } from "lucide-react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";
import { z } from "zod";

interface Props {
  children: React.ReactNode;
  sectionNumber: number;
  chapterId: string;
  onSuccess?: () => void;
}

function CreateSectionModal({ children, sectionNumber, chapterId,onSuccess }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { postData, loading } = usePost();

  const formSchema = z.object({
    title: z.string().min(1, { message: "Section name is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const section = { title: values.title, sectionNumber };

    postData({
      url: `/chapters/${chapterId}/sections`,
      data: section,
      onSuccess: () => {
        toast.success("Section created successfully");
        setIsOpen(false);
        mutate(`/chapters/${chapterId}/sections`, undefined, { revalidate: true });
        form.reset();
        onSuccess?.()
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
            <p>Create a new section</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="w-sm">
        <div className="mb-2 flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle className="sm:text-center">Create a new section</DialogTitle>
            <DialogDescription className="sm:text-center">Enter section name and start writing.</DialogDescription>
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
                      <Input className="peer ps-9" placeholder="Section name" type="text" {...field} />
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

export default CreateSectionModal;
