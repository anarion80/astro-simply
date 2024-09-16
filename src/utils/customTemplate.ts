import type { Post } from 'src/schemas/post';

// const toPascalCase = (text: string | undefined): string => (text ? text.replace(/(^\w|-\w)/g, clearAndUpper) : ''); // eslint-disable-line @typescript-eslint/no-unused-vars

// const clearAndUpper = (text: string): string => text.replace(/-/, '').toUpperCase();

// const typeDefault = (type: string): string => (type === 'post' ? 'Post' : type === 'page' ? 'Page' : 'Post'); // eslint-disable-line @typescript-eslint/no-unused-vars

export const getCustomTemplate = (post: Post | undefined): string => {
    if (post === undefined || post.data.postFormat === 'Post' || post.data.toc) return '/components/Post.astro';
    return `/components/custom/${post.data.postFormat}.astro`;
};
