"use client";

import useUpdate from "@/hooks/useUpdate";
import { StoreType } from "@/store/store";
import { useStoreState } from "easy-peasy";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderIcon, MenuIcon, PanelRightClose, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useNextStep } from "nextstepjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import AvatarDropdown from "../global/AvatarDropdown";
import LanguageChanger from "../global/LanguageChanger";
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

  const handleHelp = () => {
    startNextStep("mainTour");
  };

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const [mobileNavIsOpen, setMobileNavIsOpen] = useState<boolean>(false);

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
    <nav className="flex border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full sticky top-0 flex-wrap gap-2 items-center justify-between md:px-8 px-2 py-2 dark:bg-gray-900">
      <div className="flex gap-3 items-center">
        {!isOpen && <PanelRightClose onClick={() => setIsOpen(!isOpen)} size={20} className="hover:text-blue-500 duration-300 cursor-pointer" />}

        {isLoading && <Skeleton className="w-50 h-[20px] mt-2" />}

        {!isLoading && (
          <div id="book-name">
            <TitleAsInput maxCharachter={isMobile ? 30 : null} title={book?.title} handleSubmit={(title) => updateData({ data: { title }, endpoint: `/books/${bookId}` })} />
          </div>
        )}

        {bookIsUpdating && (
          <div className="flex text-blue-500 items-center text-sm gap-1">
            {t("saving")}
            <LoaderIcon className="w-4 dark:text-white cursor-pointer animate-spin" />
          </div>
        )}
      </div>

      {/* desktop */}
      <div className="hidden md:flex gap-3 items-center">
        <AvatarDropdown />
        <LanguageChanger />
        <AnimatedThemeToggler />
        <Button variant="black" onClick={handleHelp}>
          Help
        </Button>
      </div>

      <MenuIcon size={18} className="block md:hidden hover:text-blue-500 duration-300 cursor-pointer" onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)} />
      <AnimatePresence>
        {mobileNavIsOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 right-0 w-[100px] dark:bg-gray-900 h-screen top-0 bg-slate-50 shadow border border-slate-200 dark:border-gray-700 p-4 justify-center flex flex-col gap-4 md:hidden items-center"
          >
            <X size={20} onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)} className="absolute right-2 top-2 text-red-500 cursor-pointer" />
            <AvatarDropdown />
            <LanguageChanger />
            <AnimatedThemeToggler className="w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default BookNav;
