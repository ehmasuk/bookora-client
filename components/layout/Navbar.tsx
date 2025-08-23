"use client";

import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AvatarDropdown from "../global/AvatarDropdown";
import LanguageChanger from "../global/LanguageChanger";
import Logo from "../global/Logo";
import { Button } from "../ui/button";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        <div className="flex items-center gap-3">
          {status === "unauthenticated" && (
            <>
              <Link href="/register">
                <Button className="bg-black dark:bg-white dark:hover:bg-gray-100 hover:bg-slate-800 text-white dark:text-black">Get Started</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="hidden sm:flex">
                  Log In
                </Button>
              </Link>
            </>
          )}

          {status === "authenticated" && session?.user && <AvatarDropdown />}

          <LanguageChanger />
          <AnimatedThemeToggler className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
