import type { GetStaticPaths, InferGetStaticPropsType } from 'astro';
import rss from '@astrojs/rss';
import { CONFIG } from '@config/config';
import { getCollection } from 'astro:content';
import { getAuthors, getPosts } from '@utils/post';
const site = CONFIG;
export const getStaticPaths = (async () => {
    const authors = await getAuthors();
    const posts = await getPosts();
    return authors.flatMap((author) => {
        const filteredPosts = posts.filter((post) => {
            return post.data.authors.map((author) => author.id).includes(author.id);
        });
        return filteredPosts.map((post) => ({
            params: { author: post.data.authors[0].id },
            props: { author },
        }));
    });
}) satisfies GetStaticPaths;
export type Props = InferGetStaticPropsType<typeof getStaticPaths>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(context: any) {
    const blog = (await getCollection('blog')).filter((post) => {
        return !post.data.draft;
    });
    const items = [...blog].filter((post) => {
        return post.data.authors.map((author) => author.id).includes(context.props.author.id);
    });
    return rss({
        title: site.title,
        description: CONFIG.siteDescriptionMeta,
        site: context.site,
        items: items.map((item) => ({
            title: item.data.title,
            description: item.data.excerpt,
            pubDate: item.data.publishDate,
            link: `/${item.collection}/${item.id}/`,
        })),
    });
}
