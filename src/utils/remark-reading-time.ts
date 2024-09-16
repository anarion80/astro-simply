import getReadingTime from 'reading-time';
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { toString } from 'mdast-util-to-string';

/**
 * Injects `minutesRead` into frontmatter processed by Remark.
 */
export function remarkReadingTime() {
    return (tree: unknown, { data }: { data: { astro: { frontmatter: { minutesRead: string } } } }) => {
        const textOnPage = toString(tree);
        const readingTime = getReadingTime(textOnPage);
        // readingTime.text will give us minutes read as a friendly string,
        // i.e. "3 min read"
        data.astro.frontmatter.minutesRead = readingTime.text;
    };
}
