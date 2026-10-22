# AGENTS.md: News Website

## Purpose and scope

Build a fast, readable, responsive news website that an editorial team can maintain. These instructions apply across the project. The main reader journey is homepage, category, article, then search and supporting pages.

Read [DESIGN.md](DESIGN.md) before implementing any interface. It defines the requested Motion-inspired visual direction, page layouts, colors, typography and interaction behavior. This file defines functionality, content rules and delivery requirements.

Build the required pages first. Optional features become part of the scope only when requested or already used by the project. This document does not require building every feature at once.

## Working rules

- Inspect the existing project, configuration and code before making changes. Reuse its stack, components, content source and CMS.
- For an empty project, choose the smallest solution that supports indexable pages and article content. Add dependencies only when they solve a concrete requirement.
- Write documentation in English. Use English for initial interface copy and new route names unless the publisher specifies another language. Do not translate published reporting automatically.
- Do not invent a publication name, logo, journalist identity, current news, readership statistics or contact details. Use clearly marked development placeholders until real material is supplied.
- Follow DESIGN.md as the starting visual direction. Its proposed tokens implement the owner's reference; they are not claims about Motion's exact design system.
- Every visible link and control must work. Do not add reader accounts, paywalls or mobile applications without a requirement.
- Keep changes small and clear. Trace all callers before fixing shared behavior; fix the underlying cause once.

## URL structure

- `/`: homepage.
- `/article/[slug]`: article with a permanent URL.
- `/category/[slug]`: category listing.
- `/search?q=[query]&page=[number]`: shareable search results.
- `/author/[slug]`: real author profile and articles.
- `/topic/[slug]`: articles associated with a topic or tag.
- `/archive`: articles filtered by date and category.
- `/about`: publisher identity and editorial team.
- `/contact`: editorial contact and correction requests.
- `/editorial-policy`: sourcing, fact-checking, corrections and sponsored-content policy.
- `/privacy` and `/terms`: policies matching the actual service.
- Provide a real 404 response and appropriate error views for unavailable routes or content.
- Preserve existing published URL conventions. If a published article slug changes, permanently redirect its old URL to the new one.

## Shared components

- Header with publication identity, main navigation, categories and search. The mobile menu must work with a keyboard.
- Footer linking to available publisher, contact, editorial and policy pages.
- Breadcrumbs on article, category, topic and author pages.
- Article previews with title, category, excerpt, optional image, author and publication date. Use valid link structure without nested interactive controls.
- Pagination using real URLs. Preserve the active query and filters; do not require infinite scrolling.
- Clear content labels where relevant: News, Analysis, Opinion and Sponsored.

## Homepage

- One editorially selected lead story with headline, excerpt, image when available and publication time.
- Supporting important stories with less visual emphasis and no duplicate of the lead within the same block.
- Latest stories ordered by publication time, newest first.
- Category sections with actual content and a link to each category page.
- Breaking-news treatment only for published stories marked by an editor. Use a static notice instead of an automatically moving ticker.
- Show Most read only when real readership data exists. Otherwise use Editor's picks backed by actual editorial selections.
- Hide empty sections. If the entire publication has no stories, show an honest empty state.

## Article page

- One H1 headline, followed by an excerpt, category and applicable content-type label.
- A byline linking to the author profile, publication date and a separate update date when appropriate.
- A lead image, when available, with alternative text, caption and source credit. Articles without images must still look complete.
- Body content supporting paragraphs, subheadings, lists, quotations, links and relevant media.
- Checkable sourcing and attribution. Never fabricate quotations or reporting to fill a layout.
- Visible correction notes for factual corrections. Do not change the editorial update date solely for cosmetic changes.
- Sharing using the article's real canonical URL. Copy link must report success or failure and work as a fallback when native sharing is unavailable.
- Related stories based on category or topic, excluding the current article and duplicates.
- A table of contents only for long articles with useful subheadings. Print styles must prioritize the article.
- Drafts, future scheduled stories and withdrawn articles must not leak through public pages or APIs.
- Unknown slugs return a genuine 404, not sample content or a homepage with status 200.

## Category, topic, author and archive pages

- Category: name, brief description, latest articles and pagination. National, World, Business, Technology, Sport and Culture are possible starting categories, subject to publisher selection.
- Topic: topic name and matching tagged articles. Create topics that help readers find coverage.
- Author: real name, biography, coverage areas and published articles. Use supplied or licensed photos; do not invent credentials or social accounts.
- Archive: shareable date and category filters, with validated date ranges.
- Existing entities without articles show an empty state. Unknown entities return 404.

## Search

- Search published titles, excerpts and body content where supported by the content source.
- Prefer the CMS or database's existing search. In-memory search is acceptable for a prototype or small collection; state its limit.
- Show the query, results and pagination. Add category/date filters when the data source supports them.
- An empty query prompts for keywords. No results explains the outcome and offers an easy way to change the query.
- Validate query length and pagination inputs on the server. Use parameterized database queries.
- Reloading and browser Back must preserve the search and filters.

## Supporting pages

