import { z } from 'astro:content';
import type { CollectionEntry, SchemaContext } from 'astro:content';

export const authorSchema = ({ image }: SchemaContext) =>
    z.object({
        id: z.string().optional(),
        name: z.string(),
        meta_title: z.string().optional(),
        // profile_image: image().optional(),
        profile_image: z.string().optional(),
        cover_image: image()
            .refine((img) => img.width >= 1080, {
                message: 'Cover image must be at least 1080 pixels wide!',
            })
            .optional(),
        bio: z.string().optional(),
        social: z
            .object({
                website: z.string().optional(),
                facebook: z.string().optional(),
                twitter: z.string().optional(),
            })
            .optional(),
    });

export type Author = CollectionEntry<'authors'>;
