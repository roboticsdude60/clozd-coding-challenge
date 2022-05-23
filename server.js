const express = require('express');
const app = express();
const port = 5000;
const db = require('./db');

app.use(express.json());

/**
 * GET /companies
 * Fetches all companies in the database
 */
app.get('/companies', (req, res) => {
	const sql = `
		SELECT * FROM companies;
	`;
	const params = [];

	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({
				error: err.message
			});
			return;
		}
		res.json({
			message: 'success',
			data: rows
		})
	});
});

/**
 * PUT /companies/rename/:companyId
 * renames given company in the database
 */
 app.put('/companies/rename/:companyId', (req, res) => {
	const sql = `
	UPDATE companies
	SET name=?
	WHERE companies.id=?;
	`;
	companyID = req.params.companyId;
	newName = req.body.newName;
	// console.log(req.body);

	const params = [newName, companyID];

	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({
				error: err.message
			});
			return;
		}
		res.json({
			message: 'success',
			data: rows
		})
	});
});

/**
 * GET /companies/:companyId
 * Fetches all the departments of said company from the database
 */
app.get('/companies/:companyId', (req, res) => {
	const sql = `
	SELECT 
		departments.name AS department_name,
		departments.id AS department_id,
		COUNT(*) as employee_count
	FROM departments 
	JOIN employees 
	ON departments.id=employees.department_id
	WHERE departments.company_id=?
	GROUP BY department_id
	ORDER BY departments.name;
 	`;
	companyID = req.params.companyId;
	const params = [companyID];

	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({
				error: err.message
			});
			return;
		}
		res.json({
			message: 'success',
			data: rows
		})
	});

});

/**
 * GET /companies/:companyId/departments/:departmentId
 * Fetches all the employees of said department from the database
 */
 app.get('/companies/:companyId/departments/:departmentId', (req, res) => {
	const sql = `
	SELECT employees.*
	FROM employees 
	JOIN departments
	ON departments.id=employees.department_id
	WHERE department_id=? and departments.company_id=?
 	`;
	departmentId = req.params.departmentId;
	companyId = req.params.companyId;
	const params = [departmentId, companyId];

	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({
				error: err.message
			});
			return;
		}
		res.json({
			message: 'success',
			data: rows
		})
	});

});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});