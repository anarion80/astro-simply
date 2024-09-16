export const relativeUrl = (url: string): string => url.replace(/https?:\/{2}[^/]+/, '');

// higher order function
const withPrefixPath =
    (prefixPath: string) =>
    (path: string): string =>
        normalizePath(`/${prefixPath}/${path}/`);

const normalizePath = (path: string): string => {
    const normalized = `/${path.trim().replace(/^\/+|\/+$/g, '')}/`;
    return normalized.replace('////', '/').replace('///', '/').replace('//', '/');
};

const splitUrl = (url: string): { absolute: string | undefined; relative: string } => {
    // Regexp to extract the absolute part of the CMS url
    const regexp = /^(([\w-]+:\/\/?|www[.])[^\s()<>^/]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/)))/;

    const match = url.match(regexp);
    const absolute = (match && match[0]) ?? undefined;
    const relative = absolute ? url.split(absolute, 2).join('/') : url;
    return {
        absolute,
        relative,
    };
};

export const resolveUrl = (url: string, collectionPath = '/'): string => {
    // resolveBase and resolvePath are a functions!
    const resolvePath = withPrefixPath(collectionPath);

    if (!(typeof url === 'string' && url.length > 0)) {
        return normalizePath(resolvePath('/'));
    }

    const { absolute: cmsUrl, relative: dirUrl } = splitUrl(url);

    // Early exit if absolute part cannot be found
    if (!(typeof cmsUrl === 'string' && cmsUrl.length > 0)) {
        return normalizePath(url);
    }
    return resolvePath(dirUrl);
};
