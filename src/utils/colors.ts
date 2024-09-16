export function getContrastRatio(color1: string, color2: string): number {
    /**
     * Converts a hex color string to an RGB array.
     * @param {string} hex - A hex color string.
     * @returns {[number, number, number]} An array of RGB values.
     */
    const hexToRgb = (hex: string): [number, number, number] => {
        const bigint: number = parseInt(hex.slice(1), 16);
        const r: number = (bigint >> 16) & 0xff;
        const g: number = (bigint >> 8) & 0xff;
        const b: number = bigint & 0xff;
        return [r, g, b];
    };

    /**
     * Calculates the luminance of an RGB color.
     *
     * @param {readonly [number, number, number]} rgb - An RGB color as an array of 3 numbers between 0 and 255.
     * @returns {number} The luminance value between 0 and 1.
     */
    const luminance = (rgb: readonly [number, number, number]): number => {
        const sRGB: number[] = rgb.map((val) => {
            const valNormalized: number = val / 255;
            return valNormalized <= 0.03928 ? valNormalized / 12.92 : Math.pow((valNormalized + 0.055) / 1.055, 2.4);
        });
        return sRGB[0] * 0.2126 + sRGB[1] * 0.7152 + sRGB[2] * 0.0722;
    };

    // Calculate contrast ratio
    const contrastRatio: number = (luminance(hexToRgb(color1)) + 0.05) / (luminance(hexToRgb(color2)) + 0.05);
    return contrastRatio;
}

/**
 * Reduces the brightness of a given hex color string.
 *
 * @param {string} hexColor - A hex color string (e.g. `#ff0000`).
 * @param {number} reduction - A number between 0 and 1 to reduce the brightness by.
 * @returns {string} The hex color string with reduced brightness.
 */
export function reduceBrightness(hexColor: string, reduction: number): string {
    if (reduction < 0 || reduction > 1) {
        throw new Error('Reduction must be a number between 0 and 1');
    }

    // Helper function to convert hex to RGB
    const hexToRgb = (hex: string): [number, number, number] => {
        return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
    };

    // Reduce brightness by 50%
    const rgb: number[] = hexToRgb(hexColor).map((c) => Math.max(0, Math.round(c * reduction)));

    // Convert RGB back to hex
    const reducedHexColor: string = '#' + rgb.map((c) => c.toString(16).padStart(2, '0')).join('');

    return reducedHexColor;
}

/**
 * Adjusts a given color to have a sufficient contrast ratio with another color.
 *
 * @param {string} color1 - A hex color string (e.g. `#ff0000`).
 * @param {string} color2 - A hex color string (e.g. `#ff0000`).
 * @returns {string} The color with sufficient contrast ratio.
 */
export function adjustColorForContrast(color1: string, color2: string): string {
    const contrast: number = getContrastRatio(color1, color2); // Compare with white
    if (contrast < 4.5) {
        // Reduce brightness
        const newColor: string = reduceBrightness(color2, 0.9);
        return adjustColorForContrast(color1, newColor); // Recursive call
    }
    return color2; // Return when contrast is satisfactory
}
