import React, { Component } from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import * as Constants from '../../constants';

import Progress from '../Progress'

import './Navigation.css';

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			atTop: true,
			navigationExpanded: false,
			activePageNavigationItem: null,
			arrowCalculationInProgress: false,
			arrowPosition: null
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.onRouteChanged();
		}
	}

	componentDidMount() {
		window.addEventListener('scroll', (e) => this.handleScroll(e));
		window.addEventListener('load', () => this.onRouteChanged());
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', (e) => this.handleScroll(e));
	}

	onRouteChanged() {
		this.setState({ arrowCalculationInProgress: true, arrowPosition: null }, () => {
			this.setState({
				arrowCalculationInProgress: false,
				arrowPosition: this.calculateArrowPosition()
			});
		});
	}

	calculateArrowPosition() {
		const activePage = document.querySelector(".site-navbar .active");
		const activePageRect = activePage.getBoundingClientRect();
		const activePageLinkPos = activePageRect.x + activePageRect.width / 2;

		const pageNavBar = document.querySelector(".page-navbar");
		const pageNavBarRect = pageNavBar.getBoundingClientRect();
		const arrowOffsetBasePos = pageNavBarRect.x;
		const arrowOffset = Math.floor(activePageLinkPos - arrowOffsetBasePos);

		return arrowOffset;
	}

	handleScroll(event) {
		const { menuItems, location } = this.props;

		const scrollTop = document.scrollingElement.scrollTop;

		const navNode = document.getElementById("mainNavbar");
		const navNodeHeight = navNode.offsetHeight;

		let activePageNavigationItem = null;
		menuItems.forEach(element => {
			if (element.url === location.pathname && element.pageNav) {
				element.pageNav.forEach(pn => {
					let node = document.getElementById(pn.id);
					if (!node) {
						return;
					}
					let nodeTop = node.offsetTop;

					if (nodeTop <= scrollTop + navNodeHeight + 1) {
						activePageNavigationItem = pn.id;
					}
				});
			}
		});
		this.setState({
			atTop: scrollTop === 0,
			activePageNavigationItem
		});
	}

	scrollTo(id, scrollOffset, callback) {
		var settings = {
			duration: 1000,
			easing: {
				outQuint: function (x, t, b, c, d) {
					return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
				}
			}
		};
		var percentage;
		var startTime;
		var node = document.getElementById(id);
		var nodeTop = node.offsetTop;
		var nodeHeight = node.offsetHeight;
		var body = document.body;
		var html = document.documentElement;
		var height = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);
		var windowHeight = window.innerHeight
		var offset = window.pageYOffset;
		var delta = nodeTop - offset;
		var bottomScrollableY = height - windowHeight;
		var targetY = ((bottomScrollableY < delta) ?
			bottomScrollableY - (height - nodeTop - nodeHeight + offset) :
			delta) + scrollOffset;

		startTime = Date.now();
		percentage = 0;

		if (this.timer) {
			clearInterval(this.timer);
		}

		const self = this;
		function step() {
			var yScroll;
			var elapsed = Date.now() - startTime;

			if (elapsed > settings.duration) {
				clearTimeout(self.timer);
			}

			percentage = elapsed / settings.duration;

			if (percentage > 1) {
				clearTimeout(self.timer);

				if (callback) {
					callback();
				}
			} else {
				yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
				window.scrollTo(0, yScroll);
				self.timer = setTimeout(step, 10);
			}
		}

		this.timer = setTimeout(step, 10);
	}

	clickSiteNavigation(event) {
		this.setState({
			navigationExpanded: false
		});
	}

	clickPageNavigation(event, id, callback) {
		event.preventDefault();

		this.setState({
			navigationExpanded: false
		});

		const navNode = document.getElementById("mainNavbar");
		const navNodeHeight = navNode.offsetHeight;

		this.scrollTo(id, -navNodeHeight, callback);
	}

	toggleMobileNavigation() {
		this.setState((prevState, props) => ({
			navigationExpanded: !prevState.navigationExpanded
		}));
	}

	render() {
		const {
			atTop,
			navigationExpanded,
			activePageNavigationItem,
			arrowPosition
		} = this.state;
		const { menuItems, location } = this.props;

		const menuEntries = [];
		const pageMenuEntries = [];
		menuItems.forEach(element => {
			menuEntries.push(
				<li key={element.id}>
					<NavLink exact to={element.url} onClick={(e) => this.clickSiteNavigation(e)}>{element.name}</NavLink>
				</li>
			);
			if (element.url === location.pathname) {
				if (element.pageNav && element.pageNav.length) {
					pageMenuEntries.push(
						<li key="page-top">
							<a onClick={(e) => this.clickPageNavigation(e, "page-top")} href="#page-top">Top</a>
						</li>
					);
					element.pageNav.forEach(pn => {
						const active = activePageNavigationItem === pn.id
						pageMenuEntries.push(
							<li key={pn.id} className={active ? "active" : ""}>
								<a onClick={(e) => this.clickPageNavigation(e, pn.id)} href={"#" + pn.id}>{pn.name}</a>
							</li>
						)
					});
				}
			}
		});

		let arrowElement = null;
		if (arrowPosition) {
			arrowElement = <div className="arrow" style={{ left: arrowPosition }}></div>;
		}

		// Kludge to get transparent page navigation on main page
		let pageNavbarExtra = "";
		if (location.pathname === Constants.PageUrls.Main) {
			pageNavbarExtra = " main-page";
		}

		return (
			<nav id="mainNav" className={"navbar navbar-default navbar-fixed-top " + (atTop ? "affix-top" : "affix")}>
				<div className="container-fluid">
					<div id="mainNavbar" className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" onClick={() => this.toggleMobileNavigation()}>
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<NavLink exact to="/" onClick={(e) => this.clickSiteNavigation(e)} className="navbar-brand page-scroll">Alexander Krivács Schrøder</NavLink>
					</div>
					<div className={"site-navbar collapse navbar-collapse" + (navigationExpanded ? " in" : "")}>
						<ul className="nav navbar-nav navbar-right">
							{menuEntries}
						</ul>
					</div>
					<div className={"page-navbar collapse navbar-collapse" + (navigationExpanded ? " in" : "") + pageNavbarExtra}>
						{arrowElement}
						<ul className="nav navbar-nav">
							{pageMenuEntries}
						</ul>
					</div>
				</div>
				<Progress />
			</nav>
		);
	}
}

export default withRouter(Navigation);
