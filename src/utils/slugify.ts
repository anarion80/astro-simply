export function slugify(text: string) {
    return text.replace(/\s+/g, '-');
}

export function unslugify(text: string) {
    return text.replace(/-/g, ' ');
}
