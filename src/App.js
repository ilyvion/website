import React, { Component } from 'react';
import {
	Route,
	BrowserRouter
} from "react-router-dom";
import './App.css';

import * as Constants from './constants';

import ScrollToTop from './components/ScrollToTop';
import Navigation from './components/Navigation';

import { Main, Links } from './components/Pages';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<ScrollToTop>
					<div id="app">
						<Navigation menuItems={[
							{
								id: 'main', url: Constants.PageUrls.Main, name: 'Main', pageNav: [
									{ id: 'about', name: 'About' },
									{ id: 'skills', name: 'Skills' },
									{ id: 'code', name: 'Code' },
									{ id: 'social', name: 'Social' },
									{ id: 'contact', name: 'Contact' }
								]
							},
							{
								id: 'links', url: Constants.PageUrls.Links, name: 'Links', pageNav: [
									{ id: 'webcomics', name: 'Web Comics' }
								]
							}
						]} />
						<div className="content" style={{ height: '100%' }}>
							<Route exact path={Constants.PageUrls.Main} component={Main} />
							<Route exact path={Constants.PageUrls.Links} component={Links} />
						</div>
					</div>
				</ScrollToTop>
			</BrowserRouter>
		);
	}
}

export default App;
