import type { Dictionary } from "@/lib/i18n/dictionaries";

type PageKey = "about" | "contact" | "editorialPolicy" | "privacy" | "terms";

// Warm paper surface for policy and supporting pages, per DESIGN.md.
export function PaperPage({
  dict,
  pageKey,
}: {
  dict: Dictionary;
  pageKey: PageKey;
}) {
  const page = dict.pages[pageKey];

  return (
    <main id="main" className="flex-1 bg-white text-paper-ink">
      <div className="mx-auto w-full max-w-[760px] px-5 py-12 md:px-8 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.06em] text-paper-muted">
          {dict.pages.placeholder}
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
          {page.title}
        </h1>
        <p className="mt-4 font-mono text-sm text-paper-muted">
          {dict.pages.draftDate}
        </p>
        <div className="mt-10 space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-lg leading-[1.7]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
