# Astro Blog with Simply Theme

A starter template to build lightning fast websites with [Astro](https://astro.build), using the excellent [Simply Ghost Theme](https://github.com/godofredoninja/simply) rewritten from Handlebars theme to Astro/React with some features added from [Ghost CMS](https://github.com/TryGhost/Ghost) itself.

After porting the [Simply Ghost Theme](https://github.com/godofredoninja/simply) to [Gatsby with Ghost](https://github.com/anarion80/gatsby-ghost-simply) and then later to [Astro with Ghost](https://github.com/anarion80/astro-ghost-simply), this repo is for using only Astro, without Ghost as CMS. Just the regular md/mdx files.

**Demo:** [https://astro-simply.pages.dev](https://astro-simply.pages.dev)

&nbsp;

![astro-ghost-simply](https://user-images.githubusercontent.com/2185791/133974213-7f41e2e5-427d-4a0b-8024-e0d2ac3c4dd0.png)
&nbsp;

## 🚀 Features

- 100/100 Pagespeed/Lighthouse performance
- SEO friendly - sitemap, metadata
- [Post](https://astro-simply.pages.dev/blog/), [Author](https://astro-simply.pages.dev/blog/author/) and [Category](https://astro-simply.pages.dev/blog/category/) content collections
- Different Home Page variants and Post formats
  - Home Page
    - [Index Default](https://astro-simply.pages.dev/blog/)
    - [Index Featured](https://astro-simply.pages.dev/index-featured/)
    - [Index Featured Slider](https://astro-simply.pages.dev/index-featured-slider/)
    - [Index Grid](https://astro-simply.pages.dev/index-grid/)
    - [Index Medium](https://astro-simply.pages.dev/index-medium/)
    - [Index Medium Sidebar](https://astro-simply.pages.dev/index-medium-sidebar/)
    - [Index Sidebar](https://astro-simply.pages.dev/index-sidebar/)
    - [Index Personal](https://astro-simply.pages.dev/index-personal/)
    - [Index Photographer](https://astro-simply.pages.dev/index-photographer/)
  - Post Format (:warning: use `postFormat` in post frontmatter to set)
    - [Post Default](https://godofredo.ninja/ghost-theme/simply/post-format/#post-default)
    - [Post Full](https://astro-simply.pages.dev/blog/customizing-your-brand-and-design-settings/)
    - [Post Wide](https://astro-simply.pages.dev/blog/start-here-for-a-quick-overview-of-all-you-need-to-know/)
    - [Post Header Image](https://astro-simply.pages.dev/blog/how-to-grow-your-business-around-an-audience/)
    - [Post Image](https://astro-simply.pages.dev/blog/building-your-audience-with-subscriber-signups/)
    - [Post Image Right](https://astro-simply.pages.dev/blog/selling-premium-memberships-with-recurring-revenue/)
    - [Post Sidebar](https://astro-simply.pages.dev/blog/markdown-style-guide/)
    - [Post not Image](https://astro-simply.pages.dev/blog/setting-up-apps-and-custom-integrations/)
  - Header Layouts
    - [Header Default](https://godofredo.ninja/ghost-theme/simply/layouts/#header)
    - [Header with DropDown Menu](https://godofredo.ninja/ghost-theme/simply/layouts/#headerdefault)
  - Footer Layouts
    - [Footer Default](https://godofredo.ninja/ghost-theme/simply/layouts/#header)
    - [Footer Dark](https://godofredo.ninja/ghost-theme/simply/layouts/#header)
    - [Footer Not Menu](https://godofredo.ninja/ghost-theme/simply/layouts/#header)
- [Tags](https://astro-simply.pages.dev/blog/tag/) page
- [Archive](https://astro-simply.pages.dev/index-archive/)
- [404](https://astro-simply.pages.dev/404)
- [Podcasts Page](https://astro-simply.pages.dev/podcast/)
- [Portfolio Page](https://astro-simply.pages.dev/portfolio/)
- [Sidebar ToC navigation](https://astro-simply.pages.dev/blog/writing-and-managing-content-in-ghost-and-advanced-guide/)
- [Social accounts link](https://godofredo.ninja/ghost-theme/simply/settings/#socialmedia)
- [GDPR Cookie Consent](https://github.com/jop-software/astro-cookieconsent)
- Ghost cards (GIF, Buttons, Callouts, Toggles, Custom blockquotes, Products, Audio, Video, Files, Headers)
  - can be used only in `*.mdx` files via importing and using appropriate component
- Config file
- Pagination
- Image optimization
- Validations using Zod
- Custom Oembed transformer
- Hamburger navigation menu
- Header Transparency
- Light Mode / Dark Mode
- Medium style image zoom
- RSS Feed
- Sitemap

## ✏ TODO

- [ ] The whole re-used CSS is a mess and would need a proper rewrite.
- [x] Astro view transistions
- [x] Contact Page
- [ ] Search
- [ ] Comments

## 🏗 Installing

The easiest way to run this project locally is to run the following command in your desired directory.

```bash
# npm 6.x
npm create astro@latest --template anarion80/astro-simply

# npm 7+, extra double-dash is needed:
npm create astro@latest -- --template anarion80/astro-simply

# yarn
yarn create astro --template anarion80/astro-simply
```

&nbsp;

## 🏃‍♂️ Running

Configure your site in `src/config/config.ts` including site title, description, logo, url, navigation menu structure, social media links, etc.

Update `SITE_URL` environment variable in `.env` file or in your deployment environment.

```ts
{
    title: `Astro Blog`,
    shortTitle: `Astro Blog`,
    siteDescriptionMeta: 'My personal blog',
    logo: '/src/assets/images/logo_black.svg', // must be referenced from /src
    logoDarkMode: '/src/assets/images/logo_white.svg', // must be referenced from /src
    siteIcon: 'favicon.svg',
    siteUrl: 'https://my.blog.com',
    postsPerPage: 12,
    shareImage: '/images/share_image.svg',
    shareImageWidth: 258,
    shareImageHeight: 1024,
    accentColor: '#d0000fff',
    lang: 'en',
    locale: 'en',
    viewTransitions: true, // set to true to enable Astro view transitions
    navigation: [
        {
            label: 'Blog',
            url: '/blog/',
        },
        {
            label: 'Authors',
            url: '/blog/author/',
        },
        .
        .
        .
    ]
    menuDropdown: [
        {
            label: `About`,
            url: `/about`,
        },
        .
        .
        .
    ],
    followSocialMedia: [
        {
            service: `youtube`,
            icon: 'fa6-brands:square-youtube',
            title: `YOUR_TITLE`,
            url: `YOUR_URL`,
        },
        .
        .
        .
    ],
}
```

> Demo and the repo is the "maximum version" with all possible types of Home Page variants, Post Templates, Portfolio, Podcasts, etc. Adjust/remove as needed.

Install the dependencies using the following command:

```bash
npm install
```

Start the development server using the following command:

```bash
npm run dev
```

&nbsp;

## ✈ Deploying with Netlify

Click this button and it will help you create a new repo, create a new Netlify project, and deploy!

[![Deploy to Netlify Button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/anarion80/astro-simply)

&nbsp;

## 🛠 Extra options

```bash
# Run a production build, locally
npm run build

# Preview a production build, locally
npm run preview

```

&nbsp;

## 🙏 Credits

- [Godofredo](https://github.com/godofredoninja) for the [Simply Ghost Theme](https://github.com/godofredoninja/simply)
- [Nemanjam](https://github.com/nemanjam) for [Developer blog website built with Astro and Tailwind](https://github.com/nemanjam/nemanjam.github.io)
- [Hakim El Hattab](https://hakim.se/) and [Kld.dev](https://kld.dev/) for [Progress Nav](https://lab.hakim.se/progress-nav/), [Table of contents animation](https://kld.dev/toc-animation/)
- [Reza Zahedi](https://rezahedi.dev/) for [sectionize](https://rezahedi.dev/blog/create-table-of-contents-in-astro-and-sectionize-the-markdown-content)
- [surjithctly](https://github.com/surjithctly) for [astroship](https://github.com/surjithctly/astroship), demo: https://astroship.web3templates.com
- [satnaing](https://github.com/satnaing) for [astro-paper](https://github.com/satnaing/astro-paper), demo: https://astro-paper.pages.dev/posts
- [onwidget](https://github.com/onwidget) for [astrowind](https://github.com/onwidget/astrowind), demo: https://astrowind.vercel.app

## 📝 Copyright & License

Copyright (c) 2024 anarion80 - Released under the [GPLv3 license](LICENSE).
