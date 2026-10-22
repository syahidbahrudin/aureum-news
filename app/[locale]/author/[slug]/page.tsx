import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LatestList } from "@/components/story-cards";
import {
  authorSlugs,
  CATEGORY_ORDER,
  getAuthor,
} from "@/lib/content/stories";
import { isLocale, locales, localeHtmlLang, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    authorSlugs().map((slug) => ({ locale, slug })),
  );
}

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const author = getAuthor(slug);
  if (!author) return {};
  const languages = Object.fromEntries(
    locales.map((l) => [localeHtmlLang[l], `/${l}/author/${slug}`]),
  );
  return {
    title: author.name,
    description: getDictionary(locale).pages.placeholder,
    alternates: { canonical: `/${locale}/author/${slug}`, languages },
  };
}

function initial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

export default async function AuthorPage({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const author = getAuthor(slug);
  if (!author) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const covered = CATEGORY_ORDER.filter((id) =>
    author.stories.some((s) => s.category === id),
  );

  return (
    <main id="main" className="flex-1 bg-white text-[#171717]">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-10 md:px-8 md:py-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-[#5c5c5c]">
            <li>
              <a href={`/${typedLocale}`} className="hover:underline">
                {dict.nav.home}
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-[#171717]">{author.name}</li>
          </ol>
        </nav>

        <header className="mt-6 flex items-center gap-4 border-b border-[#e5e5e5] pb-8">
          <span
            aria-hidden="true"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#ececec] text-xl font-semibold"
          >
            {initial(author.name)}
          </span>
          <div className="min-w-0">
            <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
              {author.name}
            </h1>
            <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-[#5c5c5c]">
              {dict.pages.placeholder}
            </p>
            {covered.length > 0 && (
              <p className="mt-2 text-sm text-[#5c5c5c]">
                {covered.map((id, i) => (
                  <span key={id}>
                    {i > 0 ? ", " : null}
                    <a
                      href={`/${typedLocale}#${id}`}
                      className="underline underline-offset-2 hover:text-[#171717]"
                    >
                      {dict.categories[id]}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </div>
        </header>

        <section aria-labelledby="author-stories" className="mt-8">
          <h2
            id="author-stories"
            className="mb-2 border-b border-[#e5e5e5] pb-2 text-2xl font-bold"
          >
            {dict.sections.latest}
          </h2>
          <LatestList
            stories={author.stories}
            dict={dict}
            locale={typedLocale}
          />
        </section>
      </div>
    </main>
  );
}
