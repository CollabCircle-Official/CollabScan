export interface SocialLink {
  label: string;
  href: string;
}
const variables = [
  "Website",
  "Linkedin",
  "Facebook",
  "Instagram",
  "X",
  "YouTube",
] as const;

/** Reads social URLs on the server and excludes malformed values from the footer. */
export function getSocialLinks(): SocialLink[] {
  return variables.flatMap((label) => {
    const value = process.env[label]?.trim();
    if (!value) return [];
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:"
        ? [{ label, href: url.href }]
        : [];
    } catch {
      return [];
    }
  });
}
