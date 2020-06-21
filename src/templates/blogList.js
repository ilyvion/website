import React from "react"
import { graphql, Link } from "gatsby"
import moment from "moment"

import Layout from "@components/layout"
import SEO from "@components/seo"
import Header from "@components/Header"
import Section, { CenteredSection } from "@components/Section"

const BlogList = ({ path, data, pageContext }) => {
  let blogPosts = data.allMdx.edges

  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

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
      <SEO title={`Blog posts (page ${currentPage})`} />
      <Header small />
      <CenteredSection className="bg-primary">
        <h2 className="section-heading text-center">Blog posts</h2>
        <hr className="primary" />
        <p>
          <Link to="/blog/tags/">Browse by tag</Link>&nbsp; &middot; &nbsp;Feed:{" "}
          <a href="/blog/rss.xml" title="RSS">
            <i className="fa fa-rss" aria-hidden="true"></i>
          </a>
        </p>
      </CenteredSection>
      <Section>
        <div className="row">{blogPosts}</div>
        <div className="row">
          <div className="col-xs-6">
            <p>
              {!isFirst && (
                <Link to={prevPage} rel="prev">
                  ← Previous Page
                </Link>
              )}
            </p>
          </div>
          <div className="col-xs-6" style={{ textAlign: "right" }}>
            <p>
              {!isLast && (
                <Link to={nextPage} rel="next">
                  Next Page →
                </Link>
              )}
            </p>
          </div>
        </div>
      </Section>
    </Layout>
  )
}

export default BlogList

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
            raw_date: date
          }
          excerpt
        }
      }
    }
  }
`
