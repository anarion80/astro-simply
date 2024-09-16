import mediumZoom from 'medium-zoom';

export default function mediumZoomImg(): void {
    mediumZoom('.simply-zoom', {
        margin: 20,
        background: `hsla(0,0%,100%,.85)`,
    });
}
