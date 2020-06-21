import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import moment from "moment"
import kebabCase from "lodash/kebabCase"

import Layout from "@components/layout"
import SEO from "@components/seo"
import Header from "@components/Header"
import Section, { CenteredSection } from "@components/Section"
import ExternalLink from "@components/externalLink"
import shareOnTwitter from "@assets/share-on-twitter.png"

import containerStyles from "./blogPost.module.css"

const shortcodes = { ExternalLink, Link }

export default class BlogPostTemplate extends React.Component {
  render() {
    const { path } = this.props
    const post = this.props.data.mdx
    const postTitle = post.frontmatter.title
    const tags = post.frontmatter.tags
    return (
      <Layout path={path}>
        <SEO
          title={postTitle}
          description={post.frontmatter.description || post.excerpt}
          keywords={tags}
        />
        <Header className="small" />
        <CenteredSection className="bg-primary">
          <h2 className="section-heading">{postTitle}</h2>
          <hr className="primary" />
          <p>
            <span
              title={moment(post.frontmatter.raw_date).format(
                "MMMM DD, YYYY HH:mm"
              )}
            >
              {post.frontmatter.date}
            </span>{" "}
            &nbsp; &middot; &nbsp;{` `}
            {post.fields.readingTime.text}
            &nbsp; &middot; &nbsp;{` `}
            <ExternalLink
              to={
                "https://github.com/alexschrod/website/tree/master/content" +
                this.props.location.pathname +
                "index.md"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Edit on GitHub
            </ExternalLink>
          </p>
          <p>
            Tagged as:{" "}
            <ul className={containerStyles.tags}>
              {tags.map(t => (
                <li>
                  <Link to={`/blog/tags/${kebabCase(t)}/`}>{"#" + t}</Link>
                </li>
              ))}
            </ul>
          </p>
        </CenteredSection>
        <Section>
          <div className="col-lg-8 col-lg-offset-2">
            <MDXProvider components={shortcodes}>
              <MDXRenderer>{post.body}</MDXRenderer>
            </MDXProvider>
          </div>
        </Section>
        <CenteredSection>
          <a
            href={
              "https://twitter.com/intent/tweet/?text=" +
              postTitle +
              "&url=https://alexanderschroeder.net" +
              post.fields.slug +
              "&via=" +
              this.props.data.site.siteMetadata.social.twitter
            }
            style={{ boxShadow: "none" }}
          >
            <img
              src={shareOnTwitter}
              alt="Share On Twitter"
              style={{
                marginTop: 1,
                marginBottom: 0,
                width: 320,
                maxWidth: "100%",
              }}
            />
            <div>Let others know about this article</div>
          </a>
        </CenteredSection>
      </Layout>
    )
  }
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        social {
          twitter
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        raw_date: date
        tags
      }
      fields {
        readingTime {
          text
        }
        slug
      }
    }
  }
`
