import React from "react"
import PropTypes from "prop-types"
import containerStyles from "./IconLink.module.css"

const IconLink = ({ color, href, icon, text, columnSize, rel }) => {
  columnSize = columnSize || 4

  return (
    <a className={`${containerStyles.iconLink} ${color}`} href={href} rel={rel}>
      <div className={"col-sm-" + columnSize}>
        <i className={"fa fa-" + icon + " fa-5x"}></i>
        <p>{text}</p>
      </div>
    </a>
  )
}

IconLink.propTypes = {
  color: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  rel: PropTypes.string,
  columnSize: PropTypes.number,
}

export default IconLink
