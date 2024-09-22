import { CONFIG } from '@config/config';

const settings = CONFIG;

const modules: Record<string, Record<string, string>> = import.meta.glob('../i18n/*.js', {
    eager: true,
    import: 'default',
});

const languages: Record<string, Record<string, string>> = {};

for (const [path, lang] of Object.entries(modules)) {
    const name = path
        .split('/')
        .pop()
        ?.replace(/\.\w+$/, '') as string;
    languages[name] = lang;
}

const useLang = (): Record<string, string> => {
    return languages[settings.lang.replace(/-/g, '_')];
};

const t = (name: string, fallback: string | null = null): string => {
    const lang = useLang();
    if (!lang[name] && fallback === null) {
        console.log(`Cannot find ${name} in lang file.`);
    }

    return lang[name] || fallback || '';
};

export { useLang, t };
