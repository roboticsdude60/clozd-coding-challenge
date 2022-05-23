import React, { Fragment, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import './Companies.css';

const TableRow = ({
	className,
	onClick,
	name,
	segment,
	region,
	industry,
}) => (
	<div className={className} onClick={onClick}>
		<div className="companies_row-cell">{name}</div>
		<div className="companies_row-cell">{segment}</div>
		<div className="companies_row-cell">{region}</div>
		<div className="companies_row-cell">{industry}</div>
	</div>
);

const Companies = () => {
	const [companies, setCompanies] = useState([]);
	let navigate = useNavigate();
	let { companyId } = useParams();

	// fetch the company data from the backend
	useEffect(() => {
		async function getCompanies() {
			const response = await fetch('/companies');
			const { message, data } = await response.json();
			if (message === 'success') {
				setCompanies(data);
			}
		}
		getCompanies();
	}, []);

	let filterFun = ({id}, i) => {
		if (companyId) {
			return id == companyId;
		} else {
			return true;
		}
	};

	return (
		<Fragment >
		<div className="companies">
			<Link to={'/companies'} >
				<TableRow 
					className="companies_header"
					name="Companies"
					segment="Segment"
					region="Region"
					industry="Industry" />
			</Link>
			{companies.filter(filterFun).map(company => (
				<TableRow
					key={company.id}
					className="companies_row"
					onClick={() => 
						navigate('/companies/' + company.id)
					}
					{...company}
				/>
			))}
		</div>
		<Outlet />
		</Fragment>
	);
}

export default Companies;
