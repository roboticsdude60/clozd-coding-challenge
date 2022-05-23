import React, { Fragment, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import './Companies.css';

const TableRow = ({
	className,
	onClick,
	elements
}) => (
	<div className={className} onClick={onClick}>
		{elements.map((e, i) => <div key={i + 1} className='row-cell'>{e}</div>)}
	</div>
);

const Companies = () => {
	const [companies, setCompanies] = useState([]);
	let navigate = useNavigate();
	let { companyId } = useParams();

	// fetch the company data from the backend
	useEffect(() => {
		getCompanies(setCompanies);
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
		<div className='companies'>
			<Link to={'/companies'} >
				<TableRow 
					className='table_header'
					elements={['Companies', 'Segment', 'Region', 'Industry']} />
			</Link>
			{companies.filter(filterFun).map(company => (
				<TableRow
					key={company.id}
					className='table_row'
					onClick={() => 
						navigate('/companies/' + company.id)
					}
					elements={[
						<span><button onClick={(event) => {
							event.stopPropagation();
							editCompanyName(company, setCompanies);
						}}>✏️</button> {company.name}</span>, 
						company.segment, 
						company.region, 
						company.industry
					]}
				/>
			))}
		</div>
		<Outlet />
		</Fragment>
	);
};


async function editCompanyName (company, setCompanies) {
	//Get the desired new name from the user
	let newName = prompt('Renaming ' + company.name + '', company.name);
	if (newName != null) {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({newName: newName})
		};
		const response = fetch('/companies/rename/' + company.id, requestOptions);
		response.then(data => {
			//successfully updated on the server, let's pull those changes here
			getCompanies(setCompanies);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
};

async function getCompanies(setCompanies) {
	const response = await fetch('/companies');
	const { message, data } = await response.json();
	if (message === 'success') {
		setCompanies(data);
	}
};


export default Companies;
