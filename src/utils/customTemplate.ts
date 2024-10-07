import type { Post } from 'src/schemas/post';

export const getCustomTemplate = (post: Post | undefined): string => {
    if (post === undefined || post.data.postFormat === 'Post' || post.data.toc) return '/components/Post.astro';
    return `/components/custom/${post.data.postFormat}.astro`;
};
