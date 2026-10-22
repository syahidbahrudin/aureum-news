# DESIGN.md: Motion-Inspired News Website

## Design brief

Create a contemporary news publication with bold typography, a yellow masthead, near-black discovery pages, precise rectangular framing and responsive interaction. Give the top story a clear focal point and make long-form reading comfortable.

The owner requested the visual feel of [Motion](https://motion.dev/). The reference was inspected on 9 October 2026. Its visible cues include a bright yellow navigation bar, near-black panels, tightly set sans-serif headings, compact monospace labels, fine dividing rules and a colorful animated hero.

Everything below is a proposed adaptation for this news website, not an extraction of Motion's exact tokens or assets. Keep the publication's own name, content, photography and page composition. The reference provides visual direction; it does not require using the Motion library.

Read [AGENTS.md](AGENTS.md) for functionality, routes, content integrity and implementation requirements.

## Character and design decisions

- Character: confident, immediate, structured and editorial.
- Audience: readers who scan current coverage, then spend time with individual stories.
- ENERGY 3/5: strong headline contrast and a vivid masthead create recognition.
- RHYTHM 3/5: alternate a prominent lead story, compact news rows and category features to express editorial importance.
- MOTION 2/5: short responses to input and navigation; reading remains still.
- Identity motif: yellow masthead, sharp headline blocks, restrained metadata and rules that organize real content.
- Dark discovery surfaces connect to the requested reference and frame photography. Warm paper article surfaces support sustained reading.
- Sharp geometry reinforces the reference's visual character. Rounded pills, floating cards and heavy shadows are not default components.
- Large headlines carry the news hierarchy. Monospace is limited to small labels and timestamps to distinguish metadata from reporting.

## Color tokens

Use these as the initial project tokens. Check contrast in the implemented UI, including hover, focus and error states.

```css
:root {
  --canvas: #0b0e0b;
  --surface: #151a16;
  --surface-raised: #202721;
  --text: #f5f3ea;
  --text-muted: #aab2a6;
  --rule: #343c34;
  --control-border: #778271;
  --accent: #f7df45;
  --accent-ink: #0b0e0b;
  --paper: #f5f2e9;
  --paper-ink: #171b17;
  --paper-muted: #555e53;
  --paper-rule: #cdd1c5;
  --paper-link: #33541a;
  --focus-dark: #f7df45;
  --focus-light: #171b17;
}
```

- Homepage, category, search, topic, author and archive use `--canvas` with light text.
- Article and policy-page main content use `--paper` with `--paper-ink`; the masthead and footer keep the shared identity.
- Yellow is the signature color for the masthead, selected navigation and a limited number of meaningful actions. Avoid highlighting every category and headline.
- Put dark text on yellow. Never use pale yellow body text on paper or white text on a yellow button.
- Use muted text for secondary information only; dates, bylines and captions must remain readable.
- Rules organize sections. Use the stronger control border for inputs and interactive boundaries rather than relying on faint decorative rules.
- On paper, body links use the darker link token with underlines. On dark surfaces, use readable light or yellow links with a visible non-color cue.
- Form errors require text explaining the problem. Introduce a tested semantic error color only where it is needed.

## Typography

- Start with the existing project font or a native sans-serif stack such as `Arial, Helvetica, sans-serif`. The goal is a compact grotesk feel without unnecessary font downloads.
- Use `ui-monospace, SFMono-Regular, Consolas, monospace` for metadata only. This adds the reference's precise label treatment while keeping articles readable.
- Display/lead headline: `clamp(2.25rem, 4.5vw, 4.5rem)`, weight 700, line-height 1.05 to 1.1, tracking around -0.035em.
- Article H1: `clamp(2.125rem, 4vw, 4rem)`, weight 700, line-height 1.1; let the headline wrap naturally.
- Section headings: 28 to 36 px on desktop, 24 to 28 px on phones.
- Supporting headlines: 22 to 28 px. Compact list headlines: 18 to 22 px.
- Article body: 18 px on phones, 20 px on wider screens, line-height 1.65 to 1.75.
- Summaries: 18 to 22 px with clear separation from headlines and metadata.
- Metadata: 13 to 14 px. Use restrained uppercase and no more than 0.06em tracking for short section labels; dates and bylines can remain sentence case.
- Never truncate article headlines or important bylines. Do not add manual line breaks that fail with another story.
- Use actual heading levels in a logical order. Visual size does not determine semantic level.

## Layout and spacing

- Page container: maximum 1280 px, centered; 48 px side padding on wide screens, 32 px on tablets and 20 px on phones.
- Article reading column: approximately 68ch, capped around 760 px. Lead imagery may extend to around 1080 px inside the main container.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64 and 96 px.
- Space between major homepage sections: 64 to 96 px on desktop and 40 to 56 px on phones. Keep article rows much tighter for scanning.
- Desktop lead area: two-thirds width for the main story and one-third for supporting coverage, using Grid or the project's existing layout primitives.
- Below 1024 px, simplify dense side columns. Below 768 px, use one main column and reduce navigation to the publication name, search and menu.
- Never make the page horizontally scrollable. Category navigation should wrap or move into the mobile menu when it no longer fits.
- Use 1 px rules between actual sections or stories. Avoid a decorative background grid.
- Default radius: 0 to 4 px for controls and image frames. Overlays may use up to 8 px. Circular author photos are an exception when real portraits exist.
- Shadows belong only to overlays that sit above content. Story previews are flat elements on the page.

## Shared navigation and controls

- Masthead: yellow with dark publication identity and compact dark navigation. Start around 72 px tall on desktop and 60 px on phones, allowing content to expand at zoom.
- Sticky navigation may remain visible, but must not cover focused elements, anchor targets or article headings. Keep it opaque.
- Use a text wordmark until the owner supplies a logo. Do not reproduce Motion's logo or create a lookalike mark.
- Category navigation uses plain text links. The active item gets an underline or another persistent shape cue, not color alone.
- Search stays easy to find. A dedicated search page is the default; an overlay is unnecessary unless the chosen project already has one.
- Primary buttons use yellow with dark text on dark surfaces, and dark fill with light text on paper or yellow surfaces.
- Secondary buttons use a visible border. Keep labels specific: Search, Copy link, Send correction or Next page.
- Body links are underlined. Headline links gain an underline or equally clear treatment on hover and keyboard focus.
- Icons serve recognizable actions such as search, menu and close. Include accessible names; do not add decorative icons beside every heading.
- Footer: dark background, publication identity and compact groups based on real links. Do not force a large multi-column footer onto a small site.

## Homepage composition

1. Yellow masthead and category navigation.
2. Optional static breaking-news notice, only when editorial data provides one.
3. Lead story: a large headline, short summary, metadata and substantial editorial photograph. Supporting stories sit beside it on desktop and below it on phones.
4. Latest news: a compact list with timestamps and clear headlines, optionally paired with small thumbnails.
5. Category coverage: alternate a featured story plus supporting links with simpler story rows. The variation must reflect content importance.
6. Optional Editor's picks or Most read, according to the data rules in AGENTS.md.
7. Shared footer.

The first screen should show actual reporting and a route into it. Keep headline text on a solid surface rather than placing it over a busy photo. The publication's lead story replaces the reference's product-marketing hero.

Do not add a rainbow canvas, animated character field or abstract 3D scene behind the news. The visual energy comes from typography, yellow navigation and photography. A special editorial project can introduce its own illustration later when commissioned.

## Article composition

1. Shared yellow masthead.
2. Warm paper main surface with breadcrumb, content-type/category label, headline and short summary.
3. Author byline, publication/update timestamps and a compact share action.
4. Lead image with caption and credit, when available.
5. Narrow body column with readable paragraphs, subheadings, quotations and source links.
6. Correction note when applicable, followed by author context and a small related-stories group.
7. Shared dark footer.

Keep paper content full-width as a page surface, not a floating card inside a dark dashboard. Avoid sticky sidebars beside ordinary articles. If a long article has a table of contents, put it in a compact block before the body on small screens.

Article images preserve meaningful context. Use intrinsic proportions for diagrams or documentary images when cropping would remove information. Pull quotes must be real excerpts and should be rare.

## Category, topic, author and archive composition

- Category/topic: large page title, brief context, one featured story when selected, then chronological story rows and pagination.
- Category identity comes primarily from its title and content. Do not assign a random accent color to every category.
- Author: compact profile heading, optional real portrait, biography and a chronological article list. Avoid a promotional personal-brand hero.
- Archive: title, plainly labeled date/category filters and a compact results list. Native date inputs are sufficient.
- Keep rows consistent within a list. Varying the overall page rhythm does not require arbitrary card sizes.

## Search and supporting-page composition

- Search: visible query input, submit button, results summary, any supported filters, article rows and pagination.
- No results: explain which query returned nothing and keep the input available. Do not fill the view with unrelated fake stories.
- About/contact: concise editorial content with the same heading hierarchy. Forms use stacked labels and inline validation.
- Editorial policy, privacy and terms: warm paper, narrow readable column and dated policy content supplied or reviewed by the owner.
- 404/error: a clear heading, brief explanation and useful navigation. Avoid novelty animations during a failed reader journey.

## Motion and interaction

- Prefer native CSS transitions for color, opacity, underline and small transforms. Use an installed motion library only when it materially simplifies an interaction.
- Fast feedback: 120 to 160 ms. Menu/overlay transitions: 180 to 240 ms. Start with `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Hover: show a clear link or border change. Optional image scale is capped at 1.02 inside its frame and never changes layout.
- Press: a subtle button response may use scale 0.98. Navigation and form submissions must not wait for the animation to finish.
- Mobile menu: a short fade or translation of at most 8 px; manage focus independently of animation and restore focus to the trigger on close.
- Keep headlines, article paragraphs and initially visible content available immediately. Do not hide content until a scroll observer or animation script runs.
- Avoid per-word headline reveals, repeating pulses, auto-advancing carousels, scroll hijacking and parallax on reading pages.
- Under `prefers-reduced-motion: reduce`, remove movement, scaling, smooth scrolling and staged reveals. Preserve immediate state changes and visible feedback.
- Animate opacity and transforms where possible. Never animate page layout merely to make the interface feel busy.

## Photography and content treatment

- Use actual licensed editorial imagery with attribution. Do not use generated documentary-looking images as evidence of real events.
- Standard story previews can use a 16:9 frame; compact thumbnails may use 4:3. Store or respect focal points when cropping.
- Missing image: use a deliberate text-only story treatment. Development placeholders must say what is missing.
- Preserve photo color and detail. Do not apply a yellow overlay to every image or stylize factual evidence beyond recognition.
- Sponsored, opinion and analysis labels stay explicit. Breaking-news labels reflect an actual editorial state and remain static.
- Keep visible copy direct and informative. The news headline is the main invitation to read; generic promotional calls to action add little.

## Accessibility and resilient states

- Target at least 4.5:1 contrast for normal text, 3:1 for large text and 3:1 for meaningful control boundaries and indicators. Verify actual combinations rather than assuming tokens guarantee every state.
- Use a visible focus outline with an offset: yellow on dark surfaces and dark ink on paper or yellow surfaces.
- Keep controls operable at 200% zoom and with keyboard-only input. Touch targets should be at least 44 by 44 px.
- Loading indicators describe what is loading and reserve only the space actually needed. Do not leave article text hidden behind a full-page loading animation.
- Errors explain what failed and provide a real recovery action. Do not announce success until the operation succeeds.
- A menu or modal must trap focus only while open, close with Escape and return focus to its trigger.
- Long titles wrap; metadata can wrap; missing photos do not leave broken-image icons. Check both very short and long content.

## Visual acceptance checklist

- The yellow masthead, near-black discovery surfaces, confident type and sharp framing make the requested reference visible in the design.
- Each screen has a clear primary story or task; supporting elements have lower visual emphasis.
- Homepage, article and category layouts express different reader needs while sharing typography, navigation and spacing tokens.
- Article pages remain comfortable for sustained reading on warm paper, including captions, links and correction notes.
- Verify at 360, 768, 1280 and 1440 px widths, plus 200% zoom; no collisions, clipped headings or unintended horizontal overflow.
- Test actual hover, focus, menu, search, sharing, pagination and form behavior, including failures where relevant.
- Reduced-motion mode removes movement without breaking navigation or hiding content.
- Confirm text and control contrast on dark, paper and yellow surfaces.
- Replace all development placeholders before launch; confirm image rights, credits and publisher identity.
- Report implementation evidence when the website is built. These documents specify a design; they do not claim a rendered website has passed visual testing.
