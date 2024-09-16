import type { RehypePlugin } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';
import type { Element } from 'hast';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import type { Parent } from 'unist';
// import { h } from 'hastscript';

interface Options {
    domain: string[];
}

export interface LinkData {
    title: string;
    description: string;
    icon: string;
    author: string;
    link: string;
    thumbnail: string;
    publisher: string;
}

interface AnchorElement extends Element {
    tagName: 'a';
    properties: {
        href?: string;
    };
}

interface Node {
    type: string;
    value?: string;
}

export const addBookmarks: RehypePlugin<[Options?]> = (options?: Options) => {
    const siteDomain = options?.domain ?? [];
    console.log('🚀 ~ file: addBookmarks.ts:12 ~ siteDomain:', siteDomain);
    const links: AnchorElement[] = [];

    return async (tree: Node) => {
        visit(tree, 'element', (node: Node, parent: Parent | null) => {
            if (node.type !== 'element') return;

            const element = node as Element;
            if (
                isAnchor(element) &&
                isOnSeparateLine(node, parent)
                // Uncomment and implement checkUrlAgainstDomains if needed
                // && checkUrlAgainstDomains(getURL(element), siteDomain)
            ) {
                links.push(element);
            }
        });

        if (links.length === 0) return;
        console.log('🚀 ~ file: addBookmarks.ts:43 ~ visit ~ links:', links);

        const promises: Promise<void>[] = links.map((link) =>
            fetchUrlMetadata(getURL(link)).then((data) => {
                // Handle the data if needed
                console.log('🚀 ~ file: addBookmarks.ts:32 ~ promises.push ~ data:', data);
            })
        );

        await Promise.all(promises);
    };
};

const isAnchor = (element: Element): element is AnchorElement => {
    return (
        element.tagName === 'a' &&
        element.properties !== undefined &&
        'href' in element.properties &&
        element.children.length === 1 &&
        element.children[0].type === 'text' &&
        element.children[0].value === element.properties['href']
        // && isOnSeparateLine(element) // Uncomment if needed
    );
};

const isOnSeparateLine = (node: Node, parent: Parent | null): boolean => {
    if (!parent || !parent.children) {
        return false;
    }

    const children = parent.children;
    const index = children.indexOf(node as Node);

    if (index === -1) {
        return false;
    }

    const isEmptyTextNode = (node: Node): boolean =>
        node.type === 'text' && typeof node.value === 'string' && node.value.trim() === '' && node.value.includes('\n');

    // Check if the previous sibling is an empty line
    const isPreviousEmpty = index === 0 || isEmptyTextNode(children[index - 1]);

    // Check if the next sibling is an empty line
    const isNextEmpty = index === children.length - 1 || isEmptyTextNode(children[index + 1]);

    // The element is on a separate line if both conditions are true
    return isPreviousEmpty && isNextEmpty;
};

const getURL = (element: Element): string => {
    if (!element.properties || typeof element.properties['href'] !== 'string') {
        return '';
    }

    return element.properties['href'];
};

// const isExternal = (url: string, domain: string) => {
//     return url.startsWith('http') && !url.includes(domain);
// };

// const isGithubRepoURL = (url: string) => {
//     return /^https:\/\/(www\.)?github.com\/[a-zA-Z0-9-_.]+\/[a-zA-Z0-9-_.]+$/.test(url);
// };

// const checkUrlAgainstDomains = (url: string, domains: string[]) => {
//     const domainRegex = new RegExp(domains.map((domain) => domain.replace('.', '\\.')).join('|'), 'i');
//     return domainRegex.test(url);
// };

export const fetchUrlMetadata = async (url: string): Promise<LinkData> => {
    let linkData: LinkData = {
        title: '',
        description: '',
        icon: '',
        author: '',
        link: url,
        thumbnail: '',
        publisher: '',
    };

    const response = await fetch(url);
    const text = await response.text();
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay for 2 seconds

    const dom = new JSDOM(text, { pretendToBeVisual: true, resources: 'usable' });
    const doc = dom.window.document;

    const scriptElement = doc.querySelector('script[type="application/ld+json"]');
    if (scriptElement && scriptElement.textContent) {
        const scriptContent = JSON.parse(scriptElement.textContent);
        console.log('🚀 ~ file: addBookmarks.ts:107 ~ scriptContent:', scriptContent);
        linkData = {
            title: scriptContent.headline || scriptContent.alternativeHeadline,
            description: scriptContent.description || '',
            icon: '',
            author: scriptContent.author?.name || '',
            link: '',
            thumbnail: scriptContent.image?.url || scriptContent.publisher?.logo?.url || '',
            publisher: scriptContent.publisher?.name || '',
        };
    }

    // Check if any of the linkData attributes are empty
    const hasEmptyAttributes = Object.values(linkData).some((value) => value === '');
    if (hasEmptyAttributes) {
        console.warn('🚀 ~ file: addBookmarks.ts:123 ~ Some linkData attributes are empty.');
    }

    if (!linkData.title) {
        linkData.title =
            doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
            doc.querySelector('title')?.getAttribute('value') ||
            doc.title ||
            '';
    }

    if (!linkData.description) {
        linkData.description =
            doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
            doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
            '';
    }

    if (!linkData.icon) {
        const iconLink =
            doc.querySelector('link[rel="icon"]')?.getAttribute('href') ||
            doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') ||
            doc.querySelector('link[rel="alternate icon"]')?.getAttribute('href') ||
            doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href') ||
            '';
        if (iconLink) {
            linkData.icon = !iconLink.startsWith('http') ? new URL(iconLink, new URL(url).origin).href : iconLink;
        }
    }

    if (!linkData.author) {
        linkData.author = doc.querySelector('meta[name="author"]')?.getAttribute('content') || '';
    }

    if (!linkData.thumbnail) {
        const thumbnailLink = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
        linkData.thumbnail =
            thumbnailLink && !thumbnailLink.startsWith('http')
                ? new URL(thumbnailLink, new URL(url).origin).href
                : thumbnailLink;
    }

    if (!linkData.publisher) {
        linkData.publisher =
            doc.querySelector('meta[name="publisher"]')?.getAttribute('content') ||
            doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content') ||
            new URL(url).origin ||
            '';
    }

    return linkData;
};
