import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"

import ExternalLink from "./components/externalLink"

const components = {
  Link,
  ExternalLink,
}
export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
