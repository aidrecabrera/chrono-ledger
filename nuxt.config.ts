// https://nuxt.com/docs/api/configuration/nuxt-config
var siteName = "Rechrono";
var delimiter = " | ";
var description =
  "Rechron redefines your time tracking system for any business size. Simplify hours worked with precision. Try now!";
var url = "https://www.rechrono.so/"; // Replace 'yourwebsite.com' with your actual website URL

export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@nuxt/fonts",
    "nuxt-vercel-analytics",
  ],
  googleFonts: {
    families: {
      "Bricolage+Grotesque": true,
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: true,
    config: {},
    injectPosition: "first",
    viewer: true,
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  supabase: {
    redirect: false,
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      title: siteName,
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: siteName + delimiter + description,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: siteName,
        },
        {
          hid: "og:url",
          name: "og:url",
          content: url,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: url + "/favicons/fb-cover.jpg",
        },
        {
          hid: "og:type",
          name: "og:type",
          content: "website",
        },
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: siteName,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: description,
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary",
        },
        {
          hid: "twitter:creator",
          name: "twitter:creator",
          content: "@yourtwitterhandle",
        },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: url,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: siteName,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: url + "/favicons/fb-cover.jpg",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/cl.ico" },
        {
          rel: "canonical",
          href: url,
        },
        {
          rel: "apple-touch-icon",
          sizes: " 180x180",
          href: "/favicons/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "favicons/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "favicons/favicon-16x16.png",
        },
        {
          rel: "mask-icon",
          color: "#000000",
          href: "favicons/safari-pinned-tab.svg",
        },
        {
          rel: "shortcut icon",
          href: "favicons/favicon.ico",
        },
      ],
    },
  },
  fonts: {
    families: [
      {
        name: "Square Sans Display",
        provider: "custom",
        src: 'url("https://square-fonts-production-f.squarecdn.com/square-display/SquareSansDisplay-VF.woff2")',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ["normal"],
      },
      {
        name: "Square Sans Text Italic",
        provider: "custom",
        src: 'url("https://square-fonts-production-f.squarecdn.com/square-text/SquareSansText-Italic-VF.woff2")',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ["italic"],
      },
      {
        name: "Square Sans Text Medium",
        provider: "custom",
        src: 'url("https://square-fonts-production-f.squarecdn.com/square-text/SquareSansText-Medium.woff2")',
        weights: [500],
        styles: ["normal"],
      },
      {
        name: "Square Sans Text Upright",
        provider: "custom",
        src: 'url("https://square-fonts-production-f.squarecdn.com/square-text/SquareSansText-Upright-VF.woff2")',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ["normal"],
      },
    ],
    defaults: {
      weights: [400, 500, 700, 900],
      styles: ["normal", "italic"],
      subsets: [],
    },
  },
});
