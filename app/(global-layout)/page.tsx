"use client";

import { Button } from "@/components/ui/button";
import { BookText, CheckCircle, Edit3 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

function HomePage() {
  const { data: session } = useSession();

  const t = useTranslations("homepage");

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 -z-10"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[url('/placeholder.svg?height=500&width=1920')] bg-cover bg-center opacity-5 -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 -z-10"></div>

        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#0070F3] text-white shadow hover:bg-[#0070F3]/80 w-fit">
                <span>100% Free Book Creation Tool</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {t.rich("title", {
                    highlight: (text) => <span className="text-blue-600">{text}</span>,
                  })}
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">{t("description")}</p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={session?.user ? `/profile` : `/login`}>
                    <Button variant="primary" size="lg" className="text-lg py-2 px-6">
                      Start for free now!
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-[#0070F3]" />
                    <span>Unlimited books</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-[#0070F3]" />
                    <span>Export anytime</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto lg:mr-0">
              <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                <img src="https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=600" alt="BookOra interface preview" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0070F3]/20 to-transparent"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-48 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <BookText className="h-4 w-4 text-[#0070F3]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">New Chapter</p>
                    <p className="text-xs text-gray-500">Just added</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-48 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Edit3 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Auto-saved</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
