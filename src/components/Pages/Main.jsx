import React from 'react';

import * as Constants from '../../constants';

import Header from '../Header';
import Section, { CenteredSection } from '../Section';
import ListGroup from '../ListGroup';
import IconLink from '../IconLink';
import PoweredByReact from '../PoweredByReact';

const Main = () => {

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	
	const programmingFor = currentYear - Constants.StartingProgrammingYear;
	const professionallyFor = currentYear - Constants.StartingProgrammingProfessionallyYear;

	return (
		<div style={{height: '100%'}}>
			<Header header="Hello, I'm Alex!" tagline="Software Developer" />
			<CenteredSection className="bg-primary" id="about">
				<h2 className="section-heading">About Me</h2>
				<hr className="light" />
				<p>
					Software development has been my passion since I was around 9 years old,
					and I have since learned a large body of languages and technologies.
					My main goal is to become as good a software developer as I can,
					in order to produce high-quality reliable software as quickly as possible.
					As of {currentYear}, I have been programming for {programmingFor} years;
					{professionallyFor} years professionally.
				</p>
				<p>
					I'm highly passionate about software development, and I do my best to use good
					coding practices and the best and most modern technologies available. I consider
					myself competent in desktop software development, as well as back-end and front-end
					(i.e. full-stack) web development.
				</p>
				<p>
					Academically, I have a bachelor of computer science from <a className="white underline" target="_blank" rel="noopener noreferrer" href="http://www.uio.no/">the University of Oslo</a>.
				</p>
				<blockquote>
					<p>Science is what we understand well enough to explain to a computer. Art is everything else we do.</p>
					<footer className="text-faded">Donald Knuth</footer>
				</blockquote>
			</CenteredSection>
			<Section id="skills">
				<h2 className="section-heading text-center">Skills</h2>
				<hr className="primary" /><br />
				<div className="row">
					<ListGroup columnSize={6} values={[
						'C#',
						'.NET Framework/Core',
						'ASP.NET Framework/Core',
						'ASP.NET MVC',
						'Episerver CMS',
						'LINQ',
						'Entity Framework',
						'WCF',
						'WPF',
						'VB.NET',
						'Silverlight'
					]} />
					<ListGroup columnSize={6} values={[
						'Javascript',
						'HTML5',
						'CSS3',
						'GraphQL',
						'React',
						'AngularJS / Angular',
						'jQuery',
						'Bootstrap',
						'Semantic UI',
						'Gulp',
						'Grunt',
						'Webpack'
					]} />
				</div>
				<div className="row">
					<ListGroup values={[
						'Java',
						'Node.js',
						'C',
						'PHP',
						'Python',
						'MSIL',
						'Vala'
					]} />
					<ListGroup values={[
						'Git',
						'Mercurial',
						'Subversion',
						'Team Foundation Server',
						'Visual Studio',
						'Powershell'
					]} />
					<ListGroup values={[
						'SQL',
						'MySQL',
						'PostgreSQL',
						'Visual Studio',
						'Maven',
						'Travis CI',
						'LaTeX'
					]} />
				</div>
			</Section>
			<CenteredSection id="code" className="bg-primary">
				<h2 className="section-heading">Code</h2>
				<hr className="light" /><br />
				<IconLink color="white" href="https://github.com/alexschrod" icon="github" text="Github" />
				<IconLink color="white" href="https://stackoverflow.com/users/161250/alex" icon="stack-overflow" text="Stack Overflow" />
				<IconLink color="white" href="https://bitbucket.org/alexschrod" icon="bitbucket" text="Bitbucket" />
			</CenteredSection>
			<CenteredSection id="social" className="bg-secondary">
				<h2 className="section-heading">Social</h2>
				<hr className="light" /><br />
				<IconLink color="white" href="https://www.linkedin.com/in/alexanderschroder/" icon="linkedin" text="LinkedIn" />
				<IconLink color="white" href="https://www.facebook.com/alexander.schroder" icon="facebook" text="Facebook" />
				<IconLink color="white" href="https://twitter.com/alexschrod" icon="twitter" text="Twitter" />
			</CenteredSection>
			<CenteredSection id="contact">
				<h2 className="section-heading">Contact</h2>
				<hr className="primary" />
				<IconLink color="black" href="mailto:alexschrod@gmail.com" icon="envelope" text="alexschrod@gmail.com" />
				<IconLink color="black" href="/alexschrod.asc" icon="key-modern" text="PGP Key" />
				<IconLink color="black" href="https://keybase.io/alexschrod" icon="keybase" text="Keybase" />
			</CenteredSection>
			<PoweredByReact />
		</div>
	);
};

export default Main;
