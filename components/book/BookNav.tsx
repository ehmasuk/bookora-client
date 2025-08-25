"use client";

import useUpdate from "@/hooks/useUpdate";
import { StoreType } from "@/store/store";
import { useStoreState } from "easy-peasy";
import { LoaderIcon, MenuIcon, PanelRightClose } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useNextStep } from "nextstepjs";
import { toast } from "sonner";
import useSWR from "swr";
import AvatarDropdown from "../global/AvatarDropdown";
import LanguageChanger from "../global/LanguageChanger";
import Logo from "../global/Logo";
import TitleAsInput from "../global/TitleAsInput";
import { AnimatedThemeToggler } from "../magicui/animated-theme-toggler";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BookNav({ isOpen, setIsOpen }: Props) {
  const bookIsUpdating = useStoreState<StoreType>((state) => state.book.bookIsUpdating);

  const { updateData } = useUpdate();
  const { startNextStep } = useNextStep();

  // get book id from url
  const { bookId } = useParams();

  const t = useTranslations("bookpage");

  // fetch book data and set in bookinfo and chapters in store from the book data
  const { data: res, error, isLoading } = useSWR(bookId ? `/books/${bookId}` : null);

  if (error) {
    toast.error(error.message);
  }

  const book = res?.data;

  return (
    <nav className="flex border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full sticky top-0 flex-wrap gap-2 items-center justify-between px-8 py-2 dark:bg-gray-900">
      <div className="flex gap-3 items-center">
        {!isOpen && <PanelRightClose onClick={() => setIsOpen(!isOpen)} size={20} className="hover:text-blue-500 duration-300 cursor-pointer" />}

        {isLoading && <Skeleton className="w-50 h-[20px] mt-2" />}

        {!isLoading && (
          <div id="book-name">
            <TitleAsInput title={book?.title} handleSubmit={(title) => updateData({ data: { title }, endpoint: `/books/${bookId}` })} />
          </div>
        )}

        {bookIsUpdating && (
          <div className="flex text-blue-500 items-center text-sm gap-1">
            {t("saving")}
            <LoaderIcon className="w-4 dark:text-white cursor-pointer animate-spin" />
          </div>
        )}
      </div>
      <div className="flex gap-3 items-center">
        <AvatarDropdown />
        <LanguageChanger />
        <AnimatedThemeToggler />
        <Button variant="black" onClick={() => startNextStep("mainTour")}>
          Help
        </Button>
      </div>
    </nav>
  );
}

export default BookNav;
