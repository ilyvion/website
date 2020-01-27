import React from 'react';

import Header from '../Header';
import Section from '../Section';
import PoweredByReact from '../PoweredByReact';

const Links = () => (
	<div style={{ height: '100%' }}>
		<Header className="small" />
		<Section id="webcomics">
			<h2 className="section-heading text-center">Webcomics</h2>
			<hr className="primary" />
			<p><i class="fa fa-star" aria-hidden="true"></i> = highly recommended</p>
			<h3><abbr title="Safe For Work">SFW</abbr></h3>
			<ul>
				<li><a href="https://questionablecontent.net/">Questionable Content</a> <i class="fa fa-star" aria-hidden="true"></i></li>
				<li><a href="https://grrlpowercomic.com/">Grrl Power</a> <i class="fa fa-star" aria-hidden="true"></i></li>
				<li><a href="http://www.dumbingofage.com/">Dumbing of Age</a> <i class="fa fa-star" aria-hidden="true"></i></li>
				<li><a href="https://flakypastry.runningwithpencils.com/">Flaky Pastry</a></li>
				<li><a href="https://lawcomic.net/">The Illustrated Guide to Law</a></li>
				<li><a href="https://ohumanstar.com/">O Human Star</a></li>
				<li><a href="http://girlgeniusonline.com/">Girl Genius</a></li>
				<li><a href="https://smbc-comics.com/">SMBC: Saturday Morning Breakfast Cereal</a></li>
				<li><a href="https://theoatmeal.com/">The Oatmeal</a></li>
			</ul>
			<h3><abbr title="Not Safe For Work">NSFW</abbr></h3>
			<ul>
				<li><a href="http://www.buttsmithy.com/">Alfie</a> <i class="fa fa-star" aria-hidden="true"></i></li>
				<li><a href="http://oglaf.com/">Oglaf</a></li>
				<li><a href="http://www.ohjoysextoy.com/">Oh Joy Sex Toy</a></li>
				<li><a href="http://www.therockcocks.com/">The Rock Cocks</a></li>
			</ul>
		</Section>
		<PoweredByReact />
	</div>
);

export default Links;
