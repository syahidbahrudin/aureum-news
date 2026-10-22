import { localeDateTag, type Locale } from "./i18n/config";

const DISPLAY_TIMEZONE = "Asia/Kuala_Lumpur";

// Format a stored ISO timestamp for display in the publisher's market timezone.
export function formatDateTime(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeDateTag[locale], {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: DISPLAY_TIMEZONE,
  }).format(new Date(iso));
}
