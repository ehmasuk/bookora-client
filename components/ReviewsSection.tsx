import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Sophia",
    username: "@sophiawrites",
    body: "Bookora makes writing so easy. I created my first novel outline in just one day!",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Ethan",
    username: "@ethan_author",
    body: "I love how I can organize chapters and sections. It feels like a professional writing tool.",
    img: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Olivia",
    username: "@olivia_books",
    body: "Auto-save is a lifesaver. I never worry about losing my drafts anymore.",
    img: "https://i.pravatar.cc/150?img=9",
  },
  {
    name: "Liam",
    username: "@liamnovelist",
    body: "The dark mode is perfect for late-night writing. Bookora really thought of everything.",
    img: "https://i.pravatar.cc/150?img=4",
  },
  {
    name: "Ava",
    username: "@ava_creates",
    body: "Exporting my book to PDF was so smooth. Now I can easily share my work with friends.",
    img: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Noah",
    username: "@noahwriter",
    body: "This is the tool I have been waiting for. Writing, organizing, and publishing all in one place.",
    img: "https://i.pravatar.cc/150?img=6",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }: { img: string; name: string; username: string; body: string }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function ReviewsSection() {
  return (
    <div className="relative py-20 flex w-full max-w-4xl mx-auto flex-col items-center justify-center overflow-hidden">
      <h2 className="text-neutrl-900 text-3xl font-medium tracking-tight sm:text-center dark:text-white">Loved by thousands of people</h2>
      <p className="mt-2 text-lg text-neutral-600 sm:text-center dark:text-neutral-200 mb-10">Here are what some of our users have to say about BookOra.</p>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
