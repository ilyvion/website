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
import Ruby from "@components/ruby"
import UtterancesComments from "@components/utterancesComments"
import AddToAny from "@components/addToAny"
import bySa from "@assets/by-sa.svg"

import containerStyles from "./blogPost.module.css"

const shortcodes = { ExternalLink, Link, Ruby }

export default class BlogPostTemplate extends React.Component {
  render() {
    const { path, pageContext } = this.props
    const post = this.props.data.mdx
    const siteMetadata = this.props.data.site.siteMetadata
    const postTitle = post.frontmatter.title
    const tags = post.frontmatter.tags

    return (
      <Layout path={path}>
        <SEO
          title={postTitle}
          description={post.frontmatter.description || post.excerpt}
          keywords={tags}
        />
        <Header small />
        <CenteredSection className="bg-primary">
          <h2 className="section-heading">{postTitle}</h2>
          <hr className="primary" />
          <p>
            <span
              title={
                moment(post.frontmatter.raw_date).format(
                  "MMMM DD, YYYY HH:mm"
                ) + " CE(S)T"
              }
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
          <p className={containerStyles.taggedAs}>Tagged as: </p>
          <ul className={containerStyles.tags}>
            {tags.map(t => (
              <li key={t}>
                <Link to={`/blog/tags/${kebabCase(t)}/`}>{"#" + t}</Link>
              </li>
            ))}
          </ul>
        </CenteredSection>
        <Section>
          <div className="col-lg-8 col-lg-offset-2">
            <MDXProvider components={shortcodes}>
              <MDXRenderer>{post.body}</MDXRenderer>
            </MDXProvider>
            <p>
              © {moment(post.frontmatter.raw_date).format("YYYY")}{" "}
              {siteMetadata.author}.{" "}
              <ExternalLink to="https://creativecommons.org/licenses/by-sa/4.0/">
                <img
                  src={bySa}
                  className={containerStyles.bySa}
                  alt="CC-BY-SA"
                />{" "}
                Some Rights Reserved.{" "}
              </ExternalLink>
            </p>
          </div>
          <div className="col-lg-8 col-lg-offset-2">
            <div>Let others know about this article:</div>
            <AddToAny>
              <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
                <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
                <a class="a2a_button_facebook"></a>
                <a class="a2a_button_mastodon"></a>
                <a class="a2a_button_x"></a>
                <a class="a2a_button_threads"></a>
                <a class="a2a_button_reddit"></a>
                <a class="a2a_button_hacker_news"></a>
              </div>
            </AddToAny>
          </div>
        </Section>
        {post.frontmatter.comment_issue_id && (
          <Section>
            <h2 className="section-heading text-center">Comments</h2>
            <hr className="primary" />
            <div className="col-lg-8 col-lg-offset-2">
              <UtterancesComments
                issueNumber={post.frontmatter.comment_issue_id}
              />
            </div>
            <p className="col-lg-8 col-lg-offset-2 small">
              You can also{" "}
              <ExternalLink
                to={`https://github.com/${siteMetadata.gitHubRepository}/issues/${post.frontmatter.comment_issue_id}`}
              >
                leave comments
              </ExternalLink>{" "}
              directly on GitHub, should you not want to authorize the
              utteranc.es API to post on your behalf.
            </p>
          </Section>
        )}
        <CenteredSection>
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <p className={containerStyles.previousPost}>
                {pageContext.previous && (
                  <Link
                    to={`/blog${pageContext.previous.fields.slug}`}
                    rel="prev"
                  >
                    <strong>← Previous post</strong>
                    <br />
                    <span className="small">
                      {pageContext.previous.frontmatter.title}
                    </span>
                  </Link>
                )}
              </p>
            </div>
            <div className="col-sm-6 col-xs-12">
              <p className={containerStyles.nextPost}>
                {pageContext.next && (
                  <Link to={`/blog${pageContext.next.fields.slug}`} rel="next">
                    <strong>Next post →</strong>
                    <br />
                    <span className="small">
                      {pageContext.next.frontmatter.title}
                    </span>
                  </Link>
                )}
              </p>
            </div>
          </div>
        </CenteredSection>
      </Layout>
    )
  }
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        author
        social {
          twitter
        }
        gitHubRepository
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
        comment_issue_id
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`
