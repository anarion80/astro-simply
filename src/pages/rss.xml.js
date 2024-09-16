import rss from '@astrojs/rss';
import { CONFIG } from '@config/config';
import { getCollection } from 'astro:content';

const site = CONFIG;

export async function GET(context) {
    const blog = (await getCollection('blog')).filter((post) => {
        return !post.data.draft;
    });
    const items = [...blog].sort(
        (a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf()
    );

    return rss({
        title: site.title,
        description: CONFIG.siteDescriptionMeta,
        site: context.site,
        items: items.map((item) => ({
            title: item.data.title,
            description: item.data.excerpt,
            pubDate: item.data.publishDate,
            link: `/${item.collection}/${item.slug}/`,
        })),
    });
}
