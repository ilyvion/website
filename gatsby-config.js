/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const generateIcons = sizes => {
  return sizes.map(size => {
    return {
      src: `favicons/icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    }
  })
}

module.exports = {
  siteMetadata: {
    title: `Alexander Krivács Schrøder`,
    author: `Alexander Krivács Schrøder`,
    siteUrl: `https://alexanderschroeder.net`,
    description: `Highly passionate software developer in Oslo, Norway`,
    gitHubRepository: `alexschrod/website`,
    code: {
      github: `alexschrod`,
      stackoverflow: { id: 161250, name: `alex` },
      bitbucket: `alexschrod`,
    },
    social: {
      email: `alexschrod@gmail.com`,
      twitter: `ilyvion`,
      facebook: `alexander.schroder`,
      linkedin: `alexanderschroder`,
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
          { id: "blog", name: "Blog" },
          { id: "about", name: "About" },
          { id: "skills", name: "Skills" },
          { id: "code", name: "Code" },
          { id: "social", name: "Social" },
          { id: "contact", name: "Contact" },
        ],
      },
      {
        id: "links",
        link: "/links/",
        name: "Links",
        pageNavs: [{ id: "webcomics", name: "Web Comics" }],
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-code-titles",
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-plugin-sitemap`,
          `gatsby-remark-numbered-footnotes`,
        ],
      },
    },
    `gatsby-remark-reading-time`,
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
			{
			  site {
				siteMetadata {
				  title
				  description
				  siteUrl
				  site_url: siteUrl
				}
			  }
			}
		  `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url:
                    site.siteMetadata.siteUrl + "/blog" + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
				{
				  allMdx(
					sort: { order: DESC, fields: [frontmatter___date] },
					filter: { frontmatter: {draft: {ne: true} } }
				  ) {
					edges {
					  node {
						excerpt
						html
						fields { slug }
						frontmatter {
						  title
						  date
						}
					  }
					}
				  }
				}
			  `,
            output: "/blog/rss.xml",
            title: "Alexander Krivács Schrøder's Blog RSS Feed",
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
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
        icons: generateIcons([48, 72, 96, 144, 192, 256, 384, 512]),
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
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@src": "src",
          "@components": "src/components",
          "@pages": "src/pages",
          "@templates": "src/templates",
          "@assets": "content/assets",
          "@utils": "src/utils",
        },
        extensions: ["js"],
      },
    },
    `gatsby-plugin-force-trailing-slashes`,
  ],
}
