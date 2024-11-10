import React from "react"
import PropTypes from "prop-types"

import "./ListGroup.module.css"

const ListGroup = ({ values, columnSize, icon }) => {
  if (!values || values.length === 0) {
    console.error("ListGroup requires values")
    return null
  }
  columnSize = columnSize || 4
  icon = icon || "hand-o-right"

  const listEntries = []
  values.forEach(element => {
    listEntries.push(
      <li key={element} className="list-group-item">
        <i className={"fa fa-" + icon}></i> {element}
      </li>,
    )
  })

  return (
    <div className={"col-sm-" + columnSize}>
      <ul className="list-group">{listEntries}</ul>
    </div>
  )
}

ListGroup.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  columnSize: PropTypes.number,
  icon: PropTypes.string,
}

export default ListGroup
