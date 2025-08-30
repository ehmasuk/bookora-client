"use client";

import BookNav from "@/components/book/BookNav";
import BookSidebar from "@/components/book/BookSidebar";

import { notFound, useParams } from "next/navigation";

import { ReactNode, useEffect, useState } from "react";
import useSWR from "swr";

type Props = {
  children: ReactNode;
};

function BookLayout({ children }: Props) {
  // open sidebar by default
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarIsOpen(false);
      setIsMobile(true);
    }
  }, []);

  // get book id from url
  const { bookId } = useParams();

  const { error } = useSWR(bookId ? `/books/${bookId}` : null);

  if (error) {
    notFound();
  }

  return (
    <main className="h-screen overflow-hidden">
      <BookSidebar isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
      <div className={`flex-1 transition-all duration-300 ${sidebarIsOpen && !isMobile ? "ml-[350px]" : "ml-0"}`}>
        <BookNav isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
        <div className="h-[calc(100vh-100px)] overflow-y-auto px-5 relative">
          <div className="max-w-4xl mx-auto">{children}</div>
        </div>
      </div>
    </main>
  );
}

export default BookLayout;
