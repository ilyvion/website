import React from "react"
import { graphql, Link } from "gatsby"
import moment from "moment"

import Layout from "@components/layout"
import SEO from "@components/seo"
import Header from "@components/Header"
import Section, { CenteredSection } from "@components/Section"

export default class TagTemplate extends React.Component {
  render() {
    const { path, pageContext, data } = this.props
    const { tag } = pageContext
    const { edges, totalCount } = data.allMdx
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`
    const title = `#${tag}`

    let blogPosts = edges
    blogPosts = blogPosts.map(e => (
      <div className="col-lg-8 col-lg-offset-2" key={e.node.fields.slug}>
        <h3>
          <Link to={`/blog${e.node.fields.slug}`}>
            {e.node.frontmatter.title}
          </Link>
        </h3>
        <p>
          <span
            title={moment(e.node.frontmatter.raw_date).format(
              "MMMM DD, YYYY HH:mm"
            )}
          >
            {e.node.frontmatter.date}
          </span>{" "}
          &nbsp; &middot; &nbsp;{` `}
          {e.node.fields.readingTime.text}
        </p>
        <p>{e.node.excerpt}</p>
      </div>
    ))

    return (
      <Layout path={path}>
        <SEO
          title={title}
          description={tagHeader}
          keywords={[tag, data.site.siteMetadata.author]}
        />
        <Header className="small" />
        <CenteredSection className="bg-primary">
          <h2 className="section-heading">#{tag}</h2>
          <h3>{tagHeader}</h3>
          <hr className="primary" />
        </CenteredSection>
        <Section>
          <div className="row">{blogPosts}</div>
        </Section>
      </Layout>
    )
  }
}

export const query = graphql`
  query TagByName($tag: String!) {
    site {
      siteMetadata {
        title
        author
        social {
          twitter
        }
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2000
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
