import type { APIRoute } from 'astro';
import { CONFIG } from '@config/config';

const robots = `
User-agent: *
Allow: /

#
# Disallow decidedly bad actors…
#
User-agent: undici
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: CCBot
User-agent: Google-Extended
User-agent: Omgilibot
User-Agent: FacebookBot
Disallow: /

Sitemap: ${new URL('sitemap-index.xml', CONFIG.siteUrl).href}
`.trim();

export const GET: APIRoute = () =>
    new Response(robots, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
