import { format, type Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import {
  getBreakingStory,
  getCategoriesWithStories,
  getEditorsPicks,
  getLatestStories,
  getLeadStory,
  getOpinionStories,
  getStoriesByCategory,
  getTopComments,
  searchStories,
  storyHref,
  storyTitle,
} from "@/lib/content/stories";
import {
  AuthorStrip,
  CategoryBlock,
  LatestList,
  CommentSection,
  LeadStory,
  OpinionRail,
  SearchResultList,
  SupportingList,
} from "@/components/story-cards";

const MAX_QUERY_LENGTH = 100;

type SearchParams = { [key: string]: string | string[] | undefined };

function readQuery(params: SearchParams): string {
  const raw = params.q;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return (value ?? "").toString().slice(0, MAX_QUERY_LENGTH).trim();
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-6 md:px-8 md:py-8">
      {children}
    </div>
  );
}

function BreakingNotice({
  title,
  href,
  dict,
}: {
  title: string;
  href: string;
  dict: Dictionary;
}) {
  return (
    <div className="mb-6 border border-[#e5e5e5] px-4 py-3">
      <p className="flex flex-wrap items-center gap-3">
        <span className="bg-[#f7df45] px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-[#171717]">
          {dict.labels.breaking}
        </span>
        <a href={href} className="font-semibold hover:underline">
          {title}
        </a>
      </p>
    </div>
  );
}

function SearchView({
  q,
  dict,
  locale,
}: {
  q: string;
  dict: Dictionary;
  locale: Locale;
}) {
  const results = searchStories(q, locale);
  return (
    <Container>
      <div className="mb-6">
        <h2 className="text-2xl font-bold md:text-3xl">
          {format(dict.search.resultsFor, { q })}
        </h2>
        <p className="mt-1 font-mono text-sm text-[#5c5c5c]">
          {format(dict.search.count, { count: results.length })}
        </p>
      </div>
      {results.length > 0 ? (
        <SearchResultList stories={results} dict={dict} locale={locale} />
      ) : (
        <div className="border-y border-[#e5e5e5] py-8">
          <h3 className="text-lg font-semibold">
            {dict.search.noResultsTitle}
          </h3>
          <p className="mt-2 max-w-[60ch] text-[#5c5c5c]">
            {format(dict.search.noResultsBody, { q })}
          </p>
        </div>
      )}
    </Container>
  );
}

function HomeSections({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const lead = getLeadStory();
  const supporting = getLatestStories(4).filter((s) => s.id !== lead?.id);
  const latest = getLatestStories(6);
  const categories = getCategoriesWithStories();
  const picks = getEditorsPicks(3);
  const breaking = getBreakingStory();

  return (
    <Container>
      {breaking && (
        <BreakingNotice
          title={storyTitle(breaking, locale)}
          href={storyHref(locale, breaking)}
          dict={dict}
        />
      )}

      {lead && (
        <section className="grid items-start gap-10 md:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] md:gap-x-10">
          <LeadStory story={lead} dict={dict} locale={locale} />
          <aside>
            <SupportingList
              stories={supporting.slice(0, 3)}
              dict={dict}
              locale={locale}
            />
            <AuthorStrip stories={picks} dict={dict} locale={locale} />
          </aside>
        </section>
      )}

      <section className="mt-16 grid items-stretch gap-10 md:mt-24 md:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] md:gap-x-10">
        <div className="border-b border-[#e5e5e5]">
          <h2 className="mb-5 border-b border-[#e5e5e5] pb-2 text-2xl font-bold md:text-3xl">
            {dict.sections.latest}
          </h2>
          <LatestList stories={latest} dict={dict} locale={locale} />
        </div>
        <div>
          <CommentSection
            items={getTopComments(5)}
            dict={dict}
            locale={locale}
          />
          <OpinionRail
            stories={getOpinionStories(5)}
            dict={dict}
            locale={locale}
          />
        </div>
      </section>

      {categories.map((id) => (
        <div key={id} className="mt-16 md:mt-24">
          <CategoryBlock
            id={id}
            name={dict.categories[id]}
            stories={getStoriesByCategory(id)}
            dict={dict}
            locale={locale}
          />
        </div>
      ))}

    </Container>
  );
}

export async function HomeContent({
  locale,
  dict,
  searchParams,
}: {
  locale: Locale;
  dict: Dictionary;
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const q = readQuery(params);

  if (q) {
    return <SearchView q={q} dict={dict} locale={locale} />;
  }
  return <HomeSections dict={dict} locale={locale} />;
}
