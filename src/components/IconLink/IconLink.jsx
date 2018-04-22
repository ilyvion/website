import React from 'react';
import './IconLink.css';

const IconLink = ({ color, href, icon, text, columnSize }) => {

	columnSize = columnSize || 4;

	return (
		<a className={"icon-link " + color} href={href}>
			<div className={"col-sm-" + columnSize}><i className={"fa fa-" + icon + " fa-5x"}></i><p>{text}</p></div>
		</a>
	);
};

export default IconLink;
