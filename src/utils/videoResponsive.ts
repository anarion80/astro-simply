import getAll from './getAll';

export default function videoResponsive(): void {
    /* Iframe SRC video */
    const selectors: string[] = [
        `iframe[src*="player.vimeo.com"]`,
        `iframe[src*="dailymotion.com"]`,
        `iframe[src*="youtube.com"]`,
        `iframe[src*="youtube-nocookie.com"]`,
        `iframe[src*="player.twitch.tv"]`,
        `iframe[src*="kickstarter.com"][src*="video.html"]`,
    ];

    const iframes: HTMLElement[] = getAll(selectors.join(`,`));

    if (!iframes.length) {
        return;
    }

    iframes.forEach((el) => {
        const parentForVideo: HTMLDivElement = document.createElement(`div`);
        parentForVideo.className = `video-responsive`;
        el.parentNode?.insertBefore(parentForVideo, el);
        parentForVideo.appendChild(el);
        el.removeAttribute(`height`);
        el.removeAttribute(`width`);
    });
}
