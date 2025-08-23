"use client";

import useUpdate from "@/hooks/useUpdate";
import { StoreType } from "@/store/store";
import { useStoreState } from "easy-peasy";
import { LoaderIcon, MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import AvatarDropdown from "../global/AvatarDropdown";
import Logo from "../global/Logo";
import TitleAsInput from "../global/TitleAsInput";
import { AnimatedThemeToggler } from "../magicui/animated-theme-toggler";
import { Skeleton } from "../ui/skeleton";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BookNav({ isOpen, setIsOpen }: Props) {
  const bookIsUpdating = useStoreState<StoreType>((state) => state.book.bookIsUpdating);

  const { updateData } = useUpdate();

  // get book id from url
  const { bookId } = useParams();

  // fetch book data and set in bookinfo and chapters in store from the book data
  const { data: res, error, isLoading } = useSWR(bookId ? `/books/${bookId}` : null);

  if (error) {
    throw new Error(error.message);
  }

  const book = res?.data;

  return (
    <nav className="flex border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full sticky top-0 flex-wrap gap-2 items-center justify-between px-8 py-2 dark:bg-gray-800">
      <div className="flex gap-3 items-center">
        {!isOpen && (
          <>
            <Logo />
            <MenuIcon onClick={() => setIsOpen(!isOpen)} className="w-4 cursor-pointer" />
          </>
        )}

        {isLoading && <Skeleton className="w-50 h-[20px] mt-2" />}

        {!isLoading && <TitleAsInput title={book?.title} handleSubmit={(title) => updateData({ data: { title }, endpoint: `/books/${bookId}` })} />}

        {bookIsUpdating && (
          <div className="flex text-blue-500 items-center text-sm gap-1">
            Saving
            <LoaderIcon className="w-4 dark:text-white cursor-pointer animate-spin" />
          </div>
        )}
      </div>
      <div className="flex gap-3 items-center">
        <AnimatedThemeToggler className="p-2" />
        <AvatarDropdown />
      </div>
    </nav>
  );
}

export default BookNav;
