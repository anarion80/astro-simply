import { reference, z } from 'astro:content';
import type { SchemaContext } from 'astro:content';
import DefaultPostHeroImage from '@assets/images/default-og-image.png';
import type { CollectionEntry } from 'astro:content';

/** lowercase tags for routes */
const removeDuplicatesAndToLowerCase = (arg: string[] | undefined) => {
    if (arg === undefined) {
        return [];
    }
    const lowercaseItems = arg.map((str) => str.toLowerCase());
    const distinctItems = new Set(lowercaseItems);
    return Array.from(distinctItems);
};

export const postSchema = ({ image }: SchemaContext) =>
    z.object({
        publishDate: z
            .string()
            .or(z.date())
            .transform((val) => new Date(val)),
        updateDate: z
            .string()
            .or(z.date())
            .transform((val) => new Date(val))
            .optional(),
        title: z.string().max(80),
        excerpt: z.string().optional(),
        postFormat: z
            .enum([
                'Post',
                'PostFull',
                'PostHeaderImage',
                'PostImage',
                'PostImageRight',
                'PostNotImage',
                'PostSidebar',
                'PostWide',
            ])
            .optional()
            .default('Post'),
        // convert img to object
        heroImage: image().or(z.string()).default(DefaultPostHeroImage),
        heroAlt: z.string().default('Hero image'),
        toc: z.boolean().default(false),
        draft: z.boolean().default(false),
        featured: z.boolean().default(false),
        category: reference('categories').default('others'),
        authors: z.array(reference('authors')),
        tags: z.array(z.string()).optional().transform(removeDuplicatesAndToLowerCase),
    });

export type PostCollection = CollectionEntry<'blog'>;

// other frontmatter props are in post.data...
// readingTimes is in post.readingTimes
export type Post = PostCollection & {
    readingTime?: number;
    href: string;
};
