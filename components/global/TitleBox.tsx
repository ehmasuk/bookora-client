"use client";

import useDelete from "@/hooks/useDelete";
import usePost from "@/hooks/usePost";
import useUpdate from "@/hooks/useUpdate";
import handleDragEnd from "@/lib/handleDragEnd";
import { SectionType } from "@/types/book";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, GripVertical, Plus, Trash } from "lucide-react";
import { useQueryState } from "next-usequerystate";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";
import CreateSectionModal from "../modals/CreateSectionModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import Empty from "./Empty";
import TitleAsInput from "./TitleAsInput";

type Props = {
  id: string;
  title: string;
  index: number;
  isSection?: boolean;
  parentChaperId?: string | null;
};

function TitleBox({ id, title, index, isSection = false, parentChaperId = null }: Props) {
  // props reqiured for making all the titlebox sortable
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  // style for making all the titlebox sortable
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [sectionQuery, setSectionQuery] = useQueryState("section");
  const [chapterQuery, setChapterQuery] = useQueryState("chapter");

  // get book id from url
  const { bookId } = useParams();

  // if chapter is in query params then open the chapter else keep it close
  const [isOpen, setIsOpen] = useState<boolean>(chapterQuery === id);

  useEffect(() => {
    if (isOpen) {
      setChapterQuery(id);
    }
  }, [isOpen, setChapterQuery, id]);

  // set sections to a state to update sorted order
  const [allSections, setAllSections] = useState<SectionType[]>([]);

  // handle drag end event for sections
  const handleSectionDragEnd = (event: DragEndEvent) => {
    const newOrder = handleDragEnd<SectionType>(event, allSections);
    if (newOrder) setAllSections(newOrder);
    sortSections(newOrder as SectionType[]);
  };

  const { postData } = usePost();

  const sortSections = async (newOrder: SectionType[]) => {
    postData({
      url: `/chapters/${allSections[0]?.chapter}/sections/sort`,
      data: { sortedSections: newOrder },
    });
  };

  // ARCHITECTURE DECISION: fetch sections only when the user clicks on the chapter
  // If this fetchSections is true then the sections will be fetched in useSwr
  const [fetchSections, setFetchSections] = useState<boolean>(chapterQuery === id);

  const { isLoading, error } = useSWR(fetchSections ? `/chapters/${id}/sections` : null, {
    onSuccess: (res) => {
      setAllSections(res.data);
    },
  });

  // when click on a chapter, fetch sections and open that chpater
  const handleChapterClick = () => {
    setFetchSections(true);
    setIsOpen(!isOpen);
    setChapterQuery(id);
  };

  const handleSectionClick = () => {
    setSectionQuery(id);
    setChapterQuery(parentChaperId);
  };

  // custom hook to delete data
  const { deleteData } = useDelete();

  // handle delete chapter or section when user confirms from DeleteConfirmationModal modal
  const handleDelete = () => {
    const url = isSection ? `/sections/${id}` : `/chapters/${id}`;
    deleteData({
      url,
      onSuccess: () => {
        if (isSection) {
          mutate(`/chapters/${parentChaperId}/sections`, undefined, { revalidate: true }); // refectch sections
          if (id === sectionQuery) setSectionQuery(null); // after delete a section , remove its id from query param
        } else {
          // refectch chapters
          mutate(`/books/${bookId}`, undefined, { revalidate: true });
          // after delete a chapter , remove its id from query param
          if (id === chapterQuery) setChapterQuery(null);
        }

        toast.success("Deleted successfully");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };

  const { updateData } = useUpdate();

  const onSuccessCreateSection = () => {
    if (!fetchSections) setFetchSections(true);
    setIsOpen(true);
  };

  if (error) {
    toast.error("Chapter not found");
    notFound();
  }

  return (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        className={`text-sm group ${
          isSection && sectionQuery === id ? "bg-gray-100 dark:bg-gray-800" : ""
        } h-[40px] mb-1 font-medium py-1 px-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer gap-1 flex items-center justify-between`}
      >
        <div className="flex items-center gap-1 flex-1" onClick={isSection ? handleSectionClick : handleChapterClick}>
          <div className="text-gray-500 dark:text-gray-400 group h-6 min-w-[40px] text-sm grid place-items-center rounded">
            <span className="group-hover:hidden pt-[2px] hover:bg-slate-200 dark:hover:bg-blue-400 dark:hover:text-white">{index + 1}</span>
            <div className="flex">
              <div className="hidden rounded group-hover:block hover:bg-slate-200 dark:hover:bg-blue-400 dark:hover:text-white">
                <GripVertical onClick={(e) => e.stopPropagation()} {...attributes} {...listeners} className="w-4 cursor-grab outline-none" />
              </div>
              {!isSection && (
                <div className="hidden rounded group-hover:block hover:bg-slate-200 dark:hover:bg-blue-400 dark:hover:text-white">
                  <ChevronRight className={`w-4 outline-none transition ${isOpen ? "rotate-90" : ""}`} />
                </div>
              )}
            </div>
          </div>

          <TitleAsInput
            title={title}
            handleSubmit={
              isSection ? (title) => updateData({ data: { title }, endpoint: `/sections/${id}`, doMutation: true }) : (title) => updateData({ data: { title }, endpoint: `/chapters/${id}` })
            }
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="hidden transition group-hover:block overflow-hidden">
            <DeleteConfirmationModal onConfirm={handleDelete} text={`Are you sure you want to delete this ${isSection ? "section" : "chapter"}?`}>
              <Trash className="p-1 text-gray-500 dark:text-gray-400 size-6 rounded hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-500" />
            </DeleteConfirmationModal>
          </div>

          {!isSection && (
            <CreateSectionModal onSuccess={onSuccessCreateSection} sectionNumber={allSections ? allSections.length + 1 : 1} chapterId={id}>
              <Plus className="p-1 hidden transition group-hover:block text-gray-500 dark:text-gray-400 size-6 rounded hover:bg-gray-200 dark:hover:bg-gray-700" />
            </CreateSectionModal>
          )}
        </div>
      </div>

      {isOpen && allSections?.length > 0 && (
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleSectionDragEnd}>
          <SortableContext items={allSections?.map((item: SectionType) => item.id)} strategy={verticalListSortingStrategy}>
            <div className="ml-[50px] border-l border-gray-300 dark:border-slate-700">
              {allSections?.map((section: SectionType, index: number) => (
                <TitleBox id={section.id} title={section.title} index={index} key={section.id} isSection={true} parentChaperId={section.chapter} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {isOpen && !isLoading && allSections?.length == 0 && (
        <div className="pl-12">
          <Empty text="No sections" />
        </div>
      )}

      {isLoading && <div className="animate-pulse text-sm bg-gray-200 dark:bg-slate-700 group h-[30px] rounded ml-[40px]"></div>}
    </div>
  );
}

export default TitleBox;
