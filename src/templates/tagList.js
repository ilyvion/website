import React from "react"
import { graphql, Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

import Layout from "@components/layout"
import SEO from "@components/seo"
import Header from "@components/Header"
import Section, { CenteredSection } from "@components/Section"

import containerStyles from "./tagList.module.css"

const TagList = ({ path, data, pageContext }) => {
  let tags = data.tags.group

  tags = (
    <ul className={containerStyles.tags}>
      {tags.map(tag => (
        <li key={tag.fieldValue}>
          <Link to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}>
            #{tag.fieldValue} ({tag.totalCount})
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <Layout path={path}>
      <SEO
        title="Tags"
        description="List of all the tags used in my blog posts"
      />
      <Header small />
      <CenteredSection className="bg-primary">
        <h2 className="section-heading text-center">Tags</h2>
        <hr className="primary" />
      </CenteredSection>
      <Section>{tags}</Section>
    </Layout>
  )
}

export default TagList

export const query = graphql`
  query tagListQuery {
    tags: allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
