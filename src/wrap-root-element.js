import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"

import ExternalLink from "./components/externalLink"
import Ruby from "./components/ruby"
import MarkdownLink from "@components/markdownLink"
import Measurement from "@components/measurementConversion"
import Walk from "@components/walk"
import Juxtapose from "@components/juxtapose"

const components = {
  ExternalLink,
  Link,
  Ruby,
  Measurement,
  Walk,
  Juxtapose,
  a: MarkdownLink,
}
export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
