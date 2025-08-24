"use client";

import { useEffect, useId, useState } from "react";

import setCookie from "@/actions/set-cookie";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Globe } from "lucide-react";
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
          <SelectTrigger id={id} className="cursor-pointer h-[36px] dark:bg-transparent">
            <Globe size={16} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="de" className="hover:bg-blue-100 cursor-pointer">
              <span className="truncate">Deutsch</span>
            </SelectItem>
            <SelectItem value="en" className="hover:bg-blue-100 cursor-pointer">
              <span className="truncate">English</span>
            </SelectItem>
            <SelectItem value="es" className="hover:bg-blue-100 cursor-pointer">
              <span className="truncate">Español</span>
            </SelectItem>
            <SelectItem value="fr" className="hover:bg-blue-100 cursor-pointer">
              <span className="truncate">Français</span>
            </SelectItem>
            <SelectItem value="it" className="hover:bg-blue-100 cursor-pointer">
              <span className="truncate">Italiano</span>
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
