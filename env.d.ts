declare namespace NodeJS {
    /** for astro.config.mjs */
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly SITE_URL: string;
    }
}

/** for import.meta.env for the rest of the code */
interface ImportMetaEnv {
    // NODE_ENV, SITE_URL... included by default
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
