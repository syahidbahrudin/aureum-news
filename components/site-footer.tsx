import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { type Dictionary, format } from "@/lib/i18n/dictionaries";

type Category = { id: string; name: string };

// Placeholder social accounts. Each points at the contact page until the
// publisher supplies real profile URLs; labels say so for screen readers.
const SOCIAL = [
  { network: "Facebook", icon: FacebookIcon },
  { network: "X", icon: XIcon },
  { network: "YouTube", icon: YouTubeIcon },
  { network: "Instagram", icon: InstagramIcon },
  { network: "LinkedIn", icon: LinkedInIcon },
] as const;

const COMPANY_LINKS = [
  { slug: "about", key: "about" },
  { slug: "contact", key: "contact" },
  { slug: "editorial-policy", key: "editorialPolicy" },
  { slug: "privacy", key: "privacy" },
  { slug: "terms", key: "terms" },
] as const;

export function SiteFooter({
  locale,
  dict,
  categories,
}: {
  locale: Locale;
  dict: Dictionary;
  categories: Category[];
}) {
  const f = dict.footer;

  return (
    <footer className="border-t border-rule bg-surface">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-10 md:px-12 md:py-14">
        <div className="flex flex-col gap-6 border-b border-rule pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center bg-accent text-lg font-bold leading-none text-accent-ink"
              >
                A
              </span>
              <span className="text-lg font-bold tracking-tight">Aureum</span>
            </div>
            <p className="mt-4 max-w-[52ch] text-sm text-text-muted">
              {f.description}
            </p>
          </div>

          <ul className="flex items-center gap-1">
            {SOCIAL.map(({ network, icon: Icon }) => (
              <li key={network}>
                <Link
                  href={`/${locale}/contact`}
                  aria-label={format(f.socialPlaceholder, { network })}
                  className="inline-flex h-11 w-11 items-center justify-center text-text-muted transition-colors hover:text-text"
                >
                  <Icon />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.length > 0 && (
            <nav aria-label={f.sectionsHeading}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.06em] text-text-muted">
                {f.sectionsHeading}
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/${locale}#${c.id}`}
                      className="text-text transition-colors hover:text-accent"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <nav aria-label={f.companyHeading}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.06em] text-text-muted">
              {f.companyHeading}
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {COMPANY_LINKS.map(({ slug, key }) => (
                <li key={slug}>
                  <Link
                    href={`/${locale}/${slug}`}
                    className="text-text transition-colors hover:text-accent"
                  >
                    {f.links[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.06em] text-text-muted">
              {f.contactHeading}
            </h2>
            <p className="mt-4 max-w-[40ch] whitespace-pre-line text-sm text-text-muted">
              {f.contactBody}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="mt-3 inline-block text-sm text-text underline underline-offset-4 transition-colors hover:text-accent"
            >
              {f.links.contact}
            </Link>
          </div>
        </div>
        <p className="mt-2 text-xs text-text-muted">{f.rights}</p>
      </div>
    </footer>
  );
}

// Inline icons keep the footer dependency-free. aria-hidden since the link
// carries the accessible name.
function iconProps() {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  } as const;
}

function FacebookIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.3 0-1.3-.1-2.45-.1-2.4 0-4.05 1.47-4.05 4.17v2.33H7.8V13h2.7v8h3z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M17.5 3h3l-6.55 7.5L21.7 21h-5.9l-4.6-6-5.3 6H2.9l7-8L2.6 3h6.05l4.15 5.5L17.5 3zm-1.05 16h1.65L7.65 4.7H5.9L16.45 19z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.75-1.75C18.35 5.1 12 5.1 12 5.1s-6.35 0-7.85.45A2.5 2.5 0 0 0 2.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.75 1.75c1.5.45 7.85.45 7.85.45s6.35 0 7.85-.45a2.5 2.5 0 0 0 1.75-1.75C22 15.2 22 12 22 12zm-12 3V9l5.2 3-5.2 3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.75A3.05 3.05 0 1 1 12 8.95a3.05 3.05 0 0 1 0 6.1zM16.9 5.6a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM20.9 7.8c-.05-1-.23-1.9-.96-2.63C19.2 4.44 18.3 4.26 17.3 4.2 16.27 4.15 13 4.15 12 4.15s-4.27 0-5.3.05c-1 .06-1.9.24-2.63.97C3.34 5.9 3.16 6.8 3.1 7.8 3.05 8.83 3.05 12.1 3.05 13.1s0 4.27.05 5.3c.06 1 .24 1.9.97 2.63.73.73 1.63.91 2.63.97 1.03.05 4.3.05 5.3.05s4.27 0 5.3-.05c1-.06 1.9-.24 2.63-.97.73-.73.91-1.63.96-2.63.05-1.03.05-4.3.05-5.3s0-4.27-.05-5.3zm-2.2 11.6a3.1 3.1 0 0 1-1.75 1.75c-1.2.48-4.07.37-5.4.37s-4.2.11-5.4-.37a3.1 3.1 0 0 1-1.75-1.75c-.48-1.2-.37-4.07-.37-5.4s-.11-4.2.37-5.4A3.1 3.1 0 0 1 6.6 6.45c1.2-.48 4.07-.37 5.4-.37s4.2-.11 5.4.37a3.1 3.1 0 0 1 1.75 1.75c.48 1.2.37 4.07.37 5.4s.11 4.2-.37 5.4z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.3 8.4h3.28V21H3.3V8.4zM9.1 8.4h3.14v1.72h.05c.44-.83 1.5-1.72 3.1-1.72 3.3 0 3.9 2.17 3.9 5v7.6h-3.27v-6.74c0-1.6-.03-3.67-2.24-3.67-2.24 0-2.58 1.75-2.58 3.56V21H9.1V8.4z" />
    </svg>
  );
}
