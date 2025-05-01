export async function GET() {
  const text = `User-agent: *
Allow: /
Sitemap: ${process.env.NEXT_PUBLIC_LINK}/sitemap.xml`;

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}