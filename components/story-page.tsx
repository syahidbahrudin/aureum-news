import Image from "next/image";
import { formatDateTime } from "@/lib/datetime";
import { readingMinutes } from "@/lib/content/reading";
import {
  authorHref,
  getRelated,
  storyBody,
  storyExcerpt,
  storyHref,
  storyImage,
  storyTitle,
  type Story,
} from "@/lib/content/stories";
import type { Locale } from "@/lib/i18n/config";
import { format, type Dictionary } from "@/lib/i18n/dictionaries";
import { ShareLinks } from "@/components/share-link";
import { Markdown } from "@/components/markdown";

export function StoryPage({
  story,
  dict,
  locale,
}: {
  story: Story;
  dict: Dictionary;
  locale: Locale;
}) {
  const title = storyTitle(story, locale);
  const excerpt = storyExcerpt(story, locale);
  const image = storyImage(story);
  const minutes = readingMinutes(`${title} ${excerpt}`);
  const related = getRelated(story, 3);

  return (
    <main id="main" className="flex-1 bg-white text-[#171717]">
      <article className="mx-auto w-full max-w-[760px] px-5 py-10 md:px-8 md:py-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-[#5c5c5c]">
            <li>
              <a href={`/${locale}`} className="hover:underline">
                {dict.nav.home}
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href={`/${locale}#${story.category}`} className="hover:underline">
                {dict.categories[story.category]}
              </a>
            </li>
            <li aria-hidden="true">·</li>
            <li className="font-semibold text-[#171717]">
              {dict.contentType[story.contentType]}
            </li>
          </ol>
        </nav>

        <h1 className="mt-4 text-[clamp(1.9rem,3vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
          {title}
        </h1>
        <p className="mt-4 max-w-[62ch] text-lg leading-[1.6] text-[#5c5c5c]">
          {excerpt}
        </p>

        <div className="mt-6 flex flex-col gap-1 border-y border-[#e5e5e5] py-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#5c5c5c]">
            <span>
              {dict.labels.byline}{" "}
              <a
                href={authorHref(locale, story.author)}
                className="font-medium text-[#171717] underline underline-offset-2 hover:text-[#33541a]"
              >
                {story.author}
              </a>
            </span>
            <span className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="h-3.5 w-px bg-[#d4d4d4]" />
              <time dateTime={story.publishedAt}>
                {formatDateTime(story.publishedAt, locale)}
              </time>
            </span>
            <span className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="h-3.5 w-px bg-[#d4d4d4]" />
              {format(dict.labels.readingTime, { min: minutes })}
            </span>
          </p>
          <ShareLinks
            dict={dict}
            title={title}
            path={storyHref(locale, story)}
          />
        </div>

        <figure className="mt-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#ececec]">
            <Image
              src={image.src}
              alt={image.alt[locale]}
              fill
              sizes="(min-width: 760px) 760px, 100vw"
              priority
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-sm leading-snug text-[#5c5c5c]">
            {dict.labels.imageCaption}. {dict.labels.imageCredit}
          </figcaption>
        </figure>

        <div className="mt-8 space-y-5 text-lg leading-[1.75]">
          <p className="rounded-md bg-[#f5f5f5] px-4 py-3 text-sm text-[#5c5c5c]">
            {dict.pages.placeholder}
          </p>
          <Markdown source={storyBody(story, locale)} />
        </div>

        {story.comments.length > 0 && (
          <section
            aria-labelledby="story-comments"
            className="mt-12 border-t border-[#e5e5e5] pt-8"
          >
            <h2 id="story-comments" className="text-2xl font-bold">
              {dict.sections.topComments}
            </h2>
            <ol className="mt-4 divide-y divide-[#e5e5e5]">
              {story.comments.map((comment) => (
                <li key={comment.id} className="py-4">
                  <p className="text-sm">
                    <span className="font-semibold">
                      {dict.labels.sampleReader}
                    </span>
                    <time
                      dateTime={comment.postedAt}
                      className="ml-3 text-[13px] text-[#5c5c5c]"
                    >
                      {formatDateTime(comment.postedAt, locale)}
                    </time>
                  </p>
                  <p className="mt-1 text-[15px] leading-relaxed">
                    {comment.text[locale]}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {related.length > 0 && (
          <section
            aria-labelledby="story-related"
            className="mt-12 border-t border-[#e5e5e5] pt-8"
          >
            <h2 id="story-related" className="text-2xl font-bold">
              {dict.sections.related}
            </h2>
            <ul className="mt-4 divide-y divide-[#e5e5e5]">
              {related.map((s) => (
                <li key={s.id} className="py-4">
                  <a
                    href={storyHref(locale, s)}
                    className="block text-lg font-semibold leading-snug hover:underline"
                  >
                    {storyTitle(s, locale)}
                  </a>
                  <p className="mt-1 max-w-[72ch] text-sm text-[#5c5c5c]">
                    {storyExcerpt(s, locale)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
