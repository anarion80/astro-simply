import { getCollection, type CollectionEntry } from 'astro:content';
import { getEntry } from 'astro:content';
import type { Post } from 'src/schemas/post';

export const getCategories = async () => {
    return await getCollection('categories');
};

export const getCategory = async (id: string) => {
    return (await getEntry('categories', id)) as CollectionEntry<'categories'>;
};

export const getAuthors = async (id?: string) => {
    if (id) {
        const post_ref = (await getEntry('blog', id)) as CollectionEntry<'blog'>;
        const authors = getCollection('authors', ({ data }) => {
            return post_ref.data.authors.some((author) => author.id === data.id);
        });

        return authors;
    }
    return await getCollection('authors');
};

export const getAuthor = async (id: string) => {
    return (await getEntry('authors', id)) as CollectionEntry<'authors'>;
};

export const getPosts = async (max?: number) => {
    return (await getCollection('blog'))
        .filter((post) => !post.data.draft)
        .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
        .slice(0, max)
        .map<CollectionEntry<'blog'> & { href: string }>((post) => {
            return {
                href: `/blog/${post.id}/`,
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
                href: `/blog/${post.id}/`,
                ...post,
            };
        });
};

export const getPost = async (id: string) => {
    const post = await getEntry('blog', id);

    if (!post) {
        throw new Error(`Post not found with id ${id}`);
    }
    return {
        ...post,
        href: `/blog/${post.id}/`,
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
    return posts.filter((post) => post.data.category.id.toLowerCase() === category);
};

export const getNextPost: (id: string) => Promise<Post | undefined> = async (id: string) => {
    let postIndex: number;
    const posts: Post[] = await getPosts();
    for (const post of posts) {
        if (post.id === id) {
            postIndex = posts.indexOf(post);
            return posts[postIndex - 1];
        }
    }
};

export const getPrevPost: (id: string) => Promise<Post | undefined> = async (id: string) => {
    let postIndex: number;
    const posts: Post[] = await getPosts();
    for (const post of posts) {
        if (post.id === id) {
            postIndex = posts.indexOf(post);
            return posts[postIndex + 1];
        }
    }
};

export const getRelatedPosts: (id: string) => Promise<Post[] | undefined> = async (id: string) => {
    if (!id) return;
    const post = await getPost(id);
    return (await getCollection('blog'))
        .filter((post) => !post.data.draft)
        .filter((item) => item.data.category.id === post?.data.category.id)
        .filter((item) => item != post)
        .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
        .slice(0, 6)
        .map<CollectionEntry<'blog'> & { href: string }>((post) => {
            return {
                href: `/blog/${post.id}/`,
                ...post,
            };
        });
};
