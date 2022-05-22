import React from 'react';
import {
	Routes,
	Route,
} from 'react-router-dom';
import PageContainer from './PageContainer/PageContainer.js';
import Companies from './Companies/Companies.js';
import CompanyDetail from './Companies/CompanyDetail.js'

const App = () => {
	return (
			<Routes>
				<Route path="/" element={<PageContainer />}>
					<Route index element={<Companies />} />
					<Route path="companies"  >
						<Route index element={<Companies />} />
						<Route path=":companyId" element={<CompanyDetail />} />
					</Route>
				</Route>
			</Routes>
	);
}

export default App;
