import React, { useEffect, useState, Fragment} from 'react';
import { useParams, Outlet} from 'react-router-dom';
import './Companies.css';

const TableRow = ({
	className,
	onClick,
	image,
	elements
}) => (
	<div className={className} onClick={onClick}>
		{image ? <div className='row-cell'><img alt='employee avatar' height={50} src={image.split('?')[0]} /></div>: ''}
		{elements.map(e => <div key={e} className="row-cell">{e}</div>)}
	</div>
);

const Departments = () => {
	const [employees, setEmployees] = useState([]);
	let { departmentId, companyId} = useParams();


	// fetch the departments data from the backend
	useEffect(() => {
		async function getEmployees() {
			const response = await fetch('/companies/' + companyId + '/departments/' + departmentId);
			const { message, data } = await response.json();
			if (message === 'success') {
				setEmployees(data);
			}
		}
		getEmployees();
	}, [departmentId, companyId]);


	return (
		<Fragment >
		<div className="departments">
			<TableRow
				className="table_header"
				key={'a'}
				elements={['Employees', 'Name', 'Title', 'Country']}
			/>
			{employees.map(({avatar, name, title, country, id}) => (
				<TableRow
					key={id}
					className="table_row"
					image={avatar}
					elements={[name, title, country]}
				/>
			))}
		</div>
		<Outlet />
		</Fragment>
	);
};

export default Departments;
