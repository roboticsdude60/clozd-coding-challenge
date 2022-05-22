import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
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

const CompanyDetail = () => {
	const [companies, setCompanies] = useState([]);
	let navigate = useNavigate();

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

	return (
		<h1>Testing</h1>
	);
}

export default CompanyDetail;
