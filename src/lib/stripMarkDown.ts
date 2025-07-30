export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/[#*_>`~\-!\[\]\(\)]/g, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
