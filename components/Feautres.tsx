import { IconArrowWaveRightUp, IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

export function Features() {
  const t = useTranslations("homepage");
  return (
    <div className="py-10 md:py-20">
      <h2 className="text-neutrl-900 text-3xl font-medium tracking-tight sm:text-center dark:text-white">{t("features.title")}</h2>
      <p className="mt-2 text-lg text-neutral-600 sm:text-center dark:text-neutral-200 mb-10 max-w-2xl mx-auto">{t("features.description")}</p>
      <BentoGrid className="max-w-4xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem key={i} title={item.title} description={item.description} header={item.header} icon={item.icon} className={i === 3 || i === 6 ? "md:col-span-2" : ""} />
        ))}
      </BentoGrid>
    </div>
  );
}
const items = [
  {
    title: "Multiple Books",
    description: "Create and manage as many books as you want.",
    header: <Image src="/images/f1.jpg" alt="Book Icon" className="w-full h-full min-h-[6rem] object-cover rounded-xl" width={100} height={100} />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Smart Chapters & Sections",
    description: "Organize chapters, add sections, and reorder them easily.",
    header: <Image src="/images/f2.jpg" alt="Book Icon" className="w-full h-full min-h-[6rem] object-cover rounded-xl" width={300} height={200} />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Auto Save",
    description: "Never lose your progress, everything saves automatically.",
    header: <Image src="/images/f3.jpg" alt="Book Icon" className="w-full h-full min-h-[6rem] object-cover rounded-xl" width={300} height={200} />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Multi-language & Dark Mode",
    description: "Personalize your writing space for comfort and focus.",
    header: <Image src="/images/f4.jpg" alt="Book Icon" className="w-full h-full min-h-[6rem] object-cover rounded-xl" width={500} height={500} />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Export & Share",
    description: "Download your book in PDF/Docx or share it with others easily.",
    header: <Image src="/images/f5.jpg" alt="Book Icon" className="w-full h-full min-h-[6rem] object-cover rounded-xl" width={300} height={200} />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
];
