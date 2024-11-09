const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require(`lodash`)

// Creates the slugs for the markdown files
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// Creates pages
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Get all blog entries
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                draft
                title
                tags
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const blogTemplate = path.resolve(`./src/templates/blogPost.js`)
  const posts = result.data.allMdx.edges.filter(e => !!e.node.frontmatter.draft)
  const drafts = result.data.allMdx.edges.filter(e => !e.node.frontmatter.draft)
  const createBlogPage = (post, index, posts) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `blog${post.node.fields.slug}`,
      component: blogTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  }
  posts.forEach(createBlogPage)
  drafts.forEach(createBlogPage)

  const blogListTemplate = path.resolve(`./src/templates/blogList.js`)
  const postsPerPage = 10

  const createBlogListPage = function (posts, drafts) {
    const numPosts = Math.max(Math.ceil(posts.length / postsPerPage), 1)
    const pathPrefix = drafts ? "/blog" : "/blog/drafts"
    Array.from({ length: numPosts }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `${pathPrefix}/` : `${pathPrefix}/${i + 1}`,
        component: blogListTemplate,
        context: {
          drafts: drafts,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: numPosts,
          currentPage: i + 1,
        },
      })
    })
  }

  // Create blog-list pages
  createBlogListPage(posts, false)

  // Also for drafts
  createBlogListPage(drafts, true)

  // Create tag pages:
  const tagTemplate = path.resolve(`./src/templates/tag.js`)
  let tags = []
  // Iterate through each post, putting all found tags into `tags`
  _.each([posts, drafts].flat(), edge => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })
  // Eliminate duplicate tags
  tags = _.uniq(tags)

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/blog/tags/${_.kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })

  // Create tag-list page
  const tagListTemplate = path.resolve(`./src/templates/tagList.js`)
  createPage({
    path: `/blog/tags/`,
    component: tagListTemplate,
    context: {},
  })
}

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
  })
}
