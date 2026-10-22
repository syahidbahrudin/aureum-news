"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  locales,
  localeLabels,
  localeNames,
  type Locale,
} from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Category = { id: string; name: string };

const COMPANY_LINKS = [
  { slug: "about", key: "about" },
  { slug: "contact", key: "contact" },
  { slug: "editorial-policy", key: "editorialPolicy" },
  { slug: "privacy", key: "privacy" },
  { slug: "terms", key: "terms" },
] as const;

type Props = {
  locale: Locale;
  dict: Dictionary;
  categories: Category[];
};

function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}

function SearchForm({
  locale,
  dict,
  q,
  idSuffix,
  className,
}: {
  locale: Locale;
  dict: Dictionary;
  q: string;
  idSuffix: string;
  className?: string;
}) {
  const inputId = `site-search-${idSuffix}`;
  return (
    <form
      role="search"
      action={`/${locale}`}
      method="get"
      aria-label={dict.a11y.search}
      className={className}
    >
      <label htmlFor={inputId} className="sr-only">
        {dict.search.label}
      </label>
      <div className="flex items-stretch">
        <input
          id={inputId}
          type="search"
          name="q"
          defaultValue={q}
          placeholder={dict.search.placeholder}
          className="min-w-0 flex-1 border border-[#d4d4d4] bg-white px-3 py-2 text-sm text-[#171717] placeholder:text-[#6b6b6b]"
        />
        <button
          type="submit"
          className="shrink-0 bg-[#171717] px-4 py-2 text-sm font-semibold text-white"
        >
          {dict.search.button}
        </button>
      </div>
    </form>
  );
}

