# Coding Challenge 1
## Scenario
You are developing an application that will show company and employee details. You have all the data you need, but the data still needs to be retrieved and displayed for your users. 

Your users will want to see some very particular things, but other than those particular things, you will have liberty to add whatever you see fit.

## Already Built
[x] A table of all companies available at route `/` or `/companies`

## Requirements
[] Build a view of a single company at the route `/companies/:companyId`.
	[] View should show the metadata fields for the company (Segment, Region, and Industry).
	[] View should show each department name in that company along with the number of employees in that department.
	[] Per department, the view should include every employee with avatar image, name, title, and country.
[] Clicking on a row of the companies table should navigate the user to that company's page.
[] Breadcrumbs should be updated to reflect the new route added.
[] Somewhere in the UI, the application should have the ability to edit the name of a company and save it to the database.