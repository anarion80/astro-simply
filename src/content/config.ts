import { defineCollection } from 'astro:content';
import { postSchema } from 'src/schemas/post';
import { authorSchema } from 'src/schemas/author';
import { categorySchema } from 'src/schemas/category';

export const postCollection = defineCollection({
    schema: postSchema,
    type: 'content',
});

export const authorCollection = defineCollection({
    schema: authorSchema,
    type: 'content',
});

export const categoryCollection = defineCollection({
    schema: categorySchema,
    type: 'content',
});

export const collections = {
    blog: postCollection,
    authors: authorCollection,
    categories: categoryCollection,
};
