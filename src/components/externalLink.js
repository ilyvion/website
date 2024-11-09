import React from "react"

const ExternalLink = ({ to, children, ...props }) => (
  <a href={to} style={{ whiteSpace: "nowrap" }} {...props}>
    {children}&nbsp;<i className="fa fa-external-link" aria-hidden="true"></i>
  </a>
)

export default ExternalLink
