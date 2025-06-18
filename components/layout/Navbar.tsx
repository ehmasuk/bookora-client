"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import AvatarDropdown from "../global/AvatarDropdown";
import LanguageChanger from "../global/LanguageChanger";
import Logo from "../global/Logo";
import ThemeChanger from "../global/ThemeChanger";
import { Button } from "../ui/button";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <LanguageChanger />
            <ThemeChanger />
          </div>

          {status === "authenticated" && session?.user && <AvatarDropdown image={session?.user?.image} name={session.user.name || ""} email={session.user.email || ""} />}

          {status === "unauthenticated" && (
            <>
              <Link href="/login">
                <Button variant="outline" className="hidden sm:flex">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#0070F3] hover:bg-[#0052CC] text-white">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
