"use client";

import ProfileBook from "@/components/global/ProfileBook";
import CreateBookModal from "@/components/modals/CreateBookModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, User } from "lucide-react";

import Empty from "@/components/global/Empty";
import { Skeleton } from "@/components/ui/skeleton";
import { BookType } from "@/types/book";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import useSWR from "swr";

export default function BookManagementDashboard() {
  const { data: session } = useSession();
  const t = useTranslations("profilepage");

  const userId = session?.user?.id;

  console.log(session);

  const { data: res, error, isLoading } = useSWR(userId ? `/users/${userId}/books` : null);

  if (error) {
    toast.error(error.message);
  }

  const books = res?.data;

  return (
    <div className="min-h-screen max-w-6xl mx-auto bg-background">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">{t("header.title")}</h2>
            <p className="text-muted-foreground">{t("header.description")}</p>
          </div>

          <div className="bg-sidebar-accent/10 rounded-lg p-4 hidden md:block mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{session?.user?.name || ""}</p>
                <p className="text-xs text-muted-foreground truncate">{session?.user?.email || ""}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 px-3 gap-6">
          {userId &&
            books?.map((book: BookType, index: number) => (
              <ProfileBook
                userId={userId}
                chapters={book.chapters}
                image={book.image}
                title={book.title}
                id={book.id}
                key={index}
                summary={book.summary}
                author={book.author}
                visibility={book.visibility}
              />
            ))}

          <CreateBookModal eligableToShowStepsGuide={books?.length === 0 ? true : false} tooltip={false}>
            <div className="max-w-[240px] w-full h-[150px] bg-gradient-to-r from-violet-200 to-purple-200 border text-sm font-medium hover:to-purple-300 hover:from-violet-300 duration-300 rounded flex justify-center items-center cursor-pointer">
              <Plus className="w-4 h-4 mr-1" />
              <p>{t("header.create_button")}</p>
            </div>
          </CreateBookModal>

          {isLoading && [...Array(5)].map((_, i) => <Skeleton key={i} className="w-full h-30" />)}
        </div>

        {!isLoading && books?.length === 0 && <Empty size="lg" text={t("empty_message")} />}
      </div>
    </div>
  );
}
