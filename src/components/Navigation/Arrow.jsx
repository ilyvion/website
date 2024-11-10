import React, { Component } from "react"

export default class Arrow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrowCalculationInProgress: false,
      arrowPosition: null,
    }
  }

  componentDidMount() {
    if (document.readyState === "complete") {
      this.onRouteChanged()
    } else {
      window.addEventListener("load", () => this.onRouteChanged())
    }
  }

  onRouteChanged() {
    this.setState(
      { arrowCalculationInProgress: true, arrowPosition: null },
      () => {
        this.setState({
          arrowCalculationInProgress: false,
          arrowPosition: this.calculateArrowPosition(),
        })
      },
    )
  }

  calculateArrowPosition() {
    const activePage = document.querySelector(".site-navbar .active")
    if (!activePage) {
      console.warn(
        "The current page is missing from the navigation; cannot calculate arrow position",
      )
      return
    }
    const activePageRect = activePage.getBoundingClientRect()
    const activePageLinkPos = activePageRect.x + activePageRect.width / 2

    const pageNavBar = document.querySelector(".page-navbar")
    const pageNavBarRect = pageNavBar.getBoundingClientRect()
    const arrowOffsetBasePos = pageNavBarRect.x
    const arrowOffset = Math.floor(activePageLinkPos - arrowOffsetBasePos)

    return arrowOffset
  }

  render() {
    const { arrowPosition } = this.state

    let arrowElement = null
    if (arrowPosition) {
      arrowElement = (
        <div className="arrow" style={{ left: arrowPosition }}></div>
      )
    } else {
      arrowElement = <></>
    }

    return arrowElement
  }
}
