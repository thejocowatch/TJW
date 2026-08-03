export async function GET(context) {
  const posts = import.meta.glob('./posts/*.md', { eager: true });
  const postList = Object.values(posts);

  const siteUrl = context.site ? context.site.href.replace(/\/$/, '') : 'https://thejocowatch.com';

  const itemsXml = postList
    .map((post) => {
      const slug = post.file.split('/').pop().replace('.md', '');
      const title = post.frontmatter.title || 'Untitled';
      const description = post.frontmatter.summary || '';
      const pubDate = post.frontmatter.date ? new Date(post.frontmatter.date).toUTCString() : new Date().toUTCString();
      const link = `${siteUrl}/posts/${slug}`;

      return `
    <item>
      <title><![CDATA[${title}]]></title>
      <description><![CDATA[${description}]]></description>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>The JoCo Watch</title>
    <description>Clear, careful reporting on public safety, crime, courts, and local government across Johnson County.</description>
    <link>${siteUrl}</link>
    <language>en-us</language>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
