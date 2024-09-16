import { getCollection, type CollectionEntry } from 'astro:content';
import { getEntry, getEntries } from 'astro:content';
import type { Post } from 'src/schemas/post';

export const getCategories = async () => {
    return await getCollection('categories');
};

export const getCategory = async (slug: string) => {
    return (await getEntry('categories', slug)) as CollectionEntry<'categories'>;
};

export const getAuthors = async (slug?: string) => {
    if (slug) {
        const post_ref = (await getEntry('blog', slug)) as CollectionEntry<'blog'>;
        const authors = await getEntries(
            post_ref.data.authors.map((author) => ({
                collection: 'authors',
                slug: author.slug,
            }))
        );
        return authors;
    }
    return await getCollection('authors');
};
// export const getAuthors = async (slug: string) => {
//     if (slug)
//         {
//             const post_ref = await getEntry('blog', slug) as CollectionEntry<'blog'>;
//             const authors = await getEntries(post_ref.data.authors);
//             return authors
//         }
//     return await getCollection('authors')
// }

export const getAuthor = async (slug: string) => {
    // const post_ref = await getEntry('authors', slug) as CollectionEntry<'authors'>;
    return (await getEntry('authors', slug)) as CollectionEntry<'authors'>;
};

export const getPosts = async (max?: number) => {
    return (await getCollection('blog'))
        .filter((post) => !post.data.draft)
        .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
        .slice(0, max)
        .map<CollectionEntry<'blog'> & { href: string }>((post) => {
            return {
                href: `/blog/${post.slug}/`,
                ...post,
            };
        });
};

export const getFeaturedPosts = async (max?: number) => {
    return (await getCollection('blog'))
        .filter((post) => !post.data.draft)
        .filter((post) => post.data.featured)
        .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
        .slice(0, max)
        .map<CollectionEntry<'blog'> & { href: string }>((post) => {
            return {
                href: `/blog/${post.slug}/`,
                ...post,
            };
        });
};

export const getPost = async (slug: string) => {
    const post = await getEntry({
        collection: 'blog',
        slug: slug,
    });
    if (!post) {
        throw new Error(`Post not found with slug ${slug}`);
    }
    return {
        ...post,
        href: `/blog/${post.slug}/`,
    };
};

export const getTags = async () => {
    const posts = await getCollection('blog');
    const tags = new Set();
    for (const post of posts) {
        if (post.data.tags) {
            for (const tag of post.data.tags) {
                tags.add(tag.toLowerCase());
            }
        }
    }

    return Array.from(tags);
};

export const getPostByTag = async (tag: string) => {
    const posts = await getPosts();
    const lowercaseTag = tag.toLowerCase();
    return posts.filter((post) => {
        // Check if post.data and post.data.tags are defined
        if (post.data?.tags) {
            return post.data.tags.some((postTag) => postTag.toLowerCase() === lowercaseTag);
        }
        return false;
    });
};

export const filterPostsByCategory = async (category: string) => {
    const posts = await getPosts();
    return posts.filter((post) => post.data.category.slug.toLowerCase() === category);
};

export const getNextPost: (slug: string) => Promise<Post | undefined> = async (slug: string) => {
    let postIndex: number;
    const posts: Post[] = await getPosts();
    for (const post of posts) {
        if (post.slug === slug) {
            postIndex = posts.indexOf(post);
            return posts[postIndex - 1];
        }
    }
};

export const getPrevPost: (slug: string) => Promise<Post | undefined> = async (slug: string) => {
    let postIndex: number;
    const posts: Post[] = await getPosts();
    for (const post of posts) {
        if (post.slug === slug) {
            postIndex = posts.indexOf(post);
            return posts[postIndex + 1];
        }
    }
};

export const getRelatedPosts: (slug: string) => Promise<Post[] | undefined> = async (slug: string) => {
    if (!slug) return;
    const post = await getPost(slug);
    return (await getCollection('blog'))
        .filter((post) => !post.data.draft)
        .filter((item) => item.data.category.slug === post?.data.category.slug)
        .filter((item) => item != post)
        .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
        .slice(0, 6)
        .map<CollectionEntry<'blog'> & { href: string }>((post) => {
            return {
                href: `/blog/${post.slug}/`,
                ...post,
            };
        });
};

// export const getAuthorProperties = primaryAuthor => {
//     let authorProfiles = [];

//     authorProfiles.push(
//         primaryAuthor.website ? primaryAuthor.website : null,
//         primaryAuthor.twitter
//             ? `https://twitter.com/${primaryAuthor.twitter.replace(/^@/, ``)}/`
//             : null,
//         primaryAuthor.facebook
//             ? `https://www.facebook.com/${primaryAuthor.facebook.replace(/^\//, ``)}/`
//             : null
//     );

//     authorProfiles = authorProfiles.filter(profile => profile);

//     return {
//         name: primaryAuthor.name || null,
//         sameAsArray: authorProfiles.length
//             ? `["${authorProfiles.join('", "')}"]`
//             : null,
//         image: primaryAuthor.profile_image || null,
//         facebookUrl: primaryAuthor.facebook
//             ? `https://www.facebook.com/${primaryAuthor.facebook.replace(/^\//, ``)}/`
//             : null,
//     };
// };

// export default getAuthorProperties;
