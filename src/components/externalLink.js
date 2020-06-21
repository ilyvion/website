import React from "react"

const ExternalLink = ({ to, children, ...props }) => (
  <a href={to} {...props}>
    {children} <i className="fa fa-external-link" aria-hidden="true"></i>
  </a>
)

export default ExternalLink
