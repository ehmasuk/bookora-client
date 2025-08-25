"use client";

import ProfileBook from "@/components/global/ProfileBook";
import CreateBookModal from "@/components/modals/CreateBookModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Settings, User } from "lucide-react";

import Empty from "@/components/global/Empty";
import { Skeleton } from "@/components/ui/skeleton";
import { BookType } from "@/types/book";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import useSWR from "swr";

export default function BookManagementDashboard() {
  const { data: session } = useSession();
  const t = useTranslations("profilepage");

  const userId = session?.user?.id;

  const { data: res, error, isLoading } = useSWR(userId ? `/users/${userId}/books` : null);

  if (error) {
    throw new Error(error.message);
  }

  const books = res?.data;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-sidebar border-r border-sidebar-border p-6 min-h-screen">
          {/* User Profile */}
          <div className="bg-sidebar-accent/10 rounded-lg p-4 mb-6">
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

          {/* Navigation */}
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/20">
              <BookOpen className="w-4 h-4" />
              {t("sidebar.my_books")}
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-sidebar-accent/20">
              <Settings className="w-4 h-4" />
              {t("sidebar.settings")}
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{t("header.title")}</h2>
              <p className="text-muted-foreground">{t("header.description")}</p>
            </div>
            <CreateBookModal eligableToShowStepsGuide={books?.length === 0 ? true : false} tooltip={false}>
              <Button className="gap-2 bg-primary dark:text-white text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                {t("header.create_button")}
              </Button>
            </CreateBookModal>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 px-3 gap-6">
            {userId && books?.map((book: BookType, index: number) => (
              <ProfileBook userId={userId} chapters={book.chapters} image={book.image} title={book.title} id={book.id} key={index} summary={book.summary} author={book.author} visibility={book.visibility} />
            ))}

            {isLoading && [...Array(5)].map((_, i) => <Skeleton key={i} className="w-full h-30" />)}
          </div>

          {!isLoading && books?.length === 0 && <Empty size="lg" text={t("empty_message")} />}
        </div>
      </div>
    </div>
  );
}
