import React from "react"
import "./ListGroup.css"

const ListGroup = ({ values, columnSize, icon }) => {
  columnSize = columnSize || 4
  icon = icon || "hand-o-right"

  const listEntries = []
  values.forEach(element => {
    listEntries.push(
      <li key={element} className="list-group-item">
        <i className={"fa fa-" + icon}></i> {element}
      </li>
    )
  })

  return (
    <div className={"col-sm-" + columnSize}>
      <ul className="list-group">{listEntries}</ul>
    </div>
  )
}

export default ListGroup
