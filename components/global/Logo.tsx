"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Logo({ className = "", size = "md", redirect = true }: { theme?: string; className?: string; size?: string; redirect?: boolean }) {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getSizeClass = (size: string) => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "md":
        return "text-xl";
      case "lg":
        return "text-3xl";
      default:
        return "text-base";
    }
  };

  if (redirect) {
    return (
      <Link href="/" className={`font-black inline-block select-none cursor-pointer ${theme === "dark" && mounted ? "text-white" : "text-slate-800"} ${getSizeClass(size)} ${className}`}>
        <Image src="/logo.png" alt="BookOra Logo" width={100} height={35} />
      </Link>
    );
  } else {
    return (
      <div className={`font-black inline-block select-none ${theme === "dark" && mounted ? "text-white" : "text-slate-800"} ${getSizeClass(size)} ${className}`}>
        <Image src="/logo.png" alt="BookOra Logo" width={100} height={35} />
      </div>
    );
  }
}

export default Logo;
