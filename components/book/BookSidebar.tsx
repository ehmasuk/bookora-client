"use client";

import usePost from "@/hooks/usePost";
import handleDragEnd from "@/lib/handleDragEnd";
import { ChapterType } from "@/types/book";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ChevronRight, MenuIcon, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Empty from "../global/Empty";
import Logo from "../global/Logo";
import TitleBox from "../global/TitleBox";
import CreateChapterModal from "../modals/CreateChapterModal";
import { Skeleton } from "../ui/skeleton";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BookSidebar({ isOpen, setIsOpen }: Props) {
  // get book id from url
  const { bookId } = useParams();

  // fetch book data and set in bookinfo and chapters in store from the book data
  const { data: res, error, isLoading } = useSWR(bookId ? `/books/${bookId}` : null);

  const [chapterIsOpen, setChapterIsOpen] = useState<boolean>(true);

  const [allChapters, setAllChapters] = useState<ChapterType[]>([]);

  const handleChapterDragEnd = (event: DragEndEvent) => {
    const newOrder = handleDragEnd<ChapterType>(event, allChapters);
    if (newOrder) setAllChapters(newOrder);
    sortChapters(newOrder as ChapterType[]);
    console.log(newOrder);
  };

  const { postData } = usePost();

  const sortChapters = async (newOrder: ChapterType[]) => {
    postData({
      url: `/books/${bookId}/chapters/sort`,
      data: { sortedChapters: newOrder },
      onSuccess: (res) => {
        console.log(res);
      },
    });
  };

  // if chapter is updated in store then update chapters in sidebar
  useEffect(() => {
    setAllChapters(res?.data?.chapters || []);
  }, [res]);

  if (error) {
    throw new Error(error.message);
  }

  const book = res?.data;

  return (
    <div
      className={`${
        !isOpen ? "absolute left-0 top-0" : ""
      }w-[350px] h-screen transition duration-100 shadow border border-slate-200 dark:border-gray-700 flex flex-col p-1 bg-slate-50 dark:bg-gray-900`}
    >
      {/* header => toggler */}
      <div className="flex w-full p-1.5 bg-slate-100 dark:bg-slate-900 justify-between items-center">
        <Logo />
        <MenuIcon onClick={() => setIsOpen(!isOpen)} className="w-4 cursor-pointer text-slate-600 dark:text-slate-200" />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col max-h-screen overflow-y-auto">
        {/* options => searchbar */}
        <div className="options mt-4">
          <div className="text-sm group h-[40px] font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer gap-2 flex items-center justify-between">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md border border-slate-300 dark:border-gray-600 p-2 text-sm bg-white dark:bg-gray-800 text-slate-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="chapters mt-3 flex-1 hover:overflow-y-auto overflow-hidden">
          <div className="text-sm group h-[40px] font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer gap-2 flex items-center justify-between">
            <div className="text-slate-600 dark:text-slate-300 flex items-center gap-1 flex-1">
              <div onClick={() => setChapterIsOpen(!chapterIsOpen)} className="w-4 rounded hover:bg-slate-200 dark:hover:bg-blue-400 dark:hover:text-white">
                {allChapters.length > 0 && <ChevronRight className={`w-4 outline-none transition ${chapterIsOpen ? "rotate-90" : ""}`} />}
              </div>
              <p>Chapters</p>
            </div>
            <div className="flex gap-2 items-center">
              <CreateChapterModal bookId={book?.id} chapterNumber={allChapters.length + 1}>
                <Plus className="p-1 transition text-gray-500 dark:text-gray-400 size-6 rounded hover:bg-gray-200 dark:hover:bg-gray-700" />
              </CreateChapterModal>
            </div>
          </div>

          {isLoading && (
            <div className="space-y-2 px-5">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="w-full h-[40px]" />
              ))}
            </div>
          )}

          {chapterIsOpen && allChapters.length > 0 && (
            <div>
              <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleChapterDragEnd}>
                <SortableContext items={allChapters.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                  {allChapters?.map((chapter: ChapterType, index: number) => (
                    <TitleBox id={chapter.id} title={chapter.title} index={index} key={chapter.id} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          )}

          {!isLoading && allChapters?.length == 0 && (
            <div className="px-6 mt-4">
              <Empty text="No chapters, create a chapter" />
            </div>
          )}
        </div>
      </div>

      {/* footer => settings */}
      <div className="p-2 text-center">
        <p className="text-slate-500 text-sm dark:text-white">Bookora</p>
      </div>
    </div>
  );
}

export default BookSidebar;
