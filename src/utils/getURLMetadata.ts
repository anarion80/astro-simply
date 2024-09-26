import fetch from 'node-fetch';
import { Window } from 'happy-dom';

export interface LinkData {
    title: string;
    description: string;
    icon: string;
    author: string;
    link: string;
    thumbnail: string;
    publisher: string;
}

import metascraper from 'metascraper';
import metascraperUrl from 'metascraper-url';
import metascraperTitle from 'metascraper-title';
import metascraperImage from 'metascraper-image';
import metascraperAuthor from 'metascraper-author';
import metascraperLogo from 'metascraper-logo-favicon';
import metascraperDescription from 'metascraper-description';
import metascraperPublisher from 'metascraper-publisher';

export interface LinkData {
    title: string;
    description: string;
    icon: string;
    author: string;
    link: string;
    thumbnail: string;
    publisher: string;
}

export const getURLMetadata = async (
    url: string
): Promise<{
    title: string;
    description: string;
    icon: string;
    author: string;
    link: string;
    thumbnail: string;
    publisher: string;
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
    const html = await response.text();
    const responseURL = response.url;
    const metadata = await metascraper([
        metascraperUrl(),
        metascraperTitle(),
        metascraperImage(),
        metascraperAuthor(),
        metascraperLogo(),
        metascraperDescription(),
        metascraperPublisher(),
    ])({ html, url: responseURL });

    linkData = {
        title: metadata.title || '',
        description: metadata.description || '',
        icon: metadata.logo || '',
        author: metadata.author || '',
        link: url,
        thumbnail: metadata.image || '',
        publisher: metadata.publisher || '',
    };

    const window = new Window({
        url: url,
        settings: {
            disableCSSFileLoading: true,
            disableComputedStyleRendering: true,
            navigator: {
                userAgent: 'Mozilla/5.0 (X11; Linux x64) AppleWebKit/537.36 (KHTML, like Gecko) HappyDOM/2.0.0',
            },
        },
    });
    const doc = window.document;

    if (!linkData.title)
        linkData.title =
            doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
            doc.querySelector('title')?.getAttribute('value') ||
            doc.title ||
            'N/A';

    if (!linkData.description)
        linkData.description =
            doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
            doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
            'N/A';

    if (!linkData.icon) {
        const iconLink =
            doc.querySelector('link[rel="icon"]')?.getAttribute('href') ||
            doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') ||
            doc.querySelector('link[rel="alternate icon"]')?.getAttribute('href') ||
            doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href') ||
            'https://static.ghost.org/v5.0.0/images/link-icon.svg';
        linkData.icon = !iconLink.startsWith('http') ? new URL(iconLink, new URL(url).origin).href : iconLink;
    }

    if (!linkData.author) linkData.author = doc.querySelector('meta[name="author"]')?.getAttribute('content') || '';

    if (!linkData.thumbnail) {
        const thumbnailLink = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
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

    window.close();
    return linkData;
};

export const bookmarkAsString = async (url: string): Promise<string> => {
    const data: LinkData = await getURLMetadata(url);
    return `
            <figure class="kg-card kg-bookmark-card">
                <a class="kg-bookmark-container" href=${url}
                    ><div class="kg-bookmark-content">
                        <div class="kg-bookmark-title">${data.title || url}</div>
                        <div class="kg-bookmark-description">${data.description || ''}</div>
                        <div class="kg-bookmark-metadata">
                            <img class="kg-bookmark-icon" src=${data.icon || ''} alt="Link icon" />
                            ${data.author && `<span class="kg-bookmark-author">${data.author || ''}</span>`}
                            ${data.publisher && `<span class="kg-bookmark-publisher">${data.publisher || ''}</span>`}

                        </div>
                    </div>${
                        data.thumbnail &&
                        `<div class="kg-bookmark-thumbnail">
                                <img src=${data.thumbnail || ''} alt="Link thumbnail" />
                            </div>`
                    }
                </a>
            </figure>
            `;
};

export default getURLMetadata;
