import React from 'react';
import './Section.css';

const Section = ({ className, colClassName, id, children }) => {
	colClassName = colClassName || "col-lg-12";

	return (
		<section className={className} id={id}>
			<div className="container">
				<div className="row">
					<div className={colClassName}>
						{children}
					</div>
				</div>
			</div>
		</section>
	);
};

export const CenteredSection = ({ className, id, children }) => {
	return (
		<Section className={className} id={id} colClassName="col-lg-8 col-lg-offset-2 text-center">
			{children}
		</Section>
	)
};

export default Section;
