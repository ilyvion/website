import React from 'react';
import './Header.css';
import portrait from './portrait.jpg';

const Header = ({ className, header, tagline }) => {
	return (
		<header className={className}>
			<div className="header-content">
				<div className="header-content-inner">
					<img className="img-circle img-responsive" src={portrait} alt="" />
					<h1>{header}</h1>
					<hr className="blue" />
					<span className="btn-blue">{tagline}</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
