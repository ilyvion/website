/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Alexander Krivács Schrøder`,
    author: `Alexander Krivács Schrøder`,
    siteUrl: `https://alexanderschroeder.net`,
    description: `Highly passionate software developer in Oslo, Norway`,
    social: {
      twitter: `ilyvion`,
    },
    years: {
      startingProgrammingYear: 1995,
      startingProgrammingProfessionallyYear: 2007,
    },
    menuLinks: [
      {
        id: "main",
        link: "/",
        name: "Main",
        pageNavs: [
          { id: "about", name: "About" },
          { id: "skills", name: "Skills" },
          { id: "code", name: "Code" },
          { id: "social", name: "Social" },
          { id: "contact", name: "Contact" },
        ],
      },
      {
        id: "links",
        link: "/links",
        name: "Links",
        pageNavs: [{ id: "webcomics", name: "Web Comics" }],
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://alexanderschroeder.net`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alexander Krivács Schrøder`,
        short_name: `alexanderschroeder.net`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4075f0`,
        display: `standalone`,
        icon: `src/images/monogram-rendered.svg`,
        lang: `en`,
        cache_busting_mode: "none",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          globPatterns: ["**/*"],
        },
      },
    },
  ],
}
