//var db = require('db-pwner')
var mysql = require('mysql')

//connect to db
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	pasword: '',
	database: 'pwner'
})

connection.connect()

//test inserting an engineer (on a lower level than the whole events thing)
connection.query('INSERT INTO engineer SET ?', {name: 'Dave'}, function(err, result, fields){
	if (err) throw err
 	console.log(result)
})

connection.query('INSERT INTO engineer SET ?', {name: 'Chuck'}, function(err, result, fields){
	if (err) throw err
 	console.log(result)
})


//test inserting a contact
connection.query('INSERT INTO contact SET ?', {
	date_created: '2015-04-14 21:15:00',
	email_address: 'alisson@alice.com',
	first_name: 'Alice',
	last_name: 'Alisson',
	phone: '402-123-4567',
	notes: 'Alice contacted us about some things he wanted to do.',
	preferred_contact_method: 'phone'
}, function(err, result, fields){
	if (err) throw err
})

connection.query('INSERT INTO contact SET ?', {
	date_created: '2015-04-14 21:16:00',
	email_address: 'alisson@alice.com',
	first_name: 'Bob',
	last_name: 'Bobberson',
	phone: '402-123-4567',
	notes: 'Alice contacted us about some things he wanted to do.',
	preferred_contact_method: 'phone'
}, function(err, result, fields){
	if (err) throw err
})


//test inserting a project

connection.query('INSERT INTO project SET ?', {
	contact_id: 1,
	date_created: '2015-04-14 21:32:00',
	engineer_id: 1,
	name: 'The Coolest Project',
	engineering_project: true,
	printing_project: false,
	active_project_state_id: 2,
	start_date: '2015-04-14 21:33:00',
	done: false,
	payment_received: false
}, function(err, result, fields){
	if (err) throw err
})

connection.query('INSERT INTO project SET ?', {
	contact_id: 2,
	date_created: '2015-04-14 21:32:00',
	engineer_id: 2,
	name: 'A Pretty Neat Project',
	engineering_project: true,
	printing_project: true,
	active_project_state_id: 1,
	done: false,
	payment_received: false
}, function(err, result, fields){
	if (err) throw err
})


//***********Testing some queries**************//


//View: Active Projects
//This isn't quite right. active_project_state_id could be more than just 2;
//it should have project_is_started OR approved_project, which is 2, 3, 4, or 5.
//Also, I want the contact and engineer name in my view, not the id. Will that require another query?
connection.query('SELECT ?? FROM project WHERE ? AND ?', [[
			'engineer_id',
			'contact_id',
			'name',
			'engineering_due_date',
			'quoted_engineering_hours'
		], {
			done: false
		}, {
			active_project_state_id: 2
		}
	], function(err, result, fields){
		if (err) throw err
 		console.log(result)
})


//View: Project Leads
connection.query('SELECT ?? FROM project WHERE ? AND ?', [[
		'contact_id',
		'project_id',
		'name',
		'active_project_state_id'
	], {
		done: false
	}, {
		active_project_state_id: 1
	}], function(err, result, fields){
		if (err) throw err
		console.log(result)
})


//View: Pending Payment
connection.query('SELECT ?? FROM project WHERE ? AND ?', [[
		'contact_id',
		'project_id',
		'name',
		'active_project_state_id'
	], {
		done: true
	}, {
		payment_received: false
	}], function(err, result, fields){
		if (err) throw err
		console.log(result)
})
