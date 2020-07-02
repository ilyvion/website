import React, { Component } from "react"
import { Link } from "gatsby"

import Progress from "@components/Progress"

import Arrow from "./Arrow"
import "./Navigation.css"

const NavbarTitle = React.forwardRef(({ title, toggleNavigationAction, clickTitleAction }, ref) => (
  <div id="mainNavbar" className="navbar-header" ref={ref}>
    <button
      type="button"
      className="navbar-toggle collapsed"
      onClick={toggleNavigationAction}
    >
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
    </button>
    <Link
      to="/"
      onClick={clickTitleAction}
      className="navbar-brand page-scroll"
    >
      {title}
    </Link>
  </div>
))
NavbarTitle.displayName = "NavbarTitle"

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      atTop: true,
      navigationExpanded: false,
      activePageNavigationItem: null,
    }
    this.mainNavbarRef = React.createRef()
  }

  componentDidMount() {
    window.addEventListener("scroll", e => this.handleScroll(e), {
      passive: true,
    })
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", e => this.handleScroll(e))
  }

  handleScroll(event) {
    const { menuItems, path } = this.props

    const scrollTop = document.scrollingElement.scrollTop

    const navNode = this.mainNavbarRef.current
    if (!navNode) {
      return
    }
    const navNodeHeight = navNode.offsetHeight

    let activePageNavigationItem = null
    menuItems.forEach(menuItem => {
      if (menuItem.link === path && menuItem.pageNavs) {
        menuItem.pageNavs.forEach(pn => {
          let node = document.getElementById(pn.id)
          if (!node) {
            return
          }
          let nodeTop = node.offsetTop

          if (nodeTop <= scrollTop + navNodeHeight + 1) {
            activePageNavigationItem = pn.id
          }
        })
      }
    })
    this.setState({
      atTop: scrollTop === 0,
      activePageNavigationItem,
    })
  }

  scrollTo(id, scrollOffset, callback) {
    var settings = {
      duration: 1000,
      easing: {
        outQuint: function (x, t, b, c, d) {
          return c * ((t = t / d - 1) * t * t * t * t + 1) + b
        },
      },
    }
    var percentage
    var startTime
    var node = document.getElementById(id)
    if (!node) {
      console.error(`Node #${id} doesn't exist in page`)
      return
    }
    var nodeTop = node.offsetTop
    var nodeHeight = node.offsetHeight
    var body = document.body
    var html = document.documentElement
    var height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    var windowHeight = window.innerHeight
    var offset = window.pageYOffset
    var delta = nodeTop - offset
    var bottomScrollableY = height - windowHeight
    var targetY =
      (bottomScrollableY < delta
        ? bottomScrollableY - (height - nodeTop - nodeHeight + offset)
        : delta) + scrollOffset

    startTime = Date.now()
    percentage = 0

    if (this.timer) {
      clearInterval(this.timer)
    }

    const self = this
    function step() {
      var yScroll
      var elapsed = Date.now() - startTime

      if (elapsed > settings.duration) {
        clearTimeout(self.timer)
      }

      percentage = elapsed / settings.duration

      if (percentage > 1) {
        clearTimeout(self.timer)

        if (callback) {
          callback()
        }
      } else {
        yScroll = settings.easing.outQuint(
          0,
          elapsed,
          offset,
          targetY,
          settings.duration
        )
        window.scrollTo(0, yScroll)
        self.timer = setTimeout(step, 10)
      }
    }

    this.timer = setTimeout(step, 10)
  }

  clickSiteNavigation(event) {
    this.setState({
      navigationExpanded: false,
    })
  }

  clickPageNavigation(event, id, callback) {
    event.preventDefault()

    this.setState({
      navigationExpanded: false,
    })

    const navNode = this.mainNavbarRef.current
    const navNodeHeight = navNode.offsetHeight

    this.scrollTo(id, -navNodeHeight, callback)
  }

  toggleMobileNavigation() {
    this.setState((prevState, props) => ({
      navigationExpanded: !prevState.navigationExpanded,
    }))
  }

  render() {
    const { atTop, navigationExpanded, activePageNavigationItem } = this.state
    const { menuItems, path } = this.props

    const menuEntries = []
    const pageMenuEntries = []
    menuItems.forEach(menuItem => {
      menuEntries.push(
        <li key={menuItem.id}>
          <Link
            activeClassName="active"
            to={menuItem.link}
            onClick={e => this.clickSiteNavigation(e)}
          >
            {menuItem.name}
          </Link>
        </li>
      )
      if (menuItem.link === path) {
        if (menuItem.pageNavs && menuItem.pageNavs.length) {
          pageMenuEntries.push(
            <li key="page-top">
              <a
                onClick={e => this.clickPageNavigation(e, "page-top")}
                href="#page-top"
              >
                Top
              </a>
            </li>
          )
          menuItem.pageNavs.forEach(pageNav => {
            const active = activePageNavigationItem === pageNav.id
            pageMenuEntries.push(
              <li key={pageNav.id} className={active ? "active" : ""}>
                <a
                  onClick={e => this.clickPageNavigation(e, pageNav.id)}
                  href={"#" + pageNav.id}
                >
                  {pageNav.name}
                </a>
              </li>
            )
          })
        }
      }
    })
    menuEntries.push(
      <li key="blog">
        <Link to="/blog/" activeClassName="active" partiallyActive={true}>
          Blog
        </Link>
      </li>
    )

    // Kludge to get transparent page navigation on main page
    let pageNavbarExtra = ""
    if (path === "/") {
      pageNavbarExtra = " main-page"
    }

    return (
      <nav
        id="mainNav"
        className={
          "navbar navbar-default navbar-fixed-top " +
          (atTop ? "affix-top" : "affix")
        }
      >
        <div className="container-fluid">
          <NavbarTitle
		    ref={this.mainNavbarRef}
            title="Alexander Krivács Schrøder"
			toggleNavigationAction={() => this.toggleMobileNavigation()}
			clickTitleAction={e => this.clickSiteNavigation(e)}
          />

          <div
            className={
              "site-navbar collapse navbar-collapse" +
              (navigationExpanded ? " in" : "")
            }
          >
            <ul className="nav navbar-nav navbar-right">{menuEntries}</ul>
          </div>
          <div
            className={
              "page-navbar collapse navbar-collapse" +
              (navigationExpanded ? " in" : "") +
              pageNavbarExtra
            }
          >
            <Arrow />
            <ul className="nav navbar-nav">{pageMenuEntries}</ul>
          </div>
        </div>
        <Progress />
      </nav>
    )
  }
}

export default Navigation
