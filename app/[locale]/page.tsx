import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  isLocale,
  locales,
  localeHtmlLang,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { HomeContent } from "@/components/home-content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const languages = Object.fromEntries(
    locales.map((l) => [localeHtmlLang[l], `/${l}`]),
  );
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: { canonical: `/${locale}`, languages },
  };
}

export default async function HomePage({
  params,
  searchParams,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return (
      <main id="main" className="flex-1 bg-white text-[#171717]">
      <h1 className="sr-only">Aureum — {dict.tagline}</h1>
      <Suspense fallback={<ContentFallback />}>
        <HomeContent
          locale={typedLocale}
          dict={dict}
          searchParams={searchParams}
        />
      </Suspense>
    </main>
  );
}

function ContentFallback() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-10 md:px-12 md:py-14">
      <div className="h-6 w-40 bg-surface-raised" />
    </div>
  );
}
