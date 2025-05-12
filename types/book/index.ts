export interface BookType {
  id: string;
  title: string;
  summary: string;
  author: string;
  visibility: string;
  image: string | null;
  chapters: ChapterType[];
}

export interface ChapterType {
  id: string;
  title: string;
}

export interface SectionType {
  chapter:string;
  id: string;
  title: string;
  note: string;
  content: object;
}
