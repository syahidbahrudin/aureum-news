import Image from "next/image";
import { formatDateTime } from "@/lib/datetime";
import { readingMinutes } from "@/lib/content/reading";
import {
  authorHref,
  storyExcerpt,
  storyHref,
  storyImage,
  storyTitle,
  type RankedComment,
  type Story,
} from "@/lib/content/stories";
import type { Locale } from "@/lib/i18n/config";
import { format, type Dictionary } from "@/lib/i18n/dictionaries";

function StoryFigure({
  story,
  dict,
  locale,
  frame,
  priority = false,
}: {
  story: Story;
  dict: Dictionary;
  locale: Locale;
  frame: "lead" | "feature" | "thumb";
  priority?: boolean;
}) {
  const image = storyImage(story);
  const isThumb = frame === "thumb";
  const sizes =
    frame === "lead"
      ? "(min-width: 1024px) 720px, 100vw"
      : frame === "feature"
        ? "(min-width: 1024px) 640px, 100vw"
        : "144px";

  const frameClass =
    frame === "lead"
      ? "aspect-[16/10] w-full rounded-2xl"
      : frame === "feature"
        ? "aspect-video w-full rounded-xl"
        : "aspect-video w-[7.25rem] shrink-0 rounded-lg sm:w-32";

  return (
    <figure>
      <div
        className={`group relative overflow-hidden bg-[#ececec] ${frameClass}`}
      >
        <Image
          src={image.src}
          alt={image.alt[locale]}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-safe:group-hover:scale-[1.02]"
        />
      </div>
      {isThumb ? null : (
        <figcaption className="mt-2 text-sm leading-snug text-[#5c5c5c]">
          {dict.labels.imageCaption}. {dict.labels.imageCredit}
        </figcaption>
      )}
    </figure>
  );
}

function authorInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

function commentLabel(count: number, dict: Dictionary) {
  if (count === 1) return dict.labels.commentOne;
  return format(dict.labels.commentCount, { count });
}

function StoryFacts({
  story,
  dict,
  locale,
  linkComments = false,
}: {
  story: Story;
  dict: Dictionary;
  locale: Locale;
  linkComments?: boolean;
}) {
  const minutes = readingMinutes(
    `${storyTitle(story, locale)} ${storyExcerpt(story, locale)}`,
  );
  const count = story.comments.length;
  const comments = commentLabel(count, dict);
  return (
    <p className="flex flex-wrap gap-x-3 text-[13px] text-[#5c5c5c]">
      <span>{format(dict.labels.readingTime, { min: minutes })}</span>
      {linkComments ? (
        <a href="#comments" className="underline">
          {comments}
        </a>
      ) : (
        <span>{comments}</span>
      )}
    </p>
  );
}

