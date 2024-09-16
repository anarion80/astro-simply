import type { TransformerInfo } from '@remark-embedder/core';
import { URL } from 'url';
import type { Transformer } from '@remark-embedder/core';
import { bookmarkAsString } from '../utils/getURLMetadata';

import { PROCESS_ENV } from '../config/process-env';
const { FACEBOOK_ACCESS_TOKEN } = PROCESS_ENV;

type Provider = {
    provider_name: string;
    provider_url: string;
    endpoints: Array<{
        schemes?: string[];
        discovery?: boolean;
        url: string;
    }>;
};
type Providers = Array<Provider>;

type Config = {
    params?: { [key: string]: unknown };
};

type GetConfig = ({ url, provider }: { url: string; provider: Provider }) => Config | null | undefined;

type OEmbedData = {
    html: string;
    version: string;
    type: string;
    title: string;
    author_name: string;
    author_url: typeof URL;
    cache_age: number;
    provider_name: string;
    provider_url: typeof URL;
    width: number;
    height: number;
    url: typeof URL;
    thumbnail_width: number;
    thumbnail_height: number;
    thumbnail_url: typeof URL;
};

type ErrorParams = {
    error: unknown;
    url: string;
    transformer: Transformer;
};

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace ProvidersCache {
    export let cache: Providers | undefined;
}

const getProviders = async (): Promise<Providers> => {
    if (!ProvidersCache.cache) {
        const res = await fetch('https://oembed.com/providers.json');
        ProvidersCache.cache = (await res.json()) as Providers;
    }

    return ProvidersCache.cache;
};

const getProviderEndpointURLForURL = async (url: string): Promise<{ provider: Provider; endpoint: string } | null> => {
    const providers = await getProviders();
    for (const provider of providers) {
        for (const endpoint of provider.endpoints) {
            if (endpoint.schemes?.some((scheme) => new RegExp(scheme.replace(/\*/g, '(.*)')).test(url))) {
                return { provider, endpoint: endpoint.url };
            }
        }
    }
    return null;
};

export const handleHTML = (html: string, info: TransformerInfo): string => {
    const { url, transformer } = info;
    if (transformer.name === 'AstroSimply') {
        // To use twitter's widget.js, you have to wrap by <div></div> to work with @remark-embedder/core.
        if (url.includes('twitter.com') || url.includes('x.com')) {
            return `<div style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 550px ">${html}</div>`;
        }
    }
    return html;
};

export const oembedConfig = ({ provider }: { url: string; provider: { provider_name: string } }): Config => {
    if (provider.provider_name === 'Twitter' || provider.provider_name === 'X') {
        return {
            params: { theme: 'dark', dnt: true, omit_script: false },
        };
    }
    if (provider.provider_name === 'Instagram' || provider.provider_name === 'Facebook') {
        return {
            params: { access_token: FACEBOOK_ACCESS_TOKEN },
        };
    }
    return { params: {} };
};

export const handleError = ({ url, transformer }: ErrorParams): string => {
    if (transformer.name === 'AstroSimply') {
        if (url.includes('twitter.com') || url.includes('x.com')) {
            return `<p>Unable to embed <a href="${url}">this tweet</a></p>`;
        }
    }
    return `<p><a href="${url}">${url}</a></p>`;
};

const AstroSimplyTransformer: Transformer<Config | GetConfig> = {
    name: 'AstroSimply',
    shouldTransform: async (url) => {
        // console.log('🚀 ~ shouldTransform: ~ url:', url);
        // // check if we got a valid URL
        // const urlRegex = new RegExp(
        //     /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
        // );
        // if (!urlRegex.test(url)) {
        //     console.log('🚩 Not a valid URL!:', url);
        //     return false;
        // }
        // // Return true because we want to use the bookmark later in getHTML if it is not an oembed URL
        // return true;
        const result = await getProviderEndpointURLForURL(url);
        return Boolean(result);
    },
    getHTML: async (urlString) => {
        const result = await getProviderEndpointURLForURL(urlString);
        // if no matching provider endpoint, return a Bookmark card
        if (!result) return bookmarkAsString(urlString);

        const { provider, endpoint } = result;

        const url = new URL(endpoint);
        url.searchParams.set('url', urlString);

        const config = oembedConfig({ url: urlString, provider });

        for (const [key, value] of Object.entries(config.params ?? {})) {
            url.searchParams.set(key, String(value));
        }

        // format has to be json so it is not configurable
        url.searchParams.set('format', 'json');

        const res = await fetch(url.toString());
        const data = (await res.json()) as OEmbedData;

        // if no proper html returned, try something else
        if (!data.html) {
            if (data.type === 'photo' && data.url) {
                // if photo with proper url, just show the picture
                return `<p><img src="${data.url}" alt="${data.title || data.author_name || data.provider_name}" loading="lazy" decoding="async" width="${data.thumbnail_width}" height="${data.thumbnail_height}"></p>`;
            }
            // return a bookmark card instead
            return bookmarkAsString(urlString);
        }
        return data.html;
    },
};

export default AstroSimplyTransformer;
type ExportedConfig = Config | GetConfig;
export type { ExportedConfig as Config };
