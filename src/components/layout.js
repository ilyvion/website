import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import "./layout.css"

import Navigation from "@components/Navigation"

// `window` only exists in the browser and Juxtapose requires it, so we only import it there.
if (typeof window !== `undefined`) {
  /* eslint-disable no-unused-expressions */
  import("juxtaposejs/build/js/juxtapose")
  import("juxtaposejs/build/css/juxtapose.css")
  /* eslint-enable */
}

export default function Layout({ path, children }) {
  const data = useStaticQuery(graphql`
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
  `)
  return (
    <div style={{ height: "100%" }}>
      <Navigation path={path} menuItems={data.site.siteMetadata.menuLinks} />
      {children}
    </div>
  )
}