- About: publisher identity, editorial purpose and actual team details.
- Contact: real channels for enquiries and corrections. Forms require validation, spam protection and truthful submission feedback.
- Editorial policy: explain source evaluation, fact-checking, published corrections and identification of sponsored content.
- Privacy and terms: reflect actual data collection, service providers and operations. The owner reviews drafts before launch.
- 404: a brief explanation and links to home and search. Server errors offer a safe retry path without exposing internal details.

## Minimum content model

- Article: `id`, `slug`, `title`, `excerpt`, `body`, `authorId`, `categoryId`, `tagIds`, `status`, `publishedAt`, `updatedAt`, `contentType`.
- Optional fields when needed: lead image `{url, alt, caption, credit}`, `featured`, `breaking`, correction notes and custom SEO metadata.
- Author: `id`, `slug`, `name`, `bio` and optional photo.
- Category/topic: `id`, `slug`, `name` and optional description.
- Enforce unique slugs, valid content relationships and one shared public-visibility rule across listings, search, articles, feeds and sitemaps.
- Store timezone-aware timestamps. Use `Asia/Kuala_Lumpur` for displayed publication times unless the publisher sets another market.
- Calculate any reading-time estimate from the content and label it as an estimate.

## Publishing and CMS

- Reuse the existing CMS first. Static or Markdown content is acceptable for a prototype; disclose when publishing still requires file changes.
- If a CMS is needed, support drafts, protected previews, publishing, updates and withdrawal. Add editor review or scheduling when the workflow requires it.
- Enforce administrative authorization on the server. Hiding buttons is insufficient; never expose CMS secrets or private tokens to the browser.
- Validate and sanitize HTML, rich text and embeds with the CMS or an appropriate established library. Never directly render untrusted HTML.
- For uploads, validate file types, sizes and access. Protect session-based mutations against CSRF using the chosen stack's mechanisms.
- Use the provider's backup and restore facilities for stored content, and verify recovery before launch.

## Design and accessibility

- Apply the page-specific layouts and design tokens in DESIGN.md. News and editorial hierarchy remain the primary purpose.
- Keep body typography comfortable, with sufficient line spacing and a reading measure of roughly 60 to 75 characters.
- Use one primary column on phones. Add columns on larger screens only when the content benefits.
- Check at least 360, 768 and 1280 px widths, plus 200% zoom. No horizontal overflow or clipped headlines.
- Use semantic HTML, a skip link, form labels, logical headings, visible focus and sufficient contrast.
- Give primary controls touch targets of at least 44 by 44 px. Menus and dialogs must manage focus and close with Escape.
- Never communicate status through color alone. Respect reduced-motion preferences and avoid autoplay media.
- Exercise long headlines, missing images, short/long articles and applicable loading, empty and error states.

## SEO, sharing and performance

- Deliver important content and metadata in the initial HTML through the chosen stack's rendering capabilities.
- Provide accurate page titles, descriptions, canonicals and sharing metadata; use share images only when valid assets exist.
- NewsArticle structured data must match visible content. Do not invent publisher, author or date information.
- Generate XML sitemaps and robots configuration using the framework's facilities. Include only public articles in sitemaps and feeds; robots is not access control.
- Prevent indexing of drafts, previews, admin pages and internal search results. Keep pagination URLs accessible.
- RSS may reuse published content and metadata when required.
- Reserve image dimensions to reduce layout shifts. Lazy-load below-the-fold images; prioritize the lead image only when appropriate.
- Use responsive images, platform caching and compression. Avoid unnecessary JavaScript, fonts and trackers.
- Corrections and withdrawals must invalidate relevant page, listing and feed caches.

## Optional features

- Newsletter: requires clear consent, a real delivery provider and unsubscribe support.
- Comments: require moderation, reporting and spam protection.
- Reader accounts, bookmarks, paywalls, notifications, multiple languages and live blogs: build when requested.
- Advertising and analytics: integrate when providers are selected; label advertisements and implement the privacy choices required by actual operations.
- Add a theme switch only if requested. DESIGN.md already assigns deliberate dark discovery surfaces and a light reading surface.
- Do not add weather widgets or fabricated activity/readership figures to fill space.

## Implementation order

1. Inspect the stack and content source; establish publisher identity and read DESIGN.md.
2. Implement the content model, public-visibility rule and shared components.
3. Build homepage, article, category and search with working navigation.
4. Complete author, topic, archive, supporting pages and error states.
5. Connect actual publishing, metadata and sitemaps; add only agreed optional features.
6. Run functional, accessibility and build checks before delivery.

## Definition of done

- Homepage, category, article, search and author journeys work without dead links.
- Public access cannot expose drafts or previews through pages, APIs, search, sitemaps or feeds. Include scheduled and withdrawn stories in these checks.
- Leave at least one runnable check for nontrivial logic, especially article visibility. Use existing test tools without adding a framework unnecessarily.
- Check invalid URLs, pagination, empty queries, no results, missing images and content-source failures.
- Test actual menu, form and sharing behavior, keyboard navigation and phone layouts.
- Follow DESIGN.md's visual acceptance checklist, including reduced motion and readable article surfaces.
- Run available build, lint and test commands. Explicitly identify any checks that could not be run.
- Remove development placeholders before launch. The owner verifies policies, publisher information, image credits and contact channels.
- Report completed work, verification evidence and material limitations concisely.
