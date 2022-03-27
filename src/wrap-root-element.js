import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"

import ExternalLink from "./components/externalLink"
import Ruby from "./components/ruby"

const components = {
  Link,
  ExternalLink,
  Ruby,
}
export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
