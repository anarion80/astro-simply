import { defineCollection } from 'astro:content';
import { postSchema } from 'src/schemas/post';
import { authorSchema } from 'src/schemas/author';
import { categorySchema } from 'src/schemas/category';
import { glob } from 'astro/loaders';

export const postCollection = defineCollection({
    loader: glob({ pattern: '**/*.md*', base: './src/data/blog' }),
    schema: postSchema,
});

export const authorCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/data/authors' }),
    schema: authorSchema,
});

export const categoryCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/data/categories' }),
    schema: categorySchema,
});

export const collections = {
    blog: postCollection,
    authors: authorCollection,
    categories: categoryCollection,
};
