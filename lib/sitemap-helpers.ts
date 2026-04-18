export function safeSitemapUrl(base: string, path: string): string {
  const cleanBase = base.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const encodedPath = cleanPath
    .split("/")
    .map((segment, i) => (i === 0 ? segment : encodeURIComponent(segment)))
    .join("/");
  return `${cleanBase}${encodedPath}`
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function formatPriceDh(amount: number | undefined): string | null {
  if (!amount) return null;
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(amount) + " dh";
}
