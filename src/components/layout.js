import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import "./layout.css"

import Navigation from "./Navigation"

export default function Layout({ pageTitle, path, children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            menuLinks {
              id
              link
              name
              pageNavs {
                id
                name
              }
            }
          }
        }
      }
    `
  )
  let title
  if (pageTitle) {
    title = `${pageTitle} | ${data.site.siteMetadata.title}`
  } else {
    title = data.site.siteMetadata.title
  }
  return (
    <>
      <Helmet title={title} />
      <div style={{ height: "100%" }}>
        <Navigation path={path} menuItems={data.site.siteMetadata.menuLinks} />
        {children}
      </div>
    </>
  )
}
