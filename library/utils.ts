export const IMG_BASE = 'https://image.tmdb.org/t/p';
export function getImageUrl(path: string, size = 500) {
  return `${IMG_BASE}/w${size}${path}`
}
export function formatDate(d?: string) {
  if (!d) return '—'
  const date = new Date(d)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}