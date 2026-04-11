import { getCollection } from 'astro:content';

const SITE = 'https://eloysekonell.com.br';

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/blog/', priority: '0.8', changefreq: 'weekly' },
];

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const postEntries = posts.map((post) => ({
    url: `/blog/${post.slug}/`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: (post.data.updatedDate ?? post.data.pubDate).toISOString().split('T')[0],
  }));

  const allPages = [...staticPages, ...postEntries];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${
      'lastmod' in page ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
