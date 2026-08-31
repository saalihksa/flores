export const ORIGIN = 'https://www.storeyarchitecture.co.uk'

export function img(path: string, w = 2100) {
  if (path.startsWith('/')) return path
  const encoded = encodeURIComponent(path)
  return `${ORIGIN}/_vercel/image?url=${encoded}&w=${w}&q=85`
}

export function gif(path: string) {
  return `${ORIGIN}${path}`
}
