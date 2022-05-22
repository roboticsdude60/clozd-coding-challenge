import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
	const location = useLocation();

	const crumbs = BreadcrumbsFromPath(location.pathname);

	return (
		<div className="breadcrumbs">
			<div className="breadcrumbs_crumb">/</div>
			{crumbs.map(crumb => (
				<div className="breadcrumbs_crumb" key={crumb.name}>
					<Link to={crumb.destination}>{crumb.name}</Link>
					/
				</div>
			))}
		</div>
	);
}

const BreadcrumbsFromPath = (path) => {
	if (path === '/') {
		return [{
			name: 'companies',
			destination: '/companies'
		}];
	}

	let partialPath = '';
	let segments = path.split('/');
	segments.shift();

	return segments.map((segment, i) => {
		partialPath += '/' + segment;

		return {
			name: segment,
			destination: partialPath
		}
	});

}

export default Breadcrumbs;