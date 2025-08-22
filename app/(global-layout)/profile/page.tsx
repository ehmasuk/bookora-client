"use client";

import BookCard from "@/components/global/BookCard";
import Empty from "@/components/global/Empty";
import CreateBookModal from "@/components/modals/CreateBookModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookType } from "@/types/book";
import { useSession } from "next-auth/react";
import Image from "next/image";
import useSWR from "swr";

function ProfilePage() {
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  const { data: res, error, isLoading } = useSWR(userId ? `/users/${userId}/books` : null);

  console.log(res);

  if (error) {
    throw new Error(error.message);
  }

  const books = res?.data;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="rounded-lg bg-card text-card-foreground border-0 shadow-md">
            <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r bg-blue-600 dark:bg-slate-800 rounded-t-lg">
              <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">Personal Information</h3>
              <p className="text-sm text-blue-100">Manage your profile details</p>
            </div>
            <div className="p-6 pt-6">
              <div className="flex flex-col items-center space-y-4 mb-6">
                <span className="relative flex shrink-0 overflow-hidden rounded-full h-24 w-24 border-2 border-blue-300 shadow-sm">
                  {status !== "loading" && <Image loading="lazy" src={session?.user?.image || "/images/profile-avatar.png"} alt="avatar" width={150} height={150} />}
                </span>
                <Button variant="outline">Change profile image</Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-blue-200 focus-visible:ring-blue-400"
                    id="name"
                    defaultValue={session?.user?.name || ""}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-blue-200 focus-visible:ring-blue-400"
                    readOnly
                    value={session?.user?.email || ""}
                  />
                </div>

                <Button variant="primary" type="submit" className="w-full">
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="rounded-lg bg-card text-card-foreground border-0 shadow-md">
            <div className="flex flex-col space-y-1.5 p-6 dark:bg-slate-800 bg-blue-100 runded-t-lg">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold leading-none tracking-tight text-slate-800 dark:text-white">My Books</h3>
                </div>
                <CreateBookModal tooltip={false}>
                  <Button variant="primary">Create a new book</Button>
                </CreateBookModal>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {books?.map((book: BookType, index: number) => (
                  <BookCard chapters={book.chapters} image={book.image} title={book.title} id={book.id} key={index} summary={book.summary} author={book.author} visibility={book.visibility} />
                ))}

                {isLoading && [...Array(5)].map((_, i) => <Skeleton key={i} className="w-full h-30" />)}
              </div>
            </div>
            {!isLoading && books?.length === 0 && <Empty size="lg" text="You haven't created any book yet" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
