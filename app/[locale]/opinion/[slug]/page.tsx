import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getStory,
  storyExcerpt,
  storyHref,
  storyTitle,
  STORIES,
} from "@/lib/content/stories";
import { isLocale, locales, localeHtmlLang, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { StoryPage } from "@/components/story-page";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    STORIES.filter((s) => s.contentType === "opinion").map((s) => ({
      locale,
      slug: s.slug,
    })),
  );
}

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const story = getStory(slug, "opinion");
  if (!story) return {};
  const typedLocale = locale as Locale;
  const languages = Object.fromEntries(
    locales.map((l) => [localeHtmlLang[l], storyHref(l, story)]),
  );
  return {
    title: storyTitle(story, typedLocale),
    description: storyExcerpt(story, typedLocale),
    alternates: { canonical: storyHref(typedLocale, story), languages },
  };
}

export default async function OpinionPage({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const story = getStory(slug, "opinion");
  if (!story) notFound();

  const typedLocale = locale as Locale;
  return (
    <StoryPage
      story={story}
      dict={getDictionary(typedLocale)}
      locale={typedLocale}
    />
  );
}
