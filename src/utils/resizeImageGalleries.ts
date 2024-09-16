import getAll from './getAll';

/**
 * Gallery card support
 * Used on any individual post/page
 *
 * Detects when a gallery card has been used and applies sizing to make sure
 * the display matches what is seen in the editor.
 */

export default function resizeImageGalleries(): void {
    const images = getAll<HTMLImageElement>(`.kg-gallery-image > img`);

    if (!images.length) {
        return;
    }

    images.forEach((image) => {
        const container = image.closest<HTMLDivElement>(`.kg-gallery-image`);
        const width = parseInt(image.attributes.getNamedItem('width')?.value ?? '0', 10);
        const height = parseInt(image.attributes.getNamedItem('height')?.value ?? '0', 10);
        const ratio = width / height;
        if (container) {
            container.style.flex = `${ratio} 1 0%`;
        }
    });
}
