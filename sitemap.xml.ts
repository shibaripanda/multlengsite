import { lengList } from "./leng.config"

export async function GET() {
    // const locales = ['en', 'ru', 'fr', 'de']
    const urls = lengList.map(
      (locale) => `<url><loc>${process.env.NEXT_PUBLIC_LINK}/${locale}</loc></url>`
    )
  
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('\n')}
    </urlset>`
  
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }