"use client";

import { useEffect, useId, useState } from "react";

import setCookie from "@/actions/set-cookie";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocale } from "next-intl";

export default function LanguageChanger() {
  const id = useId();

  const language = useLocale();

  const handleChangeLanguage = (val: string) => {
    setCookie("LANGUAGE", val);
  };

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="*:not-first:mt-2">
      {mounted && (
        <Select defaultValue={language} onValueChange={handleChangeLanguage}>
          <SelectTrigger id={id} className="[&>span_svg]:text-muted-foreground/80 [&>span]:flex outline-none cursor-pointer [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
            <SelectItem value="en" className="hover:bg-blue-100 cursor-pointer">
              <span className="truncate">EN</span>
            </SelectItem>
            <SelectItem value="es" className="hover:bg-blue-100 cursor-pointer">
              <span className="truncate">ES</span>
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
