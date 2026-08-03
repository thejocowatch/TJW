import rss from '@astrojs/rss';

export async function GET(context) {
  const posts = import.meta.glob('../content/posts/*.md', { eager: true });
  const postList = Object.values(posts);

  return rss({
    title: 'The JoCo Watch',
    description: 'Clear, careful reporting on public safety, crime, courts, and local government across Johnson County.',
    site: context.site || 'https://thejocowatch.com',
    items: postList.map((post) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.date),
      description: post.frontmatter.summary,
      link: `/posts/${post.file.split('/').pop().replace('.md', '')}`,
    })),
  });
}
