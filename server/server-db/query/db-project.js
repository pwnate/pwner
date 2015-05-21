var db = require('db')
var q = require('sql-concat')
var Joi = require('joi')
var Promise = require('promise')
var snakeize = require('snakeize')
var camelize = require('camelize')

var schema = Joi.object({
	projectId: Joi.number().integer().max(4294967295).min(0),
	contactId: Joi.number().integer().max(4294967295).min(0),
	dateCreated: Joi.date(),
	engineerId: Joi.number().integer().max(4294967295).min(0),
	name: Joi.string().max(200),
	engineeringProject: Joi.boolean(),
	printingProject: Joi.boolean(),
	activeProjectStateId: Joi.number().integer().max(4294967295).min(0),
	startDate: Joi.date(),
	done: Joi.boolean(),
	doneDate: Joi.date(),
	deadReason: Joi.string().max(65535),
	quotedEngineeringHours: Joi.number().precision(1).less(10000),
	actualEngineeringHours: Joi.number().precision(1).less(10000),
	engineeringDueDate: Joi.date(),
	printParts: Joi.string().max(65535),
	printQuantity: Joi.number().integer().max(8388607).min(-8388608),
	printTimeHours: Joi.number().precision(1).less(10000),
	printDueDate: Joi.date(),
	paymentReceived: Joi.boolean(),
	contactDate: Joi.date(),
	replyDate: Joi.date(),
	quoteDate: Joi.date(),
	followUpDate: Joi.date(),
	notes: Joi.string().max(65535),
	version: Joi.number().integer().max(4294967295).min(0)
})

var validateDbProject = Promise.denodeify(function validate(o, cb) {
	schema.validate(o, cb)
})

var columns = 'project_id, contact_id, date_created, engineer_id, name, engineering_project, printing_project, active_project_state_id, start_date, done, done_date, dead_reason, quoted_engineering_hours, actual_engineering_hours, engineering_due_date, print_parts, print_quantity, print_time_hours, print_due_date, payment_received, contact_date, reply_date, quote_date, follow_up_date, notes, version'
var nameColumns = 'first_name, last_name'

function insert(project) {
	return validateDbProject(project)
		.then(function(validatedProject){
			return db().query('INSERT INTO project SET ?', snakeize(validatedProject)).then(function(res){
				validatedProject.projectId = res.insertId
				return validatedProject
			})
		})
}

function update(project) {
	return validateDbProject(project)
		.then(function(validatedProject){
			validatedProject.version += 1
			return db().query('UPDATE project SET ? WHERE project_id = ? AND version = ?', [snakeize(validatedProject), validatedProject.projectId, validatedProject.version - 1])		
		})
}

function findProjectByName(name) {
	return db().query(q.select(columns).from('project').whereLike('name', '%' + name + '%')).then(camelize)
}

function returnAll () {
	return db().query(q.select(columns).from('project')).then(camelize)
}

module.exports = {
	insert: insert,
	update: update,
	findProjectByName: findProjectByName,
	returnAll: returnAll
}
