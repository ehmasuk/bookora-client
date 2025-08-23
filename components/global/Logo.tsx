import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
      <h1 className="text-base font-bold md:text-2xl">BookOra</h1>
    </Link>
  );
}

export default Logo;
