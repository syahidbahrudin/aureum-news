import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Geist,
  Geist_Mono,
  Noto_Sans_SC,
  Noto_Sans_Tamil,
} from "next/font/google";
import "../globals.css";
import { isLocale, locales, localeHtmlLang, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { CATEGORY_ORDER, getCategoriesWithStories } from "@/lib/content/stories";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Chinese and Tamil glyphs are not in Geist, so load dedicated faces for those
// locales only. Not preloaded to avoid shipping large fonts to every reader.
const notoSC = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const notoTamil = Noto_Sans_Tamil({
  weight: ["400", "500", "700"],
  subsets: ["tamil"],
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aureum — News",
  description:
    "Aureum is a development news website. All stories shown are clearly marked samples.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function bodyFontClass(locale: Locale): string {
  if (locale === "zh") return notoSC.className;
  if (locale === "ta") return notoTamil.className;
  return geistSans.className;
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  // Only link to categories that actually have stories on the homepage.
  const withStories = new Set(getCategoriesWithStories());
  const categories = CATEGORY_ORDER.filter((id) => withStories.has(id)).map(
    (id) => ({ id, name: dict.categories[id] }),
  );

  return (
    <html
      lang={localeHtmlLang[locale]}
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body className={`${bodyFontClass(locale)} min-h-full flex flex-col`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-ink"
        >
          {dict.a11y.skipToContent}
        </a>

        <Suspense fallback={<HeaderFallback />}>
          <SiteHeader locale={locale} dict={dict} categories={categories} />
        </Suspense>

        {children}

        <SiteFooter locale={locale} dict={dict} categories={categories} />
      </body>
    </html>
  );
}

function HeaderFallback() {
  return <div className="sticky top-0 z-50 h-[60px] bg-accent md:h-[72px]" />;
}
