import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export interface LinkData {
    title: string;
    description: string;
    icon: string;
    author: string;
    link: string;
    thumbnail: string;
    publisher: string;
}

export const fetchURLMetadata = async (
    url: string
): Promise<{
    title: string;
    description: string;
    icon: string;
    author: string;
    thumbnail: string;
    publisher: string;
    link: string;
}> => {
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
            description: scriptContent.description,
            icon: '',
            author: scriptContent.author?.name,
            link: '',
            thumbnail: scriptContent.image?.url || scriptContent.publisher?.logo?.url,
            publisher: scriptContent.publisher?.name,
        };
    }

    if (!linkData.title)
        linkData.title =
            doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
            doc.querySelector('title')?.getAttribute('value') ||
            doc.title;

    if (!linkData.description)
        linkData.description =
            doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
            doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
            '';

    if (!linkData.icon) {
        const iconLink =
            doc.querySelector('link[rel="icon"]')?.getAttribute('href') ||
            doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') ||
            doc.querySelector('link[rel="alternate icon"]')?.getAttribute('href') ||
            doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href') ||
            '';
        linkData.icon = !iconLink.startsWith('http') ? new URL(iconLink, new URL(url).origin).href : iconLink;
    }

    if (!linkData.author) linkData.author = doc.querySelector('meta[name="author"]')?.getAttribute('content') || '';

    if (!linkData.thumbnail) {
        const thumbnailLink = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
        // console.log('🚀 ~ file: addBookmarks.ts:120 ~ thumbnailLink:', thumbnailLink);
        linkData.thumbnail =
            thumbnailLink && !thumbnailLink.startsWith('http')
                ? new URL(thumbnailLink, new URL(url).origin).href
                : thumbnailLink;
    }

    if (!linkData.publisher)
        linkData.publisher =
            doc.querySelector('meta[name="publisher"]')?.getAttribute('content') ||
            doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content') ||
            new URL(url).origin ||
            '';

    return linkData;
};

export default fetchURLMetadata;
