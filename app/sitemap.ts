import type { MetadataRoute } from 'next'
import { lengList } from '../leng.config'

const baseUrl = process.env.NEXT_PUBLIC_LINK
// Список путей для генерации (добавь свои нужные страницы)
// const staticPaths = ['', '/about', '/blog']
const staticPaths = ['']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const sitemap: MetadataRoute.Sitemap = []

  for (const locale of lengList) {
    // for (const path of staticPaths) {
      const fullUrl = `${baseUrl}/${locale}`

      sitemap.push({
        url: fullUrl,
        lastModified: now,
        // changeFrequency: path === '' ? 'monthly' : 'yearly',
        // priority: path === '' ? 1 : 0.7,
        alternates: lengList.map((altLang) => ({
          hreflang: altLang,
          url: `${baseUrl}/${altLang}`,
        })),
      })
    // }
  }

  return sitemap
}