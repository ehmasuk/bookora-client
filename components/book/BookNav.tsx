"use client";

import useUpdate from "@/hooks/useUpdate";
import { StoreType } from "@/store/store";
import { useStoreState } from "easy-peasy";
import { AnimatePresence, motion } from "framer-motion";
import { HomeIcon, LoaderIcon, Menu, PanelRightClose, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
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

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center gap-2">
        <button onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
          {mobileNavIsOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileNavIsOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background border-t"
          >
            <div className="flex p-2 gap-1 justify-center">
              <Link href="/">
                <HomeIcon size={20} className="w-6 h-6" />
              </Link>
              <AvatarDropdown />
              <LanguageChanger />
              <AnimatedThemeToggler />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default BookNav;
