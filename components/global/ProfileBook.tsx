import useDelete from "@/hooks/useDelete";
import "@/public/css/profile-book.css";
import { BookType } from "@/types/book";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { mutate } from "swr";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";

interface ProfileBookType extends BookType {
  userId: string;
}

function ProfileBook({ title, id, visibility, userId }: ProfileBookType) {
  const { deleteData } = useDelete();

  const handleDeleteBook = () => {
    deleteData({
      url: `/books/${id}`,
      onSuccess: () => {
        mutate(`/users/${userId}/books`);
      },
    });
  };

  return (
    <div className="flex gap-4 py-6">
      <ul className="book-wraper">
        <li>
          <figure className="book">
            {/* Front */}
            <ul className="hardcover_front">
              <li>
                <div className="coverDesign bg-blue-600">
                  <p>BookOra</p>
                </div>
              </li>
              <li />
            </ul>
            {/* Pages */}
            <ul className="page">
              <li />
              <li>
                <a className="download-btn text-blue-600 hover:text-blue-700 text-sm" href="#">
                  Download
                </a>
              </li>
              <li />
              <li />
              <li />
            </ul>
            {/* Back */}
            <ul className="hardcover_back">
              <li />
              <li />
            </ul>
            <ul className="book_spine">
              <li />
              <li />
            </ul>
          </figure>
        </li>
      </ul>
      <div className="text-left">
        <h1>{title}</h1>
        <p className="text-xs mb-2 text-gray-600 dark:text-gray-300">{visibility}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-5">
            <Link href={`/book/${id}`}>
              <div className="text-sm cursor-pointer flex items-center gap-1 text-blue-500 hover:text-blue-600">
                <Edit size={15} />
                Edit
              </div>
            </Link>

            <DeleteConfirmationModal onConfirm={handleDeleteBook} text="Are you sure you want to delete this book?">
              <div className="text-sm cursor-pointer flex items-center gap-1 text-red-500 hover:text-red-600">
                <Trash size={15} />
                Delete
              </div>
            </DeleteConfirmationModal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBook;
