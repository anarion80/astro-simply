import { z } from 'astro:content';
import type { CollectionEntry, SchemaContext } from 'astro:content';
import DefaultCategoryImage from '@assets/images/default_category_image.jpg';

export const categorySchema = ({ image }: SchemaContext) =>
    z.object({
        id: z.string().optional(),
        title: z.string(),
        image: image().or(z.string()).default(DefaultCategoryImage),
        description: z.string().optional(),
        count: z.number().optional(),
    });

export type Category = CollectionEntry<'categories'>;
