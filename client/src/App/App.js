import React from 'react';
import {
	Routes,
	Route,
} from 'react-router-dom';
import PageContainer from './PageContainer/PageContainer.js';
import Companies from './Companies/Companies.js';
import Departments from './Companies/Departments.js';
import Employees from './Companies/Employees.js';

const App = () => {
	return (
			<Routes>
				<Route path='/' element={<PageContainer />}>
					<Route index element={<Companies />} />
					<Route path='companies'  element={<Companies />}>
						<Route path=':companyId' element={<Departments />}>
							<Route path='departments' >
								<Route path=':departmentId' element={<Employees />} />
							</Route>
						</Route>
					</Route>
				</Route>
			</Routes>
	);
}

export default App;

