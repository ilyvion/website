import React, { Component } from 'react';
import './Navigation.css';

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			atTop: true,
			navigationExpanded: false,
			activeNavigationItem: null
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', (e) => this.handleScroll(e));
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', (e) => this.handleScroll(e));
	}

	handleScroll(event) {
		const { menuItems } = this.props;

		const scrollTop = document.scrollingElement.scrollTop;
		
		const navNode = document.getElementById("mainNavbar");
		const navNodeHeight = navNode.offsetHeight;

		let activeNavigationItem = null;
		menuItems.forEach(element => {
			let node = document.getElementById(element.id);
			let nodeTop = node.offsetTop;

			if (nodeTop <= scrollTop + navNodeHeight + 1) {
				activeNavigationItem = element.id;
			}
		});
		this.setState({
			atTop: scrollTop === 0,
			activeNavigationItem
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

		function step() {
			var yScroll;
			var elapsed = Date.now() - startTime;

			if (elapsed > settings.duration) {
				clearTimeout(this.timer);
			}

			percentage = elapsed / settings.duration;

			if (percentage > 1) {
				clearTimeout(this.timer);

				if (callback) {
					callback();
				}
			} else {
				yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
				window.scrollTo(0, yScroll);
				this.timer = setTimeout(step, 10);
			}
		}

		this.timer = setTimeout(step, 10);
	}

	clickNavigation(event, id, callback) {
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
			activeNavigationItem
		} = this.state;
		const { menuItems } = this.props;

		const menuEntries = [];
		menuItems.forEach(element => {
			const active = activeNavigationItem === element.id
			menuEntries.push(
				<li key={element.id} className={active ? "active" : ""}>
					<a onClick={(e) => this.clickNavigation(e, element.id)} href={"#" + element.id}>{element.name}</a>
				</li>
			);
		});

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
						<a onClick={(e) => this.clickNavigation(e, "page-top")} className="navbar-brand page-scroll" href="#page-top">Alexander Krivács Schrøder</a>
					</div>
					<div className={"collapse navbar-collapse " + (navigationExpanded ? "in" : "")}>
						<ul className="nav navbar-nav navbar-right">
							{menuEntries}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navigation;
