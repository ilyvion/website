import React from 'react';

import { CenteredSection } from '../Section';
import IconLink from '../IconLink';

const PoweredByReact = () => (
	<CenteredSection>
		<hr className="primary" />
		<IconLink columnSize={12} color="black" href="https://reactjs.org/" icon="react" text="Powered by React" />
	</CenteredSection>
);

export default PoweredByReact;
