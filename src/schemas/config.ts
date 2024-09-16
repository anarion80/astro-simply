import { z } from 'zod';

export const nodeEnvValues = ['development', 'test', 'production'] as const;

export const processEnvSchema = z.object({
    NODE_ENV: z.enum(nodeEnvValues),
    SITE_URL: z.string().url().regex(/[^/]$/, 'siteUrl should end with a slash "/"'),
    FACEBOOK_ACCESS_TOKEN: z.string().optional(),
});

export const configSchema = z.object({
    title: z.string().min(1),
    shortTitle: z.string().min(1),
    siteDescriptionMeta: z.string().min(1),
    logo: z.string().min(1),
    logoDarkMode: z.string().min(1),
    siteUrl: z.string().url().regex(/[^/]$/, 'siteUrl should end with a slash "/"'),
    postsPerPage: z.number(),
    shareImage: z.string().min(1),
    shareImageWidth: z.number(),
    shareImageHeight: z.number(),
    siteIcon: z.string().min(1),
    accentColor: z.string().min(1),
    lang: z.string().min(1),
    locale: z.string().min(1),
    navigation: z
        .object({
            label: z.string().min(1),
            url: z.string().startsWith('/'),
        })
        .array(),
    secondary_navigation: z
        .object({
            label: z.string().min(1),
            url: z.string().startsWith('/'),
        })
        .array()
        .optional(),

    menuDropdown: z
        .object({
            label: z.string().min(1),
            url: z.string().startsWith('/'),
        })
        .array(),

    followSocialMedia: z
        .object({
            service: z.string().min(1),
            icon: z.string().min(1),
            title: z.string().min(1),
            url: z.string().url(),
        })
        .array(),
});

export type ConfigSchemaType = typeof configSchema;
export type ConfigType = z.infer<ConfigSchemaType>;

export type ProcessEnvSchemaType = typeof processEnvSchema;
export type ProcessEnvType = z.infer<ProcessEnvSchemaType>;
