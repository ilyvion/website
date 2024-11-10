import React from "react"
import { useStaticQuery, graphql } from "gatsby"
// Wrap the require in check for window
if (typeof window !== `undefined`) {
  import("juxtaposejs/build/js/juxtapose")
  import("juxtaposejs/build/css/juxtapose.css")
}

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