function Byline({
  story,
  dict,
  locale,
  linkComments = false,
}: {
  story: Story;
  dict: Dictionary;
  locale: Locale;
  linkComments?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-2.5 text-sm text-[#5c5c5c]">
        <span
          aria-hidden="true"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#ececec] text-xs font-semibold text-[#171717]"
        >
          {authorInitial(story.author)}
        </span>
        <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
          <a
            href={authorHref(locale, story.author)}
            className="font-medium text-[#171717] underline underline-offset-2 hover:text-[#33541a]"
          >
            {story.author}
          </a>
          <span aria-hidden="true" className="h-3.5 w-px bg-[#d4d4d4]" />
          <a href={`#${story.category}`} className="hover:underline">
            {dict.categories[story.category]}
          </a>
          <span className="text-xs uppercase tracking-wide">
            {dict.contentType[story.contentType]}
          </span>
          <time dateTime={story.publishedAt} className="text-[13px]">
            {formatDateTime(story.publishedAt, locale)}
          </time>
        </div>
      </div>
      <StoryFacts
        story={story}
        dict={dict}
        locale={locale}
        linkComments={linkComments}
      />
    </div>
  );
}

export function CommentSection({
  items,
  dict,
  locale,
}: {
  items: RankedComment[];
  dict: Dictionary;
  locale: Locale;
}) {
  if (items.length === 0) return null;
  return (
    <section
      id="comments"
      aria-labelledby="comments-heading"
      className="scroll-mt-24"
    >
      <h2
        id="comments-heading"
        className="mb-5 border-b border-[#e5e5e5] pb-2 text-2xl font-bold md:text-3xl"
      >
        {dict.sections.topComments}
      </h2>
      <ol className="divide-y divide-[#e5e5e5]">
        {items.map(({ comment, story }) => (
          <li key={comment.id} className="py-4">
            <p className="text-sm">
              <span className="font-semibold">{dict.labels.sampleReader}</span>
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
            <a
              href={storyHref(locale, story)}
              className="mt-1 inline-block text-sm underline"
            >
              {storyTitle(story, locale)}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function OpinionRail({
  stories,
  dict,
  locale,
}: {
  stories: Story[];
  dict: Dictionary;
  locale: Locale;
}) {
  if (stories.length === 0) return null;
  return (
    <section aria-labelledby="top-opinion-heading" className="mt-10">
      <h2
        id="top-opinion-heading"
        className="mb-5 border-b border-[#e5e5e5] pb-2 text-2xl font-bold md:text-3xl"
      >
        {dict.sections.topOpinion}
      </h2>
      <ol className="divide-y divide-[#e5e5e5]">
        {stories.map((story) => (
          <li key={story.id} className="py-4">
            <article className="flex flex-col gap-1">
              <p className="text-sm text-[#5c5c5c]">
                <span className="font-medium text-[#171717]">
                  {story.author}
                </span>
              </p>
              <h3 className="text-base font-semibold leading-snug">
                <a href={storyHref(locale, story)} className="hover:underline">
                  {storyTitle(story, locale)}
                </a>
              </h3>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function LeadStory({
  story,
  dict,
  locale,
}: {
  story: Story;
  dict: Dictionary;
  locale: Locale;
}) {
  const href = storyHref(locale, story);
  const title = storyTitle(story, locale);
  return (
    <article>
      <a href={href} aria-label={title} className="block">
        <StoryFigure
          story={story}
          dict={dict}
          locale={locale}
          frame="lead"
          priority
        />
      </a>
      <div className="mt-4">
        <Byline story={story} dict={dict} locale={locale} linkComments />
      </div>
      <h2 className="mt-3 text-[clamp(1.75rem,2.8vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.03em]">
        <a href={href} className="hover:underline">
          {title}
        </a>
      </h2>
      <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-[#5c5c5c]">
        {storyExcerpt(story, locale)}
      </p>
      <a
        href={href}
        className="mt-2 inline-flex min-h-11 items-center text-[15px] font-bold hover:underline"
      >
        {dict.sections.readMore}
      </a>
    </article>
  );
}

export function SupportingList({
  stories,
  dict,
  locale,
}: {
  stories: Story[];
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <ul className="flex flex-col">
      {stories.map((s) => {
        const href = storyHref(locale, s);
        return (
          <li key={s.id} className="border-b border-[#ececec] py-4 first:pt-0">
            <article>
              <div className="flex gap-4">
                <a
                  href={href}
                  aria-label={storyTitle(s, locale)}
                  className="shrink-0"
                >
                  <StoryFigure
                    story={s}
                    dict={dict}
                    locale={locale}
                    frame="thumb"
                  />
                </a>
                <h3 className="min-w-0 text-[17px] font-bold leading-snug">
                  <a href={href} className="hover:underline">
                    {storyTitle(s, locale)}
                  </a>
                </h3>
              </div>
              <div className="mt-3">
                <Byline story={s} dict={dict} locale={locale} />
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

export function AuthorStrip({
  stories,
  dict,
  locale,
}: {
  stories: Story[];
  dict: Dictionary;
  locale: Locale;
}) {
  const authors: Story[] = [];
  const seen = new Set<string>();
  for (const story of stories) {
    if (seen.has(story.author)) continue;
    seen.add(story.author);
    authors.push(story);
  }
  if (authors.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">{dict.sections.editorsPicks}</h2>
      <ul className="mt-4 grid grid-cols-2 gap-4">
        {authors.map((story) => (
          <li key={story.author}>
            <a
              href={authorHref(locale, story.author)}
              className="flex min-h-11 items-center gap-3 hover:underline"
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ececec] text-sm font-semibold"
              >
                {authorInitial(story.author)}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">
                  {story.author}
                </span>
                <span className="block text-xs text-[#5c5c5c] no-underline">
                  {dict.categories[story.category]}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LatestList({
  stories,
  dict,
  locale,
}: {
  stories: Story[];
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <ol className="divide-y divide-[#e5e5e5]">
      {stories.map((s) => (
        <li key={s.id} className="py-4">
          <article className="flex gap-4">
            <StoryFigure story={s} dict={dict} locale={locale} frame="thumb" />
            <div className="flex min-w-0 flex-col gap-1.5">
              <Byline story={s} dict={dict} locale={locale} />
              <h3 className="text-xl font-semibold leading-snug">
                <a href={storyHref(locale, s)} className="hover:underline">
                  {storyTitle(s, locale)}
                </a>
              </h3>
              <p className="max-w-[72ch] text-sm text-[#5c5c5c]">
                {storyExcerpt(s, locale)}
              </p>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}

export function CategoryBlock({
  id,
  name,
  stories,
  dict,
  locale,
}: {
  id: string;
  name: string;
  stories: Story[];
  dict: Dictionary;
  locale: Locale;
}) {
  const reporting = stories.filter((s) => s.contentType !== "opinion");
  const opinions = stories.filter((s) => s.contentType === "opinion");
  const [featured, ...rest] = reporting;
  if (!featured && opinions.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`cat-${id}`} className="scroll-mt-24">
      <div className="mb-5 border-b border-[#e5e5e5] pb-2">
        <h2 id={`cat-${id}`} className="text-2xl font-bold md:text-3xl">
          {name}
        </h2>
      </div>
      {featured && (
      <div className="grid gap-8 lg:grid-cols-3">
        <article className="flex flex-col gap-3 lg:col-span-2">
          <Byline story={featured} dict={dict} locale={locale} />
          <h3 className="text-2xl font-semibold leading-tight md:text-3xl">
            <a href={storyHref(locale, featured)} className="hover:underline">
              {storyTitle(featured, locale)}
            </a>
          </h3>
          <StoryFigure
            story={featured}
            dict={dict}
            locale={locale}
            frame="feature"
          />
          <p className="max-w-[60ch] text-base text-[#5c5c5c] md:text-lg">
            {storyExcerpt(featured, locale)}
          </p>
        </article>
        {rest.length > 0 && (
          <ul className="flex flex-col divide-y divide-[#e5e5e5] border-t border-[#e5e5e5] lg:border-t-0 lg:border-l lg:pl-6">
            {rest.map((s) => (
              <li key={s.id} className="py-4 first:pt-4 lg:first:pt-0">
                <article className="flex gap-3">
                  <StoryFigure
                    story={s}
                    dict={dict}
                    locale={locale}
                    frame="thumb"
                  />
                  <div className="flex min-w-0 flex-col gap-2">
                    <Byline story={s} dict={dict} locale={locale} />
                    <h3 className="text-base font-semibold leading-snug">
                      <a href={storyHref(locale, s)} className="hover:underline">
                        {storyTitle(s, locale)}
                      </a>
                    </h3>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
      )}
      {opinions.length > 0 && (
        <div className={featured ? "mt-12 border-t border-[#e5e5e5] pt-8" : ""}>
          <h3 className="font-mono text-[13px] font-semibold uppercase tracking-[0.06em]">
            {dict.sections.opinion}
          </h3>
          <ul className="mt-4 grid gap-8 md:grid-cols-2">
            {opinions.map((s) => (
              <li key={s.id}>
                <article className="flex flex-col gap-2">
                  <Byline story={s} dict={dict} locale={locale} />
                  <h4 className="text-xl font-semibold leading-snug">
                    <a href={storyHref(locale, s)} className="hover:underline">
                      {storyTitle(s, locale)}
                    </a>
                  </h4>
                  <p className="max-w-[60ch] text-sm text-[#5c5c5c]">
                    {storyExcerpt(s, locale)}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function SearchResultList({
  stories,
  dict,
  locale,
}: {
  stories: Story[];
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <ol className="divide-y divide-[#e5e5e5] border-y border-[#e5e5e5]">
      {stories.map((s) => (
        <li key={s.id} className="py-5">
          <article className="flex gap-4">
            <StoryFigure story={s} dict={dict} locale={locale} frame="thumb" />
            <div className="flex min-w-0 flex-col gap-2">
              <Byline story={s} dict={dict} locale={locale} />
              <h3 className="text-xl font-semibold leading-snug">
                <a href={storyHref(locale, s)} className="hover:underline">
                  {storyTitle(s, locale)}
                </a>
              </h3>
              <p className="max-w-[72ch] text-sm text-[#5c5c5c]">
                {storyExcerpt(s, locale)}
              </p>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
