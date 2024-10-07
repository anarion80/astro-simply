import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import dynamicImport from 'astro-dynamic-import';
import AutoImport from 'astro-auto-import';
import cookieconsent from '@jop-software/astro-cookieconsent';
import { remarkReadingTime } from './src/utils/remark-reading-time.ts';
import fauxRemarkEmbedder from '@remark-embedder/core';
import { handleHTML, handleError } from './src/utils/oembedTransformer.ts';
import AstroSimplyTransformer from './src/utils/oembedTransformer.ts';
// import { addBookmarks } from './src/utils/addBookmarks.ts'
import { CONFIG } from './src/config/config.ts';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSectionize from '@hbsnow/rehype-sectionize';
import rehypeImageZoom from './src/utils/rehypeImageZoom.ts';
import { h } from 'hastscript';
import {
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
    transformerNotationFocus,
    // ...
} from '@shikijs/transformers';
import Cache from '@remark-embedder/cache';
import { PROCESS_ENV } from './src/config/process-env';
import icon from 'astro-icon';
const { SITE_URL } = PROCESS_ENV;

const cache = new Cache.default();

const remarkEmbedder = fauxRemarkEmbedder.default;

// https://astro.build/config
export default defineConfig({
    site: SITE_URL || CONFIG.siteUrl,
    trailingSlash: 'always',
    build: {
        format: 'directory',
    },
    vite: {
        logLevel: 'error',
        define: {
            __DATE__: `'${new Date()}'`,
        },
    },
    prefetch: true,
    markdown: {
        remarkPlugins: [
            remarkReadingTime,
            [
                remarkEmbedder,
                {
                    cache,
                    transformers: [AstroSimplyTransformer],
                    handleHTML,
                    handleError,
                },
            ],
        ],
        rehypePlugins: [
            // rehypeSlug,
            rehypeHeadingIds,
            [rehypeSectionize, { properties: { class: 'headline w-full' } }],
            [
                rehypeAutolinkHeadings,
                {
                    behavior: 'prepend',
                    properties: { class: 'anchor px-3 inline-block invisible opacity-0 -ml-12 text-gray-500', ariaLabel: "Link to section" },
                    headingProperties: { class: 'hover-title' },
                    content: () => [
                        h(
                            `span.anchor-icon`,
                            {
                                ariaHidden: 'true',
                            },
                            h(
                                'svg.icon is-stroke',
                                {
                                    width: 32,
                                    height: 32,
                                    version: 1.1,
                                    viewBox: '0 0 32 32',
                                    xlmns: 'http://www.w3.org/2000/svg',
                                },
                                h('path', {
                                    strokeLinejoin: "round",
                                    strokeLinecap: "round",
                                    strokeWidth: "2.25",
                                    d: "M13 22H9a6 6 0 110-12h4m6 0h4a6 6 0 110 12h-4m-8.794-6H21.92"
                                })
                            )

                        ),
                    ],
                },
            ],
            rehypeImageZoom,
            // [addBookmarks, {
            //     domain: [
            //         "twitter.com",
            //         "github.com",
            //         "x.com"
            //     ]
            // }],
        ],
        shikiConfig: {
            // theme: 'slack-dark',
            themes: {
                light: 'catppuccin-latte',
                dark: 'github-dark',
            },
            langs: [],
            wrap: true,
            transformers: [
                transformerNotationDiff(),
                transformerNotationHighlight(),
                transformerNotationWordHighlight(),
                transformerNotationFocus(),
            ],
        },
        // syntaxHighlight: 'shiki',
    },
    integrations: [react(), sitemap(), dynamicImport(), AutoImport({
        imports: [
            '@components/cards/Button.astro',
            '@components/cards/Callout.astro',
            '@components/cards/Toggle.astro',
            '@components/cards/Header.astro',
            '@components/cards/Product.astro',
            '@components/cards/Audio.astro',
            '@components/cards/Video.astro',
            '@components/cards/File.astro',
            '@components/Blockquote.astro',
            '@components/cards/Bookmark.astro',
            '@components/cards/Gallery.astro',
            '@components/Notation.astro',
        ],
    }), mdx(), cookieconsent({
        guiOptions: {
            consentModal: {
                layout: 'cloud',
                position: 'bottom center',
                equalWeightButtons: true,
                flipButtons: false,
            },
            preferencesModal: {
                layout: 'box',
                position: 'right',
                equalWeightButtons: true,
                flipButtons: false,
            },
        },
        categories: {
            necessary: {
                enabled: true,
                // this category is enabled by default
                readOnly: true, // this category cannot be disabled
            },
            analytics: {},
        },
        language: {
            default: 'en',
            translations: {
                en: {
                    consentModal: {
                        title: 'We use cookies',
                        description: 'Cookie modal description',
                        acceptAllBtn: 'Accept all',
                        acceptNecessaryBtn: 'Reject all',
                        showPreferencesBtn: 'Manage Individual preferences',
                    },
                    preferencesModal: {
                        title: 'Manage cookie preferences',
                        acceptAllBtn: 'Accept all',
                        acceptNecessaryBtn: 'Reject all',
                        savePreferencesBtn: 'Accept current selection',
                        closeIconLabel: 'Close modal',
                        sections: [
                            {
                                title: 'Somebody said ... cookies?',
                                description: 'I want one!',
                            },
                            {
                                title: 'Strictly Necessary cookies',
                                description:
                                    'These cookies are essential for the proper functioning of the website and cannot be disabled.',
                                //this field will generate a toggle linked to the 'necessary' category
                                linkedCategory: 'necessary',
                            },
                            {
                                title: 'Performance and Analytics',
                                description:
                                    'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                                linkedCategory: 'analytics',
                            },
                            {
                                title: 'More information',
                                description:
                                    'For any queries in relation to my policy on cookies and your choices, please <a href="contact-us">contact us</a>',
                            },
                        ],
                    },
                },
                pl: {
                    consentModal: {
                        title: 'Używamy ciasteczek',
                        description: 'Opis okna',
                        acceptAllBtn: 'Akceptuj wszystkie',
                        acceptNecessaryBtn: 'Odrzuć wszystkie',
                        showPreferencesBtn: 'Zarządzaj ustawieniami',
                    },
                    preferencesModal: {
                        title: 'Zarządzaj ustawieniami',
                        acceptAllBtn: 'Akceptuj wszystkie',
                        acceptNecessaryBtn: 'Odrzuć wszystkie',
                        savePreferencesBtn: 'Akceptuj wybór',
                        closeIconLabel: 'Zamknij okno',
                        sections: [
                            {
                                title: 'Ktoś powiedział... ciasteczka?',
                                description: 'Chcę jedno!',
                            },
                            {
                                title: 'Niezbędne ciasteczka',
                                description:
                                    'Te ciasteczka są niezbędne do poprawnego funkcjonowania strony i nie mogą zostać wyłączone',
                                //this field will generate a toggle linked to the 'necessary' category
                                linkedCategory: 'necessary',
                            },
                            {
                                title: 'Wydajność i analityka',
                                description:
                                    'Te ciasteczka zbierają informację o tym jak używasz naszej strony. Wszystkie dane są zanonimizowane i nie mogę być użyte do zidentyfikowania ciebie',
                                linkedCategory: 'analytics',
                            },
                            {
                                title: 'Więcej informacji',
                                description:
                                    'Jeśli masz jakieś pytania w związku z naszą polityką poprawności, <a href="contact-us">skontaktuj się</a> z nami',
                            },
                        ],
                    },
                },
            },
        },
    }), icon({
        include: {
            "fa6-solid": ["headphones-simple", "square-rss", "sun", "moon", "magnifying-glass", "link", "house-user", "circle-xmark", "square-up-right", "x", "xmark", "star", "angle-down", "chevron-right", "chevron-left", "arrow-right"],
            "fa6-brands": ["itunes", "square-x-twitter", "square-twitter", "square-facebook", "square-youtube", "square-instagram", "square-github", "linkedin", "react", "square-whatsapp"],
            "cbi": ["pocketcasts"],
            "devicon-plain": ["astro"],
            "fxemoji": ["leftmagnifyingglass", "whitesun", "waningcrescentmoon"],
        },
    })],
    image: {
        domains: ['unsplash.com'],
        remotePatterns: [
            {
                protocol: 'https',
            },
        ],
    },
    experimental: {
        contentIntellisense: true,
        contentLayer: true,
    },
});
