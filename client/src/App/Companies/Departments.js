import React, { useEffect, useState, Fragment} from 'react';
import { useNavigate, useParams, Outlet, Link} from 'react-router-dom';
import './Companies.css';

const TableRow = ({
	className,
	onClick,
	elements
}) => (
	<div className={className} onClick={onClick}>
		{elements.map((e, i) => <div key={i + 1} className="departments_row-cell">{e}</div>)}
	</div>
);

const Departments = () => {
	const [departments, setDepartments] = useState([]);
	let { companyId, departmentId} = useParams();
	let navigate = useNavigate();


	// fetch the departments data from the backend
	useEffect(() => {
		async function getDepartments() {
			const response = await fetch('/companies/' + companyId);
			const { message, data } = await response.json();
			if (message === 'success') {
				console.log(data);
				setDepartments(data);
			}
		}
		getDepartments();
	}, [companyId]);

	let filterFun = ({department_id}, i) => {
		if (departmentId) {
			return department_id == departmentId;
		} else {
			return true;
		}
	};

	return (
		<Fragment >
		<div className="departments">
			<Link to={'/companies/' + companyId}>
				<TableRow className="departments_header" key={'a'}
					elements={['Departments', 'Department ID', 'Number of Employees']} />
			</Link>
			{departments.filter(filterFun).map(({department_name, department_id, employee_count}) => (
					<TableRow
						key={department_id}
						className="departments_row"
						onClick={() => 
							navigate('/companies/' + companyId + "/departments/" + department_id)
						}
						elements={[department_name, department_id, employee_count]}
					/>
			))}
		</div>
		<Outlet />
		</Fragment>
	);
};

export default Departments;
