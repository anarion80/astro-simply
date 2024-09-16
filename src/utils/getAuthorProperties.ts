interface Author {
    name?: string;
    website?: string;
    twitter?: string;
    facebook?: string;
    profile_image?: string;
}

interface AuthorProperties {
    name: string | null;
    sameAsArray: string | null;
    image: string | null;
    facebookUrl: string | null;
}

export const getAuthorProperties = (primaryAuthor: Author): AuthorProperties => {
    let authorProfiles: (string | null)[] = [];

    authorProfiles.push(
        primaryAuthor.website || null,
        primaryAuthor.twitter ? `https://twitter.com/${primaryAuthor.twitter.replace(/^@/, '')}/` : null,
        primaryAuthor.facebook ? `https://www.facebook.com/${primaryAuthor.facebook.replace(/^\//, '')}/` : null
    );

    authorProfiles = authorProfiles.filter((profile): profile is string => !!profile);

    return {
        name: primaryAuthor.name || null,
        sameAsArray: authorProfiles.length ? `["${authorProfiles.join('", "')}"]` : null,
        image: primaryAuthor.profile_image || null,
        facebookUrl: primaryAuthor.facebook
            ? `https://www.facebook.com/${primaryAuthor.facebook.replace(/^\//, '')}/`
            : null,
    };
};

export default getAuthorProperties;
