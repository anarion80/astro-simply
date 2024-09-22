import { configSchema } from '../schemas/config';
import type { ConfigType } from '../schemas/config';
import { validateData } from '../utils/validate';

const configData: ConfigType = {
    title: `Astro Blog Example`,
    shortTitle: `Astro Blog`,
    siteDescriptionMeta: 'Example Astro blog with Simply Theme',
    logo: '/src/assets/astro-logo-dark.svg', // must be referenced from /src
    logoDarkMode: '/src/assets/astro-logo-light.svg', // must be referenced from /src
    siteIcon: 'favicon.svg',
    siteUrl: 'https://astro-simply.pages.dev',
    postsPerPage: 10,
    shareImage: '/default-og-image.png',
    shareImageWidth: 1200,
    shareImageHeight: 600,
    accentColor: '#d0000fff',
    lang: 'en',
    locale: 'en-GB',
    viewTransitions: true,
    navigation: [
        {
            label: 'Blog',
            url: '/blog/',
        },
        {
            label: 'Authors',
            url: '/blog/author/',
        },
        {
            label: 'Categories',
            url: '/blog/category/',
        },
        {
            label: 'Tags',
            url: '/blog/tag/',
        },
        {
            label: 'About',
            url: '/about/',
        },
    ],
    secondary_navigation: [
        {
            label: 'Data & privacy',
            url: '/privacy/',
        },
        {
            label: 'Contact',
            url: '/contact/',
        },
    ],
    menuDropdown: [
        {
            label: '404',
            url: '/404/',
        },
        {
            label: 'Privacy',
            url: '/privacy/',
        },
        {
            label: 'Contact',
            url: '/contact/',
        },
        {
            label: 'Podcast',
            url: '/podcast/',
        },
        {
            label: 'Portfolio',
            url: '/portfolio/',
        },
        {
            label: 'Index Archive',
            url: '/index-archive/',
        },
        {
            label: 'Index Featured',
            url: '/index-featured/',
        },
        {
            label: 'Index Featured Slider',
            url: '/index-featured-slider/',
        },
        {
            label: 'Index Grid',
            url: '/index-grid/',
        },
        {
            label: 'Index Medium',
            url: '/index-medium/',
        },
        {
            label: 'Index Medium Sidebar',
            url: '/index-medium-sidebar/',
        },
        {
            label: 'Index Sidebar',
            url: '/index-sidebar/',
        },
        {
            label: 'Index Personal',
            url: '/index-personal/',
        },
        {
            label: 'Index Photographer',
            url: '/index-photographer/',
        },
    ],
    followSocialMedia: [
        {
            service: 'youtube',
            icon: 'fa6-brands:square-youtube',
            title: 'YOUR_TITLE',
            url: 'https://YOUR_URL',
        },
        {
            service: 'instagram',
            icon: 'fa6-brands:square-instagram',
            title: 'YOUR_TITLE',
            url: 'https://YOUR_URL',
        },
        {
            service: 'github',
            icon: 'fa6-brands:square-github',
            title: 'Ghost Github',
            url: 'https://github.com/withastro/astro',
        },
        {
            service: 'linkedin',
            icon: 'fa6-brands:linkedin',
            title: 'YOUR_TITLE',
            url: 'https://YOUR_URL',
        },
        {
            service: 'rss',
            icon: 'fa6-solid:square-rss',
            title: 'YOUR_TITLE',
            url: 'https://YOUR_URL',
        },
        {
            service: 'twitter',
            icon: 'fa6-brands:square-x-twitter',
            title: 'Twitter',
            url: 'https://x.com/astro',
        },
    ],
};

export const CONFIG = validateData(configData, configSchema);