function LanguageSwitcher({
  locale,
  dict,
  q,
  pathSuffix,
  className,
}: {
  locale: Locale;
  dict: Dictionary;
  q: string;
  pathSuffix: string;
  className?: string;
}) {
  const query = !pathSuffix && q ? `?q=${encodeURIComponent(q)}` : "";
  return (
    <nav aria-label={dict.a11y.language} className={className}>
      <ul className="flex items-center gap-1">
        {locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                href={`/${l}${pathSuffix}${query}`}
                hrefLang={l}
                lang={l}
                aria-current={active ? "true" : undefined}
                title={localeNames[l]}
                onClick={() => setLocaleCookie(l)}
                className={`inline-flex min-h-11 items-center px-1.5 text-[13px] tracking-wide ${
                  active
                    ? "font-bold text-[#171717] underline underline-offset-4"
                    : "font-medium text-[#5c5c5c] hover:text-[#171717]"
                }`}
              >
                {localeLabels[l]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function CategoryNav({
  categories,
  dict,
  locale,
  onHome,
  activeId,
  className,
  onNavigate,
}: {
  categories: Category[];
  dict: Dictionary;
  locale: Locale;
  onHome: boolean;
  activeId: string | null;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label={dict.a11y.sectionNav} className={className}>
      <ul className="flex flex-wrap items-center gap-x-1">
        {categories.map((c) => {
          const active = onHome && c.id === activeId;
          return (
            <li key={c.id}>
              <a
                href={onHome ? `#${c.id}` : `/${locale}#${c.id}`}
                aria-current={active ? "true" : undefined}
                onClick={onNavigate}
                className={`inline-flex min-h-11 items-center px-3 text-[15px] ${
                  active
                    ? "font-semibold text-[#171717]"
                    : "text-[#5c5c5c] hover:text-[#171717]"
                }`}
              >
                {c.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SiteHeader({ locale, dict, categories }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const q = searchParams.get("q") ?? "";
  const prefix = `/${locale}`;
  const pathSuffix = pathname.startsWith(prefix)
    ? pathname.slice(prefix.length)
    : "";
  const pageSlug = pathSuffix.replace(/^\//, "").split("/")[0] ?? "";
  const onHome = pageSlug === "";

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Scrollspy: underline the category whose section is in view.
  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  // Close the menu or search with Escape and return focus to its trigger.
  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      } else {
        setSearchOpen(false);
        searchButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    if (menuOpen) {
      panelRef.current
        ?.querySelector<HTMLElement>("a, input, button")
        ?.focus();
    } else {
      document.getElementById("site-search-header")?.focus();
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, searchOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="masthead sticky top-0 z-50 border-b border-[#ececec] bg-white text-[#171717]">
      <div className="relative mx-auto flex h-16 w-full max-w-[1280px] items-center px-3 md:px-8">
        <div className="flex items-center">
          <button
            ref={searchButtonRef}
            type="button"
            aria-expanded={searchOpen}
            aria-controls="header-search"
            onClick={() => {
              setSearchOpen((open) => !open);
              setMenuOpen(false);
            }}
            className="inline-flex h-11 w-11 items-center justify-center"
          >
            <span className="sr-only">{dict.a11y.search}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-[22px] w-[22px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16.5L20 20.5" strokeLinecap="round" />
            </svg>
          </button>
          <span aria-hidden="true" className="mx-1 h-5 w-px bg-[#e4e4e4]" />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => {
              setMenuOpen((open) => !open);
              setSearchOpen(false);
            }}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center"
          >
            <span className="sr-only">
              {menuOpen ? dict.a11y.closeMenu : dict.a11y.openMenu}
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-[22px] w-[22px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        <Link
          href={`/${locale}`}
          className="absolute left-1/2 -translate-x-1/2 text-[1.35rem] font-extrabold tracking-[0.08em]"
        >
          AUREUM
        </Link>

        <LanguageSwitcher
          locale={locale}
          dict={dict}
          q={q}
          pathSuffix={pathSuffix}
          className="ml-auto hidden sm:block"
        />
      </div>

      {searchOpen && (
        <div id="header-search" className="border-t border-[#ececec]">
          <div className="mx-auto w-full max-w-[1280px] px-5 py-3 md:px-8">
            <SearchForm
              locale={locale}
              dict={dict}
              q={q}
              idSuffix="header"
              className="mx-auto w-full max-w-xl"
            />
          </div>
        </div>
      )}

      <nav aria-label={dict.a11y.sectionNav} className="border-t border-[#ececec]">
        <ul className="mx-auto flex w-full max-w-[1280px] items-center gap-1 overflow-x-auto px-3 md:justify-center md:px-8">
          <li>
            <Link
              href={`/${locale}`}
              aria-current={onHome && !activeId ? "page" : undefined}
              onClick={() => setActiveId(null)}
              className={`inline-flex h-12 shrink-0 items-center border-b-2 px-3 text-[15px] ${
                onHome && !activeId
                  ? "border-[#171717] font-semibold text-[#171717]"
                  : "border-transparent text-[#5c5c5c] hover:text-[#171717]"
              }`}
            >
              {dict.nav.home}
            </Link>
          </li>
          {categories.map((c) => {
            const active = onHome && c.id === activeId;
            return (
              <li key={c.id}>
                <a
                  href={onHome ? `#${c.id}` : `/${locale}#${c.id}`}
                  aria-current={active ? "true" : undefined}
                  className={`inline-flex h-12 shrink-0 items-center border-b-2 px-3 text-[15px] ${
                    active
                      ? "border-[#171717] font-semibold text-[#171717]"
                      : "border-transparent text-[#5c5c5c] hover:text-[#171717]"
                  }`}
                >
                  {c.name}
                </a>
              </li>
            );
          })}
          {COMPANY_LINKS.filter(({ slug }) => slug === pageSlug).map(
            ({ slug, key }) => (
              <li key={slug}>
                <Link
                  href={`/${locale}/${slug}`}
                  aria-current="page"
                  className="inline-flex h-12 shrink-0 items-center whitespace-nowrap border-b-2 border-[#171717] px-3 text-[15px] font-semibold text-[#171717]"
                >
                  {dict.footer.links[key]}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="border-t border-[#ececec] bg-white"
        >
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-5 py-5 md:px-8">
            <CategoryNav
              categories={categories}
              dict={dict}
              locale={locale}
              onHome={onHome}
              activeId={activeId}
              onNavigate={closeMenu}
            />
            <ul className="space-y-1 border-t border-[#ececec] pt-3">
              {COMPANY_LINKS.map(({ slug, key }) => (
                <li key={slug}>
                  <Link
                    href={`/${locale}/${slug}`}
                    aria-current={pageSlug === slug ? "page" : undefined}
                    onClick={closeMenu}
                    className="inline-flex min-h-11 items-center text-[15px]"
                  >
                    {dict.footer.links[key]}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#5c5c5c]">
                {dict.a11y.chooseLanguage}
              </p>
              <LanguageSwitcher
                locale={locale}
                dict={dict}
                q={q}
                pathSuffix={pathSuffix}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
