import React from "react"
import { Link } from "gatsby"

import ExternalLink from "@components/externalLink"

const MarkdownLink = ({ href, children, ...props }) => {
  if (href.indexOf("http") === 0) {
    return (
      <ExternalLink to={href} {...props}>
        {children}
      </ExternalLink>
    )
  } else if (href.indexOf("#") === 0) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  } else {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    )
  }
}

export default MarkdownLink
