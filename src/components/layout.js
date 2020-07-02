import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import "./layout.css"

import Navigation from "@components/Navigation"

export default function Layout({ path, children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
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
  return (
      <div style={{ height: "100%" }}>
        <Navigation path={path} menuItems={data.site.siteMetadata.menuLinks} />
        {children}
      </div>
  )
}
