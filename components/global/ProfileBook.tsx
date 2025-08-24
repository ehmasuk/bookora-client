import "@/public/css/profile-book.css";
import { BookType } from "@/types/book";
import Link from "next/link";

function ProfileBook({ title, id, visibility }: BookType) {
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
        <Link href={`/book/${id}`} className="text-sm text-blue-600 hover:text-blue-800">
          Continue writing
        </Link>
      </div>
    </div>
  );
}

export default ProfileBook;
