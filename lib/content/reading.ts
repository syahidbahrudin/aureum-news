const CJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/g;

// ~200 words/min, ~400 Han characters/min. Labeled as an estimate in the UI.
export function readingMinutes(text: string): number {
  const cjk = text.match(CJK)?.length ?? 0;
  const words = text.replace(CJK, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200 + cjk / 400));
}

function selfCheck() {
  if (readingMinutes("one") !== 1) throw new Error("short text should be 1");
  if (readingMinutes(`${"word ".repeat(200)}`) !== 1) throw new Error("200 words");
  if (readingMinutes(`${"word ".repeat(201)}`) !== 2) throw new Error("201 words");
  if (readingMinutes("字".repeat(400)) !== 1) throw new Error("400 chars");
  if (readingMinutes("字".repeat(401)) !== 2) throw new Error("401 chars");
}

if (process.argv[1]?.endsWith("reading.ts")) selfCheck();
