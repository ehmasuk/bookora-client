"use client";

import BookNav from "@/components/book/BookNav";
import BookSidebar from "@/components/book/BookSidebar";

import { motion } from "framer-motion";
import { notFound, useParams } from "next/navigation";

import { ReactNode, useState } from "react";
import useSWR from "swr";

type Props = {
  children: ReactNode;
};

function BookLayout({ children }: Props) {
  // open sidebar by default
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(true);

  // get book id from url
  const { bookId } = useParams();

  const { error } = useSWR(bookId ? `/books/${bookId}` : null);

  if (error) {
    notFound();
  }

  return (
    <main className="flex h-screen overflow-hidden">
      <motion.div initial={{ x: 0 }} animate={{ x: sidebarIsOpen ? 0 : -350 }} transition={{ duration: 0.3 }}>
        <BookSidebar isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
      </motion.div>
      <div className="flex-1">
        <BookNav isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
        <div className="h-[calc(100vh-100px)] overflow-y-auto px-5 relative">
          <div className="max-w-4xl mx-auto">{children}</div>
        </div>
      </div>
    </main>
  );
}

export default BookLayout;
