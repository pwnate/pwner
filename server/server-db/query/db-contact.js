var db = require('db')
var q = require('sql-concat')
var Joi = require('joi')
var Promise = require('promise')
var snakeize = require('snakeize')
var camelize = require('camelize')

var schema = Joi.object({
	contactId: Joi.number().integer().max(4294967295).min(0),
	dateCreated: Joi.date(),
	emailAddress: Joi.string().max(200),
	firstName: Joi.string().max(100),
	lastName: Joi.string().max(100),
	organization: Joi.string().max(200),
	phone: Joi.string().max(100),
	address: Joi.string().max(100),
	city: Joi.string().max(100),
	state: Joi.string().max(50),
	zipCode: Joi.string().max(20),
	notes: Joi.string().max(65535),
	preferredContactMethod: Joi.string().max(100),
	version: Joi.number().integer().max(4294967295).min(0)
})

var validateDbContact = Promise.denodeify(function validate(o, cb) {
	schema.validate(o, cb)
})

var columns = 'contact_id, date_created, email_address, first_name, last_name, organization, phone, address, city, state, zip_code, notes, preferred_contact_method, version'
var nameColumns = 'first_name, last_name'

function insert(contact) {
	return validateDbContact(contact)
		.then(function(validatedContact){
			return db().query('INSERT INTO contact SET ?', snakeize(validatedContact)).then(function(res){
				validatedContact.contactId = res.insertId
				return validatedContact
			})
		})
}

function update(contact) {
	return validateDbContact(contact)
		.then(function(validatedContact){
			validatedContact.version += 1
			return db().query('UPDATE contact SET ? WHERE contact_id = ? AND version = ?', [snakeize(validatedContact), validatedContact.contactId, validatedContact.version - 1])		
		})
}

function findContactByName(name) {
	return db().query(q.select(columns).from('contact').whereLike('first_name', '%' + name + '%').orWhereLike('last_name', '%' + name + '%')).then(camelize)
}

function returnAll () {
	return db().query(q.select(columns).from('contact')).then(camelize)
}

module.exports = {
	insert: insert,
	update: update,
	findContactByName: findContactByName,
	returnAll: returnAll
}
